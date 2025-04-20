import { cn } from "@/lib/utils";
import { ICreditCard } from "@/types/ui";

export interface CreditCardProps extends ICreditCard   {
  variant: "physical" | "digital";
  showInfo: boolean;
  blocked: boolean;
};

export default ({
  variant,
  showInfo,
  name,
  blocked,
  number,
  expiration,
  cvv,
}: CreditCardProps) => {
  // Check variant
  const isPhysical = variant === "physical";

  // Get first and last name
  const splittedName = name.split(" ");

  // form card name
  const cardName = splittedName.length > 1
    ? `${splittedName[0]} ${splittedName[splittedName.length - 1]}`
    : splittedName[0];

  return (
    <div
      className={cn(
        "rounded-md text-white p-4 w-[270px] h-[150px] flex flex-col justify-between",
        isPhysical ? "bg-blue" : "bg-gray"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="italic text-24 font-semibold">Byte</div>
          <div className="text-sm">Platinum</div>
        </div>
        {blocked && <span className="text-white text-14-semi bg-dark rounded-md p-2">Bloqueado</span>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-center text-14">
          <div>{cardName}</div>
          <span>{showInfo ? expiration : '••••'}</span>
        </div>


        <div className="flex justify-between text-center text-14">
          <span>{showInfo ? number : '•••• •••• •••• ••••'}</span>
          <span>{showInfo ? cvv : '•••'}</span>
        </div>
      </div>

    </div>
  );
};
