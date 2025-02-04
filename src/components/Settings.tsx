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

interface SettingsProps {
  blobSpeed: number;
  setBlobSpeed: (value: number) => void;
  numBlobs: number;
  setNumBlobs: (value: number) => void;
  gradientStart: string;
  setGradientStart: (value: string) => void;
  gradientEnd: string;
  setGradientEnd: (value: string) => void;
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
}: SettingsProps) => {
  const isMobile = useIsMobile();
  
  const handleReset = () => {
    setBlobSpeed(50);
    setNumBlobs(12);
    setGradientStart('#9b87f5');
    setGradientEnd('#D946EF');
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
        className="bg-[#1A1F2C] border border-[#D6BCFA] shadow-[0_0_10px_rgba(214,188,250,0.2)] backdrop-blur-sm"
      >
        <SheetHeader>
          <SheetTitle className="text-[#D6BCFA] font-[Silkscreen] text-sm uppercase">Settings</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <SettingsSlider
            label="Blob Speed"
            value={blobSpeed}
            onChange={setBlobSpeed}
            min={1}
            max={200}
            step={1}
          />
          <SettingsSlider
            label="Number of Blobs"
            value={numBlobs}
            onChange={(value) => setNumBlobs(Math.round(value))}
            min={1}
            max={24}
            step={1}
          />
          <SettingsColor
            label="Gradient Start"
            value={gradientStart}
            onChange={setGradientStart}
          />
          <SettingsColor
            label="Gradient End"
            value={gradientEnd}
            onChange={setGradientEnd}
          />
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="w-full border border-[#D6BCFA] bg-[#221F26]/80 text-[#D6BCFA] hover:bg-[#D6BCFA] hover:text-[#1A1F2C] font-[Silkscreen] text-xs uppercase transition-all duration-300"
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;