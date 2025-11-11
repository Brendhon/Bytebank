/**
 * Next.js Middleware Entry Point
 * 
 * This file must remain at src/middleware.ts due to Next.js conventions.
 * All logic has been modularized in the src/middleware/ directory.
 * 
 * @see src/middleware/index.ts - Main middleware logic
 * @see src/middleware/guards.ts - Route guards and checks
 * @see src/middleware/handlers.ts - Request handlers
 * @see src/middleware/config.ts - Middleware configuration
 */

export { middlewareHandler as middleware } from './middleware/index';
export { middlewareConfig as config } from './middleware/config';

