import i18n from 'i18next';
import translation from './mn/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  mn: {
    translation,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'mn',
  interpolation: {
    escapeValue: false, 
  },
  resources,
});