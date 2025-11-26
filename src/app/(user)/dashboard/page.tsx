import { WelcomeCard } from "@/components/cards";
import { MovementsSection } from "@/components/layout";
import { auth } from "@/lib/auth/auth";
import { getTransactionSummaryServer } from "@/services/transaction/transaction.service.server";
import { CardProps } from "@/types/ui";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

/**
 * Dashboard page component for authenticated users.
 * 
 * Displays user's financial information including:
 * - Welcome card with user name and balance
 * - Movements section with transaction breakdown (payments, deposits, transfers, withdrawals)
 * 
 * This is a Server Component that fetches data server-side,
 * following Next.js App Router best practices. Data is fetched
 * directly from the database using server-side services (not HTTP requests),
 * which is the recommended approach for Server Components.
 * 
 * @returns {Promise<ReactElement>} Dashboard page content
 * @throws {Error} May redirect to login if session is invalid
 */
export default async function DashboardPage(): Promise<ReactElement> {
  // Get session data server-side
  const session = await auth();

  // Validate session and redirect if not authenticated
  if (!session?.user?.id) redirect('/login');

  // Initialize movements structure
  const movements: CardProps[] = [
    { key: 'payment', label: "Pagamentos", variant: "dark" },
    { key: 'deposit', label: "Depósitos", variant: "blue" },
    { key: 'transfer', label: "Transferências", variant: "orange" },
    { key: 'withdrawal', label: "Saque", variant: "green" },
  ];

  // Fetch transaction summary server-side using direct service call
  // This avoids HTTP requests and works seamlessly in Server Components
  let balance = 0;
  let movementsWithValues = movements;

  try {
    const summary = await getTransactionSummaryServer(session.user.id);
    balance = summary.balance;
    movementsWithValues = movements.map((m) => ({ ...m, value: summary.breakdown[m.key] }));
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching transaction summary:', error);
  }

  // Get fist name from user name
  const fistName = session.user.name?.split(' ')[0] || "Usuário";

  return (
    <section className={styles.container}>
      <WelcomeCard
        name={fistName}
        balance={balance}
        date={new Date()}
      />
      <MovementsSection data={movementsWithValues} />
    </section>
  );
}

/**
 * Styles for DashboardPage component
 * 
 * All Tailwind classes are centralized here for better maintainability
 * and separation of concerns.
 */
const styles = {
  container: 'flex flex-col gap-4',
} as const;
