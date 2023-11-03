"use client";
import React, { FormEvent, useContext, useState } from 'react';
import { sendTextToOpenAi } from '@/utils/sendTextToOpenAi';
import { AppContext } from '@/app/context/IsPlayingContext';

export const TextToSpeech = () => {
    const [userText, setUserText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {isPlaying, setIsPlaying} = useContext(AppContext);
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    const voices = synth?.getVoices();
    const selectedVoices = voices?.find((voices) => voices.name === "Google español");

    const speak = (textToSpeak: string) => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const synth = window.speechSynthesis;

        utterance.rate = 1;
        utterance.voice = selectedVoices!;

        synth?.speak(utterance);
        setIsPlaying(true);
        utterance.onend = () => {
            setIsPlaying(false);
        };
    };


    async function handleUserText(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (userText === "") return alert("Ingresa un texto");
        setIsLoading(true);
        try {
          const message = await sendTextToOpenAi(userText);
          speak(message);
        } catch (error) {
          let message = "";
          if (error instanceof Error) message = error.message;
          console.log(message);
        } finally {
          setIsLoading(false);
          setUserText("");
        }
      }


   

    return (
        <div className='relative z-50'>
            <form
                onSubmit={handleUserText}
                className='absolute top-[700px] space-x-2 pl-2 pt-1 ' >
                <input
                    value={userText}
                    onChange={event => setUserText(event.target.value)}
                    type="text" className='bg-[#186e74] max-w-screen-xl border border-[#000]/80 
                    outline-none rounded-lg placeholder:text-[#ffffff]
                    p-2 text-white'
                    placeholder='¿Que quieres saber?...'/>

                <button
                    disabled={isLoading}
                    className='bg-[#186e74] text-[#ffffff] p-2 border border-[#000000] rounded-lg
             disabled:text-green-900 disabled:cursor-not-allowed disabled:bg-yellow-300 hover:scale-110
              hover:text-black hover:bg-[#166152] duration-300 transition-all '
                >
                    {isLoading ? 'Cargando...' : 'Hablar'}
                </button>
            </form>
        </div>
    );
};


