# Prettier Setup

This document describes the Prettier configuration for the LiftTimer project.

## Installation

Prettier is installed as a development dependency. To install it after cloning the repository:

```bash
npm install
```

## Configuration

The project uses a `.prettierrc` file with the following settings:

- **Semi-colons**: Disabled (`semi: false`)
- **Quotes**: Single quotes for JavaScript/TypeScript (`singleQuote: true`)
- **Tab Width**: 2 spaces (`tabWidth: 2`)
- **Indentation**: Spaces, not tabs (`useTabs: false`)
- **Trailing Commas**: ES5 style (`trailingComma: "es5"`)
- **Line Width**: 100 characters (`printWidth: 100`)
- **Arrow Functions**: Always use parentheses (`arrowParens: "always"`)
- **Line Endings**: Unix-style LF (`endOfLine: "lf"`)
- **JSX Quotes**: Double quotes in JSX (`jsxSingleQuote: false`)

### SCSS Override

SCSS files use double quotes instead of single quotes for better compatibility with CSS standards.

## Available Scripts

The following npm scripts are available for code formatting:

```bash
# Format all files in the project
npm run format

# Check if files are properly formatted (useful for CI)
npm run format:check
```

## Ignored Files

The `.prettierignore` file excludes the following from formatting:

- `node_modules/` - Dependencies
- `dist/`, `build/` - Build outputs
- `ios/`, `android/` - Platform-specific code
- `.idea/`, `.vscode/` - IDE configurations
- Environment files (`.env*`)
- Log files (`*.log`)
- Coverage reports
- Generated files (`*.generated.ts`, `routeTree.gen.ts`)

## Editor Integration

For the best developer experience, install the Prettier extension for your editor:

- **VS Code**: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- **WebStorm/IntelliJ**: Built-in Prettier support (enable in Settings > Languages & Frameworks > JavaScript > Prettier)

### VS Code Settings

Add these settings to your VS Code workspace or user settings:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Pre-commit Hook (Optional)

To ensure all code is formatted before committing, you can set up a pre-commit hook using `husky` and `lint-staged`. This is not currently configured but can be added if the team decides to enforce formatting on commits.

## Team Guidelines

1. Run `npm run format` before committing code
2. Configure your editor to format on save
3. If you encounter formatting conflicts, the `.prettierrc` file is the source of truth
4. For any proposed changes to formatting rules, discuss with the team first