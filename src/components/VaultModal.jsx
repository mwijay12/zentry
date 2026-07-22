import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import { sounds } from "../utils/audio";

const PRODUCTS = [
  {
    id: "radiant",
    name: "Radiant",
    tagline: "The Unified Metagame App",
    category: "Cross-Platform Hub",
    rarity: "LEGENDARY",
    stats: { Users: "450K+", Interoperability: "99.8%", Rewards: "Web2 + Web3" },
    description:
      "A cross-platform metagame application that turns your lifetime gaming accomplishments into a tangible, unified play economy. Bridge your accomplishments seamlessly across platforms.",
    src: "/videos/feature-1.mp4",
    status: "LIVE ALPHA 2026",
  },
  {
    id: "zigma",
    name: "Zigma",
    tagline: "Anime & Gaming-Inspired IP",
    category: "Digital IP & Avatars",
    rarity: "EPIC",
    stats: { IPExpansion: "Multi-Chain", TraitCount: "250+", RarityRank: "S-Tier" },
    description:
      "An flagship anime-inspired universe primed for global transmedia expansion, featuring custom dynamic avatars, lore artifacts, and game-ready assets.",
    src: "/videos/feature-2.mp4",
    status: "GENESIS DROP",
  },
  {
    id: "nexus",
    name: "Nexus",
    tagline: "Gamified Social Arena",
    category: "Community Layer",
    rarity: "MYTHIC",
    stats: { ActiveGuilds: "1,200+", DailyBattles: "50K", SocialXP: "Active" },
    description:
      "A gamified social hub that brings a competitive third dimension to Web3 gaming guilds and creator communities with real-time tournaments and leaderboard challenges.",
    src: "/videos/feature-3.mp4",
    status: "SEASON 3",
  },
  {
    id: "azul",
    name: "Azul",
    tagline: "Cross-World Autonomous AI Agent",
    category: "AI Gameplay Intelligence",
    rarity: "EXOTIC",
    stats: { DecisionLatency: "<12ms", ContextMemory: "Infinite", SkillTier: "Grandmaster" },
    description:
      "Your autonomous AI gaming companion. Azul analyzes real-time tactical telemetry, optimizes player strategies, and manages inventory across connected gaming titles.",
    src: "/videos/feature-4.mp4",
    status: "V2.6 BETA",
  },
];

const VaultModal = ({ isOpen, onClose, defaultSelected = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultSelected);

  useEffect(() => {
    setActiveTab(defaultSelected);
  }, [defaultSelected, isOpen]);

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

  const currentProduct = PRODUCTS[activeTab] || PRODUCTS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 transition-all duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 text-blue-50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3.5 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse" />
            <h2 className="font-zentry text-xl sm:text-2xl font-black tracking-wider uppercase text-yellow-300">
              ZENTRY VAULT // PRODUCTS 2026
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close vault modal"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-yellow-400 hover:text-black active:scale-95 cursor-pointer"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Modal Content Body - Scrollable */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto custom-scrollbar">
          {/* Navigation Sidebar */}
          <div className="col-span-1 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-3 sm:p-4 space-y-2 bg-neutral-900/50">
            <p className="font-general text-[10px] uppercase text-gray-400 px-3 tracking-widest">
              Select Product Protocol
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {PRODUCTS.map((prod, index) => (
                <button
                  key={prod.id}
                  onMouseEnter={() => sounds.playHover()}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(index);
                  }}
                  className={`w-full text-left p-3 min-h-[52px] rounded-xl transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                    activeTab === index
                      ? "bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-zentry text-base sm:text-lg uppercase tracking-wide truncate">
                      {prod.name}
                    </div>
                    <div className={`text-[11px] truncate ${activeTab === index ? "text-neutral-900 font-semibold" : "text-gray-400"}`}>
                      {prod.category}
                    </div>
                  </div>
                  <span className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border ${
                    activeTab === index ? "border-black/30 bg-black/10 text-black" : "border-white/20 bg-white/5 text-yellow-300"
                  }`}>
                    {prod.rarity}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Detail Area */}
          <div className="col-span-1 lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="rounded-full bg-yellow-400/20 border border-yellow-400/50 px-3 py-1 font-mono text-xs font-semibold text-yellow-300">
                  {currentProduct.status}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  PROTOCOL ID: {currentProduct.id.toUpperCase()}-2026
                </span>
              </div>

              <h3 className="font-zentry text-3xl sm:text-4xl font-black uppercase text-white tracking-wide mb-1">
                {currentProduct.name}
              </h3>
              <p className="text-yellow-400 font-semibold text-sm mb-4">
                {currentProduct.tagline}
              </p>

              {/* Video Preview Frame */}
              <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-xl border border-white/15 bg-black mb-6">
                <video
                  key={currentProduct.src}
                  src={currentProduct.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              </div>

              <p className="font-circular-web text-gray-300 text-sm leading-relaxed mb-6">
                {currentProduct.description}
              </p>

              {/* Specs / Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-4">
                {Object.entries(currentProduct.stats).map(([k, v]) => (
                  <div key={k} className="bg-white/5 p-3 rounded-lg border border-white/10 text-center">
                    <div className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{k}</div>
                    <div className="font-mono font-bold text-yellow-400 text-sm mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => {
                  sounds.playSuccess();
                  alert(`Access Pass requested for ${currentProduct.name}! Alpha clearance granted.`);
                }}
                className="flex min-h-[44px] items-center gap-2 rounded-full bg-yellow-400 px-6 py-2.5 font-general text-xs uppercase font-bold text-black transition-all hover:bg-yellow-300 hover:scale-105 active:scale-95 shadow-md shadow-yellow-400/20 cursor-pointer"
              >
                Launch Protocol <TiLocationArrow className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultModal;

