# LiftTimer

A workout timing companion built with Ionic React and Capacitor.

## Prerequisites

Before running the iOS app, make sure you have:
- Node.js (v14 or higher)
- npm or yarn
- Xcode (latest version from Mac App Store)
- Xcode Command Line Tools

## Installation

1. Install dependencies:
```bash
npm install
```

## Running on iOS Simulator

Follow these steps to run the app on the iOS simulator:

### 1. Build the web assets
```bash
npm run build
```

### 2. Sync with Capacitor
```bash
npx cap sync ios
```

### 3. Open in Xcode
```bash
npx cap open ios
```

### 4. Run in Simulator
Once Xcode opens:
1. Wait for Xcode to finish indexing (progress bar at the top)
2. Select a simulator device from the device dropdown (next to the "App" scheme at the top)
   - Recommended: iPhone 15 or iPhone 15 Pro
3. Click the "Run" button (▶️) or press `Cmd + R`
4. The simulator will launch and install the app

## Development Workflow

For active development with hot reload:

1. Start the development server:
```bash
npm run dev
```

2. In a new terminal, run the app with live reload:
```bash
npx cap run ios --livereload --external
```

This will:
- Open Xcode
- Build and run the app on the simulator
- Automatically reload when you make changes to the code

## Troubleshooting

### Build Errors
If you encounter build errors:
1. In Xcode: Product → Clean Build Folder (⇧⌘K)
2. Close Xcode
3. Run `npx cap sync ios` again
4. Open Xcode and try building again

### CocoaPods Issues
If you have pod-related errors:
```bash
cd ios/App
pod install --repo-update
cd ../..
npx cap sync ios
```

### Simulator Not Showing
If the simulator doesn't appear:
1. Open Simulator manually: Xcode → Open Developer Tool → Simulator
2. In Simulator: Device → iOS Simulators → Choose a device
3. Run the app again from Xcode

## Documentation

This project follows an adapted version of the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture. 

### 📚 Available Documentation

- **[Project Structure Guide](./docs/project-structure.md)** - Detailed information about the folder structure, architectural decisions, and best practices for organizing code in this project
- **[Import Conventions Guide](./docs/import-conventions.md)** - Guidelines for using absolute and relative imports in TypeScript and SCSS files
- **[Theming System Guide](./docs/theming.md)** - Complete guide to the theming system, including creating custom themes and using CSS variables

### 📁 Quick Project Overview

- `/src` - React source code (organized by features)
- `/ios` - iOS native project
- `/android` - Android native project
- `/dist` - Built web assets (generated after `npm run build`)
- `/docs` - Project documentation

### 🎨 Styling Guidelines

This project uses SCSS with a modern approach:

- **Absolute Imports**: Import global styles using absolute paths (e.g., `@use '@styles/globals' as *`)
- **REM Units**: Use the `rem()` function for accessible, scalable units
- **CSS Modules**: Component-specific styles use `.module.scss` files
- **Global Styles**: Variables, mixins, and utilities in `/src/styles/globals/`

Example:
```scss
// In component SCSS files
@use '@styles/globals' as *;

.button {
  padding: $spacing-sm $spacing-md; // Uses rem-based spacing
  font-size: rem(18px); // Converts to 1.125rem
}
```

For detailed import conventions, see the [Import Conventions Guide](./docs/import-conventions.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run ios` - Build and open iOS project in Xcode
- `npm run ios:dev` - Run iOS app with live reload on iPhone 16 Pro simulator
- `npm run ios:build` - Build and sync iOS project
- `npx cap sync` - Sync web assets to native projects
- `npx cap open ios` - Open iOS project in Xcode
- `npx cap open android` - Open Android project in Android Studio

### Quick Start for iOS Development

To run the app on iPhone 16 Pro with auto-reload:

1. Make sure the dev server is running in one terminal:
```bash
npm run dev
```

2. In another terminal, run:
```bash
npm run ios:dev
```

This will automatically:
- Build the app
- Launch it on iPhone 16 Pro simulator
- Enable live reload for instant updates when you save changes