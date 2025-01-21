import React from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title: string;
    artist: string;
    description: string;
    minted: string;
    collection: string;
  };
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[90%] md:max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-press-start">{image.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-press-start"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/2 aspect-square relative rounded-xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          <div className="w-full md:w-1/2 space-y-3 md:space-y-4">
            <div>
              <h3 className="text-gray-500 font-press-start text-xs md:text-sm mb-1">ARTIST</h3>
              <p className="font-press-start text-sm md:text-base">{image.artist}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs md:text-sm mb-1">DESCRIPTION</h3>
              <p className="font-press-start text-sm md:text-base">{image.description}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs md:text-sm mb-1">MINTED</h3>
              <p className="font-press-start text-sm md:text-base">{image.minted}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs md:text-sm mb-1">COLLECTION</h3>
              <p className="font-press-start text-sm md:text-base">{image.collection}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 