import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  MapPin,
  Calendar,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

export default function Weather() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hardcoded weather data //todo: remove mock functionality
  const currentWeather = {
    location: "Pune, Maharashtra",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    feelsLike: 31,
    icon: Cloud
  };

  const dailyForecast = [
    { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", icon: Cloud, rain: 20 },
    { day: "Tomorrow", high: 32, low: 24, condition: "Sunny", icon: Sun, rain: 5 },
    { day: "Thu", high: 29, low: 21, condition: "Light Rain", icon: CloudRain, rain: 70 },
    { day: "Fri", high: 27, low: 20, condition: "Heavy Rain", icon: CloudRain, rain: 90 },
    { day: "Sat", high: 25, low: 19, condition: "Cloudy", icon: Cloud, rain: 40 },
    { day: "Sun", high: 28, low: 22, condition: "Sunny", icon: Sun, rain: 10 },
    { day: "Mon", high: 31, low: 23, condition: "Partly Cloudy", icon: Cloud, rain: 15 }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      message: "Expect 50-80mm rainfall Thu-Fri. Avoid field work during this period.",
      time: "2 hours ago"
    },
    {
      type: "info",
      title: "Optimal Irrigation Time",
      message: "Best time for watering: 6-8 AM and 5-7 PM today.",
      time: "6 hours ago"
    }
  ];

  const farmingInsights = [
    {
      icon: Droplets,
      title: "Irrigation Advice",
      description: "Reduce watering by 60% due to expected rainfall Thu-Fri",
      priority: "high"
    },
    {
      icon: Wind,
      title: "Spray Conditions",
      description: "Good conditions for pesticide application today (low wind)",
      priority: "medium"
    },
    {
      icon: TrendingUp,
      title: "Crop Growth",
      description: "Favorable conditions for wheat and mustard this week",
      priority: "low"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-weather">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Weather Forecast
            </h1>
            <p className="text-muted-foreground">
              Get detailed weather information to plan your farming activities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Current Weather
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{currentWeather.location}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold">{currentWeather.temperature}°</span>
                        <div>
                          <p className="text-lg font-medium">{currentWeather.condition}</p>
                          <p className="text-sm text-muted-foreground">
                            Feels like {currentWeather.feelsLike}°
                          </p>
                        </div>
                      </div>
                    </div>
                    <currentWeather.icon className="w-16 h-16 text-primary" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{currentWeather.humidity}%</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Wind className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                      <p className="text-sm text-muted-foreground">Wind</p>
                      <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Eye className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="font-semibold">{currentWeather.visibility} km</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Sun className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                      <p className="text-sm text-muted-foreground">UV Index</p>
                      <p className="font-semibold">{currentWeather.uvIndex}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weather Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      alert.type === 'warning' ? 'bg-orange-50 dark:bg-orange-950' : 'bg-blue-50 dark:bg-blue-950'
                    }`}>
                      <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Farming Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {farmingInsights.map((insight, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <insight.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                        <Badge variant={insight.priority === 'high' ? 'destructive' : 
                                    insight.priority === 'medium' ? 'default' : 'secondary'} 
                               className="mt-2 text-xs">
                          {insight.priority} priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* 7-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  7-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {dailyForecast.map((day, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm mb-2">{day.day}</p>
                      <day.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground mb-1">{day.condition}</p>
                      <div className="space-y-1">
                        <p className="font-semibold">{day.high}°</p>
                        <p className="text-sm text-muted-foreground">{day.low}°</p>
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span className="text-xs">{day.rain}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}