import type { FC } from 'react';

export type IconProps = {
  name: string;
  size?: { width: number; height: number };
  className?: string;
  color?: string;
};

export const Icon: FC<IconProps> = ({ name, size = { width: 24, height: 24 }, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size.width,
        height: size.height,
      }}
      className={className}
    >
      <use xlinkHref={`${import.meta.env.BASE_URL}assets/icons/sprites.svg#${name}`} />
    </svg>
  );
};
