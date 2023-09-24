// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { parse } from 'https://esm.sh/parse-multipart-data@1.5.0'
import { Buffer } from "https://deno.land/std@0.136.0/node/buffer.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Database } from '../../../src/database.types.ts';

export type Envelope = {
  to: string[],
  from: string,
}


serve(async (req) => {

  verify(req);

  const supabaseClient = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  const map = new Map();
  const body = parse(Buffer.from(await req.arrayBuffer()), 'xYzZY');

  body.forEach((d) => {
    map.set(d.name, d.data);
  })

  const data = {
    subject: map.get('subject'),
    status: 'open',
  }

  const envelope: Envelope = JSON.parse(map.get('envelope'))

  const { data: ticket, error } = await supabaseClient.from('tickets').insert(data).select().single();

  if (error) {
    throw new Error(error.message);
  }

  if (ticket) {
    const { error: messageError } = await supabaseClient.from('messages').insert({
      from: envelope.from,
      to: envelope.to[0],
      via: 'email',
      ticket_id: ticket.id,
      content_html: map.get('html'),
      content_text: map.get('text'),
    });

    if (messageError) {
      throw new Error(messageError.message);
    }
  }

  return new Response(
    JSON.stringify({ data: 'New ticket and message created (inch)' }),
    { headers: { "Content-Type": "application/json" } },
  )
})


function verify(request: Request) {
  const url = new URL(request.url);

  // if (url.searchParams.get('secret') !== Deno.env.get('SECRET')) {
  //   throw new Response('Unautorized', { status: 403 })
  // }
}
// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
