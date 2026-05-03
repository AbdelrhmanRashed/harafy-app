# Harafy Application Documentation

Welcome to the documentation for the **Harafy** frontend application. This document provides a comprehensive overview of the project's architecture, technologies, features, and folder structure.

## 1. Project Overview

**Harafy** is a comprehensive platform connecting clients with service providers (craftsmen/artisans). The application facilitates service requests (both direct and instant), real-time order tracking, secure payments, and community interactions. The platform is managed through a robust admin dashboard.

## 2. Technology Stack

The project is a modern Single Page Application (SPA) built with the following core technologies:

- **Core:** React 19, TypeScript, Vite
- **Routing:** React Router DOM v7
- **State Management & Data Fetching:** 
  - [Zustand](https://zustand-demo.pmnd.rs/) (Global UI state)
  - [TanStack React Query v5](https://tanstack.com/query/latest) (Server state caching and synchronization)
- **Styling & UI:**
  - Tailwind CSS v4
  - Base UI / Radix UI / Shadcn UI (Accessible component primitives)
  - Framer Motion (Animations and transitions)
  - Lucide React (Icons)
- **Forms & Validation:**
  - React Hook Form
  - Zod (Schema validation)
- **Real-Time Communication:**
  - `@microsoft/signalr` (WebSockets for notifications and live tracking)
- **Maps & Geolocation:**
  - React Leaflet (Live tracking and map interactions)
- **Payments:**
  - Stripe (`@stripe/react-stripe-js`)

## 3. Architecture & Folder Structure

The application follows a feature-based architecture pattern, promoting modularity and separation of concerns.

```text
src/
├── apps/               # Application entry points based on user roles
│   ├── admin/          # Admin portal routes and layout
│   ├── auth/           # Authentication portal (Login, Register)
│   ├── client/         # Client portal routes and layout
│   ├── onboarding/     # Initial user onboarding flows
│   └── provider/       # Service Provider (Craftsman) portal routes and layout
├── assets/             # Static assets (images, icons)
├── components/         # Shared, reusable UI components (Buttons, Inputs, etc.)
├── constants/          # Global constants and configuration
├── core/               # Core setup (Main Router Configuration)
├── features/           # Feature-based modules containing business logic, pages, and specific components
│   ├── admin/          # Admin-specific pages (Dashboard, Users, Craftsmen, Reports)
│   ├── auth/           # Auth features (Login forms, Registration)
│   ├── community/      # Community feed and interactions
│   ├── creadit/        # Wallet and credit management for providers
│   ├── dashboard/      # Client and Provider dashboards
│   ├── notifications/  # Notification center
│   ├── profile/        # User profile management and settings
│   ├── Requests/       # Provider request management (Direct, Assigned, Offers, Track)
│   ├── reviews/        # Rating and review system
│   └── services/       # Client service requests (Instant, Direct)
├── guards/             # Route protection and access control (ProtectedRoute, AppStatusGuard, etc.)
├── hooks/              # Custom reusable React hooks
├── lib/                # Third-party library initializations (Axios, SignalR, Utils)
├── providers/          # React context providers (Theme, Auth, QueryClient)
├── realtime/           # SignalR connection management and event listeners
├── store/              # Zustand global state stores
└── types/              # Global TypeScript interfaces and types
```

## 4. Roles and Access Control

The application enforces role-based access control (RBAC) through Route Guards (`ProtectedRoute`).

### 1. Client (`/app`)
- **Dashboard:** Overview of activities and quick actions.
- **Services:** Browse and request services.
  - *Instant Services:* Immediate service requests.
  - *Direct Requests:* Requesting a specific craftsman.
- **Community:** Interact with posts and questions.
- **Profile & Settings:** Manage personal information, security, and notifications.
- **Order Tracking:** Track the status and live location of the assigned provider.

### 2. Service Provider / Craftsman (`/provider`)
- **Dashboard:** Overview of pending requests, earnings, and statistics.
- **Requests Management:**
  - *Assigned Requests:* Jobs accepted and currently being executed.
  - *Direct Requests:* Jobs specifically requested by clients.
  - *My Offers:* Bids placed on open client requests.
- **Wallet/Credit:** Manage account balance and purchase credits via Stripe.
- **Live Tracking (`OrderTrackPage`):** Broadcast live GPS coordinates to the client during an active service.
- **Reviews:** View feedback and ratings from clients.

### 3. Admin (`/admin`)
- **Dashboard:** Platform analytics and overview.
- **User Management:** Manage `Clients` and `Craftsmen`, including viewing details and banning users (`BannedUsersPage`).
- **Orders:** Oversee platform-wide service requests.
- **Reports:** Handle user reports and disputes.
- **Settings & Roles:** Platform configuration and RBAC management.

## 5. Core Features & Workflows

### Live Tracking & Maps
For active orders, the platform utilizes **React Leaflet** and **SignalR**. 
- The provider's app continuously polls their device's geolocation.
- Coordinates are pushed to the backend via REST/SignalR.
- The client receives real-time updates through SignalR, moving the provider's marker on a live map.

### Payment & Wallet System
Providers use credits to accept or bid on requests. 
- The wallet is managed through the `creadit` feature.
- **Stripe** is integrated for securely purchasing credit bundles. 

### Real-Time Notifications
The `realtime` directory handles the SignalR hubs. Users receive instant notifications for:
- New direct requests (Providers).
- Order status changes (Accepted, On the way, Completed).
- Chat messages or community interactions.

### Data Fetching & Caching
**React Query** is extensively used to fetch and cache data. 
- API requests are made via a configured `axios` instance (likely found in `src/lib/axios.ts`).
- Mutations (updates/creates) automatically invalidate relevant queries to keep the UI synchronized with the backend without manual re-fetching.

## 6. Styling

The project heavily relies on **Tailwind CSS v4** combined with **Radix UI/Shadcn UI** for accessibility. 
- Custom utility classes and theme tokens are defined in `tailwind.config` / `index.css`.
- `clsx` and `tailwind-merge` are used dynamically to compose classes without styling conflicts.
- Animations are handled smoothly by **Framer Motion**.

## 7. Commands

To run the project locally, the following NPM scripts are available:

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.
