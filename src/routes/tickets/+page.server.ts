import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession }, url }) => {
    const session = await getSession();
    const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
    const perPage = Number.parseInt(url.searchParams.get('per_page') ?? '25', 10);

    if (session === null) {
        throw redirect(303, '/login');
    }

    const {
        data: tickets,
        // count,
        error: sError,
    } = await supabase
        .from('tickets')
        .select('*')
        .range(perPage * (page - 1), (perPage - 1) * page);

    if (sError) {
        throw error(500, {
            message: sError.message,
        });
    }

    return {
        tickets,
        // count,
        page,
        perPage,
    };
};
