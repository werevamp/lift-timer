# Timer Data Architecture

This document explains the timer data flow architecture for the LiftTimer application. It describes how timer data is managed and passed between components using a simplified single-session model.

## Overview

The timer system uses a **simplified approach** combining:

- **React Context** (`TimerSessionContext`) for state management
- **localStorage** for data persistence (single session)
- **Simple routing** without session IDs

This architecture ensures:

- Single active workout session at a time
- Data persists across browser refreshes
- Clean and simple component APIs
- Easy future migration to database storage

## Architecture Diagram

```
┌─────────────────┐     ┌───────────────────┐     ┌─────────────────┐
│  TimerBuilder   │────▶│TimerSessionContext│────▶│   TimerView     │
│                 │     │                   │     │                 │
│ Creates timers  │     │ - timers[]        │     │ Gets data from  │
│ Generates IDs   │     │ - currentIndex    │     │ context directly│
└─────────────────┘     │ - sessionName     │     └─────────────────┘
                        │ - timerState      │
                        └───────────────────┘
                                 │
                                 ▼
                        ┌──────────────────────┐
                        │   localStorage       │
                        │                      │
                        │ Single session       │
                        │ key: 'currentSession'│
                        └──────────────────────┘

Routes:
- /timer-builder       → Create/add timers
- /timer/session       → View active session
```

## Data Types

### Timer Types

```typescript
// Base timer structure
interface Timer {
  id: string
  type: 'standard' | 'fixed-interval'
  name?: string
  settings: StandardTimerSettings | FixedIntervalTimerSettings
}

interface StandardTimerSettings {
  duration: {
    minutes: number
    seconds: number
  }
}

interface FixedIntervalTimerSettings {
  activeTime: {
    minutes: number
    seconds: number
  }
  restTime: {
    minutes: number
    seconds: number
  }
  rounds: number
}
```

### Session Data (in localStorage)

```typescript
interface SessionData {
  timers: Timer[] // Array of timer objects
  currentTimerIndex: number // Current position in array
  sessionName?: string // Optional session name
}
```

### Timer State (Runtime)

```typescript
type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

interface TimerState {
  status: TimerStatus // Current timer status
  elapsedSeconds: number // Time elapsed
  startedAt?: number // Timestamp when started
  pausedAt?: number // Timestamp when paused
}
```

## Component APIs

### TimerView Component

The TimerView component uses the `useTimerSession` hook directly - no props needed:

```tsx
export function TimerView() {
  const { currentTimer } = useTimerSession()

  return (
    <div>
      {/* Timer display */}
      <SessionControls />
    </div>
  )
}
```

### SessionControls Component

Similarly, SessionControls accesses context directly:

```tsx
export function SessionControls() {
  const { timers, currentTimerIndex, nextTimer, previousTimer, hasNextTimer, hasPreviousTimer } =
    useTimerSession()

  // Render navigation controls
}
```

## Data Flow Examples

### 1. Creating a Single Timer

```
1. User fills TimerBuilder form
2. TimerBuilder generates unique ID (crypto.randomUUID())
3. Calls startSession(timer, sessionName)
4. Context:
   - Sets timers = [timer]
   - Sets currentTimerIndex = 0
   - Saves to localStorage key 'currentSession'
5. Navigates to: /timer/session
6. TimerView renders with currentTimer from context
```

### 2. Adding Timer to Existing Session

```
1. User at: /timer/session (viewing current timer)
2. Clicks "Add Timer" button
3. Navigate to: /timer-builder?returnUrl=/timer/session
4. User creates new timer
5. Calls addTimer(timer)
6. Context:
   - Appends timer to timers array
   - Updates localStorage
7. Returns to session view
8. New timer available via "Next Timer"
```

### 3. Navigating Between Timers

```
1. User viewing timer at index 0
2. Clicks "Next Timer"
3. Context:
   - Updates currentTimerIndex to 1
   - Saves to localStorage
   - Resets timer state
4. TimerView re-renders with new currentTimer
```

### 4. Resuming After Refresh

```
1. User refreshes browser
2. TimerSessionContext on mount:
   - Loads from localStorage 'currentSession'
   - Restores timers array and currentTimerIndex
3. TimerView renders with restored state
```

## Implementation Guide

### 1. Using the TimerSession Hook

```tsx
function MyComponent() {
  const {
    // State
    timers, // Timer[]
    currentTimerIndex, // number
    currentTimer, // Timer | null (computed)
    sessionName, // string | undefined
    timerState, // TimerState | null

    // Navigation
    hasNextTimer, // boolean
    hasPreviousTimer, // boolean
    nextTimer, // () => void
    previousTimer, // () => void
    navigateToTimer, // (index: number) => void

    // Session management
    startSession, // (timer: Timer, name?: string) => void
    addTimer, // (timer: Timer) => void
    clearSession, // () => void

    // Timer controls
    updateTimerState, // (state: Partial<TimerState>) => void
    completeCurrentTimer, // () => void
  } = useTimerSession()
}
```

### 2. Timer Implementation Example

```tsx
function TimerDisplay() {
  const { currentTimer, timerState, updateTimerState } = useTimerSession()

  if (!currentTimer) return <div>No timer selected</div>

  // Standard timer countdown
  if (currentTimer.type === 'standard') {
    const totalSeconds =
      currentTimer.settings.duration.minutes * 60 + currentTimer.settings.duration.seconds

    // Implement countdown logic
    const remainingSeconds = totalSeconds - (timerState?.elapsedSeconds || 0)
  }

  // Control timer state
  const handleStart = () => {
    updateTimerState({
      status: 'running',
      startedAt: Date.now(),
    })
  }

  const handlePause = () => {
    updateTimerState({
      status: 'paused',
      pausedAt: Date.now(),
    })
  }
}
```

## URL Structure

### Routes

```
/timer-builder         → Create new timer or add to session
/timer/session         → View/run active timer session
```

### Query Parameters

```
/timer-builder?returnUrl={encodedUrl}  → Return to session after creating
/timer/session?index={number}          → Jump to specific timer (optional)
```

## Storage Structure

### localStorage

Only one key is used for the entire session:

```javascript
'currentSession' → {
  timers: Timer[],
  currentTimerIndex: number,
  sessionName?: string
}
```

Individual timer objects are stored inline within the session, not separately.

## Key Architecture Decisions

### 1. Single Session Model

- Only one active workout session at a time
- No session IDs needed
- Simplifies state management
- Easy migration to multi-session database model later

### 2. Direct Context Access

- Components use `useTimerSession()` hook directly
- No prop drilling needed
- Cleaner component APIs
- Better encapsulation

### 3. Timer Array vs Timer IDs

- Timers stored as objects in array, not just IDs
- No separate timer storage needed
- Direct access without lookups
- Simpler data model

### 4. Simplified Timer State

- Single `status` field instead of boolean flags
- Clear states: idle, running, paused, completed
- Prevents invalid state combinations

## Summary

The simplified architecture provides:

- **Clean APIs** - Components get data directly from context
- **Simple routing** - No session IDs in URLs
- **Easy state management** - Just an array of timers with an index
- **Future flexibility** - Easy to add database backend later
- **Better DX** - Less code, clearer mental model

This approach prioritizes simplicity while maintaining all necessary functionality for a robust timer application.
