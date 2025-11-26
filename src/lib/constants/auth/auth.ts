/**
 * Authentication utility constants
 *
 * Centralized constants for authentication-related messages and error handling.
 * This facilitates maintenance and ensures consistency across the application.
 *
 * @module lib/constants/auth
 */

/**
 * Authentication response messages
 */
export const AUTH_MESSAGES = {
  /** Success message when login is completed successfully */
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  /** Error message when credentials are invalid */
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  /** Error message when authentication fails due to network issues */
  NETWORK_ERROR: 'Erro de rede. Por favor, verifique sua conexão e tente novamente',
  /** Error message when authentication fails due to server error */
  SERVER_ERROR: 'Erro do servidor. Por favor, tente novamente mais tarde',
  /** Default error message for authentication failures */
  DEFAULT_ERROR: 'Erro de autenticação. Por favor, tente novamente',
} as const;

/**
 * NextAuth error codes mapping
 * Maps NextAuth error codes to user-friendly messages
 */
export const NEXTAUTH_ERROR_MESSAGES: Record<string, string> = {
  /** Credentials signin error */
  CredentialsSignin: AUTH_MESSAGES.INVALID_CREDENTIALS,
  /** Configuration error */
  Configuration: AUTH_MESSAGES.SERVER_ERROR,
  /** Access denied error */
  AccessDenied: AUTH_MESSAGES.INVALID_CREDENTIALS,
  /** Default error */
  default: AUTH_MESSAGES.DEFAULT_ERROR,
} as const;

