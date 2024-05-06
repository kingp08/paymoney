import translator from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import en from './src/utils/language/en.json';
import ar from './src/utils/language/ar.json';
import es from './src/utils/language/es.json';
import fr from './src/utils/language/fr.json';
import pt from './src/utils/language/pt.json';
import ru from './src/utils/language/ru.json';
import tr from './src/utils/language/tr.json';
import zh from './src/utils/language/zh.json';

translator.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
    es: {
      translation: es,
    },
    fr: {
      translation: fr,
    },
    pt: {
      translation: pt,
    },
    ru: {
      translation: ru,
    },
    tr: {
      translation: tr,
    },
    zh: {
      translation: zh,
    },
  },
});

export default translator;
