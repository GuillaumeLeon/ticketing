import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../database.types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: 'https://cmpeauhodtiuyzenwyjx.supabase.co',
		supabaseKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcGVhdWhvZHRpdXl6ZW53eWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NjEzNTUsImV4cCI6MjAwODUzNzM1NX0.AGieBg1RZFBaJHkQl1FkxUTCqv9jq1hiO-q-KjFFn58',
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
