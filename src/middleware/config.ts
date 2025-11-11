/**
 * Middleware configuration
 * Defines which routes should be processed by the middleware
 */
export const middlewareConfig = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // Exclude /_next and files with extension
  ],
};

