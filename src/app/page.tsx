'use client';

import { Footer, Header, Modal } from "@/components/layout";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header variant="guest"/>

      <div className="content">
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        <main>
          <button onClick={() => setIsOpen(true)} className="btn">
            Abrir Modal
          </button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={() => console.log("Submit")}
            btnVariantSubmit='blue'
            title="Nova Transação">
              Pokemon
          </Modal>


        </main>

      </div>


      <Footer />
    </>
  );
}
