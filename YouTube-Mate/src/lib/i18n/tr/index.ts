import type { Translation } from '../i18n-types';
import type { Visibility } from '@prisma/client';

type VisibilityTranslation = Record<Visibility, string>;

const tr = {
	// this is an example Translation, just rename or delete this folder if you want
	message: 'Merhaba Dünya',
	buttons: {
		create: 'Oluştur',
		logOut: 'Çıkış yap',
		loginYouTube: "YouTube'a giriş yap",
	},
	labels: {
		title: 'Başlık',
		description: 'Tanım',
		visibility: 'Görünürlük',
	},
	enums: {
		visibility: {
			Public: 'Genel',
			Unlisted: 'Listelenmemiş',
			Private: 'Özel',
		} satisfies VisibilityTranslation,
	},
	errors: {
		titleRequired: 'Başlık boş bırakılamaz.',
		descriptionRequired: 'Tanım boş bırakılamaz.',
		notFound: 'Bulunamadı.',
	},
	messages: {
		pleaseWait: 'Lütfen bekleyiniz...',
	},
	pages: {
		root: {
			loggedIn: {
				messages: {
					createList: "Başlamak için Oluştur'a tıklayın.",
				},
			},
			messages: {
				tagline:
					'En iyi YouTube deneyimini sunuyoruz. İster izleyecek yeni içerik arıyor olun ister kendi seçilmiş listenizi arkadaşlarınızla paylaşmak istiyor olun, uygulamamız ihtiyacınızı karşılayacaktır.',
			},
		},
		onboarding: {
			labels: {
				username: 'Kullanıcı adı',
				uploadFile: 'Dosya Yükle',
			},
			messages: {
				main: 'Hoşgeldin Youtube-Mate kullanıcısı! Haydi profilinizi oluşturalım.',
				avatar: 'Avatarınızı yükleyin.',
				final: 'Hepsi bu kadardı! Hadi başlayalım!',
			},
		},
	},
} satisfies Translation;

export default tr;
