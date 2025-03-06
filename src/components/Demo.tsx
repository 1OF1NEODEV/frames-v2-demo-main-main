"use client";
import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import { Input } from "../components/ui/input"
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import sdk, {
    AddFrame,
    FrameNotificationDetails,
    SignIn as SignInCore,
} from "@farcaster/frame-sdk";
import type { FrameContext } from "@farcaster/frame-core";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
  useSwitchChain,
  useChainId,
} from "wagmi";
import TokenSwap from "~/components/TokenSwap";

import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, degen, mainnet, optimism } from "wagmi/chains";
import { BaseError, UserRejectedRequestError } from "viem";
import { useSession } from "next-auth/react"
import { createStore } from 'mipd'
import { Label } from "../components/ui/label";


import Link from "next/link";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { Card } from "~/components/ui/card";
import AudioPlayer from "~/components/AudioPlayer";
import Lightbox from "~/components/Lightbox";
import styles from '~/styles/Demo.module.css';
import { Button } from "~/components/ui/Button";


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
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'scroll',
    width: '100%',
    maxWidth: '100vw',
    minHeight: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative'
  }
};

// Define extended context type
interface ExtendedFrameContext extends FrameContext {
  client: {
    clientFid: number;
    added: boolean;
    notificationDetails?: { url: string; token: string; };
    safeAreaInsets?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
}

export default function Demo({ title = "Don The Dog" }: { title?: string }): JSX.Element {
  
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<ExtendedFrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const [isCopied, setIsCopied] = useState(false);
  const [isKennelImageFlipped, setIsKennelImageFlipped] = useState(false);
  const [isPhoneWiggling, setIsPhoneWiggling] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    title: string;
    artist: string;
    description: string;
    minted: string;
    collection: string;
  }>(null);




  const [added, setAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);

  const [lastEvent, setLastEvent] = useState("");

  const [addFrameResult, setAddFrameResult] = useState("");
  const [sendNotificationResult, setSendNotificationResult] = useState("");

  useEffect(() => {
    setNotificationDetails(context?.client.notificationDetails ?? null);
  }, [context]);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const {
    switchChain,
    error: switchChainError,
    isError: isSwitchChainError,
    isPending: isSwitchChainPending,
  } = useSwitchChain();

  const nextChain = useMemo(() => {
    if (chainId === base.id) {
      return optimism;
    } else if (chainId === optimism.id) {
      return degen;
    } else if (chainId === degen.id) {
      return mainnet;
    } else {
      return base;
    }
  }, [chainId]);

  const handleSwitchChain = useCallback(() => {
    switchChain({ chainId: nextChain.id });
  }, [switchChain, nextChain.id]);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setAdded(context.client.added);

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setLastEvent(
          `frameAdded${!!notificationDetails ? ", notifications enabled" : ""}`
        );

