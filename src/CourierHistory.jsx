import { useState } from 'react';
import {
    Search,
    Calendar,
    CheckCircle2
} from 'lucide-react';

const CourierHistory = ({ isSimplified = false }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const historyData = [
        { id: '#T-988', date: '04 Feb 2026', time: '14:20', income: 'Rp 15.000', status: 'Selesai', shop: 'Toko Batik Jaya', customer: 'Andi Pratama' },
        { id: '#T-985', date: '03 Feb 2026', time: '18:10', income: 'Rp 12.000', status: 'Selesai', shop: 'Warung Bu Siti', customer: 'Maya Sari' },
        { id: '#T-980', date: '03 Feb 2026', time: '11:45', income: 'Rp 18.000', status: 'Selesai', shop: 'Mart 24/7', customer: 'Deni Indrayana' },
        { id: '#T-975', date: '02 Feb 2026', time: '20:30', income: 'Rp 10.000', status: 'Selesai', shop: 'Ayam Penyet Mbak Ida', customer: 'Siti Aminah' },
        { id: '#T-970', date: '01 Feb 2026', time: '15:15', income: 'Rp 20.000', status: 'Selesai', shop: 'Toko Elektronik Maju', customer: 'Rudi Hermawan' },
    ];

    const filteredHistory = historyData.filter(item =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isSimplified) {
        return (
            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="history-item glass-card" style={{
                        padding: '12px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#f0fdf4',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CheckCircle2 size={14} color="#10b981" />
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>{item.id}</div>
                                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{item.shop}</div>
                            </div>
                        </div>
                        <div style={{ fontWeight: '900', color: 'var(--courier-secondary)', fontSize: '14px' }}>{item.income}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="scroll-content">
            <div className="search-filter-row" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div className="glass-card" style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.6)',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <Search size={18} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Cari ID atau Toko..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', background: 'transparent' }}
                    />
                </div>
                <button className="glass-card" style={{
                    padding: '10px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--courier-primary)'
                }}>
                    <Calendar size={20} />
                </button>
            </div>

            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '80px' }}>
                {filteredHistory.map((item, index) => (
                    <div key={index} className="history-item glass-card" style={{
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#f0fdf4',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CheckCircle2 size={20} color="#10b981" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>{item.id}</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{item.date}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#1e293b', fontWeight: '600' }}>
                                    {item.shop} <span style={{ color: '#94a3b8', fontWeight: '400' }}>→</span> {item.customer}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                    Selesai pukul {item.time}
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '900', color: 'var(--courier-secondary)', fontSize: '15px' }}>{item.income}</div>
                            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: '800', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>Sukses</div>
                        </div>
                    </div>
                ))}

                {filteredHistory.length === 0 && (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                        <p style={{ fontWeight: '600' }}>Riwayat tidak ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierHistory;
