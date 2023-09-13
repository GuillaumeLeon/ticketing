import type { PageLoad } from './$types';

export const load: PageLoad = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
