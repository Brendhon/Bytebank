'use client';

import { TransactionForm } from "@/components/form";
import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { Transaction } from "@/types/transaction";
import { useState } from "react";

const sampleData: Transaction[] = [
  { id: "1", date: '18/11/2025', alias: 'Salário', type: 'deposit', value: 2500 },
  { id: "2", date: '21/11/2025', alias: 'Pix João', type: 'transfer', value: -100 },
  { id: "3", date: '25/11/2025', alias: 'Aluguel', type: 'payment', value: -1200 },
  { id: "4", date: '30/11/2025', alias: 'Reembolso Ana', type: 'deposit', value: 300 },
  { id: "5", date: '02/12/2025', alias: 'Mercado', type: 'payment', value: -200 },
  { id: "6", date: '05/12/2025', alias: 'Pix Maria', type: 'transfer', value: -150 },
  { id: "7", date: '10/12/2025', alias: 'Academia', type: 'payment', value: -100 },
  { id: "8", date: '15/12/2025', alias: 'Reembolso Lucas', type: 'deposit', value: 400 },
  { id: "9", date: '20/12/2025', alias: 'Farmácia', type: 'payment', value: -80 },
  { id: "10", date: '22/12/2025', alias: 'Pix Carla', type: 'transfer', value: -200 },
  { id: "11", date: '28/12/2025', alias: 'Cinema', type: 'payment', value: -50 },
  { id: "12", date: '30/12/2025', alias: 'Saque ATM', type: 'withdrawal', value: -300 },
  { id: "13", date: '02/01/2026', alias: 'Freelance', type: 'deposit', value: 1200 },
  { id: "14", date: '06/01/2026', alias: 'Pix João', type: 'transfer', value: -300 },
];

export default () => {
  // User state for open/close modal
  const [isOpen, setIsOpen] = useState(false);

  // User state for selecting transaction
  const [selected, setSelected] = useState<Transaction>();

  // Use state for transactions
  const [transactions, setTransactions] = useState<Transaction[]>(sampleData);

  // Define the create function
  const openCreate = () => {
    setSelected(undefined);
    setIsOpen(true);
  }

  // Define the edit function
  const openEdit = (data: Transaction) => {
    setSelected(data);
    setIsOpen(true);
  }

  // Define the delete function
  const openDelete = (data: Transaction) => {
    console.log('Delete transaction at index:', data);
  }

  // OnSubmit function
  const handleSubmit = (data: Transaction) => {
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
      setTransactions(updatedTransactions);
    } else {
      // Add the new transaction
      const newTransaction = { id: (transactions.length + 1).toString(), ...data };

      // Set the new transaction
      setTransactions([...transactions, newTransaction]);
    }
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
    </>
  );
};
