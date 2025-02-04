import React, { useState, useEffect } from 'react';

interface SettingsColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SettingsColor = ({ label, value, onChange }: SettingsColorProps) => {
  const [selectedFormat, setSelectedFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(value);
  const hsl = hexToHsl(value);

  const getDisplayValue = () => {
    switch (selectedFormat) {
      case 'hex':
        return value;
      case 'rgb':
        return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : value;
      case 'hsl':
        return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : value;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <label className="text-xs text-white/70 block">{label}</label>
        <div className="flex gap-2">
          {(['hex', 'rgb', 'hsl'] as const).map((format) => (
            <button
              key={format}
              onClick={() => setSelectedFormat(format)}
              className={`text-xs px-1 rounded ${
                selectedFormat === format 
                  ? 'text-white bg-white/20' 
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 rounded cursor-pointer bg-transparent"
        />
        <div className="mt-1 text-xs text-white/70 font-mono">
          {getDisplayValue()}
        </div>
      </div>
    </div>
  );
};

export default SettingsColor;