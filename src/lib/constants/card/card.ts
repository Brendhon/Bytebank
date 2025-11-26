/**
 * Credit card configuration constants
 */
export const CARD_CONFIG = {
  brand: {
    name: 'Byte',
    tier: 'Platinum',
  },
  labels: {
    blocked: 'Bloqueado',
    hidden: '••••',
    hiddenNumber: '•••• •••• •••• ••••',
    hiddenCvv: '•••',
  },
  dimensions: {
    width: 270,
    height: 150,
  },
} as const;

/**
 * Text constants for CreditCardSession component
 * 
 * Prepared for future internationalization (i18n).
 * All user-facing text is centralized here for easy translation.
 */
export const CARD_SESSION_TEXT = {
  title: 'Meus Cartões',
  physicalCard: 'Cartão Físico',
  digitalCard: 'Cartão Digital',
  actions: {
    show: 'Exibir',
    hide: 'Ocultar',
    block: 'Bloquear',
    unblock: 'Desbloquear',
  },
  ariaLabels: {
    showInfo: (cardType: string) => `Exibir informações do cartão ${cardType}`,
    hideInfo: (cardType: string) => `Ocultar informações do cartão ${cardType}`,
    blockCard: (cardType: string) => `Bloquear cartão ${cardType}`,
    unblockCard: (cardType: string) => `Desbloquear cartão ${cardType}`,
    cardStatus: (cardType: string, isBlocked: boolean, isVisible: boolean) =>
      `${cardType} card is ${isBlocked ? 'bloqueado' : 'ativo'} e informações são ${isVisible ? 'visíveis' : 'ocultadas'}`,
  },
} as const;

/**
 * Text constants for WelcomeCard component
 * 
 * Prepared for future internationalization (i18n).
 * All user-facing text is centralized here for easy translation.
 */
export const WELCOME_CARD_TEXT = {
  greeting: (name: string) => `Olá, ${name}! :)`,
  balanceLabel: 'Saldo',
  defaultAccountType: 'Conta Corrente',
  hiddenBalance: '••••••',
  ariaLabels: {
    showBalance: 'Exibir saldo da conta',
    hideBalance: 'Ocultar saldo da conta',
    balanceHidden: 'Seu saldo está oculto. Clique no ícone do olho para revelar.',
    balanceSection: 'Informação do saldo da conta',
  },
} as const;

/**
 * Mock credit card data for demonstration purposes
 * 
 * ⚠️ WARNING: MOCK DATA FOR DEMONSTRATION ONLY
 * 
 * This data is used for demonstration and testing purposes only.
 * In production, credit card data should be fetched from a secure API endpoint.
 * 
 * DO NOT commit real credit card data to the repository.
 * 
 * Note: These are test/demonstration values and do not represent real credit card information.
 */
export const MOCK_CREDIT_CARDS = {
  /**
   * Mock data for digital credit card
   */
  digital: {
    number: '1234 5678 9012 3456',
    expiration: '12/25',
    cvv: '123',
  },
  /**
   * Mock data for physical credit card
   */
  physical: {
    number: '5532 6475 8570 4251',
    expiration: '03/25',
    cvv: '514',
  },
} as const;

