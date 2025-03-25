
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenuItem, SidebarGroup, SidebarMenuButton } from "@/components/ui/sidebar";
import { 
  Home, 
  Settings, 
  FileText, 
  PanelLeft, 
  History, 
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number | string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
}

function SidebarItemComponent({ 
  icon, 
  label, 
  active = false,
  badge,
  variant = "default",
  onClick 
}: SidebarItemProps) {
  return (
    <SidebarMenuItem 
      className={`flex items-center gap-3 py-2 px-3 rounded-md mb-1 text-sm
        ${active ? 'glass-card blue-glow' : 'hover:glass-card hover:blue-glow'}`}
    >
      <SidebarMenuButton 
        isActive={active} 
        onClick={onClick}
      >
        <div>
          {icon}
        </div>
        <div className="flex-1">{label}</div>
        {badge && (
          <Badge 
            variant={variant}
            className={`
              ${variant === 'default' ? 'bg-primary/20 text-primary' : ''}
              ${variant === 'secondary' ? 'bg-secondary/20 text-secondary' : ''}
              ${variant === 'outline' ? 'bg-muted-foreground/20 text-muted-foreground' : ''}
            `}
          >
            {badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// Create a new hook to handle both mobile detection and sidebar toggling
function useMobile() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return { isMobile, toggleSidebar };
}

export const AppSidebar = () => {
  const { isMobile, toggleSidebar } = useMobile();
  const [activeItem, setActiveItem] = useState("home");
  
  const handleItemClick = (key: string) => {
    setActiveItem(key);
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <h1 className="text-xl font-medium blue-gradient-text">Contentify</h1>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarItemComponent 
            icon={<Home className="h-4 w-4" />} 
            label="Dashboard" 
            active={activeItem === "home"}
            onClick={() => handleItemClick("home")}
          />
          <SidebarItemComponent 
            icon={<FileText className="h-4 w-4" />} 
            label="Content" 
            active={activeItem === "content"}
            onClick={() => handleItemClick("content")}
          />
          <SidebarItemComponent 
            icon={<Bookmark className="h-4 w-4" />} 
            label="Saved" 
            active={activeItem === "saved"}
            badge={3}
            onClick={() => handleItemClick("saved")}
          />
          <SidebarItemComponent 
            icon={<History className="h-4 w-4" />} 
            label="History" 
            active={activeItem === "history"}
            onClick={() => handleItemClick("history")}
          />
        </SidebarGroup>
        
        <Separator className="my-4 bg-white/10" />
        
        <SidebarGroup>
          <div className="px-3 py-1 text-xs text-muted-foreground mb-1">
            Recent Content
          </div>
          
          <div className="overflow-hidden">
            {[].length > 0 ? (
              <></>
            ) : (
              <div className="text-muted-foreground text-xs text-center px-3 py-2">
                No recent content
              </div>
            )}
          </div>
        </SidebarGroup>
        
        <div className="flex-1" />
        
        <SidebarGroup className="mt-auto">
          <SidebarItemComponent 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            active={activeItem === "settings"}
            onClick={() => handleItemClick("settings")}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center justify-center">
          {/* Footer content can be added here */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
