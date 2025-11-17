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

