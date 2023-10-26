// src/hooks.server.ts
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import type { Database } from './types/database.types';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient<Database>({
        supabaseUrl: env.SUPABASE_URL as string,
        supabaseKey: env.SUPABASE_ANON_KEY as string,
        event,
    });

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();
        return session;
    };

    event.locals.protected = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();

        if (!session) {
            throw redirect(301, '/login');
        }
    };

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        },
    });
};
