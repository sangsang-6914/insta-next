import React from 'react';

interface Props {
  toggled: boolean;
  icon: React.ReactNode;
  fillIcon: React.ReactNode;
  onToggle: (toggled: boolean) => void;
}

function ToggleButton({ toggled, icon, fillIcon, onToggle }: Props) {
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? fillIcon : icon}
    </button>
  );
}

export default ToggleButton;
