
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentEditor } from "@/components/ContentEditor";
import { ContentType, OutputSettings, ToneOption } from "@/types/content";
import { Loading } from "@/components/Loading";
import { AnimatedLogo } from "@/components/AnimatedLogo";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Contentify",
        description: "Your AI content generation platform",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden blue-gradient-bg">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="py-4 px-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <AnimatedLogo />
            </div>
            <nav className="flex gap-4">
              <button className="px-3 py-1.5 rounded-full text-sm glass-card hover:blue-glow transition-all duration-300">
                Dashboard
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm glass-card hover:blue-glow transition-all duration-300">
                My Content
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm bg-primary hover:bg-primary/90 transition-all duration-300 text-white rounded-full">
                Sign In
              </button>
            </nav>
          </header>
          <main className="flex-1 p-6 overflow-auto thin-scrollbar">
            <ContentEditor />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
