import React from 'react';

interface Props {
  toggled: boolean;
  icon: React.ReactNode;
  fillIcon: React.ReactNode;
  onToggle: () => void;
}

function ToggleButton({ toggled, icon, fillIcon, onToggle }: Props) {
  return <button onClick={onToggle}>{toggled ? fillIcon : icon}</button>;
}

export default ToggleButton;
