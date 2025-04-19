import { CreditCardSession } from "@/components/cards";
import { getServerSession } from "next-auth";

export default async () => {
  // Get session data
  const session = await getServerSession();

  // Render the component
  return (
    <CreditCardSession
      digital={{
        number: "1234 5678 9012 3456",
        name: session?.user?.name || "Usuário",
        expiration: "12/25",
        cvv: "123",
      }}
      physical={{
        number: "1234 5678 9012 3456",
        name: session?.user?.name || "Usuário",
        expiration: "12/25",
        cvv: "123",
      }}
    />
  );
};
