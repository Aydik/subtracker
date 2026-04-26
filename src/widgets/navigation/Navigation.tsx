import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationMobile } from './NavigationMobile';
import { NavigationDesktop } from './NavigationDesktop';
import { NAV_ITEMS } from './constants';

export type NavigationProps = {
  breakpoint?: 'desktop' | 'mobile';
};

export const Navigation: FC<NavigationProps> = ({ breakpoint = 'mobile' }) => {
  const navigate = useNavigate();

  return breakpoint === 'mobile' ? (
    <NavigationMobile navItems={NAV_ITEMS} navigate={navigate} />
  ) : (
    <NavigationDesktop navItems={NAV_ITEMS} navigate={navigate} />
  );
};
