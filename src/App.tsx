import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OpeningScreen } from './components/scenes/OpeningScreen';
import { FirstQuestion } from './components/scenes/FirstQuestion';
import { StoryScene } from './components/scenes/StoryScene';
import { CelebrationScene } from './components/scenes/CelebrationScene';
import { AudioPlayer } from './components/AudioPlayer';
import { content } from './data/content';

export default function App() {
  const [scene, setScene] = useState<'opening' | 'question' | 'story' | 'celebration'>('opening');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser until interaction
        setIsAudioPlaying(false);
      });
    }
  }, []);

  const handleStart = () => {
    setScene('question');
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(console.error);
      }
    }
  };

  const handleReset = () => {
    setScene('opening');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-pink/30 selection:text-white">
      <audio ref={audioRef} src={content.audio.bgmUrl} loop autoPlay />
      
      <AudioPlayer isPlaying={isAudioPlaying} onToggle={toggleAudio} />
      
      <AnimatePresence mode="wait">
        {scene === 'opening' && (
          <OpeningScreen key="opening" onNext={handleStart} />
        )}
        
        {scene === 'question' && (
          <FirstQuestion key="question" onYes={() => setScene('story')} />
        )}
        
        {scene === 'story' && (
          <StoryScene key="story" onAccepted={() => setScene('celebration')} />
        )}

        {scene === 'celebration' && (
          <CelebrationScene key="celebration" onReplay={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}
