import type { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const PageLoader: FC = () => {
  return (
    <Spin fullscreen size="large" tip="Загрузка страницы" indicator={<LoadingOutlined spin />} />
  );
};
