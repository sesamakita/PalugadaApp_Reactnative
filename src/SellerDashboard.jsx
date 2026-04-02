import { useState } from 'react';
import {
    ChevronLeft,
    Plus,
    Package,
    MessageSquare,
    Settings,
    Camera,
    ArrowRight,
    Store,
    Clock,
    Map,
    Wallet as WalletIcon
} from 'lucide-react';
import './Dashboard.css';
import AddressMap from './AddressMap';
import AppBar from './components/AppBar';

const SellerDashboard = ({ onBack, onNavigate }) => {
    const [activeTab, setActiveTab] = useState('main'); // main, addProduct, orderDetail
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [productCategory, setProductCategory] = useState('Kuliner');
    const [showMapModal, setShowMapModal] = useState(false);
    const [storeLocation, setStoreLocation] = useState({
        lat: -0.8917,
        lng: 119.8707,
        address: 'Jl. Sam Ratulangi, Palu City, Sulawesi Tengah'
    });

    // Helper: parse "Rp 450.000" → 450000
    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    const grossRevenue = 2500000; // Rp 2.5jt
    const platformFeePercent = 0.03;
    const totalPlatformFee = Math.round(grossRevenue * platformFeePercent);
    const netRevenue = grossRevenue - totalPlatformFee;

    const stats = [
        { label: 'Pesanan Baru', value: '5', color: '#0ead98' },
        { label: 'Total Produk', value: '12', color: '#fbb03b' },
        { label: 'Pendapatan Bersih', value: `Rp ${(netRevenue / 1000000).toFixed(1)}jt`, color: '#0ead98' },
    ];

    const recentOrders = [
        { id: '#12345', buyer: 'Asep Saepul', product: 'Tenun Bomba Palu', status: 'Siap Dikirim', price: 'Rp 750.000', date: '27 Feb 2026', address: 'Jl. Basuki Rahmat, Palu' },
        { id: '#12344', buyer: 'Linda Sari', product: 'Bawang Goreng Palu', status: 'Selesai', price: 'Rp 65.000', date: '26 Feb 2026', address: 'Donggala' },
    ];

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setActiveTab('orderDetail');
    };

    const handleMapConfirm = (locationData) => {
        setStoreLocation(locationData);
        setShowMapModal(false);
    };

    // --- Sub-Views ---

    const MainView = () => (
        <div className="scroll-content">
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card card">
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="section-title">
                <h3>Kelola Toko</h3>
            </div>

            <div className="actions-grid">
                <button className="action-btn card" onClick={() => setActiveTab('addProduct')}>
                    <span className="action-icon"><Plus size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Tambah Produk</span>
                </button>
                <button className="action-btn card">
                    <span className="action-icon"><Package size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Stok Barang</span>
                </button>
                <button className="action-btn card">
                    <span className="action-icon"><MessageSquare size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Chat Pembeli</span>
                </button>
                <button className="action-btn card" onClick={() => setActiveTab('profile')}>
                    <span className="action-icon"><Settings size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Profil Toko</span>
                </button>
                <button className="action-btn card" onClick={() => onNavigate('wallet')}>
                    <span className="action-icon"><WalletIcon size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Dompet Toko</span>
                </button>

                {/* 🎯 TEST BUTTON FOR SELLER REGISTRATION */}
                <button
                    className="action-btn card"
                    onClick={() => onNavigate('seller-registration')}
                    style={{ background: 'linear-gradient(135deg, #0ead9820, #fbb03b20)', border: '1px solid var(--primary)' }}
                >
                    <span className="action-icon"><Plus size={24} strokeWidth={2} color="var(--primary)" /></span>
                    <span className="action-text" style={{ fontWeight: '800' }}>🎯 Demo: Daftar Penjual</span>
                </button>
            </div>

            <div className="section-title">
                <h3>Pesanan Terbaru</h3>
                <span className="view-all">Lihat Semua</span>
            </div>

            <div className="orders-list">
                {recentOrders.map((order, i) => (
                    <div key={i} className="order-card card" onClick={() => handleOrderClick(order)} style={{ cursor: 'pointer' }}>
                        <div className="order-header">
                            <span className="order-id">{order.id}</span>
                            <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span>
                        </div>
                        <div className="order-body">
                            <div className="order-info">
                                <div className="order-buyer">{order.buyer}</div>
                                <div className="order-product">{order.product}</div>
                            </div>
                            <div className="order-price">{order.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const AddProductView = () => (
        <div className="scroll-content">
            <div className="form-card card">
                <h3>Tambah Produk Baru</h3>
                <div className="form-group">
                    <label>Nama Produk</label>
                    <input type="text" placeholder="Contoh: Batik Tulis Eksklusif" />
                </div>
                <div className="form-group">
                    <label>Kategori</label>
                    <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                        <option value="Kuliner">Kuliner</option>
                        <option value="Barang">Barang (Fisik)</option>
                        <option value="Jasa">Jasa</option>
                    </select>
                </div>

                {/* Conditional Fields based on Category */}
                {productCategory === 'Barang' && (
                    <div className="form-extra-fields fadeIn">
                        <div className="form-group">
                            <label>Berat Produk (Gram)</label>
                            <input type="number" placeholder="Contoh: 500" />
                        </div>
                        <div className="form-group">
                            <label>Stok Barang</label>
                            <input type="number" placeholder="0" />
                        </div>
                        <div className="form-group">
                            <label>Kondisi</label>
                            <div className="radio-group">
                                <label><input type="radio" name="condition" value="new" defaultChecked /> Baru</label>
                                <label style={{ marginLeft: '16px' }}><input type="radio" name="condition" value="used" /> Bekas</label>
                            </div>
                        </div>
                    </div>
                )}

                {productCategory === 'Kuliner' && (
                    <div className="form-extra-fields fadeIn">
                        <div className="form-group">
                            <label>Masa Kadaluarsa</label>
                            <input type="date" />
                        </div>
                        <div className="form-group">
                            <label>Suhu Penyimpanan</label>
                            <select>
                                <option>Suhu Ruang</option>
                                <option>Lemari Es (Chiller)</option>
                                <option>Beku (Frozen)</option>
                            </select>
                        </div>
                    </div>
                )}

                {productCategory === 'Jasa' && (
                    <div className="form-extra-fields fadeIn">
                        <div className="form-group">
                            <label>Estimasi Pengerjaan (Hari/Jam)</label>
                            <input type="text" placeholder="Contoh: 2 Jam atau 1 Hari" />
                        </div>
                        <div className="form-group">
                            <label>Cakupan Layanan</label>
                            <input type="text" placeholder="Contoh: Seluruh Palu" />
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <label>Harga (Rp)</label>
                    <input type="number" placeholder="0" />
                </div>
                <div className="form-group">
                    <label>Unggah Foto</label>
                    <div className="upload-box">
                        <Camera size={24} strokeWidth={1.5} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>Ketuk untuk pilih foto</p>
                    </div>
                </div>
                <button className="btn-primary full-width" onClick={() => setActiveTab('main')}>Simpan Produk</button>
            </div>
        </div>
    );

    const OrderDetailView = () => (
        <div className="scroll-content">
            <div className="detail-card card">
                <div className="order-header">
                    <h3>Detail Pesanan {selectedOrder.id}</h3>
                    <span className={`status-badge ${selectedOrder.status.toLowerCase().replace(' ', '-')}`}>{selectedOrder.status}</span>
                </div>
                <div className="detail-info-row">
                    <label>Pembeli:</label>
                    <span>{selectedOrder.buyer}</span>
                </div>
                <div className="detail-info-row">
                    <label>Produk:</label>
                    <span>{selectedOrder.product}</span>
                </div>
                <div className="detail-info-row">
                    <label>Alamat:</label>
                    <span>{selectedOrder.address}</span>
                </div>
                <div style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', margin: '12px 0', paddingTop: '12px' }}>
                    <div className="detail-info-row">
                        <label>Harga Produk:</label>
                        <span>{selectedOrder.price}</span>
                    </div>
                    <div className="detail-info-row" style={{ color: '#ef4444' }}>
                        <label style={{ color: '#ef4444' }}>Potongan Platform (3%):</label>
                        <span>- Rp {Math.round(parsePrice(selectedOrder.price) * platformFeePercent).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="detail-info-row" style={{ fontWeight: '800', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <label style={{ fontWeight: '800' }}>Pendapatan Bersih:</label>
                        <span className="price-text">Rp {(parsePrice(selectedOrder.price) - Math.round(parsePrice(selectedOrder.price) * platformFeePercent)).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                {selectedOrder.status === 'Siap Dikirim' && (
                    <div className="action-footer">
                        <button className="btn-primary full-width" onClick={() => setActiveTab('main')}>
                            Panggil Kurir <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const StoreProfileView = () => (
        <div className="scroll-content">
            <div className="form-card card">
                <div className="profile-header-edit">
                    <div className="profile-avatar-large">
                        <Store size={40} color="var(--primary)" />
                        <div className="edit-badge"><Camera size={14} /></div>
                    </div>
                    <h3>Profil Toko</h3>
                </div>

                <div className="form-group">
                    <label>Nama Toko</label>
                    <input type="text" defaultValue="Toko Berkah Bangkalan" />
                </div>
                <div className="form-group">
                    <label>Deskripsi Toko</label>
                    <textarea
                        defaultValue="Menyediakan berbagai macam batik tulis Madura asli dengan kualitas terbaik dan harga terjangkau."
                        rows="4"
                        className="custom-textarea"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Lokasi (Kota)</label>
                    <input type="text" defaultValue="Bangkalan, Madura" />
                </div>
                <div className="form-group">
                    <label>Lokasi Toko</label>
                    <textarea
                        value={storeLocation?.address || 'Bangkalan, Madura'}
                        rows="2"
                        className="custom-textarea"
                        readOnly
                    ></textarea>
                </div>
                <button
                    type="button"
                    className="map-picker-btn"
                    onClick={() => setShowMapModal(true)}
                    style={{ marginBottom: '16px' }}
                >
                    <Map size={18} />
                    Pilih Lokasi di Peta
                </button>
                <div className="form-group">
                    <label>Jam Operasional</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Clock size={16} color="var(--text-muted)" />
                        <span style={{ fontSize: '14px' }}>08:00 - 21:00</span>
                    </div>
                </div>

                <div className="action-footer">
                    <button className="btn-primary full-width" onClick={() => setActiveTab('main')}>Simpan Perubahan</button>
                    <button className="btn-secondary full-width" style={{ marginTop: '12px' }} onClick={() => setActiveTab('main')}>Logout Toko</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <AppBar
                title={
                    activeTab === 'main' ? 'Panel Penjual' :
                        activeTab === 'addProduct' ? 'Tambah Produk' :
                            activeTab === 'orderDetail' ? 'Detail Pesanan' : 'Profil Toko'
                }
                onBack={() => activeTab === 'main' ? onBack() : setActiveTab('main')}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            {activeTab === 'main' && <MainView />}
            {activeTab === 'addProduct' && <AddProductView />}
            {activeTab === 'orderDetail' && <OrderDetailView />}
            {activeTab === 'profile' && <StoreProfileView />}

            {showMapModal && (
                <AddressMap
                    initialPosition={storeLocation ? [storeLocation.lat, storeLocation.lng] : null}
                    onConfirm={handleMapConfirm}
                    onClose={() => setShowMapModal(false)}
                />
            )}
        </div>
    );
};

export default SellerDashboard;
