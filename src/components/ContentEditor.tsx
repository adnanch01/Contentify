
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { OutputSettings } from "@/types/content";
import { generateContent } from "@/services/gemini";
import { SettingsPanel } from "./content/SettingsPanel";
import { PromptInput } from "./content/PromptInput";
import { OutputDisplay } from "./content/OutputDisplay";

export function ContentEditor() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<OutputSettings>({
    tone: "professional",
    contentType: "blog",
    wordCount: 500
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt is empty",
        description: "Please enter a prompt to generate content",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setOutput("");
    
    try {
      console.log("Generating content with settings:", settings);
      const result = await generateContent(prompt, settings);
      
      if (result.error) {
        toast({
          title: "Error generating content",
          description: result.error,
          variant: "destructive"
        });
      } else {
        setOutput(result.text);
        toast({
          title: "Content generated",
          description: `Generated a ${settings.contentType} in ${settings.tone} tone with target of ${settings.wordCount} words`,
        });
      }
    } catch (error) {
      toast({
        title: "Error generating content",
        description: "An error occurred while generating your content",
        variant: "destructive"
      });
      console.error("Content generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <SettingsPanel 
        settings={settings}
        setSettings={setSettings}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        settings={settings}
      />
      
      {output && (
        <OutputDisplay
          output={output}
          setOutput={setOutput}
          settings={settings}
        />
      )}
    </div>
  );
}
