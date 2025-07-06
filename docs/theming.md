# Theming System Documentation

This project implements a robust, future-proof theming system that supports infinite themes using CSS custom properties and modern CSS features.

## Overview

The theming system is built on:
- **CSS Custom Properties**: For instant theme switching without JavaScript
- **HSL Color System**: For flexible color manipulation
- **Semantic Tokens**: For consistent theming across components
- **React Context**: For theme management and persistence

## Available Themes

### Built-in Themes
1. **Light** - Default bright theme with excellent readability
2. **Dark** - Dark theme optimized for low-light environments
3. **High Contrast** - Accessibility-focused theme with maximum contrast
4. **High Contrast Dark** - Dark variant of high contrast theme
5. **System** - Automatically follows OS preference

## Using the Theme System

### Basic Usage

```tsx
import { useTheme } from '@/features/theme';

function MyComponent() {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

### Theme Switcher Component

```tsx
import { ThemeSwitcher } from '@/features/theme';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

## CSS Variables

### Color Tokens

```scss
// Primary colors
--color-primary
--color-primary-light
--color-primary-dark
--color-primary-alpha-10
--color-primary-alpha-20

// Semantic colors
--color-background
--color-surface
--color-text
--color-text-secondary
--color-border
```

### Spacing & Typography

```scss
// Spacing
--spacing-xs through --spacing-xxl

// Typography
--font-size-xs through --font-size-4xl
--font-weight-light through --font-weight-bold
--line-height-tight through --line-height-loose
```

### Using Variables in SCSS

```scss
.my-component {
  color: var(--color-text);
  background: var(--color-surface);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md-theme);
}
```

## Creating Custom Themes

### Method 1: SCSS Theme File

Create a new file in `src/styles/themes/_my-theme.scss`:

```scss
@use '../globals/theme-system' as *;

@include apply-theme('my-theme') {
  // Override any CSS variables
  --color-primary-h: 280;
  --color-primary-s: 100%;
  --color-primary-l: 60%;
  
  --color-background: hsl(280, 20%, 95%);
  --color-text: hsl(280, 100%, 10%);
  // ... etc
}
```

Then import it in `src/index.scss`:
```scss
@use '@styles/themes/my-theme';
```

### Method 2: Runtime Theme Registration

```tsx
import { useTheme } from '@/features/theme';

function ThemeCustomizer() {
  const { registerTheme } = useTheme();
  
  const addPurpleTheme = () => {
    registerTheme({
      name: 'purple',
      displayName: 'Purple Dream',
      isDark: false,
      colors: {
        primaryHue: 280,
        primarySaturation: '100%',
        primaryLightness: '60%',
        // ... other color definitions
      }
    });
  };
}
```

## Advanced Features

### Container Queries

Use container queries for component-level theming:

```scss
@container style(--theme: dark) {
  .my-component {
    // Dark theme specific styles
  }
}
```

### Theme-Aware Components

```tsx
import { useThemeStyles } from '@/features/theme';

function ThemedButton() {
  const styles = useThemeStyles(
    { backgroundColor: '#fff', color: '#000' },  // light styles
    { backgroundColor: '#000', color: '#fff' }   // dark styles
  );
  
  return <button style={styles}>Click me</button>;
}
```

### Reading CSS Variables

```tsx
import { useThemeVariable } from '@/features/theme';

function ColorDisplay() {
  const primaryColor = useThemeVariable('color-primary');
  
  return <div>Primary color is: {primaryColor}</div>;
}
```

## Best Practices

### 1. Use Semantic Tokens
Always use semantic color tokens instead of specific colors:
```scss
// ✅ Good
color: var(--color-text);
background: var(--color-surface);

// ❌ Bad
color: #333;
background: white;
```

### 2. Respect User Preferences
The system automatically detects:
- `prefers-color-scheme` for dark mode
- `prefers-contrast` for high contrast mode
- `prefers-reduced-motion` for animations

### 3. Test All Themes
Always test your components in:
- Light mode
- Dark mode
- High contrast modes
- With different font sizes

### 4. Maintain Contrast Ratios
Ensure text meets WCAG guidelines:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- High contrast mode: 7:1 or higher

## Theme Transitions

The system includes smooth transitions when switching themes:

```scss
// Automatic transitions on theme change
* {
  transition: 
    background-color var(--transition-theme),
    border-color var(--transition-theme),
    color var(--transition-theme);
}
```

To disable transitions during theme switch:
```tsx
<ThemeProvider disableTransitionOnChange>
  {children}
</ThemeProvider>
```

## Accessibility

### High Contrast Support
The system automatically applies high contrast themes when detected:

```scss
@media (prefers-contrast: high) {
  // High contrast styles applied automatically
}
```

### Focus Styles
Theme-aware focus rings adapt to each theme:
```scss
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

## Performance

- CSS custom properties update instantly
- No JavaScript required for basic theming
- Themes are lazy-loaded when needed
- Minimal runtime overhead

## Future Enhancements

The system is designed to support:
- Gradient themes
- Seasonal themes
- User-created themes
- Theme marketplace
- AI-generated themes
- Per-component theming