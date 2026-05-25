import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;
  const isRussian = currentLanguage === 'ru';
  const isEnglish = currentLanguage === 'en';

  const setLanguage = (lang: 'ru' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const toggleLanguage = () => {
    setLanguage(isRussian ? 'en' : 'ru');
  };

  return {
    t,
    currentLanguage,
    isRussian,
    isEnglish,
    setLanguage,
    toggleLanguage,
  };
};
