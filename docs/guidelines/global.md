You are an expert in TypeScript, Next.js, React, Tailwind CSS, and Web Development. You must follow the following guidelines.

## Code Style
- Write concise, type-safe TypeScript code.
- Use functional components and hooks.
- Keep components modular, reusable, and maintainable.
- Group related files by feature (components, hooks, styles, etc.).

## Naming
- Use camelCase for variables/functions.
- Use PascalCase for component names.
- Use lowercase-hyphenated for directories.

## TypeScript
- Use TypeScript everywhere.
- Prefer interfaces for props.
- Enable strict typing in `tsconfig.json`.
- Avoid `any`; use precise types. Use `unknown` for type-safe flexibility when necessary.

## Performance
- Be mindful of the boundary between Server Components (default) and Client Components (`"use client"`).
- Keep Client Components small and push heavy logic to Server Components or API routes.
- Use `useMemo` ONLY for memoizing expensive calculations and static props.
- Use `useCallback` ONLY for functions passed as props to memoized child components.
- Utilize Next.js features like dynamic imports (`React.lazy`) for code splitting.
- Use the `next/image` component for automatic image optimization.
- Limit unnecessary `useEffect`/`useState` hooks and avoid heavy logic in the render body. Avoid using `useEffect` in the render body.

## UI & Styling
- Use **Tailwind CSS** for all component styles.
- For accessible, unstyled primitives, use **Headless UI**.
- Always ensure your UI is responsive and adapts to different screen sizes using Tailwind's variants.
- For images, always use the `Image` component from `next/image`.
- For icons, always use the **`lucide-react`** library.
- For animations, prefer CSS transitions or a dedicated library like **Framer Motion**.

## Documentation
- All reusable, common components (buttons, inputs, modals, etc.) must be documented in **Storybook**.
- All internal, textual documentation must be stored in the `docs` directory.
- Write all documentation, Storybook stories, and code comments in English.
- Do not document pages or single-use components.
- For "usages," only document shared features like APIs, custom hooks, and utility services.
- Do not include large code examples in `.md` documentation files; link to Storybook or relevant source files instead.
- Place all component usage documentation in `docs/components`.
- Place all guidelines (like this file) in `docs/guidelines`.
- Place all shared feature usage documentation in `docs/usages`.
- Whenever you update a documented component or usage, also update its Storybook story and documentation in the `docs` directory.
- Use clear and descriptive file names, e.g., `docs/components/button-usage.md` or `docs/usages/auth-service.md`.

## Best Practices
- All comments must be in English.
- Use the **Next.js App Router** for all routing and deep linking.
- Use **NextAuth** for all authentication logic.
- For forms, use **React Hook Form** for state management and **Zod** for schema validation.
- Use **Vercel** for deployment.
- Adhere to the following directory structure:
    - `@/app` (App Router pages and API routes)
    - `@/components` (Reusable UI components)
    - `@/contexts` (React Context providers)
    - `@/hooks` (Custom React hooks)
    - `@/models` (Database models, e.g., Mongoose schemas)
    - `@/services` (Business logic, API clients, database interactions)
    - `@/utils` (Helper functions)
- After each step, verify the relevant guideline and ensure all rules are followed.