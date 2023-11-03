import { ChatbotCanvas } from '@/components/ChatbotCanvas';
import { TextToSpeech } from '@/components/TextToSpeech';

export default function Home() {
  return (
    <main className="h-full">
    <TextToSpeech />
    <ChatbotCanvas/>
 
   </main>
  );
}
