import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Upload,
    CheckCircle,
    Store,
    MapPin,
    Camera,
    FileText,
    User,
    Phone,
    Mail,
    AlertCircle,
    CreditCard,
    Clock,
    Briefcase,
    Map
} from 'lucide-react';
import './CourierRegistration.css'; // Reusing the same CSS
import './SettingsPages.css'; // For map modal styles
import AppBar from './components/AppBar';
import AddressMap from './AddressMap';

const SellerRegistration = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1); // 1: Owner Info, 2: Store Info, 3: Documents, 4: Bank Info, 5: Review
    const [showOwnerMap, setShowOwnerMap] = useState(false);
    const [showStoreMap, setShowStoreMap] = useState(false);

    // 🎯 DEMO MODE: Pre-filled data untuk pendaftaran seller
    const [formData, setFormData] = useState({
        // Step 1: Owner Info
        fullName: 'Deni Apps',
        nik: '3578012345678901',
        phone: '081234567890',
        email: 'deni.apps@email.com',
        address: 'Jl. Sam Ratulangi No. 123, Palu Timur, Palu',

        // Step 2: Store Info
        storeName: 'Palugada Mart Palu',
        storeCategory: 'Barang', // Kuliner, Barang, Jasa
        storeDescription: 'Menyediakan segala kebutuhan rumah tangga dengan harga terjangkau.',
        storeAddress: 'Jl. Ahmad Yani No. 50, Palu',
        operatingHours: '08:00 - 20:00',

        // Step 3: Documents
        ktp: { name: 'ktp-deni.jpg' },
        selfieKtp: { name: 'selfie-deni.jpg' },
        storePhoto: { name: 'store-exterior.jpg' },
        npwp: { name: 'npwp-deni.jpg' },

        // Step 4: Bank Info
        bankName: 'BCA',
        accountNumber: '1234567890',
        accountHolder: 'Deni Apps',
        bankProof: { name: 'passbook-page.jpg' }
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileUpload = (field, file) => {
        setFormData({ ...formData, [field]: file });
    };

    const canProceed = () => {
        return true; // Demo mode
    };

    const handleNext = () => {
        if (step < 5) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else onBack();
    };

    const handleSubmit = () => {
        console.log('Submitting seller registration:', formData);
        onComplete();
    };

    return (
        <div className="courier-registration-container">
            <AppBar
                title="Daftar Jadi Mitra Penjual"
                onBack={handleBack}
            />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>
            
            {/* Developer Bypass Button */}
            <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                    onClick={() => onComplete()}
                    style={{ background: 'transparent', border: '1px dashed #cbd5e1', padding: '6px 12px', fontSize: '12px', color: 'var(--text-muted)', borderRadius: '6px' }}
                >
                    [MODE UJICOBA] Lewati
                </button>
            </div>

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
                    <span className={step === 1 ? 'active' : ''}>Pemilik</span>
                    <span className={step === 2 ? 'active' : ''}>Toko</span>
                    <span className={step === 3 ? 'active' : ''}>Dokumen</span>
                    <span className={step === 4 ? 'active' : ''}>Bank</span>
                    <span className={step === 5 ? 'active' : ''}>Review</span>
                </div>
            </div>

            <div className="scroll-content" style={{ paddingBottom: '100px' }}>

                {/* Step 1: Owner Info */}
                {step === 1 && (
                    <div className="registration-step">
                        <h2>Data Diri Pemilik</h2>
                        <p className="step-description">Masukkan informasi identitas pemilik usaha</p>

                        <div className="form-group">
                            <label><User size={16} /> Nama Lengkap (Sesuai KTP)</label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> NIK (16 Digit)</label>
                            <input
                                type="text"
                                maxLength="16"
                                value={formData.nik}
                                onChange={(e) => handleInputChange('nik', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><Phone size={16} /> Nomor Telepon</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><Mail size={16} /> Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><MapPin size={16} /> Alamat Domisili</label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <textarea
                                    rows="2"
                                    style={{ flex: 1 }}
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                />
                                <button
                                    className="card"
                                    onClick={() => setShowOwnerMap(true)}
                                    style={{ padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)' }}
                                >
                                    <Map size={20} color="var(--primary)" />
                                </button>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Klik ikon peta untuk memilih dari lokasi GPS</span>
                        </div>
                    </div>
                )}

                {/* Step 2: Store Info */}
                {step === 2 && (
                    <div className="registration-step">
                        <h2>Informasi Toko</h2>
                        <p className="step-description">Detail mengenai usaha atau toko Anda</p>

                        <div className="form-group">
                            <label><Store size={16} /> Nama Toko</label>
                            <input
                                type="text"
                                value={formData.storeName}
                                onChange={(e) => handleInputChange('storeName', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Kategori Toko</label>
                            <select
                                value={formData.storeCategory}
                                onChange={(e) => handleInputChange('storeCategory', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}
                            >
                                <option value="Kuliner">Kuliner</option>
                                <option value="Barang">Barang (Fisik)</option>
                                <option value="Jasa">Jasa</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Deskripsi Toko</label>
                            <textarea
                                rows="3"
                                value={formData.storeDescription}
                                onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label><MapPin size={16} /> Alamat Lengkap Toko</label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <textarea
                                    rows="2"
                                    style={{ flex: 1 }}
                                    value={formData.storeAddress}
                                    onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                                    placeholder="Jalan, No, Kelurahan, Kecamatan"
                                />
                                <button
                                    className="card"
                                    onClick={() => setShowStoreMap(true)}
                                    style={{ padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)' }}
                                >
                                    <Map size={20} color="var(--primary)" />
                                </button>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Titik GPS toko sangat penting untuk akurasi kurir</span>
                        </div>

                        <div className="form-group">
                            <label><Clock size={16} /> Jam Operasional</label>
                            <input
                                type="text"
                                placeholder="Contoh: 08:00 - 21:00"
                                value={formData.operatingHours}
                                onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Documents */}
                {step === 3 && (
                    <div className="registration-step">
                        <h2>Upload Dokumen</h2>
                        <p className="step-description">Lengkapi dokumen untuk proses verifikasi</p>

                        <div className="info-box">
                            <AlertCircle size={18} color="#fbb03b" />
                            <span>Data Anda aman dan hanya digunakan untuk verifikasi mitra</span>
                        </div>

                        <div className="upload-grid">
                            <UploadBox
                                label="KTP Pemilik"
                                file={formData.ktp}
                                onChange={(file) => handleFileUpload('ktp', file)}
                                icon={<FileText size={32} />}
                            />
                            <UploadBox
                                label="Selfie + KTP"
                                file={formData.selfieKtp}
                                onChange={(file) => handleFileUpload('selfieKtp', file)}
                                icon={<Camera size={32} />}
                            />
                            <UploadBox
                                label="Foto Toko"
                                file={formData.storePhoto}
                                onChange={(file) => handleFileUpload('storePhoto', file)}
                                icon={<Store size={32} />}
                            />
                            <UploadBox
                                label="NPWP (Opsional)"
                                file={formData.npwp}
                                onChange={(file) => handleFileUpload('npwp', file)}
                                icon={<FileText size={32} />}
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Bank Info */}
                {step === 4 && (
                    <div className="registration-step">
                        <h2>Pengaturan Rekening</h2>
                        <p className="step-description">Akun bank untuk pencairan dana penjualan</p>

                        <div className="form-group">
                            <label><CreditCard size={16} /> Nama Bank</label>
                            <input
                                type="text"
                                placeholder="Contoh: BCA / Mandiri / BRI"
                                value={formData.bankName}
                                onChange={(e) => handleInputChange('bankName', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nomor Rekening</label>
                            <input
                                type="text"
                                value={formData.accountNumber}
                                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nama Pemilik Rekening</label>
                            <input
                                type="text"
                                value={formData.accountHolder}
                                onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                            />
                        </div>

                        <UploadBox
                            label="Foto Buku Tabungan"
                            file={formData.bankProof}
                            onChange={(file) => handleFileUpload('bankProof', file)}
                            icon={<Camera size={32} />}
                        />
                    </div>
                )}

                {/* Step 5: Review */}
                {step === 5 && (
                    <div className="registration-step">
                        <h2>Review Pendaftaran</h2>
                        <p className="step-description">Periksa kembali data sebelum dikirim</p>

                        <div className="review-section card">
                            <h3>Informasi Toko</h3>
                            <div className="review-item">
                                <span>Nama Toko</span>
                                <strong>{formData.storeName}</strong>
                            </div>
                            <div className="review-item">
                                <span>Kategori</span>
                                <strong>{formData.storeCategory}</strong>
                            </div>
                            <div className="review-item">
                                <span>Rekening</span>
                                <strong>{formData.bankName} - {formData.accountNumber}</strong>
                            </div>
                        </div>

                        <div className="review-section card">
                            <h3>Kontak Pemilik</h3>
                            <div className="review-item">
                                <span>Pemilik</span>
                                <strong>{formData.fullName}</strong>
                            </div>
                            <div className="review-item">
                                <span>WA</span>
                                <strong>{formData.phone}</strong>
                            </div>
                        </div>

                        <div className="info-box success">
                            <CheckCircle size={18} color="#10b981" />
                            <div>
                                <strong>Verifikasi Cepat</strong>
                                <p>Toko Anda akan ditinjau dalam waktu maksimal 24 jam. Kami akan mengirimkan notifikasi lewat WhatsApp.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="registration-footer glass">
                <button className="btn-secondary" onClick={handleBack}>
                    <ChevronLeft size={18} /> Kembali
                </button>
                {step < 5 ? (
                    <button className="btn-primary" onClick={handleNext} disabled={!canProceed()}>
                        Lanjut <ChevronRight size={18} />
                    </button>
                ) : (
                    <button className="btn-primary" onClick={handleSubmit}>
                        Buka Toko Sekarang <CheckCircle size={18} />
                    </button>
                )}
            </div>

            {/* Map Modals */}
            {showOwnerMap && (
                <AddressMap
                    onClose={() => setShowOwnerMap(false)}
                    onConfirm={(data) => {
                        handleInputChange('address', data.address);
                        setShowOwnerMap(false);
                    }}
                />
            )}

            {showStoreMap && (
                <AddressMap
                    onClose={() => setShowStoreMap(false)}
                    onConfirm={(data) => {
                        handleInputChange('storeAddress', data.address);
                        setShowStoreMap(false);
                    }}
                />
            )}
        </div>
    );
};

// Internal UploadBox Component
const UploadBox = ({ label, file, onChange, icon }) => (
    <div className="upload-box">
        <label className={`upload-label ${file ? 'uploaded' : ''}`}>
            {file ? (
                <>
                    <CheckCircle size={32} color="#10b981" />
                    <span className="uploaded-text">Terunggah</span>
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

export default SellerRegistration;
