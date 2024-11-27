import type { Translation } from '../i18n-types';

const tr = {
	// this is an example Translation, just rename or delete this folder if you want
	tagline:
		'En iyi YouTube deneyimini sunuyoruz. İster izleyecek yeni içerik arıyor olun ister kendi seçilmiş listenizi arkadaşlarınızla paylaşmak istiyor olun, uygulamamız ihtiyacınızı karşılayacaktır.',
	signUp: 'YouTube kaydolun',
	loginYouTube: 'YouTube giriş yap',
	logOut: 'Çıkış yap',
	pleaseWait: 'Lütfen bekleyiniz...',
	message: 'Merhaba Dünya',
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
} satisfies Translation;

export default tr;
