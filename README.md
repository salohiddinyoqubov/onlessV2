# Onless - Haydovchilik Nazariy Imtihoni

Online driving theory exam platform for Uzbekistan.

## Project Structure

```
onless/
├── frontend/          # Next.js web application
│   ├── app/          # Next.js 14 app directory
│   │   ├── exam/     # Desktop exam interface
│   │   │   └── mobile/  # Mobile-optimized web interface
│   │   ├── lib/      # Utilities, hooks, contexts
│   │   └── page.tsx  # Home page
│   ├── config/       # Configuration files
│   ├── data/         # Mock data and question bank
│   ├── public/       # Static assets
│   ├── types/        # TypeScript type definitions
│   └── package.json  # Frontend dependencies
│
├── mobile/           # React Native mobile application
│   ├── src/          # Source code
│   │   ├── screens/  # HomeScreen, ExamScreen
│   │   ├── components/ # Reusable UI components
│   │   └── hooks/    # Custom React hooks
│   ├── App.tsx       # Main application entry
│   └── package.json  # Mobile dependencies
│
├── shared/           # Shared business logic package
│   └── src/
│       ├── types/    # TypeScript type definitions
│       ├── utils/    # Utility functions (exam logic)
│       ├── constants/ # Configuration constants
│       └── data/     # Question bank
│
├── backend/          # Backend API (to be implemented)
│   └── (backend code will go here)
│
├── assets/           # Design assets and references
├── package.json      # Root workspace configuration
└── README.md         # This file
```

## Getting Started

### Prerequisites

```bash
npm install     # Install all workspace dependencies
```

### Web Frontend Development

1. Run the development server:
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

2. Open your browser:
- Desktop interface: http://localhost:3000/exam
- Mobile web interface: http://localhost:3000/exam/mobile
- Home page: http://localhost:3000

### Mobile App Development

1. Start the Expo development server:
```bash
npm run dev:mobile
# or
cd mobile && npm start
```

2. Test the app:
- Install Expo Go app on your phone
- Scan the QR code to open the app
- Or press `w` to open in web browser
- Or press `a` for Android emulator
- Or press `i` for iOS simulator (macOS only)

## Features

### Desktop Interface (`/exam`)
- Full-featured exam interface optimized for desktop/laptop
- Side-by-side question and image display
- Comprehensive header with ticket number, student info, timer
- 20-question navigation grid (centered, larger buttons)
- Dark/light mode support
- Multi-language support (Uzbek Latin/Cyrillic, Karakalpak, Russian)
- F1-F4 keyboard shortcuts for answer selection
- F7 keyboard shortcut to skip to next unanswered question
- Collapsible explanation sections with "Izoh" button
- Real-time answer feedback (green/red)

### Mobile Interface (`/exam/mobile`)
- Touch-optimized interface for smartphones
- Vertical scrolling layout
- Large, tap-friendly buttons (48px minimum)
- Collapsible question grid (5 columns)
- Fixed bottom navigation with Previous/Skip/Next buttons
- Compact header with essential information
- Full feature parity with desktop
- Optimized for mobile screen sizes

### Key Features
- **Question Bank**: 50 questions in Uzbek with images
- **Random Selection**: 20 questions randomly selected per exam
- **Timer**: 40 minutes (MM:SS format) with countdown
- **Answer Feedback**: Immediate visual feedback (green for correct, red for incorrect)
- **Explanations**: Optional explanations for each question
- **Progress Tracking**: Visual indicators for answered/unanswered questions
- **Keyboard Shortcuts**: F1-F4 for answers, F7 to skip to next unanswered
- **Responsive**: Separate interfaces for desktop and mobile

## Technologies

### Web Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Heroicons (SVG outlines)

### Mobile App
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **UI**: React Native StyleSheet

### Shared Package
- **Business Logic**: Shared between web and mobile
- **Code Reuse**: ~40-50% (types, utils, constants, data)
- **Monorepo**: npm workspaces

## Configuration

Edit `frontend/config/exam.config.ts` to modify exam settings:

```typescript
export const EXAM_CONFIG = {
  TOTAL_QUESTIONS: 50,          // Total questions in bank
  QUESTIONS_PER_SESSION: 20,    // Questions per exam
  EXAM_DURATION_SECONDS: 2400,  // 40 minutes
  PASSING_THRESHOLD: 70,        // Passing percentage
};
```

## Adding New Questions

Edit `shared/src/data/questions.ts` (used by both web and mobile):

```typescript
{
  id: 51,
  text: "Question text in Uzbek",
  imagePath: "/images/scenarios/example.png",  // optional
  options: [
    { id: 'F1', text: "Option 1" },
    { id: 'F2', text: "Option 2" },
    { id: 'F3', text: "Option 3" },
  ],
  correctOptionId: 'F2',
  explanation: "Explanation text in Uzbek",  // optional
  category: 'traffic-rules',
}
```

## Build & Deploy

### Production Build

```bash
cd frontend
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
cd frontend
vercel
```

## Backend (To Be Implemented)

The backend API will handle:
- User authentication and authorization
- Question bank management
- Exam session management
- Results storage and history
- Student/instructor management
- Analytics and reporting
- Multi-tenancy for driving schools

## License

Copyright © 2024 Onless.uz

## Contact

Website: onless.uz
