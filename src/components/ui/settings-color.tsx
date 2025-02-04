import React from 'react';

interface SettingsColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SettingsColor = ({ label, value, onChange }: SettingsColorProps) => {
  return (
    <div className="space-y-2 border-2 border-[#D6BCFA] p-3 rounded-lg bg-[#221F26]/80">
      <label className="text-xs font-[Silkscreen] text-[#D6BCFA] block">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 rounded cursor-pointer bg-transparent border-2 border-[#D6BCFA] shadow-[0_0_10px_rgba(214,188,250,0.2)]"
      />
    </div>
  );
};

export default SettingsColor;