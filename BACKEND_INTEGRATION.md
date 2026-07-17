# Education CRM - Backend Integration Guide

This document lists all frontend placeholders that are currently simulating features lacking backend APIs. These need to be wired up once the backend endpoints are created.

## Dashboard / Analytics
- [ ] **Attendance Rate & Growth Rate:** Currently using hardcoded percentages in `Dashboard.jsx`.
- [ ] **Revenue Area Chart:** `AnalyticsCharts.jsx` uses static mock data arrays.
- [ ] **Reports Downloads:** `ReportsPlaceholder.jsx` just simulates a download action.

## Students Module
- [ ] **Attendance Tab:** Uses an empty state. Needs an endpoint returning a student's daily attendance history.
- [ ] **Payments Tab:** Uses an empty state. Needs an endpoint returning payment history for a specific student.
- [ ] **Timeline Tab:** Uses hardcoded "Student registered" item. Needs an activity audit log API.

## Groups Module
- [ ] **Students List in Group:** Drawer uses an empty state. Needs `GET /api/groups/:id/students`.
- [ ] **Group Schedule:** Uses an empty state. Needs `GET /api/groups/:id/schedule`.
- [ ] **Group Attendance Heatmap:** Needs aggregated attendance data per group.

## Teachers Module
- [ ] **Teacher Schedule:** Drawer uses empty state. Needs API to fetch specific teacher's active classes.
- [ ] **Salary / Payroll:** Needs payroll API integration.

## Payments Module
- [ ] **Pending Payments / Invoices:** UI uses premium placeholders. Requires backend invoice generation and tracking.

## Lessons Module
- [ ] **Daily/Weekly Calendar Events:** Uses static placeholder arrays for lessons. Needs `GET /api/lessons?start_date=X&end_date=Y`.
- [ ] **Homework:** UI placeholder ready for a homework tracking API.

## Rooms Module
- [ ] **Room Schedule:** Uses a detailed UI placeholder for tracking room occupancy timelines.
