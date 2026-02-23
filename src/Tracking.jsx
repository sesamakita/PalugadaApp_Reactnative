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
    Activity
} from 'lucide-react';
import './Tracking.css';

const Tracking = ({ onBack }) => {
    const steps = [
        { status: 'Diterima', time: '14:20', description: 'Paket telah diterima oleh pembeli.', completed: true, icon: <CheckCircle size={18} /> },
        { status: 'Dalam Perjalanan', time: '13:00', description: 'Kurir sedang menuju lokasi Anda.', active: true, icon: <Bike size={18} /> },
        { status: 'Barang Diambil', time: '10:30', description: 'Kurir telah mengambil paket dari toko.', completed: true, icon: <Package size={18} /> },
        { status: 'Pesanan Diproses', time: '09:00', description: 'Penjual sedang menyiapkan pesanan.', completed: true, icon: <Activity size={18} /> },
    ];

    return (
        <div className="tracking-container">
            <header className="tracking-nav">
                <div className="tracking-nav-title">Lacak Pesanan</div>
            </header>

            <div className="map-view">
                {/* Mock Map */}
                <div className="mock-map">
                    <div className="user-marker">
                        <MapPin size={24} color="#0ead98" fill="#0ead98" fillOpacity={0.2} />
                    </div>
                    <div className="courier-marker">
                        <Bike size={24} color="#fbb03b" />
                    </div>
                    <div className="map-overlay">
                        <div className="courier-info card">
                            <div className="courier-avatar">
                                <User size={24} color="var(--text-muted)" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="courier-name">Andi Setiawan</div>
                                <div className="courier-vehicle">Honda Vario • AG 1234 XY</div>
                            </div>
                            <button className="call-btn">
                                <Phone size={18} color="white" fill="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tracking-details">
                <h3>Status Pengiriman</h3>
                <div className="timeline">
                    {steps.map((step, index) => (
                        <div key={index} className={`timeline-item ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                            <div className="timeline-dot">
                                {step.active && <div className="dot-pulse"></div>}
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="timeline-status">
                                        {step.status}
                                    </span>
                                    <span className="timeline-time">
                                        <Clock size={12} style={{ marginRight: '4px' }} /> {step.time}
                                    </span>
                                </div>
                                <p className="timeline-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracking;
