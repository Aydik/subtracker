import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

export const PageLoader: FC = () => {
  const { t } = useTranslation();

  return (
    <Spin fullscreen size="large" tip={t('common.loading')} indicator={<LoadingOutlined spin />} />
  );
};
