import { useEffect } from "react";
import { IoClose, IoGrid, IoHardwareChip, IoShieldCheckmark } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import { sounds } from "../utils/audio";

const viewItems = [
  { id: "overview", label: "Overview", icon: <IoGrid className="text-xl text-yellow-400" /> },
  { id: "vault", label: "Vault App", icon: <TiLocationArrow className="text-xl text-yellow-400" /> },
  { id: "azul", label: "Azul AI Terminal", icon: <IoHardwareChip className="text-xl text-yellow-400" /> },
  { id: "passport", label: "Gamer Passport", icon: <IoShieldCheckmark className="text-xl text-green-400" /> },
];

const MobileNav = ({ isOpen, onClose, onSelectView, onOpenVault, onOpenContact }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (viewId) => {
    sounds.playClick();
    onClose();
    if (onSelectView) {
      onSelectView(viewId);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden animate-fadeIn"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col h-full justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="logo" className="w-8 h-8 object-contain" />
            <span className="font-zentry text-xl font-black text-white uppercase tracking-wider">ZENTRY</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close mobile menu"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-yellow-400 hover:text-black active:scale-95 cursor-pointer"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Navigation View Switcher */}
        <div className="flex flex-col gap-3 my-auto py-4">
          <p className="font-mono text-xs text-yellow-400 uppercase tracking-widest text-center mb-2">
            Select Screen View
          </p>
          {viewItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="w-full min-h-[54px] p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400 hover:bg-white/10 transition flex items-center justify-center gap-3 font-zentry text-2xl font-black uppercase text-white hover:text-yellow-400 active:scale-95 cursor-pointer shadow-md"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 pt-4 text-center space-y-3">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              if (onOpenContact) onOpenContact();
            }}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-general font-bold uppercase text-black hover:bg-yellow-300 active:scale-95 cursor-pointer shadow-lg shadow-yellow-400/20"
          >
            MINT PASSPORT <TiLocationArrow className="text-lg" />
          </button>
          <p className="text-[11px] font-mono text-gray-500">© ZENTRY METAGAME 2026</p>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

