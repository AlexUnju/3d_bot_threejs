import { ChatbotCanvas } from '@/components/ChatbotCanvas';
import { TextToSpeech } from '@/components/TextToSpeech';
import { IsPlayingProvider } from './context/IsPlayingContext';

export default function Home() {
  return (
    <main className="h-full">
    <IsPlayingProvider>
    <TextToSpeech />
    <ChatbotCanvas/>
    </IsPlayingProvider>
   </main>
  );
}
