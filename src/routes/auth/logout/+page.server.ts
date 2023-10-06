import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { error: logoutError } = await supabase.auth.signOut({ scope: 'global' });
    if (logoutError) {
        // throw error(500, logoutError);
    }

    throw redirect(301, '/login');
};
