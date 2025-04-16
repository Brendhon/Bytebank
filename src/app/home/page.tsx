'use client';

import { LoginForm, RegisterForm } from "@/components/form";
import { BenefitsSection, Footer, Header } from "@/components/layout";
import { useState } from "react";

export default () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header
        variant="guest"
        onOpenAccount={() => setIsRegisterOpen(true)}
        onLogin={() => setIsLoginOpen(true)}
      />

      {/* Content */}
      <main>
        <BenefitsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modais */}
      <RegisterForm isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};
