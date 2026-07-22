import { useState, useEffect } from "react";
import { IoRadio, IoFlame, IoFlash } from "react-icons/io5";

const LiveStatsTicker = () => {
  const [activePlayers, setActivePlayers] = useState(482910);
  const [questsCompleted, setQuestsCompleted] = useState(1284920);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setQuestsCompleted((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-950 border-y border-white/10 py-2.5 px-4 text-white overflow-hidden select-none">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-yellow-400 font-bold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
          </span>
          <IoRadio className="text-sm" />
          <span>METAGAME CLUSTER 2026</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-gray-300">
          <div className="flex items-center gap-1.5">
            <IoFlame className="text-orange-400" />
            <span>ONLINE PLAYERS:</span>
            <strong className="text-white">{activePlayers.toLocaleString()}</strong>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <IoFlash className="text-yellow-400" />
            <span>DAILY QUESTS:</span>
            <strong className="text-white">{questsCompleted.toLocaleString()}</strong>
          </div>

          <div className="hidden md:block text-gray-400">
            PLAY ECONOMY: <span className="text-green-400 font-bold">+18.4% APY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatsTicker;
