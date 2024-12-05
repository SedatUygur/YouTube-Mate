/* eslint-disable import/no-unresolved */

import { redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types';
import { prisma } from '$lib/config/prisma.ts';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session?.user) {
			redirect(302, '/');
		}
		// TODO: consume formdata, update user profile / settings
		await prisma.userSettings.update({
			where: {
				userId: event.locals.session.user.id,
			},
			data: {
				onboarded: true,
			},
		});
		redirect(302, '/');
	},
};
