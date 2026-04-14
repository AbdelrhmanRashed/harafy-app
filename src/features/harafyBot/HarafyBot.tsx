import { BotIcon, BotMessageSquare, ChevronDown, X } from 'lucide-react'
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDynamicPrompt } from './ModelAi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from "framer-motion";

const genAI = new GoogleGenerativeAI('AIzaSyDtdVQXwWlgSdeywwkIjqzfgFwzKuJ7QtA');

type Message = {
    id: number;
    text: string;
    role: "user" | "bot"
};

const HarafyBot = ({ onServiceAction }: { onServiceAction: (data: any) => void }) => {



    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { user } = useAuthStore();

    // auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            role: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        // api 
        try {
            const model = genAI.getGenerativeModel({
                model: 'gemini-3-flash-preview',
                systemInstruction: getDynamicPrompt(user),
            });

            const history = messages.map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            }));

            const chat = model.startChat({
                history: history,
            });


            const botMessageId = Date.now() + 1;
            setMessages((prev) => [...prev, { id: botMessageId, text: "", role: "bot" }]);

            const result = await chat.sendMessageStream(input);
            let fullText = "";


            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                setMessages(prev => {
                    return prev.map(msg =>
                        msg.id === botMessageId
                            ? { ...msg, text: fullText.split(/\[Action\]/i)[0] }
                            : msg
                    );
                });
            }
            const actionMatch = fullText.match(/\[Action\](.*?)\[\/Action\]/i);
            if (actionMatch) {
                try {
                    const actionData = JSON.parse(actionMatch[1]);
                    onServiceAction(actionData);
                    console.log("🚀 AI Action Data:", actionData);
                } catch (error) {
                    console.error("JSON Parsing Error:", error);
                }
            }

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsTyping(false);
        }
    };
    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-30 flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "linear-gradient(45deg, #3b82f6, #7c3aed, #2563eb, #3b82f6)",
                    }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* زرار البوت الأساسي */}
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full text-xl shadow-lg relative bg-primary hover:bg-primary/90"
                >
                    {!isOpen ? <BotMessageSquare className="h-7! w-7!" /> : <ChevronDown className="h-7! w-7!" />}
                </Button>
            </div>

            {/* Chat Box */}
            {isOpen && (
                <Card className="fixed bottom-21 right-30 w-80 h-[400px] flex flex-col shadow-xl z-[1000]!">

                    {/* Header */}
                    <div className="pb-3 px-6 border-b font-semibold relative flex justify-between items-center">
                        <X className="cursor-pointer fill-primary text-primary" onClick={() => setIsOpen(false)} />
                        <div className="text-2xl text-primary font-black flex items-center gap-2">
                            <span>Harafy Bot</span>
                            <BotIcon className="inline-block mr-2 h-6 w-6" />

                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {msg.role === "bot" && (
                                    <Avatar>
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}

                                <div
                                    className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.role === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                        }`}
                                >
                                    {msg.text}
                                </div>

                                {msg.role === "user" && (
                                    <Avatar>
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    {/* Input */}
                    <div className="flex gap-2 p-2 border-t">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب رسالة..."
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button onClick={handleSend} disabled={isTyping}>Send</Button>
                    </div>
                </Card>
            )}
        </>
    );
}
export default HarafyBot;
