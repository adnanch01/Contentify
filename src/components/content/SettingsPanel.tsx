
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToneOption, ContentType, OutputSettings } from "@/types/content";
import { AnimatePresence, motion } from "framer-motion";

interface SettingsPanelProps {
  settings: OutputSettings;
  setSettings: (settings: OutputSettings) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

export function SettingsPanel({
  settings,
  setSettings,
  showSettings,
  setShowSettings,
}: SettingsPanelProps) {
  const toneOptions: ToneOption[] = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "persuasive", label: "Persuasive" },
    { value: "informative", label: "Informative" },
    { value: "creative", label: "Creative" }
  ];
  
  const contentTypes: ContentType[] = [
    { value: "blog", label: "Blog Post" },
    { value: "essay", label: "Essay" },
    { value: "social", label: "Social Caption" },
    { value: "marketing", label: "Marketing Copy" },
    { value: "creative", label: "Creative Writing" }
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-medium blue-gradient-text">Content Generator</h2>
        <Button
          variant="outline"
          size="sm"
          className="glass-card hover:blue-glow text-xs"
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showSettings ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-4 mb-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Content Type</label>
                <select
                  className="w-full bg-background border border-border/50 rounded p-2 text-sm"
                  value={settings.contentType}
                  onChange={(e) => setSettings({...settings, contentType: e.target.value as any})}
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Tone</label>
                <select
                  className="w-full bg-background border border-border/50 rounded p-2 text-sm"
                  value={settings.tone}
                  onChange={(e) => setSettings({...settings, tone: e.target.value as any})}
                >
                  {toneOptions.map(tone => (
                    <option key={tone.value} value={tone.value}>{tone.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Word Count</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border/50 rounded p-2 text-sm"
                  value={settings.wordCount}
                  onChange={(e) => setSettings({...settings, wordCount: parseInt(e.target.value) || 0})}
                  min={100}
                  max={2000}
                  step={100}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
