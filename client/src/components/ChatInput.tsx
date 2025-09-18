import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Camera, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string, type?: "text" | "image", file?: File) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSendMessage, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onSendMessage("Image uploaded for analysis", "image", file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
      data-testid="chat-input-container"
    >
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCameraClick}
            className="flex-shrink-0"
            data-testid="button-camera"
          >
            <Camera className="w-4 h-4" />
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="input-file"
          />
        </div>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your crops, upload plant images, or get farming advice..."
            className="pr-12 rounded-full"
            disabled={isLoading}
            data-testid="input-message"
          />
          
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8"
            disabled={!message.trim() || isLoading}
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
      
      <div className="flex flex-wrap gap-2 mt-3 max-w-4xl mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendMessage("What's the weather forecast for this week?")}
          className="text-xs"
          data-testid="button-quick-weather"
        >
          Weather Forecast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendMessage("Show me today's mandi prices")}
          className="text-xs"
          data-testid="button-quick-prices"
        >
          Mandi Prices
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendMessage("What crops should I plant this season?")}
          className="text-xs"
          data-testid="button-quick-advisory"
        >
          Crop Advisory
        </Button>
      </div>
    </motion.div>
  );
}