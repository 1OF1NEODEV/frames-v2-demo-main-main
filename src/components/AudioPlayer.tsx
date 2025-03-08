import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AudioPlayerProps {
  audioSrc: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Start playing automatically
    audio.play().catch(error => {
      console.log("Autoplay prevented:", error);
      setIsPlaying(false);
    });

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <button
        onClick={togglePlay}
        className={`p-1 transition-transform hover:scale-110 bg-white hover:bg-gray-100 rounded-full shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] ${isPlaying ? 'animate-pulse' : ''}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <Image
          src={isPlaying ? "/icons8-speaker-32.png" : "/icons8-mute-32.png"}
          alt={isPlaying ? "Pause" : "Play"}
          width={16}
          height={16}
          className="transition-opacity hover:opacity-100 opacity-70"
        />
      </button>
    </div>
  );
}

