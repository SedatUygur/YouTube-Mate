/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types';
import { prisma } from '../../../prisma.ts';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session || !event.locals.session.user) {
			throw redirect(302, '/');
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
		throw redirect(302, '/');
	},
};
