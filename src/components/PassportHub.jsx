import { useState } from "react";
import { IoShieldCheckmark, IoTrophy, IoFlame, IoCheckmarkCircle, IoLockClosed, IoSparkles, IoStar } from "react-icons/io5";
import { sounds } from "../utils/audio";

const QUESTS = [
  {
    id: 1,
    title: "Bridge Web2 Accomplishment Pass",
    category: "Radiant Protocol",
    xp: 500,
    reward: "+50 ZENTRY",
    completed: true,
  },
  {
    id: 2,
    title: "Deploy Azul AI Co-pilot in Match",
    category: "Azul Intelligence",
    xp: 750,
    reward: "Exotic Badge",
    completed: false,
  },
  {
    id: 3,
    title: "Participate in Nexus Guild Tournament",
    category: "Nexus Arena",
    xp: 1200,
    reward: "S-Tier Loot Chest",
    completed: false,
  },
  {
    id: 4,
    title: "Collect Zigma Genesis Avatar Trait",
    category: "Zigma Universe",
    xp: 900,
    reward: "Rare Relic",
    completed: true,
  },
];

const PassportHub = ({ onOpenContact, onOpenVault }) => {
  const [completedQuests, setCompletedQuests] = useState([1, 4]);

  const toggleQuest = (id) => {
    sounds.playClick();
    if (completedQuests.includes(id)) {
      setCompletedQuests(completedQuests.filter((q) => q !== id));
    } else {
      sounds.playSuccess();
      setCompletedQuests([...completedQuests, id]);
    }
  };

  const totalXP = completedQuests.length * 700 + 1250;

  return (
    <div className="w-full min-h-screen bg-black text-blue-50 pt-32 sm:pt-36 pb-16 px-4 sm:px-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-2">
            <IoShieldCheckmark className="text-lg text-yellow-400" /> METAGAME PASSPORT & QUESTS HUB
          </div>
          <h1 className="font-zentry text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            IDENTITY & <span className="text-yellow-400">PLAY ECONOMY</span>
          </h1>
          <p className="font-circular-web text-gray-400 text-sm sm:text-base max-w-2xl mt-2">
            Track your lifetime gaming accomplishments, claim daily play-to-earn rewards, and level up your Zentry Metagame clearance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              if (onOpenContact) onOpenContact();
            }}
            className="px-6 py-2.5 rounded-full bg-yellow-400 text-black font-general text-xs font-bold uppercase hover:bg-yellow-300 transition active:scale-95 cursor-pointer shadow-lg shadow-yellow-400/20"
          >
            MINT / VIEW PASSPORT
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Passport Status Badge Card */}
        <div className="col-span-1 lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl border-2 border-yellow-400/60 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 text-left shadow-2xl overflow-hidden">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">IDENTITY CARD</span>
                <span className="font-zentry text-xl font-black text-yellow-400 uppercase">CYBER_KNIGHT_2026</span>
              </div>
              <span className="font-mono text-xs bg-yellow-400 text-black font-bold px-3 py-1 rounded-full shadow-sm">
                LEVEL 12
              </span>
            </div>

            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                <span className="text-gray-400">METAGAME XP:</span>
                <span className="font-bold text-yellow-300 flex items-center gap-1">
                  <IoStar className="text-yellow-400" /> {totalXP} XP
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                <span className="text-gray-400">GUILD AFFILIATION:</span>
                <span className="font-bold text-white uppercase">Vanguard Syndicate</span>
              </div>

              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                <span className="text-gray-400">EARNED REWARDS:</span>
                <span className="font-bold text-green-400">1,450 $ZENTRY</span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-gray-400">NEXT TIER (LEVEL 13):</span>
                <span className="text-yellow-400 font-bold">{totalXP} / 3000 XP</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalXP / 3000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Perks & Unlocks Card */}
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-6 space-y-4 shadow-xl">
            <h3 className="font-zentry text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <IoTrophy className="text-yellow-400" /> UNLOCKED PERKS
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <IoCheckmarkCircle className="text-green-400 text-xl shrink-0" />
                <div>
                  <div className="font-zentry text-sm text-white uppercase">Alpha 2026 Access Clearance</div>
                  <div className="text-xs text-gray-400">Guaranteed access to all play tests</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <IoCheckmarkCircle className="text-green-400 text-xl shrink-0" />
                <div>
                  <div className="font-zentry text-sm text-white uppercase">1.25x XP Loot Multiplier</div>
                  <div className="text-xs text-gray-400">Active across Nexus & Radiant titles</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                <IoLockClosed className="text-gray-400 text-xl shrink-0" />
                <div>
                  <div className="font-zentry text-sm text-gray-300 uppercase">Azul AI Custom Voice Pack</div>
                  <div className="text-xs text-gray-500">Unlocks at Passport Level 15</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quests Column */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <div className="font-zentry text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <IoFlame className="text-yellow-400" /> DAILY METAGAME QUESTS
                </div>
                <div className="font-mono text-xs text-gray-400 mt-0.5">
                  RESETS IN: 14H 22M 09S
                </div>
              </div>
              <span className="font-mono text-xs bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-3 py-1 rounded-full">
                {completedQuests.length} / {QUESTS.length} COMPLETED
              </span>
            </div>

            <div className="space-y-3">
              {QUESTS.map((quest) => {
                const isDone = completedQuests.includes(quest.id);
                return (
                  <div
                    key={quest.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDone
                        ? "bg-yellow-400/10 border-yellow-400/40"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded">
                          {quest.category}
                        </span>
                        <span className="font-mono text-xs text-green-400 font-bold">
                          +{quest.xp} XP
                        </span>
                      </div>
                      <div className="font-zentry text-base font-bold text-white uppercase mt-1">
                        {quest.title}
                      </div>
                      <div className="font-mono text-xs text-gray-400">
                        REWARD: {quest.reward}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleQuest(quest.id)}
                      className={`min-h-[44px] px-5 py-2 rounded-xl font-general text-xs uppercase font-bold transition active:scale-95 cursor-pointer shrink-0 ${
                        isDone
                          ? "bg-green-500 text-black hover:bg-green-400"
                          : "bg-yellow-400 text-black hover:bg-yellow-300 shadow-md shadow-yellow-400/20"
                      }`}
                    >
                      {isDone ? "CLAIMED ✓" : "CLAIM REWARD"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportHub;
