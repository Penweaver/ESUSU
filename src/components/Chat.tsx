import React from 'react';
import { Send, Paperclip, Shield, User as UserIcon, File } from 'lucide-react';
import { ChatMessage, User } from '../types';

interface ChatProps {
  currentUser: User;
  messages: ChatMessage[];
  onSendMessage: (text: string, file?: File) => void;
}

export const Chat: React.FC<ChatProps> = ({ currentUser, messages, onSendMessage }) => {
  const [inputText, setInputText] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] glass rounded-[2.5rem] overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-border flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            {currentUser.role === 'ADMIN' ? <UserIcon className="text-primary" /> : <Shield className="text-primary" />}
          </div>
          <div>
            <h3 className="font-bold text-white">
              {currentUser.role === 'ADMIN' ? 'Member Support' : 'Admin Support'}
            </h3>
            <p className="text-xs text-success flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                    isMe 
                      ? 'bg-primary text-background font-medium rounded-tr-none' 
                      : 'bg-white/5 text-white border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.fileUrl && (
                      <div className={`mt-3 p-3 rounded-xl flex items-center gap-3 ${isMe ? 'bg-background/20' : 'bg-white/5'}`}>
                        <File size={18} />
                        <span className="text-xs font-bold truncate">payment_proof.pdf</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-2">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 grayscale">
            <MessageSquare size={64} className="mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">No messages yet</p>
            <p className="text-xs">Start a conversation with support.</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-white/5">
        <form onSubmit={handleSend} className="flex items-center gap-4">
          <button type="button" className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="p-4 rounded-2xl bg-primary text-background font-bold hover:glow-primary transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const MessageSquare = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
