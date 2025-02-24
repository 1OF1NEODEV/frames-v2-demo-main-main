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
      <div className="bg-white rounded-2xl w-full max-w-[450px] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-base font-press-start">{image.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-press-start"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-4">
            <div className="w-[300px] h-[300px] mx-auto relative">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-500 font-press-start text-xs mb-1">ARTIST</h3>
              <p className="font-press-start text-sm">{image.artist}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs mb-1">DESCRIPTION</h3>
              <p className="font-press-start text-sm">{image.description}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs mb-1">MINTED</h3>
              <p className="font-press-start text-sm">{image.minted}</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-press-start text-xs mb-1">COLLECTION</h3>
              <p className="font-press-start text-sm">{image.collection}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 