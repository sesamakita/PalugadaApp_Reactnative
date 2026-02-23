import React, { useState } from 'react';
import { ArrowLeft, Lock, Key, Smartphone, Shield, Eye, EyeOff, ChevronRight } from 'lucide-react';
import './SettingsPages.css';
import AppBar from './components/AppBar';

const AccountSecurity = ({ onBack }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        biometricLogin: true,
        loginAlerts: true
    });

    const handleToggle = (key) => {
        setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const handleSavePassword = () => {
        console.log('Changing password:', passwordData);
        setShowChangePassword(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="settings-page">
            <AppBar title="Keamanan Akun" onBack={onBack} />

            <div className="settings-content">
                <div className="info-banner security">
                    <Shield size={18} />
                    <p>Lindungi akun Anda dengan fitur keamanan tambahan</p>
                </div>

                {/* Password Section */}
                <div className="security-section">
                    <h3 className="section-title">Kata Sandi</h3>
                    <div className="menu-list">
                        <div className="menu-item" onClick={() => setShowChangePassword(true)}>
                            <div className="menu-icon-wrapper">
                                <Lock size={20} />
                            </div>
                            <div className="menu-text">
                                <span className="menu-label">Ubah Kata Sandi</span>
                                <span className="menu-sub">Terakhir diubah 30 hari lalu</span>
                            </div>
                            <ChevronRight size={18} className="menu-arrow" />
                        </div>
                    </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="security-section">
                    <h3 className="section-title">Autentikasi Dua Faktor</h3>
                    <div className="toggle-list">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <div className="toggle-icon">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <p className="toggle-label">Verifikasi 2 Langkah</p>
                                    <p className="toggle-desc">Tambahkan lapisan keamanan ekstra dengan kode OTP</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={securitySettings.twoFactorAuth}
                                    onChange={() => handleToggle('twoFactorAuth')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Biometric & Login Settings */}
                <div className="security-section">
                    <h3 className="section-title">Login & Akses</h3>
                    <div className="toggle-list">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <div className="toggle-icon">
                                    <Key size={20} />
                                </div>
                                <div>
                                    <p className="toggle-label">Login Biometrik</p>
                                    <p className="toggle-desc">Gunakan sidik jari atau Face ID</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={securitySettings.biometricLogin}
                                    onChange={() => handleToggle('biometricLogin')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <div className="toggle-icon">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="toggle-label">Notifikasi Login</p>
                                    <p className="toggle-desc">Dapatkan notifikasi saat ada login baru</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={securitySettings.loginAlerts}
                                    onChange={() => handleToggle('loginAlerts')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Change Password Modal */}
                {showChangePassword && (
                    <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Ubah Kata Sandi</h3>
                            <div className="form-section">
                                <div className="form-group">
                                    <label>Kata Sandi Saat Ini</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                            placeholder="Masukkan kata sandi saat ini"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Kata Sandi Baru</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Konfirmasi Kata Sandi Baru</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                            placeholder="Ketik ulang kata sandi baru"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button className="cancel-btn" onClick={() => setShowChangePassword(false)}>
                                        Batal
                                    </button>
                                    <button className="save-btn" onClick={handleSavePassword}>
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSecurity;
