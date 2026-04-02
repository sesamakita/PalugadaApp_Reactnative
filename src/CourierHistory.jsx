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
            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="history-item card" style={{
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                background: '#f0fdf4',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CheckCircle2 size={16} color="#15803d" />
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: '700' }}>{item.id}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.shop}</div>
                            </div>
                        </div>
                        <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px' }}>{item.income}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="scroll-content">
            <div className="search-filter-row" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div className="search-bar-inline" style={{
                    flex: 1,
                    background: 'white',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Cari ID tugas atau nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                </div>
                <button className="filter-btn-icon" style={{
                    background: 'white',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Calendar size={20} color="var(--primary)" />
                </button>
            </div>

            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '80px' }}>
                {filteredHistory.map((item, index) => (
                    <div key={index} className="history-item card" style={{
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#f0fdf4',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CheckCircle2 size={20} color="#15803d" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: '700' }}>{item.id}</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.date} • {item.time}</span>
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '2px', color: 'var(--text-muted)' }}>
                                    Dari: <strong>{item.shop}</strong>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Ke: <strong>{item.customer}</strong>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '14px' }}>{item.income}</div>
                            <div style={{ fontSize: '10px', color: '#15803d', fontWeight: '600' }}>Berhasil</div>
                        </div>
                    </div>
                ))}

                {filteredHistory.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                        <p>Tidak ada riwayat ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourierHistory;
