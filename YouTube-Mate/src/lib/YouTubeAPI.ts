import { youtube, type youtube_v3 } from '@googleapis/youtube';
import type { YouTubeMeta } from '@prisma/client';
import { config } from './config/config.server.ts';
import redisClient from './config/redis.client.ts';

const ytClient = youtube({
	version: 'v3',
	auth: config.YOUTUBE_API_KEY,
});

const channelParts = ['id', 'brandingSettings', 'contentDetails', 'snippet', 'statistics'];
const searchParts = ['id', 'snippet'];

export type YouTubeChannelMetaAPIResponse = Omit<
	YouTubeMeta,
	'createdAt' | 'updatedAt' | 'isVerified'
>;

export interface YouTubeVideoAPIResponse {
	categoryId: string;
	channelId: string;
	channelTitle: string;
	commentCount: number;
	defaultLanguage: string;
	defaultAudioLanguage: string;
	definition: string;
	description: string;
	duration: string;
	favoriteCount: number;
	licensedContent: boolean;
	likeCount: number;
	live: boolean;
	publishedAt: number;
	tags: string[];
	title: string;
	upcoming: boolean;
	videoId: string;
	viewCount: number;
	livestream: {
		viewers: number;
		liveChatId: string;
		actualStartAt: number;
		scheduledStartAt: number;
	} | null;
	thumbnails: {
		high: string | null;
		low: string | null;
	};
}

export function parseYTDate(date: string | null | undefined) {
	return date ? new Date(date).getTime() : Date.now();
}

export function parseYTNumber(number: string | null | undefined) {
	return Number(number ?? 0);
}

export function createYouTubeMetaAPIResponse(originId: string, channel: youtube_v3.Schema$Channel) {
	const subscriberCountNumber = !channel.statistics?.hiddenSubscriberCount
		? Number(channel.statistics?.subscriberCount)
		: 0;
	const subscriberCount = Number.isNaN(subscriberCountNumber) ? 0 : subscriberCountNumber;
	const videoCount = channel.statistics?.videoCount ? Number(channel.statistics.videoCount) : 0;
	const viewCount = channel.statistics?.viewCount ? Number(channel.statistics.viewCount) : 0;
	// TODO: i18n
	const name = channel.snippet?.title ?? 'No title';
	const description = channel.snippet?.description ?? 'No description';
	const countryCode = channel.snippet?.country ?? 'No country';
	// TODO: use our own avatar service
	const avatarUrl =
		channel.snippet?.thumbnails?.default?.url ?? `https://ui-avatars.com/api/?name=${name}`;
	const bannerUrl = channel.brandingSettings?.image?.bannerImageUrl ?? null;
	const customUrl = channel.snippet?.customUrl ?? '@notfound';
	const favoritesPlaylist =
		channel.contentDetails?.relatedPlaylists?.favorites ?? 'No favorite playlists';
	const likesPlaylist = channel.contentDetails?.relatedPlaylists?.likes ?? 'No like playlists';
	const uploadsPlaylist =
		channel.contentDetails?.relatedPlaylists?.uploads ?? 'No uploaded playlists';
	const watchHistoryPlaylist =
		channel.contentDetails?.relatedPlaylists?.watchHistory ?? 'No watch history playlists';
	const watchLaterPlaylist =
		channel.contentDetails?.relatedPlaylists?.watchLater ?? 'No watch later playlists';
	return {
		name,
		originId,
		description,
		subscriberCount,
		avatarUrl,
		bannerUrl,
		customUrl,
		countryCode,
		videoCount,
		viewCount,
		favoritesPlaylist,
		likesPlaylist,
		uploadsPlaylist,
		watchHistoryPlaylist,
		watchLaterPlaylist,
	};
}

export async function getChannel(id: string) {
	const { data } = await ytClient.channels.list({
		part: channelParts,
		id: [id],
		maxResults: 1,
	});
	const ytChannel = data.items?.pop();
	if (ytChannel) {
		return createYouTubeMetaAPIResponse(id, ytChannel);
	}
	return null;
}

