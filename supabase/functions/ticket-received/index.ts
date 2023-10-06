import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { parse } from 'https://esm.sh/parse-multipart-data@1.5.0';
import { Buffer } from 'https://deno.land/std@0.136.0/node/buffer.ts';
import { SupabaseClient, createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Database } from '../../../src/database.types.ts';

export type Envelope = {
    to: string[];
    from: string;
};

export const parseHeaders = (stringHeaders: string) => {
    const splitted = stringHeaders.split('\n');

    return splitted.map((header) => {
        const [name, content] = header.split(':');

        return {
            name,
            content,
        };
    });
};

const getOrCreateTicket = async (
    client: SupabaseClient<Database>,
    headers: { name: string; content: any }[],
    data: Database['public']['Tables']['tickets']['Insert'],
) => {
    const inReplyTo = headers.find((h) => h.name === 'In-Reply-To');
    const ticketId = headers.find((h) => h.name === 'X-Ticketing-Id');

    if (ticketId) {
        const { data: ticket } = await client
            .from('messages')
            .select()
            .eq('id', ticketId.content)
            .single();

        return [ticket, false];
    }

    if (inReplyTo) {
        const { data: existingMessage } = await client
            .from('messages')
            .select()
            .eq('message_id', inReplyTo.content)
            .single();

        if (existingMessage) {
            const { data: ticket } = await client
                .from('messages')
                .select()
                .eq('id', existingMessage.ticket_id)
                .single();

            if (ticket) {
                return [ticket, false];
            }
        }
    }

    const { data: ticket, error } = await client.from('tickets').insert(data).select().single();

    if (error || !ticket) {
        throw new Error('Could not retrieve or insert the ticket');
    }
    return [ticket, true];
};

serve(async (req) => {
    // verify(req);

    const supabaseClient = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const boundary = /boundary=(.*)$/.exec(req.headers.get('Content-Type') ?? '');

    if (!boundary) {
        throw new Error('Invalid headers');
    }

    const bodyMap = new Map();
    const body = parse(Buffer.from(await req.arrayBuffer()), boundary[1]);

    body.forEach((d) => {
        bodyMap.set(d.name, Buffer.isBuffer(d.data) ? Buffer.from(d.data).toString() : d.data);
    });

    const parsedHeader = parseHeaders(bodyMap.get('headers'));

    const { to, from }: Envelope = JSON.parse(bodyMap.get('envelope'));

    try {
        const [ticket, wasRecentlyCreated] = (await getOrCreateTicket(
            supabaseClient,
            parsedHeader,
            {
                subject: bodyMap.get('subject'),
                status: 'open',
            },
        )) as [Ticket, boolean];

        const messageId = parsedHeader.find((h) => h.name === 'Message-ID');

        if (ticket && messageId) {
            const { data: existingMessage } = await supabaseClient
                .from('messages')
                .select()
                .eq('message_id', messageId)
                .single();

            if (existingMessage) {
                return new Response(JSON.stringify({ data: 'This message already exist' }), {
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const { data: message, error: messageError } = await supabaseClient
                .from('messages')
                .insert({
                    from: from,
                    to: to[0],
                    via: 'email',
                    ticket_id: ticket.id,
                    content_html: bodyMap.get('html'),
                    content_text: bodyMap.get('text'),
                    message_id: messageId.content,
                    direction: 'incoming',
                })
                .select()
                .single();

            if (messageError) {
                return new Response(JSON.stringify({ data: messageError.message }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 500,
                });
            }

            if (message && wasRecentlyCreated) {
                // const { error } = await supabaseClient.functions.invoke('send-first-response', {
                //     body: {
                //         messageId: message.id,
                //     },
                // });
                // return new Response(JSON.stringify({ data: error }), {
                //     headers: { 'Content-Type': 'application/json' },
                //     status: 500,
                // });
            }
        }
    } catch (error) {
        return new Response(JSON.stringify({ data: error }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }

    return new Response(JSON.stringify({ data: 'New ticket and message created (inch)' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
    });
});

export const verify = (req: Request) => {
    const url = new URL(req.url);

    if (
        !url.searchParams.has('secret') ||
        url.searchParams.get('secret') !== Deno.env.get('SECRET')
    ) {
        throw new Error('Secret is invalid or not existent');
    }
};
