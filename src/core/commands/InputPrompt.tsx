import React from 'react';

interface InputPromptProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InputPrompt: React.FC<InputPromptProps> = ({ label, value, onChange, onKeyDown, error }) => {
  return (
    <div className="pl-8 text-white">
      {label}<br />
      <input
        className="w-full text-white bg-transparent outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};