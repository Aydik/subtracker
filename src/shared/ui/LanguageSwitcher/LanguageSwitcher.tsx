import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button className={styles.languageButton} onClick={toggleLanguage}>
      {currentLanguage === 'ru' ? 'Русский' : 'English'}
    </button>
  );
};
