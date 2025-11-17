'use client';

import { WelcomeCard } from "@/components/cards";
import { MovementsSection } from "@/components/layout";
import { getTransactionSummary } from "@/services/transaction/transaction.service";
import { TransactionSummary } from "@/types/transaction";
import { CardProps } from "@/types/ui";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  // Get session data
  const session = useSession();

  // If session is not available, return
  const userId = session?.data?.user?.id || "";

  // State for the balance
  const [balance, setBalance] = useState(0);

  // State for the movements
  const [movements, setMovements] = useState<CardProps[]>([
    { key: 'payment', label: "Pagamentos", variant: "dark" },
    { key: 'deposit', label: "Depósitos", variant: "blue" },
    { key: 'transfer', label: "Transferências", variant: "orange" },
    { key: 'withdrawal', label: "Saque", variant: "green" },
  ]);

  // Use effect to fetch the balance and movements data
  useEffect(() => {
    if (userId) getTransactionSummary(userId)
      .then(handleSummaryData)
      .catch(console.error);
  }, [userId]);

  // Handle summary data
  const handleSummaryData = (data: TransactionSummary) => {
    setMovements((prev) => prev.map((m) => ({ ...m, value: data.breakdown[m.key] }))); // Set the movements data   
    setBalance(data.balance); // Set the balance
  }

  return (
    <section className="flex flex-col gap-4">
      <WelcomeCard
        name={session?.data?.user?.name || "Usuário"}
        balance={balance}
        date={new Date()}
      />
      <MovementsSection data={movements} />
    </section>
  );
};
