import { useState } from 'react';
import {
    ChevronLeft,
    CheckCircle,
    Store,
    Home,
    Navigation,
    DollarSign,
    Clock,
    BarChart3,
    Phone,
    MessageCircle,
    Camera,
    X,
    Check,
    User,
    Users
} from 'lucide-react';
import './Dashboard.css';
import CourierHistory from './CourierHistory';
import CourierEarnings from './CourierEarnings';
import AppBar from './components/AppBar';

const CourierDashboard = ({ onBack, onNavigate }) => {
    const [view, setView] = useState('main'); // main, taskDetail
    const [selectedTask, setSelectedTask] = useState(null);
    const [isOnline, setIsOnline] = useState(true);
    const [showPoD, setShowPoD] = useState(false);
    const [podCaptured, setPodCaptured] = useState(false);

    const platformFeePercent = 0.02;

    // Helper: parse "Rp 15.000" → 15000
    const parseIncome = (str) => parseInt(str.replace(/[^0-9]/g, '')) || 0;

    const grossDailyIncome = 65000;
    const netDailyIncome = grossDailyIncome - Math.round(grossDailyIncome * platformFeePercent);

    const stats = [
        { label: 'Pesanan Aktif', value: '2', color: '#0ead98' },
        { label: 'Pendapatan Bersih Hari Ini', value: `Rp ${netDailyIncome.toLocaleString('id-ID')}`, color: '#fbb03b' },
    ];

    const courierInfo = {
        name: 'Deni Indrayana',
        serviceType: 'local', // local, trans
        fleet: 'Motorcycle'
    };

    const tasks = [
        { id: '#T-992', shop: 'Toko Batik Jaya', customer: 'Andi Pratama', status: 'Siap Pickup', type: 'local', income: 'Rp 15.000', shopAddr: 'Pasar Baru Blok A', custAddr: 'Jl. Ahmad Yani No. 10', shopPhone: '628123456789', custPhone: '628987654321', lat: -7.2504, lng: 112.7688 },
        { id: '#T-991', shop: 'Warung Bu Siti', customer: 'Maya Sari', status: 'Dalam Antar', type: 'local', income: 'Rp 12.000', shopAddr: 'Jl. Mawar No. 4', custAddr: 'Jl. Sudirman Gg. 5', shopPhone: '628123456789', custPhone: '628987654321', lat: -7.2575, lng: 112.7521 },
        { id: '#T-985', shop: 'Gudang Logistik Palu', customer: 'Toko Berkah Poso', status: 'Siap Pickup', type: 'trans', income: 'Rp 245.000', shopAddr: 'Kawasan Pergudangan Palu', custAddr: 'Jl. Trans Sulawesi, Poso', shopPhone: '628123456789', custPhone: '628987654321', lat: -1.4265, lng: 120.6588 },
    ];

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setView('taskDetail');
    };

    const handleOpenMap = (lat, lng) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    };

    const handleCompleteTask = () => {
        if (selectedTask.status === 'Dalam Antar') {
            setShowPoD(true);
        } else {
            setView('main');
        }
    };

    const handleConfirmPoD = () => {
        setShowPoD(false);
        setPodCaptured(false);
        setView('main');
    };

    const DashboardMain = () => (
        <div className="scroll-content" style={{ paddingBottom: '40px' }}>
            {/* Quick Access Buttons */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
            }}>
                <button
                    className="btn-secondary"
                    onClick={() => onNavigate && onNavigate('courier-profile')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px'
                    }}
                >
                    <User size={18} />
                    Profile Saya
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => onNavigate && onNavigate('courier-community')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px'
                    }}
                >
                    <Users size={18} />
                    Komunitas
                </button>
            </div>

            {/* Demo: Courier Registration */}
            <div style={{ marginBottom: '16px' }}>
                <button
                    className="btn-primary"
                    onClick={() => onNavigate && onNavigate('courier-registration')}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px'
                    }}
                >
                    <User size={18} />
                    🎯 Demo: Form Registrasi Kurir (5 Steps)
                </button>
            </div>

            {/* Status Toggle - Correct Placement Above Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div className={`service-badge ${courierInfo.serviceType}`}>
                    {courierInfo.serviceType === 'local' ? '📦 Palugada Lokal' : '🚛 Palugada Trans-Sulteng'}
                </div>
            </div>
            
            <div className={`availability-bar top ${isOnline ? 'online' : 'offline'}`} onClick={() => setIsOnline(!isOnline)}>
                <div className="status-text">
                    <div className={`status-dot ${isOnline ? 'online' : 'offline'}`}></div>
                    <span>Status Kurir: <strong>{isOnline ? 'Aktif (Online)' : 'Istirahat (Offline)'}</strong></span>
                </div>
                <div className={`toggle-switch ${isOnline ? 'active' : ''}`}>
                    <div className="toggle-handle"></div>
                </div>
            </div>

            {/* Quick Stats - Active Orders & Daily Income */}
            {/* Quick Stats - Active Orders & Daily Income */}
            <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '24px', alignItems: 'start' }}>
                <div className="stat-card card">
                    <span className="stat-label">Pesanan Aktif</span>
                    <span className="stat-value" style={{ color: '#0ead98' }}>2</span>
                </div>
                <div className="stat-card card">
                    <span className="stat-label">Pendapatan Bersih Hari Ini</span>
                    <span className="stat-value" style={{ color: '#fbb03b' }}>Rp {netDailyIncome.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <button
                className="btn-primary"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    marginBottom: '24px',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                onClick={() => onNavigate && onNavigate('wallet')}
            >
                <DollarSign size={18} /> Tarik Saldo
            </button>

            {/* Active Tasks Section */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Tugas Sedang Berjalan</h3>
                </div>
                <div className="orders-list">
                    {tasks.map((task, j) => (
                        <div key={j} className="order-card card" onClick={() => handleTaskClick(task)}>
                            <div className="order-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="order-id">{task.id}</span>
                                    <span className={`task-type-tag ${task.type}`}>
                                        {task.type === 'local' ? '📍 Lokal' : '🚛 Trans'}
                                    </span>
                                </div>
                                <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                            </div>
                            <div className="order-body">
                                <div className="order-info">
                                    <div className="order-buyer">Dari: {task.shop}</div>
                                    <div className="order-product">Ke: {task.customer}</div>
                                </div>
                                <div className="order-price" style={{ color: '#0ead98' }}>{task.income}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Integrated Performance Section */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Ringkasan Performa</h3>
                    <button className="view-all-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Tuju Performa <ChevronLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                </div>
                <CourierEarnings isSimplified={true} />
            </div>

            {/* Recent History Section */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Riwayat Terakhir</h3>
                    <button className="view-all-link">Lihat Semua</button>
                </div>
                <CourierHistory isSimplified={true} />
            </div>

        </div>
    );

    const TaskDetailView = () => (
        <div className="scroll-content" style={{ paddingBottom: '40px' }}>
            <div className="detail-card card">
                <div className="order-header">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '16px', margin: 0 }}>Detail Tugas {selectedTask.id}</h3>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>ID Transaksi: PAL-0099238</span>
                    </div>
                    <span className={`status-badge ${selectedTask.status.toLowerCase().replace(' ', '-')}`}>{selectedTask.status}</span>
                </div>

                <div className="route-box">
                    <div className="route-step">
                        <div className="step-point shop">
                            <Store size={16} color="var(--primary)" />
                        </div>
                        <div className="step-info">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>Pickup: {selectedTask.shop}</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <a href={`tel:${selectedTask.shopPhone}`} className="contact-icon"><Phone size={14} /></a>
                                    <a href={`https://wa.me/${selectedTask.shopPhone}`} className="contact-icon wa"><MessageCircle size={14} /></a>
                                </div>
                            </div>
                            <p>{selectedTask.shopAddr}</p>
                        </div>
                    </div>
                    <div className="route-line"></div>
                    <div className="route-step">
                        <div className="step-point customer">
                            <Home size={16} color="var(--secondary)" />
                        </div>
                        <div className="step-info">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>Antar: {selectedTask.customer}</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <a href={`tel:${selectedTask.custPhone}`} className="contact-icon"><Phone size={14} /></a>
                                    <a href={`https://wa.me/${selectedTask.custPhone}`} className="contact-icon wa"><MessageCircle size={14} /></a>
                                </div>
                            </div>
                            <p>{selectedTask.custAddr}</p>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px dashed rgba(0,0,0,0.1)', margin: '12px 0', paddingTop: '12px' }}>
                    <div className="detail-info-row">
                        <label>Ongkos Kirim:</label>
                        <span>{selectedTask.income}</span>
                    </div>
                    <div className="detail-info-row" style={{ color: '#ef4444' }}>
                        <label style={{ color: '#ef4444' }}>Potongan Platform (2%):</label>
                        <span>- Rp {Math.round(parseIncome(selectedTask.income) * platformFeePercent).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="detail-info-row" style={{ fontWeight: '800', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <label style={{ fontWeight: '800' }}>Pendapatan Bersih:</label>
                        <span className="price-text">Rp {(parseIncome(selectedTask.income) - Math.round(parseIncome(selectedTask.income) * platformFeePercent)).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div className="action-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                        className="btn-secondary full-width"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        onClick={() => handleOpenMap(selectedTask.lat, selectedTask.lng)}
                    >
                        <Navigation size={18} /> Buka di Google Maps
                    </button>
                    <button
                        className="btn-primary full-width"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        onClick={handleCompleteTask}
                    >
                        <CheckCircle size={18} />
                        {selectedTask.status === 'Siap Pickup' ? 'Barang Sudah Diambil' : 'Selesaikan Pengiriman'}
                    </button>
                </div>
            </div>

            {showPoD && (
                <div className="map-modal-overlay">
                    <div className="map-modal-container" style={{ maxHeight: '500px' }}>
                        <div className="map-modal-header">
                            <h3>Bukti Pengiriman</h3>
                            <button className="close-btn" onClick={() => setShowPoD(false)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className={`pod-camera-simulator ${podCaptured ? 'captured' : ''}`} onClick={() => setPodCaptured(true)}>
                                {podCaptured ? (
                                    <div className="pod-preview">
                                        <img src="https://images.unsplash.com/photo-1549194388-2469d59ec69c?q=80&w=400&auto=format&fit=crop" alt="POD Preview" />
                                        <div className="captured-overlay"><Check size={32} color="white" /></div>
                                    </div>
                                ) : (
                                    <div className="camera-placeholder">
                                        <Camera size={48} color="#94a3b8" />
                                        <p>Ketuk untuk mengambil foto bukti</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className="btn-primary full-width"
                                disabled={!podCaptured}
                                onClick={handleConfirmPoD}
                                style={{ opacity: podCaptured ? 1 : 0.5 }}
                            >
                                Konfirmasi & Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="dashboard-container">
            <AppBar
                title={view === 'main' ? 'Panel Kurir' : 'Detail Pengiriman'}
                onBack={() => (view === 'taskDetail' ? setView('main') : onBack())}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            <div className="dashboard-content">
                {view === 'main' && <DashboardMain />}
                {view === 'taskDetail' && <TaskDetailView />}
            </div>
        </div>
    );
};

export default CourierDashboard;
