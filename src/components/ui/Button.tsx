import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
  color: string;
  disabled?: boolean;
}

function Button({ text, onClick, color, disabled = false }: Props) {
  return (
    <button
      className={`${
        color === 'red' ? 'bg-red-500' : 'bg-sky-500'
      } border-none rounded-md py-2 px-8 text-white font-bold leading-4 hover:brightness-105
      ${disabled && 'opacity-80 hover:brightness-100'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
