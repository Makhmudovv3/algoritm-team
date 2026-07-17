# Education CRM - Component Guide

The CRM uses a bespoke, Tailwind-based Design System that closely mimics premium SaaS products like Linear, Notion, and Attio. All core components are located in `src/components/ui/`.

## Design Philosophy
- **Colors:** Deep slate text (`text-slate-900`), blue/indigo accents, crisp white cards (`bg-white`), and `#0A0A0A` for dark mode surfaces.
- **Borders & Radii:** Simple 1px borders (`border-slate-200`), soft `shadow-sm`, and `rounded-xl` / `rounded-2xl` for containers.
- **Interactions:** Subtle `fade-in` (`framer-motion` or standard CSS) and `hover:bg-slate-50` for interactive elements.

## Core UI Components

### `Card`
The foundational container for widgets and isolated content blocks. It defaults to a white background, slate border, and soft shadow. Use `CardContent` for internal padding (`p-5` or `p-6`).

### `Button`
Supports variants: `default`, `outline`, `ghost`, `destructive`, `secondary`.
Supports sizes: `default`, `sm`, `lg`, `icon`.

### `Badge`
Used for status indicators. Variants: `success`, `danger`, `warning`, `info`.

### `Table`
A responsive data grid structure. Features sticky headers and custom row hover states. For premium lists, wrap the table in a `Card`.

### `Drawer`
A slide-in panel used instead of heavy modals for complex data viewing (e.g., Student Profile, Group Workspace). Supports sizes like `xl` to act as a split-view workspace.

### `Modal`
Used strictly for data creation/editing and confirmation dialogs (e.g., Delete Confirm).

### `CustomSelect` / `Input`
Form elements equipped with standard focus rings (`focus:ring-blue-500/20`), left-aligned icon support, and robust disabled states.

## Accessibility (a11y)
All UI components support standard WAI-ARIA attributes (`aria-label`, `aria-hidden` on decorative icons). Buttons have visible focus rings (`focus-visible`). Dialogs and Drawers trap focus and support `Escape` to close.
