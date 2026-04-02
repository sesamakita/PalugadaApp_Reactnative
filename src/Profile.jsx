import React from 'react';
import {
    User,
    Settings,
    ShoppingBag,
    Store,
    Bike,
    MapPin,
    CreditCard,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    ShieldCheck,
    Wallet,
    Package
} from 'lucide-react';
import './Profile.css';

const Profile = ({ onNavigate, onLogout }) => {
    const user = {
        name: "Deni Indrayana",
        email: "budi.santoso@email.com",
        role: "Member Gold",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    };

    const menuItems = [
        { icon: <Package size={20} />, label: "Pesanan Saya", sub: "Lihat status pesanan & riwayat", route: "my-orders" },
        { icon: <User size={20} />, label: "Informasi Pribadi", sub: "Nama, Email, Nomor Telepon", route: "personal-info" },
        { icon: <Wallet size={20} />, label: "Dompet Saya", sub: "Saldo, Top Up & Penarikan", route: "wallet" },
        { icon: <MapPin size={20} />, label: "Alamat Saya", sub: "Atur alamat pengiriman", route: "my-address" },
        { icon: <CreditCard size={20} />, label: "Rekening Bank", sub: "Atur metode pembayaran", route: "bank-account" },
        { icon: <Bell size={20} />, label: "Notifikasi", sub: "Pesan dan info promo", route: "notification-settings" },
        { icon: <ShieldCheck size={20} />, label: "Keamanan Akun", sub: "Sandi, PIN & Autentikasi", route: "account-security" },
        { icon: <HelpCircle size={20} />, label: "Pusat Bantuan", sub: "Chat bantuan & FAQ", route: "help-center" },
    ];

    return (
        <div className="profile-container">
            <header className="profile-nav">
                <div className="profile-nav-title">Profil Saya</div>
            </header>

            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar-container">
                    <img src={user.avatar} alt={user.name} className="profile-avatar" />
                    <div className="edit-avatar-btn">
                        <Settings size={14} color="white" />
                    </div>
                </div>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-role">{user.role}</p>
            </div>

            <div className="profile-content">
                {/* Role Switcher */}
                <div className="section-card">
                    <h3 className="section-title">Mode Aplikasi</h3>
                    <div className="role-switcher">
                        <div className="role-item active" onClick={() => onNavigate('home')}>
                            <div className="role-icon-box buyer">
                                <ShoppingBag size={24} />
                            </div>
                            <span>Buyer</span>
                        </div>
                        <div className="role-item" onClick={() => onNavigate('seller')}>
                            <div className="role-icon-box seller">
                                <Store size={24} />
                            </div>
                            <span>Seller</span>
                        </div>
                        <div className="role-item" onClick={() => onNavigate('courier')}>
                            <div className="role-icon-box courier">
                                <Bike size={24} />
                            </div>
                            <span>Kurir</span>
                        </div>
                    </div>
                </div>

                {/* Main Menu */}
                <div className="section-card">
                    <h3 className="section-title">Pengaturan Akun</h3>
                    <div className="menu-list">
                        {menuItems.map((item, index) => (
                            <div key={index} className="menu-item" onClick={() => onNavigate(item.route)}>
                                <div className="menu-icon-wrapper">
                                    {item.icon}
                                </div>
                                <div className="menu-text">
                                    <span className="menu-label">{item.label}</span>
                                    <span className="menu-sub">{item.sub}</span>
                                </div>
                                <ChevronRight size={18} className="menu-arrow" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button className="logout-button" onClick={onLogout}>
                    <LogOut size={20} />
                    <span>Keluar Akun</span>
                </button>
            </div>

            <div className="profile-footer">
                <p>Palugada v1.0.2-alpha</p>
            </div>
        </div>
    );
};

export default Profile;
