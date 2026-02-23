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
                gap: '12px',
                marginBottom: '10px'
            }}>
                {earningsStats.map((item, i) => (
                    <div key={i} className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ color: 'var(--primary)', opacity: 0.8 }}>{item.icon}</div>
                        <div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{item.label}</div>
                            <div style={{ fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{item.value}</div>
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
                    <div key={i} className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ color: 'var(--primary)', opacity: 0.8 }}>{item.icon}</div>
                        <div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{item.label}</div>
                            <div style={{ fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{item.value}</div>
                        </div>
                        <div style={{ fontSize: '9px', color: '#15803d', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                            <ArrowUpRight size={10} /> {item.change}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginBottom: '16px', fontStyle: 'italic' }}>
                * Pendapatan bersih setelah potongan platform 2%
            </div>

            <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px' }}>Grafik Pendapatan Mingguan</h4>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Feb 1 - Feb 7</span>
                </div>

                <div className="bar-chart" style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    height: '150px',
                    paddingBottom: '20px'
                }}>
                    {chartData.map((data, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <div style={{
                                width: '12px',
                                height: `${data.val}px`,
                                background: i === 5 ? 'var(--primary)' : 'rgba(0, 48, 120, 0.2)',
                                borderRadius: '10px 10px 0 0',
                                transition: 'height 0.5s ease'
                            }}></div>
                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{data.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(251, 176, 59, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TrendingUp size={24} color="#fbb03b" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Target Mingguan</div>
                    <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '6px' }}>
                        <div style={{ width: '75%', height: '100%', background: '#fbb03b', borderRadius: '3px' }}></div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700' }}>75%</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>8/12 Tugas</div>
                </div>
            </div>
        </div>
    );
};

export default CourierEarnings;
