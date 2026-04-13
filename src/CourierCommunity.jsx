import { useState } from 'react';
import {
    ChevronLeft,
    MessageCircle,
    ThumbsUp,
    Send,
    MapPin,
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    User
} from 'lucide-react';
import './CourierCommunity.css';
import AppBar from './components/AppBar';

const CourierCommunity = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('feed'); // feed, leaderboard
    const [newPost, setNewPost] = useState('');

    // Mock data - replace with actual data from backend
    const posts = [
        {
            id: 1,
            author: 'Andi Setiawan',
            level: 'Champion',
            badge: '⭐',
            timestamp: '2 jam lalu',
            category: 'tips',
            content: 'Tips: Kalau delivery ke daerah Gubeng, hindari Jl. Mayjen Sungkono jam 17:00-19:00. Macet parah! Lebih baik lewat gang samping.',
            likes: 24,
            comments: 8,
            liked: false
        },
        {
            id: 2,
            author: 'Budi Raharjo',
            level: 'Explorer',
            badge: '🌟',
            timestamp: '4 jam lalu',
            category: 'question',
            content: 'Ada yang tahu bengkel motor murah di daerah Tegalsari? Perlu ganti ban nih, budget terbatas 😅',
            likes: 12,
            comments: 15,
            liked: true
        },
        {
            id: 3,
            author: 'Citra Dewi',
            level: 'Legend',
            badge: '👑',
            timestamp: '1 hari lalu',
            category: 'warning',
            content: '⚠️ Hati-hati kalau delivery ke area Keputih malam hari. Ada jalan yang lampu jalannya mati. Stay safe teman-teman!',
            likes: 45,
            comments: 12,
            liked: false
        },
        {
            id: 4,
            author: 'Dedi Santoso',
            level: 'Rookie',
            badge: '🚀',
            timestamp: '2 hari lalu',
            category: 'achievement',
            content: 'Yeay! Hari ini pertama kali dapet 10 delivery dalam sehari! Terima kasih supportnya teman-teman 🙏',
            likes: 38,
            comments: 20,
            liked: true
        }
    ];

    const leaderboard = [
        { rank: 1, name: 'Andi Setiawan', level: 'Champion', badge: '👑', deliveries: 87, earnings: 1850000 },
        { rank: 2, name: 'Budi Raharjo', level: 'Champion', badge: '⭐', deliveries: 76, earnings: 1620000 },
        { rank: 3, name: 'Citra Dewi', level: 'Legend', badge: '👑', deliveries: 68, earnings: 1450000 },
        { rank: 4, name: 'Dedi Santoso', level: 'Explorer', badge: '🌟', deliveries: 62, earnings: 1320000 },
        { rank: 5, name: 'Eka Putri', level: 'Explorer', badge: '🌟', deliveries: 58, earnings: 1230000 }
    ];

    const handleLike = (postId) => {
        // Toggle like in backend
        console.log('Toggle like for post:', postId);
    };

    const handleComment = (postId) => {
        // Navigate to comments
        console.log('Open comments for post:', postId);
    };

    const handlePost = () => {
        if (newPost.trim()) {
            // Submit to backend
            console.log('New post:', newPost);
            setNewPost('');
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'tips':
                return <Lightbulb size={16} color="#fbb03b" />;
            case 'warning':
                return <AlertTriangle size={16} color="#ef4444" />;
            case 'question':
                return <MessageCircle size={16} color="#3b82f6" />;
            case 'achievement':
                return <TrendingUp size={16} color="#10b981" />;
            default:
                return null;
        }
    };

    const getCategoryLabel = (category) => {
        const labels = {
            tips: 'Tips',
            warning: 'Peringatan',
            question: 'Tanya',
            achievement: 'Pencapaian'
        };
        return labels[category] || '';
    };

    return (
        <div className="courier-community-container">
            <AppBar title="Komunitas Kurir" onBack={onBack} />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            {/* Tabs */}
            <div className="community-tabs">
                <button
                    className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feed')}
                >
                    Feed
                </button>
                <button
                    className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('leaderboard')}
                >
                    🏆 Leaderboard
                </button>
            </div>

            <div className="scroll-content" style={{ paddingBottom: '100px' }}>

                {activeTab === 'feed' && (
                    <>
                        {/* New Post Input */}
                        <div className="new-post-box card">
                            <textarea
                                placeholder="Bagikan tips, tanya sesuatu, atau sharing pengalaman..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                rows="3"
                            />
                            <button
                                className="btn-primary"
                                onClick={handlePost}
                                disabled={!newPost.trim()}
                            >
                                <Send size={16} />
                                Posting
                            </button>
                        </div>

                        {/* Feed */}
                        <div className="community-feed">
                            {posts.map(post => (
                                <div key={post.id} className="post-card card">
                                    <div className="post-header">
                                        <div className="author-info">
                                            <div className="author-avatar">
                                                <User size={20} color="var(--primary)" />
                                            </div>
                                            <div>
                                                <div className="author-name">
                                                    {post.author}
                                                    <span className="author-badge">{post.badge}</span>
                                                </div>
                                                <div className="post-meta">
                                                    <span className="post-level">{post.level}</span>
                                                    <span>•</span>
                                                    <span className="post-time">{post.timestamp}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-category">
                                            {getCategoryIcon(post.category)}
                                            <span>{getCategoryLabel(post.category)}</span>
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        {post.content}
                                    </div>

                                    <div className="post-actions">
                                        <button
                                            className={`action-btn ${post.liked ? 'liked' : ''}`}
                                            onClick={() => handleLike(post.id)}
                                        >
                                            <ThumbsUp size={16} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button
                                            className="action-btn"
                                            onClick={() => handleComment(post.id)}
                                        >
                                            <MessageCircle size={16} />
                                            <span>{post.comments}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'leaderboard' && (
                    <div className="leaderboard-content">
                        <div className="leaderboard-header card">
                            <h3>🏆 Top Couriers Minggu Ini</h3>
                            <p>Performa terbaik dari Senin - Minggu</p>
                        </div>

                        <div className="leaderboard-list">
                            {leaderboard.map((courier) => (
                                <div key={courier.rank} className={`leaderboard-item card ${courier.rank <= 3 ? 'top-three' : ''}`}>
                                    <div className="rank-badge" style={{
                                        background: courier.rank === 1 ? '#fbb03b' :
                                            courier.rank === 2 ? '#94a3b8' :
                                                courier.rank === 3 ? '#cd7f32' : 'transparent',
                                        color: courier.rank <= 3 ? 'white' : 'var(--text-muted)'
                                    }}>
                                        #{courier.rank}
                                    </div>

                                    <div className="courier-info-lb">
                                        <div className="courier-name-lb">
                                            {courier.badge} {courier.name}
                                        </div>
                                        <div className="courier-level-lb">{courier.level}</div>
                                    </div>

                                    <div className="courier-stats-lb">
                                        <div className="stat-lb">
                                            <span className="stat-value-lb">{courier.deliveries}</span>
                                            <span className="stat-label-lb">deliveries</span>
                                        </div>
                                        <div className="stat-lb">
                                            <span className="stat-value-lb earnings">Rp {(courier.earnings / 1000).toFixed(0)}k</span>
                                            <span className="stat-label-lb">earnings</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="leaderboard-info card">
                            <p>Leaderboard direset setiap hari Senin pukul 00:00. Top 3 mendapat bonus spesial!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierCommunity;
