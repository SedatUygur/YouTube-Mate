import type { BaseTranslation } from '../i18n-types'

const en = {
	// TODO: your translations go here
	tagline: "Presenting the ultimate YouTube experience. Whether you're looking for new content to watch or want to share your own curated list with friends, our app has got you covered.",
	signUp: 'Sign up with YouTube',
	message: 'Hello World',
	onboarding: {
		labels: {
			username: 'Username',
			uploadFile: 'Upload File'
		},
		messages: {
			main: 'Welcome to Youtube-Mate! Let\'s setup your profile.',
			avatar: 'Upload your avatar.',
			final: 'That\'s all! Let\'s get started!'
		}
	}
} satisfies BaseTranslation

export default en
