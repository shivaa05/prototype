import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  CloudRain, 
  TrendingUp, 
  Banknote, 
  Leaf, 
  MapPin,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

interface QuickActionsProps {
  onActionClick: (action: string, message: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    {
      id: "disease-scan",
      icon: Camera,
      title: "Disease Scan",
      description: "Upload plant photo for instant disease detection",
      message: "I want to scan my plant for diseases",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      id: "weather",
      icon: CloudRain,
      title: "Weather Forecast",
      description: "Get detailed weather predictions",
      message: "Show me the weather forecast for farming",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      id: "crop-advisory",
      icon: TrendingUp,
      title: "Crop Advisory",
      description: "Personalized crop recommendations",
      message: "Give me crop advisory for this season",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      id: "mandi-prices",
      icon: Banknote,
      title: "Mandi Prices",
      description: "Latest market rates and trends",
      message: "Show me current mandi prices",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    }
  ];

  const quickTips = [
    { icon: Leaf, text: "Early detection saves crops", type: "success" },
    { icon: MapPin, text: "Location-based advice", type: "info" },
    { icon: Calendar, text: "Seasonal recommendations", type: "warning" },
    { icon: AlertTriangle, text: "Disease alerts", type: "destructive" }
  ];

  return (
    <div className="space-y-6" data-testid="quick-actions">
      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover-elevate cursor-pointer h-full" onClick={() => onActionClick(action.id, action.message)}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-4`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2" data-testid={`action-title-${action.id}`}>
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`action-description-${action.id}`}>
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h4 className="font-heading font-medium text-sm text-muted-foreground uppercase tracking-wide">
          Quick Tips
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <tip.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{tip.text}</span>
              <Badge variant={tip.type as any} className="ml-auto">
                {tip.type}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}