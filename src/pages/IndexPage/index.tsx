import type { FC } from 'react';
import styles from './index.module.scss';
import Marquee from 'react-fast-marquee';
import { Button, Layout } from 'antd';
import { Icon } from '@shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const services = [
  ['spotify', 'apple-music', 'netflix', 'instagram', 'vk'],
  ['yandex-music', 'kinopoisk', 'ivi', 'twitter', 'youtube'],
  ['duolingo', 'telegram', 'roblox', 'wechat', 'mts'],
];

const IndexPage: FC = () => {
  const navigate = useNavigate();
  return (
    <Layout.Content className={styles.indexPage}>
      <div className={styles.content}>
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
                    <img
                      className={styles.logo}
                      key={service}
                      src={`public/assets/images/services/${service}.png`}
                      alt={service}
                    />
                  )),
                )}
              </div>
            </Marquee>
          ))}
        </div>
        <div className={styles.title}>
          <h1>SubTracker</h1>
          <h2>
            Умный контроль ваших <br /> платежей
          </h2>
        </div>
        <div className={styles.actions}>
          <div className={styles.auth}>
            <Button
              key="register"
              onClick={() => navigate('/auth/register')}
              type="default"
              size="large"
            >
              Создать аккаунт
            </Button>
            <Button key="login" onClick={() => navigate('/auth/login')} type="primary" size="large">
              Войти
            </Button>
          </div>
          <div className={styles.divider}>
            <div className={styles.divider__line} />
            <span className={styles.divider__text}>или</span>
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

export default IndexPage;
