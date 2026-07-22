import { useState } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import LiveStatsTicker from "./components/LiveStatsTicker";
import VaultModal from "./components/VaultModal";
import TrailerModal from "./components/TrailerModal";
import ContactModal from "./components/ContactModal";
import MobileNav from "./components/MobileNav";
import AzulAITerminal from "./components/AzulAITerminal";
import PassportHub from "./components/PassportHub";

function App() {
  const [activeView, setActiveView] = useState("overview");

  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [vaultIndex, setVaultIndex] = useState(0);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleOpenVault = (index = 0) => {
    setVaultIndex(index);
    setIsVaultOpen(true);
  };

  const handleSelectView = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#dfdff0]">
      <NavBar
        activeView={activeView}
        onSelectView={handleSelectView}
        onOpenVault={(idx) => handleOpenVault(idx)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenMobile={() => setIsMobileOpen(true)}
      />

      {/* Screen Views */}
      {activeView === "overview" && (
        <>
          <Hero onOpenTrailer={() => setIsTrailerOpen(true)} />
          <About />
          <Features onOpenVault={handleOpenVault} />
          <Story onOpenContact={() => setIsContactOpen(true)} />
          <Contact onOpenContact={() => setIsContactOpen(true)} />
        </>
      )}

      {activeView === "vault" && (
        <div className="pt-36 pb-12 px-4 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
          <div className="mb-6 font-mono text-xs text-yellow-500 uppercase tracking-widest bg-black/60 px-4 py-1.5 rounded-full border border-yellow-400/30">
            VAULT PROTOCOL SYSTEM 2026
          </div>
          <h1 className="font-zentry text-4xl sm:text-6xl font-black text-neutral-900 uppercase tracking-tight mb-4">
            ZENTRY <span className="text-blue-600">VAULT</span> CATALOG
          </h1>
          <p className="font-circular-web text-neutral-600 text-sm sm:text-base max-w-xl mb-8">
            Access live products, digital assets, and transmedia ecosystem applications directly.
          </p>
          <button
            onClick={() => handleOpenVault(0)}
            className="min-h-[48px] px-8 py-3.5 rounded-full bg-yellow-400 text-black font-general font-bold uppercase text-xs hover:bg-yellow-300 transition active:scale-95 cursor-pointer shadow-xl shadow-yellow-400/30"
          >
            OPEN INTERACTIVE VAULT MODAL
          </button>
        </div>
      )}

      {activeView === "azul" && (
        <AzulAITerminal onOpenVault={handleOpenVault} />
      )}

      {activeView === "passport" && (
        <PassportHub
          onOpenContact={() => setIsContactOpen(true)}
          onOpenVault={handleOpenVault}
        />
      )}

      <Footer
        onOpenVault={() => handleOpenVault(0)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Interactive Modals */}
      <VaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        defaultSelected={vaultIndex}
      />
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onSelectView={handleSelectView}
        onOpenVault={() => handleOpenVault(0)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </main>
  );
}

export default App;

