import React from 'react';

interface Props {
  text: string;
}

function Button({ text }: Props) {
  return (
    <button className="p-1 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-2 rounded-lg">{text}</div>
    </button>
  );
}

export default Button;
