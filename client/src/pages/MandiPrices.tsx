import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Search,
  MapPin,
  Calendar,
  Banknote,
  BarChart3,
  Filter,
  RefreshCw
} from "lucide-react";

export default function MandiPrices() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Hardcoded mandi prices data //todo: remove mock functionality
  const categories = [
    { id: "all", name: "All Crops" },
    { id: "cereals", name: "Cereals" },
    { id: "pulses", name: "Pulses" },
    { id: "oilseeds", name: "Oilseeds" },
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" }
  ];

  const pricesData = [
    {
      crop: "Wheat",
      category: "cereals",
      currentPrice: 2150,
      previousPrice: 2045,
      unit: "quintal",
      market: "Pune APMC",
      lastUpdated: "2 hours ago",
      trend: "up",
      change: 5.1,
      quality: "FAQ",
      volume: 1500
    },
    {
      crop: "Rice (Basmati)",
      category: "cereals",
      currentPrice: 4200,
      previousPrice: 4150,
      unit: "quintal",
      market: "Delhi APMC",
      lastUpdated: "3 hours ago",
      trend: "up",
      change: 1.2,
      quality: "Premium",
      volume: 800
    },
    {
      crop: "Gram (Chickpea)",
      category: "pulses",
      currentPrice: 5800,
      previousPrice: 5950,
      unit: "quintal",
      market: "Indore APMC",
      lastUpdated: "1 hour ago",
      trend: "down",
      change: -2.5,
      quality: "Bold",
      volume: 600
    },
    {
      crop: "Mustard Seed",
      category: "oilseeds",
      currentPrice: 5200,
      previousPrice: 5200,
      unit: "quintal",
      market: "Jaipur APMC",
      lastUpdated: "4 hours ago",
      trend: "stable",
      change: 0,
      quality: "FAQ",
      volume: 900
    },
    {
      crop: "Tomato",
      category: "vegetables",
      currentPrice: 35,
      previousPrice: 31,
      unit: "kg",
      market: "Nashik APMC",
      lastUpdated: "30 min ago",
      trend: "up",
      change: 12.9,
      quality: "Grade A",
      volume: 2500
    },
    {
      crop: "Onion",
      category: "vegetables",
      currentPrice: 28,
      previousPrice: 28,
      unit: "kg",
      market: "Nashik APMC",
      lastUpdated: "1 hour ago",
      trend: "stable",
      change: 0,
      quality: "Medium",
      volume: 3200
    },
    {
      crop: "Turmeric",
      category: "spices",
      currentPrice: 8500,
      previousPrice: 8200,
      unit: "quintal",
      market: "Erode APMC",
      lastUpdated: "2 hours ago",
      trend: "up",
      change: 3.7,
      quality: "Finger",
      volume: 400
    },
    {
      crop: "Cotton",
      category: "fiber",
      currentPrice: 6800,
      previousPrice: 7000,
      unit: "quintal",
      market: "Akola APMC",
      lastUpdated: "3 hours ago",
      trend: "down",
      change: -2.9,
      quality: "Medium",
      volume: 1100
    }
  ];

  const marketTrends = [
    {
      category: "Cereals",
      trend: "up",
      change: "+3.2%",
      description: "Strong demand from government procurement"
    },
    {
      category: "Pulses",
      trend: "down",
      change: "-1.8%",
      description: "Good harvest leading to price correction"
    },
    {
      category: "Vegetables",
      trend: "up",
      change: "+8.5%",
      description: "Festival season driving up demand"
    },
    {
      category: "Oilseeds",
      trend: "stable",
      change: "±0.5%",
      description: "Stable export demand maintaining prices"
    }
  ];

  const filteredPrices = pricesData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.market.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-mandi-prices">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Mandi Prices
                </h1>
                <p className="text-muted-foreground">
                  Real-time agricultural commodity prices from major APMCs across India
                </p>
              </div>
              <Button variant="outline" className="w-fit">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Prices
              </Button>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search crops or markets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="search-input"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                    data-testid={`category-${category.id}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Market Trends Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Market Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketTrends.map((trend, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      {getTrendIcon(trend.trend)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{trend.category}</span>
                          <span className={`text-sm font-medium ${getTrendColor(trend.trend)}`}>
                            {trend.change}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{trend.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Prices Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Current Prices ({filteredPrices.length} items)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPrices.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-border rounded-lg p-4 hover-elevate"
                        data-testid={`price-item-${item.crop.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{item.crop}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.quality}
                              </Badge>
                              {getTrendIcon(item.trend)}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {item.market}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.lastUpdated}
                              </span>
                              <span>Volume: {item.volume} {item.unit}s</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">
                                ₹{item.currentPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">/{item.unit}</span>
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">
                                from ₹{item.previousPrice.toLocaleString()}
                              </span>
                              {item.change !== 0 && (
                                <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                                  ({item.change > 0 ? '+' : ''}{item.change}%)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {filteredPrices.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No items found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Price Alert Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Price Alert Service</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Set up price alerts for your crops and get notified when prices reach your target levels. 
                      Stay ahead of market movements and maximize your profits.
                    </p>
                    <Button variant="outline" size="sm">
                      Set Up Alerts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}