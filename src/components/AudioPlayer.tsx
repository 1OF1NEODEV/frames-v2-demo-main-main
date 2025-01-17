import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AudioPlayerProps {
  audioSrc: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50">
      <audio ref={audioRef} src={audioSrc} />
      <button
        onClick={togglePlay}
        className={`p-2 transition-transform hover:scale-110 ${isPlaying ? 'animate-pulse' : ''}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <Image
          src={isPlaying ? "/icons8-speaker-32.png" : "/icons8-mute-32.png"}
          alt={isPlaying ? "Pause" : "Play"}
          width={32}
          height={32}
          className="transition-opacity hover:opacity-100 opacity-70"
        />
      </button>
    </div>
  );
}

