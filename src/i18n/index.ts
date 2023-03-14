import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import zhHans from './locales/zhHans.json';
import zhHant from './locales/zhHant.json';
import ru from './locales/ru.json';
import jp from './locales/jp.json';
import In from './locales/In.json';
import de from './locales/de.json';

const language = '';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      ko: ko,
      zhHans: zhHans,
      zhHant: zhHant,
      ru: ru,
      jp: jp,
      in: In,
      de: de,
    },
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(
    async () => await i18next.changeLanguage(language || navigator.language),
  );

export default i18n;
