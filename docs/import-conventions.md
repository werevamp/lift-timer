# Import Conventions

This document outlines the import conventions used in the LiftTimer project. We use absolute imports for better maintainability, easier refactoring, and clearer code organization.

## 📦 Import Strategy

### TypeScript/JavaScript Files

We use absolute imports with the `@/` prefix for all cross-directory imports:

```tsx
// ✅ Good: Absolute imports for cross-directory files
import { Button } from '@/components/ui/button'
import { useTimer } from '@/features/timer/hooks/useTimer'
import { formatTime } from '@/utils/time'
import { TimerView } from '@/features/timer'
import type { User } from '@/types/user'

// ✅ Good: Relative imports for local files only
import { TimerDisplay } from './TimerDisplay' // Same directory
import styles from './timer.module.scss' // Component-specific styles
import { helperFunction } from './helpers' // Local utilities
```

### SCSS Files

We use absolute paths with the `@styles` alias for global styles:

```scss
// ✅ Good: Absolute import for global styles
@use '@styles/globals' as *;
@use '@styles/globals/variables' as vars;
@use '@styles/globals/mixins' as mixins;
@use '@styles/globals/functions' as fn;

// ✅ Good: Relative imports for component-local styles
@import './timer-animations'; // Component-specific animations
@import './local-overrides'; // Local style overrides
```

## 🎯 When to Use Each Import Type

### Use Absolute Imports (`@/...`) When:

- Importing from a different feature or module
- Importing shared components, hooks, or utilities
- Importing from any directory that's not the current one
- The import crosses multiple directory levels
- You want to make the import path stable during refactoring

### Use Relative Imports (`./...`) When:

- Importing files within the same directory
- Importing component-specific files (styles, tests, sub-components)
- The files are tightly coupled and always move together
- The file is private/internal to the current module

## 🔧 Configuration

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      "@/assets/*": ["src/assets/*"],
      "@/components/*": ["src/components/*"],
      "@/config/*": ["src/config/*"],
      "@/features/*": ["src/features/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/lib/*": ["src/lib/*"],
      "@/routes/*": ["src/routes/*"],
      "@/stores/*": ["src/stores/*"],
      "@/styles/*": ["src/styles/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}
```

### Vite Configuration (`vite.config.js`)

```javascript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, './src')],
      },
    },
  },
})
```

## 📋 Examples by File Type

### Route Files

```tsx
// src/routes/timer/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { TimerView } from '@/features/timer' // Absolute import

export const Route = createFileRoute('/timer/')({
  component: TimerPage,
})

function TimerPage() {
  return <TimerView />
}
```

### Feature Components

```tsx
// src/features/timer/components/timer-view.tsx
import { IonButton, IonCard } from '@ionic/react'
import { useTimer } from '@/hooks/useTimer' // Absolute: shared hook
import { formatTime } from '@/utils/time' // Absolute: shared utility
import { Button } from '@/components/ui/button' // Absolute: shared component
import { TimerDisplay } from './TimerDisplay' // Relative: local component
import { TimerControls } from './TimerControls' // Relative: local component
import styles from './timer-view.module.scss' // Relative: component styles
```

### SCSS Modules

```scss
// src/features/timer/components/timer-view.module.scss
@use '@styles/globals' as *; // Absolute: global styles
@use '@styles/globals/variables' as vars; // Absolute: specific variables

@import './timer-animations'; // Relative: local animations

.timer {
  @include card($spacing-lg, $radius-lg);
  color: vars.$primary-color;
}
```

### Shared Components

```tsx
// src/components/ui/button/button.tsx
import { forwardRef } from 'react'
import { cn } from '@/utils/cn' // Absolute: shared utility
import type { ButtonProps } from '@/types/components' // Absolute: shared types
import styles from './button.module.scss' // Relative: component styles
```

## ❌ Common Mistakes to Avoid

```tsx
// ❌ Bad: Using relative imports for cross-feature imports
import { UserProfile } from '../../../features/user/components/UserProfile'

// ✅ Good: Use absolute imports instead
import { UserProfile } from '@/features/user/components/UserProfile'

// ❌ Bad: Using absolute imports for local files
import { helpers } from '@/features/timer/components/timer-view/helpers'

// ✅ Good: Use relative imports for local files
import { helpers } from './helpers'

// ❌ Bad: Mixing import styles in the same file
import { Button } from '../../../components/ui/button' // Relative
import { useAuth } from '@/hooks/useAuth' // Absolute

// ✅ Good: Consistent use of absolute imports
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
```

## 🚀 Benefits

1. **Easier Refactoring**: Moving files doesn't break imports
2. **Clearer Dependencies**: Easy to see what depends on what
3. **Better IntelliSense**: IDEs can better understand and autocomplete imports
4. **Consistent Codebase**: Everyone uses the same import patterns
5. **Reduced Cognitive Load**: No need to count `../` levels

## 🔄 Migration Guide

When updating existing code to use absolute imports:

1. Start with the deepest nested files first
2. Update imports one feature at a time
3. Run type checking after each change
4. Update both TypeScript and SCSS imports together
5. Keep local imports (same directory) as relative

Example migration:

```tsx
// Before
import { Button } from '../../../components/ui/button'
import { formatTime } from '../../utils/time'
import { TimerDisplay } from './TimerDisplay'

// After
import { Button } from '@/components/ui/button' // Changed to absolute
import { formatTime } from '@/utils/time' // Changed to absolute
import { TimerDisplay } from './TimerDisplay' // Kept as relative (local file)
```
