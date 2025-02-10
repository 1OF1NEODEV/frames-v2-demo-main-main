"use client";
import { useEffect, useCallback, useState, useRef } from "react";
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
    padding: '1rem',
    paddingBottom: '2rem',
    backgroundImage: 'url("/Backyard.png")',
    margin: '0 auto',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    width: '100%',
    maxWidth: '100vw',
    height: '100%',
    minHeight: '100vh'
  }
};

export default function Demo({ title = "Frames v2 Demo" }: { title?: string }): JSX.Element {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    title: string;
    artist: string;
    description: string;
    minted: string;
    collection: string;
  }>(null);

  // Add audio ref
  const barkAudioRef = useRef<HTMLAudioElement>(null);

  const playBarkSound = () => {
    if (barkAudioRef.current) {
      barkAudioRef.current.currentTime = 0;
      barkAudioRef.current.play();
    }
  };

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

  const galleryImages = [
    {
      src: "/don painter v2.gif",
      title: "DON THE PAINTER",
      artist: "1OF1NEO",
      description: "68 × 70 px",
      minted: "???",
      collection: "Don's Doodles"
    },
    {
      src: "/THE_HILL.png",
      title: "TOUCHING GRASS",
      artist: "1OF1NEO",
      description: "108 × 108 px",
      minted: "January 15, 2024",
      collection: "Don's Doodles"
    },
    {
      src: "/DON_KING.png",
      title: "KING DON",
      artist: "1OF1NEO",
      description: "68 × 68 px",
      minted: "January 14, 2024",
      collection: "Don's Doodles"
    },
    {
      src: "/RODEO_DON.gif",
      title: "RODEO DON",
      artist: "1OF1NEO",
      description: "84 × 62 px",
      minted: "January 12, 2024",
      collection: "Don's Doodles"
    },
    {
      src: "/DICKBUTT_DON.png",
      title: "DICKBUTT DON",
      artist: "1OF1NEO",
      description: "48 × 58 px",
      minted: "January 10, 2024",
      collection: "Don's Doodles"
    },
    {
      src: "/SKIMASK_DON.gif",
      title: "SKI MASK DON",
      artist: "1OF1NEO",
      description: "40 × 48 px",
      minted: "December 13, 2024",
      collection: "Don's Doodles"
    }
  ];

  const [showTrddPopup, setShowTrddPopup] = useState(false);

  return (
    <main className={`flex flex-col ${styles.container}`}>
      <audio ref={barkAudioRef} src="/dog-bark-type-04-293288.mp3" preload="auto" />
      
      {/* TRDD Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="bg-[#E3F2FF] hover:bg-[#D1E9FF] text-[#1E293B] font-bold px-1.5 py-1 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
          style={{ ...customStyles.pressStart, fontSize: '8px' }}
          onClick={() => setShowTrddPopup(true)}
        >
          DYOR
        </button>
      </div>

      {/* TRDD Popup */}
      {showTrddPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#E3F2FF] rounded-3xl p-0 max-w-[300px] w-full mx-4 relative border-2 border-[#1E293B]">
            <button
              className="absolute top-3 right-3 text-white hover:opacity-70 z-10"
              onClick={() => setShowTrddPopup(false)}
              style={{ ...customStyles.pressStart, fontSize: '16px' }}
            >
              ×
            </button>

            {/* Black Header with Title */}
            <div className="w-full bg-black text-white px-6 py-4 flex justify-center items-center rounded-t-3xl">
              <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>
                Disclaimer
              </h2>
            </div>
            
            <div className="p-4">
              {/* Disclaimer Image */}
              <div className="flex justify-center mb-2">
                <Image 
                  src="/disclaimer.png"
                  alt="Disclaimer illustration"
                  width={150}
                  height={150}
                  className="w-36 h-36"
                  unoptimized
                />
              </div>

              {/* Disclaimer Text */}
              <p className="text-center text-xs leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                $DON is a art memecoin with no intrinsic value or expectation of financial return. There is no roadmap. The coin is for entertainment purposes only.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[324px] mx-auto space-y-6 mt-8">
        {/* Contract Address Card */}
        <Card className="bg-white text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col">
            {/* Title Section */}
            <div className="text-center mb-4">
              {/* DON Character Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src="/DON FULL BODY v2.gif"
                  alt="DON character with purple top hat and headphones"
                  width={120}
                  height={120}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={customStyles.pressStart}>DON DA DEGEN DOG</h1>
              <p className="text-lg mb-4" style={customStyles.bebasNeueRegular}>Coolest Degenerate Pixel Dog on Base</p>
              
              {/* Social Icons */}
              <div className="flex justify-center gap-4 mb-2">
                <Image 
                  src="/icons8-twitter-bird-32.png"
                  alt="Twitter Bird Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://twitter.com/1of1neo', '_blank')}
                  unoptimized
                />
                <Image 
                  src="/icons8-telegram-app-32.png"
                  alt="Telegram Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://t.me/dondadegendog', '_blank')}
                  unoptimized
                />
                <Image 
                  src="/icons8-instagram-32.png"
                  alt="Instagram Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://instagram.com/dondadegendog', '_blank')}
                  unoptimized
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-0">
              <div 
                className="text-sm break-all pr-4 cursor-pointer hover:text-gray-600 transition-colors"
                style={customStyles.bebasNeueRegular}
                onClick={copyToClipboard}
                role="button"
                aria-label="Click to copy contract address"
              >
                {contractAddress}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100"
                onClick={copyToClipboard}
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">
                  {isCopied ? "Address copied" : "Copy contract address"}
                </span>
              </Button>
            </div>
          </div>
        </Card>
   {/* Buy Button */}
   <Button 
          className="bg-[#2A69F7] hover:bg-[#2A69F7] text-white font-bold py-2 px-4 rounded-lg border-4 border-black w-full hover:animate-[wiggle_1.5s_ease-in-out] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]"
          style={{ ...customStyles.pressStart, fontSize: '14px' }}
          onClick={() => {
            playBarkSound();
            window.open('https://clank.fun/t/0x2427e231b401e012edacd1c4dd700ea2d4376ed0', '_blank');
          }}
          onMouseEnter={playBarkSound}
        >
          Buy $DON
        </Button>

        {/* First Card - Main Info - Origin */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" id="origin">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Origin</h2>
          </div>
          <div className="p-8 flex flex-col items-center space-y-3">
            <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Don Da Degen Dog is a daring and spirited meme coin that merges art, humor, and the relentless enegry of a true degen. With its charasmatic canine mascot, Don Da Degen Dog is here to spark creativity and fun while carving its own pawprint in the world of decentralized finance.<br/>
            </p>
          </div>
        </Card>

        {/* Second Card - Tokenomics */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" id="tokenomics">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Tokenomics</h2>
          </div>
          <div className="p-8">
            {/* Tokenomics Image */}
            <div className="flex justify-center mb-2">
              <Image 
                src="/loading-clanker.gif"
                alt="Tokenomics animation"
                width={128}
                height={128}
                className="w-32 h-32"
                unoptimized
              />
            </div>
            <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              The circulating supply is 100,000,000,000 $DON.<br/>
              $DON was fairly launched by clanker, an autonomous bot on farcaster that enables users to launch memecoins with a simple cast mentioning the bot. It starts with only the token supply (no eth), as clanker uses one-sided liquidity on uniswap v3.
            </p>
          </div>
        </Card>

        {/* How to Buy Card */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" id="how-to-buy">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>How to Buy</h2>
          </div>
          <div className="p-8 space-y-6">
            {/* Wallet Image */}
            <div className="flex justify-center mb-4">
              <Image 
                src="/DON'S WALLET V2.png"
                alt="Wallet illustration"
                width={128}
                height={128}
                className="w-32 h-32"
                unoptimized
              />
            </div>

            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#FF990A] text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                01
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ ...customStyles.pressStart, fontSize: '14px' }}>Get a Wallet</h3>
                <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Download a crypto wallet like MetaMask, Phantom or Raindow.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#2A69F7] text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                02
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ ...customStyles.pressStart, fontSize: '14px' }}>Add Base</h3>
                <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Purchase Base on an exchange like Binance or Coinbase, then transfer it to your wallet.
                </p>
          </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="bg-green-400 text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                03
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ ...customStyles.pressStart, fontSize: '14px' }}>Connect to a DEX</h3>
                <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Visit a DEX like Clank.Fun, Gecko Terminal or Matcha and connect your wallet.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#8660CC] text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                04
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ ...customStyles.pressStart, fontSize: '14px' }}>Swap for DON</h3>
                <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Paste the $DON token address, select DON, and confirm. Sign the wallet prompt to complete swap.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Buy Button after How to Buy */}
        <Button
          className="bg-[#8660CC] hover:bg-[#8660CC] text-white font-bold py-2 px-4 rounded-lg border-4 border-black w-full hover:animate-[wiggle_1.5s_ease-in-out] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]"
          style={{ ...customStyles.pressStart, fontSize: '14px' }}
          onClick={() => {
            playBarkSound();
            window.open('https://www.geckoterminal.com/base/pools/0xbb27a2B653533f5CD69Eeab06F22DB7EB3b9A453', '_blank');
          }}
          onMouseEnter={playBarkSound}
        >
          Buy $DON
        </Button>

        {/* Gallery Card */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" id="gallery">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Gallery</h2>
          </div>
          <div className="p-8">
            {/* Gallery Section */}
            <div className="flex flex-col gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="w-full aspect-square relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer group [perspective:1000px]"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front - Image Side */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      {/* Base Token Badge */}
                      <div className="absolute top-3 left-2 z-10">
                        <Image 
                          src="/token--base.png"
                          alt="Base Token"
                          width={12}
                          height={12}
                          className="rounded-full"
                          unoptimized
                        />
                      </div>
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                        unoptimized={image.src.endsWith('.gif')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent p-4 flex flex-col justify-end">
                        <h3 className="text-white font-bold mb-0.5" style={{ ...customStyles.pressStart, fontSize: '10px' }}>
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-xs" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          {image.artist}
                        </p>
                      </div>
                    </div>

                    {/* Back - Details Side */}
                    <div className="absolute inset-0 bg-white p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] border-4 border-black rounded-xl">
                      <div className="flex flex-col h-full justify-center items-center text-center">
                        <h3 className="font-bold mb-2" style={{ ...customStyles.pressStart, fontSize: '12px' }}>
                          {image.title}
                        </h3>
                        <p className="text-sm mb-1" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          Artist: {image.artist}
                        </p>
                        <p className="text-sm mb-1" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          Size: {image.description}
                        </p>
                        <p className="text-sm mb-1" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          Minted: {image.minted}
                        </p>
                        <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          Collection: {image.collection}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>

      {/* Footer */}
      <p className="text-center text-white text-sm mt-8" style={customStyles.bebasNeueRegular}>© 2024 By Don Da Degen Dog. All rights reserved.</p>
      
      <AudioPlayer 
        audioSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jay%20Dee%2037%20(Instrumental)-QoxzWgM4DtkvNjpIp60Afh1pw9m8yC.mp3" 
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage || galleryImages[0]}
      />
    </main>
  );
}
