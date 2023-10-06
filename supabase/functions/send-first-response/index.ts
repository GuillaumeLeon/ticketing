// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';
import { Database } from '../../../src/database.types.ts';
import Mailgun from 'https://deno.land/x/mailgun@v1.1.0/index.ts';

serve(async (req) => {
    const client = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const body = await req.json();

    const messageId = body.messageId;

    const { data: message } = await client.from('messages').select().eq('id', messageId).single();

    if (!message) {
        return new Response(JSON.stringify({ data: 'message not found' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 404,
        });
    }

    const mailgun = new Mailgun({
        key: Deno.env.get('MAILGUN_API_KEY') as string,
        region: 'us',
        domain: 'sandboxf1e2da7378fc4cf7808e95529ef3abb4.mailgun.org',
    });

    const response = await mailgun.send({
        to: [message.from],
        from: 'jean-eude <mailgun@sandboxf1e2da7378fc4cf7808e95529ef3abb4.mailgun.org>',
        text: 'jk nobody work here',
        html: '<strong>jk nobody work here</strong>',
        reply: 'jean-eude <mailgun@sandboxf1e2da7378fc4cf7808e95529ef3abb4.mailgun.org>',
        subject: 'Just checking up!',
        'h:In-Reply-To': message.message_id.toString(),
        'h:X-Ticketing-Id': message.ticket_id.toString(),
    });

    const data: { id: string; message: string } = await response.json();

    const { error } = await client.from('messages').insert({
        from: 'mailgun@sandboxf1e2da7378fc4cf7808e95529ef3abb4.mailgun.org',
        to: message.from,
        via: 'email',
        ticket_id: message.ticket_id,
        content_html: '<strong>jk nobody work here</strong>',
        content_text: 'jk nobody work here',
        message_id: data.id,
        direction: 'outgoing',
    });

    if (error) {
        return new Response(
            JSON.stringify({
                data: JSON.stringify(error),
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            },
        );
    }

    return new Response(
        JSON.stringify({
            data: {
                messageId: data.id,
            },
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
});
