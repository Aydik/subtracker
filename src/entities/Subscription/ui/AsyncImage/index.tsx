import { type FC, useState } from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';
import clsx from 'clsx';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}

export const AsyncImage: FC<Props> = ({ src, alt = '', className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const fallback = (
    <div className={clsx(styles.fallback, className)}>{alt.charAt(0).toUpperCase()}</div>
  );
  const loader = (
    <div className={clsx(styles.loader, className)}>
      <Spin />
    </div>
  );

  if (!src || hasError) {
    return fallback;
  }

  return (
    <div>
      {isLoading && loader}
      <img
        src={src}
        alt={alt}
        className={clsx(styles.image, className)}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
