import Image from 'next/image';
import React from 'react';

type AVATAR_SIZE = 'small' | 'medium' | 'large' | 'super';
interface Props {
  image: string;
  size?: AVATAR_SIZE;
  highlight?: boolean;
}

function Avatar({ image, size = 'small', highlight = false }: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <Image
        src={image}
        width={30}
        height={30}
        referrerPolicy="no-referrer"
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(
          size
        )}`}
        alt="photo"
      />
    </div>
  );
}

function getContainerStyle(size: AVATAR_SIZE, highlight: boolean) {
  const baseStyle = 'rounded-full flex items-center justify-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';

  const sizeStyle = getContainerSize(size);

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getContainerSize(size: AVATAR_SIZE) {
  switch (size) {
    case 'small':
      return 'w-9 h-9';
    case 'medium':
      return 'w-11 h-11';
    case 'large':
      return 'w-[68px] h-[68px]';
    case 'super':
      return 'w-[110px] h-[110px]';
  }
}

function getImageSizeStyle(size: AVATAR_SIZE) {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px] p-[0.1rem]';
    case 'medium':
      return 'w-[42px] h-[42px] p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.2rem]';
    case 'super':
      return 'w-[105px] h-[105px] p-[0.3rem]';
  }
}

export default Avatar;
