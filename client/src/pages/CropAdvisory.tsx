import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Calendar, 
  TrendingUp,
  Droplets,
  Bug,
  Sprout,
  Sun,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function CropAdvisory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("rabi");

  // Hardcoded crop advisory data //todo: remove mock functionality
  const seasons = [
    { id: "rabi", name: "Rabi (Winter)", active: true },
    { id: "kharif", name: "Kharif (Monsoon)", active: false },
    { id: "zaid", name: "Zaid (Summer)", active: false }
  ];

  const recommendations: Record<string, Array<{
    crop: string;
    icon: string;
    priority: string;
    sowingTime: string;
    harvestTime: string;
    expectedYield: string;
    marketDemand: string;
    tips: string[];
    diseases: string[];
    profitability: number;
  }>> = {
    rabi: [
      {
        crop: "Wheat",
        icon: "🌾",
        priority: "high",
        sowingTime: "Nov - Dec",
        harvestTime: "Apr - May",
        expectedYield: "40-45 quintals/hectare",
        marketDemand: "High",
        tips: ["Use certified seeds", "Apply balanced fertilizers", "Ensure proper irrigation"],
        diseases: ["Rust", "Smut"],
        profitability: 85
      },
      {
        crop: "Mustard",
        icon: "🌻",
        priority: "medium",
        sowingTime: "Oct - Nov",
        harvestTime: "Feb - Mar",
        expectedYield: "15-20 quintals/hectare",
        marketDemand: "Medium",
        tips: ["Good for oil production", "Requires less water", "Good bee crop"],
        diseases: ["Alternaria blight", "Downy mildew"],
        profitability: 70
      },
      {
        crop: "Gram (Chickpea)",
        icon: "🫘",
        priority: "high",
        sowingTime: "Oct - Nov",
        harvestTime: "Mar - Apr",
        expectedYield: "20-25 quintals/hectare",
        marketDemand: "High",
        tips: ["Fixes nitrogen in soil", "Good rotation crop", "Drought tolerant"],
        diseases: ["Wilt", "Blight"],
        profitability: 78
      }
    ]
  };

  const seasonalTasks = [
    {
      task: "Land Preparation",
      status: "completed",
      deadline: "October 2024",
      description: "Deep plowing and field leveling"
    },
    {
      task: "Seed Selection",
      status: "in-progress",
      deadline: "November 2024",
      description: "Choose high-yielding variety seeds"
    },
    {
      task: "Sowing",
      status: "upcoming",
      deadline: "December 2024",
      description: "Optimal sowing window for winter crops"
    },
    {
      task: "First Irrigation",
      status: "upcoming",
      deadline: "December 2024",
      description: "Crown root irrigation for wheat"
    }
  ];

  const weatherImpact = {
    temperature: { status: "optimal", message: "Perfect temperature for rabi crops (15-25°C)" },
    rainfall: { status: "low", message: "Prepare for irrigation due to low rainfall" },
    humidity: { status: "good", message: "Moderate humidity reduces disease risk" }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress": return <Clock className="w-4 h-4 text-orange-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
      case "medium": return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
      default: return "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-crop-advisory">
      <Header />
      <Navbar 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Crop Advisory
            </h1>
            <p className="text-muted-foreground">
              Get personalized crop recommendations based on season, soil, and market conditions
            </p>
          </motion.div>

          {/* Season Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => (
                <Button
                  key={season.id}
                  variant={selectedSeason === season.id ? "default" : "outline"}
                  onClick={() => setSelectedSeason(season.id)}
                  data-testid={`season-${season.id}`}
                >
                  {season.name}
                  {season.active && <Badge className="ml-2">Active</Badge>}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crop Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="font-heading font-semibold text-xl mb-4">
                Recommended Crops for {seasons.find(s => s.id === selectedSeason)?.name}
              </h2>
              
              {recommendations[selectedSeason]?.map((crop: any, index: number) => (
                <Card key={index} className={`${getPriorityColor(crop.priority)} border`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{crop.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{crop.crop}</span>
                          <Badge variant={crop.priority === 'high' ? 'default' : 'secondary'}>
                            {crop.priority} priority
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Yield: {crop.expectedYield}</span>
                          <span>•</span>
                          <span>Demand: {crop.marketDemand}</span>
                          <span>•</span>
                          <span>Profit Score: {crop.profitability}%</span>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Sprout className="w-4 h-4" />
                          Sowing Period
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.sowingTime}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Harvest Period
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.harvestTime}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Key Tips
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {crop.tips.map((tip: string, tipIndex: number) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Bug className="w-4 h-4" />
                          Watch for Diseases
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {crop.diseases.map((disease: string, diseaseIndex: number) => (
                            <Badge key={diseaseIndex} variant="outline" className="text-xs">
                              {disease}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Sidebar Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Seasonal Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Seasonal Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {seasonalTasks.map((task, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{task.task}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{task.description}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.deadline}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weather Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="w-5 h-5" />
                    Weather Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Temperature</p>
                        <p className="text-xs text-muted-foreground">{weatherImpact.temperature.message}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Droplets className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Rainfall</p>
                        <p className="text-xs text-muted-foreground">{weatherImpact.rainfall.message}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-xs text-muted-foreground">{weatherImpact.humidity.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Consider crop rotation for better soil health
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Monitor market prices before sowing
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Use organic fertilizers when possible
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Prepare for pest management early
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}