# Krishi Sahayi - AI-Powered Agricultural Assistant

## Overview

Krishi Sahayi is a comprehensive agricultural assistance platform that provides farmers with AI-powered tools for crop management, disease detection, weather forecasting, market prices, and government schemes. The application features a conversational chat interface inspired by ChatGPT, designed specifically for agricultural contexts with a focus on accessibility and ease of use for farmers.

The platform combines modern web technologies with agricultural expertise to deliver real-time assistance through multiple channels: plant disease scanning via image analysis, seasonal crop advisory, local weather forecasts, mandi price tracking, and information about government agricultural schemes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with pages for Home (chat), Weather, Crop Advisory, Mandi Prices, Government Schemes, and Disease Scanner
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable interface components
- **Styling**: Tailwind CSS with custom design system featuring agricultural-themed color palette (green primary colors) and responsive layout
- **Animations**: Framer Motion for smooth transitions, loading states, and interactive feedback
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **Development**: Hot module replacement via Vite integration for seamless development experience
- **API Structure**: RESTful endpoints prefixed with `/api` for clear separation of concerns

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud database hosting
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Temporary Storage**: In-memory storage implementation for development and testing phases

### Design System
- **Typography**: Inter (primary) and Poppins (headers) from Google Fonts for optimal readability
- **Color Scheme**: Agricultural-themed palette with vibrant green (142 69% 58%) for primary actions, supporting colors for different states (success, warning, error)
- **Layout**: Mobile-first responsive design with Tailwind spacing system, ChatGPT-inspired conversational interface
- **Components**: Comprehensive component library including chat messages, image upload, quick actions, typing indicators, and specialized agricultural data displays

### Core Features Architecture
- **Chat Interface**: Conversational AI assistant with message history, typing indicators, and multi-modal input (text and image)
- **Image Analysis**: Plant disease detection through image upload with confidence scoring and treatment recommendations
- **Weather Integration**: Location-based weather forecasting with agricultural relevance (humidity, rainfall, growing conditions)
- **Market Data**: Real-time mandi price tracking with trend analysis and historical comparisons
- **Advisory System**: Seasonal crop recommendations based on location, soil conditions, and market demand
- **Government Schemes**: Searchable database of agricultural subsidies, loans, and support programs

## External Dependencies

### UI and Component Libraries
- **Radix UI**: Accessible component primitives (@radix-ui/react-*) for dialogs, dropdowns, avatars, and form controls
- **Shadcn/ui**: Pre-built component system with consistent styling and accessibility
- **Lucide React**: Icon library optimized for React applications
- **Class Variance Authority**: Type-safe utility for component variant management

### Development and Build Tools
- **Vite**: Build tool with development server, hot module replacement, and optimization
- **TypeScript**: Type checking and modern JavaScript features
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **ESBuild**: Fast JavaScript bundler for production builds

### Data and State Management
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Drizzle Kit**: Database migration and schema management utilities
- **TanStack Query**: Server state synchronization and caching
- **React Hook Form**: Form validation and state management
- **Zod**: Schema validation for type-safe data parsing

### Database and Storage
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **PostgreSQL**: Primary database with ACID compliance and relational data modeling
- **Connect PG Simple**: PostgreSQL session store for Express.js

### Animation and Interaction
- **Framer Motion**: Physics-based animations and gesture recognition
- **Embla Carousel**: Lightweight carousel component for image galleries
- **CMDK**: Command palette interface for quick actions

### Development Environment
- **Replit Integration**: Development environment integration with runtime error handling and cartographer tools
- **Date-fns**: Date utility library for time formatting and calculations
- **Nanoid**: Unique ID generation for client-side operations