import { useState, useEffect } from 'react';
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
    Users,
    ChevronRight,
    MapPin,
    Search,
    RefreshCw,
    Play,
    Pause,
    Award
} from 'lucide-react';
import './Dashboard.css';
import CourierHistory from './CourierHistory';
import CourierEarnings from './CourierEarnings';
import AppBar from './components/AppBar';

const CourierDashboard = ({ onBack, onNavigate, activeView }) => {
    // view: home, tasks, map, taskDetail
    const [view, setView] = useState('home');
    const [taskTab, setTaskTab] = useState('aktif'); // aktif, tersedia
    const [selectedTask, setSelectedTask] = useState(null);
    const [isOnline, setIsOnline] = useState(true);
    const [showPoD, setShowPoD] = useState(false);
    const [podCaptured, setPodCaptured] = useState(false);

    // Sync external view with internal sub-views
    useEffect(() => {
        if (activeView === 'home' || activeView === 'courier') setView('home');
        if (activeView === 'available-orders') {
            setView('tasks');
            setTaskTab('tersedia');
        }
        if (activeView === 'courier-map') setView('map');
    }, [activeView]);

    // Scroll to top when view changes
    useEffect(() => {
        document.querySelectorAll('.dashboard-content, .scroll-content').forEach(el => el.scrollTop = 0);
    }, [view, taskTab]);

    const platformFeePercent = 0.02;

    // Helper: parse "Rp 15.000" → 15000
    const parseIncome = (str) => parseInt(str.replace(/[^0-9]/g, '')) || 0;

    const grossDailyIncome = 65000;
    const netDailyIncome = grossDailyIncome - Math.round(grossDailyIncome * platformFeePercent);

    const courierInfo = {
        name: 'Deni Indrayana',
        serviceType: 'local', // local, trans
        fleet: 'Motorcycle',
        rating: 4.9,
        totalDeliveries: 128
    };

    const tasks = [
        { id: '#T-992', shop: 'Toko Batik Jaya', customer: 'Andi Pratama', status: 'Siap Pickup', type: 'local', income: 'Rp 15.000', shopAddr: 'Pasar Baru Blok A', custAddr: 'Jl. Ahmad Yani No. 10', shopPhone: '628123456789', custPhone: '628987654321', lat: -7.2504, lng: 112.7688, distance: '1.2 km' },
        { id: '#T-991', shop: 'Warung Bu Siti', customer: 'Maya Sari', status: 'Dalam Antar', type: 'local', income: 'Rp 12.000', shopAddr: 'Jl. Mawar No. 4', custAddr: 'Jl. Sudirman Gg. 5', shopPhone: '628123456789', custPhone: '628987654321', lat: -7.2575, lng: 112.7521, distance: '2.5 km' },
        { id: '#T-985', shop: 'Gudang Logistik Palu', customer: 'Toko Berkah Poso', status: 'Siap Pickup', type: 'trans', income: 'Rp 245.000', shopAddr: 'Kawasan Pergudangan Palu', custAddr: 'Jl. Trans Sulawesi, Poso', shopPhone: '628123456789', custPhone: '628987654321', lat: -1.4265, lng: 120.6588, distance: '35 km' },
    ];

    const marketTasks = [
        { id: '#T-999', shop: 'Nasi Kuning Ambon', customer: 'Budi Hartono', type: 'local', income: 'Rp 18.000', distance: '0.8 km', eta: '5 menit' },
        { id: '#T-998', shop: 'Apotek Segar', customer: 'Rina Melati', type: 'local', income: 'Rp 10.000', distance: '1.5 km', eta: '8 menit' },
        { id: '#T-997', shop: 'Mega Logistik', customer: 'Toko Maju Parigi', type: 'trans', income: 'Rp 180.000', distance: '12 km', eta: '25 menit' },
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
            setView('tasks');
        }
    };

    const handleConfirmPoD = () => {
        setShowPoD(false);
        setPodCaptured(false);
        setView('tasks');
    };

    // --- Sub-View Renderers ---

    const renderHome = () => (
        <div className="scroll-content" style={{ paddingBottom: '40px' }}>
            {/* Header Premium */}
            <div className="courier-hero-header fadeIn">
                <div className="courier-profile-row" style={{ justifyContent: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="courier-avatar-wrapper">
                            <div className="courier-avatar-glow">
                                {courierInfo.name.charAt(0)}
                            </div>
                            <div className={`online-pulse-dot ${isOnline ? 'online' : 'offline'}`} 
                                 style={{ background: isOnline ? '#10b981' : '#94a3b8' }}>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: '800' }}>{courierInfo.name}</div>
                            <div style={{ fontSize: '12px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Award size={14} color="var(--courier-primary)" />
                                Level Gold • {courierInfo.rating} Rating
                            </div>
                        </div>
                    </div>
                </div>

                <div className="courier-main-stats" style={{ gap: '12px', marginBottom: '16px' }}>
                    <div className="stat-item-premium">
                        <span className="label">Pendapatan Hari Ini</span>
                        <span className="value">Rp {netDailyIncome.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="stat-item-premium">
                        <span className="label">Tugas Selesai</span>
                        <span className="value">{courierInfo.totalDeliveries}</span>
                    </div>
                </div>

                {/* Relocated Availability Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.15)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '700' }}>Status Ketersediaan</div>
                        <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>Siap jemput pesanan baru</div>
                    </div>
                    <div className="status-control-wrapper" onClick={() => setIsOnline(!isOnline)} style={{ padding: 0, background: 'transparent', border: 'none' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', opacity: 0.9, marginRight: '10px', letterSpacing: '0.5px' }}>
                            {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </span>
                        <div className={`toggle-switch ${isOnline ? 'active' : ''}`} style={{ width: '48px', height: '26px' }}>
                            <div className="toggle-handle" style={{ width: '20px', height: '20px', transform: isOnline ? 'translateX(22px)' : 'translateX(0)' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }} onClick={() => onNavigate('wallet')}>
                    <DollarSign size={20} color="var(--courier-primary)" style={{ marginBottom: '4px' }} />
                    <div style={{ fontSize: '10px', fontWeight: '700' }}>Dompet</div>
                </div>
                <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }} onClick={() => setView('tasks')}>
                    <Clock size={20} color="var(--courier-primary)" style={{ marginBottom: '4px' }} />
                    <div style={{ fontSize: '10px', fontWeight: '700' }}>Jadwal</div>
                </div>
                <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }} onClick={() => onNavigate('courier-community')}>
                    <Users size={20} color="var(--courier-primary)" style={{ marginBottom: '4px' }} />
                    <div style={{ fontSize: '10px', fontWeight: '700' }}>Warga</div>
                </div>
            </div>

            {/* Performance Summary */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Performa Kurir</h3>
                    <ChevronRight size={18} opacity={0.5} />
                </div>
                <div className="glass-card" style={{ padding: '16px' }}>
                    <CourierEarnings isSimplified={true} />
                </div>
            </div>

            {/* Active Task Preview */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Tugas Berjalan ({tasks.length})</h3>
                    <button className="view-all-link" onClick={() => setView('tasks')}>Lihat Semua</button>
                </div>
                <div className="orders-list">
                    {tasks.slice(0, 2).map((task, j) => (
                        <div key={j} className="order-card glass-card" style={{ padding: '16px' }} onClick={() => handleTaskClick(task)}>
                            <div className="order-header">
                                <span className="order-id" style={{ color: 'var(--courier-secondary)' }}>{task.id}</span>
                                <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                <div style={{ fontSize: '14px', fontWeight: '700' }}>Ke: {task.customer}</div>
                                <div style={{ fontSize: '13px', color: '#0ead98', fontWeight: '800' }}>{task.income}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderTasks = () => (
        <div className="scroll-content">
            <div className="task-tabs glass-card">
                <div className={`task-tab ${taskTab === 'aktif' ? 'active' : ''}`} onClick={() => setTaskTab('aktif')}>
                    Berjalan ({tasks.length})
                </div>
                <div className={`task-tab ${taskTab === 'tersedia' ? 'active' : ''}`} onClick={() => setTaskTab('tersedia')}>
                    Tersedia ({marketTasks.length})
                </div>
            </div>

            {taskTab === 'aktif' ? (
                <div className="orders-list">
                    {tasks.map((task, j) => (
                        <div key={j} className="order-card glass-card" style={{ padding: '16px' }} onClick={() => handleTaskClick(task)}>
                            <div className="order-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="order-id" style={{ color: 'var(--courier-secondary)' }}>{task.id}</span>
                                    <span className={`task-type-tag ${task.type}`}>{task.type === 'local' ? '📦 Lokal' : '🚛 Trans'}</span>
                                </div>
                                <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                            </div>
                            <div className="order-body" style={{ marginTop: '12px' }}>
                                <div className="route-preview">
                                    <div style={{ borderLeft: '2px dashed #ddd', paddingLeft: '12px', position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Pickup: {task.shop}</div>
                                        <div style={{ margin: '8px 0' }}></div>
                                        <div style={{ position: 'absolute', left: '-5px', bottom: '0', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                        <div style={{ fontSize: '13px', fontWeight: '700' }}>Antar: {task.customer}</div>
                                    </div>
                                </div>
                                <div className="order-price" style={{ color: 'var(--courier-secondary)' }}>{task.income}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="orders-list">
                    <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                        <div className="glass-card" style={{ flex: 1, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Search size={16} opacity={0.5} />
                            <input type="text" placeholder="Cari wilayah..." style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '13px' }} />
                        </div>
                        <button className="glass-card" style={{ padding: '8px', border: 'none' }}><MapPin size={18} color="var(--courier-primary)" /></button>
                    </div>
                    {marketTasks.map((task, j) => (
                        <div key={j} className="market-card glass-card">
                            <div className="market-card-header">
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '800', fontSize: '14px' }}>{task.income}</span>
                                    <span className="distance-badge">{task.distance}</span>
                                </div>
                                <span className={`task-type-tag ${task.type}`}>{task.type === 'local' ? 'Lokal' : 'Trans'}</span>
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>{task.shop} → {task.customer}</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn-primary" style={{ flex: 2, padding: '8px', borderRadius: '8px', fontSize: '12px' }} onClick={() => handleTaskClick({...task, status: 'Tersedia'})}>Detail</button>
                                <button className="btn-secondary" style={{ flex: 3, padding: '8px', borderRadius: '8px', fontSize: '12px', background: 'var(--courier-primary)', color: 'white', border: 'none' }}>Ambil Tugas</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderMap = () => (
        <div className="scroll-content" style={{ padding: '0' }}>
            <div className="full-map-container" style={{ borderRadius: '0' }}>
                <img 
                    src="https://api.maptiler.com/maps/basic-v2/static/-120,0,10/800x600.png?key=get_your_own_key" 
                    className="map-placeholder-img" 
                    alt="Map" 
                />
                
                {/* Simulated Marker: Courier */}
                <div className="courier-marker" style={{ top: '50%', left: '50%' }}>
                    <div className="marker-pin"></div>
                    <div style={{ 
                        position: 'absolute', 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        background: 'rgba(245, 158, 11, 0.2)', 
                        top: '-10px', 
                        left: '-10px',
                        animation: 'pulse-ring 2s infinite'
                    }}></div>
                </div>

                {/* Simulated Markers: Orders */}
                <div className="hotspot-glow" style={{ top: '30%', left: '40%' }}></div>
                <div className="hotspot-glow" style={{ top: '60%', left: '70%' }}></div>

                <div className="map-overlay-tools">
                    <button className="map-tool-btn"><RefreshCw size={20} /></button>
                    <button className="map-tool-btn"><MapPin size={20} color="var(--courier-primary)" /></button>
                </div>

                <div className="map-bottom-panel">
                    <div className="glass-card fadeIn" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '800' }}>Ditemukan 12 Tugas</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Terdekat: Pasar Inpres Palu (0.5km)</div>
                        </div>
                        <button 
                            className="btn-primary" 
                            style={{ padding: '8px 16px', borderRadius: '8px' }}
                            onClick={() => { setView('tasks'); setTaskTab('tersedia'); }}
                        >
                            Lihat Daftar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTaskDetailView = () => (
        <div className="scroll-content" style={{ paddingBottom: '40px' }}>
            <div className="detail-card glass-card">
                <div className="order-header">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '16px', margin: 0 }}>Detail Tugas {selectedTask.id}</h3>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>ID: PAL-{(Math.random()*10000).toFixed(0)}</span>
                    </div>
                    <span className={`status-badge ${selectedTask.status.toLowerCase().replace(' ', '-')}`}>{selectedTask.status}</span>
                </div>

                <div className="route-box" style={{ background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', margin: '16px 0' }}>
                    <div className="route-step">
                        <div className="step-point shop"><Store size={14} color="var(--primary)" /></div>
                        <div className="step-info">
                            <label>Pickup: {selectedTask.shop}</label>
                            <p style={{ fontSize: '12px' }}>{selectedTask.shopAddr || 'Pasar Kota'}</p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                <a href="tel:0" className="contact-icon wa" style={{ width: '24px', height: '24px' }}><Phone size={12} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="route-line" style={{ height: '20px' }}></div>
                    <div className="route-step">
                        <div className="step-point customer"><Home size={14} color="#10b981" /></div>
                        <div className="step-info">
                            <label>Antar: {selectedTask.customer}</label>
                            <p style={{ fontSize: '12px' }}>{selectedTask.custAddr || 'Jl. Mawar'}</p>
                        </div>
                    </div>
                </div>

                <div className="action-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button className="btn-secondary full-width glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #ddd' }} onClick={() => handleOpenMap(-7, 112)}>
                        <Navigation size={18} /> Navigasi Maps
                    </button>
                    <button className="btn-primary full-width" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--courier-primary)' }} onClick={handleCompleteTask}>
                        <CheckCircle size={18} />
                        {selectedTask.status === 'Siap Pickup' ? 'Ambil Barang' : selectedTask.status === 'Dalam Antar' ? 'Selesaikan' : 'Ambil Tugas'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <AppBar
                title={view === 'home' ? 'Panel Kurir' : view === 'tasks' ? 'Daftar Tugas' : view === 'map' ? 'Peta Navigasi' : 'Detail'}
                onBack={(view === 'home' || view === 'tasks' || view === 'map') ? null : () => (view !== 'home' ? setView('home') : onBack())}
            />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            <div className="dashboard-content">
                {view === 'home' && renderHome()}
                {view === 'tasks' && renderTasks()}
                {view === 'map' && renderMap()}
                {view === 'taskDetail' && renderTaskDetailView()}
            </div>

            {showPoD && (
                <div className="map-modal-overlay">
                    <div className="map-modal-container glass-card" style={{ maxHeight: '500px' }}>
                        <div className="map-modal-header" style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
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
                                        <p>Ketuk untuk ambil foto</p>
                                    </div>
                                )}
                            </div>
                            <button className="btn-primary full-width" disabled={!podCaptured} onClick={handleConfirmPoD} style={{ background: 'var(--courier-primary)', opacity: podCaptured ? 1 : 0.5 }}>
                                Selesaikan Pengiriman
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourierDashboard;
