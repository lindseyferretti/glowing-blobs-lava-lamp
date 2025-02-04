import React, { useCallback, useMemo } from 'react';
import { hexToRgb, hexToHsl } from '@/utils/colorUtils';

interface SettingsColorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  format: 'hex' | 'rgb' | 'hsl';
  onFormatChange: () => void;
}

const SettingsColor = React.memo(({ 
  label, 
  value, 
  onChange, 
  format, 
  onFormatChange 
}: SettingsColorProps) => {
  const getDisplayValue = useCallback(() => {
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
  }, [value, format]);

  const displayValue = useMemo(() => getDisplayValue(), [getDisplayValue]);

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
          {displayValue}
        </button>
      </div>
    </div>
  );
});

SettingsColor.displayName = 'SettingsColor';

export default SettingsColor;