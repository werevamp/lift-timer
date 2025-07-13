# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LiftTimer is a workout timing application built with React, Vite, and TanStack Router. The application follows an adapted version of the Bulletproof React architecture for scalability and maintainability.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run ios:dev` - Run iOS app with live reload
- `npm run android:dev` - Run Android app with live reload
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - File-based routing
- **Capacitor** - Native mobile deployment
- **SCSS** - Styling with CSS modules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Prettier** - Code formatting

## Project Architecture

This project follows the Bulletproof React architecture adapted for TanStack Router. See [docs/project-structure.md](./docs/project-structure.md) for detailed guidelines.

### Directory Structure

```
src/
├── app/              # Application setup (providers, router config)
├── assets/           # Static files (images, fonts, icons)
├── components/       # Shared/reusable components
│   ├── ui/          # Generic UI components
│   └── layout/      # Layout components
├── config/          # Global configuration
├── features/        # Feature-based modules (business logic)
│   └── timer/       # Timer feature
│       ├── api/     # API calls
│       ├── components/  # Feature components
│       ├── hooks/   # Feature hooks
│       └── utils/   # Feature utilities
├── hooks/           # Shared hooks
├── lib/             # External library wrappers
├── routes/          # TanStack Router routes (thin files)
│   ├── __root.tsx   # Root layout
│   ├── (home)/      # Route groups
│   └── timer/       # Route directories
├── stores/          # Global state management
├── styles/          # Global styles and SCSS
│   └── globals/     # SCSS variables, mixins
├── types/           # Shared TypeScript types
└── utils/           # Shared utilities
```

### Key Development Principles

1. **Feature-First Architecture**: Organize code by feature in `/features`
2. **Thin Routes**: Route files only handle routing, import from features
3. **Unidirectional Dependencies**: `utils → types → lib → hooks → components → features → routes → app`
4. **Absolute Imports**: Use absolute paths for imports across the codebase
5. **Component Organization**: Co-locate styles, tests, and stories with components

### Working with Routes

Routes should be minimal and import from features:

```tsx
// src/routes/timer/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { TimerView } from '../../features/timer'

export const Route = createFileRoute('/timer/')({
  component: TimerPage,
})

function TimerPage() {
  return <TimerView />
}
```

### Adding New Features

1. Create feature directory in `/features`
2. Add components, hooks, api, utils subdirectories as needed
3. Create thin route file in `/routes`
4. Export public API from feature's index.ts

### Styling Guidelines

- Use SCSS modules for component styles
- Import global styles using absolute paths: `@use '@styles/globals' as *;`
- **Always use CSS variables instead of SCSS variables** for dynamic values:
  - ✅ `color: var(--color-primary);`
  - ❌ `color: $primary-color;`
- CSS variables enable runtime theming and better maintainability
- For specific imports: `@use '@styles/globals/variables' as vars;`
- Follow BEM naming for class names
- Use custom components for consistent UI
- Use rem units via the `rem()` function for better accessibility
- Exception: Breakpoints must remain as SCSS variables (CSS variables can't be used in @media queries)

### Import Conventions

#### TypeScript/JavaScript Files

Use absolute imports for better maintainability:

```tsx
// ✅ Good: Absolute imports
import { Button } from '@/components/ui/button'
import { useTimer } from '@/features/timer/hooks/useTimer'
import { formatTime } from '@/utils/time'

// ⚠️ Use relative imports only for local files within the same component/feature
import { TimerDisplay } from './TimerDisplay'
import styles from './timer.module.scss'
```

#### SCSS Files

Use absolute paths for global styles:

```scss
// ✅ Good: Absolute import
@use "@styles/globals" as *;
@use "@styles/globals/variables" as vars;

// ⚠️ Use relative imports only for local component styles
@import "./timer-local-styles";
```

#### When to Use Relative Imports

- Files within the same directory or component
- Private/internal files that shouldn't be accessed from outside
- Component-specific styles or utilities

## Development Notes

- TanStack Router automatically generates route tree
- Vite configured for network access (mobile development)
- SCSS support with global variables and mixins
- TypeScript configured for the project
- Hot module replacement enabled
- Capacitor configured for iOS/Android deployment
- Follow file naming conventions:
  - Routes: lowercase (index.tsx, settings.tsx)
  - Components: PascalCase (Button.tsx, TimerDisplay.tsx)
  - Utilities: camelCase (formatTime.ts, useTimer.ts)

## Code Formatting

- **Prettier** is configured for consistent code formatting
- No semicolons in JavaScript/TypeScript
- Single quotes for strings (except JSX and SCSS)
- 2-space indentation
- 100 character line width
- Run `npm run format` before committing
- See [docs/prettier-setup.md](./docs/prettier-setup.md) for full configuration details
