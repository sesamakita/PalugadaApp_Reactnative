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
import { STORAGE_KEYS } from './services/StorageService';
import StorageService from './services/StorageService';
import './Profile.css';

const Profile = ({ onNavigate, onLogout, currentUser, appRole = 'buyer', onRoleChange }) => {
    const defaultUser = {
        name: "Deni Indrayana",
        email: "deniindrayana@email.com",
        role: "Member Gold",
        avatar: `${import.meta.env.BASE_URL}deni_foto.jpeg?v=1`
    };

    const user = currentUser || defaultUser;
    
    // Default avatar logic if no custom avatar is provided
    const userAvatar = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0ead98&color=fff&bold=true`;

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
                    <img src={userAvatar} alt={user.name} className="profile-avatar" />
                    <div className="edit-avatar-btn">
                        <Settings size={14} color="white" />
                    </div>
                </div>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-role">{user.role}</p>
            </div>

            <div className="profile-content">
                {/* Role Switcher */}
                <div className="section-card mode-center">
                    <h3 className="section-title">Mode Aplikasi</h3>
                    <div className={ `mode-selector-v2 ${appRole}` }>
                        <div className="mode-slug"></div>
                        
                        <div className={`mode-option ${appRole === 'buyer' ? 'active' : ''}`} onClick={() => onRoleChange('buyer')}>
                            <ShoppingBag size={20} />
                            <span>Buyer</span>
                        </div>
                        
                        <div className={`mode-option ${appRole === 'seller' ? 'active' : ''}`} onClick={() => {
                            if (currentUser?.isSeller) {
                                onRoleChange('seller');
                            } else {
                                onNavigate('seller-registration');
                            }
                        }}>
                            <Store size={20} />
                            <span>Seller</span>
                            {currentUser?.isSeller && <div className="dot-active"></div>}
                        </div>
                        
                        <div className={`mode-option ${appRole === 'courier' ? 'active' : ''}`} onClick={() => {
                            if (currentUser?.isCourier) {
                                onRoleChange('courier');
                            } else {
                                onNavigate('courier-registration');
                            }
                        }}>
                            <Bike size={20} />
                            <span>Kurir</span>
                            {currentUser?.isCourier && <div className="dot-active"></div>}
                        </div>
                    </div>
                    <p className="mode-description">
                        {appRole === 'buyer' ? 'Temukan produk lokal pilihan Anda' : 
                         appRole === 'seller' ? 'Kelola toko dan tingkatkan penjualan' : 
                         'Mulai tugas pengantaran sekarang'}
                    </p>
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

                {/* Developer Tools (Hidden in prod usually, here for testing) */}
                <div className="section-card" style={{ marginTop: '32px', opacity: 0.6, border: '1px dashed #cbd5e1' }}>
                    <h3 className="section-title">Developer Tools</h3>
                    <button 
                        className="menu-item" 
                        style={{ width: '100%', background: 'transparent', border: 'none', padding: '12px' }}
                        onClick={() => {
                            if(window.confirm('Bersihkan semua data aplikasi?')) {
                                StorageService.clearApp();
                                window.location.reload();
                            }
                        }}
                    >
                        <div className="menu-icon-wrapper" style={{ background: '#fef2f2', color: '#ef4444' }}>
                            <Settings size={20} />
                        </div>
                        <div className="menu-text">
                            <span className="menu-label" style={{ color: '#ef4444' }}>Reset Semua Data</span>
                            <span className="menu-sub">Hapus cache, login, keranjang & favorit</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="profile-footer">
                <p>Palugada v1.0.2-alpha</p>
            </div>
        </div>
    );
};

export default Profile;
