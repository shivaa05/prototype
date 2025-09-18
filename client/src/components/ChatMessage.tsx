import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Camera, Leaf, TrendingUp, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  type?: "text" | "image" | "disease-result" | "crop-advisory" | "weather";
  confidence?: number;
  diseaseType?: string;
  imageSrc?: string;
}

export default function ChatMessage({ 
  message, 
  isUser, 
  timestamp, 
  type = "text",
  confidence,
  diseaseType,
  imageSrc 
}: ChatMessageProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "disease-result": return <Leaf className="w-4 h-4" />;
      case "crop-advisory": return <TrendingUp className="w-4 h-4" />;
      case "weather": return <CloudRain className="w-4 h-4" />;
      case "image": return <Camera className="w-4 h-4" />;
      default: return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`message-${isUser ? "user" : "ai"}`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={isUser ? "/api/placeholder/32/32" : "@assets/generated_images/Farmer_avatar_illustration_de16c214.png"} />
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 max-w-xs sm:max-w-md ${isUser ? "text-right" : "text-left"}`}>
        <Card className={`p-4 ${isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-card"}`}>
          {type === "image" && imageSrc && (
            <div className="mb-3">
              <img 
                src={imageSrc} 
                alt="Uploaded plant" 
                className="w-full h-32 object-cover rounded-md"
                data-testid="uploaded-image"
              />
            </div>
          )}
          
          {type === "disease-result" && (
            <div className="mb-3 space-y-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="font-medium">Disease Detection Result</span>
              </div>
              {diseaseType && (
                <Badge variant="secondary" className="w-fit">
                  {diseaseType}
                </Badge>
              )}
              {confidence && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Confidence:</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getConfidenceColor(confidence)}`} />
                    <span className="text-sm font-medium">{confidence}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <p className="text-sm leading-relaxed" data-testid="message-content">
            {message}
          </p>
          
          {!isUser && type !== "text" && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
              {getTypeIcon()}
              <span className="text-xs text-muted-foreground capitalize">{type.replace("-", " ")}</span>
            </div>
          )}
        </Card>
        
        <p className="text-xs text-muted-foreground mt-1" data-testid="message-timestamp">
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
}