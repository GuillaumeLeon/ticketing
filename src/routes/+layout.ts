import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../database.types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: process.env.SUPABASE_URL as string,
		supabaseKey: process.env.SUPABASE_ANON_KEY as string,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
