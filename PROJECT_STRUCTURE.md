# Education CRM - Project Structure

This document outlines the folder structure and architectural patterns used in this premium SaaS Education CRM.

## Directory Layout

```text
src/
├── assets/             # Static assets (images, icons)
├── components/         # Global reusable UI Design System
│   ├── ui/             # Core atomic components (Button, Card, Input, Badge)
│   ├── layout/         # Application layout wrappers (Sidebar, Topbar, MainLayout)
│   └── ...             # Shared cross-module components (CustomSelect, Dropdown)
├── pages/              # Module-based page routing
│   ├── dashboard/      # Executive Analytics Dashboard
│   ├── academic/       # Core education structures (Courses, Groups, Lessons)
│   ├── admin/          # Administration (Branches, Rooms, Teachers, Settings)
│   ├── finance/        # Payments, Grants, Discounts
│   └── students/       # Students, Parents, Attendance
├── services/           # API integration layer
│   └── api.js          # Centralized Axios client and API endpoints
├── App.jsx             # Root React Router definitions
├── index.css           # Global Tailwind CSS tokens and utilities
└── main.jsx            # Application entry point
```

## Module Architecture (The <200 Rule)

To ensure the codebase remains maintainable, every major module in `src/pages/` follows the **Strict Modular Architecture** pattern. No `index.jsx` file is allowed to exceed 200 lines.

A typical module directory looks like this:
```text
src/pages/students/Students/
├── index.jsx                  # Main controller (State, API calls, Routing)
└── components/                # Pure presentation components
    ├── StudentsHeader.jsx     # Page titles and top-level actions
    ├── StudentsToolbar.jsx    # Search, View toggles, Filter toggles
    ├── StudentsFilters.jsx    # Advanced collapsible filters
    ├── StudentsTable.jsx      # High-density data grid
    ├── StudentEmptyState.jsx  # Premium "no data" placeholder
    └── StudentProfileDrawer.jsx # Slide-in Notion-like workspace
```

## State Management
State is typically managed at the `index.jsx` module level using standard React hooks (`useState`, `useEffect`). Props are drilled down into pure presentation components.

## Routing
Routing is handled via `react-router-dom` in `App.jsx`, utilizing a centralized `MainLayout` that provides the responsive Sidebar and Topbar.
