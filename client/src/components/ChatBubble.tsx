"use client";


import {  Send, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";




let KabirData = [
        { role: "user", content: "" },
        { role: "kabir das", content: "Namaste, I am Kabir Das—a 15th-century poet, mystic, and weaver who spoke of love, truth, and the divine within; ask me anything, and let us reflect together." },
        
    ];
let GuruNanakData = [
        { role: "user", content: "" },
        { role: "guru nanak dev", content: "Sat Shri Akal, I am Guru Nanak Dev—the founder of Sikhism, a traveler, teacher, and seeker of oneness; ask me anything, and let us walk the path of truth together." },
        
    ];
let JKData = [
        { role: "user", content: "" },
        { role: "j. krishnamurti", content: "I am J. Krishnamurti—a thinker who invites you to question all beliefs and discover freedom through self-awareness. Ask me anything, and let us explore truth together." },
        
    ];



type ChatBubbleProps = {
    guide: string;
}

export function ChatBubble({guide}: ChatBubbleProps) {
  const [messages, setMessages] = useState<{role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputLength = input.trim().length;

  useEffect(() => {
    const stored = localStorage.getItem(guide)
    if(stored){
        try{
            const parsed = JSON.parse(stored);
            if(guide === "guru nanak dev"){
                GuruNanakData = parsed
            }else if(guide === "j. krishnamurti"){
                JKData = parsed
            }else{
                KabirData = parsed
            }
            setMessages([...parsed])
            return;
        }catch(e){
            console.error("Failed to parse stored messages:", e);
        }
    }
    if(guide === "guru nanak dev"){
        setMessages(GuruNanakData);
        localStorage.setItem('guru nanak dev', JSON.stringify(GuruNanakData))
    }else if(guide === "j. krishnamurti"){
        setMessages(JKData)
        localStorage.setItem('j. krishnamurti', JSON.stringify(JKData))
    }else{
        setMessages(KabirData)
        localStorage.setItem('kabir das', JSON.stringify(KabirData))
    }
  }, [guide]); 

    async function fetchMessages() {
            setIsLoading(true);
            
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: messages,
                        message: input,
                        guide: guide,
                    }),
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
                const response = await fetch("https://discover-yourself-ai-backend.onrender.com", options);
                const data = await response.text();
                // setMessages(data);
                if(guide === "kabir das"){
                    KabirData.push({role: 'kabir das', content: data})
                    setMessages([...KabirData])
                    localStorage.setItem('kabir das', JSON.stringify(KabirData))
                }else if(guide === "guru nanak dev"){
                    GuruNanakData.push({role: 'guru nanak dev', content: data})
                    setMessages([...GuruNanakData])
                    localStorage.setItem('guru nanak dev', JSON.stringify(GuruNanakData))
                }else if(guide === "j. krishnamurti"){
                    JKData.push({role: "j. krishnamurti", content: data})
                    setMessages([...JKData])
                    localStorage.setItem('j. krishnamurti', JSON.stringify(JKData))
                }
            }catch(error){
                console.error("failed to fetch messages:", error)
            }finally{
                setIsLoading(false);
            }
        }

     function ImageSelect(guide: string){
        if(guide === "kabir das"){
            return "kabir.jfif"
        }else if(guide === "guru nanak dev"){
            return "gurunanak.webp"
        }else if(guide === "j. krishnamurti"){
            return "jk.jpg"
        }
    }
    function handleSubmit(event: React.FormEvent){
                event.preventDefault();
                if (inputLength === 0) return;
                if(guide === "kabir das"){
                    KabirData.push({role: "user", content: input})
                    localStorage.setItem(guide, JSON.stringify(KabirData))
                    setMessages([...KabirData])
                }else if(guide === "guru nanak dev"){
                    GuruNanakData.push({role: "user", content: input})
                    localStorage.setItem(guide, JSON.stringify(GuruNanakData))
                    setMessages([...GuruNanakData])
                }else if(guide === "j. krishnamurti"){
                    JKData.push({role: "user", content: input})
                    localStorage.setItem(guide, JSON.stringify(JKData))
                    setMessages([...JKData])
                }
                setInput("");
        
    }
    
    function handleDelete(){
        if(guide === "kabir das"){
            KabirData.splice(2,KabirData.length)
            setMessages([...KabirData])
            localStorage.setItem(guide, JSON.stringify(KabirData))
        }else if(guide === "guru nanak dev"){
            GuruNanakData.splice(2, GuruNanakData.length)
            setMessages([...GuruNanakData])
            localStorage.setItem(guide, JSON.stringify(GuruNanakData))
        }else{
            JKData.splice(2, JKData.length)
            setMessages([...JKData])
            localStorage.setItem(guide, JSON.stringify(JKData))
        }
    }

  return (
    <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center border-b">
        <div className="flex items-center space-x-4">
            <SidebarTrigger className="block md:hidden"/>
          <Avatar>
            <AvatarImage src={`${ImageSelect(guide)}`} alt="Image" />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{guide.toUpperCase()}</p>
          </div>
        </div>
            <Button size="icon" variant="outline" className="ml-auto rounded-full cursor-pointer" onClick={handleDelete}>
              <Trash className="size-5" />
              <span className="sr-only">Actions</span>
            </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4 px-4">
            {messages.map((message, index) => (
                message.content.length > 0 ? (
            <div
                key={index}
                className={cn(
                "flex w-fit max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>): null
            ))}
            {isLoading && (
                <div className="bg-muted w-fit max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm">
                    Thinking...
                </div>
            )}
        </CardContent>

        <CardFooter className="shrink-0 border-t p-4">
            <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
            >
            <Input
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" className="cursor-pointer" disabled={inputLength === 0} onClick={fetchMessages}>
                <Send className="size-5" />
                <span className="sr-only">Send</span>
            </Button>
            </form>
        </CardFooter>
    

    </Card>
  );
}
