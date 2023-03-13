import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import i18next from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      ko: ko,
    },
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(async () => await i18next.changeLanguage(navigator.language));

export default i18n;
