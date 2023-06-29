import Image from 'next/image';
import React from 'react';

type AVATAR_SIZE = 'small' | 'medium' | 'large' | 'xlarge';
interface Props {
  image: string;
  size?: AVATAR_SIZE;
  highlight?: boolean;
}

function Avatar({ image, size = 'medium', highlight = false }: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <Image
        className={`bg-white object-cover rounded-full p-[0.1rem] ${
          getImageContainerStyle(size).image
        }`}
        src={image ?? ''}
        alt="user profile"
        width={30}
        height={30}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AVATAR_SIZE, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';

  const sizeStyle = getImageContainerStyle(size).container;

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageContainerStyle(size: AVATAR_SIZE): ImageSizeStyle {
  switch (size) {
    case 'small':
      return { image: 'w-[34px] h-[34px] p-[0.1rem]', container: 'w-9 h-9' };
    case 'medium':
      return { image: 'w-[42px] h-[42px] p-[0.1rem]', container: 'w-11 h-11' };
    case 'large':
      return { image: 'w-16 h-16 p-[0.2rem]', container: 'w-[68px] h-[68px]' };
    case 'xlarge':
      return {
        image: 'w-[138px] h-[138px] p-[0.3rem]',
        container: 'w-[142px] h-[142px]',
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}

export default Avatar;
