import { useMemo } from 'react';

import { Button, Layout } from 'antd';
import clsx from 'clsx';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useServices } from '@app/context/ServicesContext.tsx';
import { AsyncImage } from '@shared/ui/AsyncImage';
import { Icon } from '@shared/ui/Icon/Icon.tsx';

import type { ServiceResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './IndexPage.module.scss';

export const IndexPage: FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { services: servicesData } = useServices();

  const services = useMemo<ServiceResponse[][]>(() => {
    const groupSize = Math.ceil(servicesData.length / 3);
    const groupedServices: ServiceResponse[][] = [];

    for (let i = 0; i < 3; i++) {
      const start = i * groupSize;
      const end = start + groupSize;
      groupedServices.push(servicesData.slice(start, end));
    }

    return groupedServices;
  }, [servicesData]);

  return (
    <Layout.Content className={styles.indexPage}>
      <div className={styles.content}>
        {services !== null && (
          <div className={styles.marque_container}>
            {services.map((line, index) => (
              <Marquee
                className={styles.line}
                key={index}
                speed={20 + (2 - index) * 10 - (index % 2) * 10}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={styles.marque}>
                  {Array(5).fill(
                    line.map((service) => (
                      <AsyncImage
                        src={service.logoUrl || ''}
                        key={service.serviceName}
                        alt={service.serviceName || ''}
                        className={styles.logo}
                      />
                    )),
                  )}
                </div>
              </Marquee>
            ))}
          </div>
        )}
        <div className={styles.title}>
          <h1>SubTracker</h1>
          <h2>{t('index.subtitle')}</h2>
        </div>
        <div className={styles.actions}>
          <div className={styles.auth}>
            <Button
              key="register"
              onClick={() => navigate('/auth/register')}
              type="default"
              size="large"
            >
              {t('auth.register')}
            </Button>
            <Button key="login" onClick={() => navigate('/auth/login')} type="primary" size="large">
              {t('auth.login')}
            </Button>
          </div>
          <div className={styles.divider}>
            <div className={styles.divider__line} />
            <span className={styles.divider__text}>{t('index.or')}</span>
            <div className={styles.divider__line} />
          </div>
          <div className={styles.oAuth}>
            <Button
              key="google"
              className={styles.oAuth__button}
              ghost
              shape="circle"
              icon={<Icon name="google" />}
            />
            <Button
              key="yandex"
              className={styles.oAuth__button}
              ghost
              shape="circle"
              icon={<Icon name="yandex" />}
            />
            <Button
              key="vk"
              className={styles.oAuth__button}
              ghost
              shape="circle"
              icon={<Icon name="vk" />}
            />
          </div>
        </div>
      </div>
      <div className={clsx(styles.border, styles.border_left)} />
      <div className={clsx(styles.border, styles.border_right)} />
    </Layout.Content>
  );
};
