"use client";

import { Button } from "@/components/ui";
import { ICreditCard } from "@/types/ui";
import { ReactNode, useState } from "react";
import CreditCard from "../CreditCard/CreditCard";

interface Props {
  physical: ICreditCard;
  digital: ICreditCard;
}

// Session Title component
const SessionTitle = ({ text }: { text: string }) => (
  <span className="text-14">{text}</span>
);

// Card Session component
const CardSession = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-4 mb-4 sm:gap-16 sm:flex-row">
    {children}
  </div>
);

export default ({ digital, physical }: Props) => {
  // States
  const [showDigitalInfo, setShowDigitalInfo] = useState(false);
  const [showPhysicalInfo, setShowPhysicalInfo] = useState(false);
  const [physicalBlocked, setPhysicalBlocked] = useState(false);
  const [digitalBlocked, setDigitalBlocked] = useState(false);

  // Actions
  const actions = (type: 'physical' | 'digital') => {
    // Check if is block 
    const isBlocked = type === "physical" ? physicalBlocked : digitalBlocked;

    // Check if is show info
    const isShowInfo = type === "physical" ? showPhysicalInfo : showDigitalInfo;

    // Render actions
    return (
      <div className="flex flex-col gap-2">
        <Button
          variant={!isShowInfo ? "blue" : "orange"}
          onClick={() => type === "physical" ? setShowPhysicalInfo(!showPhysicalInfo) : setShowDigitalInfo(!showDigitalInfo)}
        >
          {!isShowInfo ? "Exibir" : "Ocultar"}
        </Button>
        <Button
          variant={!isBlocked ? "outlineOrange" : "outlineGreen"}
          onClick={() => type === "physical" ? setPhysicalBlocked(!physicalBlocked) : setDigitalBlocked(!digitalBlocked)}
        >
          {!isBlocked ? "Bloquear" : "Desbloquear"}
        </Button>

      </div>
    )
  }

  // Render
  return (
    <section className="card flex flex-col gap-2">

      {/* Title */}
      <h2 className="text-20-bold text-dark mb-2">Meus cartões</h2>

      {/* Physical Card */}
      <SessionTitle text="Cartão físico" />

      {/* Card */}
      <CardSession>
        <CreditCard
          variant="physical"
          showInfo={showPhysicalInfo}
          blocked={physicalBlocked}
          {...physical}
        />
        {actions("physical")}
      </CardSession>

      {/* Digital Card */}
      <SessionTitle text="Cartão digital" />

      {/* Card */}
      <CardSession>
        <CreditCard
          variant="digital"
          showInfo={showDigitalInfo}
          blocked={digitalBlocked}
          {...digital}
        />
        {actions("digital")}
      </CardSession>
    </section>
  );
};
