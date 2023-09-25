import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from './schemas';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ parent }) => {
    const { session } = await parent();
    if (session) {
        throw redirect(301, '/');
    }
    return {
        form: superValidate(loginSchema)
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const form = await superValidate(request, loginSchema);

        const { email, password } = form.data;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (!form.valid) {
            return fail(422, { form });
        }

        return { form };
    }
}