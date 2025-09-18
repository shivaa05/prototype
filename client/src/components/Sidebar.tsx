import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  CloudRain, 
  TrendingUp, 
  Banknote, 
  Building2,
  Camera,
  X,
  Menu
} from "lucide-react";
import logoUrl from "@assets/generated_images/Krishi_Sahayi_app_logo_f05ad388.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "AI Assistant",
      path: "/",
      description: "Chat with AI for instant help",
      badge: "AI"
    },
    {
      icon: CloudRain,
      label: "Weather",
      path: "/weather",
      description: "7-day forecast & alerts",
      badge: "Live"
    },
    {
      icon: TrendingUp,
      label: "Crop Advisory",
      path: "/crop-advisory",
      description: "Seasonal recommendations",
      badge: "Smart"
    },
    {
      icon: Banknote,
      label: "Mandi Prices",
      path: "/mandi-prices",
      description: "Real-time market rates",
      badge: "₹"
    },
    {
      icon: Building2,
      label: "Gov Schemes",
      path: "/government-schemes",
      description: "Subsidies & benefits",
      badge: "New"
    },
    {
      icon: Camera,
      label: "Disease Scanner",
      path: "/disease-scanner",
      description: "Upload & analyze plants",
      badge: "Beta"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            data-testid="sidebar-backdrop"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
            data-testid="sidebar"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <img 
                  src={logoUrl} 
                  alt="Krishi Sahayi" 
                  className="w-8 h-8 rounded-md"
                />
                <div>
                  <h2 className="font-heading font-semibold text-sidebar-foreground">
                    Krishi Sahayi
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Agricultural Assistant
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden"
                data-testid="button-close-sidebar"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start h-auto p-4 ${
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      }`}
                      onClick={onClose}
                      data-testid={`nav-${item.path.slice(1) || "home"}`}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Made for Indian Farmers
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All systems operational
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}