import { useState, useEffect } from 'react';
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
    Wallet as WalletIcon,
    Truck,
    Navigation as NavigationIcon,
    BarChart2,
    Tags,
    TrendingUp,
    AlertTriangle,
    MoreVertical,
    CheckCircle
} from 'lucide-react';
import './Dashboard.css';
import AddressMap from './AddressMap';
import AppBar from './components/AppBar';
import storeCover from './assets/branding/store_cover.png';

const SellerDashboard = ({ onBack, onNavigate, activeView }) => {
    const [activeTab, setActiveTab] = useState('main'); // main, addProduct, orderDetail
    
    // Sync external view with internal tab
    useEffect(() => {
        if (activeView === 'seller-products') setActiveTab('productsList');
        if (activeView === 'add-product') setActiveTab('addProduct');
        if (activeView === 'seller-orders') setActiveTab('ordersList');
        if (activeView === 'home' || activeView === 'seller') setActiveTab('main');
    }, [activeView]);

    // Scroll to top when internal view changes
    useEffect(() => {
        document.querySelectorAll('.dashboard-content, .scroll-content').forEach(el => el.scrollTop = 0);
    }, [activeTab]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [productCategory, setProductCategory] = useState('Kuliner');
    const [showMapModal, setShowMapModal] = useState(false);
    const [storeLocation, setStoreLocation] = useState({
        lat: -0.8917,
        lng: 119.8707,
        address: 'Jl. Sam Ratulangi, Palu City, Sulawesi Tengah'
    });

    const [productFilter, setProductFilter] = useState('Semua');
    const [myProducts, setMyProducts] = useState([
        { id: '1', name: 'Bawang Goreng Palu Super 500g', category: 'Kuliner', price: 'Rp 65.000', stock: 24, sold: 112, isActive: true },
        { id: '2', name: 'Kain Tenun Donggala Asli (Sutra)', category: 'Barang', price: 'Rp 250.000', stock: 5, sold: 8, isActive: true },
        { id: '3', name: 'Kopi Toraja Premium 250g', category: 'Kuliner', price: 'Rp 45.000', stock: 0, sold: 450, isActive: false },
        { id: '4', name: 'Kerajinan Kayu Eboni Palu', category: 'Barang', price: 'Rp 120.000', stock: 12, sold: 34, isActive: true },
        { id: '5', name: 'Sambal Roa Botolan 200ml', category: 'Kuliner', price: 'Rp 25.000', stock: 0, sold: 89, isActive: false }
    ]);

    const handleToggleProduct = (id) => {
        setMyProducts(products => 
            products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p)
        );
    };

    const [orderFilterTab, setOrderFilterTab] = useState('Baru');
    const [myOrders, setMyOrders] = useState([
        { id: '#ORD-991', buyer: 'Asep Saepul', items: 'Kopi Toraja + 2 lainnya', status: 'Baru', price: 'Rp 145.000', time: 'Baru saja', img: '' },
        { id: '#ORD-990', buyer: 'Budi Santoso', items: 'Kain Tenun Donggala', status: 'Baru', price: 'Rp 250.000', time: '12 mnt lalu', img: '' },
        { id: '#ORD-988', buyer: 'Cindy', items: 'Sambal Roa Botolan (x3)', status: 'Diproses', price: 'Rp 75.000', time: '45 mnt lalu', img: '' },
        { id: '#ORD-985', buyer: 'Deni', items: 'Kerajinan Eboni', status: 'Ajak Kurir', price: 'Rp 120.000', time: 'Kemarin', img: '' }
    ]);

    const handleProcessOrder = (id) => {
        setMyOrders(orders => orders.map(o => o.id === id ? { ...o, status: 'Diproses' } : o));
        setOrderFilterTab('Diproses');
    };

    const handleCallCourier = (id) => {
        setMyOrders(orders => orders.map(o => o.id === id ? { ...o, status: 'Ajak Kurir' } : o));
        setOrderFilterTab('Ajak Kurir');
        alert("Pencarian kurir terdekat dimulai!"); // Simulasi modal
    };

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

    const renderMainView = () => (
        <div className="scroll-content">
            
            {/* Financial Hero Card */}
            <div className="financial-hero-card fadeIn">
                <div className="financial-header">
                    <span>Saldo Tersedia</span>
                    <div className="financial-trend">
                        <TrendingUp size={12} color="white" />
                        +15%
                    </div>
                </div>
                <div className="financial-balance">Rp {(netRevenue / 1000).toLocaleString('id-ID')}.000</div>
                <div className="financial-actions">
                    <button className="btn-withdraw" onClick={() => onNavigate('wallet')}>
                        Tarik Dana
                    </button>
                    <button className="btn-history" onClick={() => onNavigate('wallet')}>
                        Riwayat
                    </button>
                </div>
            </div>

            {/* Urgent Tasks Banner */}
            <div className="urgent-banner fadeIn" onClick={() => setActiveTab('ordersList')} style={{ cursor: 'pointer' }}>
                <div className="urgent-banner-icon">
                    <AlertTriangle size={18} strokeWidth={2.5} />
                </div>
                <div className="urgent-banner-text">
                    <div className="urgent-banner-title">2 Pesanan Mendekati Batas!</div>
                    <div className="urgent-banner-desc">Segera kirim hari ini untuk hindari penalti.</div>
                </div>
                <ArrowRight size={16} color="#be123c" />
            </div>

            <div className="section-title">
                <h3>Pusat Bisnis</h3>
            </div>

            <div className="actions-grid">
                <button className="action-btn card" onClick={() => {}}>
                    <span className="action-icon"><BarChart2 size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Analisa Toko</span>
                </button>
                <button className="action-btn card" onClick={() => {}}>
                    <span className="action-icon"><Tags size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Promo & Diskon</span>
                </button>
                <button className="action-btn card" onClick={() => {}}>
                    <span className="action-icon"><MessageSquare size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Chat Pembeli</span>
                </button>
                <button className="action-btn card" onClick={() => setActiveTab('profile')}>
                    <span className="action-icon"><Settings size={24} strokeWidth={1.5} color="var(--primary)" /></span>
                    <span className="action-text">Profil Toko</span>
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

    const renderProductsListView = () => {
        const filteredProducts = myProducts.filter(p => {
            if (productFilter === 'Aktif') return p.isActive;
            if (productFilter === 'Habis') return !p.isActive;
            return true;
        });

        const activeCount = myProducts.filter(p => p.isActive).length;
        const outOfStockCount = myProducts.filter(p => !p.isActive).length;

        return (
            <div className="scroll-content" style={{ paddingBottom: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ margin: '0 0 4px', fontSize: '20px' }}>Daftar Produk</h2>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Miliki kontrol penuh atas katalog Anda</span>
                    </div>
                </div>

                <div className="stats-grid" style={{ marginBottom: '16px' }}>
                    <div className="stat-card card" style={{ padding: '12px' }}>
                        <span className="stat-label">Produk Aktif</span>
                        <span className="stat-value" style={{ color: 'var(--primary)', fontSize: '20px' }}>{activeCount}</span>
                    </div>
                    <div className="stat-card card" style={{ padding: '12px' }}>
                        <span className="stat-label">Stok Habis</span>
                        <span className="stat-value" style={{ color: '#ef4444', fontSize: '20px' }}>{outOfStockCount}</span>
                    </div>
                </div>

                <div className="filter-pills">
                    {['Semua', 'Aktif', 'Habis'].map(f => (
                        <div 
                            key={f} 
                            className={`filter-pill ${productFilter === f ? 'active' : ''}`}
                            onClick={() => setProductFilter(f)}
                        >
                            {f}
                        </div>
                    ))}
                </div>

                <div className="product-list-container">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={`seller-product-card card fadeIn ${!product.isActive ? 'inactive' : ''}`}>
                            <div className="seller-product-img">
                                {/* Simulasi gambar menggunakan ikon jika kosong */}
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', borderRadius: '8px' }}>
                                    <Package size={24} color="#94a3b8" />
                                </div>
                            </div>
                            <div className="seller-product-info">
                                <div className="seller-product-title">{product.name}</div>
                                <div className="seller-product-category">{product.category}</div>
                                <div className="seller-product-price">{product.price}</div>
                                <div className="seller-product-stats">
                                    <span className={product.stock === 0 ? 'alert' : ''}>Stok: {product.stock}</span>
                                    <span>•</span>
                                    <span>Terjual: {product.sold}</span>
                                </div>
                            </div>
                            <div className="seller-product-actions">
                                <MoreVertical size={18} color="var(--text-muted)" />
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={product.isActive} 
                                        onChange={() => handleToggleProduct(product.id)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderOrdersListView = () => {
        const filteredOrders = myOrders.filter(o => o.status === orderFilterTab);
        const newOrdersCount = myOrders.filter(o => o.status === 'Baru').length;

        return (
            <div className="scroll-content" style={{ paddingBottom: '80px', paddingTop: '8px' }}>
                {/* Kanban Tabs */}
                <div className="order-kanban-tabs">
                    {['Baru', 'Diproses', 'Ajak Kurir', 'Selesai'].map(tab => (
                        <div 
                            key={tab} 
                            className={`kanban-tab ${orderFilterTab === tab ? 'active' : ''}`}
                            onClick={() => setOrderFilterTab(tab)}
                        >
                            {tab}
                            {tab === 'Baru' && newOrdersCount > 0 && (
                                <span className="kanban-badge">{newOrdersCount}</span>
                            )}
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                        <Package size={48} opacity={0.3} style={{ marginBottom: '16px' }} />
                        <p>Tidak ada pesanan di tahap ini.</p>
                    </div>
                ) : (
                    <div className="order-list-container">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="order-list-card fadeIn">
                                <div className="order-list-card-header">
                                    <h4>{order.id}</h4>
                                    <span className="time">{order.time}</span>
                                </div>
                                <div className="order-list-card-body">
                                    <div className="order-list-card-img">
                                        <Package size={24} color="#94a3b8" />
                                    </div>
                                    <div className="order-list-card-details">
                                        <div className="order-buyer-name">{order.buyer}</div>
                                        <div className="order-item-desc">{order.items}</div>
                                    </div>
                                </div>
                                <div className="order-list-card-footer">
                                    <div className="order-total-price">{order.price}</div>
                                    
                                    {order.status === 'Baru' && (
                                        <button className="btn-smart-action" onClick={() => handleProcessOrder(order.id)}>
                                            <CheckCircle size={16} /> Terima & Proses
                                        </button>
                                    )}
                                    
                                    {order.status === 'Diproses' && (
                                        <button className="btn-smart-action" onClick={() => handleCallCourier(order.id)}>
                                            <Truck size={16} /> Panggil Kurir
                                        </button>
                                    )}

                                    {order.status === 'Ajak Kurir' && (
                                        <button className="btn-smart-action alt" onClick={() => {}}>
                                            <NavigationIcon size={16} /> Lacak Kurir
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderAddProductView = () => (
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

    const renderOrderDetailView = () => (
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

    const renderStoreProfileView = () => (
        <div className="scroll-content" style={{ padding: 0 }}>
            <div className="profile-header-premium">
                <div className="store-cover-container">
                    <img src={storeCover} alt="Store Cover" className="store-cover-img" />
                    <div className="cover-overlay"></div>
                    <div className="cover-edit-badge">
                        <Camera size={18} />
                    </div>
                </div>
                
                <div className="avatar-overlap-wrapper">
                    <div className="profile-avatar-large">
                        <Store size={40} color="var(--primary)" />
                        <div className="edit-badge">
                            <Camera size={14} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-card card" style={{ marginTop: '40px', background: 'transparent', boxShadow: 'none' }}>
                <div style={{ marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px' }}>Pengaturan Profil</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Kelola informasi identitas toko Anda</p>
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
                            activeTab === 'orderDetail' ? 'Detail Pesanan' :
                                activeTab === 'productsList' ? 'Kelola Produk' : 
                                activeTab === 'ordersList' ? 'Pesanan Masuk' : 'Profil Toko'
                }
                onBack={['main', 'addProduct', 'productsList', 'ordersList'].includes(activeTab) ? null : () => setActiveTab('main')}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            {activeTab === 'main' && renderMainView()}
            {activeTab === 'productsList' && renderProductsListView()}
            {activeTab === 'ordersList' && renderOrdersListView()}
            {activeTab === 'addProduct' && renderAddProductView()}
            {activeTab === 'orderDetail' && renderOrderDetailView()}
            {activeTab === 'profile' && renderStoreProfileView()}

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
