'use client';

import { LoginForm, RegisterForm } from "@/components/form";
import { Footer, Header } from "@/components/layout";
import { useState } from "react";

export default function Home() {
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
      <div className="content">
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        <main>
        </main>

      </div>


      {/* Footer */}
      <Footer />

      {/* Modais */}
      <RegisterForm isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
