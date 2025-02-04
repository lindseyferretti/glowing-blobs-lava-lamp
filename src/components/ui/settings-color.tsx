import React from 'react';

interface SettingsColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SettingsColor = ({ label, value, onChange }: SettingsColorProps) => {
  return (
    <div className="space-y-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
      <label className="text-xs text-white/70 block">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 rounded cursor-pointer bg-transparent"
      />
    </div>
  );
};

export default SettingsColor;