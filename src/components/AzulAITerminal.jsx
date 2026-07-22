import { useState } from "react";
import { IoHardwareChip, IoSparkles, IoSend, IoCheckmarkCircle, IoAnalytics, IoFlash } from "react-icons/io5";
import { sounds } from "../utils/audio";

const PRESET_QUERIES = [
  "Optimize loadout for high-tier boss raid in Nexus",
  "Analyze current APM & decision latency telemetry",
  "Generate cross-game reward bridge strategy for Radiant",
  "Calculate XP multiplier path for Season 3 rewards",
];

const AzulAITerminal = ({ onOpenVault }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "azul",
      text: "ONLINE: Azul AI Companion v2.6 Ready. Connected to Metagame Telemetry stream. How can I optimize your tactical gameplay today, Agent?",
      timestamp: "00:01:04",
      meta: { model: "Azul-LLM-v2.6 (Free-Tier API Gateway)", latency: "8ms", accuracy: "99.4%" },
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState("TACTICAL");

  const handleSend = (userText) => {
    const textToSend = userText || query;
    if (!textToSend.trim() || isThinking) return;

    sounds.playClick();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: textToSend,
        timestamp: timeStr,
      },
    ]);

    setQuery("");
    setIsThinking(true);

    setTimeout(() => {
      sounds.playSuccess();
      let replyText = "";
      if (textToSend.toLowerCase().includes("loadout") || textToSend.toLowerCase().includes("boss")) {
        replyText = "ANALYSIS COMPLETE: Recommending Cyber-Blade + Azul Pulse Shield combo. Increases Boss armor penetration by 34% with zero stamina degradation.";
      } else if (textToSend.toLowerCase().includes("telemetry") || textToSend.toLowerCase().includes("apm")) {
        replyText = "TELEMETRY METRICS: Current APM is 184 (Top 5%). Decision latency averaged 11.4ms over the last 12 matches. Optimal focus peak achieved.";
      } else if (textToSend.toLowerCase().includes("radiant") || textToSend.toLowerCase().includes("reward")) {
        replyText = "CROSS-GAME SYNC: Radiant bridge active. 4,200 Web2 achievement points ready for conversion into 350 $ZENTRY tokens with 1.25x multiplier.";
      } else {
        replyText = `TACTICAL OPTIMIZATION [PROTOCOL: ${selectedProtocol}]: Input evaluated against 100,000+ match simulation models. Strategic pathing confirmed with 98.7% success confidence.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "azul",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          meta: { model: "Azul-LLM-v2.6-Turbo", latency: "11ms", accuracy: "99.8%" },
        },
      ]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-black text-blue-50 pt-32 sm:pt-36 pb-16 px-4 sm:px-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Title Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-2">
            <IoHardwareChip className="text-lg animate-spin" /> AZUL TACTICAL AI CONTROL CENTER
          </div>
          <h1 className="font-zentry text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            AUTONOMOUS <span className="text-yellow-400">GAMEPLAY</span> INTELLIGENCE
          </h1>
          <p className="font-circular-web text-gray-400 text-sm sm:text-base max-w-2xl mt-2">
            Powered by high-speed neural telemetry, prompt architecture guardrails, and free-tier LLM API gateways. Azul monitors your gameplay in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              if (onOpenVault) onOpenVault(3);
            }}
            className="px-5 py-2.5 rounded-full bg-yellow-400 text-black font-general text-xs font-bold uppercase hover:bg-yellow-300 transition active:scale-95 cursor-pointer shadow-lg shadow-yellow-400/20"
          >
            VIEW AZUL SPECS
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Telemetry Dashboard Column */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          {/* Live Telemetry Card */}
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <IoAnalytics /> REAL-TIME TELEMETRY
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-mono text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" /> ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-mono text-[10px] text-gray-400 uppercase">Decision Latency</div>
                <div className="font-mono text-lg font-bold text-yellow-400 mt-0.5">&lt;11.4 ms</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-mono text-[10px] text-gray-400 uppercase">Neural APM</div>
                <div className="font-mono text-lg font-bold text-white mt-0.5">210 APM</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-mono text-[10px] text-gray-400 uppercase">Context Memory</div>
                <div className="font-mono text-lg font-bold text-green-400 mt-0.5">INFINITE</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-mono text-[10px] text-gray-400 uppercase">Win Confidence</div>
                <div className="font-mono text-lg font-bold text-yellow-400 mt-0.5">99.4%</div>
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="rounded-2xl border border-white/15 bg-neutral-950 p-5 space-y-3 shadow-xl">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider block mb-2">
              Neural Intelligence Mode
            </span>
            {["TACTICAL", "ECONOMY", "COMBAT_SIM", "LORE"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sounds.playClick();
                  setSelectedProtocol(mode);
                }}
                className={`w-full text-left p-3 rounded-xl font-mono text-xs flex items-center justify-between border transition cursor-pointer ${
                  selectedProtocol === mode
                    ? "bg-yellow-400 text-black border-yellow-400 font-bold shadow-md shadow-yellow-400/20"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                <span>PROTOCOL // {mode}</span>
                {selectedProtocol === mode && <IoCheckmarkCircle className="text-lg text-black" />}
              </button>
            ))}
          </div>
        </div>

        {/* AI Chat Console Column */}
        <div className="col-span-1 lg:col-span-8 flex flex-col h-[580px] rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl overflow-hidden">
          {/* Console Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-neutral-900/80 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-yellow-400">
                <IoSparkles />
              </div>
              <div>
                <div className="font-zentry text-sm font-bold text-white uppercase tracking-wider">
                  AZUL COPILOT TERMINAL
                </div>
                <div className="font-mono text-[10px] text-gray-400">
                  SYSTEM PROMPT: GROUNDED // FREE API PROXY ACTIVE
                </div>
              </div>
            </div>
            <span className="font-mono text-[10px] bg-yellow-400/20 text-yellow-300 px-2.5 py-1 rounded-full border border-yellow-400/30">
              STABLE 2026
            </span>
          </div>

          {/* Message History Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-black/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-gray-400 uppercase">
                    {msg.role === "user" ? "AGENT COMMANDER" : "AZUL AI"}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-xl p-4 rounded-2xl font-circular-web text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-yellow-400 text-black font-semibold rounded-tr-none shadow-md shadow-yellow-400/10"
                      : "bg-white/10 text-gray-100 border border-white/15 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.meta && (
                  <div className="mt-1 font-mono text-[10px] text-gray-400 flex items-center gap-3">
                    <span>{msg.meta.model}</span>
                    <span>LATENCY: {msg.meta.latency}</span>
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs p-3 bg-white/5 rounded-xl border border-white/10 w-fit">
                <IoFlash className="animate-spin text-base" /> Azul is analyzing telemetry models...
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="p-3 bg-neutral-900/60 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
            {PRESET_QUERIES.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleSend(preset)}
                className="shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-yellow-400 hover:text-yellow-400 text-gray-300 transition cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-neutral-900 border-t border-white/10 flex gap-3"
          >
            <input
              type="text"
              placeholder="Ask Azul for loadout optimization, boss tactics, or XP strategies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 font-circular-web"
            />
            <button
              type="submit"
              disabled={isThinking || !query.trim()}
              className="min-h-[44px] px-6 rounded-xl bg-yellow-400 text-black font-general font-bold uppercase text-xs hover:bg-yellow-300 disabled:opacity-50 transition active:scale-95 cursor-pointer flex items-center gap-2 shadow-md shadow-yellow-400/20"
            >
              SEND <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AzulAITerminal;
