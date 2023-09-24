import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { loginSchema } from './schemas';

export const load = (async () => {
    return {
        form: superValidate(loginSchema)
    };
}) satisfies PageServerLoad;