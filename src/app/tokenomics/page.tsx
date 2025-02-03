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

export default function TokenomicsPage() {
  return (
    <main className={`flex flex-col items-center justify-center min-h-screen ${styles.container}`}>
      <div className="max-w-[324px] mx-auto">
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Title */}
            <h1 className="text-[#FFD700] mb-6 text-center" style={{ ...customStyles.pressStart, fontSize: '24px' }}>
              TOKENOMICS
            </h1>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div className="bg-[#1F1F0F] p-3 rounded-lg border-2 border-[#3F3F2F]">
                <h2 className="text-[#FFD700] mb-2" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
                  TOTAL SUPPLY
                </h2>
                <p className="text-white" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                  100,000,000 DON
                </p>
              </div>

              <div className="bg-[#1F1F0F] p-3 rounded-lg border-2 border-[#3F3F2F]">
                <h2 className="text-[#FFD700] mb-2" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
                  TAX
                </h2>
                <p className="text-white" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                  0% Buy / 0% Sell
                </p>
              </div>

              <div className="bg-[#1F1F0F] p-3 rounded-lg border-2 border-[#3F3F2F]">
                <h2 className="text-[#FFD700] mb-2" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
                  LIQUIDITY
                </h2>
                <p className="text-white" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                  100% Locked Forever
                </p>
              </div>
            </div>

            {/* Menu Bar */}
            <div className="bg-[#FFD700] border-t-2 border-black p-2 -mx-4 -mb-4">
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🏠
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/origin" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      ↑
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/gallery" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🏆
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/tokenomics" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-sm" style={{ ...customStyles.pressStart }}>
                      🛍️
                    </div>
                  </Link>
                  <div className="text-black font-bold">:</div>
                  <Link href="/swap" className="flex flex-col items-center">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Image
                        src="/icons8-data-transfer-32.png"
                        alt="Swap"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        unoptimized
                      />
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