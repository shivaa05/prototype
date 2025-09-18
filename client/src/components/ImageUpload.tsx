import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, X, Leaf, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing?: boolean;
  result?: {
    disease: string;
    confidence: number;
    treatment: string;
  };
}

export default function ImageUpload({ onImageUpload, isAnalyzing = false, result }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFile(file);
      }
    }
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="space-y-4" data-testid="image-upload">
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Upload Plant Image
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Take a clear photo of your plant's leaves or affected areas for accurate disease detection
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    variant="default"
                    onClick={() => document.getElementById('file-input')?.click()}
                    data-testid="button-choose-file"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground py-2">
                    or drag and drop an image here
                  </p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  data-testid="input-file-hidden"
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded plant"
                    className="w-full h-64 object-cover rounded-lg"
                    data-testid="uploaded-preview"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={clearImage}
                    className="absolute top-2 right-2"
                    data-testid="button-clear-image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-8 h-8 mx-auto mb-2 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Analyzing image...</p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 p-4 bg-muted/50 rounded-lg"
                    data-testid="analysis-result"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Analysis Complete</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Detected Disease:</span>
                        <Badge variant="secondary">{result.disease}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confidence:</span>
                        <span className="text-sm font-medium">{result.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <h4 className="font-medium text-sm mb-1">Recommended Treatment:</h4>
                      <p className="text-sm text-muted-foreground">{result.treatment}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}