# Krishi Sahayi Design Guidelines

## Design Approach
**Reference-Based Approach**: Taking primary inspiration from ChatGPT's clean, conversational interface while adapting for agricultural context. The design prioritizes simplicity, accessibility, and trust - essential for farmer users.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light mode: 142 69% 58% (vibrant green for agriculture)
- Dark mode: 142 45% 35% (muted green)
- Background light: 0 0% 98% (soft white)
- Background dark: 0 0% 9% (deep charcoal)

**Supporting Colors:**
- Success/healthy crops: 120 60% 50% 
- Warning/disease alerts: 45 85% 55% (warm amber, not harsh yellow)
- Error states: 0 70% 55%
- Text primary: 0 0% 15% (light) / 0 0% 90% (dark)
- Text secondary: 0 0% 45% (light) / 0 0% 65% (dark)

### Typography
- Primary: Inter (Google Fonts) - clean, readable for chat interface
- Secondary: Poppins (Google Fonts) - for headers and branding
- Chat text: 16px base size for optimal mobile reading
- Headers: Bold weights (600-700) for clear hierarchy

### Layout System
**Tailwind Spacing:** Focus on units 2, 4, 6, 8, 12, 16 for consistent rhythm
- Chat bubbles: p-4, mb-4
- Section spacing: py-8, py-12
- Container max-width: max-w-4xl for optimal reading

## Component Library

### Chat Interface (Primary)
- **Chat Container**: Full viewport height with subtle background pattern
- **Message Bubbles**: Rounded-lg with soft shadows, user messages aligned right (green tint), AI responses left (white/dark gray)
- **Input Area**: Fixed bottom with rounded-full input field, upload button, and send button
- **Typing Indicators**: Subtle pulse animation for AI responses

### Navigation
- **Header**: Minimal with logo, user avatar, and settings
- **Sidebar**: Collapsible with sections for chat history, disease library, weather, mandi prices
- **Mobile**: Bottom tab navigation for key features

### Disease Detection Features
- **Image Upload**: Large drag-and-drop zone with preview thumbnails
- **Results Display**: Card-based layout with disease confidence scores, treatment recommendations
- **Progress Indicators**: For image processing with nature-inspired animations

### Forms & Inputs
- **Search Bar**: Prominent with placeholder text like "Ask about your crops..."
- **File Upload**: Visual feedback with crop-related iconography
- **Buttons**: Rounded-md with subtle hover animations, primary green theme

## Visual Treatments

### Animations
**Minimal & Purposeful:**
- Fade-in transitions for new messages (300ms ease)
- Subtle hover states on interactive elements
- Loading spinners for AI processing
- Smooth slide transitions for mobile navigation

### Background Elements
- **Subtle Pattern**: Light agricultural motifs (wheat, leaves) at 5% opacity
- **Gradients**: Very subtle radial gradients from center (green to transparent) for depth
- **Card Shadows**: Soft, multiple-layer shadows for depth without harshness

## Images & Media
**Hero Section**: NO large hero image - following ChatGPT's immediate functionality approach
**Supporting Images**: 
- Small crop/plant thumbnails in sidebar
- Disease reference images in results cards
- Farmer avatar options for personalization
- Weather condition icons (simple, outlined style)

## Responsive Considerations
- **Mobile-first**: Chat interface optimized for thumb interaction
- **Touch targets**: Minimum 44px for buttons and interactive elements
- **Keyboard navigation**: Full accessibility support for all interactions
- **Consistent dark mode**: All form inputs and components maintain dark theme

## Key Differentiators
- **Trust-focused**: Earthy, natural color palette builds farmer confidence
- **Conversation-first**: Mimics familiar messaging apps for easy adoption
- **Agricultural context**: Subtle farming motifs without overwhelming the interface
- **Accessibility**: High contrast ratios and clear typography for outdoor/varied lighting conditions