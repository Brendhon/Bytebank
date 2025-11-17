/**
 * Text constants for TransactionTable component
 * 
 * Prepared for future internationalization (i18n).
 * All user-facing text is centralized here for easy translation.
 */
export const TRANSACTION_TABLE_LABELS = {
  date: 'Data',
  alias: 'Alias',
  description: 'Descrição',
  value: 'Valor',
  actions: 'Ações',
  ariaLabels: {
    editTransaction: (alias: string) => `Editar transação ${alias}`,
    deleteTransaction: (alias: string) => `Deletar transação ${alias}`,
  },
} as const;

