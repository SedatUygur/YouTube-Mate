/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getUserChannel } from './YouTubeAPI.ts';
import { prisma } from './config/prisma.ts';
export async function updateAccountUsername(message) {
	//account: Account
	if (message?.account?.access_token) {
		try {
			const channel = await getUserChannel(message?.account?.access_token);
			const username = channel?.id ? channel.snippet?.customUrl : message?.user?.name;
			if (username) {
				await prisma.account.updateMany({
					where: {
						userId: message?.account.userId,
						providerAccountId: message?.account.providerAccountId,
					},
					data: {
						username,
					},
				});
			}
			return username;
		} catch (error) {
			console.error(error);
		}
	}
	return '@Unknown';
}
