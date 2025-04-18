import { Button } from "@/components/ui";
import { HeaderProps } from "@/types/layout";

export default ({ onOpenAccount, onLogin }: Pick<HeaderProps, 'onOpenAccount' | 'onLogin'>) => (
  <div className="flex gap-6">
    <Button variant="green" onClick={onOpenAccount}>Abrir conta</Button>
    <Button variant="outlineGreen" onClick={onLogin}>Já tenho conta</Button>
  </div>
);
