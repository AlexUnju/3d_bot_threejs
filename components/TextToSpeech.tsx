"use client";
import React, { FormEvent, useState } from 'react'

export const TextToSpeech = () => {
    const [ userText, setUserText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleUserText = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault(); 
            console.log(userText);
             }
    
  return (
    <div className='relative top-0 z-50'>
        <form onSubmit={handleUserText} className='absolute top-[800px] left-[30px] space-x-2 pt-2'>
            <input 
            value={userText}
            onChange={event => setUserText(event.target.value)}
            type="text" className='bg-transparent w-[510px] border border-[#C441FF]/80 
            outline-none rounded-lg placeholder:text-[#C441FF]
            p-2 text-[#C441FF]' 
            placeholder='¿Que quieres saber?...'/>
            <button className='text-[#C441FF] p-2 border border-[#C441FF] rounded-lg
             disabled:text-blue-100 disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-110
              hover:text-black hover:bg-[#C441FF] duration-300 transition-all '>Preguntar</button>
        </form>
    </div>
  );
};

