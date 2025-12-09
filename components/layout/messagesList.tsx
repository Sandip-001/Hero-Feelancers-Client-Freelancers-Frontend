import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check, CheckCheck, MessageCircle, Search } from 'lucide-react';
import React from 'react';

interface Message {
  id: string;
  name: string;
  avatar?: string;
  preview: string;
  time: string;
  unread?: boolean;
  online?: boolean;
  typing?: boolean;
  tick?: 'single' | 'double' | 'blue-double';
  unreadCount?: number;
}

interface MessageListProps {
  className?: string;
  onSelectMessage?: (messageId: string) => void;
  selectedMessageId?: string;
}

const messages: Message[] = [
  {
    id: '1',
    name: 'John Doe',
    preview: 'I want to (We\'re lo...',
    time: '16:45',
    unread: true,
    online: true,
    unreadCount: 2,
    tick: "double"
  },
  {
    id: '2',
    name: 'Travis Barker',
    avatar: '/avatars/travis.jpg',
    preview: 'I will tring ...',
    time: '16:45',
    tick: "blue-double",
    online: false,
  },
  {
    id: '3',
    name: 'Kate Moss',
    preview: '... is typing',
    time: '16:45',
    typing: true,
    online: true,
  },
  {
    id: '4',
    name: 'Robert Parker',
    preview: 'Awesome!!',
    time: '16:05',
    unread: true,
    unreadCount: 1,
    online: false,
    tick: "single"
  },
];

// fill more rows
for (let i = 5; i <= 20; i++) {
  messages.push({
    id: i.toString(),
    name: 'Sam Smith',
    preview: 'Want to see the kics on',
    time: '16:45',
    online: i % 2 === 0, // random online/offline
    tick: i % 2 === 0 ? "double" : "single"
  });
}

export default function MessageList({ className, onSelectMessage, selectedMessageId }: MessageListProps) {
  const [sortBy, setSortBy] = React.useState('Newest');

  return (
    <div className={cn("  bg-white border-r border-gray-200 flex flex-col h-full", className)}>

      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          <h2 className="font-semibold text-gray-800">Messages</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-9 h-9 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Sort */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
          <span>Sort by:</span>
          <button
            className="text-blue-600 font-medium flex items-center gap-1"
            onClick={() => setSortBy(sortBy === 'Newest' ? 'Oldest' : 'Newest')}
          >
            {sortBy}
            <span className="text-gray-400">▼</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">

        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => onSelectMessage?.(message.id)}
            className={cn(
              "w-full p-3 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100",
              selectedMessageId === message.id && "bg-gray-50"
            )}
          >

            {/* Avatar with online/offline status */}
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                  {message.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* Green for online, Blue for offline */}
              <div
                className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                  message.online ? "bg-green-500" : "bg-blue-500"
                )}
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 min-w-0 text-left">

              <div className="flex items-center justify-between mb-1">
                <h3
                  className={cn(
                    "font-medium text-sm truncate",
                    message.unread ? "text-gray-900" : "text-gray-700"
                  )}
                >
                  {message.name}
                </h3>

                <span className="text-xs text-gray-500 ml-2">{message.time}</span>
              </div>

              {/* Typing Effect */}
              {message.typing ? (
                <p className="text-xs text-blue-600 font-medium animate-pulse">
                  ... is typing
                </p>
              ) : (
                <p className="text-xs text-gray-500 truncate flex items-center gap-1 ">

                  {message.preview}

                  {/* WhatsApp Ticks */}
                  {message.tick === "single" && (
                    <Check className="w-3 h-3 text-gray-400" />
                  )}
                  {message.tick === "double" && (
                    <CheckCheck className="w-3 h-3 text-gray-400" />
                  )}
                  {message.tick === "blue-double" && (
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  )}
                </p>
              )}
            </div>

            {/* Unread message count (badge) */}
            {message.unreadCount ? (
              <div className="bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {message.unreadCount}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
