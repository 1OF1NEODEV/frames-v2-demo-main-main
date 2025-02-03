"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";

const customStyles = {
  pressStart: {
    fontFamily: '"Press Start 2P", cursive',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[url('/DON_HOMER_MEME.png')] bg-cover bg-center p-4">
      <div className="max-w-[324px] mx-auto space-y-6 mt-8">
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Disclaimer</h2>
          </div>
          <div className="pt-1 px-8 pb-8">
            {/* Disclaimer Image */}
            <div className="flex justify-center mb-2">
              <Image 
                src="/disclaimer.png"
                alt="Disclaimer illustration"
                width={128}
                height={128}
                className="w-32 h-32"
                unoptimized
              />
            </div>
            <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              $DON is a art memecoin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. The coin is for entertainment purposes only.
            </p>
          </div>
        </Card>
      </div>

      {/* Pixel Style Footer Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFD700] border-t-4 border-black p-4 z-50">
        <div className="max-w-[324px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex flex-col items-center">
              <div className="w-6 h-6 flex items-center justify-center" style={{ ...customStyles.pressStart }}>
                🏠
              </div>
            </Link>
            <div className="text-black font-bold">:</div>
            <Link href="/origin" className="flex flex-col items-center">
              <div className="w-6 h-6 flex items-center justify-center" style={{ ...customStyles.pressStart }}>
                ↑
              </div>
            </Link>
            <div className="text-black font-bold">:</div>
            <Link href="/gallery" className="flex flex-col items-center">
              <div className="w-6 h-6 flex items-center justify-center" style={{ ...customStyles.pressStart }}>
                🏆
              </div>
            </Link>
            <div className="text-black font-bold">:</div>
            <Link href="/tokenomics" className="flex flex-col items-center">
              <div className="w-6 h-6 flex items-center justify-center" style={{ ...customStyles.pressStart }}>
                🛍️
              </div>
            </Link>
            <div className="text-black font-bold">:</div>
            <Link href="/disclaimer" className="flex flex-col items-center">
              <div className="w-6 h-6 flex items-center justify-center" style={{ ...customStyles.pressStart }}>
                🔧
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind the navigation bar */}
      <div className="h-24"></div>
    </main>
  );
} 