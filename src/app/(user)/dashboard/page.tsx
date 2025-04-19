'use client';

import { WelcomeCard } from "@/components/cards";
import { MovementsSection } from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default () => {
  // Get session data
  const session = useSession();

  // Use router to navigate
  const router = useRouter();

  return (
    <section className="flex flex-col gap-4">
      <WelcomeCard
        name={session?.data?.user?.name || "Usuário"}
        balance={30000.45}
        showBalance={true}
        date={new Date()}
      />
      <MovementsSection
        data={[
          { label: "Pagamentos", value: 24000.45, variant: "dark" },
          { label: "Depósitos", value: 24000.45, variant: "blue" },
          { label: "Transferências", value: 24000.45, variant: "orange" },
          { label: "Saque", variant: "green" },
        ]}
      />
    </section>
  );
};
