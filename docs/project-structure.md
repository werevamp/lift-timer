# Project Structure

This project follows an adapted version of the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture, modified to work seamlessly with TanStack Router's file-based routing system.

## 🏗️ Project Structure Overview

```
src/
├── app/                 # Application layer containing providers and main app setup
│   ├── providers/       # App providers (auth, theme, etc.)
│   ├── router.tsx       # Router configuration
│   └── index.tsx        # App entry point
│
├── assets/              # Static files like images, fonts, icons
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/          # Shared/reusable components used across features
│   ├── ui/              # Generic UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── form/
│   │   └── modal/
│   └── layout/          # Layout components
│       ├── header/
│       ├── footer/
│       └── sidebar/
│
├── config/              # Global configuration
│   ├── constants.ts     # App constants
│   ├── env.ts           # Environment variables
│   └── paths.ts         # Route paths configuration
│
├── features/            # Feature-based modules (main business logic)
│   ├── timer/           # Timer feature example
│   │   ├── api/         # Timer-specific API calls
│   │   ├── components/  # Timer-specific components
│   │   ├── hooks/       # Timer-specific hooks
│   │   ├── stores/      # Timer-specific state
│   │   ├── types/       # Timer-specific types
│   │   └── utils/       # Timer-specific utilities
│   └── workouts/        # Another feature example
│       ├── api/
│       ├── components/
│       └── ...
│
├── hooks/               # Shared hooks used across features
│   ├── use-local-storage.ts
│   ├── use-media-query.ts
│   └── use-debounce.ts
│
├── lib/                 # Re-exported libraries and external lib wrappers
│   ├── axios.ts         # Configured axios instance
│   ├── supabase.ts      # Supabase client
│   └── react-query.ts   # React Query configuration
│
├── routes/              # TanStack Router routes (thin route files)
│   ├── __root.tsx       # Root layout route
│   ├── (home)/          # Route group for home
│   │   └── index.tsx    # Home page route
│   ├── timer/           # Timer routes
│   │   ├── index.tsx    # Timer page route
│   │   └── $id.tsx      # Dynamic timer route
│   └── workouts/        # Workout routes
│       ├── index.tsx
│       └── new.tsx
│
├── stores/              # Global state management
│   ├── auth.store.ts    # Authentication store
│   └── theme.store.ts   # Theme store
│
├── styles/              # Global styles and SCSS configuration
│   ├── globals/         # Global SCSS files
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _typography.scss
│   └── index.scss       # Main stylesheet
│
├── testing/             # Test utilities and mocks
│   ├── mocks/           # Mock data
│   ├── test-utils.tsx   # Testing utilities
│   └── setup-tests.ts   # Test setup
│
├── types/               # Shared TypeScript types
│   ├── api.types.ts     # API response types
│   ├── entity.types.ts  # Domain entity types
│   └── utils.types.ts   # Utility types
│
└── utils/               # Shared utility functions
    ├── format.ts        # Formatting utilities
    ├── validation.ts    # Validation utilities
    └── helpers.ts       # General helpers
```

## 🎯 Key Principles

### 1. **Feature-First Architecture**
Business logic is organized by feature in the `/features` directory. Each feature is self-contained with its own components, hooks, API calls, and utilities.

### 2. **Thin Routes**
Route files in `/routes` should be minimal, focusing only on:
- Route configuration
- Data loading
- Composing components from features

```tsx
// ❌ Bad: Business logic in route file
// src/routes/timer/index.tsx
export function Route() {
  const [time, setTime] = useState(0)
  // ... lots of timer logic
  return <div>...</div>
}

// ✅ Good: Route composes feature components
// src/routes/timer/index.tsx
export function Route() {
  return <TimerView />
}
```

### 3. **Unidirectional Dependencies**
Follow this import hierarchy to maintain clean architecture:

```
utils → types → lib → hooks → components → features → routes → app
```

- ✅ Features can import from shared components
- ✅ Routes can import from features
- ❌ Features should NOT import from routes
- ❌ Shared components should NOT import from features

### 4. **Import Conventions**

See [Import Conventions Guide](./import-conventions.md) for detailed import guidelines and examples.

## 📁 Directory Guidelines

### `/features`
Each feature should be self-contained:

```
features/timer/
├── api/
│   └── timer.api.ts         # API calls for timer
├── components/
│   ├── timer-display/       # Feature-specific component
│   │   ├── timer-display.tsx
│   │   └── timer-display.module.scss
│   └── timer-controls/
├── hooks/
│   └── use-timer.ts         # Timer-specific hook
├── stores/
│   └── timer.store.ts       # Timer state management
├── types/
│   └── timer.types.ts       # Timer-specific types
├── utils/
│   └── format-time.ts       # Timer utilities
└── index.ts                 # Public exports
```

### `/routes`
Routes should remain thin and focused on routing concerns:

```tsx
// src/routes/timer/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timer/')({
  component: TimerPage,
})

function TimerPage() {
  return <TimerView />
}
```

### `/components`
Only truly reusable components belong here:

```
components/ui/button/
├── button.tsx              # Component implementation
├── button.module.scss      # Component styles
├── button.test.tsx         # Component tests
├── button.stories.tsx      # Storybook stories
└── index.ts               # Public exports
```

## 🔄 Migration Guide

### Current Structure → Bulletproof Structure

1. **Move timer logic from routes to features:**
   ```bash
   # Current
   src/routes/timer/
   ├── index.tsx           # Contains all timer logic
   └── timer.module.scss

   # New
   src/features/timer/
   ├── components/
   │   └── timer-view.tsx  # Main timer component
   ├── hooks/
   │   └── use-timer.ts    # Timer logic
   └── utils/
       └── format-time.ts  # Time formatting

   src/routes/timer/
   └── index.tsx           # Thin route file
   ```

2. **Extract shared components:**
   ```bash
   # Move TimerButton to shared UI components
   src/components/ui/timer-button/
   ├── timer-button.tsx
   └── timer-button.module.scss
   ```

3. **Update imports according to project conventions**

## 🛠️ Implementation Example

Here's how to structure a new feature following this architecture:

### Step 1: Create the feature
```bash
src/features/workouts/
├── api/
│   └── workouts.api.ts
├── components/
│   ├── workout-list/
│   └── workout-form/
├── hooks/
│   └── use-workouts.ts
└── index.ts
```

### Step 2: Create the route
```tsx
// src/routes/workouts/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workouts/')({
  component: WorkoutsPage,
})

function WorkoutsPage() {
  return <WorkoutsView />
}
```

### Step 3: Export from feature
```tsx
// src/features/workouts/index.ts
export { WorkoutsView } from './components/workouts-view'
export { useWorkouts } from './hooks/use-workouts'
export type { Workout, WorkoutFormData } from './types'
```

## 📋 Best Practices

1. **Keep features independent** - Features should not import from each other
2. **Use barrel exports carefully** - Only export what's needed publicly
3. **Colocate related code** - Keep tests, styles, and components together
4. **Follow naming conventions**:
   - Components: PascalCase
   - Files: kebab-case
   - Routes: lowercase
5. **Document complex logic** - Add JSDoc comments for complex functions
6. **Write tests** - Colocate tests with the code they test
7. **Follow established import conventions** - See [Import Conventions Guide](./import-conventions.md)

## 🚀 Benefits

- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: Clear separation of concerns and dependencies
- **Testability**: Isolated features are easier to test
- **Developer Experience**: Predictable structure makes navigation easier
- **Type Safety**: Full TypeScript support with TanStack Router
- **Performance**: Code splitting by feature and route

## 📚 Additional Resources

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Feature-Sliced Design](https://feature-sliced.design/)