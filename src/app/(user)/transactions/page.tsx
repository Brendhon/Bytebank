'use client';

import { TransactionForm } from "@/components/form";
import { Modal } from "@/components/layout";
import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { sortByDate } from "@/lib/utils/utils";
import { createTransaction, deleteTransaction, getUserTransactions, updateTransaction } from "@/services/transaction.service";
import { ITransaction } from "@/types/transaction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  // Get session data
  const session = useSession();

  // If session is not available, return
  const userId = session?.data?.user?.id || "";

  // User state for open/close modal
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // User state for selecting transaction
  const [selected, setSelected] = useState<ITransaction>();

  // Use state for transactions
  const [transactions, setTransactions] = useState<ITransaction[]>(sortByDate<ITransaction>([], "date"));

  // Create a function to update transactions
  const updateTransactions = (data: ITransaction[]) => setTransactions(sortByDate<ITransaction>(data, "date"));

  // Use effect to fetch transactions data
  useEffect(() => {
    if (userId) getUserTransactions(userId)
      .then(updateTransactions)
      .catch(console.error);
  }, [userId]);

  // Define the create function
  const openCreate = () => {
    setSelected(undefined);
    setIsOpen(true);
  }

  // Define the edit function
  const openEdit = (data: ITransaction) => {
    setSelected(data);
    setIsOpen(true);
  }

  // Define the delete function
  const openDelete = (data: ITransaction) => {
    setSelected(data);
    setIsDeleteOpen(true);
  }

  // OnSubmit function
  const handleSubmit = async (data: ITransaction) => {
    // Close the modal
    setIsOpen(false);

    // Add userId to data
    data.user = userId;

    // Check if editing
    return selected ? handleEdit(data) : handleCreate(data);
  }

  // Handle creation 
  const handleCreate = async (data: ITransaction) => {
    // Create a new transaction
    const newTransaction = await createTransaction(data)

    // Set the new transaction - Local
    updateTransactions([...transactions, newTransaction]);
  }

  // Handle edit
  const handleEdit = async (data: ITransaction) => {
    // Update the transaction
    await updateTransaction(selected!._id!, data);

    // Update the transaction - Local
    const updatedTransactions = transactions
      .map((value) => value._id == selected?._id ? { ...value, ...data } : value);

    // Set the updated transactions
    updateTransactions(updatedTransactions);
  }

  // Handle delete
  const handleDelete = async () => {
    // Close the modal
    setIsDeleteOpen(false);

    // Delete the transaction
    await deleteTransaction(selected!._id!)

    // Remove the transaction - Local
    const updatedTransactions = transactions.filter((value) => value._id != selected?._id);

    // Set the updated transactions
    updateTransactions(updatedTransactions);
  }

  return (
    <>
      <section>
        <div className="card flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Histórico</h1>
            <Button disabled={!userId} onClick={() => openCreate()}>
              Nova Transação
            </Button>
          </div>

          <TransactionTable
            transactions={transactions}
            pageSize={10}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        </div>
      </section>

      {/* Modal for creating/editing transactions */}
      {
        isOpen &&
        <TransactionForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          defaultValues={selected}
        />
      }

      {/* Modal for deleting transactions */}
      <Modal
        isOpen={isDeleteOpen}
        title="Você está prestes a excluir esta transação"
        onClose={() => setIsDeleteOpen(false)}
        onSubmit={handleDelete}
        btnVariantSubmit="outlineOrange"
      >
        <p className="text-dark max-w-[450px] text-center md:text-left">
          Esta ação removerá permanentemente a transação do seu histórico. Tem certeza de que deseja continuar?
        </p>
      </Modal>
    </>
  );
};