async function getAllVideos(
	channelId: string,
	videos: YouTubeVideoAPIResponse[] = [],
	pageToken?: string
): Promise<YouTubeVideoAPIResponse[]> {
	const { data } = await ytClient.search.list({
		part: searchParts,
		channelId,
		type: ['video'],
		order: 'date',
		maxResults: 50,
		pageToken,
	});
	const ids = (data.items ?? []).reduce<string[]>((all, item) => {
		if (item.id?.videoId) {
			all.push(item.id.videoId);
		}
		return all;
	}, []);
	const { data: videoData } = await ytClient.videos.list({
		part: ['id', 'contentDetails', 'liveStreamingDetails', 'snippet', 'statistics'],
		id: ids,
		maxResults: 50,
	});
	videoData.items?.forEach((video) => {
		if (video.id) {
			const videoResponse = {
				// TODO: i18n
				categoryId: video.snippet?.categoryId ?? 'No Category Id',
				channelId,
				channelTitle: video.snippet?.channelTitle ?? 'No Channel Title',
				commentCount: parseYTNumber(video.statistics?.commentCount),
				definition: video.contentDetails?.definition ?? '',
				defaultLanguage: video.snippet?.defaultLanguage ?? '',
				defaultAudioLanguage: video.snippet?.defaultAudioLanguage ?? '',
				description: video.snippet?.description ?? 'No Video Description',
				duration: video.contentDetails?.duration ?? 'PT0S',
				favoriteCount: parseYTNumber(video.statistics?.favoriteCount),
				licensedContent: video.contentDetails?.licensedContent ?? false,
				likeCount: parseYTNumber(video.statistics?.likeCount),
				live: video.snippet?.liveBroadcastContent === 'live',
				tags: video.snippet?.tags ?? [],
				title: video.snippet?.title ?? 'No Video Title',
				upcoming: video.snippet?.liveBroadcastContent === 'upcoming',
				videoId: video.id,
				viewCount: parseYTNumber(video.statistics?.viewCount),
				livestream: video.liveStreamingDetails
					? {
							viewers: parseYTNumber(video.liveStreamingDetails.concurrentViewers),
							liveChatId: video.liveStreamingDetails.activeLiveChatId ?? '',
							actualStartAt: parseYTDate(video.liveStreamingDetails.actualStartTime),
							scheduledStartAt: parseYTDate(video.liveStreamingDetails.scheduledStartTime),
						}
					: null,
				publishedAt: video.snippet?.publishedAt
					? new Date(video.snippet.publishedAt).getTime()
					: Date.now(),
				thumbnails: {
					high:
						video.snippet?.thumbnails?.maxres?.url?.replace('_live', '') ??
						video.snippet?.thumbnails?.standard?.url?.replace('_live', '') ??
						video.snippet?.thumbnails?.high?.url?.replace('_live', '') ??
						null,
					low:
						video.snippet?.thumbnails?.medium?.url?.replace('_live', '') ??
						video.snippet?.thumbnails?.default?.url?.replace('_live', '') ??
						null,
				},
			};
			videos.push(videoResponse);
		}
	});
	if (data.nextPageToken) {
		return getAllVideos(channelId, videos, data.nextPageToken);
	}
	return videos;
}

async function getChannelVideos(channelId: string) {
	const cacheKey = `yt:videos:(channelId:${channelId})`;
	const cachedVideos = await redisClient.get(cacheKey);
	if (cachedVideos) {
		return JSON.parse(cachedVideos) as YouTubeVideoAPIResponse[];
	}
	const videos = await getAllVideos(channelId);
	await redisClient.set(cacheKey, JSON.stringify(videos), {
		EX: 60 * 60 * 24,
	});
	return videos;
}

export async function getVideos(channelIds: string[]) {
	let videos: YouTubeVideoAPIResponse[] = [];
	await channelIds.reduce(async (promise, channelId) => {
		await promise;
		const channelVideos = await getChannelVideos(channelId);
		videos = videos.concat(channelVideos);
	}, Promise.resolve());
	videos.sort((a, b) => b.publishedAt - a.publishedAt);
	return videos;
}

export async function searchChannels(q: string) {
	// TODO: proxy, cache and use an API Key pool...
	const { data: searchResults } = await ytClient.search.list({
		part: searchParts,
		q,
		type: ['channel'],
		maxResults: 50,
	});
	const ids = (searchResults.items ?? []).reduce<string[]>((all, item) => {
		if (item.id?.channelId) {
			all.push(item.id.channelId);
		}
		return all;
	}, []);
	const { data } = await ytClient.channels.list({
		part: channelParts,
		id: ids,
		maxResults: 50,
	});
	const byId = (data.items ?? []).reduce((all, item) => {
		if (item.id) {
			all.set(item.id, item);
		}
		return all;
	}, new Map<string, youtube_v3.Schema$Channel>());
	const results = (searchResults.items ?? []).reduce<YouTubeChannelMetaAPIResponse[]>(
		(all, item) => {
			if (item.id?.channelId) {
				const channel = byId.get(item.id.channelId);
				if (channel) {
					const metaResponse = createYouTubeMetaAPIResponse(item.id.channelId, channel);
					all.push(metaResponse);
				}
			}
			return all;
		},
		[]
	);
	return results;
}
