import { useState, useEffect } from "react";
import { IoClose, IoShieldCheckmark, IoSparkles } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import { sounds } from "../utils/audio";

const CLASSES = [
  { id: "cyber-ninja", name: "Cyber Ninja", icon: "⚔️", boost: "+25% Agility in Play Economy" },
  { id: "metagamer", name: "Metagamer", icon: "🎮", boost: "+30% Multi-game Loot Multiplier" },
  { id: "ai-handler", name: "AI Handler", icon: "🤖", boost: "Azul Co-pilot Integration" },
];

const ContactModal = ({ isOpen, onClose }) => {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClass, setSelectedClass] = useState("metagamer");
  const [passGenerated, setPassGenerated] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handle.trim() || !email.trim()) return;
    sounds.playSuccess();
    setPassGenerated(true);
  };

  const handleReset = () => {
    sounds.playClick();
    setPassGenerated(false);
    setHandle("");
    setEmail("");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 transition-all duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl border border-white/20 bg-neutral-950 p-4 sm:p-6 text-blue-50 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Close passport modal"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-yellow-400 hover:text-black active:scale-95 cursor-pointer"
        >
          <IoClose className="text-2xl" />
        </button>

        {!passGenerated ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-yellow-400 font-mono text-xs uppercase tracking-widest">
              <IoSparkles /> ALPHA ACCESS REGISTRATION 2026
            </div>
            <h2 className="font-zentry text-2xl sm:text-3xl font-black text-white uppercase tracking-wide mb-2 pr-8">
              CLAIM YOUR ZENTRY PASSPORT
            </h2>
            <p className="font-circular-web text-xs sm:text-sm text-gray-400 mb-6">
              Mint your personalized Metagame Identity badge to access early 2026 play tests and exclusive rewards.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase text-gray-400 mb-1">
                  Player Handle / Gamer ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CyberKnight99"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="player@metagame.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-gray-400 mb-2">
                  Select Gaming Class Archetype
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CLASSES.map((cls) => (
                    <button
                      type="button"
                      key={cls.id}
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedClass(cls.id);
                      }}
                      className={`p-3 min-h-[56px] rounded-xl border text-center transition-all cursor-pointer ${
                        selectedClass === cls.id
                          ? "bg-yellow-400 text-black border-yellow-400 font-bold shadow-md shadow-yellow-400/20"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xl mb-0.5">{cls.icon}</div>
                      <div className="font-zentry text-xs uppercase">{cls.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-general font-bold uppercase text-black transition-all hover:bg-yellow-300 active:scale-95 shadow-lg shadow-yellow-400/20 cursor-pointer"
              >
                MINT ALPHA PASSPORT <TiLocationArrow className="text-lg" />
              </button>
            </form>
          </div>
        ) : (
          /* Render Minted Interactive Passport Pass */
          <div className="text-center py-2">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400 mb-4 animate-bounce">
              <IoShieldCheckmark className="text-3xl" />
            </div>

            <h3 className="font-zentry text-2xl font-black uppercase text-white tracking-wide mb-1">
              PASSPORT MINTED SUCCESSFULLY!
            </h3>
            <p className="font-mono text-xs text-yellow-400 mb-6">
              STATUS: CLEARANCE LEVEL 1 // ALPHA 2026
            </p>

            {/* Passport Badge Graphic */}
            <div className="relative mx-auto w-full max-w-sm rounded-2xl border-2 border-yellow-400/60 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-5 text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="font-zentry font-black text-yellow-400 text-lg uppercase">
                  ZENTRY METAGAME PASS
                </div>
                <div className="font-mono text-[10px] bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded border border-yellow-400/40">
                  VERIFIED
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-gray-400">PLAYER HANDLE:</span>
                  <span className="font-mono font-bold text-white text-xs">{handle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-gray-400">CLASS:</span>
                  <span className="font-mono font-bold text-yellow-300 text-xs uppercase">
                    {CLASSES.find((c) => c.id === selectedClass)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-gray-400">CLASS BONUS:</span>
                  <span className="font-mono text-[11px] text-green-400">
                    {CLASSES.find((c) => c.id === selectedClass)?.boost}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-3 text-center border border-white/10 font-mono text-[10px] text-gray-400">
                HASH: ZN-2026-{(Math.random() * 1000000).toFixed(0)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <button
                onClick={handleReset}
                className="min-h-[44px] rounded-full bg-white/10 px-5 py-2.5 text-xs font-general font-bold uppercase text-white hover:bg-white/20 active:scale-95 cursor-pointer"
              >
                MINT ANOTHER
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="min-h-[44px] rounded-full bg-yellow-400 px-6 py-2.5 text-xs font-general font-bold uppercase text-black hover:bg-yellow-300 active:scale-95 cursor-pointer shadow-md shadow-yellow-400/20"
              >
                ENTER METAGAME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;

