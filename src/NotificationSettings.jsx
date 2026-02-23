import React, { useState } from 'react';
import { ArrowLeft, Bell, ShoppingBag, MessageSquare, Tag, TrendingUp } from 'lucide-react';
import './SettingsPages.css';
import AppBar from './components/AppBar';

const NotificationSettings = ({ onBack }) => {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promoOffers: true,
        chatMessages: true,
        productRecommendations: false,
        priceDrops: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationGroups = [
        {
            title: 'Notifikasi Transaksi',
            icon: <ShoppingBag size={20} />,
            items: [
                { key: 'orderUpdates', label: 'Update Pesanan', desc: 'Status pengiriman dan konfirmasi pesanan' }
            ]
        },
        {
            title: 'Notifikasi Promosi',
            icon: <Tag size={20} />,
            items: [
                { key: 'promoOffers', label: 'Penawaran Promo', desc: 'Diskon dan penawaran khusus' },
                { key: 'priceDrops', label: 'Penurunan Harga', desc: 'Produk favorit turun harga' }
            ]
        },
        {
            title: 'Notifikasi Komunikasi',
            icon: <MessageSquare size={20} />,
            items: [
                { key: 'chatMessages', label: 'Pesan Chat', desc: 'Pesan dari penjual atau pembeli' }
            ]
        },
        {
            title: 'Notifikasi Rekomendasi',
            icon: <TrendingUp size={20} />,
            items: [
                { key: 'productRecommendations', label: 'Rekomendasi Produk', desc: 'Produk yang mungkin Anda suka' }
            ]
        }
    ];

    return (
        <div className="settings-page">
            <AppBar title="Notifikasi" onBack={onBack} />

            <div className="settings-content">
                <div className="info-banner">
                    <Bell size={18} />
                    <p>Kelola preferensi notifikasi Anda untuk mendapatkan informasi yang relevan</p>
                </div>

                {notificationGroups.map((group, idx) => (
                    <div key={idx} className="notification-group">
                        <div className="group-header">
                            {group.icon}
                            <h3>{group.title}</h3>
                        </div>
                        <div className="toggle-list">
                            {group.items.map(item => (
                                <div key={item.key} className="toggle-item">
                                    <div className="toggle-info">
                                        <p className="toggle-label">{item.label}</p>
                                        <p className="toggle-desc">{item.desc}</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings[item.key]}
                                            onChange={() => handleToggle(item.key)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="notification-group">
                    <div className="group-header">
                        <Bell size={20} />
                        <h3>Metode Notifikasi</h3>
                    </div>
                    <div className="toggle-list">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <p className="toggle-label">Notifikasi Email</p>
                                <p className="toggle-desc">Terima notifikasi via email</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <p className="toggle-label">Notifikasi Push</p>
                                <p className="toggle-desc">Terima notifikasi di aplikasi</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications}
                                    onChange={() => handleToggle('pushNotifications')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <p className="toggle-label">Notifikasi SMS</p>
                                <p className="toggle-desc">Terima notifikasi via SMS</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={() => handleToggle('smsNotifications')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
