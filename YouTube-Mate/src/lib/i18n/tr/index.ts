import type { Translation } from '../i18n-types';
import type { Visibility } from '@prisma/client';

type VisibilityTranslation = Record<Visibility, string>;

const tr = {
	// this is an example Translation, just rename or delete this folder if you want
	message: 'Merhaba Dünya',
	buttons: {
		create: 'Oluştur',
		view: 'Görüntüle',
		edit: 'Düzenle',
		update: 'Güncelle',
		logOut: 'Çıkış yap',
		loginYouTube: "YouTube'a giriş yap",
		remove: 'Sil',
		add: 'Ekle',
	},
	labels: {
		title: 'Başlık',
		description: 'Tanım',
		visibility: 'Görünürlük',
		views: '{0} görüntüleme',
		filter: 'Filtrele',
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
		listMinLength: 'Bir listede en az 1 kanal bulunmalıdır.',
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
			buttons: {
				letsGo: 'Hadi gidelim!',
			},
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
		create: {
			labels: {
				channelSearch: 'Kanal Arama',
			},
			messages: {
				channelSearch: 'Bir kanal aranıyor...',
			},
		},
	},
} satisfies Translation;

export default tr;
