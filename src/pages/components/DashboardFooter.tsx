import { useEffect, useState } from "react";
import { FaGlobeAfrica, FaHeart, FaBolt } from "react-icons/fa";

const phrases = [
  "Empowering Tanzanian Institutions 🇹🇿",
  "Crafted with clarity, built for scale 💡",
  "SuperAdmin dashboard polished to perfection ✨",
  "National excellence, one schema at a time 🛠️",
];

const DashboardFooter: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white py-6 px-4 rounded-t-lg shadow-inner animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="text-sm md:text-base font-medium flex items-center gap-2 animate-pulse">
          <FaGlobeAfrica className="text-white" />
          {phrases[index]}
        </div>
        <div className="text-xs opacity-80 flex items-center gap-1">
          <FaHeart className="text-red-200" />
          Built by Hussein with ❤️ & clarity
        </div>
        <div className="text-xs opacity-70 flex items-center gap-1">
          <FaBolt className="text-yellow-300" />
          Powered by Django, React, and Tanzanian pride
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;