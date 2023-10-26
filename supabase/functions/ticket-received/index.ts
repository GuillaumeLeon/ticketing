import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { getBoundary } from 'https://esm.sh/parse-multipart-data@1.5.0';
import { Buffer } from 'https://deno.land/std@0.136.0/node/buffer.ts';
import { SupabaseClient, createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Database } from '../../../src/types/database.types.js';
import { Ticket } from '../../../src/app.d.ts';

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

    const boundary = getBoundary(req.headers.get('Content-Type') as string);

    if (!boundary) {
        throw new Error('Invalid headers');
    }

    const bodyMap = new Map();
    const body = await req.formData();

    body.forEach((data, key) => {
        bodyMap.set(key, Buffer.isBuffer(data) ? Buffer.from(data).toString() : data);
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
                .eq('message_id', messageId.content)
                .single();

            if (existingMessage) {
                return new Response(JSON.stringify({ data: 'This message already exist' }), {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            const { lastname, firstname } = parseNames(bodyMap.get('from'));

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
                    lastname,
                    firstname,
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
                const { error } = await supabaseClient.functions.invoke('send-first-response', {
                    body: {
                        messageId: message.id,
                    },
                });

                if (error) {
                    return new Response(JSON.stringify({ data: error }), {
                        headers: { 'Content-Type': 'application/json' },
                        status: 500,
                    });
                }
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

// Guillaume Leon <Guillaume.Leon@protonmail.com>
export const parseNames = (from: string): { lastname: string | null; firstname: string | null } => {
    const data = /(.*?) <(.*?)>/.exec(from);

    if (!data) {
        const email = /<(.*?)>/.exec(from);

        if (!email) {
            return {
                firstname: null,
                lastname: null,
            };
        }

        return {
            firstname: email[1].split('@')[0] ?? null,
            lastname: null,
        };
    }
    const [firstname, lastname] = data[1].split(' ');

    if (!firstname && !lastname) {
        const mail = data[2].split('@')[0] ?? null;

        return {
            firstname: mail,
            lastname: null,
        };
    }

    return {
        firstname: firstname ?? null,
        lastname: lastname ?? null,
    };
};
