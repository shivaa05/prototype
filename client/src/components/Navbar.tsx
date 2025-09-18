import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  CloudRain, 
  TrendingUp, 
  Banknote, 
  Building2,
  Camera,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen = false }: NavbarProps) {
  const [location] = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "AI Assistant",
      path: "/",
      description: "Chat with AI",
      badge: "AI",
      color: "text-green-600"
    },
    {
      icon: CloudRain,
      label: "Weather",
      path: "/weather",
      description: "7-day forecast",
      badge: "Live",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Crop Advisory",
      path: "/crop-advisory",
      description: "Seasonal tips",
      badge: "Smart",
      color: "text-orange-600"
    },
    {
      icon: Banknote,
      label: "Mandi Prices",
      path: "/mandi-prices",
      description: "Market rates",
      badge: "₹",
      color: "text-purple-600"
    },
    {
      icon: Building2,
      label: "Gov Schemes",
      path: "/government-schemes",
      description: "Subsidies",
      badge: "New",
      color: "text-indigo-600"
    },
    {
      icon: Camera,
      label: "Disease Scanner",
      path: "/disease-scanner",
      description: "AI analysis",
      badge: "Beta",
      color: "text-red-600"
    }
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-background/95 backdrop-blur-sm border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`relative h-auto p-3 flex flex-col items-center gap-1 min-w-[100px] ${
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      data-testid={`nav-desktop-${item.path.slice(1) || "home"}`}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${isActive ? "" : item.color}`} />
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                      <span className="text-xs font-medium">{item.label}</span>
                      <span className="text-xs opacity-75">{item.description}</span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border border-border"
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onMobileMenuToggle}
            data-testid="mobile-menu-overlay"
          />
        )}

        {/* Mobile Menu */}
        <motion.nav
          initial={{ x: "-100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-50 flex flex-col shadow-lg"
          data-testid="mobile-menu"
        >
          <div className="p-6 border-b border-border">
            <h2 className="font-heading font-semibold text-lg">Navigation</h2>
            <p className="text-sm text-muted-foreground">Explore Krishi Sahayi features</p>
          </div>
          
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-auto p-4 ${
                      isActive ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={onMobileMenuToggle}
                    data-testid={`nav-mobile-${item.path.slice(1) || "home"}`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? "" : item.color}`} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.label}</span>
                          <Badge 
                            variant={isActive ? "secondary" : "outline"} 
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        </div>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Made for Indian Farmers</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>
        </motion.nav>
      </div>
    </>
  );
}