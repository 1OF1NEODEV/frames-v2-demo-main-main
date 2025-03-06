"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import styles from '~/styles/Demo.module.css';
import TokenSwap from "~/components/TokenSwap";

const customStyles = {
  pressStart: {
    fontFamily: '"Press Start 2P", cursive',
  },
  bebasNeueRegular: {
    fontFamily: '"Bebas Neue", sans-serif',
  },
};

export default function BuyDonPage() {
  return (
    <main className={`flex flex-col items-center justify-center min-h-screen ${styles.container}`}>
      <div className="max-w-[324px] mx-auto">
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Content */}
            <div className="text-center mb-6">
              <h1 className="text-[#FFD700] mb-4" style={{ ...customStyles.pressStart, fontSize: '24px' }}>
                BUY $DON
              </h1>
              
              {/* Token Swap Component */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-black">
                <TokenSwap token="clanker" />
              </div>
              
              <p className="text-black mt-4" style={{ ...customStyles.bebasNeueRegular, fontSize: '14px' }}>
                Swap ETH for $DON tokens directly on Base network. Connect your wallet to get started.
              </p>
            </div>

            {/* Menu Bar */}
            <div className="bg-[#FFD700] border-t-2 border-black p-2 -mx-4 -mb-4 rounded-b-xl">
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🏠
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/buy-don" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      ⬆️
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/tokenomics" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🏆
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/how-to-buy" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🛒
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="https://warpcast.com/~/channel/don" target="_blank" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      ➡️
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