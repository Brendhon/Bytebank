'use client';

import { TransactionForm } from "@/components/form";
import { Modal } from "@/components/layout";
import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { ITransaction } from "@/types/transaction";
import { useState, useCallback, useTransition, ReactElement } from "react";
import { 
  createTransactionAction, 
  updateTransactionAction, 
  deleteTransactionAction 
} from "../actions";
import { useToast } from "@/hooks";

/**
 * Props for TransactionsClient component
 */
interface TransactionsClientProps {
  /**
   * Initial list of transactions fetched from server
   */
  initialTransactions: ITransaction[];
  /**
   * User ID for transaction operations
   */
  userId: string;
}

/**
 * Client component for managing transaction interactions.
 * 
 * Handles all UI state and user interactions for the transactions page,
 * including modals, forms, and table interactions. Delegates data mutations
 * to Server Actions for optimal performance and security.
 * 
 * This component is designed to be rendered by a Server Component parent
 * that provides the initial data fetched server-side.
 * 
 * @component
 * @param {TransactionsClientProps} props - Component props
 * @returns {ReactElement} Transactions client UI
 */
export const TransactionsClient = ({ 
  initialTransactions, 
  userId 
}: TransactionsClientProps): ReactElement => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  // UI state for modals
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // UI state for selected transaction
  const [selected, setSelected] = useState<ITransaction | undefined>();

  /**
   * Opens the create transaction modal
   */
  const openCreate = useCallback(() => {
    setSelected(undefined);
    setIsOpen(true);
  }, []);

  /**
   * Opens the edit transaction modal
   * @param {ITransaction} data - Transaction to edit
   */
  const openEdit = useCallback((data: ITransaction) => {
    setSelected(data);
    setIsOpen(true);
  }, []);

  /**
   * Opens the delete confirmation modal
   * @param {ITransaction} data - Transaction to delete
   */
  const openDelete = useCallback((data: ITransaction) => {
    setSelected(data);
    setIsDeleteOpen(true);
  }, []);

  /**
   * Handles transaction form submission (create or update)
   * @param {ITransaction} data - Transaction data from form
   */
  const handleSubmit = useCallback(async (data: ITransaction) => {
    setIsOpen(false);

    startTransition(async () => {
      try {
        if (selected?._id) {
          // Update existing transaction
          await updateTransactionAction(selected._id, data);
          showSuccessToast({ message: 'Transação atualizada com sucesso' });
        } else {
          // Create new transaction
          await createTransactionAction(data);
          showSuccessToast({ message: 'Transação criada com sucesso' });
        }
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Erro ao salvar transação';
        showErrorToast({ message: errorMessage });
      }
    });
  }, [selected, showSuccessToast, showErrorToast]);

  /**
   * Handles transaction deletion
   */
  const handleDelete = useCallback(async () => {
    if (!selected?._id) {
      showErrorToast({ message: 'Transação não selecionada' });
      return;
    }

    setIsDeleteOpen(false);

    startTransition(async () => {
      try {
        await deleteTransactionAction(selected._id!);
        showSuccessToast({ message: 'Transação deletada com sucesso' });
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Erro ao deletar transação';
        showErrorToast({ message: errorMessage });
      }
    });
  }, [selected, showSuccessToast, showErrorToast]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Histórico</h1>
            <Button 
              disabled={!userId || isPending} 
              onClick={openCreate}
              aria-label="Create new transaction"
            >
              Nova Transação
            </Button>
          </div>

          <TransactionTable
            transactions={initialTransactions}
            pageSize={10}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        </div>
      </section>

      {/* Modal for creating/editing transactions */}
      {isOpen && (
        <TransactionForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          defaultValues={selected}
        />
      )}

      {/* Modal for deleting transactions */}
      <Modal
        isOpen={isDeleteOpen}
        title="Você está prestes a excluir esta transação"
        onClose={() => setIsDeleteOpen(false)}
        onSubmit={handleDelete}
        btnVariantSubmit="outlineOrange"
      >
        <p className={styles.modalText}>
          Esta ação removerá permanentemente a transação do seu histórico. Tem certeza de que deseja continuar?
        </p>
      </Modal>
    </>
  );
};

/**
 * Styles for TransactionsClient component
 * 
 * All Tailwind classes are centralized here for better maintainability
 * and separation of concerns.
 */
const styles = {
  section: '',
  card: 'card flex flex-col gap-6',
  header: 'flex justify-between items-center',
  title: 'text-2xl font-semibold',
  modalText: 'text-dark max-w-[450px] text-center md:text-left',
} as const;

