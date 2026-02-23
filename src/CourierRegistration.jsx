import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Upload,
    CheckCircle,
    Bike,
    Car,
    MapPin,
    Camera,
    FileText,
    User,
    Phone,
    Mail,
    AlertCircle
} from 'lucide-react';
import './CourierRegistration.css';
import AppBar from './components/AppBar';

const CourierRegistration = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1); // 1: Personal Info, 2: Vehicle, 3: Documents, 4: Zone Selection, 5: Review

    // 🎯 DEMO MODE: Pre-filled data untuk testing visual
    const [formData, setFormData] = useState({
        // Personal Info - PRE-FILLED
        fullName: 'Budi Santoso',
        phone: '081234567890',
        email: 'budi.santoso@email.com',
        address: 'Jl. Raya Gubeng No. 123, Gubeng, Surabaya',

        // Vehicle Info - PRE-FILLED
        vehicleType: 'motorcycle', // motorcycle, car, bicycle
        plateNumber: 'L 1234 AB',
        vehicleBrand: 'Honda Vario 150',
        vehicleColor: 'Hitam',

        // Documents - SIMULATED (untuk testing)
        ktp: { name: 'ktp-demo.jpg' },
        sim: { name: 'sim-demo.jpg' },
        stnk: { name: 'stnk-demo.jpg' },
        selfieKtp: { name: 'selfie-demo.jpg' },
        vehiclePhoto: { name: 'vehicle-demo.jpg' },

        // Zone Selection - PRE-FILLED
        city: 'Surabaya',
        preferredZones: ['SBY-ZONE-001', 'SBY-ZONE-002'],

        // Availability - PRE-FILLED
        availability: 'fulltime' // fulltime, parttime, weekend
    });

    const zones = [
        { id: 'SBY-ZONE-001', name: 'Gubeng - Airlangga', districts: ['Gubeng', 'Airlangga', 'Pucang Sewu'] },
        { id: 'SBY-ZONE-002', name: 'Tegalsari - Genteng', districts: ['Tegalsari', 'Genteng', 'Embong Kaliasin'] },
        { id: 'SBY-ZONE-003', name: 'Wonokromo - Darmo', districts: ['Wonokromo', 'Darmo', 'Sawahan'] },
        { id: 'SBY-ZONE-004', name: 'Sukolilo - Keputih', districts: ['Sukolilo', 'Keputih', 'Semolowaru'] }
    ];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileUpload = (field, file) => {
        // In production, upload to server and get URL
        setFormData({ ...formData, [field]: file });
    };

    const toggleZone = (zoneId) => {
        const zones = formData.preferredZones.includes(zoneId)
            ? formData.preferredZones.filter(id => id !== zoneId)
            : [...formData.preferredZones, zoneId];
        handleInputChange('preferredZones', zones);
    };

    // 🎯 DEMO MODE: Validasi dinonaktifkan agar bisa langsung next/prev
    const canProceed = () => {
        // ALWAYS return true untuk demo visual testing
        return true;

        // Original validation (commented out)
        // switch (step) {
        //     case 1:
        //         return formData.fullName && formData.phone && formData.email;
        //     case 2:
        //         return formData.vehicleType && formData.plateNumber;
        //     case 3:
        //         return formData.ktp && formData.sim && formData.stnk && formData.selfieKtp && formData.vehiclePhoto;
        //     case 4:
        //         return formData.preferredZones.length > 0;
        //     default:
        //         return true;
        // }
    };

    const handleNext = () => {
        if (step < 5) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else onBack();
    };

    const handleSubmit = () => {
        // Submit to backend
        console.log('Submitting courier registration:', formData);
        onComplete();
    };

    return (
        <div className="courier-registration-container">
            <AppBar
                title="Daftar Jadi Mitra Kurir"
                onBack={handleBack}
            />
            <div style={{ height: '64px' }}></div>

            {/* Progress Steps */}
            <div className="registration-progress">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
                </div>
                <div className="progress-steps">
                    {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} className={`progress-step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                            {step > s ? <CheckCircle size={16} /> : <span>{s}</span>}
                        </div>
                    ))}
                </div>
                <div className="progress-labels">
                    <span className={step === 1 ? 'active' : ''}>Data Diri</span>
                    <span className={step === 2 ? 'active' : ''}>Kendaraan</span>
                    <span className={step === 3 ? 'active' : ''}>Dokumen</span>
                    <span className={step === 4 ? 'active' : ''}>Zona</span>
                    <span className={step === 5 ? 'active' : ''}>Review</span>
                </div>
            </div>

            <div className="scroll-content" style={{ paddingBottom: '100px' }}>

                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div className="registration-step">
                        <h2>Data Diri</h2>
                        <p className="step-description">Masukkan informasi pribadi Anda</p>

                        <div className="form-group">
                            <label><User size={16} /> Nama Lengkap</label>
                            <input
                                type="text"
                                placeholder="Sesuai KTP"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><Phone size={16} /> Nomor Telepon</label>
                            <input
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><Mail size={16} /> Email</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><MapPin size={16} /> Alamat Lengkap</label>
                            <textarea
                                placeholder="Jalan, Kelurahan, Kecamatan, Kota"
                                rows="3"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Vehicle Info */}
                {step === 2 && (
                    <div className="registration-step">
                        <h2>Informasi Kendaraan</h2>
                        <p className="step-description">Detail kendaraan yang akan digunakan</p>

                        <div className="form-group">
                            <label>Jenis Kendaraan</label>
                            <div className="vehicle-selector">
                                <button
                                    className={`vehicle-option ${formData.vehicleType === 'motorcycle' ? 'active' : ''}`}
                                    onClick={() => handleInputChange('vehicleType', 'motorcycle')}
                                >
                                    <Bike size={32} />
                                    <span>Motor</span>
                                </button>
                                <button
                                    className={`vehicle-option ${formData.vehicleType === 'car' ? 'active' : ''}`}
                                    onClick={() => handleInputChange('vehicleType', 'car')}
                                >
                                    <Car size={32} />
                                    <span>Mobil</span>
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Nomor Plat Kendaraan</label>
                            <input
                                type="text"
                                placeholder="L 1234 AB"
                                value={formData.plateNumber}
                                onChange={(e) => handleInputChange('plateNumber', e.target.value.toUpperCase())}
                            />
                        </div>

                        <div className="form-group">
                            <label>Merk Kendaraan</label>
                            <input
                                type="text"
                                placeholder="Honda Vario, Toyota Avanza, dll"
                                value={formData.vehicleBrand}
                                onChange={(e) => handleInputChange('vehicleBrand', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Warna Kendaraan</label>
                            <input
                                type="text"
                                placeholder="Hitam, Putih, Merah, dll"
                                value={formData.vehicleColor}
                                onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Documents */}
                {step === 3 && (
                    <div className="registration-step">
                        <h2>Upload Dokumen</h2>
                        <p className="step-description">Pastikan foto jelas dan tidak blur</p>

                        <div className="info-box">
                            <AlertCircle size={18} color="#fbb03b" />
                            <span>Semua dokumen harus valid dan masih berlaku</span>
                        </div>

                        <div className="upload-grid">
                            <UploadBox
                                label="KTP"
                                file={formData.ktp}
                                onChange={(file) => handleFileUpload('ktp', file)}
                                icon={<FileText size={32} />}
                            />
                            <UploadBox
                                label="SIM"
                                file={formData.sim}
                                onChange={(file) => handleFileUpload('sim', file)}
                                icon={<FileText size={32} />}
                            />
                            <UploadBox
                                label="STNK"
                                file={formData.stnk}
                                onChange={(file) => handleFileUpload('stnk', file)}
                                icon={<FileText size={32} />}
                            />
                            <UploadBox
                                label="Selfie + KTP"
                                file={formData.selfieKtp}
                                onChange={(file) => handleFileUpload('selfieKtp', file)}
                                icon={<Camera size={32} />}
                            />
                            <UploadBox
                                label="Foto Kendaraan"
                                file={formData.vehiclePhoto}
                                onChange={(file) => handleFileUpload('vehiclePhoto', file)}
                                icon={<Camera size={32} />}
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Zone Selection */}
                {step === 4 && (
                    <div className="registration-step">
                        <h2>Pilih Zona Layanan</h2>
                        <p className="step-description">Pilih minimal 1 zona yang Anda kuasai</p>

                        <div className="zone-list">
                            {zones.map(zone => (
                                <div
                                    key={zone.id}
                                    className={`zone-card ${formData.preferredZones.includes(zone.id) ? 'selected' : ''}`}
                                    onClick={() => toggleZone(zone.id)}
                                >
                                    <div className="zone-header">
                                        <MapPin size={20} color="var(--primary)" />
                                        <h4>{zone.name}</h4>
                                        {formData.preferredZones.includes(zone.id) && (
                                            <CheckCircle size={20} color="var(--primary)" />
                                        )}
                                    </div>
                                    <div className="zone-districts">
                                        {zone.districts.join(' • ')}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <label>Ketersediaan Waktu</label>
                            <div className="availability-options">
                                <button
                                    className={`availability-option ${formData.availability === 'fulltime' ? 'active' : ''}`}
                                    onClick={() => handleInputChange('availability', 'fulltime')}
                                >
                                    Full Time
                                    <span>Senin-Minggu</span>
                                </button>
                                <button
                                    className={`availability-option ${formData.availability === 'parttime' ? 'active' : ''}`}
                                    onClick={() => handleInputChange('availability', 'parttime')}
                                >
                                    Part Time
                                    <span>Fleksibel</span>
                                </button>
                                <button
                                    className={`availability-option ${formData.availability === 'weekend' ? 'active' : ''}`}
                                    onClick={() => handleInputChange('availability', 'weekend')}
                                >
                                    Weekend Only
                                    <span>Sabtu-Minggu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Review */}
                {step === 5 && (
                    <div className="registration-step">
                        <h2>Review Data</h2>
                        <p className="step-description">Pastikan semua data sudah benar</p>

                        <div className="review-section card">
                            <h3>Data Diri</h3>
                            <div className="review-item">
                                <span>Nama</span>
                                <strong>{formData.fullName}</strong>
                            </div>
                            <div className="review-item">
                                <span>Telepon</span>
                                <strong>{formData.phone}</strong>
                            </div>
                            <div className="review-item">
                                <span>Email</span>
                                <strong>{formData.email}</strong>
                            </div>
                        </div>

                        <div className="review-section card">
                            <h3>Kendaraan</h3>
                            <div className="review-item">
                                <span>Jenis</span>
                                <strong>{formData.vehicleType === 'motorcycle' ? 'Motor' : 'Mobil'}</strong>
                            </div>
                            <div className="review-item">
                                <span>Plat Nomor</span>
                                <strong>{formData.plateNumber}</strong>
                            </div>
                            <div className="review-item">
                                <span>Merk</span>
                                <strong>{formData.vehicleBrand}</strong>
                            </div>
                        </div>

                        <div className="review-section card">
                            <h3>Zona Layanan</h3>
                            {formData.preferredZones.map(zoneId => {
                                const zone = zones.find(z => z.id === zoneId);
                                return (
                                    <div key={zoneId} className="review-zone">
                                        <MapPin size={16} />
                                        <span>{zone.name}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="info-box success">
                            <CheckCircle size={18} color="#10b981" />
                            <div>
                                <strong>Proses Selanjutnya</strong>
                                <p>Data Anda akan diverifikasi dalam 1-2 hari kerja. Kami akan menghubungi Anda untuk jadwal training dan test delivery.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="registration-footer glass">
                <button
                    className="btn-secondary"
                    onClick={handleBack}
                >
                    <ChevronLeft size={18} />
                    Kembali
                </button>
                {step < 5 ? (
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={!canProceed()}
                    >
                        Lanjut
                        <ChevronRight size={18} />
                    </button>
                ) : (
                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                    >
                        Kirim Pendaftaran
                        <CheckCircle size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

// Upload Box Component
const UploadBox = ({ label, file, onChange, icon }) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            onChange(selectedFile);
        }
    };

    return (
        <div className="upload-box">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id={`upload-${label}`}
                style={{ display: 'none' }}
            />
            <label htmlFor={`upload-${label}`} className={`upload-label ${file ? 'uploaded' : ''}`}>
                {file ? (
                    <>
                        <CheckCircle size={32} color="#10b981" />
                        <span className="uploaded-text">Berhasil diupload</span>
                    </>
                ) : (
                    <>
                        {icon}
                        <span>{label}</span>
                        <Upload size={16} />
                    </>
                )}
            </label>
        </div>
    );
};

export default CourierRegistration;
