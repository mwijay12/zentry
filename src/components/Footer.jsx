import { useState } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaPaperPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { sounds } from "../utils/audio";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Medium" },
];

const footerNavItems = [
  { label: "Nexus", href: "#nexus" },
  { label: "Vault", href: "#vault" },
  { label: "Prologue", href: "#prologue" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Footer = ({ onOpenVault, onOpenContact }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    sounds.playSuccess();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail("");
  };

  const handleNavClick = (e, href) => {
    sounds.playClick();
    if (href === "#vault" && onOpenVault) {
      e.preventDefault();
      onOpenVault();
    } else if (href === "#contact" && onOpenContact) {
      e.preventDefault();
      onOpenContact();
    }
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-neutral-950 text-blue-50 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(50%_50%_at_80%_20%,rgba(85,66,255,0.2),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Top Header Row: Brand & Newsletter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/10">
          <a href="#" className="flex items-center space-x-3 group">
            <span className="inline-flex h-10 w-10 items-center justify-center ring-1 ring-white/20 bg-zinc-900 rounded-full group-hover:ring-yellow-400 transition-all shadow-md">
              <img src="/img/logo.png" alt="logo" className="w-5 h-5 object-contain" />
            </span>
            <div>
              <span className="text-2xl font-black tracking-tight font-zentry text-white uppercase group-hover:text-yellow-400 transition">
                ZENTRY
              </span>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">The Metagame Layer</p>
            </div>
          </a>

          {/* Newsletter Form */}
          <div className="w-full md:w-auto md:min-w-[440px]">
            <form onSubmit={handleSubscribe} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  required
                  placeholder="Subscribe for Metagame & Alpha updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/15 focus:border-yellow-400/70 focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-white/40 font-mono transition"
                />
                <HiOutlineMail className="absolute right-3.5 top-3 text-lg text-white/40" />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 text-sm font-general font-bold uppercase transition active:scale-95 shadow-md shadow-yellow-400/20"
              >
                <FaPaperPlane className="text-xs" />
                {subscribed ? "SUBSCRIBED!" : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Navigation & Social Row */}
        <div className="py-8 grid grid-cols-1 sm:flex sm:items-center sm:justify-between gap-6 border-b border-white/10">
          {/* Social Buttons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                onMouseEnter={() => sounds.playHover()}
                onClick={() => sounds.playClick()}
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black flex items-center justify-center text-white/80 text-lg transition border border-white/10"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-6 text-sm font-mono uppercase font-semibold text-white/70">
            {footerNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => sounds.playHover()}
                className="hover:text-yellow-400 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-white/50 font-mono gap-4">
          <p>© 2026 ZENTRY METAGAME INC. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert("Zentry 2026 Privacy Policy: Zero-knowledge protection standard.");
              }}
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert("Zentry 2026 Terms of Service.");
              }}
              className="hover:text-white transition"
            >
              Terms of Service
            </a>
            <a
              href="#security"
              onClick={(e) => {
                e.preventDefault();
                alert("Zentry 2026 Telemetry & Security Audit Passed.");
              }}
              className="hover:text-white transition"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
