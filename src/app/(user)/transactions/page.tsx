'use client';

import { TransactionForm } from "@/components/form";
import { Modal } from "@/components/layout";
import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { sortByDate } from "@/lib/utils";
import { ITransaction } from "@/types/transaction";
import { useState } from "react";

const sampleData: ITransaction[] = [
  { id: "1", date: '18/11/2025', alias: 'Salário', desc: 'deposit', value: 2500, type: "inflow" },
  { id: "2", date: '21/11/2025', alias: 'Pix João', desc: 'transfer', value: 100, type: "inflow" },
  { id: "3", date: '25/11/2025', alias: 'Aluguel', desc: 'payment', value: 1200, type: "outflow" },
  { id: "4", date: '30/11/2025', alias: 'Reembolso Ana', desc: 'deposit', value: 300, type: "inflow" },
  { id: "5", date: '02/12/2025', alias: 'Mercado', desc: 'payment', value: 200, type: "outflow" },
  { id: "6", date: '05/12/2025', alias: 'Pix Maria', desc: 'transfer', value: 150, type: "outflow" },
  { id: "7", date: '10/12/2025', alias: 'Academia', desc: 'payment', value: 100, type: "outflow" },
  { id: "8", date: '15/12/2025', alias: 'Reembolso Lucas', desc: 'deposit', value: 400, type: "inflow" },
  { id: "9", date: '20/12/2025', alias: 'Farmácia', desc: 'payment', value: 80, type: "outflow" },
  { id: "10", date: '22/12/2025', alias: 'Pix Carla', desc: 'transfer', value: 200, type: "inflow" },
  { id: "11", date: '28/12/2025', alias: 'Cinema', desc: 'payment', value: 50, type: "inflow" },
  { id: "12", date: '30/12/2025', alias: 'Saque ATM', desc: 'withdrawal', value: 300, type: "outflow" },
  { id: "13", date: '02/01/2026', alias: 'Freelance', desc: 'deposit', value: 1200, type: "inflow" },
  { id: "14", date: '06/01/2026', alias: 'Pix João', desc: 'transfer', value: 300, type: "outflow" },
];

export default () => {
  // User state for open/close modal
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // User state for selecting transaction
  const [selected, setSelected] = useState<ITransaction>();

  // Use state for transactions
  const [transactions, setTransactions] = useState<ITransaction[]>(sortByDate<ITransaction>(sampleData, "date"));

  // Create a function to update transactions
  const updateTransactions = (data: ITransaction[]) => setTransactions(sortByDate<ITransaction>(data, "date"));

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
  const handleSubmit = (data: ITransaction) => {
    // Log
    console.log('Submit transaction:', data);

    // Close the modal
    setIsOpen(false);

    // Check if editing
    if (selected) {
      // Update the transaction
      const updatedTransactions = transactions
        .map((value) => value.id == selected.id ? { ...value, ...data } : value);

      // Set the updated transactions
      updateTransactions(updatedTransactions);
    } else {
      // Add the new transaction
      const newTransaction = { id: (transactions.length + 1).toString(), ...data };

      // Set the new transaction
      updateTransactions([...transactions, newTransaction]);
    }
  }

  // Handle delete
  const handleDelete = () => {
    // Log
    console.log('Delete transaction:', selected);

    // Close the modal
    setIsDeleteOpen(false);

    // Remove the transaction
    const updatedTransactions = transactions.filter((value) => value.id != selected?.id);

    // Set the updated transactions
    updateTransactions(updatedTransactions);
  }

  return (
    <>
      <section>
        <div className="card flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Histórico</h1>
            <Button onClick={() => openCreate()}>
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

      <TransactionForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={selected}
      />

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
