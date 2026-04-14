import {
    BarChart3,
    TrendingUp,
    Wallet,
    ArrowUpRight,
    Calendar
} from 'lucide-react';

const CourierEarnings = ({ isSimplified = false }) => {
    const platformFeePercent = 0.02;

    // Pendapatan kotor
    const grossDaily = 65000;
    const grossWeekly = 480000;
    const grossMonthly = 1850000;

    // Pendapatan bersih setelah potongan 2%
    const netDaily = grossDaily - Math.round(grossDaily * platformFeePercent);
    const netWeekly = grossWeekly - Math.round(grossWeekly * platformFeePercent);
    const netMonthly = grossMonthly - Math.round(grossMonthly * platformFeePercent);

    const earningsStats = [
        { label: 'Harian', value: `Rp ${netDaily.toLocaleString('id-ID')}`, change: '+12%', icon: <Calendar size={20} /> },
        { label: 'Mingguan', value: `Rp ${netWeekly.toLocaleString('id-ID')}`, change: '+5%', icon: <BarChart3 size={20} /> },
        { label: 'Bulanan', value: `Rp ${netMonthly.toLocaleString('id-ID')}`, change: '+8%', icon: <Wallet size={20} /> },
    ];

    const chartData = [
        { day: 'Sen', val: 40 },
        { day: 'Sel', val: 70 },
        { day: 'Rab', val: 50 },
        { day: 'Kam', val: 90 },
        { day: 'Jum', val: 65 },
        { day: 'Sab', val: 110 },
        { day: 'Min', val: 85 },
    ];

    if (isSimplified) {
        return (
            <div className="earnings-summary-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
            }}>
                {earningsStats.map((item, i) => (
                    <div key={i} className="glass-card" style={{ 
                        padding: '12px 8px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '6px',
                        background: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ color: 'var(--courier-primary)', opacity: 0.9 }}>{item.icon}</div>
                        <div>
                            <div style={{ fontSize: '9px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>{item.label}</div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b' }}>{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="scroll-content" style={{ paddingBottom: '80px' }}>
            <div className="earnings-summary-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '20px'
            }}>
                {earningsStats.map((item, i) => (
                    <div key={i} className="glass-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ color: 'var(--courier-primary)' }}>{item.icon}</div>
                        <div>
                            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>{item.label}</div>
                            <div style={{ fontSize: '16px', fontWeight: '800', marginTop: '2px', color: '#1e293b' }}>{item.value}</div>
                        </div>
                        <div style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <TrendingUp size={12} /> {item.change}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginBottom: '20px', fontStyle: 'italic', fontWeight: '500' }}>
                * Pendapatan bersih setelah potongan platform 2%
            </div>

            <div className="glass-card" style={{ padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1e293b' }}>Grafik Pendapatan</h4>
                    <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>Feb 1 - Feb 7</span>
                </div>

                <div className="bar-chart" style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    height: '140px',
                    padding: '0 10px 10px'
                }}>
                    {chartData.map((data, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <div style={{
                                width: '12px',
                                height: `${data.val}px`,
                                background: i === 5 ? 'var(--courier-primary)' : 'rgba(245, 158, 11, 0.15)',
                                borderRadius: '6px 6px 2px 2px',
                                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}></div>
                            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>{data.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--courier-primary)' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Award size={24} color="var(--courier-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>Target Mingguan</div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
                        <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, var(--courier-primary), #fbbf24)', borderRadius: '4px' }}></div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: 'var(--courier-secondary)' }}>75%</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>8/12 Tugas</div>
                </div>
            </div>
        </div>
    );
};

export default CourierEarnings;
