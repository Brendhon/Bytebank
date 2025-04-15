'use client';

import { RegisterForm } from "@/components/form";
import { Footer, Header } from "@/components/layout";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header
        variant="guest"
        onOpenAccount={() => setIsOpen(true)}
        onLogin={() => alert("Já tenho conta")}
      />

      <div className="content">
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        <main>


          <RegisterForm isOpen={isOpen} onClose={() => setIsOpen(false)} />


        </main>

      </div>


      <Footer />
    </>
  );
}
