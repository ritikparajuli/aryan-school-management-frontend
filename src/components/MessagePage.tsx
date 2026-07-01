// src/components/MessagePage.tsx
import { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  ArrowLeft,
  Check,
  CheckCheck,
  Clock,
  Image,
  File,
  Smile,
  Mic,
  Users as UsersIcon,
  Plus,
  X,
  Pin,
  Bell,
  Archive,
  Trash2,
  Star,
  UserPlus,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  messages: Message[];
  role?: "student" | "teacher" | "admin";
}

interface MessagePageProps {
  role: "Teacher" | "Student" | "Admin";
  userName: string;
}

const mockConversations: Record<string, Conversation[]> = {
  Teacher: [
    {
      id: "1",
      name: "Aarav Sharma",
      lastMessage: "Thank you for the feedback!",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      role: "student",
      messages: [
        { id: "1", sender: "Aarav Sharma", content: "Ma'am, I have a question about the assignment.", timestamp: "10:30 AM", isOwn: false, status: "read" },
        { id: "2", sender: "Richa Ma'am", content: "Sure, what would you like to know?", timestamp: "10:32 AM", isOwn: true, status: "read" },
        { id: "3", sender: "Aarav Sharma", content: "The deadline is next week, right?", timestamp: "10:33 AM", isOwn: false, status: "read" },
        { id: "4", sender: "Richa Ma'am", content: "Yes, it's due next Friday.", timestamp: "10:35 AM", isOwn: true, status: "read" },
        { id: "5", sender: "Aarav Sharma", content: "Thank you for the feedback!", timestamp: "10:36 AM", isOwn: false, status: "read" },
      ]
    },
    {
      id: "2",
      name: "Neha Patel",
      lastMessage: "I've submitted my assignment.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      role: "student",
      messages: [
        { id: "1", sender: "Neha Patel", content: "Ma'am, I've submitted my assignment.", timestamp: "1:00 PM", isOwn: false, status: "read" },
        { id: "2", sender: "Richa Ma'am", content: "Great! I'll review it soon.", timestamp: "1:05 PM", isOwn: true, status: "read" },
      ]
    },
    {
      id: "3",
      name: "Rahul Singh",
      lastMessage: "Attendance marked for today.",
      timestamp: "2 hours ago",
      unread: 1,
      online: true,
      role: "student",
      messages: [
        { id: "1", sender: "Rahul Singh", content: "Ma'am, attendance marked for today.", timestamp: "2:00 PM", isOwn: false, status: "delivered" },
      ]
    },
  ],
  Student: [
    {
      id: "1",
      name: "Richa Ma'am",
      lastMessage: "Yes, it's due next Friday.",
      timestamp: "10:35 AM",
      unread: 0,
      online: true,
      role: "teacher",
      messages: [
        { id: "1", sender: "Aarav Sharma", content: "Ma'am, I have a question about the assignment.", timestamp: "10:30 AM", isOwn: true, status: "read" },
        { id: "2", sender: "Richa Ma'am", content: "Sure, what would you like to know?", timestamp: "10:32 AM", isOwn: false, status: "read" },
        { id: "3", sender: "Aarav Sharma", content: "The deadline is next week, right?", timestamp: "10:33 AM", isOwn: true, status: "read" },
        { id: "4", sender: "Richa Ma'am", content: "Yes, it's due next Friday.", timestamp: "10:35 AM", isOwn: false, status: "read" },
      ]
    },
    {
      id: "2",
      name: "Prof. Rajesh Kumar",
      lastMessage: "Your project is well-done.",
      timestamp: "30 min ago",
      unread: 2,
      online: false,
      role: "teacher",
      messages: [
        { id: "1", sender: "Prof. Rajesh Kumar", content: "Your project is well-done.", timestamp: "11:30 AM", isOwn: false, status: "read" },
        { id: "2", sender: "Aarav Sharma", content: "Thank you sir!", timestamp: "11:32 AM", isOwn: true, status: "sent" },
      ]
    },
  ],
  Admin: [
    {
      id: "1",
      name: "Richa Ma'am",
      lastMessage: "New faculty orientation completed.",
      timestamp: "3 hours ago",
      unread: 1,
      online: false,
      role: "teacher",
      messages: [
        { id: "1", sender: "Richa Ma'am", content: "New faculty orientation completed.", timestamp: "3:00 PM", isOwn: false, status: "delivered" },
      ]
    },
    {
      id: "2",
      name: "Aarav Sharma",
      lastMessage: "Request for additional resources.",
      timestamp: "1 day ago",
      unread: 0,
      online: true,
      role: "student",
      messages: [
        { id: "1", sender: "Aarav Sharma", content: "Sir, I need additional resources for the project.", timestamp: "Yesterday", isOwn: false, status: "read" },
        { id: "2", sender: "Admin", content: "I'll arrange that for you.", timestamp: "Yesterday", isOwn: true, status: "read" },
      ]
    },
  ]
};

