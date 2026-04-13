import { useState } from 'react';
import {
    ChevronLeft,
    User,
    Star,
    TrendingUp,
    Award,
    Target,
    Zap,
    Trophy,
    Calendar,
    MapPin,
    Bike
} from 'lucide-react';
import './CourierProfile.css';
import AppBar from './components/AppBar';

const CourierProfile = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('stats'); // stats, badges, quests

    // Mock courier data - replace with actual data from backend
    const courierData = {
        name: 'Andi Setiawan',
        phone: '628123456789',
        level: 3,
        levelName: 'Champion',
        levelBadge: '⭐',
        currentXP: 750,
        nextLevelXP: 1000,
        totalDeliveries: 342,
        rating: 4.8,
        completionRate: 98.5,
        totalEarnings: 8450000,
        vehicleType: 'motorcycle',
        plateNumber: 'L 1234 AB',
        zones: ['Gubeng - Airlangga', 'Tegalsari - Genteng'],
        joinDate: '2024-01-15',

        // Stats
        stats: {
            thisWeek: { deliveries: 42, earnings: 890000 },
            thisMonth: { deliveries: 187, earnings: 3850000 },
            avgDeliveryTime: 23, // minutes
            perfectDeliveries: 285, // 5-star ratings
            streak: 12 // consecutive days
        },

        // Badges & Achievements
        badges: [
            { id: 1, name: 'Early Bird', icon: '🌅', description: '50 deliveries sebelum jam 10', earned: true, date: '2024-01-20' },
            { id: 2, name: 'Speed Demon', icon: '⚡', description: 'Avg delivery < 20 menit', earned: true, date: '2024-02-01' },
            { id: 3, name: 'Perfect Week', icon: '💎', description: '7 hari berturut rating 5⭐', earned: true, date: '2024-02-05' },
            { id: 4, name: 'Rain Warrior', icon: '☔', description: '30+ delivery saat hujan', earned: false },
            { id: 5, name: 'Century', icon: '💯', description: '100 delivery dalam sebulan', earned: true, date: '2024-01-28' },
            { id: 6, name: 'Legend', icon: '👑', description: '500+ total deliveries', earned: false }
        ],

        // Active Quests
        activeQuests: [
            {
                id: 'Q1',
                name: 'Early Bird',
                description: 'Selesaikan 5 delivery sebelum jam 10 pagi',
                progress: 3,
                target: 5,
                reward: 25000,
                endsIn: '4 hari'
            },
            {
                id: 'Q2',
                name: 'Perfect Week',
                description: 'Rating 5⭐ untuk semua delivery minggu ini',
                progress: 18,
                target: 20,
                reward: 100000,
                endsIn: '2 hari'
            }
        ]
    };

    const levelInfo = [
        { level: 1, name: 'Rookie', minDeliveries: 0, badge: '🚀', color: '#94a3b8' },
        { level: 2, name: 'Explorer', minDeliveries: 50, badge: '🌟', color: '#3b82f6' },
        { level: 3, name: 'Champion', minDeliveries: 200, badge: '⭐', color: '#fbb03b' },
        { level: 4, name: 'Legend', minDeliveries: 500, badge: '👑', color: '#0ead98' }
    ];

    const currentLevel = levelInfo.find(l => l.level === courierData.level);
    const nextLevel = levelInfo.find(l => l.level === courierData.level + 1);

    return (
        <div className="courier-profile-container">
            <AppBar title="Profile Kurir" onBack={onBack} />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            <div className="scroll-content" style={{ paddingBottom: '40px' }}>

                {/* Header Card */}
                <div className="profile-header card">
                    <div className="profile-avatar">
                        <User size={48} color="var(--primary)" />
                    </div>
                    <div className="profile-info">
                        <div className="profile-name-row">
                            <h2>{courierData.name}</h2>
                            <div className="level-badge" style={{ background: currentLevel.color }}>
                                {currentLevel.badge} {currentLevel.name}
                            </div>
                        </div>
                        <div className="profile-meta">
                            <div className="meta-item">
                                <Bike size={14} />
                                <span>{courierData.plateNumber}</span>
                            </div>
                            <div className="meta-item">
                                <Calendar size={14} />
                                <span>Bergabung {new Date(courierData.joinDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Level Progress */}
                <div className="level-progress-card card">
                    <div className="level-header">
                        <div className="level-current">
                            <span className="level-badge-large" style={{ background: currentLevel.color }}>
                                {currentLevel.badge}
                            </span>
                            <div>
                                <h3>{currentLevel.name}</h3>
                                <p>Level {courierData.level}</p>
                            </div>
                        </div>
                        {nextLevel && (
                            <div className="level-next">
                                <span>→</span>
                                <div className="next-level-info">
                                    <span className="next-badge">{nextLevel.badge}</span>
                                    <span>{nextLevel.name}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {nextLevel && (
                        <>
                            <div className="xp-bar">
                                <div className="xp-fill" style={{ width: `${(courierData.currentXP / courierData.nextLevelXP) * 100}%` }}></div>
                            </div>
                            <div className="xp-text">
                                <span>{courierData.currentXP} / {courierData.nextLevelXP} XP</span>
                                <span>{courierData.nextLevelXP - courierData.currentXP} lagi ke {nextLevel.name}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="stats-overview">
                    <div className="stat-box card">
                        <Star size={20} color="#fbb03b" />
                        <div className="stat-value">{courierData.rating}</div>
                        <div className="stat-label">Rating</div>
                    </div>
                    <div className="stat-box card">
                        <Target size={20} color="#0ead98" />
                        <div className="stat-value">{courierData.totalDeliveries}</div>
                        <div className="stat-label">Total Delivery</div>
                    </div>
                    <div className="stat-box card">
                        <TrendingUp size={20} color="#3b82f6" />
                        <div className="stat-value">{courierData.completionRate}%</div>
                        <div className="stat-label">Success Rate</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="profile-tabs">
                    <button
                        className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stats')}
                    >
                        Statistik
                    </button>
                    <button
                        className={`tab ${activeTab === 'badges' ? 'active' : ''}`}
                        onClick={() => setActiveTab('badges')}
                    >
                        Badges ({courierData.badges.filter(b => b.earned).length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'quests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('quests')}
                    >
                        Quests ({courierData.activeQuests.length})
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'stats' && (
                    <div className="tab-content">
                        <div className="stats-card card">
                            <h3>Performance Minggu Ini</h3>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <span className="stat-label">Deliveries</span>
                                    <span className="stat-value">{courierData.stats.thisWeek.deliveries}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Earnings</span>
                                    <span className="stat-value">Rp {courierData.stats.thisWeek.earnings.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="stats-card card">
                            <h3>Performance Bulan Ini</h3>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <span className="stat-label">Deliveries</span>
                                    <span className="stat-value">{courierData.stats.thisMonth.deliveries}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Earnings</span>
                                    <span className="stat-value">Rp {courierData.stats.thisMonth.earnings.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="stats-card card">
                            <h3>Highlights</h3>
                            <div className="highlight-item">
                                <Zap size={18} color="#fbb03b" />
                                <div>
                                    <span className="highlight-label">Avg Delivery Time</span>
                                    <span className="highlight-value">{courierData.stats.avgDeliveryTime} menit</span>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <Star size={18} color="#fbb03b" />
                                <div>
                                    <span className="highlight-label">Perfect Deliveries</span>
                                    <span className="highlight-value">{courierData.stats.perfectDeliveries} (5⭐)</span>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <Trophy size={18} color="#0ead98" />
                                <div>
                                    <span className="highlight-label">Current Streak</span>
                                    <span className="highlight-value">{courierData.stats.streak} hari berturut</span>
                                </div>
                            </div>
                        </div>

                        <div className="stats-card card">
                            <h3>Zona Layanan</h3>
                            {courierData.zones.map((zone, idx) => (
                                <div key={idx} className="zone-item">
                                    <MapPin size={16} color="var(--primary)" />
                                    <span>{zone}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'badges' && (
                    <div className="tab-content">
                        <div className="badges-grid">
                            {courierData.badges.map(badge => (
                                <div key={badge.id} className={`badge-card card ${badge.earned ? 'earned' : 'locked'}`}>
                                    <div className="badge-icon">{badge.icon}</div>
                                    <div className="badge-name">{badge.name}</div>
                                    <div className="badge-desc">{badge.description}</div>
                                    {badge.earned && badge.date && (
                                        <div className="badge-date">
                                            Diraih: {new Date(badge.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    )}
                                    {!badge.earned && (
                                        <div className="badge-locked">🔒 Locked</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'quests' && (
                    <div className="tab-content">
                        {courierData.activeQuests.map(quest => (
                            <div key={quest.id} className="quest-card card">
                                <div className="quest-header">
                                    <h4>{quest.name}</h4>
                                    <div className="quest-reward">
                                        +Rp {quest.reward.toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <p className="quest-desc">{quest.description}</p>

                                <div className="quest-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="progress-text">
                                        <span>{quest.progress} / {quest.target}</span>
                                        <span className="quest-timer">⏰ {quest.endsIn}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="quest-info card">
                            <Award size={24} color="var(--primary)" />
                            <p>Quest baru akan muncul setiap hari Senin. Selesaikan sebanyak mungkin untuk mendapat bonus tambahan!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierProfile;
