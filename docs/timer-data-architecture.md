# Timer Data Architecture

This document explains the timer data flow architecture for the LiftTimer application. It describes how timer data is passed from the TimerBuilder to the Timer page, supporting both single timers and workout sequences.

## Overview

The timer system uses a **hybrid approach** combining:
- **React Context** for active timer state management
- **localStorage** for data persistence
- **URL routing** for navigation and sharing

This architecture ensures:
- Timers continue running during navigation
- Data persists across browser refreshes
- Workouts can be shared via URLs
- Dynamic timer addition during active sessions

## Architecture Diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  TimerBuilder   │────▶│  Context/Store   │────▶│   Timer Page    │
│                 │     │                  │     │                 │
│ Creates timers  │     │ - Active session │     │ Displays timer  │
│ Generates IDs   │     │ - Timer state    │     │ Shows controls  │
└─────────────────┘     │ - Elapsed time   │     └─────────────────┘
         │              └──────────────────┘              ▲
         │                       │                        │
         ▼                       ▼                        │
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  localStorage   │     │       URL        │     │   Route Params   │
│                 │     │                  │     │                  │
│ - Timer data    │     │ /timer/session/  │────▶│ - Session ID     │
│ - Sessions      │     │   {sessionId}    │     │ - Timer index    │
└─────────────────┘     └──────────────────┘     └──────────────────┘
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

### Workout Session

```typescript
interface WorkoutSession {
  id: string
  name?: string
  timerIds: string[]
  currentTimerIndex: number
  isActive: boolean
  createdAt: number
  updatedAt: number
}
```

### Timer State (Runtime)

```typescript
interface TimerState {
  isRunning: boolean
  isPaused: boolean
  elapsedSeconds: number
  startedAt?: number
  pausedAt?: number
}
```

## Timer View Props

The Timer page component receives these props:

```typescript
interface TimerViewProps {
  // Current timer configuration
  timer: Timer

  // Session information (if part of a workout sequence)
  session?: {
    id: string
    name?: string
    currentIndex: number
    totalTimers: number
    hasNext: boolean
    hasPrevious: boolean
  }

  // Navigation callbacks
  onNextTimer?: () => void
  onPreviousTimer?: () => void
  onAddTimer?: () => void
  onComplete?: () => void
}
```

## Data Flow Examples

### 1. Creating a Single Timer

```
1. User fills TimerBuilder form
2. TimerBuilder generates unique ID (crypto.randomUUID())
3. Creates WorkoutSession with single timer
4. Saves to localStorage:
   - Timer by ID: localStorage.setItem('timer-{id}', timer)
   - Session: localStorage.setItem('session-{id}', session)
5. Updates Context with new session
6. Navigates to: /timer/session/{sessionId}?index=0
7. Timer page loads data from Context/localStorage
```

### 2. Adding Timer to Active Session

```
1. Timer running at: /timer/session/abc123?index=0
2. User clicks "Add Timer" button
3. Navigate to: /timer-builder?session=abc123&returnUrl=/timer/session/abc123?index=0
4. Timer continues running in Context
5. User creates new timer in TimerBuilder
6. New timer added to session.timerIds array
7. Navigate back to active timer
8. New timer available as "Next Timer"
```

### 3. Navigating Between Timers

```
1. Current URL: /timer/session/abc123?index=0
2. User completes timer and clicks "Next Timer"
3. Context updates currentTimerIndex
4. Navigate to: /timer/session/abc123?index=1
5. Timer page loads next timer from session
6. Previous timer data preserved in localStorage
```

### 4. Resuming After Refresh

```
1. User refreshes at: /timer/session/abc123?index=1
2. App initializes:
   - Read sessionId from URL
   - Load session from localStorage
   - Load current timer from localStorage
   - Restore to Context
3. Timer page receives data from Context
4. UI shows timer at correct position
```

## Implementation Guide for Timer Page

### 1. Accessing Timer Data

```tsx
// In your Timer page component
function TimerPage() {
  // Timer data will be passed as props from the route
  // The route handles loading from Context/localStorage

  return <TimerView {...timerViewProps} />
}
```

### 2. Handling Timer Controls

```tsx
function TimerView({ timer, session, onNextTimer, onAddTimer }: TimerViewProps) {
  // Display timer based on type
  const isStandardTimer = timer.type === 'standard'
  const isIntervalTimer = timer.type === 'fixed-interval'

  // Show session progress if part of sequence
  if (session) {
    // Display: "Timer 2 of 5"
    // Show Next/Previous buttons based on hasNext/hasPrevious
  }

  // Always show "Add Timer" button
  // Call onAddTimer() when clicked
}
```

### 3. Timer State Management

The Timer page should focus on:
- Displaying the timer configuration
- Managing countdown/interval logic
- Showing appropriate controls
- Calling navigation callbacks

The Context handles:
- Persisting timer state
- Navigation between timers
- Session management
- localStorage synchronization

### 4. Example Timer Display Logic

```tsx
// For standard timer
if (timer.type === 'standard') {
  const totalSeconds = timer.settings.duration.minutes * 60 + timer.settings.duration.seconds
  // Implement countdown from totalSeconds
}

// For interval timer
if (timer.type === 'fixed-interval') {
  const { activeTime, restTime, rounds } = timer.settings
  // Implement interval logic with rounds
}
```

## URL Structure

### Single Timer (Future)
```
/timer/{timerId}
```

### Timer in Session
```
/timer/session/{sessionId}?index={currentIndex}
```

### Timer Builder with Context
```
/timer-builder?session={sessionId}&returnUrl={encodedUrl}
```

## Storage Structure

### localStorage Keys

```javascript
// Individual timers
`timer-${timerId}` → Timer object

// Workout sessions
`session-${sessionId}` → WorkoutSession object

// Active session (optional)
`activeSessionId` → Current session ID
```

## Testing Considerations

### For Timer Page Development

1. **Test with mock data**:
   ```tsx
   const mockTimer: Timer = {
     id: 'test-123',
     type: 'standard',
     name: 'Test Timer',
     settings: {
       duration: { minutes: 5, seconds: 0 }
     }
   }
   ```

2. **Test session scenarios**:
   - Single timer (no session)
   - First timer in sequence
   - Middle timer in sequence
   - Last timer in sequence

3. **Test navigation callbacks**:
   - Ensure onNextTimer updates the URL
   - Ensure onAddTimer navigates correctly
   - Test completion behavior

## Future Enhancements

1. **Timer Presets**: Save frequently used timers
2. **Workout Templates**: Pre-defined workout sequences
3. **History**: Track completed workouts
4. **Sharing**: Generate shareable workout links
5. **Audio Cues**: Sound notifications for timer events
6. **Export/Import**: Backup and share workout data

## Summary

This architecture provides a robust foundation for timer functionality while maintaining flexibility for future features. The Timer page developer can focus on building the UI and timer logic, while the data infrastructure handles persistence, navigation, and state management seamlessly.