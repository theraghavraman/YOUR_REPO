# Portfolio Website

## Overview

This is a modern, animated portfolio website built with React, TypeScript, and Express. The application features a single-page portfolio design with smooth animations, custom cursor effects, particle backgrounds, and a responsive layout. It showcases a developer's work, skills, and experience with a neon-themed cyberpunk aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured to serve from the `client` directory
- **Wouter** for client-side routing (lightweight React Router alternative)
- **Tailwind CSS** with custom configuration for styling, using CSS variables for theming

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- Consistent component structure using the "New York" style variant
- Path aliases configured (`@/components`, `@/lib`, `@/hooks`) for clean imports
- Custom theming with neon colors (pink, purple, cyan, green, yellow) for a cyberpunk aesthetic

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management
- Custom API client in `lib/queryClient.ts` with fetch wrapper
- Toast notifications using shadcn/ui toast system
- No global state management needed for current portfolio implementation

**Animation & Visual Effects**
- **Framer Motion** for smooth animations and transitions
- Custom cursor component that responds to interactive elements (desktop only)
- Particle background system with canvas-based animation
- Scroll progress indicator in navigation
- Mobile-responsive design with breakpoint at 768px

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the REST API
- Modular route registration system in `server/routes.ts`
- Custom request logging middleware that captures JSON responses
- Vite integration for HMR during development

**Development vs Production**
- Development: Vite middleware for hot module replacement
- Production: Static file serving from `dist/public`
- Build process bundles server with esbuild and client with Vite

**Storage Layer**
- In-memory storage implementation (`MemStorage` class)
- Interface-based design (`IStorage`) for easy migration to persistent storage
- Basic user CRUD operations with UUID generation
- Prepared for database integration (Drizzle ORM configured)

### External Dependencies

**Database (Configured but not implemented)**
- **PostgreSQL** via Neon serverless driver (`@neondatabase/serverless`)
- **Drizzle ORM** for type-safe database queries and schema management
- Schema defined in `shared/schema.ts` with user table
- Migration system configured via `drizzle-kit`
- Environment variable `DATABASE_URL` required for database connection

**UI Component Libraries**
- **Radix UI** primitives for accessible, unstyled components (accordion, dialog, dropdown, etc.)
- **Embla Carousel** for carousel functionality
- **Lucide React** for icons
- **date-fns** for date formatting
- **cmdk** for command palette functionality

**Development Tools**
- **Replit-specific plugins**: cartographer (code intelligence) and dev banner (development mode indicator)
- Runtime error modal for better debugging experience
- TypeScript with strict mode enabled
- ESM module system throughout

**Session Management**
- `connect-pg-simple` for PostgreSQL session storage (configured but not actively used)
- Prepared for authentication implementation

### Design Decisions

**Why Vite over Create React App**
- Faster development server with native ESM
- Better build performance
- Built-in TypeScript support
- Superior HMR experience

**Why In-Memory Storage**
- Simplified initial setup for portfolio showcase
- Easy transition to database when needed (interface already defined)
- No external dependencies required for basic functionality

**Why shadcn/ui over Material-UI or Chakra**
- Full control over component code (components live in project)
- Built on accessible Radix UI primitives
- Tailwind CSS integration for consistent styling
- Smaller bundle size (only includes used components)

**Why Wouter over React Router**
- Smaller bundle size (1.5kb vs 10kb+)
- Sufficient for single-page portfolio needs
- Hook-based API familiar to React developers

**Responsive Strategy**
- Mobile-first Tailwind breakpoints
- Custom cursor disabled on touch devices (hover detection)
- Particle count scales with viewport size for performance
- Mobile menu with slide-out navigation