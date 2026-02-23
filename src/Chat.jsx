import React from 'react';
import { ArrowLeft, Search, MoreVertical, Send, CheckCheck } from 'lucide-react';
import './Chat.css';
import AppBar from './components/AppBar';

const Chat = ({ onBack }) => {
    const chats = [
        {
            id: 1,
            name: "Warung Makan Barokah",
            lastMsg: "Pesanan ayam penyetnya sedang diproses ya kak, mohon ditunggu.",
            time: "10:25",
            unread: 2,
            avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=150&auto=format&fit=crop",
            online: true
        },
        {
            id: 2,
            name: "Toko Batik Madura",
            lastMsg: "Siap kak, untuk ukuran XL masih ready stock.",
            time: "Kemarin",
            unread: 0,
            avatar: "https://images.unsplash.com/photo-1590736962237-fa169cb85042?q=80&w=150&auto=format&fit=crop",
            online: false
        },
        {
            id: 3,
            name: "Kurir - Ahmad Jayus",
            lastMsg: "Saya sudah di depan gerbang perumahan ya.",
            time: "Kemarin",
            unread: 0,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
            online: true
        },
        {
            id: 4,
            name: "Craftsmanship Jati",
            lastMsg: "Pengiriman furniture akan dilakukan lusa.",
            time: "Senin",
            unread: 0,
            avatar: "https://images.unsplash.com/photo-1581417478175-a9ef18f210c1?q=80&w=150&auto=format&fit=crop",
            online: false
        }
    ];

    return (
        <div className="chat-view">
            {/* Header */}
            {/* Header */}
            <AppBar
                title="Pesan"
                onBack={onBack}
                rightIcon={<Search size={22} color="var(--primary)" />}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            {/* Chat List */}
            <div className="chat-content">
                <div className="chat-list">
                    {chats.map(chat => (
                        <div key={chat.id} className="chat-item">
                            <div className="avatar-wrapper">
                                <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                                {chat.online && <span className="online-indicator"></span>}
                            </div>
                            <div className="chat-info">
                                <div className="chat-header">
                                    <h3 className="chat-name">{chat.name}</h3>
                                    <span className="chat-time">{chat.time}</span>
                                </div>
                                <div className="chat-footer">
                                    <p className={`chat-msg ${chat.unread > 0 ? 'unread' : ''}`}>
                                        {chat.unread === 0 && <CheckCheck size={14} className="read-icon" />}
                                        {chat.lastMsg}
                                    </p>
                                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Button for New Chat */}
            <button className="new-chat-fab">
                <Send size={24} color="white" />
            </button>
        </div>
    );
};

export default Chat;
