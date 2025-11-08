You are an expert in TypeScript, Next.js, React, Tailwind CSS, and Web Development. Follow these guidelines to ensure code quality, consistency, and maintainability across the project.

## Code Style

- Write **concise, type-safe TypeScript code**
- Use **functional components and hooks** (avoid class components)
- Keep components **modular, reusable, and maintainable**
- **Group related files by feature** (components, hooks, styles, etc.)

---

## Naming Conventions

- **Variables and functions:** `camelCase`
- **Component names:** `PascalCase`
- **Directories:** `lowercase-hyphenated`

---

## TypeScript

- Use **TypeScript everywhere** (no JavaScript files)
- **Prefer interfaces** for component props and object types
- **Enable strict typing** in `tsconfig.json`
- **Avoid `any`**; use precise types instead
- Use `unknown` for type-safe flexibility when necessary

---

## Performance

### Server vs Client Components

- Be mindful of the boundary between **Server Components** (default) and **Client Components** (`"use client"`)
- Keep **Client Components small** and push heavy logic to Server Components or API routes

### React Hooks Optimization

- Use `useMemo` **ONLY** for memoizing expensive calculations and static props
- Use `useCallback` **ONLY** for functions passed as props to memoized child components
- **Limit unnecessary `useEffect`/`useState` hooks** and avoid heavy logic in the render body
- **Avoid using `useEffect` in the render body**

### Next.js Optimization

- Utilize **dynamic imports** (`React.lazy`) for code splitting
- Use the **`next/image` component** for automatic image optimization

---

## UI & Styling

### Tailwind CSS

- Use **Tailwind CSS exclusively** for all component styling
- **Do not use Tailwind classes directly inside TSX components**
- Define component styles as a `const` object at the end of the file with `as const`

```typescript
const styles = {
  container: `flex flex-col items-center`,
  image: `h-auto object-contain`,
} as const;
```

### Component Libraries

- **Headless UI:** Use for accessible, unstyled component primitives
- **lucide-react:** Use for all iconography

### Responsive Design

- Ensure your UI is **fully responsive** by leveraging Tailwind's responsive variants and utilities

### Images

- Always use Next.js's **`<Image />` component** (from `next/image`) for displaying images

---

## Documentation

### Storybook

- All **reusable, common components** (buttons, inputs, modals, etc.) must be documented in **Storybook**

### Documentation Structure

All internal, textual documentation must be stored in the `docs` directory:

- **Component documentation:** `docs/components`
- **Guidelines:** `docs/guidelines`
- **Shared feature usage:** `docs/usages`

### Documentation Rules

- Write all documentation, Storybook stories, and code comments in **English**
- **Do not document** pages or single-use components
- For "usages," only document shared features: APIs, custom hooks, utility services
- **Do not include large code examples** in `.md` documentation files; link to Storybook or relevant source files instead
- Use **clear and descriptive file names**
- **Whenever you update a documented component or usage**, also update its Storybook story and documentation in the `docs` directory

---

## Best Practices

### Comments

- All comments must be in **English**

### Libraries & Tools

- **Next.js App Router:** Use for all routing and deep linking
- **NextAuth:** Use for all authentication logic
- **React Hook Form:** Use for form state management
- **Zod:** Use for schema validation (with React Hook Form)
- **Vercel:** Use for deployment

### Directory Structure

```
@/app          # App Router pages and API routes
@/components   # Reusable UI components
@/contexts     # React Context providers
@/hooks        # Custom React hooks
@/models       # Database models (e.g., Mongoose schemas)
@/services     # Business logic, API clients, database interactions
@/utils        # Helper functions
```

### Verification

- **After each step**, verify the relevant guideline and ensure all rules are followed
