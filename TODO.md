# Education CRM - TODO & Remaining Work

The UI and frontend architecture are production-ready. The remaining work focuses exclusively on Backend Integration and QA.

## High Priority
- [ ] **API Endpoint Implementation:** Build the missing endpoints listed in `BACKEND_INTEGRATION.md`.
- [ ] **Data Hookup:** Replace placeholder arrays in Charts and Drawers with real `SWR` or `React Query` fetches.
- [ ] **Authentication:** Wire up the login flow with real JWT token storage and route guarding.
- [ ] **Role-Based Access Control (RBAC):** Restrict certain pages (e.g., Settings, Finance) based on the current user's role.

## Medium Priority
- [ ] **Pagination Logic:** Implement server-side pagination for `StudentsTable`, `PaymentsTable`, and `GroupsTable` to handle thousands of records efficiently.
- [ ] **File Uploads:** Implement AWS S3 or similar backend handling for the "Files" tab placeholders in Drawers.
- [ ] **Export/Import:** Connect the CSV export/import buttons in the module headers to real backend processing jobs.

## Low Priority
- [ ] **Real-time Updates:** Consider WebSockets for immediate UI updates on attendance or payment processing.
- [ ] **Localization (i18n):** Extract all hardcoded Uzbek strings into a robust translation dictionary (e.g., `react-i18next`).
