import type { FC } from 'react';
import { Spin } from 'antd';

export const PageLoader: FC = () => {
  return <Spin fullscreen size="large" tip="Загрузка страницы" />;
};