export function MessagePage({ role, userName }: MessagePageProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const conversations = mockConversations[role] || [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768 && selectedConversation) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: userName,
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: "sent"
    };
    
    selectedConversation.messages.push(newMessage);
    selectedConversation.lastMessage = messageInput.trim();
    selectedConversation.timestamp = "Just now";
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'teacher':
        return 'bg-purple-500';
      case 'student':
        return 'bg-blue-500';
      case 'admin':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background rounded-xl overflow-hidden border shadow-sm">
      {/* Conversations List */}
      {(showSidebar || !selectedConversation) && (
        <div className={cn(
          "flex flex-col border-r bg-card/50",
          isMobileView && selectedConversation ? "hidden" : "w-full md:w-80 lg:w-96"
        )}>
          {/* Header */}
          <div className="p-4 border-b bg-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Messages</h2>
                <p className="text-sm text-muted-foreground">
                  {conversations.length} conversations
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border bg-background text-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <UsersIcon className="h-12 w-12 mb-3 opacity-20" />
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv);
                    if (isMobileView) setShowSidebar(false);
                  }}
                  className={cn(
                    "w-full p-4 text-left transition hover:bg-muted/50 flex items-start gap-3",
                    selectedConversation?.id === conv.id && "bg-muted/50"
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-medium",
                      getRoleColor(conv.role)
                    )}>
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="flex-shrink-0 min-w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center px-1">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Chat Area */}
      {selectedConversation ? (
        <div className={cn(
          "flex-1 flex flex-col bg-background",
          !showSidebar && isMobileView ? "w-full" : "w-full"
        )}>
          {/* Chat Header */}
          <div className="p-4 border-b bg-card/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="p-1 rounded-lg hover:bg-muted transition"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm",
                  getRoleColor(selectedConversation.role)
                )}>
                  {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                </div>
                {selectedConversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{selectedConversation.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <Video className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <Info className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col",
                  message.isOwn ? "items-end" : "items-start"
                )}
              >
                <div className="flex items-end gap-2 max-w-[70%]">
                  {!message.isOwn && (
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0",
                      getRoleColor(selectedConversation.role)
                    )}>
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 break-words",
                    message.isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1 mt-1 text-xs text-muted-foreground",
                  message.isOwn ? "pr-7" : "pl-7"
                )}>
                  <span>{message.timestamp}</span>
                  {message.isOwn && getStatusIcon(message.status)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-card/50">
            <div className="flex items-end gap-2">
              <button className="p-2 rounded-lg hover:bg-muted transition flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition flex-shrink-0">
                <Smile className="h-5 w-5" />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full min-h-[44px] max-h-32 px-4 py-2.5 rounded-lg border bg-background resize-none outline-none transition focus:border-primary text-sm"
                  style={{ height: 'auto' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={cn(
                  "p-2 rounded-lg transition flex-shrink-0",
                  messageInput.trim()
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-muted-foreground">
          <UsersIcon className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Select a conversation</p>
          <p className="text-sm">Choose a contact to start messaging</p>
        </div>
      )}
    </div>
  );
}