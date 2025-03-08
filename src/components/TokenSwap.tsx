"use client";

import { useEffect, useState, useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi";
import Image from "next/image";
import { parseUnits, formatUnits, BaseError } from "viem";
import qs from "qs";

import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";
import { QuoteResponse } from "~/lib/types/zeroex";

interface Token {
  symbol: string;
  name: string;
  image: string;
  address: string;
  decimals: number;
}

const ETH = {
  symbol: "ETH",
  name: "Ethereum",
  image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  decimals: 18,
};

const DEMO_TOKENS: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    address: "0x3801672b93E16A25120995b7201add19dC46fA22",
    decimals: 6,
  },
  {
    symbol: "DON",
    name: "DON",
    image: "/COMING SOON (2).png",
    address: "0x3801672b93E16A25120995b7201add19dC46fA22",
    decimals: 18,
  },
];

const AFFILIATE_FEE = 25;
const PROTOCOL_GUILD_ADDRESS = "0x6DeF89c1DdD0152e8463D0B6e4934Ec42f1342f0";

export default function TokenSwap({ token }: { token: string }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const sellToken = ETH;
  const [sellAmount, setSellAmount] = useState("");

  const [buyAmount, setBuyAmount] = useState("");
  const [buyToken, setBuyToken] = useState<Token>(
    token === "clanker" ? DEMO_TOKENS[1] : DEMO_TOKENS[0]
  );

  const [isFinalized, setIsFinalized] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse>();

  const [fetchPriceError, setFetchPriceError] = useState<string[]>([]);

  const { address, isConnected } = useAccount();
  
  // Add balance hooks
  const { data: ethBalance } = useBalance({
    address,
  });

  const parsedSellAmount = sellAmount
    ? parseUnits(sellAmount, sellToken.decimals).toString()
    : undefined;

  const parsedBuyAmount = buyAmount
    ? parseUnits(buyAmount, buyToken.decimals).toString()
    : undefined;

  const [isPriceLoading, setIsPriceLoading] = useState(false);

  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const finalize = useCallback(() => {
    setIsFinalized(true);
  }, []);

  const fetchPrice = useCallback(
    async (params: unknown) => {
      setIsPriceLoading(true);
      try {
        const response = await fetch(`/api/price?${qs.stringify(params)}`);
        const data = await response.json();

        if (data?.validationErrors?.length > 0) {
          setFetchPriceError(data.validationErrors);
        } else {
          setFetchPriceError([]);
        }

        if (data.buyAmount) {
          setBuyAmount(formatUnits(data.buyAmount, buyToken.decimals));
        }
      } finally {
        setIsPriceLoading(false);
      }
    },
    [buyToken.decimals, setBuyAmount, setFetchPriceError]
  );

  const linkToBaseScan = useCallback((hash?: string) => {
    if (hash) {
      sdk.actions.openUrl(`https://basescan.org/tx/${hash}`);
    }
  }, []);

  const fetchQuote = useCallback(
    async (params: unknown) => {
      setIsPriceLoading(true);
      try {
        const response = await fetch(`/api/quote?${qs.stringify(params)}`);
        const data = await response.json();
        setQuote(data);
      } finally {
        setIsPriceLoading(false);
      }
    },
    [setIsPriceLoading, setQuote]
  );

  const executeSwap = useCallback(() => {
    if (quote) {
      try {
        console.log("Executing swap with quote:", quote);
        
        // Check if we're in a Farcaster Frame environment
        const isFrameEnvironment = typeof window !== 'undefined' && 
          window.location.href.includes('warpcast.com');
        
        if (isFrameEnvironment) {
          // In Farcaster Frame, open a link to complete the transaction
          const baseUrl = "https://app.uniswap.org/swap";
          const params = new URLSearchParams({
            inputCurrency: sellToken.address,
            outputCurrency: buyToken.address,
            exactAmount: sellAmount,
            exactField: 'input'
          });
          
          const swapUrl = `${baseUrl}?${params.toString()}`;
          console.log("Opening external swap URL:", swapUrl);
          sdk.actions.openUrl(swapUrl);
          return;
        }
        
        // Otherwise proceed with normal transaction
        sendTransaction({
          gas: quote.transaction.gas ? BigInt(quote.transaction.gas) : undefined,
          to: quote.transaction.to,
          data: quote.transaction.data,
          value: BigInt(quote.transaction.value),
          chainId: 8453 // Explicitly set the chain ID for Base
        });
      } catch (error) {
        console.error("Error executing swap:", error);
        // Display a more user-friendly error
        const errorMessage = error instanceof Error ? error.message : "Unknown error during swap";
        setFetchPriceError([errorMessage]);
      }
    }
  }, [quote, sendTransaction, setFetchPriceError, sellToken.address, buyToken.address, sellAmount]);

  useEffect(() => {
    const params = {
      chainId: 8453,
      sellToken: ETH.address,
      buyToken: buyToken.address,
      sellAmount: parsedSellAmount,
      buyAmount: parsedBuyAmount,
      taker: address,
      swapFeeRecipient: PROTOCOL_GUILD_ADDRESS,
      swapFeeBps: AFFILIATE_FEE,
      swapFeeToken: buyToken.address,
      tradeSurplusRecipient: PROTOCOL_GUILD_ADDRESS,
    };

    const timeoutId = setTimeout(() => {
      if (sellAmount !== "") {
        const fetchFn = isFinalized ? fetchQuote : fetchPrice;
        fetchFn(params);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [
    address,
    buyAmount,
    buyToken.address,
    parsedBuyAmount,
    parsedSellAmount,
    sellAmount,
    isFinalized,
    fetchPrice,
    fetchQuote,
  ]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[280px] py-5 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
        <div className="mb-4 space-y-2">
          {address && (
            <>
              <div className="text-sm text-gray-500 text-right flex justify-between items-center" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <span className="text-gray-600 dark:text-gray-400">Wallet:</span>
                <span>{truncateAddress(address)}</span>
              </div>
              <div className="text-sm text-right flex justify-between items-center" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <span className="text-gray-600 dark:text-gray-400">Balance:</span>
                <span>{ethBalance?.formatted || '0'} {ethBalance?.symbol}</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {/* Sell Token Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400 pl-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>You Pay</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '7px' }}
              />
              <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-600 px-3 py-1.5 rounded-md my-auto h-fit">
                <Image
                  src={ETH.image}
                  alt={ETH.symbol}
                  width={100}
                  height={100}
                  className="w-3 h-3 rounded-full"
                />
                <div className="bg-transparent border-none outline-none" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '7px' }}>
                  {ETH.symbol}
                </div>
              </div>
              {ethBalance && (
                <div className="absolute left-2 -bottom-6 text-xs text-gray-500" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}>
                  Max: {ethBalance.formatted} {ethBalance.symbol}
                </div>
              )}
            </div>
          </div>

          {/* Buy Token Input */}
          <div className="space-y-2 mt-6 pb-4">
            <label className="text-sm text-gray-600 dark:text-gray-400 pl-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>You Receive</label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-4 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '7px' }}
              />
              {isPriceLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md pl-4 bg-gray-200/50 dark:bg-gray-700/50">
                  <div className="w-3 h-3 border-2 border-[#7C65C1] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-600 px-3 py-2 rounded-md my-auto h-fit">
                <Image
                  src={buyToken.image}
                  alt={buyToken.symbol}
                  width={100}
                  height={100}
                  className="w-3 h-3 rounded-full"
                />
                <select
                  value={buyToken.symbol}
                  onChange={(e) =>
                    setBuyToken(
                      DEMO_TOKENS.find((t) => t.symbol === e.target.value) ||
                        DEMO_TOKENS[1]
                    )
                  }
                  className="bg-transparent border-none outline-none dark:text-white"
                  style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '7px' }}
                >
                  {DEMO_TOKENS.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-3"></div>
          </div>

          {quote && (
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg space-y-2 text-sm mt-4 border border-gray-300 dark:border-gray-600" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Minimum received:</span>
                <span>{formatUnits(BigInt(quote.minBuyAmount), buyToken.decimals)} {buyToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Network:</span>
                <span>Base</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center mt-8">
            <button
              onClick={isFinalized ? executeSwap : finalize}
              disabled={!isConnected || !sellAmount || !buyAmount || isPending}
              className={`bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-[#1E293B] dark:text-white font-bold px-4 py-2 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${(!isConnected || !sellAmount || !buyAmount || isPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}
            >
              {!isConnected 
                ? "CONNECT WALLET" 
                : isPending 
                  ? "CONFIRMING..." 
                  : isFinalized 
                    ? "CONFIRM SWAP" 
                    : "REVIEW SWAP"}
            </button>
          </div>

          {isConfirming && (
            <div className="text-orange-600 dark:text-orange-400 text-center mt-4 p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg border border-orange-200 dark:border-orange-800" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}>
              Waiting for confirmation ...
            </div>
          )}
          {isConfirmed && (
            <div
              className="text-green-600 dark:text-green-400 text-center mt-4 p-3 bg-green-100 dark:bg-green-900/40 rounded-lg border border-green-200 dark:border-green-800 cursor-pointer"
              onClick={() => linkToBaseScan(hash)}
              style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}
            >
              <p>Transaction Confirmed!</p>
              <p className="text-sm">Tap to View on Basescan</p>
            </div>
          )}

          {fetchPriceError.length > 0 && (
            <div className="text-red-600 dark:text-red-400 text-sm mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}>
              {fetchPriceError.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '6px' }}>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
