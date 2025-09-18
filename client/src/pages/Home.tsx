import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuickActions from "@/components/QuickActions";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
  type?: "text" | "image" | "disease-result" | "crop-advisory" | "weather";
  confidence?: number;
  diseaseType?: string;
  imageSrc?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mock AI responses //todo: remove mock functionality
  const mockResponses = {
    weather: "Based on your location, here's the 7-day forecast: Expect mild temperatures around 25-30°C with occasional showers in the next 3 days. Perfect conditions for watering crops. Humidity will be 65-70%, ideal for most crops. No extreme weather alerts for your area.",
    "mandi-prices": "Current mandi prices in your area: Wheat ₹2,150/quintal (↑5%), Rice ₹1,950/quintal (→), Sugarcane ₹385/quintal (↓2%), Tomato ₹35/kg (↑12%), Onion ₹28/kg (→). Prices updated 2 hours ago from nearest APMCs.",
    "crop-advisory": "For this season (Rabi), I recommend: 1) Wheat cultivation if you have well-drained soil, 2) Mustard for oil production - good market demand, 3) Gram (chickpea) for nitrogen fixation, 4) Consider crop rotation with legumes. Based on soil type and rainfall patterns in your region.",
    "disease-scan": "I'm ready to help you identify plant diseases! Please upload a clear photo of the affected plant parts. Make sure the image shows the symptoms clearly - leaves, stems, or fruits with any discoloration, spots, or unusual growth.",
    default: "I'm here to help with all your farming needs! You can ask me about crop diseases, weather forecasts, market prices, seasonal advice, or upload images of your plants for disease detection. How can I assist you today?"
  };

  const generateResponse = (userMessage: string, type?: "text" | "image") => {
    const message = userMessage.toLowerCase();
    
    if (type === "image") {
      return {
        message: "I've analyzed your plant image. Based on the symptoms visible, this appears to be Early Blight (Alternaria solani), a common fungal disease. I can see the characteristic dark, concentric spots on the leaves. Here's what you should do: 1) Remove affected leaves immediately, 2) Improve air circulation around plants, 3) Apply copper-based fungicide, 4) Water at soil level to avoid wetting leaves, 5) Consider resistant varieties for future planting.",
        type: "disease-result" as const,
        confidence: 87,
        diseaseType: "Early Blight"
      };
    }
    
    if (message.includes('weather') || message.includes('forecast')) {
      return { message: mockResponses.weather, type: "weather" as const };
    }
    if (message.includes('price') || message.includes('mandi')) {
      return { message: mockResponses["mandi-prices"], type: "crop-advisory" as const };
    }
    if (message.includes('crop') || message.includes('plant') || message.includes('season')) {
      return { message: mockResponses["crop-advisory"], type: "crop-advisory" as const };
    }
    if (message.includes('disease') || message.includes('scan')) {
      return { message: mockResponses["disease-scan"], type: "text" as const };
    }
    
    return { message: mockResponses.default, type: "text" as const };
  };

  const handleSendMessage = (message: string, type?: "text" | "image", file?: File) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type || "text",
      imageSrc: file ? URL.createObjectURL(file) : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(message, type);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: response.message,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: response.type,
        confidence: response.confidence,
        diseaseType: response.diseaseType
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string, message: string) => {
    handleSendMessage(message);
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-home">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col max-w-4xl mx-auto">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <h1 className="font-heading font-bold text-3xl mb-2 text-foreground">
                      Welcome to Krishi Sahayi
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                      Your AI-powered farming companion. Get instant help with plant diseases, 
                      weather forecasts, crop advice, and market prices.
                    </p>
                  </motion.div>
                  
                  <QuickActions onActionClick={handleQuickAction} />
                </motion.div>
              )}
            </AnimatePresence>

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.message}
                isUser={message.isUser}
                timestamp={message.timestamp}
                type={message.type}
                confidence={message.confidence}
                diseaseType={message.diseaseType}
                imageSrc={message.imageSrc}
              />
            ))}

            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={handleSendMessage} isLoading={isTyping} />
        </div>
      </main>
    </div>
  );
}