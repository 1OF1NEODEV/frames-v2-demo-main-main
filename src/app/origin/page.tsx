"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import styles from '~/styles/Demo.module.css';

const customStyles = {
  pressStart: {
    fontFamily: '"Press Start 2P", cursive',
  },
};

export default function OriginPage() {
  return (
    <main className={`flex flex-col items-center justify-center min-h-screen ${styles.container}`}>
      <div className="max-w-[324px] mx-auto">
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Content */}
            <div className="text-center mb-6">
              <h1 className="text-[#FFD700] mb-4" style={{ ...customStyles.pressStart, fontSize: '24px' }}>
                ORIGIN
              </h1>
              <p className="text-black mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                Don Da Degen Dog is a pixel art character created by the talented artist known as "1OF1NEO". 
                The character represents the spirit of decentralized finance (DeFi) and the Base blockchain community.
              </p>
              <p className="text-black" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                With his distinctive style and playful demeanor, Don has become a beloved figure in the Base ecosystem, 
                embodying both the fun and serious aspects of blockchain technology.
              </p>
            </div>

            {/* Menu Bar */}
            <div className="bg-black border-t-2 border-black p-2 -mx-4 -mb-4 rounded-b-xl">
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm text-white" style={{ ...customStyles.pressStart }}>
                      🏠
                    </div>
                  </Link>
                  <div className="text-white font-bold">:</div>
                  <Link href="/swap" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Image
                        src="/icons8-data-transfer-32.png"
                        alt="Swap"
                        width={16}
                        height={16}
                        className="w-4 h-4 brightness-0 invert"
                        unoptimized
                      />
                    </div>
                  </Link>
                  <div className="text-white font-bold">:</div>
                  <Link href="/origin" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm text-white" style={{ ...customStyles.pressStart }}>
                      ↑
                    </div>
                  </Link>
                  <div className="text-white font-bold">:</div>
                  <Link href="/gallery" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm text-white" style={{ ...customStyles.pressStart }}>
                      🏆
                    </div>
                  </Link>
                  <div className="text-white font-bold">:</div>
                  <Link href="/tokenomics" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm text-white" style={{ ...customStyles.pressStart }}>
                      🛍️
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
} 