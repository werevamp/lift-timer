# CSS Variables Reference Guide

This project uses CSS custom properties (variables) for all dynamic styling values. This enables runtime theming, better maintainability, and improved developer experience.

## Why CSS Variables Over SCSS Variables?

- **Runtime Changes**: CSS variables can be changed at runtime without recompilation
- **Theme Support**: Enable instant theme switching
- **DevTools**: Inspect and modify values in browser DevTools
- **Cascade & Inheritance**: Follow CSS cascade rules
- **JavaScript Access**: Read/write from JavaScript

## Available CSS Variables

### Colors

#### Primary Colors

```css
--color-primary
--color-primary-light
--color-primary-dark
--color-primary-alpha-10
--color-primary-alpha-20

--color-secondary
--color-secondary-light
--color-secondary-dark

--color-tertiary
--color-success
--color-warning
--color-danger
```

#### Semantic Colors

```css
--color-background
--color-background-secondary
--color-surface
--color-surface-variant

--color-text
--color-text-secondary
--color-text-muted
--color-text-inverse

--color-border
--color-border-light
--color-border-focus
```

### Typography

#### Font Families

```css
--font-family-base
--font-family-mono
```

#### Font Sizes

```css
--font-size-xs    /* 0.75rem (12px) */
--font-size-sm    /* 0.875rem (14px) */
--font-size-base  /* 1rem (16px) */
--font-size-lg    /* 1.125rem (18px) */
--font-size-xl    /* 1.25rem (20px) */
--font-size-2xl   /* 1.5rem (24px) */
--font-size-3xl   /* 1.875rem (30px) */
--font-size-4xl   /* 2.25rem (36px) */
```

#### Font Weights

```css
--font-weight-light     /* 300 */
--font-weight-normal    /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */
```

#### Line Heights

```css
--line-height-tight    /* 1.25 */
--line-height-normal   /* 1.5 */
--line-height-relaxed  /* 1.75 */
--line-height-loose    /* 2 */
```

### Spacing

```css
--spacing-xs   /* 0.25rem (4px) */
--spacing-sm   /* 0.5rem (8px) */
--spacing-md   /* 1rem (16px) */
--spacing-lg   /* 1.5rem (24px) */
--spacing-xl   /* 2rem (32px) */
--spacing-xxl  /* 3rem (48px) */
```

### Border Radius

```css
--radius-sm    /* 4px */
--radius-md    /* 8px */
--radius-lg    /* 16px */
--radius-full  /* 9999px */
```

### Shadows

```css
--shadow-sm-theme
--shadow-md-theme
--shadow-lg-theme
--shadow-xl-theme
```

### Z-Index Layers

```css
--z-index-dropdown       /* 1000 */
--z-index-sticky         /* 1020 */
--z-index-fixed          /* 1030 */
--z-index-modal-backdrop /* 1040 */
--z-index-modal          /* 1050 */
--z-index-popover        /* 1060 */
--z-index-tooltip        /* 1070 */
```

### Animation & Transitions

```css
--transition-fast   /* 150ms ease-in-out */
--transition-base   /* 200ms ease-in-out */
--transition-slow   /* 300ms ease-in-out */
--transition-theme  /* 300ms ease-in-out */
```

### Component Tokens

```css
/* Buttons */
--button-padding-x
--button-padding-y
--button-radius

/* Cards */
--card-padding
--card-radius
--card-background
--card-shadow

/* Forms */
--input-padding-x
--input-padding-y
--input-radius
--input-border-color
--input-focus-color

/* States */
--hover-opacity
--disabled-opacity
--focus-ring-width
--focus-ring-color
--focus-ring-offset
```

## Usage Examples

### Basic Usage

```scss
.my-component {
  // ✅ Good - Uses CSS variables
  color: var(--color-text);
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);

  // ❌ Bad - Uses SCSS variables
  color: $text-color;
  padding: $spacing-md;
}
```

### With Fallbacks

```scss
.my-component {
  // Provide fallback values
  color: var(--color-primary, #3880ff);
  padding: var(--spacing-md, 1rem);
}
```

### In JavaScript/TypeScript

```typescript
// Read a CSS variable
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// Set a CSS variable
document.documentElement.style.setProperty('--color-primary', '#ff0000');

// Using the useThemeVariable hook
import { useThemeVariable } from '@/features/theme';

function MyComponent() {
  const primaryColor = useThemeVariable('color-primary');
  return <div style={{ color: primaryColor }}>Themed text</div>;
}
```

### Responsive Design

```scss
.responsive-text {
  font-size: var(--font-size-base);

  @media (min-width: 768px) {
    font-size: var(--font-size-lg);
  }

  @media (min-width: 1024px) {
    font-size: var(--font-size-xl);
  }
}
```

### Theme-Aware Components

```scss
.theme-aware-card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md-theme);

  &:hover {
    box-shadow: var(--shadow-lg-theme);
  }
}
```

## Best Practices

### 1. Always Use Semantic Names

```scss
// ✅ Good - Semantic, theme-aware
background: var(--color-background);
color: var(--color-text);

// ❌ Bad - Hard-coded colors
background: white;
color: black;
```

### 2. Use Calc with Variables

```scss
// Dynamic calculations
.double-spacing {
  padding: calc(var(--spacing-md) * 2);
}

.responsive-font {
  font-size: calc(var(--font-size-base) * 1.25);
}
```

### 3. Component-Specific Variables

```scss
.my-component {
  // Define local CSS variables
  --component-gap: var(--spacing-md);
  --component-radius: var(--radius-lg);

  // Use them
  gap: var(--component-gap);
  border-radius: var(--component-radius);

  // Easy to override
  &.compact {
    --component-gap: var(--spacing-sm);
  }
}
```

### 4. Avoid SCSS Variables for Dynamic Values

```scss
// ❌ Bad - SCSS variable (compile-time)
$primary: #3880ff;
.button {
  background: $primary;
}

// ✅ Good - CSS variable (runtime)
.button {
  background: var(--color-primary);
}
```

## Exceptions

### Media Queries

CSS variables cannot be used in media queries, so breakpoints remain as SCSS variables:

```scss
// This is OK - breakpoints must be SCSS variables
@media (min-width: $breakpoint-md) {
  // styles
}
```

### SCSS Functions

When using SCSS functions that require static values:

```scss
// The rem() function needs a static value
.element {
  width: rem(320px); // This is OK
}
```

## Migration Guide

If you're updating old code:

1. **Colors**: Replace `$primary-color` → `var(--color-primary)`
2. **Spacing**: Replace `$spacing-md` → `var(--spacing-md)`
3. **Typography**: Replace `$font-size-lg` → `var(--font-size-lg)`
4. **Shadows**: Replace `$shadow-md` → `var(--shadow-md-theme)`
5. **Z-index**: Replace `$z-index-modal` → `var(--z-index-modal)`

## Tools & Debugging

### Browser DevTools

1. Inspect element
2. Look for CSS variables in computed styles
3. Modify values live in the browser
4. Changes apply instantly to all elements using that variable

### VS Code IntelliSense

The project is configured to provide autocomplete for CSS variables:

- Type `var(--` to see all available variables
- Hover over variables to see their values

### Theme Testing

```javascript
// Quick theme test in console
document.documentElement.setAttribute('data-theme', 'dark')
document.documentElement.setAttribute('data-theme', 'light')
document.documentElement.setAttribute('data-theme', 'high-contrast')
```
