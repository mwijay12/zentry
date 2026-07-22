import { useRef, useState, useEffect } from "react";
import { IoClose, IoVolumeHigh, IoVolumeMute, IoPlay, IoPause } from "react-icons/io5";
import { sounds } from "../utils/audio";

const TrailerModal = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (videoRef.current) videoRef.current.pause();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePlay = () => {
    sounds.playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  return (
    <div
      onClick={() => {
        if (videoRef.current) videoRef.current.pause();
        onClose();
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-8 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
      >
        {/* Header */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/60 to-transparent p-3 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
            <h2 className="font-zentry text-sm sm:text-xl font-black tracking-widest text-white uppercase truncate max-w-[200px] sm:max-w-none">
              ZENTRY 2026 OFFICIAL METAGAME TRAILER
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              if (videoRef.current) videoRef.current.pause();
              onClose();
            }}
            aria-label="Close trailer video modal"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-yellow-400 hover:text-black active:scale-95 cursor-pointer"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Video Canvas */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src="/videos/hero-1.mp4"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Controls Bar Overlay */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3 sm:p-6 flex flex-col gap-3">
            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-yellow-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:scale-110 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <IoPause className="text-xl" /> : <IoPlay className="text-xl ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  {isMuted ? <IoVolumeMute className="text-xl text-red-400" /> : <IoVolumeHigh className="text-xl" />}
                </button>
              </div>

              <div className="font-mono text-[10px] sm:text-xs text-yellow-300 bg-black/60 px-3 py-1 rounded-full border border-yellow-400/30">
                4K HDR // 60 FPS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;

