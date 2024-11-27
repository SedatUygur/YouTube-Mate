import type { Translation } from '../i18n-types';

const de = {
	// this is an example Translation, just rename or delete this folder if you want
	tagline:
		'Präsentiert das ultimative YouTube-Erlebnis. Egal, ob Sie auf der Suche nach neuen Inhalten zum Ansehen sind oder Ihre eigene kuratierte Liste mit Freunden teilen möchten, unsere App ist genau das Richtige für Sie.',
	loginYouTube: 'Melden Sie sich mit YouTube an',
	logOut: 'Abmelden',
	pleaseWait: 'Bitte warten...',
	message: 'Hallo Welt',
	onboarding: {
		labels: {
			username: 'Benutzername',
			uploadFile: 'Datei hochladen',
		},
		messages: {
			main: 'Willkommen bei Youtube-Mate! Lassen Sie uns Ihr Profil einrichten.',
			avatar: 'Laden Sie Ihren Avatar hoch.',
			final: 'Das ist alles! Fangen wir an!',
		},
	},
} satisfies Translation;

export default de;
