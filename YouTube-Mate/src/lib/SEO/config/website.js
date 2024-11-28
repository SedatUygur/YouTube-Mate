/* eslint-disable import-x/no-unresolved */
/* eslint-disable import/no-unresolved */

import {
	PUBLIC_CONTACT_EMAIL,
	PUBLIC_FACEBOOK_AUTHOR_PAGE,
	PUBLIC_FACEBOOK_PAGE,
	PUBLIC_GITHUB_PAGE,
	PUBLIC_LINKEDIN_PROFILE,
	PUBLIC_SITE_URL,
	PUBLIC_TELEGRAM_USERNAME,
	PUBLIC_TWITTER_USERNAME,
	PUBLIC_TWITTER_USER_ID,
} from '$env/static/public';

const facebookPageName = PUBLIC_FACEBOOK_PAGE;
const facebookAuthorPageName = PUBLIC_FACEBOOK_AUTHOR_PAGE;

const website = {
	author: 'Sedat Uygur',
	ogLanguage: 'en_US',
	siteLanguage: 'en-US',
	siteTitle: 'Youtube Mate',
	siteShortTitle: 'YoutubeMate',
	description: 'YouTube Mate is an app allow users to create and share YouTube watchlists',
	siteUrl: PUBLIC_SITE_URL,
	backgroundColor: '#1b4079',
	themeColor: '#d62828',
	contactEmail: PUBLIC_CONTACT_EMAIL,
	facebookAuthorPage: `https://www.facebook.com/${facebookAuthorPageName}`,
	facebookAuthorPageName,
	facebookPage: `https://www.facebook.com/${facebookPageName}`,
	facebookPageName,
	githubPage: PUBLIC_GITHUB_PAGE,
	linkedinProfile: PUBLIC_LINKEDIN_PROFILE,
	telegramUsername: PUBLIC_TELEGRAM_USERNAME,
	twitterUsername: PUBLIC_TWITTER_USERNAME,
	twitterUserId: PUBLIC_TWITTER_USER_ID,
};

export { website as default };
