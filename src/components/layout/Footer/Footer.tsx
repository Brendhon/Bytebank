import { Logo } from "@/components/ui";
import { ReactNode } from "react";

// Define the FooterContent component
const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  );
};

// Define the Footer component
export default () => {
  return (
    <footer>
      <Content>
        <strong className="text-base">Contato</strong>
        <span>0800 004 250 08</span>
        <span>meajuda@bytebank.com.br</span>
      </Content>

      <Content>
        <Logo />
      </Content>
    </footer>
  );
};
