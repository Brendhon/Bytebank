import { CreditCardSession } from "@/components/cards";
import { auth } from "@/lib/auth/auth";

export default async () => {
  // Get session data
  const session = await auth();

  // Render the component
  return (
    <CreditCardSession
      digital={{
        name: session?.user?.name || "Usuário",
        number: "1234 5678 9012 3456",
        expiration: "12/25",
        cvv: "123",
      }}
      physical={{
        name: session?.user?.name || "Usuário",
        number: "5532 6475 8570 4251",
        expiration: "03/25",
        cvv: "514",
      }}
    />
  );
};
