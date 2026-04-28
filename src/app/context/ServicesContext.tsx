import { createContext, useContext } from 'react';

import { useGetServicesQuery } from '@src/store/api/services/subscriptionService.ts';

import type { ServiceResponse } from '@src/api/models';
import type { ReactNode, FC } from 'react';

interface ServicesContextValue {
  services: ServiceResponse[];
  isLoading: boolean;
  error: unknown | null;
}

const ServicesContext = createContext<ServicesContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export const ServicesProvider: FC<Props> = ({ children }) => {
  const {
    data: services,
    isLoading,
    error,
  } = useGetServicesQuery({ pageable: { size: 1000, page: 0 } });

  return (
    <ServicesContext.Provider value={{ services: services?.content || [], isLoading, error }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextValue => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
