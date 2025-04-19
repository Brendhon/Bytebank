'use client';

import { TransactionTable } from "@/components/table";
import { Button } from "@/components/ui";
import { Transaction } from "@/types/transaction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const sampleData: Transaction[] = [
  { date: '18/11/2025', alias: 'Salário', type: 'Depósito', value: 2500 },
  { date: '21/11/2025', alias: 'Pix João', type: 'Transferência', value: -100 },
  { date: '25/11/2025', alias: 'Aluguel', type: 'Pagamento', value: -1200 },
  { date: '30/11/2025', alias: 'Reembolso Ana', type: 'Depósito', value: 300 },
  { date: '02/12/2025', alias: 'Mercado', type: 'Pagamento', value: -200 },
  { date: '05/12/2025', alias: 'Pix Maria', type: 'Transferência', value: -150 },
  { date: '10/12/2025', alias: 'Academia', type: 'Pagamento', value: -100 },
  { date: '15/12/2025', alias: 'Reembolso Lucas', type: 'Depósito', value: 400 },
  { date: '20/12/2025', alias: 'Farmácia', type: 'Pagamento', value: -80 },
  { date: '22/12/2025', alias: 'Pix Carla', type: 'Transferência', value: -200 },
  { date: '28/12/2025', alias: 'Cinema', type: 'Pagamento', value: -50 },
  { date: '30/12/2025', alias: 'Saque ATM', type: 'Saque', value: -300 },
  { date: '02/01/2026', alias: 'Freelance', type: 'Depósito', value: 1200 },
  { date: '06/01/2026', alias: 'Pix João', type: 'Transferência', value: -300 },
]

export default () => {
  // Get session data
  const session = useSession();

  // Use router to navigate
  const router = useRouter();

  // Define the create function
  const handleCreate = () => {
    // Log
    console.log('Create new transaction');
  }

  // Define the edit function
  const handleEdit = (idx: number) => {
    // Log
    console.log('Edit transaction at index:', idx);
  }

  // Define the delete function
  const handleDelete = (idx: number) => {
    // Log
    console.log('Delete transaction at index:', idx);
  }

  return (
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
  );
};
