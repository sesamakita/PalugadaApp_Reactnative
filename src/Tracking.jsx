import React from 'react';
import {
    ChevronLeft,
    MapPin,
    Bike,
    User,
    Phone,
    Clock,
    CheckCircle,
    Package,
    Activity,
    Navigation,
    MessageSquare,
    Store,
    Info
} from 'lucide-react';
import './Tracking.css';
import AppBar from './components/AppBar';

const Tracking = ({ onBack, orderId = 'ORD-2026-X88', eta = '15 Menit' }) => {
    const steps = [
        { status: 'Diterima', time: '14:20', description: 'Paket telah diterima dengan aman oleh pembeli.', completed: true, icon: <CheckCircle size={14} /> },
        { status: 'Dalam Kurir', time: '14:15', description: 'Kurir sedang berada di area alamat tujuan Anda.', active: true, icon: <Navigation size={14} /> },
        { status: 'Menuju Lokasi', time: '14:05', description: 'Pesanan sedang dikirim oleh kurir (Andi Setiawan).', completed: true, icon: <Bike size={14} /> },
        { status: 'Barang Diambil', time: '13:58', description: 'Kurir telah mengambil paket dari Depot Makanan.', completed: true, icon: <Package size={14} /> },
        { status: 'Pesanan Diproses', time: '13:45', description: 'Toko telah memverifikasi dan menyiapkan barang.', completed: true, icon: <Activity size={14} /> },
    ];

    return (
        <div className="tracking-container">
            <AppBar title="Lacak Pesanan" onBack={onBack} />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            {/* 1. ORDER SUMMARY CHIP (Floating Glassmorphism) */}
            <div className="order-summary-chip glass">
                <div className="eta-badge">
                    <Clock size={14} />
                    <span>Tiba dlm {eta}</span>
                </div>
                <div className="order-main-info">
                    <span className="order-id">{orderId}</span>
                    <span className="order-status-tag">Sedang Dikirim</span>
                </div>
            </div>

            {/* 2. IMMERSIVE MAP VIEW */}
            <div className="map-view-v2">
                <div className="simulated-map-bg">
                    {/* SVG Route Path */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path 
                            d="M 20 80 Q 50 60, 30 40 T 70 20" 
                            stroke="rgba(0, 48, 120, 0.1)" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeDasharray="4 4" 
                        />
                        <path 
                            className="route-progress-path"
                            d="M 20 80 Q 50 60, 30 40 T 70 20" 
                            stroke="var(--primary)" 
                            strokeWidth="2" 
                            fill="none" 
                        />
                    </svg>

                    {/* Store (Origin) */}
                    <div className="marker marker-origin">
                        <div className="marker-icon"><Store size={16} color="white" /></div>
                        <div className="marker-label">Depot Makanan</div>
                    </div>

                    {/* Buyer (Destination) */}
                    <div className="marker marker-dest">
                        <div className="marker-icon"><MapPin size={16} color="white" /></div>
                        <div className="marker-label">Rumah Saya</div>
                    </div>

                    {/* Moving Courier */}
                    <div className="marker marker-courier">
                        <div className="courier-vehicle-icon">
                            <Bike size={24} color="var(--primary)" />
                            <div className="courier-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Courier Interaction Panel */}
                <div className="courier-floating-card glass">
                    <div className="courier-profile-mini">
                        <div className="avatar-wrapper">
                            <img src="https://ui-avatars.com/api/?name=Andi+Setiawan&background=003078&color=fff" alt="Kurir" />
                        </div>
                        <div className="info">
                            <div className="name">Andi Setiawan <span className="rating">⭐ 4.9</span></div>
                            <div className="vehicle">Honda Vario • AG 1234 XY</div>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="icon-btn chat"><MessageSquare size={18} /></button>
                        <button className="icon-btn call"><Phone size={18} /></button>
                    </div>
                </div>
            </div>

            {/* 3. TRACKING TIMELINE */}
            <div className="tracking-details-v2">
                <div className="section-header">
                    <h3>Detail Perjalanan</h3>
                    <Info size={16} color="var(--text-muted)" />
                </div>
                
                <div className="address-preview">
                    <div className="point">
                        <div className="dot start"></div>
                        <div className="addr-txt"><strong>Dari:</strong> Jl. Sam Ratulangi No. 12, Palu</div>
                    </div>
                    <div className="path"></div>
                    <div className="point">
                        <div className="dot end"></div>
                        <div className="addr-txt"><strong>Ke:</strong> Perumahan Citra Land Blok C-10</div>
                    </div>
                </div>

                <div className="timeline-v2">
                    {steps.map((step, index) => (
                        <div key={index} className={`timeline-step ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                            <div className="t-indicator">
                                <div className="t-dot">
                                    {step.active ? <Navigation size={12} color="white" /> : step.icon}
                                </div>
                                {index < steps.length - 1 && <div className="t-line"></div>}
                            </div>
                            <div className="t-content">
                                <div className="t-row">
                                    <span className="t-status">{step.status}</span>
                                    <span className="t-time">{step.time}</span>
                                </div>
                                <p className="t-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 4. FOOTER ACTION */}
            <div className="tracking-footer">
                <button className="btn-secondary-v2" onClick={onBack}>Tutup Pelacakan</button>
            </div>
        </div>
    );
};

export default Tracking;
