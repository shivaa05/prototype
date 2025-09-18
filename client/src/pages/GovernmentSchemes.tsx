import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Search,
  Calendar,
  IndianRupee,
  Users,
  FileText,
  ExternalLink,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Tractor,
  Droplets,
  Zap
} from "lucide-react";

export default function GovernmentSchemes() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Hardcoded government schemes data //todo: remove mock functionality
  const categories = [
    { id: "all", name: "All Schemes" },
    { id: "subsidy", name: "Subsidies" },
    { id: "insurance", name: "Insurance" },
    { id: "loan", name: "Loans" },
    { id: "equipment", name: "Equipment" },
    { id: "training", name: "Training" }
  ];

  const schemes = [
    {
      id: "pm-kisan",
      title: "PM-KISAN Samman Nidhi",
      category: "subsidy",
      authority: "Ministry of Agriculture & Farmers Welfare",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers",
      amount: "₹6,000/year",
      eligibility: "Small and marginal farmers with up to 2 hectares land",
      deadline: "Ongoing",
      status: "active",
      beneficiaries: "11+ Crore",
      documents: ["Aadhaar Card", "Bank Details", "Land Records"],
      applicationProcess: "Online through PM-KISAN portal or CSC centers",
      icon: Heart,
      featured: true
    },
    {
      id: "pmfby",
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "insurance",
      authority: "Ministry of Agriculture & Farmers Welfare",
      description: "Comprehensive crop insurance scheme providing financial support to farmers in case of crop loss",
      amount: "Up to ₹2 Lakhs",
      eligibility: "All farmers including tenant farmers and sharecroppers",
      deadline: "Before crop sowing season",
      status: "active",
      beneficiaries: "5.5+ Crore",
      documents: ["Land Records", "Bank Details", "Aadhaar Card", "Sowing Certificate"],
      applicationProcess: "Through banks, insurance companies, or online portal",
      icon: Building2,
      featured: true
    },
    {
      id: "kcc",
      title: "Kisan Credit Card",
      category: "loan",
      authority: "All Scheduled Banks",
      description: "Flexible credit facility for farmers to meet agricultural and consumption needs",
      amount: "Based on crop pattern and scale of finance",
      eligibility: "All farmers including tenant farmers",
      deadline: "Ongoing",
      status: "active",
      beneficiaries: "7+ Crore",
      documents: ["Land Documents", "Identity Proof", "Address Proof"],
      applicationProcess: "Apply at nearest bank branch",
      icon: FileText,
      featured: false
    },
    {
      id: "sub-mission-seeds",
      title: "Sub-Mission on Seeds and Planting Material",
      category: "subsidy",
      authority: "Department of Agriculture",
      description: "Support for production and distribution of quality seeds",
      amount: "Up to 50% subsidy",
      eligibility: "Seed producers and farmers",
      deadline: "March 2025",
      status: "active",
      beneficiaries: "50+ Lakhs",
      documents: ["Registration Certificate", "Land Records"],
      applicationProcess: "Through State Agriculture Departments",
      icon: Droplets,
      featured: false
    },
    {
      id: "farm-mechanization",
      title: "Sub-Mission on Agricultural Mechanization",
      category: "equipment",
      authority: "Ministry of Agriculture",
      description: "Financial assistance for purchase of agricultural machinery and equipment",
      amount: "25-80% subsidy",
      eligibility: "Individual farmers, FPOs, Custom Hiring Centers",
      deadline: "Ongoing",
      status: "active",
      beneficiaries: "15+ Lakhs",
      documents: ["Land Records", "Bank Details", "Quotations"],
      applicationProcess: "Through Direct Benefit Transfer portal",
      icon: Tractor,
      featured: true
    },
    {
      id: "soil-health-card",
      title: "Soil Health Card Scheme",
      category: "training",
      authority: "Department of Agriculture",
      description: "Soil testing and health cards to promote balanced fertilizer use",
      amount: "Free soil testing",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "active",
      beneficiaries: "22+ Crore",
      documents: ["Land Records", "Farmer ID"],
      applicationProcess: "Through local agriculture office",
      icon: Zap,
      featured: false
    },
    {
      id: "organic-farming",
      title: "Paramparagat Krishi Vikas Yojana",
      category: "subsidy",
      authority: "Ministry of Agriculture",
      description: "Promotion of organic farming through cluster approach",
      amount: "₹50,000 per hectare over 3 years",
      eligibility: "Farmer groups (minimum 50 farmers)",
      deadline: "December 2024",
      status: "active",
      beneficiaries: "8+ Lakhs",
      documents: ["Group Formation Certificate", "Land Records"],
      applicationProcess: "Through farmer groups and NGOs",
      icon: Heart,
      featured: false
    },
    {
      id: "micro-irrigation",
      title: "Micro Irrigation Fund",
      category: "subsidy",
      authority: "NABARD",
      description: "Support for micro-irrigation systems like drip and sprinkler irrigation",
      amount: "Up to 90% subsidy",
      eligibility: "Individual farmers and farmer groups",
      deadline: "March 2025",
      status: "active",
      beneficiaries: "12+ Lakhs",
      documents: ["Land Documents", "Water Source Certificate"],
      applicationProcess: "Through NABARD and implementing agencies",
      icon: Droplets,
      featured: false
    }
  ];

  const stats = [
    { label: "Active Schemes", value: "150+", icon: Building2 },
    { label: "Total Beneficiaries", value: "25 Cr+", icon: Users },
    { label: "Annual Budget", value: "₹1.2 L Cr", icon: IndianRupee },
    { label: "States Covered", value: "All 28", icon: FileText }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "upcoming": return <Clock className="w-4 h-4 text-orange-600" />;
      case "closed": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background" data-testid="page-government-schemes">
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
              Government Schemes
            </h1>
            <p className="text-muted-foreground">
              Explore government schemes, subsidies, and benefits available for farmers
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schemes..."
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

          {/* Featured Schemes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-heading font-semibold text-xl mb-4">Featured Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemes.filter(scheme => scheme.featured).map((scheme, index) => (
                <Card key={scheme.id} className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <scheme.icon className="w-8 h-8 text-primary" />
                      <Badge className="bg-primary">Featured</Badge>
                    </div>
                    <CardTitle className="text-lg">{scheme.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Benefit:</span>
                        <span className="text-sm font-medium text-green-600">{scheme.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Beneficiaries:</span>
                        <span className="text-sm font-medium">{scheme.beneficiaries}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* All Schemes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-heading font-semibold text-xl mb-4">
              All Schemes ({filteredSchemes.length})
            </h2>
            <div className="space-y-4">
              {filteredSchemes.map((scheme, index) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex items-start gap-4 flex-1">
                          <scheme.icon className="w-10 h-10 text-primary bg-primary/10 p-2 rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg leading-tight">{scheme.title}</h3>
                              <div className="flex items-center gap-2 ml-4">
                                {getStatusIcon(scheme.status)}
                                <Badge variant="outline" className="text-xs capitalize">
                                  {scheme.category}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{scheme.authority}</p>
                            <p className="text-sm leading-relaxed mb-4">{scheme.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Benefit: </span>
                                <span className="font-medium text-green-600">{scheme.amount}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deadline: </span>
                                <span className="font-medium">{scheme.deadline}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Beneficiaries: </span>
                                <span className="font-medium">{scheme.beneficiaries}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status: </span>
                                <span className="font-medium capitalize">{scheme.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-64 space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Eligibility:</h4>
                            <p className="text-xs text-muted-foreground">{scheme.eligibility}</p>
                          </div>
                          
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Required Documents:</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {scheme.documents.map((doc, docIndex) => (
                                <li key={docIndex} className="flex items-start gap-1">
                                  <span className="text-primary mt-1">•</span>
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="w-full">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                              <FileText className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filteredSchemes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No schemes found matching your criteria.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}