import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import SettingsSlider from "@/components/ui/settings-slider";
import SettingsColor from "@/components/ui/settings-color";

const colorPairs = [
  { start: '#D946EF', end: '#9b87f5' },  // Default purple-pink
  { start: '#8B5CF6', end: '#F97316' },  // Vivid purple to orange
  { start: '#0EA5E9', end: '#F2FCE2' },  // Ocean blue to soft green
  { start: '#FEC6A1', end: '#E5DEFF' },  // Soft orange to soft purple
  { start: '#FFDEE2', end: '#D3E4FD' },  // Soft pink to soft blue
];

interface SettingsProps {
  blobSpeed: number;
  setBlobSpeed: (value: number) => void;
  numBlobs: number;
  setNumBlobs: (value: number) => void;
  gradientStart: string;
  setGradientStart: (value: string) => void;
  gradientEnd: string;
  setGradientEnd: (value: string) => void;
  smoothness: number;
  setSmoothness: (value: number) => void;
}

const Settings = ({
  blobSpeed,
  setBlobSpeed,
  numBlobs,
  setNumBlobs,
  gradientStart,
  setGradientStart,
  gradientEnd,
  setGradientEnd,
  smoothness,
  setSmoothness,
}: SettingsProps) => {
  const isMobile = useIsMobile();
  const [colorFormat, setColorFormat] = React.useState<'hex' | 'rgb' | 'hsl'>('hex');
  
  const handleReset = () => {
    setBlobSpeed(50);
    setNumBlobs(12);
    setGradientStart('#D946EF');
    setGradientEnd('#9b87f5');
    setSmoothness(5);
  };

  const handleColorClick = () => {
    const currentPair = colorPairs.findIndex(
      pair => pair.start === gradientStart && pair.end === gradientEnd
    );
    const nextPair = colorPairs[(currentPair + 1) % colorPairs.length];
    setGradientStart(nextPair.start);
    setGradientEnd(nextPair.end);
  };

  const handleFormatChange = () => {
    setColorFormat(current => {
      switch (current) {
        case 'hex': return 'rgb';
        case 'rgb': return 'hsl';
        case 'hsl': return 'hex';
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed top-4 right-4">
          <SettingsIcon className="w-6 h-6 text-white/70 hover:text-white/90 transition-colors" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side={isMobile ? "top" : "right"}
        className="bg-[#1A1F2C] shadow-lg backdrop-blur-sm"
      >
        <SheetHeader>
          <SheetTitle className="text-white/90 text-sm uppercase">Settings</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <SettingsSlider
            label="Blob Speed"
            value={blobSpeed}
            onChange={setBlobSpeed}
            min={1}
            max={200}
            step={1}
            color={gradientStart}
          />
          <SettingsSlider
            label="Number of Blobs"
            value={numBlobs}
            onChange={(value) => setNumBlobs(Math.round(value))}
            min={1}
            max={24}
            step={1}
            color={gradientStart}
          />
          <SettingsSlider
            label="Edge Smoothness"
            value={smoothness}
            onChange={setSmoothness}
            min={1}
            max={10}
            step={1}
            color={gradientStart}
          />
          <div className="grid grid-cols-2 gap-2">
            <SettingsColor
              label="Gradient Start"
              value={gradientStart}
              onChange={setGradientStart}
              format={colorFormat}
              onFormatChange={handleFormatChange}
            />
            <SettingsColor
              label="Gradient End"
              value={gradientEnd}
              onChange={setGradientEnd}
              format={colorFormat}
              onFormatChange={handleFormatChange}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="w-full bg-black/20 text-white/90 hover:bg-black/40 text-xs uppercase transition-all duration-300"
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;