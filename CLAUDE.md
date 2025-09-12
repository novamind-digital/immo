# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Handover App (Wohnungsübergabe) - a German apartment handover application built with React, TypeScript, and TailwindCSS. The app provides a multi-step form interface for managing apartment handovers between owners and tenants.

## Development Commands

Navigate to the `handover-app` directory for all development activities:

```bash
cd handover-app
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npx tsc --noEmit    # Type check without emitting files
```

## Project Architecture

### Directory Structure
- `src/components/` - Reusable React components
- `src/types/` - TypeScript interface definitions  
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `src/pages/` - Page components (future use)

### Key Components
- **Header**: Navigation bar with hamburger menu and title
- **ProgressIndicator**: Multi-step progress visualization
- **GeneralInformation**: Main form component for Step 1
- **Form Components**: Reusable inputs (InputField, RadioGroup, DatePicker, Toggle, ActionButton)

### Data Flow
- Main form data managed in `App.tsx` using `HandoverFormData` interface
- Form state flows down to components via props
- Updates bubble up through callback functions

### Styling
- TailwindCSS for all styling with custom primary blue color scheme
- Responsive design following mobile-first approach
- German UI text and formatting (TT.MM.JJ date format)

## Form Structure

The application follows a 4-step wizard:
1. **Allgemeine Angaben** (General Information) - Owner/tenant details ✅ Implemented
2. **Angaben zum Mietobjekt** (Property Information) - Property details
3. **Schlüsselübergabe** (Key Handover) - Key exchange process  
4. **Bilder zum Mietobjekt** (Property Images) - Photo documentation

## Development Notes

- Uses Vite for fast development and building
- All text is in German to match the target audience
- Form validation and error handling ready for implementation
- Component-based architecture allows easy extension for remaining steps