"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import Lightbox from "~/components/Lightbox";
import styles from '~/styles/Demo.module.css';

const customStyles = {
  pressStart: {
    fontFamily: '"Press Start 2P", cursive',
  },
};

interface GalleryImage {
  src: string;
  title: string;
  artist: string;
  description: string;
  minted: string;
  collection: string;
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages = [
    {
      src: "/DON TRUMP.png",
      title: "DON TRUMP",
      artist: "1OF1NEO",
      description: "68 × 70 px",
      minted: "January 20, 2024",
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
      src: "/SKIMASK_DON.gif",
      title: "SKI MASK DON",
      artist: "1OF1NEO",
      description: "40 × 48 px",
      minted: "December 13, 2024",
      collection: "Don's Doodles"
    }
  ];

  return (
    <main className={`flex flex-col items-center justify-center min-h-screen ${styles.container}`}>
      <div className="max-w-[324px] mx-auto">
        <Card className="bg-[#FFD700] text-black p-4 rounded-3xl overflow-hidden border-4 border-black shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3)]">
          {/* Main Content Area */}
          <div className="bg-white p-4 rounded-xl border-2 border-black">
            {/* Gallery Title */}
            <h1 className="text-[#FFD700] mb-6 text-center" style={{ ...customStyles.pressStart, fontSize: '24px' }}>
              GALLERY
            </h1>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
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
                  </div>
                </div>
              ))}
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

      {selectedImage && (
        <Lightbox 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
          isOpen={selectedImage !== null}
        />
      )}
    </main>
  );
} 