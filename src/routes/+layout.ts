import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../types/database.types';
import type { PageLoad } from './$types';

import { env } from '$env/dynamic/public';

export const load: PageLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth');

    const supabase = createSupabaseLoadClient<Database>({
        supabaseUrl: env.PUBLIC_SUPABASE_URL as string,
        supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY as string,
        event: { fetch },
        serverSession: data.session,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return { supabase, session };
};
