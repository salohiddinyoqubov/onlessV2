# Onless Desktop - Cross-Platform Exam Application

Electron-based desktop application for Onless.uz driving theory exam platform.

## Features

- **Cross-Platform**: Windows, macOS, and Linux support
- **Offline Mode**: Take exams without internet connection
- **Native Features**: Auto-updates, system tray, native menus
- **Data Persistence**: Exam history saved locally
- **Multi-Language**: Uzbek (Latin/Cyrillic), Karakalpak, Russian
- **Dark/Light Theme**: Automatic theme switching
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Export Results**: Save exam results to file

## Tech Stack

- **Electron**: Cross-platform desktop framework
- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **electron-builder**: Package and distribute
- **electron-store**: Persistent data storage
- **Shared Package**: Reuses business logic from monorepo

## Project Structure

```
desktop/
├── electron/              # Electron main process
│   ├── main.ts            # App entry, window management
│   └── preload.ts         # Secure IPC bridge
├── src/                   # React renderer (UI)
│   ├── components/        # UI components
│   │   ├── ExamHeader.tsx
│   │   ├── QuestionCard.tsx
│   │   └── NavigationGrid.tsx
│   ├── contexts/          # React contexts
│   │   ├── ThemeContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── ExamContext.tsx
│   ├── hooks/             # Custom hooks
│   │   ├── useExamSession.ts
│   │   └── useTimer.ts
│   ├── pages/             # Application pages
│   │   ├── HomePage.tsx
│   │   ├── ExamPage.tsx
│   │   └── ResultPage.tsx
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # React entry point
├── build/                 # Build assets (icons)
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Install dependencies (from project root)
npm install

# Or install desktop dependencies only
cd desktop
npm install
```

### Development

```bash
# Start development server with hot reload

npm run dev

# Or use electron:dev for full Electron environment
npm run electron:dev
```

The app will open in a native window with hot reload enabled.

### Building

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:win      # Windows
npm run build:mac      # macOS
npm run build:linux    # Linux
```

Builds are output to `release/{version}/` directory.

## Features in Detail

### Exam Management

- **Random Question Selection**: 20 questions randomly selected from pool
- **Timer**: 40-minute countdown with visual warnings
- **Answer Tracking**: Real-time answer status in navigation grid
- **Progress Persistence**: Auto-save exam state
- **Results History**: Keep track of past exams

### Native Integration

- **Auto-Updates**: Automatic update checking and installation
- **Native Menus**: Platform-specific menu bars
- **System Integration**: Proper window management
- **File Operations**: Export results to JSON

### Keyboard Shortcuts

- `Ctrl/Cmd+N`: Start new exam
- `F1-F4`: Select answers A-D
- `F7`: Skip to next unanswered question
- `←/→`: Previous/Next question
- `Ctrl/Cmd+W`: Close app

### Data Storage

All data is stored locally using `electron-store`:

- Exam history
- User preferences (theme, language)
- Window position and size
- Answer progress

Location:
- **Windows**: `%APPDATA%\onless-desktop`
- **macOS**: `~/Library/Application Support/onless-desktop`
- **Linux**: `~/.config/onless-desktop`

## Security

- **Context Isolation**: Enabled for security
- **Node Integration**: Disabled in renderer
- **Sandbox**: Renderer process runs in sandbox
- **IPC**: Secure communication via preload script
- **CSP**: Content Security Policy headers

## Distribution

### Windows

- **NSIS Installer**: Standard Windows installer
- **Portable**: Standalone executable
- **Auto-updates**: Built-in update mechanism

### macOS

- **DMG**: Disk image for easy installation
- **Notarization**: Apple notarized (requires certificate)
- **Auto-updates**: Built-in update mechanism

### Linux

- **AppImage**: Universal Linux package
- **DEB**: Debian/Ubuntu package
- **Auto-updates**: Built-in update mechanism

## Configuration

Edit `package.json` build section for distribution settings:

```json
{
  "build": {
    "appId": "uz.onless.desktop",
    "productName": "Onless",
    "directories": {
      "output": "release/${version}"
    },
    "files": ["dist", "dist-electron"]
  }
}
```

## Troubleshooting

### Dev server not starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
# Ensure electron-builder is installed
npm install -D electron-builder

# Check Node.js version (18+ required)
node --version
```

### App won't open
- Check console for errors
- Ensure ports 5173 is available
- Try deleting config files

### Updates not working
- Ensure `electron-updater` is installed
- Check GitHub releases for update server
- Verify code signing certificates

## Code Reuse

This desktop app shares ~60% of code with the web frontend:

**Shared Components:**
- Business logic (exam-logic.ts)
- Type definitions
- Constants and configuration
- Question data
- Utility functions

**Desktop-Specific:**
- Electron main/preload scripts
- Native menu integration
- File system operations
- Auto-update functionality
- Persistent storage (electron-store)

## Performance

- **Start Time**: <2 seconds
- **Memory Usage**: ~150MB (Electron overhead)
- **Package Size**: ~150MB (includes Chromium)
- **Build Time**: ~2 minutes

## Future Enhancements

- [ ] Print exam results
- [ ] Statistics and analytics
- [ ] Practice mode with explanations
- [ ] Custom question sets
- [ ] Network mode (connect to backend)
- [ ] Multi-user support
- [ ] Sync across devices

## License

Copyright © 2024 Onless.uz

## Support

- Website: https://onless.uz
- Issues: Create issue in main repository

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

**Built with Electron + React + TypeScript**

Desktop Edition • v1.0.0
