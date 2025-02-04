import React from 'react';
import { Slider } from "./slider";

interface SettingsSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  color?: string;
}

const SettingsSlider = ({ label, value, onChange, min, max, step, color }: SettingsSliderProps) => {
  return (
    <div className="space-y-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
      <label className="text-xs text-white/70 block">{label} ({value})</label>
      <Slider
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        min={min}
        max={max}
        step={step}
        className="[&_[role=slider]]:bg-white"
        style={{
          '--slider-color': color
        } as React.CSSProperties}
      />
    </div>
  );
};

export default SettingsSlider;