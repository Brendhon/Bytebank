import { CreditCardSession } from "@/components/cards";
import { auth } from "@/lib/auth/auth";
import { MOCK_CREDIT_CARDS } from "@/lib/constants/card/card";
import { ReactElement } from "react";

/**
 * Cards page component for authenticated users.
 * 
 * ⚠️ DEMONSTRATION PAGE: This page uses mock data for demonstration purposes.
 * In production, credit card data should be fetched from a secure API endpoint.
 * 
 * This is a Server Component that:
 * - Fetches user session data server-side using auth()
 * - Renders credit card information using mock data from constants
 * - Demonstrates Server Component pattern in Next.js App Router
 * 
 * @returns {Promise<ReactElement>} Cards page content with credit card information
 */
export default async function CardsPage(): Promise<ReactElement> {
  // Get session data
  const session = await auth();

  // Render the component with mock data
  // ⚠️ NOTE: In production, fetch real credit card data from API
  return (
    <CreditCardSession
      digital={{
        name: session?.user?.name || "Usuário",
        number: MOCK_CREDIT_CARDS.digital.number,
        expiration: MOCK_CREDIT_CARDS.digital.expiration,
        cvv: MOCK_CREDIT_CARDS.digital.cvv,
      }}
      physical={{
        name: session?.user?.name || "Usuário",
        number: MOCK_CREDIT_CARDS.physical.number,
        expiration: MOCK_CREDIT_CARDS.physical.expiration,
        cvv: MOCK_CREDIT_CARDS.physical.cvv,
      }}
    />
  );
}
