"use client";
// Import React and necessary hooks
import React, { useState, useEffect } from "react";
import Image from "next/image";

// LogoComponent.tsx
const AnimatedText: React.FC = () => {
  // State to manage the current logo
  const [currentLogo, setCurrentLogo] = useState("Youtube"); // 'youtube', 'spotify', 'discord' // Use useEffect to cycle through logos

  useEffect(() => {
    const logos = ["Youtube", "Discord", "X.com", "Telegram"];
    let currentLogoIndex = 0;

    const intervalId = setInterval(() => {
      currentLogoIndex = (currentLogoIndex + 1) % logos.length;
      setCurrentLogo(logos[currentLogoIndex]);
    }, 1000); // Change logo every 1 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="transition-all duration-500 ease-in-out text-xl md:text-3xl">
      {currentLogo === "Youtube" && (
        <div className={`flex justify-center items-center gap-3`}>
          <h2 className="font-bold">Youtube</h2>
          <Image
            src="/youtube.png"
            width={200}
            height={200}
            alt="YouTube"
            className="w-20 h-20" // Reduce icon size by setting a fixed width/height
            style={{ maxWidth: 45, maxHeight: 45 }}
          />
        </div>
      )}
      {currentLogo === "Discord" && (
        <div className="flex justify-center items-center gap-2">
          <h2 className="font-bold">Discord</h2>
          <Image
            src="/discord.png"
            width={100}
            height={100}
            alt="Discord"
            className="w-20 h-20"
            style={{ maxWidth: 55, maxHeight: 55 }}
          />
        </div>
      )}
      {currentLogo === "X.com" && (
        <div className="flex justify-center items-center gap-2">
          <h2 className="font-bold">X</h2>
          <Image
            src="/x.png"
            width={50}
            height={50}
            alt="X"
            className="w-20 h-20"
            style={{ maxWidth: 40, maxHeight: 40 }}
          />
        </div>
      )}

      {currentLogo === "Telegram" && (
        <div className="flex justify-center items-center gap-3">
          <h2 className="font-bold">Telegram</h2>
          <Image
            src="/telegram.png"
            width={100}
            height={100}
            alt="Telegram"
            className="w-20 h-20"
            style={{ maxWidth: 40, maxHeight: 40 }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedText;
