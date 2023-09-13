import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { loginSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) {
		throw redirect(301, '/tickets');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(429, {
				form
			});
		}

		const email = form.data.email;
		const password = form.data.password;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		throw redirect(301, '/tickets');
	}
};
