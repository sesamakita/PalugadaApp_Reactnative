import React, { useState } from 'react';
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Edit2, Trash2, Map } from 'lucide-react';
import './SettingsPages.css';
import AddressMap from './AddressMap';
import AppBar from './components/AppBar';

const MyAddress = ({ onBack }) => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            label: 'Rumah',
            name: 'Budi Santoso',
            phone: '+62 812-3456-7890',
            address: 'Jl. Raya Darmo No. 123, Kec. Wonokromo',
            city: 'Surabaya',
            province: 'Jawa Timur',
            postalCode: '60241',
            lat: -7.2575,
            lng: 112.7521,
            isPrimary: true
        },
        {
            id: 2,
            label: 'Kantor',
            name: 'Budi Santoso',
            phone: '+62 812-3456-7890',
            address: 'Jl. HR Muhammad No. 456, Kec. Gubeng',
            city: 'Surabaya',
            province: 'Jawa Timur',
            postalCode: '60281',
            lat: -7.2650,
            lng: 112.7520,
            isPrimary: false
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);

    const handleDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetPrimary = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isPrimary: addr.id === id
        })));
    };

    const handleMapConfirm = (locationData) => {
        setSelectedLocation(locationData);
        setShowMapModal(false);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setSelectedLocation({ lat: address.lat, lng: address.lng, address: address.address });
        setShowAddForm(true);
    };

    return (
        <div className="settings-page">
            <AppBar
                title="Alamat Saya"
                onBack={onBack}
                rightIcon={
                    <button
                        className="add-btn"
                        onClick={() => setShowAddForm(true)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)' }}
                    >
                        <Plus size={20} />
                    </button>
                }
            />

            <div className="settings-content">
                <div className="address-list">
                    {addresses.map(address => (
                        <div key={address.id} className="address-card">
                            <div className="address-header">
                                <div className="address-label">
                                    {address.label === 'Rumah' ? (
                                        <Home size={18} />
                                    ) : (
                                        <Briefcase size={18} />
                                    )}
                                    <span>{address.label}</span>
                                </div>
                                {address.isPrimary && (
                                    <span className="primary-badge">Utama</span>
                                )}
                            </div>

                            <div className="address-details">
                                <p className="address-name">{address.name}</p>
                                <p className="address-phone">{address.phone}</p>
                                <p className="address-text">
                                    {address.address}<br />
                                    {address.city}, {address.province} {address.postalCode}
                                </p>
                            </div>

                            <div className="address-actions">
                                <button className="action-btn edit" onClick={() => handleEditAddress(address)}>
                                    <Edit2 size={16} />
                                    Ubah
                                </button>
                                {!address.isPrimary && (
                                    <>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(address.id)}
                                        >
                                            <Trash2 size={16} />
                                            Hapus
                                        </button>
                                        <button
                                            className="action-btn primary"
                                            onClick={() => handleSetPrimary(address.id)}
                                        >
                                            Jadikan Utama
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {showAddForm && (
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Tambah Alamat Baru</h3>
                            <div className="form-section">
                                <div className="form-group">
                                    <label>Label Alamat</label>
                                    <select>
                                        <option>Rumah</option>
                                        <option>Kantor</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Nama Penerima</label>
                                    <input type="text" placeholder="Masukkan nama penerima" />
                                </div>
                                <div className="form-group">
                                    <label>Nomor Telepon</label>
                                    <input type="tel" placeholder="+62" />
                                </div>
                                <div className="form-group">
                                    <label>Alamat Lengkap</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Jalan, nomor rumah, patokan"
                                        value={selectedLocation?.address || ''}
                                        readOnly
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="map-picker-btn"
                                    onClick={() => setShowMapModal(true)}
                                >
                                    <Map size={18} />
                                    Pilih di Peta
                                </button>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Kota</label>
                                        <input type="text" placeholder="Kota" />
                                    </div>
                                    <div className="form-group">
                                        <label>Kode Pos</label>
                                        <input type="text" placeholder="12345" />
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
                                        Batal
                                    </button>
                                    <button className="save-btn">
                                        Simpan Alamat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showMapModal && (
                    <AddressMap
                        initialPosition={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null}
                        onConfirm={handleMapConfirm}
                        onClose={() => setShowMapModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default MyAddress;
