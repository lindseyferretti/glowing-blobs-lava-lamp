import React from 'react';
import { Slider } from "./slider";

interface SettingsSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const SettingsSlider = ({ label, value, onChange, min, max, step }: SettingsSliderProps) => {
  return (
    <div className="space-y-2 border-2 border-[#D6BCFA] p-3 rounded-lg bg-[#221F26]/80">
      <label className="text-xs font-[Silkscreen] text-[#D6BCFA] block">{label} ({value})</label>
      <Slider
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        min={min}
        max={max}
        step={step}
        className="[&_[role=slider]]:bg-[#D6BCFA] [&_[role=slider]]:border-[#D6BCFA] [&_[role=slider]]:shadow-[0_0_10px_rgba(214,188,250,0.3)]"
      />
    </div>
  );
};

export default SettingsSlider;