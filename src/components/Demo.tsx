"use client";
import { useEffect, useCallback, useState, useMemo } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { SwapWidget } from "@uniswap/widgets";
import '@uniswap/widgets/fonts.css';
import { base, optimism } from "wagmi/chains";
import { BaseError, UserRejectedRequestError } from "viem";

import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/card";
import { truncateAddress } from "~/lib/truncateAddress";
import AudioPlayer from "~/components/AudioPlayer";
import styles from "~/styles/Demo.module.css";

// Constants
const MY_TOKEN_LIST = [
  {
    name: "DON",
    address: "0x2427e231B401E012edacD1c4dD700ea2D4376eD0",
    symbol: "DON",
    decimals: 18,
    chainId: 8453,
    logoURI: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DON%20FULL%20BODY%20v2-gjMkfJkIC6NQrbUp0lAfbhlNp49qdK.gif"
  }
];

const contractAddress = "0x2427e231B401E012edacD1c4dD700ea2D4376eD0";

// Component
export default function Demo({ title = "Frames v2 Demo" }: { title?: string }): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(contractAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  const scrollToSwap = useCallback(() => {
    document.getElementById('swap-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <main className={styles.container}>
      <div className="max-w-[324px] mx-auto space-y-6 mt-8">
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        
        {/* Contract Address Card */}
        <Card className="bg-white text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between">
            <div 
              className={`text-sm break-all pr-4 cursor-pointer hover:text-gray-600 transition-colors ${styles.bebasNeueRegular}`}
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
        </Card>

        {/* Swap Section */}
        <div id="swap-section" className="mt-8">
          <SwapWidget
            tokenList={MY_TOKEN_LIST}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={contractAddress}
            width="100%"
          />
        </div>
      </div>

      <AudioPlayer audioSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jay%20Dee%2037%20(Instrumental)-QoxzWgM4DtkvNjpIp60Afh1pw9m8yC.mp3" />
    </main>
  );
}
