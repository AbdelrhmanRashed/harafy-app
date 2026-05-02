import { BotMessageSquare, ChevronDown, Send, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDynamicPrompt } from './ModelAi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/utils';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type Message = {
  id: number;
  text: string;
  role: 'user' | 'bot';
};

// ─── Typing dots indicator ────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-primary/60 block h-2 w-2 rounded-full"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ─── Cursor blink for streaming text ─────────────────────────
function StreamingCursor() {
  return (
    <motion.span
      className="bg-primary ml-0.5 inline-block h-3.5 w-0.5 align-middle"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity }}
    />
  );
}

// ─── Single message bubble ────────────────────────────────────
function MessageBubble({
  msg,
  isStreaming,
  userAvatar,
  userInitial,
}: {
  msg: Message;
  isStreaming: boolean;
  userAvatar?: string;
  userInitial: string;
}) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <Avatar className="h-7 w-7 shrink-0 ring-2 ring-white/10">
        {isUser ? (
          <>
            <AvatarImage src={getImageUrl(userAvatar)} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {userInitial}
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-black text-white">
            AI
          </AvatarFallback>
        )}
      </Avatar>

      <div
        className={`relative max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-bl-sm'
            : 'bg-secondary/80 text-secondary-foreground rounded-br-sm'
        }`}
        dir="rtl"
      >
        {isStreaming && !isUser && msg.text === '' ? (
          <TypingDots />
        ) : (
          <>
            {msg.text}
            {isStreaming && !isUser && <StreamingCursor />}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────
const HarafyBot = ({
  onServiceAction,
}: {
  onServiceAction: (data: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now(), text: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-3-flash-preview',
        systemInstruction: getDynamicPrompt(user),
      });

      const history = messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const chat = model.startChat({ history });

      const botMessageId = Date.now() + 1;
      setStreamingId(botMessageId);
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, text: '', role: 'bot' },
      ]);

      const result = await chat.sendMessageStream(input);
      let fullText = '';

      for await (const chunk of result.stream) {
        fullText += chunk.text();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: fullText.split(/\[Action\]/i)[0] }
              : msg,
          ),
        );
      }

      setStreamingId(null);

      const actionMatch = fullText.match(/\[Action\](.*?)\[\/Action\]/i);
      if (actionMatch) {
        try {
          onServiceAction(JSON.parse(actionMatch[1]));
        } catch (e) {
          console.error('JSON parse error:', e);
        }
      }
    } catch (err) {
      console.error('Bot error:', err);
      setStreamingId(null);
    } finally {
      setIsTyping(false);
    }
  };

  const userInitial = user?.fullName?.split(' ')[0].at(0)?.toUpperCase() ?? 'U';

  return (
    <>
      {/* ── Floating toggle button ──────────────────────────── */}
      <div className="fixed right-4 bottom-20 z-[1000] md:bottom-6">
        {/* Pulse glow ring */}
        <motion.div
          className="from-primary absolute inset-0 rounded-full bg-gradient-to-br to-violet-500 opacity-60 blur-md"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((v) => !v)}
          className="from-primary relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br to-violet-600 text-white shadow-xl"
          aria-label="فتح الدردشة"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BotMessageSquare className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat panel ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-border/60 bg-background/80 fixed right-4 bottom-38 z-[1000] flex h-[500px] w-[340px] flex-col overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl md:bottom-24"
          >
            {/* Header */}
            <div className="from-primary/10 border-border/40 flex shrink-0 items-center gap-3 border-b bg-gradient-to-r to-violet-500/10 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 shadow-md">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1" dir="rtl">
                <p className="text-foreground text-sm font-black">Harafy Bot</p>
                <p className="text-muted-foreground text-[11px]">
                  {isTyping ? (
                    <span className="text-primary font-semibold">يكتب...</span>
                  ) : (
                    'مساعدك الذكي'
                  )}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="scrollbar-thin scrollbar-thumb-border flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full flex-col items-center justify-center gap-3 text-center"
                  dir="rtl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/20 to-blue-600/20">
                    <Sparkles className="text-primary h-7 w-7" />
                  </div>
                  <p className="text-foreground text-sm font-bold">
                    مرحباً! أنا Harafy Bot
                  </p>
                  <p className="text-muted-foreground max-w-[200px] text-xs leading-relaxed">
                    أخبرني بالخدمة التي تحتاجها وسأساعدك في إيجاد أفضل الحرفيين
                  </p>
                </motion.div>
              )}

              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isStreaming={streamingId === msg.id}
                  userAvatar={user?.pictureUrl!}
                  userInitial={userInitial}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-border/40 bg-background/60 flex shrink-0 items-center gap-2 border-t px-3 py-2.5 backdrop-blur-sm">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب رسالتك..."
                dir="rtl"
                disabled={isTyping}
                className="text-foreground placeholder:text-muted-foreground bg-secondary/60 flex-1 rounded-xl border-0 px-3 py-2 text-sm transition outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="from-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br to-violet-600 text-white shadow-md transition disabled:opacity-40"
                aria-label="إرسال"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HarafyBot;
