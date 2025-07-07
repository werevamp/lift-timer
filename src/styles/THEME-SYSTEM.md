# Theme System Documentation

## Overview

LiftTimer uses a hybrid theme system that combines multiple modern CSS features for maximum flexibility and browser compatibility:

1. **CSS Custom Properties** (`--theme: light/dark`)
2. **Container Queries** (for component-level theme awareness)
3. **Data attributes** (`data-theme="light"`)
4. **System preference detection** (`prefers-color-scheme`)

## How It Works

### 1. Theme Detection Priority

The theme is determined in this order:
1. Explicit `data-theme` attribute on root element (highest priority)
2. System preference via `prefers-color-scheme` (if no data-theme)
3. Default to light theme

### 2. The Hybrid Approach

```scss
// Root level sets the theme variable
:root {
  --theme: light;
  color-scheme: light;
  
  @media (prefers-color-scheme: dark) {
    --theme: dark;
    color-scheme: dark;
  }
}

// Components can respond to theme via container queries
.component {
  @container style(--theme: dark) {
    // Dark theme styles
  }
}
```

### 3. Usage Examples

#### Basic Theme-Aware Component
```scss
.card {
  background: var(--color-surface);
  
  @container style(--theme: dark) {
    box-shadow: var(--shadow-sm-theme);
  }
}
```

#### JavaScript Theme Switching
```javascript
// Set theme explicitly
document.documentElement.setAttribute('data-theme', 'dark');

// Follow system preference
document.documentElement.removeAttribute('data-theme');

// Get current theme
const theme = getComputedStyle(document.documentElement)
  .getPropertyValue('--theme').trim();
```

### 4. Utility Classes

- `.show-on-dark` - Only visible in dark theme
- `.show-on-light` - Only visible in light theme
- `.hide-on-dark` - Hidden in dark theme
- `.hide-on-light` - Hidden in light theme
- `.theme-aware` - Generic theme-aware component

### 5. Browser Compatibility

The system includes automatic fallbacks:
- **Modern browsers**: Full container query support
- **Older browsers**: Falls back to attribute selectors and media queries
- **All browsers**: Support basic theme switching

### 6. Theme Transitions

Add the `theme-transition` class to `<html>` for smooth theme changes:

```javascript
document.documentElement.classList.add('theme-transition');
```

### 7. Custom Theme Variables

You can create adaptive variables that change with the theme:

```scss
:root {
  --my-adaptive-color: #000;
  
  @container style(--theme: dark) {
    --my-adaptive-color: #fff;
  }
}
```

## Benefits

1. **Performance**: Container queries are more efficient than cascading selectors
2. **Flexibility**: Components can be theme-aware without parent selectors
3. **Progressive Enhancement**: Works in all browsers with graceful degradation
4. **Developer Experience**: Simple API with powerful capabilities
5. **Future-Proof**: Uses modern CSS features with fallbacks