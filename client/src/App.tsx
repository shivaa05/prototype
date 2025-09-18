import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Weather from "@/pages/Weather";
import CropAdvisory from "@/pages/CropAdvisory";
import MandiPrices from "@/pages/MandiPrices";
import GovernmentSchemes from "@/pages/GovernmentSchemes";
import DiseaseScanner from "@/pages/DiseaseScanner";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/weather" component={Weather} />
      <Route path="/crop-advisory" component={CropAdvisory} />
      <Route path="/mandi-prices" component={MandiPrices} />
      <Route path="/government-schemes" component={GovernmentSchemes} />
      <Route path="/disease-scanner" component={DiseaseScanner} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
