import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
        className="bg-[#221F26] border-[#403E43] shadow-[0_0_10px_rgba(214,188,250,0.3)]"
      >
        <SheetHeader>
          <SheetTitle className="text-[#D6BCFA] font-['Press_Start_2P'] text-xl uppercase tracking-wider">Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2 border-2 border-[#403E43] p-4 rounded-lg">
            <label className="text-sm font-medium text-[#C8C8C9] font-['Press_Start_2P']">Blob Speed ({blobSpeed}%)</label>
            <Slider
              value={[blobSpeed]}
              onValueChange={(value) => setBlobSpeed(value[0])}
              min={1}
              max={200}
              step={1}
              className="[&_[role=slider]]:bg-[#D6BCFA] [&_[role=slider]]:border-[#403E43]"
            />
          </div>
          <div className="space-y-2 border-2 border-[#403E43] p-4 rounded-lg">
            <label className="text-sm font-medium text-[#C8C8C9] font-['Press_Start_2P']">Number of Blobs ({numBlobs})</label>
            <Slider
              value={[numBlobs]}
              onValueChange={(value) => setNumBlobs(Math.round(value[0]))}
              min={1}
              max={24}
              step={1}
              className="[&_[role=slider]]:bg-[#D6BCFA] [&_[role=slider]]:border-[#403E43]"
            />
          </div>
          <div className="space-y-2 border-2 border-[#403E43] p-4 rounded-lg">
            <label className="text-sm font-medium text-[#C8C8C9] font-['Press_Start_2P']">Gradient Start Color</label>
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => setGradientStart(e.target.value)}
              className="w-full h-10 rounded cursor-pointer bg-transparent border-2 border-[#403E43]"
            />
          </div>
          <div className="space-y-2 border-2 border-[#403E43] p-4 rounded-lg">
            <label className="text-sm font-medium text-[#C8C8C9] font-['Press_Start_2P']">Gradient End Color</label>
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => setGradientEnd(e.target.value)}
              className="w-full h-10 rounded cursor-pointer bg-transparent border-2 border-[#403E43]"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="w-full border-2 border-[#403E43] bg-[#221F26] text-[#D6BCFA] hover:bg-[#403E43] font-['Press_Start_2P'] uppercase tracking-wider"
          >
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;