        setAdded(true);
        if (notificationDetails) {
          setNotificationDetails(notificationDetails);
        }
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        setLastEvent(`frameAddRejected, reason ${reason}`);
      });

      sdk.on("frameRemoved", () => {
        setLastEvent("frameRemoved");
        setAdded(false);
        setNotificationDetails(null);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        setLastEvent("notificationsEnabled");
        setNotificationDetails(notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        setLastEvent("notificationsDisabled");
        setNotificationDetails(null);
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

// Set up a MIPD Store, and request Providers.
const store = createStore()

// Subscribe to the MIPD Store.
store.subscribe(providerDetails => {
  console.log("PROVIDER DETAILS", providerDetails)
  // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
})

    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  const openUrl = useCallback(() => {
    sdk.actions.openUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }, []);

  const openWarpcastUrl = useCallback(() => {
    sdk.actions.openUrl("https://warpcast.com/~/compose");
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const addFrame = useCallback(async () => {
    try {
      setNotificationDetails(null);

      const result = await sdk.actions.addFrame();

      if ('notificationDetails' in result && result.notificationDetails) {
        setNotificationDetails(result.notificationDetails);
        setAddFrameResult(
          `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
        );
      } else {
        setAddFrameResult("Added, got no notification details");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'RejectedByUser') {
          setAddFrameResult(`Not added: ${error.message}`);
        } else if (error.name === 'InvalidDomainManifest') {
          setAddFrameResult(`Not added: ${error.message}`);
        } else {
          setAddFrameResult(`Error: ${error.message}`);
        }
      } else {
        setAddFrameResult(`Unknown error occurred`);
      }
    }
  }, []);

  const sendNotification = useCallback(async () => {
    setSendNotificationResult("");
    if (!notificationDetails || !context) {
      return;
    }

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        mode: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fid: context.user.fid,
          notificationDetails,
        }),
      });

      if (response.status === 200) {
        setSendNotificationResult("Success");
        return;
      } else if (response.status === 429) {
        setSendNotificationResult("Rate limited");
        return;
      }

      const data = await response.text();
      setSendNotificationResult(`Error: ${data}`);
    } catch (error) {
      setSendNotificationResult(`Error: ${error}`);
    }
  }, [context, notificationDetails]);

const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);


  // Memory Game State
  const [cards, setCards] = useState<Array<{ id: number; image: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  // Initialize game
  const initializeGame = useCallback(() => {
    // Memory Game Images
    const gameImages = [
      "/DON'S PAW V6.png",
      "/DON'S PAW V5.png",
      "/DON'S PAW.png",
      "/DON'S PAW V7.png",
      "/DON'S PAW V3.png",
      "/DON'S PAW V4.png",
      "/icon.png",
      "/Screenshot 2024-12-02 174049.png"
    ];

    // Create two icon.png cards
    const iconCards = [
      { id: Math.random(), image: "/icon.png", isFlipped: false, isMatched: false },
      { id: Math.random(), image: "/icon.png", isFlipped: false, isMatched: false }
    ];
    
    // Get other images excluding icon.png
    const otherImages = gameImages.filter(img => img !== "/icon.png");
    const randomImages = otherImages.slice(0, 7); // Get 7 images for 14 cards (7 pairs)
    
    const otherCards = randomImages.flatMap(image => [
      { id: Math.random(), image, isFlipped: false, isMatched: false },
      { id: Math.random(), image, isFlipped: false, isMatched: false }
    ]);

    setCards(shuffleArray([...iconCards, ...otherCards]));
    setIsPlaying(true);
    setFlippedCards([]);
    setCanFlip(true);
  }, []);

  // Shuffle array helper function
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Handle card flip
  const handleCardFlip = (index: number) => {
    if (!canFlip || !isPlaying || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (flippedCards.length === 0) {
      setFlippedCards([index]);
    } else {
      setCanFlip(false);
      setFlippedCards([...flippedCards, index]);

      // Check for match
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[index];

      if (firstCard.image === secondCard.image) {
        // Match found
        newCards[flippedCards[0]].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setCanFlip(true);

        // Check if the matched pair is icon.png
        if (firstCard.image === "/icon.png") {
          playBarkSound(); // Only play bark sound when icon.png is matched
          setTimeout(() => {
            setShowVictoryPopup(true);
          }, 500);
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

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
    playBarkSound();
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
      src: "/DON THE SPY V2.gif",
      title: "DON THE SPY",
      artist: "1OF1NEO",
      description: "124 × 124 px",
      minted: "February 19, 2025",
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
  const [showGalleryPopup, setShowGalleryPopup] = useState(false);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);
  const [isClosingVictory, setIsClosingVictory] = useState(false);

 

  const { connectors } = useConnect();


  // Add new state variables after other state declarations
  const [isClosingTrdd, setIsClosingTrdd] = useState(false);
  const [isClosingGallery, setIsClosingGallery] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const [isClosingRules, setIsClosingRules] = useState(false);

  // Add useEffect for handling clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showWalletModal) {
        setShowWalletModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showWalletModal]);

  // Add close handler functions before the return statement
  const handleCloseTrdd = () => {
    setIsClosingTrdd(true);
    setTimeout(() => {
      setShowTrddPopup(false);
      setIsClosingTrdd(false);
    }, 300);
  };

  const handleCloseGallery = () => {
    setIsClosingGallery(true);
    setTimeout(() => {
      setShowGalleryPopup(false);
      setIsClosingGallery(false);
    }, 300);
  };

  const handleCloseRules = () => {
    setIsClosingRules(true);
    setTimeout(() => {
      setShowRulesPopup(false);
      setIsClosingRules(false);
    }, 300);
  };

  const [kennelImageIndex, setKennelImageIndex] = useState(0);
  
  const kennelImages = [
    "/DON PFP V2.png",
    "/SAMPLE V17.png",
    "/SAMPLE V13.png"
  ];

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Add close handler for victory popup
  const handleCloseVictory = () => {
    setIsClosingVictory(true);
    setTimeout(() => {
      setShowVictoryPopup(false);
      setIsClosingVictory(false);
      initializeGame(); // Start new game after closing
    }, 300);
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      style={{ 
        padding: `${(context?.client.safeAreaInsets?.top ?? 0) + 16}px ${(context?.client.safeAreaInsets?.right ?? 0) + 16}px ${(context?.client.safeAreaInsets?.bottom ?? 0) + 16}px ${(context?.client.safeAreaInsets?.left ?? 0) + 16}px`,
        width: '100%',
        maxWidth: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/DON HOMER MEME.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '300px auto', /* Set a fixed width for the tile and let height scale proportionally */
        zIndex: -1,
      }} />
      <audio ref={barkAudioRef} src="/dog-bark-type-04-293288.mp3" preload="auto" />
      
      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Gallery Button */}
        <button
          className="bg-white hover:bg-gray-100 text-[#1E293B] font-bold px-1.5 py-1 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
          style={{ ...customStyles.pressStart, fontSize: '8px' }}
          onClick={() => setShowGalleryPopup(true)}
        >
          GALLERY
        </button>
      </div>

      {/* DYOR Button (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-white hover:bg-gray-100 text-[#1E293B] font-bold px-1.5 py-1 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
          style={{ ...customStyles.pressStart, fontSize: '8px' }}
          onClick={() => setShowTrddPopup(true)}
        >
          DYOR
        </button>
      </div>

      {/* TRDD Popup */}
      {showTrddPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-300"
          onClick={handleCloseTrdd}
        >
          <div 
            className={`bg-white rounded-3xl p-0 max-w-[300px] w-full mx-4 relative border-2 border-[#1E293B] transition-all duration-300 ${
              isClosingTrdd ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:opacity-70 z-10"
              onClick={handleCloseTrdd}
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
            
            <div className="p-6">
              {/* Disclaimer Image */}
              <div className="flex justify-center mb-5">
                <Image 
                  src="/disclaimer.png"
                  alt="Disclaimer illustration"
                  width={70}
                  height={70}
                
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

      {/* Gallery Popup */}
      {showGalleryPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-300"
          onClick={handleCloseGallery}
        >
          <div 
            className={`bg-white rounded-3xl p-0 max-w-[90%] w-[450px] mx-4 relative border-2 border-[#1E293B] transition-all duration-300 ${
              isClosingGallery ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:opacity-70 z-10"
              onClick={handleCloseGallery}
              style={{ ...customStyles.pressStart, fontSize: '16px' }}
            >
              ×
            </button>

            {/* Black Header with Title */}
            <div className="w-full bg-black text-white px-6 py-3 flex justify-center items-center rounded-t-3xl">
              <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '14px' }}>
                Don&apos;s Sketch Book
              </h2>
            </div>
            
            <div className="p-4">
              {/* Gallery Section */}
              <div className="grid grid-cols-2 gap-2">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                        unoptimized={image.src.endsWith('.gif')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent p-2 flex flex-col justify-end">
                        <h3 className="text-white font-bold mb-0.5" style={{ ...customStyles.pressStart, fontSize: '6px' }}>
                          {image.title}
                        </h3>
                        <p className="text-white/80 text-[8px]" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                          {image.artist}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[324px] mx-auto space-y-6 mt-16">
        {/* Contract Address Card */}
        <Card className="bg-white text-black p-12 pb-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col">
            {/* Title Section */}
            <div className="text-center mb-4">
              {/* DON Character Image */}
              <div className="flex justify-center mb-8">
                <Image
                  src="/don-painter.gif"
                  alt="DON character with purple top hat and headphones"
                  width={220}
                  height={220}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-6xl font-bold mb-2" style={customStyles.pressStart}>DON</h1>
              <p className="text-base mb-2" style={customStyles.bebasNeueRegular}>Coolest Degenerate Pixel Dog on Base</p>
              
              {/* Contract Address */}
              <div className="flex items-center justify-center mb-4">
                <div className={`bg-white hover:bg-gray-100 text-[#1E293B] font-bold px-1 py-0.5 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] relative flex items-center gap-1 max-w-[280px] ${isCopied ? 'animate-wiggle' : ''}`}>
                  <style jsx>{`
                    @keyframes wiggle {
                      0%, 100% { transform: rotate(0deg); }
                      25% { transform: rotate(-3deg); }
                      75% { transform: rotate(3deg); }
                    }
                    .animate-wiggle {
                      animation: wiggle 0.3s ease-in-out;
                    }
                  `}</style>
                  <p className="font-mono" style={{ ...customStyles.pressStart, fontSize: '5px' }}>0x3801672b93E16A25120995b7201add19dC46fA22</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("0x3801672b93E16A25120995b7201add19dC46fA22");
                      setIsCopied(true);
                      playBarkSound();
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="hover:opacity-80"
                  >
                    {isCopied ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex justify-center gap-3">
                <Image 
                  src="/icons8-twitter-bird-32.png"
                  alt="Twitter Bird Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://twitter.com/dononbase', '_blank')}
                  unoptimized
                />
                <Image 
                  src="/icons8-telegram-app-32.png"
                  alt="Telegram Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://t.me/dononbase', '_blank')}
                  unoptimized
                />
                <Image 
                  src="/icons8-instagram-32.png"
                  alt="Instagram Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://instagram.com/dononbase', '_blank')}
                  unoptimized
                />
              </div>
              
              {/* Bottom Menu Bar */}
              <div className="bg-yellow-400 border-t-4 border-black py-4 mt-7 mx-[-48px] mb-[-33px] rounded-b-3xl">
                <div className="flex justify-around items-center px-2">
                  <div className="flex items-center">
                    <button 
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => window.location.href = '/'}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span style={{ ...customStyles.pressStart, fontSize: '14px', color: '#FF6B6B' }}>🏠</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-black font-bold" style={{ ...customStyles.pressStart, fontSize: '14px' }}>:</div>
                  
                  <div className="flex items-center">
                    <button 
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span style={{ ...customStyles.pressStart, fontSize: '14px' }}>⬆️</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-black font-bold" style={{ ...customStyles.pressStart, fontSize: '14px' }}>:</div>
                  
                  <div className="flex items-center">
                    <button 
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => setShowGalleryPopup(true)}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span style={{ ...customStyles.pressStart, fontSize: '14px' }}>🏆</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-black font-bold" style={{ ...customStyles.pressStart, fontSize: '14px' }}>:</div>
                  
                  <div className="flex items-center">
                    <button 
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => window.open('https://app.uniswap.org/swap', '_blank')}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span style={{ ...customStyles.pressStart, fontSize: '14px' }}>🛒</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-black font-bold" style={{ ...customStyles.pressStart, fontSize: '14px' }}>:</div>
                  
                  <div className="flex items-center">
                    <button 
                      className="hover:opacity-80 transition-opacity"
                      onClick={() => window.open('https://warpcast.com/~/channel/don', '_blank')}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span style={{ ...customStyles.pressStart, fontSize: '14px' }}>➡️</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Token Swap Component */}
        <div className="flex justify-center items-center py-8">
          <div className="bg-white p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
            <div className="w-full bg-black text-white px-8 py-5 flex justify-center items-center">
              <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Buy $DON</h2>
            </div>
            <div className="bg-white/90 backdrop-blur-sm">
              <TokenSwap token="clanker" />
            </div>
          </div>
        </div>

        {/* Origin Card */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Origin</h2>
              </div>
          <div className="p-9">
            {/* Origin Image */}
            <div className="flex justify-center mb-7">
              <Image 
                src="/DON-FULL-BODY-v2.gif"
                alt="Don character illustration"
                width={100}
                height={100}
       
                unoptimized
              />
            </div>

            {/* Origin Story */}
            <div className="space-y-4">
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Don The Dog is a daring and spirited art lead meme coin that merges art, memes, culture, and the relentless energy of a true degen. 
              </p>
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Don&apos;s here to spark creativity and fun while carving its own pawprint in the world of decentralized finance.
              </p>
            </div>
          </div>
        </Card>

        {/* Tokenomics Card (Moved above How to Buy) */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-9 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Tokenomics</h2>
          </div>
          <div className="p-11">
            {/* Origin Image */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/loading-clanker.gif"
                alt="Don character illustration"
                width={150}
                height={150}
             
                unoptimized
              />
            </div>

            {/* Origin Story */}
            <div className="space-y-4">
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              $DON is a token deployed by clanker, an autonomous bot that allows farcaster users to &apos;prompt&apos; a base token directly in the feed, making launches very simple and fair.
              </p>
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              clanker uses one-sided liquidity on uniswap v3, meaning the pool starts with only the token supply, no eth.
              </p>
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Circulating supply is 100,000,000,000 $DON.
              </p>
            </div>
          </div>
        </Card>

        {/* Memory Game Card */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Find Don Game</h2>
          </div>
          <div className="p-8 pt-8 pb-16 flex flex-col h-[400px]">
            {/* Icon Image */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/icon.png"
                alt="Game Icon"
                width={48}
                height={48}
       
                unoptimized
              />
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-4 gap-2 max-w-[280px] mx-auto">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`aspect-square bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden ${
                    !isPlaying ? 'pointer-events-none' : ''
                  }`}
                  style={{ height: '50px' }}
                  onClick={() => handleCardFlip(index)}
                >
                  {(card.isFlipped || card.isMatched) ? (
                    <Image
                      src={card.image}
                      alt="Card"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span style={{ ...customStyles.pressStart, fontSize: '20px' }}>?</span>
                  )}
                </div>
              ))}
            </div>

            {/* Game Controls */}
            <div className="flex justify-center items-center gap-4 mt-auto pt-8">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:bg-red-600 transition-colors duration-300"
                style={{ ...customStyles.pressStart, fontSize: '8px' }}
                onClick={() => setShowRulesPopup(true)}
              >
                RULES
              </button>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:bg-green-600 transition-colors duration-300"
                style={{ ...customStyles.pressStart, fontSize: '8px' }}
                onClick={initializeGame}
              >
                {isPlaying ? 'RESTART' : 'START'}
              </button>
            </div>
          </div>
        </Card>

        {/* Rules Popup */}
        {showRulesPopup && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-300"
            onClick={handleCloseRules}
          >
            <div 
              className={`bg-white rounded-3xl p-0 max-w-[300px] w-full mx-4 relative border-2 border-[#1E293B] transition-all duration-300 ${
                isClosingRules ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white hover:opacity-70 z-10"
                onClick={handleCloseRules}
                style={{ ...customStyles.pressStart, fontSize: '16px' }}
              >
                ×
              </button>

              {/* Black Header with Title */}
              <div className="w-full bg-black text-white px-6 py-4 flex justify-center items-center rounded-t-3xl">
                <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>
                Rules
                </h2>
              </div>
              
              <div className="p-7">
                {/* Rules Image */}
                <div className="flex justify-center mb-6">
                        <Image 
                    src="/icon.png"
                    alt="Game Rules illustration"
                    width={65}
                    height={65}
                
                          unoptimized
                        />
                      </div>

                {/* Rules Steps */}
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-[#2A69F7] text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                      01
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                        Click on any ? to flip it and reveal the card
                        </p>
                      </div>
                    </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-[#8660CC] text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                      02
                    </div>
                    <div>
                        <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                      find the matching pair of Don&apos;s head to win the game
                        </p>
                      </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 items-start">
                    <div className="bg-green-500 text-white font-bold rounded-lg p-2 w-12 h-12 flex items-center justify-center shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]" style={{ ...customStyles.pressStart }}>
                      03
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                        have fun
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meet The Artist Card */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Meet The Artist</h2>
          </div>
          <div className="p-8">
            {/* Artist Image */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/1OF1NEO_DON_PAINTER.gif"
                alt="Artist illustration"
                width={250}
                height={250}
          
                unoptimized
              />
            </div>

            {/* Artist Story */}
            <div className="space-y-4">
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              1OF1NEO is a multi-disciplinary artist creating at the intersection of art, music, design, technology, and digtal expression.
              </p>
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              Building onchain since 2021, NEO explores new frontiers of creativity through art, music, storytelling & community.
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-3 mt-6">
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
                  src="/icons8-instagram-32.png"
                  alt="Instagram Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://www.instagram.com/yourjiggylord/', '_blank')}
                  unoptimized
                />
                <Image 
                  src="/icons8-discord-new-32.png"
                  alt="Discord Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => window.open('https://discord.gg/haGDJ2UWPG', '_blank')}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </Card>

        {/* New Container with DON PHONE.gif */}
        <Card className="bg-white text-black p-0 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full bg-black text-white px-8 py-6 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>Warpcast</h2>
          </div>
          <div className="p-6">
            {/* DON PHONE Image */}
            <div className="flex justify-center mb-2">
              <div className="relative">
                <style jsx>{`
                  @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-3deg); }
                    75% { transform: rotate(3deg); }
                  }
                  .animate-wiggle {
                    animation: wiggle 0.5s ease-in-out;
                  }
                `}</style>
                <Image 
                  src="/DON PHONE V2.png"
                  alt="Don with phone"
                  width={400}
                  height={400}
                  unoptimized
                  className={`cursor-pointer ${isPhoneWiggling ? 'animate-wiggle' : ''}`}
                  onClick={() => {
                    playBarkSound();
                    setIsPhoneWiggling(true);
                    setTimeout(() => setIsPhoneWiggling(false), 500);
                  }}
                />
              </div>
            </div>

            {/* Description Text - Moved higher up with reduced margin */}
            <div className="space-y-5">
              <p className="text-center text-sm leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                Join our community on warpcast today and stay connected to the latest Don news and community updates.
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* Footer */}
      <p className="text-center text-white text-sm mt-8" style={customStyles.bebasNeueRegular}>© 2025 By Don The Dog. All rights reserved.</p>
      <p className="text-center text-white text-xs mt-1" style={customStyles.bebasNeueRegular}>Version 1.0.0</p>
      
      <AudioPlayer 
        audioSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jay%20Dee%2037%20(Instrumental)-QoxzWgM4DtkvNjpIp60Afh1pw9m8yC.mp3" 
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage || galleryImages[0]}
      />

      {/* Victory Popup */}
      {showVictoryPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-300"
          onClick={handleCloseVictory}
        >
          <div 
            className={`bg-white rounded-3xl p-0 max-w-[300px] w-full mx-4 relative border-2 border-[#1E293B] transition-all duration-300 ${
              isClosingVictory ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:opacity-70 z-10"
              onClick={handleCloseVictory}
              style={{ ...customStyles.pressStart, fontSize: '16px' }}
            >
              ×
            </button>

            {/* Black Header with Title */}
            <div className="w-full bg-black text-white px-6 py-4 flex justify-center items-center rounded-t-3xl">
              <h2 className="text-xl font-semibold text-center" style={{ ...customStyles.pressStart, fontSize: '16px' }}>
                Winner!
              </h2>
            </div>
            
            <div className="p-6">
              {/* Victory Image */}
              <div className="flex justify-center mb-5">
                <Image 
                  src="/icon.png"
                  alt="Victory illustration"
                  width={80}
                  height={80}
                
                  unoptimized
                />
              </div>

              {/* Victory Text */}
              <p className="text-center text-xs leading-relaxed" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                Congratulations! You&apos;ve found Don!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
