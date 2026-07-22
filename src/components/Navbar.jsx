import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoHardwareChip, IoShieldCheckmark, IoGrid, IoRadio, IoFlame, IoFlash } from "react-icons/io5";

import Button from "./Button";
import { sounds } from "../utils/audio";

const viewItems = [
  { id: "overview", label: "Overview", icon: <IoGrid className="text-xs" /> },
  { id: "vault", label: "Vault App", icon: <TiLocationArrow className="text-xs" /> },
  { id: "azul", label: "Azul AI", icon: <IoHardwareChip className="text-xs text-yellow-400" /> },
  { id: "passport", label: "Passport", icon: <IoShieldCheckmark className="text-xs text-green-400" /> },
];

const NavBar = ({ activeView = "overview", onSelectView, onOpenVault, onOpenContact, onOpenMobile }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Live Stats State
  const [activePlayers, setActivePlayers] = useState(482910);
  const [questsCompleted, setQuestsCompleted] = useState(1284920);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setQuestsCompleted((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    sounds.playClick();
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play().catch(() => {});
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -120,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isNavVisible]);

  const handleTabClick = (viewId) => {
    sounds.playClick();
    if (onSelectView) {
      onSelectView(viewId);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500 max-w-7xl mx-auto px-2 sm:px-6 pt-2"
    >
      <header className="relative w-full rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_top,rgba(85,66,255,0.35),rgba(10,10,20,0.92))] backdrop-blur-xl shadow-2xl shadow-black/70 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-transparent" />

        {/* Top Ticker Telemetry Strip */}
        <div className="w-full border-b border-white/10 bg-black/40 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono select-none">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
            </span>
            <IoRadio className="text-xs" />
            <span className="tracking-wider">METAGAME CLUSTER 2026</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <IoFlame className="text-orange-400 text-xs" />
              <span className="hidden sm:inline">ONLINE PLAYERS:</span>
              <strong className="text-white">{activePlayers.toLocaleString()}</strong>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <IoFlash className="text-yellow-400 text-xs" />
              <span>DAILY QUESTS:</span>
              <strong className="text-white">{questsCompleted.toLocaleString()}</strong>
            </div>

            <div className="hidden lg:block text-gray-400">
              PLAY ECONOMY: <span className="text-green-400 font-bold">+18.4% APY</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Controls Row */}
        <nav className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => handleTabClick("overview")}
              className="inline-flex items-center gap-2.5 group text-left cursor-pointer"
              onMouseEnter={() => sounds.playHover()}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center ring-1 ring-white/20 bg-black/60 rounded-full shadow-inner group-hover:ring-yellow-400 transition-all">
                <img src="/img/logo.png" alt="logo" className="w-4 h-4 object-contain" />
              </span>
              <span className="text-lg font-black tracking-tight font-zentry text-white uppercase group-hover:text-yellow-400 transition">
                ZENTRY
              </span>
            </button>

            <Button
              id="product-button"
              title="Vault Catalog"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-yellow-400 text-black font-bold hidden lg:flex items-center justify-center gap-1.5 cursor-pointer hover:bg-yellow-300 transition-all shadow-md shadow-yellow-400/20 text-xs px-3 py-1"
              onClick={() => {
                sounds.playClick();
                onOpenVault(0);
              }}
            />
          </div>

          {/* Screen View Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center p-1 bg-black/50 border border-white/10 rounded-full">
              {viewItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    onMouseEnter={() => sounds.playHover()}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      isActive
                        ? "bg-yellow-400 text-black shadow-md shadow-yellow-400/20"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Passport / Sign In button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenContact();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black border border-white/20 px-3 py-1 text-xs font-mono font-bold text-white transition shadow-sm cursor-pointer"
            >
              <FaUserCircle className="text-xs" />
              <span>PASSPORT</span>
            </button>

            {/* Audio Toggle Indicator */}
            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5 p-1.5 rounded-full hover:bg-white/10 border border-white/10 transition cursor-pointer"
              title="Toggle Audio Track"
              aria-label="Toggle ambient soundtrack"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenMobile();
              }}
              aria-label="Open mobile navigation"
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-black text-white transition border border-white/15 active:scale-95 cursor-pointer"
            >
              <HiMenuAlt3 className="text-xl" />
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;


