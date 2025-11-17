import { useMemo, useCallback } from 'react';
import { formatCurrency } from '@/lib/formatter/formatter';
import { cn } from '@/lib/utils/utils';
import { ITransaction, TransactionDesc, TransactionDescKey } from '@/types/transaction';
import { ReactNode } from 'react';
import { Button } from '@/components/ui';
import { Pencil, Trash } from 'lucide-react';

/**
 * Styles for transaction table renderers
 */
const styles = {
  actionsContainer: 'flex gap-2',
  actionButton: 'w-6 h-6 rounded-full',
  valueInflow: 'font-semibold text-green',
  valueOutflow: 'font-semibold text-red',
} as const;

/**
 * Renders transaction type description from enum key
 * 
 * @param key - Transaction description key
 * @returns Formatted transaction description string
 */
export function renderTransactionType(key: TransactionDescKey): string {
  return TransactionDesc[key];
}

/**
 * Renders transaction value with color coding based on transaction type
 * 
 * @param transaction - Transaction object containing value and type
 * @returns JSX element with formatted currency value and color styling
 */
export function renderTransactionValue(transaction: ITransaction): ReactNode {
  const { value, type } = transaction;
  const isOutflow = type === 'outflow';
  
  return (
    <span className={cn(styles.valueInflow, isOutflow && styles.valueOutflow)}>
      {isOutflow ? '- ' : ''}
      {formatCurrency(Math.abs(value))}
    </span>
  );
}

/**
 * Parameters for useTransactionRenderers hook
 */
export interface UseTransactionRenderersParams {
  onEdit?: (data: ITransaction) => void;
  onDelete?: (data: ITransaction) => void;
}

/**
 * Custom hook that provides transaction rendering functions
 * 
 * Memoizes render functions to prevent unnecessary re-renders
 * 
 * @param params - Configuration object with optional edit and delete callbacks
 * @returns Object containing memoized render functions
 * 
 * @example
 * ```tsx
 * const { renderType, renderValue, renderActions } = useTransactionRenderers({
 *   onEdit: (transaction) => console.log('Edit', transaction),
 *   onDelete: (transaction) => console.log('Delete', transaction),
 * });
 * 
 * // Use in table column definition
 * const columns = [
 *   {
 *     label: 'Type',
 *     accessor: 'desc',
 *     render: (value) => renderType(value),
 *   },
 * ];
 * ```
 */
export function useTransactionRenderers({
  onEdit,
  onDelete,
}: UseTransactionRenderersParams = {}) {
  const renderType = useCallback((key: TransactionDescKey): string => {
    return renderTransactionType(key);
  }, []);

  const renderValue = useCallback((data: ITransaction): ReactNode => {
    return renderTransactionValue(data);
  }, []);

  const renderActions = useCallback((data: ITransaction): ReactNode | null => {
    if (!onEdit && !onDelete) {
      return null;
    }

    const alias = data.alias || data._id || 'unnamed';

    return (
      <div className={styles.actionsContainer}>
        {onEdit && (
          <Button
            aria-label={`Edit transaction ${alias}`}
            className={styles.actionButton}
            onClick={() => onEdit(data)}
          >
            <Pencil size={12} />
          </Button>
        )}
        {onDelete && (
          <Button
            aria-label={`Delete transaction ${alias}`}
            className={styles.actionButton}
            onClick={() => onDelete(data)}
          >
            <Trash size={12} />
          </Button>
        )}
      </div>
    );
  }, [onEdit, onDelete]);

  return useMemo(
    () => ({
      renderType,
      renderValue,
      renderActions,
    }),
    [renderType, renderValue, renderActions]
  );
}

