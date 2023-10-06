import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select(`*, messages (*)`)
        .eq('id', params.id)
        .single();

    if (!ticket) {
        throw error(404, 'Not found');
    }

    return {
        ticket,
    };
};
