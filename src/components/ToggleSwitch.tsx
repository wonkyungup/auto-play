import * as React from 'react';

const ToggleSwitch = ({
  isSwitch,
  onChange,
}: {
  isSwitch: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label id="auto-play-switch" className="switch">
      <input type="checkbox" checked={isSwitch} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
