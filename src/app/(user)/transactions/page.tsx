'use client';

import { TransactionForm } from "@/components/form";
import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { Transaction } from "@/types/transaction";
import { useState } from "react";

const sampleData: Transaction[] = [
  { date: '18/11/2025', alias: 'Salário', type: 'deposit', value: 2500 },
  { date: '21/11/2025', alias: 'Pix João', type: 'transfer', value: -100 },
  { date: '25/11/2025', alias: 'Aluguel', type: 'payment', value: -1200 },
  { date: '30/11/2025', alias: 'Reembolso Ana', type: 'deposit', value: 300 },
  { date: '02/12/2025', alias: 'Mercado', type: 'payment', value: -200 },
  { date: '05/12/2025', alias: 'Pix Maria', type: 'transfer', value: -150 },
  { date: '10/12/2025', alias: 'Academia', type: 'payment', value: -100 },
  { date: '15/12/2025', alias: 'Reembolso Lucas', type: 'deposit', value: 400 },
  { date: '20/12/2025', alias: 'Farmácia', type: 'payment', value: -80 },
  { date: '22/12/2025', alias: 'Pix Carla', type: 'transfer', value: -200 },
  { date: '28/12/2025', alias: 'Cinema', type: 'payment', value: -50 },
  { date: '30/12/2025', alias: 'Saque ATM', type: 'withdrawal', value: -300 },
  { date: '02/01/2026', alias: 'Freelance', type: 'deposit', value: 1200 },
  { date: '06/01/2026', alias: 'Pix João', type: 'transfer', value: -300 },
]

export default () => {
  // User state for open/close modal
  const [isOpen, setIsOpen] = useState(false);

  // User state for selecting transaction
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  // Define the create function
  const handleCreate = () => {
    // Log
    console.log('Create new transaction');

    // Reset selected transaction
    setSelectedTransaction(undefined);

    // Open the modal
    setIsOpen(true);
  }

  // Define the edit function
  const handleEdit = (idx: number) => {
    // Log
    console.log('Edit transaction at index:', idx);

    // Set selected transaction
    setSelectedTransaction(sampleData[idx]);

    // Open the modal
    setIsOpen(true);
  }

  // Define the delete function
  const handleDelete = (idx: number) => {
    // Log
    console.log('Delete transaction at index:', idx);
  }

  // OnSubmit function
  const handleSubmit = (data: Transaction) => {
    // Log
    console.log('Submit transaction:', data);

    // Close the modal
    setIsOpen(false);

    // Check if editing
    if (selectedTransaction) {
      // Update the transaction
      sampleData[sampleData.indexOf(selectedTransaction)] = data;
    } else {
      // Add new transaction
      sampleData.push(data);
    }
  }

  return (
    <>
      <section>
        <div className="card flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Histórico</h1>
            <Button onClick={() => handleCreate()}>
              Nova Transação
            </Button>
          </div>

          <TransactionTable
            transactions={sampleData}
            pageSize={10}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </section>

      <TransactionForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={selectedTransaction}
      />
    </>
  );
};
