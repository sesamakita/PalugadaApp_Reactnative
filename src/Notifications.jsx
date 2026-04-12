import React from 'react';
import { ArrowLeft, Bell, Package, Info, Tag, Trash2, Check } from 'lucide-react';
import './Notifications.css';
import AppBar from './components/AppBar';

const Notifications = ({ onBack }) => {
    const notifications = [
        {
            id: 1,
            type: "order",
            title: "Pesanan Telah Sampai",
            desc: "Pesanan #PLG88291 sudah diterima oleh Ahmad. Silakan konfirmasi terima barang.",
            time: "10 Menit lalu",
            isNew: true,
            icon: <Package size={20} />
        },
        {
            id: 2,
            type: "promo",
            title: "Voucher Gratis Ongkir!",
            desc: "Klaim sekarang! Gratis ongkir spesial untuk produk UMKM pilihan daerahmu.",
            time: "2 Jam lalu",
            isNew: true,
            icon: <Tag size={20} />
        },
        {
            id: 3,
            type: "info",
            title: "Keamanan Akun",
            desc: "Ada usaha login baru dari perangkat Chrome di Windows. Jika bukan Anda, segera ubah sandi.",
            time: "5 Jam lalu",
            isNew: false,
            icon: <Info size={20} />
        },
        {
            id: 4,
            type: "order",
            title: "Konfirmasi Pengiriman",
            desc: "Toko Batik Madura telah mengirimkan pesanan Anda. Lacak sekarang!",
            time: "Kemarin",
            isNew: false,
            icon: <Package size={20} />
        }
    ];

    return (
        <div className="notif-view">
            {/* Header */}
            {/* Header */}
            <AppBar title="Notifikasi" onBack={onBack} />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: 'calc(64px + var(--safe-top))' }}></div>

            {/* Notif Content */}
            <div className="notif-content">
                <div className="notif-list">
                    <div className="notif-section-label">Terbaru</div>
                    {notifications.map(notif => (
                        <div key={notif.id} className={`notif-item ${notif.isNew ? 'new' : ''}`}>
                            <div className={`notif-icon-box ${notif.type}`}>
                                {notif.icon}
                            </div>
                            <div className="notif-info">
                                <div className="notif-header">
                                    <h3 className="notif-title">{notif.title}</h3>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                                <p className="notif-desc">{notif.desc}</p>
                            </div>
                            {notif.isNew && <span className="new-notif-dot"></span>}
                        </div>
                    ))}
                </div>

                <button className="clear-all-btn">
                    <Trash2 size={16} />
                    Hapus Semua Riwayat
                </button>
            </div>
        </div>
    );
};

export default Notifications;
