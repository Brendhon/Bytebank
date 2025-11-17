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

