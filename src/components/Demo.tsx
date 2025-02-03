"use client";
import { useEffect, useCallback, useState } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import sdk, { type FrameContext } from '@farcaster/frame-sdk';
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/card";
import { truncateAddress } from "~/lib/truncateAddress";
import AudioPlayer from "~/components/AudioPlayer";
import Lightbox from "~/components/Lightbox";
import styles from '~/styles/Demo.module.css';

// Constants
const contractAddress = "0x2427e231B401E012edacD1c4dD700ea2D4376eD0";

// Custom styles
const customStyles = {
  bebasNeueRegular: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  pressStart: {
    fontFamily: '"Press Start 2P", cursive',
  },
  container: {
    minHeight: '100vh',
    padding: '1rem',
    paddingBottom: '2rem',
    backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moblieview2-z06BPRebXG0ei4GazVfAoQthwFYyTC.png")',
    margin: '0 auto',
    backgroundColor: '#2A69F7',
    backgroundSize: 'auto 100vh',
    backgroundPosition: 'top center',
    backgroundAttachment: 'fixed',

    width: '100%',
    maxWidth: '100vw',

  }
};

export default function Demo({ title = "Frames v2 Demo" }: { title?: string }): JSX.Element {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(contractAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  return (
    <main className={`flex flex-col ${styles.container}`}>
      <div className="max-w-[324px] mx-auto space-y-6 mt-8">
        {/* Main Game Container */}
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Character Image */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/don painter.gif"
                alt="Don Da Degen Dog Icon"
                width={400}
                height={400}
                className="w-30 h-30"
                unoptimized
              />
            </div>

            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-[#FFD700] mb-2" style={{ ...customStyles.pressStart, fontSize: '24px' }}>
                DON DA<br/>DEGEN DOG
              </h1>
              <p className="text-black" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}>
                COOLEST DEGENERATE PIXEL DOG ON BASE
              </p>
            </div>

            {/* Contract Address Section */}
            <div className="bg-[#1F1F0F] p-2 rounded-lg border-2 border-[#3F3F2F] max-w-[280px] mx-auto mb-6">
              <div 
                className="text-[#FFD700] text-sm break-all pr-2 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-between"
                style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px' }}
                onClick={copyToClipboard}
                role="button"
                aria-label="Click to copy contract address"
              >
                <span>{contractAddress}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[#FFD700] hover:text-[#FFE44D]"
                  onClick={copyToClipboard}
                >
                  {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-3 px-2 mb-6">
              <Link href="https://x.com/dononbase" className="hover:opacity-80">
                <span className="block w-6.5 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32">
                    <polygon fill="#589bd4" points="30,7 30,9 28,9 28,15 26,15 26,19 24,19 24,24 22,24 22,26 18,26 18,28 10,28 10,26 5,26 5,24 10,24 10,22 5,22 5,18 2,18 2,13 0,13 0,9 2,9 2,11 16,11 16,9 18,9 18,7 20,7 20,5 26,5 26,7"></polygon>
                    <rect width="7" height="2" x="2" y="16" fill="#26659f"></rect>
                    <rect width="5" height="2" x="5" y="20" fill="#26659f"></rect>
                  </svg>
                </span>
              </Link>
              <Link href="https://t.me/dononbase" className="hover:opacity-80">
                <span className="block w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                    <polygon fill="#589bd4" points="28,10 28,22 26,22 26,24 24,24 24,26 22,26 22,28 10,28 10,26 8,26 8,24 6,24 6,22 4,22 4,10 6,10 6,8 8,8 8,6 10,6 10,4 22,4 22,6 24,6 24,8 26,8 26,10"></polygon>
                    <polygon fill="#e6e5e5" points="21,9 21,23 19,23 19,21 15,21 15,19 13,19 13,21 11,21 11,17 8,17 8,15 11,15 11,13 13,13 13,11 17,11 17,9"></polygon>
                    <polygon fill="#b6b5b5" points="13,15 13,17 11,17 11,21 13,21 13,19 15,19 15,15"></polygon>
                    <rect width="2" height="2" x="15" y="13" fill="#b6b5b5"></rect>
                  </svg>
                </span>
              </Link>
              <Link href="https://www.instagram.com/dononbase/" className="hover:opacity-80">
                <span className="block w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                    <polygon fill="#589bd4" points="28,6 28,26 26,26 26,28 6,28 6,26 4,26 4,6 6,6 6,4 26,4 26,6"></polygon>
                    <rect width="16" height="16" x="8" y="8" fill="#e6e5e5"></rect>
                    <rect width="2" height="2" x="22" y="8" fill="#b6b5b5"></rect>
                    <rect width="8" height="8" x="12" y="12" fill="#b6b5b5"></rect>
                  </svg>
                </span>
              </Link>
            </div>

            {/* Menu Bar */}
            <div className="bg-[#FFD700] border-t-2 border-black p-3 -mx-4 -mb-4">
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-4">
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

      {/* Footer */}
      <p className="text-center text-white text-sm mt-6" style={customStyles.bebasNeueRegular}>© 2024 By Don Da Degen Dog. All rights reserved.</p>

      <AudioPlayer audioSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jay%20Dee%2037%20(Instrumental)-QoxzWgM4DtkvNjpIp60Afh1pw9m8yC.mp3" />

      {/* Add padding to prevent content from being hidden behind the navigation bar */}
      <div className="h-24"></div>
    </main>
  );
}
