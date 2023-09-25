import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
    const { session } = await parent();

    if (session === null) {
        throw redirect(303, '/login');
    }

    const { data: tickets } = await supabase.from('tickets').select()
        .range(0, 24);

    return {
        tickets
    }
};

