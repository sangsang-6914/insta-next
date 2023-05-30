import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  size?: string;
}

function Avatar({ image, size = 'small' }: Props) {
  return (
    <div
      className={`rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 
    ${size === 'small' ? 'p-[0.1rem]' : 'p-[0.2rem]'}`}
    >
      <Image
        src={image}
        width={100}
        height={100}
        className={`w-10 h-10 rounded-full bg-white 
        ${size === 'small' ? 'p-[0.1rem]' : 'p-[0.2rem]'}`}
        alt="photo"
      />
    </div>
  );
}

export default Avatar;
