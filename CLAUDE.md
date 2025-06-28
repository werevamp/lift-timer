# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a student timer application built with React, Vite, and Tailwind CSS. The application is designed to help students manage their study time effectively.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Project Structure

```
src/
├── main.jsx       # React app entry point
├── App.jsx        # Main app component
└── index.css      # Global styles with Tailwind directives
```

## Development Notes

- Tailwind CSS is configured to scan all HTML, JS, TS, JSX, and TSX files
- Hot module replacement is enabled for fast development
- The app uses modern React patterns with hooks