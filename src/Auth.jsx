import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import logo from './assets/branding/palugada-logo-main.png';

const Auth = ({ onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login/signup logic
        console.log(`Submitting ${mode}:`, formData);
        onLogin();
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-logo">
                    <div className="logo-badge">
                        <img src={logo} alt="Palugada Logo" />
                    </div>
                </div>
                <h1>{mode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h1>
                <p>{mode === 'login' ? 'Masuk untuk lanjut belanja produk UMKM lokal Poso' : 'Gabung sekarang dan dukung UMKM lokal Sulawesi Tengah'}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'signup' && (
                    <div className="input-group">
                        <User size={20} className="input-icon" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}

                <div className="input-group">
                    <Mail size={20} className="input-icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email atau Nomor HP"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {mode === 'signup' && (
                    <div className="input-group">
                        <Phone size={20} className="input-icon" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Nomor Whatsapp"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}

                <div className="input-group">
                    <Lock size={20} className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Kata Sandi"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {mode === 'login' && (
                    <div className="auth-actions">
                        <label className="remember-me">
                            <input type="checkbox" /> Ingat saya
                        </label>
                        <button type="button" className="forgot-password">Lupa sandi?</button>
                    </div>
                )}

                <button type="submit" className="auth-submit-btn">
                    {mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                    <ArrowRight size={20} />
                </button>

                <button type="button" className="guest-btn" onClick={onLogin}>
                    Masuk Tanpa Akun
                </button>
            </form>

            <div className="auth-divider">
                <span>Atau</span>
            </div>

            <div className="social-auth">
                <button className="social-btn google">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                    Google
                </button>
                <button className="social-btn facebook">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" />
                    Facebook
                </button>
            </div>

            <div className="auth-footer">
                {mode === 'login' ? (
                    <p>Belum punya akun? <button onClick={() => setMode('signup')}>Daftar Gratis</button></p>
                ) : (
                    <p>Sudah punya akun? <button onClick={() => setMode('login')}>Masuk di sini</button></p>
                )}
            </div>
        </div>
    );
};

export default Auth;
