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

export default function SwapPage() {
  return (
    <main className={`flex flex-col items-center justify-center min-h-screen ${styles.container}`}>
      <div className="max-w-[324px] mx-auto">
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Swap Interface */}
            <div className="text-black mb-4" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
              you give:
            </div>

            {/* ETH Input */}
            <div className="bg-[#1F1F0F] p-3 rounded-lg border-2 border-[#3F3F2F] mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#FFD700]" style={{ ...customStyles.pressStart, fontSize: '14px' }}>
                  ETH
                </div>
                <div className="text-[#666666]" style={{ ...customStyles.pressStart, fontSize: '10px' }}>
                  WALLET: 0.0000
                </div>
              </div>
              <input
                type="text"
                className="w-full bg-transparent text-white outline-none text-right"
                placeholder="0"
                style={{ ...customStyles.pressStart, fontSize: '16px' }}
              />
            </div>

            {/* Swap Arrows */}
            <div className="flex justify-center gap-2 mb-6">
              <div className="text-[#FFD700] text-2xl">↓</div>
              <div className="text-black text-2xl">↑</div>
            </div>

            {/* DON Output */}
            <div className="text-black mb-4" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
              you receive:
            </div>
            <div className="bg-[#1F1F0F] p-3 rounded-lg border-2 border-[#3F3F2F] mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#FFD700]" style={{ ...customStyles.pressStart, fontSize: '14px' }}>
                  DON
                </div>
                <div className="text-[#666666]" style={{ ...customStyles.pressStart, fontSize: '10px' }}>
                  WALLET: 0.00
                </div>
              </div>
              <input
                type="text"
                className="w-full bg-transparent text-white outline-none text-right"
                placeholder="0.000"
                style={{ ...customStyles.pressStart, fontSize: '16px' }}
                readOnly
              />
            </div>

            {/* Swap Button */}
            <button
              className="w-full bg-[#FFD700] text-black py-3 rounded-lg border-2 border-black hover:bg-[#FFE44D] transition-colors mb-6"
              style={{ ...customStyles.pressStart, fontSize: '14px' }}
            >
              Swap
            </button>

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