import { superValidate } from 'sveltekit-superforms/server';
import { updateSubject } from './schema/subject';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { supabase } = await parent();
	const { id } = params as any;

	const { data: ticket } = await supabase.from('tickets').select().eq('id', id).limit(1).single();

	const { data: messages } = await supabase.from('messages').select().eq('ticket_id', id);

	return {
		ticket,
		messages,
		form: superValidate(updateSubject)
	};
};

export const actions: Actions = {
	POST: async (event) => {
		const form = await superValidate(event, updateSubject);
		console.log(form);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
