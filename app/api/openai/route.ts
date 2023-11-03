import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function GET(request: Request){
    return new Response('Hello World');
}

export async function POST(request: Request){
    const {userText} = await request.json();

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userText}],
      });
      const aiMessage = chatCompletion.choices[0].message;
      console.log(aiMessage?.content);
      
      return NextResponse.json({
        message:
            aiMessage?.content || "perdon no se xD" },
    { status: 200 })
}

