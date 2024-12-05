import type { Translation } from '../i18n-types';
import type { Visibility } from '@prisma/client';

type VisibilityTranslation = Record<Visibility, string>;

const de = {
	// this is an example Translation, just rename or delete this folder if you want
	message: 'Hallo Welt',
	buttons: {
		create: 'Erstellen',
		view: 'Sicht',
		edit: 'Bearbeiten',
		update: 'Aktualisieren',
		logOut: 'Abmelden',
		loginYouTube: 'Melden Sie sich mit YouTube an',
		remove: 'Entfernen',
		add: 'Hinzufügen',
	},
	labels: {
		title: 'Titel',
		slug: 'Slug',
		description: 'Beschreibung',
		visibility: 'Sichtweite',
		views: '{0} aufrufe',
		filter: 'Filter',
	},
	enums: {
		visibility: {
			Public: 'Öffentlich',
			Unlisted: 'Nicht gelistet',
			Private: 'Privat',
		} satisfies VisibilityTranslation,
	},
	errors: {
		titleRequired: 'Der Titel darf nicht leer sein.',
		slugRequired: 'Der Slug darf nicht leer sein.',
		slugSpecialCharacters: 'Der Slug darf keine Sonderzeichen enthalten.',
		descriptionRequired: 'Die Beschreibung darf nicht leer sein.',
		notFound: 'Nicht gefunden.',
		listMinLength: 'Eine Liste muss mindestens 1 Kanal enthalten.',
	},
	messages: {
		pleaseWait: 'Bitte warten...',
	},
	pages: {
		root: {
			loggedIn: {
				messages: {
					createList: 'Klicken Sie auf „Erstellen“, um zu beginnen.',
				},
			},
			messages: {
				tagline:
					'Präsentiert das ultimative YouTube-Erlebnis. Egal, ob Sie auf der Suche nach neuen Inhalten zum Ansehen sind oder Ihre eigene kuratierte Liste mit Freunden teilen möchten, unsere App ist genau das Richtige für Sie.',
			},
		},
		onboarding: {
			buttons: {
				letsGo: 'Lass uns gehen!',
			},
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
		create: {
			labels: {
				channelSearch: 'Kanalsuche',
			},
			messages: {
				channelSearch: 'Suche nach einem Kanal...',
			},
		},
	},
} satisfies Translation;

export default de;
