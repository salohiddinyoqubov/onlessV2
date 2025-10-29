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
├── desktop/          # Electron desktop application
│   ├── electron/     # Electron main & preload processes
│   ├── src/          # Renderer process (React app)
│   │   ├── pages/    # HomePage, ExamPage, ResultPage
│   │   ├── components/ # UI components
│   │   └── contexts/ # React contexts
│   └── package.json  # Desktop dependencies
│
├── shared/           # Shared code package (~60% code reuse)
│   └── src/
│       ├── types/    # TypeScript type definitions
│       ├── utils/    # Utility functions (exam logic, cyrillic converter)
│       ├── constants/ # Configuration constants
│       ├── data/     # Question bank
│       ├── hooks/    # Unified React hooks (useExamSession, useTimer)
│       ├── contexts/ # Unified React contexts (Theme, Language)
│       └── adapters/ # Platform abstraction (storage adapters)
│
├── backend/          # FastAPI backend with PostgreSQL
│   ├── app/          # Application code
│   │   ├── api/      # API routes and endpoints
│   │   ├── core/     # Configuration and security
│   │   ├── db/       # Database setup and session
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── crud/     # Database operations
│   ├── alembic/      # Database migrations
│   ├── tests/        # Test suite
│   └── pyproject.toml # Python dependencies
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

### Desktop App Development

1. Start the Electron development server:
```bash
npm run dev:desktop
# or
cd desktop && npm run electron:dev
```

2. The Electron app will automatically open with hot reload enabled

3. Build for production:
```bash
cd desktop
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

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

### Desktop App
- **Framework**: Electron 33 + React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context + Electron Store
- **Auto-updates**: electron-updater
- **Platform**: Cross-platform (Windows, macOS, Linux)

### Shared Package
- **Business Logic**: Shared across web, mobile, and desktop
- **Code Reuse**: ~60% (types, utils, constants, data, hooks, contexts)
- **Platform Abstraction**: Storage adapters prevent conflicts
- **Monorepo**: npm workspaces with @onless/shared package

### Backend API
- **Framework**: FastAPI (async Python)
- **Database**: PostgreSQL with asyncpg
- **ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Auth**: JWT with refresh tokens
- **Authorization**: Role-based access control (6 roles)
- **Multi-tenancy**: Organization-based isolation
- **Containerization**: Docker Compose

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

## Code Sharing Architecture

The project uses a **platform abstraction layer** pattern to safely share ~60% of code across frontend, mobile, and desktop platforms while preventing production conflicts.

### Platform Abstraction Layer

**Storage Adapter Pattern** (`shared/src/adapters/storage.ts`):
```typescript
// Auto-detects platform and returns appropriate adapter
const storageAdapter = createStorageAdapter();

// WebStorageAdapter - uses localStorage (frontend)
// ElectronStorageAdapter - uses Electron store (desktop)
// MobileStorageAdapter - uses AsyncStorage (mobile)
// MemoryStorageAdapter - fallback for SSR/testing
```

### Unified Hooks

**useExamSession** (`shared/src/hooks/useExamSession.ts`):
- Manages exam state across all platforms
- Consistent API: `selectOption`, `navigateToQuestion`, `completeExam`
- Platform-agnostic implementation

**useTimer** (`shared/src/hooks/useTimer.ts`):
- Countdown timer with platform-independent types
- Works in browser, Electron, and React Native

### Unified Contexts

**ThemeContext** (`shared/src/contexts/ThemeContext.tsx`):
```typescript
<ThemeProvider
  storageAdapter={storageAdapter}
  applyTheme={(theme) => document.documentElement.classList.add(theme)}
  getSystemTheme={() => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
>
```

**LanguageContext** (`shared/src/contexts/LanguageContext.tsx`):
- Multi-language support with Cyrillic conversion
- Persistent across sessions using storage adapter

### Benefits

✅ **DRY Principle**: Eliminated ~40% code duplication
✅ **No Conflicts**: Platform adapters prevent localStorage/Electron/AsyncStorage conflicts
✅ **Type Safety**: Full TypeScript support across all platforms
✅ **Consistent Behavior**: Same business logic everywhere
✅ **Easy Maintenance**: Update once, deploy everywhere

## Backend API

The backend implements a production-ready FastAPI application with:

- **Authentication**: JWT access + refresh tokens with secure password hashing
- **Authorization**: Role-based access control (Student, Teacher, Instructor, Business Owner, Mentor, Admin)
- **Multi-tenancy**: Organization-based data isolation for driving schools
- **Database**: Async PostgreSQL with SQLAlchemy 2.0
- **Migrations**: Alembic for schema versioning
- **Models**: User, Organization, Question, Exam, Booking, Payment
- **Testing**: Comprehensive test suite with pytest
- **Containerization**: Docker Compose with PostgreSQL and Redis
- **Documentation**: Auto-generated API docs with FastAPI

## License

Copyright © 2024 Onless.uz

## Contact

Website: onless.uz
