import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationMobile } from './ui/NavigationMobile';
import { NAV_ITEMS } from './constants';
import { NavigationDesktop } from '@widgets/navigation/ui/NavigationDesktop';

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
