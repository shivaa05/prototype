import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Leaf, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Shield,
  TrendingUp,
  Zap
} from "lucide-react";

export default function DiseaseScanner() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Hardcoded disease data //todo: remove mock functionality
  const commonDiseases = [
    {
      name: "Early Blight",
      crop: "Tomato",
      severity: "Medium",
      symptoms: "Brown spots with concentric rings on leaves",
      treatment: "Apply copper-based fungicide, remove affected leaves",
      prevention: "Ensure good air circulation, avoid overhead watering"
    },
    {
      name: "Powdery Mildew",
      crop: "Cucumber",
      severity: "Low",
      symptoms: "White powdery coating on leaves and stems",
      treatment: "Spray with neem oil or sulfur-based fungicide",
      prevention: "Maintain proper spacing, avoid high humidity"
    },
    {
      name: "Bacterial Leaf Spot",
      crop: "Pepper",
      severity: "High",
      symptoms: "Small, dark water-soaked spots on leaves",
      treatment: "Use copper bactericide, remove infected plants",
      prevention: "Use certified seeds, practice crop rotation"
    },
    {
      name: "Downy Mildew",
      crop: "Grape",
      severity: "High",
      symptoms: "Yellow patches on upper leaf surface, white growth underneath",
      treatment: "Apply systemic fungicide, improve ventilation",
      prevention: "Choose resistant varieties, avoid leaf wetness"
    }
  ];

  const scanningTips = [
    {
      icon: Camera,
      title: "Good Lighting",
      description: "Take photos in natural daylight for best results"
    },
    {
      icon: Leaf,
      title: "Clear Focus",
      description: "Ensure affected areas are clearly visible and in focus"
    },
    {
      icon: Zap,
      title: "Multiple Angles",
      description: "Upload 2-3 photos from different angles if possible"
    },
    {
      icon: Shield,
      title: "Early Detection",
      description: "Scan plants regularly for early disease detection"
    }
  ];

  const handleImageUpload = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis //todo: remove mock functionality
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        disease: "Early Blight (Alternaria solani)",
        confidence: 87,
        treatment: "Remove affected leaves immediately and apply copper-based fungicide. Improve air circulation around plants and water at the base to avoid wetting leaves. Consider using resistant varieties for future planting.",
        severity: "Medium",
        crops_affected: ["Tomato", "Potato", "Eggplant"],
        prevention: [
          "Crop rotation with non-solanaceous plants",
          "Proper plant spacing for air circulation",
          "Avoid overhead watering",
          "Remove plant debris after harvest",
          "Use certified disease-free seeds"
        ],
        symptoms: [
          "Dark brown to black spots with concentric rings",
          "Yellowing of leaves around spots",
          "Premature leaf drop",
          "Stem lesions in severe cases"
        ]
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "text-red-600 bg-red-50 dark:bg-red-950";
      case "medium": return "text-orange-600 bg-orange-50 dark:bg-orange-950";
      case "low": return "text-green-600 bg-green-50 dark:bg-green-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-disease-scanner">
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
              Plant Disease Scanner
            </h1>
            <p className="text-muted-foreground">
              Upload plant images for AI-powered disease detection and treatment recommendations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <ImageUpload 
                onImageUpload={handleImageUpload}
                isAnalyzing={isAnalyzing}
                result={analysisResult}
              />

              {/* Analysis Result */}
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Detailed Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Disease Identified:</h4>
                          <p className="font-semibold">{analysisResult.disease}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Confidence Level:</h4>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${analysisResult.confidence}%` }}
                              />
                            </div>
                            <span className="font-semibold">{analysisResult.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Severity Level:</h4>
                          <Badge className={getSeverityColor(analysisResult.severity)}>
                            {analysisResult.severity}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Affects Crops:</h4>
                          <div className="flex flex-wrap gap-1">
                            {analysisResult.crops_affected.map((crop: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {crop}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Recommended Treatment:
                        </h4>
                        <p className="text-sm leading-relaxed p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          {analysisResult.treatment}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Symptoms to Watch:
                          </h4>
                          <ul className="text-sm space-y-1">
                            {analysisResult.symptoms.map((symptom: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Prevention Tips:
                          </h4>
                          <ul className="text-sm space-y-1">
                            {analysisResult.prevention.map((tip: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Scanning Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Scanning Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scanningTips.map((tip, index) => (
                    <div key={index} className="flex gap-3">
                      <tip.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <p className="text-xs text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Common Diseases */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Common Diseases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {commonDiseases.map((disease, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{disease.name}</h4>
                        <Badge className={getSeverityColor(disease.severity)} variant="outline">
                          {disease.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        <strong>Crop:</strong> {disease.crop}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Symptoms:</strong> {disease.symptoms}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <Leaf className="w-8 h-8 mx-auto text-primary" />
                    <h3 className="font-semibold">Need Expert Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with agricultural experts for personalized advice
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Expert
                    </Button>
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