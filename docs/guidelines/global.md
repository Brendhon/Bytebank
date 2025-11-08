# Next.js Development Guidelines (Refactoring & Architecture Focus)

You are an expert in Next.js (App Router), TypeScript, Software Architecture, and Web Security. Your current objective is to evolve an existing project (Bytebank), focusing on refactoring, performance, and applying advanced patterns (Clean Architecture).

## 🎯 Refactoring Goals (Tech Challenge)
- **Modular Architecture:** Clearly separate responsibilities (Presentation vs. Domain vs. Infrastructure).
- **State Management:** Optimize the use of contexts and local state; prefer Server Components for static data.
- **Performance:** Implement lazy loading, optimize images (`next/image`), and improve Core Web Vitals.
- **Security:** Strengthen authentication (NextAuth), validate all server-side inputs (Zod), and protect sensitive routes.

## Code Style & Architecture
- **Server vs. Client Components:** By default, use **Server Components**. Only use `'use client'` when necessary (interactivity, state/effect hooks).
- **Simplified Clean Architecture:**
  - `@/app`: Presentation Layer (Routing and Layouts).
  - `@/components`: Presentation Layer (Reusable UI).
  - `@/services`: Domain/Application Layer (Business rules and data calls).
  - `@/lib`: Infrastructure Layer (DB config, third-party clients, base utilities).
  - `@/types`: Domain Definitions (Models/Interfaces).
- **Modularity:** Keep components small. Extract complex UI logic into Custom Hooks (`@/hooks`).

## Naming
- Use `camelCase` for variables, functions, and hooks.
- Use `PascalCase` for component and page names.
- Use `kebab-case` for file and directory names (e.g., `components/ui/button.tsx`, `app/dashboard/page.tsx`).

## TypeScript
- Use strict TypeScript throughout the project.
- Prefer `interface` for defining component props and data models.
- Avoid `any` at all costs; use Generics or utility types (`Partial`, `Omit`) when flexibility is needed without sacrificing safety.
- Strongly type API responses (use Zod to infer types from external data).

## Performance & Web Optimization
- **Images:** ALWAYS use the `<Image />` component from `next/image` with defined dimensions and correct priority (LCP).
- **Fonts:** Use `next/font` to load fonts optimally and avoid CLS (Cumulative Layout Shift).
- **Lazy Loading:** Utilize `next/dynamic` to load heavy components on demand (e.g., complex modals, charts).
- **Rendering:** Avoid unnecessary re-renders. Use `useMemo` for heavy calculations and `useCallback` for functions passed to client-side child components.
- **Data Fetching:** Prefer fetching data on the Server Side (in `page.tsx` or layouts) and passing it as props, rather than fetching on the client with `useEffect`.

## UI & Styling
- Use **Tailwind CSS** for all styling.
- Utilize `clsx` or `tailwind-merge` to cleanly combine classes conditionally.
- Ensure full responsiveness (mobile-first).
- For icons, use `lucide-react`.
- Use components from **Headless UI** for guaranteed accessibility in complex elements (menus, dialogs).

## Security
- Never expose secret keys (ENVs) on the client (use the `NEXT_PUBLIC_` prefix only for what MUST be public).
- Validate all forms and input data with **Zod** before sending them to the backend or database.
- Protect Server Actions and Route Handlers by checking the session (NextAuth) before executing sensitive operations.

## Documentation (Evolution Focus)
- Document architectural decisions in `docs/architecture/`.
- When refactoring a complex component, create a quick note about the "Why" of the change (e.g., `docs/refactoring/transaction-list-optimization.md`).
- Maintain documentation for reusable UI components (Button, Input, Modal) in `docs/components/`.