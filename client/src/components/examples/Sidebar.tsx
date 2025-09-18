import { useState } from 'react';
import Sidebar from '../Sidebar';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SidebarExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)} data-testid="button-open-sidebar">
          <Menu className="w-4 h-4 mr-2" />
          Open Sidebar
        </Button>
      </div>
      
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sidebar Example</h1>
        <p className="text-muted-foreground">
          The sidebar shows all the main navigation options for the Krishi Sahayi app.
          Click the menu button to open it.
        </p>
      </div>
    </div>
  );
}