import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Edit2, Save } from 'lucide-react';
import './SettingsPages.css';
import AppBar from './components/AppBar';

const PersonalInfo = ({ onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Budi Santoso',
        email: 'budi.santoso@email.com',
        phone: '+62 812-3456-7890',
        birthDate: '15 Januari 1990',
        gender: 'Laki-laki',
        city: 'Palu'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Save logic here
        console.log('Saved:', formData);
    };

    return (
        <div className="settings-page">
            <AppBar
                title="Informasi Pribadi"
                onBack={onBack}
                rightIcon={
                    <button
                        className="edit-btn"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)' }}
                    >
                        {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                    </button>
                }
            />

            <div className="settings-content">
                <div className="profile-avatar-section">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
                        alt="Profile"
                        className="large-avatar"
                    />
                    {isEditing && (
                        <button className="change-photo-btn">Ubah Foto</button>
                    )}
                </div>

                <div className="form-section">
                    <div className="form-group">
                        <label>
                            <User size={18} />
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            disabled={!isEditing}
                            className={!isEditing ? 'disabled' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Mail size={18} />
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            disabled={!isEditing}
                            className={!isEditing ? 'disabled' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Phone size={18} />
                            Nomor Telepon
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className={!isEditing ? 'disabled' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Calendar size={18} />
                            Tanggal Lahir
                        </label>
                        <input
                            type="text"
                            value={formData.birthDate}
                            onChange={(e) => handleChange('birthDate', e.target.value)}
                            disabled={!isEditing}
                            className={!isEditing ? 'disabled' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <User size={18} />
                            Jenis Kelamin
                        </label>
                        {isEditing ? (
                            <select
                                value={formData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={formData.gender}
                                disabled
                                className="disabled"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label>
                            <MapPin size={18} />
                            Kota
                        </label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            disabled={!isEditing}
                            className={!isEditing ? 'disabled' : ''}
                        />
                    </div>
                </div>

                {isEditing && (
                    <button className="save-button" onClick={handleSave}>
                        <Save size={20} />
                        Simpan Perubahan
                    </button>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;
