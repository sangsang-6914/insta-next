import React from 'react';
import { GrClose } from 'react-icons/gr';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

function PostModal({ onClose, children }: Props) {
  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed w-full h-full top-0 left-0 flex flex-col items-center justify-center z-50 bg-slate-500 bg-opacity-70"
    >
      <button onClick={onClose} className="fixed top-0 right-0 p-5">
        <GrClose className="w-5 h-5" />
      </button>
      {children}
    </section>
  );
}

export default PostModal;
