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

interface SettingsProps {
  blobSpeed: number;
  setBlobSpeed: (value: number) => void;
  blobStickiness: number;
  setBlobStickiness: (value: number) => void;
  numBlobs: number;
  setNumBlobs: (value: number) => void;
}

const Settings = ({
  blobSpeed,
  setBlobSpeed,
  blobStickiness,
  setBlobStickiness,
  numBlobs,
  setNumBlobs,
}: SettingsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <SettingsIcon className="w-6 h-6 text-white/70" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Blob Speed ({blobSpeed}%)</label>
            <Slider
              value={[blobSpeed]}
              onValueChange={(value) => setBlobSpeed(value[0])}
              min={1}
              max={200}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Blob Stickiness ({blobStickiness}%)</label>
            <Slider
              value={[blobStickiness]}
              onValueChange={(value) => setBlobStickiness(value[0])}
              min={1}
              max={200}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Blobs ({numBlobs})</label>
            <Slider
              value={[numBlobs]}
              onValueChange={(value) => setNumBlobs(Math.round(value[0]))}
              min={1}
              max={24}
              step={1}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;