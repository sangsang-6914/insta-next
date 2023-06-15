import React from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({ children }: { children: React.ReactNode }) {
  // 브라우저 환경일때만 포탈이 동작하도록 처리
  if (typeof window === 'undefined') {
    return null;
  }
  const node = document.getElementById('portal') as Element;
  return createPortal(children, node);
}

export default ModalPortal;
