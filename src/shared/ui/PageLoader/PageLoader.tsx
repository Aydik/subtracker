import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import type { FC } from 'react';

export const PageLoader: FC = () => {
  return (
    <Spin fullscreen size="large" tip="Загрузка страницы" indicator={<LoadingOutlined spin />} />
  );
};
