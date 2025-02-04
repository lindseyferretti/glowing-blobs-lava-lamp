import React from 'react';

interface SettingsColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  format: 'hex' | 'rgb' | 'hsl';
  onFormatChange: () => void;
}

const SettingsColor = ({ 
  label, 
  value, 
  onChange, 
  format, 
  onFormatChange 
}: SettingsColorProps) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

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

  const getDisplayValue = () => {
    switch (format) {
      case 'hex':
        return value.toUpperCase();
      case 'rgb': {
        const rgb = hexToRgb(value);
        return rgb ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})` : value;
      }
      case 'hsl': {
        const hsl = hexToHsl(value);
        return hsl ? `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)` : value;
      }
    }
  };

  return (
    <div className="space-y-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
      <label className="text-xs text-white/70 block">{label}</label>
      <div className="space-y-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 rounded cursor-pointer bg-transparent"
        />
        <button
          onClick={onFormatChange}
          className="w-full text-[10px] text-white/70 hover:text-white/90 transition-colors text-left font-mono"
        >
          {getDisplayValue()}
        </button>
      </div>
    </div>
  );
};

export default SettingsColor;