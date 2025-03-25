
import { FileDown, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { OutputSettings } from "@/types/content";

interface OutputDisplayProps {
  output: string;
  setOutput: (output: string) => void;
  settings?: OutputSettings;
}

export function OutputDisplay({ output, setOutput, settings }: OutputDisplayProps) {
  const { toast } = useToast();

  if (!output) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard"
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    
    // Use the content type in the filename if available
    const contentType = settings?.contentType || "content";
    element.download = `${contentType}-${new Date().toISOString().split('T')[0]}.txt`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Content has been downloaded as a text file"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-medium">Generated Content</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="glass-card hover:blue-glow text-xs"
            onClick={handleCopy}
          >
            <Copy className="h-3 w-3 mr-1" /> Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="glass-card hover:blue-glow text-xs"
            onClick={handleDownload}
          >
            <FileDown className="h-3 w-3 mr-1" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="glass-card hover:blue-glow text-xs"
            onClick={() => setOutput("")}
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Clear
          </Button>
        </div>
      </div>
      <div className="glass-card p-4 rounded-lg">
        <div className="bg-background border border-border/50 rounded p-3 min-h-[250px] text-sm thin-scrollbar whitespace-pre-wrap">{output}</div>
      </div>
    </motion.div>
  );
}
