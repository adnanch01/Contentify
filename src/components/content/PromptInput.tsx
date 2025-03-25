
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OutputSettings } from "@/types/content";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  settings?: OutputSettings;
}

export function PromptInput({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
  settings,
}: PromptInputProps) {
  // Format the content type label for display
  const getContentTypeLabel = () => {
    if (!settings) return "";
    switch(settings.contentType) {
      case "blog": return "Blog Post";
      case "essay": return "Essay";
      case "social": return "Social Caption";
      case "marketing": return "Marketing Copy";
      case "creative": return "Creative Writing";
      default: return settings.contentType;
    }
  };

  return (
    <div className="glass-card p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs text-muted-foreground">Your Prompt</label>
        {settings && (
          <span className="text-xs text-muted-foreground">
            Generating: {getContentTypeLabel()} • {settings.tone} tone • {settings.wordCount} words
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          className="w-full bg-background border border-border/50 rounded p-3 min-h-[120px] text-sm resize-none thin-scrollbar"
          placeholder="Describe the content you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          className="absolute bottom-3 right-3 bg-primary hover:bg-primary/90 text-white rounded-full h-8 px-3 py-1 flex items-center gap-1"
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? (
            <>Generating<span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white ml-1"></span></>
          ) : (
            <>Generate <Sparkles className="h-3 w-3" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
