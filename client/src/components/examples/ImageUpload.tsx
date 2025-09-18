import { useState } from 'react';
import ImageUpload from '../ImageUpload';

export default function ImageUploadExample() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        disease: "Early Blight",
        confidence: 87,
        treatment: "Remove affected leaves, improve air circulation, and apply copper-based fungicide."
      });
    }, 3000);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="font-heading font-semibold text-2xl mb-2">Plant Disease Detection</h2>
          <p className="text-muted-foreground">Upload a clear image of your plant for AI-powered disease analysis</p>
        </div>
        <ImageUpload 
          onImageUpload={handleImageUpload}
          isAnalyzing={isAnalyzing}
          result={result}
        />
      </div>
    </div>
  );
}