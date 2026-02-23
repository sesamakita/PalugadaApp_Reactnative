import { useState } from 'react';
import {
    ChevronLeft,
    Wallet as WalletIcon,
    ArrowUpRight,
    ArrowDownLeft,
    History,
    TrendingUp,
    Download,
    Calendar,
    Store,
    Bike,
    Package,
    DollarSign,
    CreditCard,
    Clock
} from 'lucide-react';
import './Dashboard.css';
import WalletTopup from './WalletTopup';
import WalletWithdraw from './WalletWithdraw';
import WalletHistory from './WalletHistory';
import AppBar from './components/AppBar';

const Wallet = ({ onBack, userRole = 'buyer' }) => {
    // userRole: 'buyer' | 'seller' | 'courier' | 'multi'
    const [view, setView] = useState('main'); // main, topup, withdraw, history
    const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month

    // Mock data based on role
    const walletData = {
        mainBalance: 350000,
        points: 12500, // Buyer specific
        pendingBalance: 1250000, // Seller specific (Escrow)
        codBalance: -45000, // Courier specific (Cash on Hand that needs deposit)
        monthlyStats: {
            income: 450000,
            expenses: 100000,
            netChange: 350000
        }
    };

    const recentTransactions = [
        { id: 'TRX-001', type: 'income', source: 'seller', amount: 25000, description: 'Penjualan #ORD-123', date: '2026-02-05T10:30:00', status: 'completed' },
        { id: 'TRX-002', type: 'income', source: 'courier', amount: 15000, description: 'Pengiriman #T-991', date: '2026-02-05T09:15:00', status: 'completed' },
        { id: 'TRX-003', type: 'expense', source: 'purchase', amount: -35000, description: 'Pembelian #ORD-098', date: '2026-02-04T16:20:00', status: 'completed' },
        { id: 'TRX-004', type: 'withdrawal', source: 'withdrawal', amount: -100000, description: 'Penarikan ke BCA ***1234', date: '2026-02-03T11:00:00', status: 'completed' },
        { id: 'TRX-005', type: 'topup', source: 'topup', amount: 200000, description: 'Top Up via Transfer Bank', date: '2026-02-02T08:45:00', status: 'completed' },
    ];

    // Filter transactions based on role
    const getFilteredTransactions = () => {
        if (userRole === 'buyer') return recentTransactions.filter(t => t.type === 'expense' || t.source === 'topup' || t.source === 'purchase');
        if (userRole === 'seller') return recentTransactions.filter(t => t.source === 'seller' || t.type === 'withdrawal');
        if (userRole === 'courier') return recentTransactions.filter(t => t.source === 'courier' || t.type === 'withdrawal');
        return recentTransactions;
    };

    const filteredTransactions = getFilteredTransactions();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getTransactionIcon = (source) => {
        switch (source) {
            case 'seller': return <Store size={18} />;
            case 'courier': return <Bike size={18} />;
            case 'purchase': return <Package size={18} />;
            case 'topup': return <ArrowDownLeft size={18} />;
            case 'withdrawal': return <ArrowUpRight size={18} />;
            default: return <WalletIcon size={18} />;
        }
    };

    const getTheme = () => {
        if (userRole === 'seller') return { primary: 'var(--theme-seller)', light: 'var(--theme-seller-light)', iconBg: '#d1fae5', iconColor: '#059669' };
        if (userRole === 'courier') return { primary: 'var(--theme-courier)', light: 'var(--theme-courier-light)', iconBg: '#fef3c7', iconColor: '#d97706' };
        return { primary: 'var(--theme-buyer)', light: 'var(--theme-buyer-light)', iconBg: '#e0f2fe', iconColor: '#003078' };
    };

    const theme = getTheme();

    const MainWalletView = () => (
        <div className="scroll-content" style={{ paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
            {/* 1. ADAPTIVE HEADER */}
            <div className="wallet-balance-card card" style={{
                padding: '24px',
                marginBottom: '16px',
                border: 'none',
                background: `linear-gradient(135deg, ${theme.primary}, ${userRole === 'buyer' ? '#002050' : userRole === 'seller' ? '#047857' : '#b45309'})`,
                position: 'relative',
                overflow: 'hidden',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}>
                        {userRole === 'seller' ? 'Saldo Toko' : userRole === 'courier' ? 'Dompet Tunai' : 'Saldo Saya'}
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        {formatCurrency(walletData.mainBalance)}
                    </div>

                    {/* Adaptive Secondary Info */}
                    {userRole === 'buyer' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', width: 'fit-content', backdropFilter: 'blur(4px)' }}>
                            <DollarSign size={14} color="#ffd700" />
                            <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{walletData.points.toLocaleString()} Coins</span>
                        </div>
                    )}
                    {userRole === 'seller' && (
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={14} color="white" />
                            <span>Dana ditahan: <strong>{formatCurrency(walletData.pendingBalance)}</strong></span>
                        </div>
                    )}
                    {userRole === 'courier' && (
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <WalletIcon size={14} color="white" />
                            <span>Setoran COD: <strong>{formatCurrency(Math.abs(walletData.codBalance))}</strong></span>
                        </div>
                    )}
                </div>

                {/* Decorative background icon */}
                <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
                    {userRole === 'seller' ? <Store size={120} /> : userRole === 'courier' ? <Bike size={120} /> : <WalletIcon size={120} />}
                </div>
            </div>

            {/* 2. ADAPTIVE ACTIONS */}
            <div className="wallet-actions-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '20px'
            }}>
                {userRole === 'buyer' ? (
                    // Buyer: TopUp Primary
                    <>
                        <button className="btn-primary" onClick={() => setView('topup')} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '13px',
                            background: theme.primary, border: 'none'
                        }}>
                            <ArrowDownLeft size={16} /> Isi Saldo
                        </button>
                        <button className="btn-secondary" onClick={() => setView('withdraw')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '13px' }}>
                            <ArrowUpRight size={16} /> Tarik
                        </button>
                    </>
                ) : (
                    // Seller/Courier: Withdraw Primary
                    <>
                        <button className="btn-primary" onClick={() => setView('withdraw')} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '13px',
                            background: theme.primary, border: 'none'
                        }}>
                            <ArrowUpRight size={16} /> Tarik Saldo
                        </button>
                        <button className="btn-secondary" onClick={() => setView('topup')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '13px' }}>
                            <ArrowDownLeft size={16} /> Top Up
                        </button>
                    </>
                )}
            </div>

            {/* 3. QUICK STATS (Seller/Courier Only) */}
            {userRole !== 'buyer' && (
                <div className="dashboard-section">
                    <div className="section-header-row">
                        <h3>Performa Keuangan</h3>
                    </div>
                    <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Pendapatan Minggu Ini</div>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>{formatCurrency(1250000)}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{userRole === 'seller' ? 'Produk Terjual' : 'Paket Diantar'}</div>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>{userRole === 'seller' ? '24' : '45'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. TRANSACTION HISTORY */}
            <div className="dashboard-section">
                <div className="section-header-row">
                    <h3>Transaksi Terakhir</h3>
                    <button className="view-all-link" onClick={() => setView('history')}>Lihat Semua</button>
                </div>
                <div className="transaction-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredTransactions.length > 0 ? filteredTransactions.slice(0, 5).map((trx) => (
                        <div key={trx.id} className="card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <div style={{
                                    width: '36px', height: '36px', background: '#f8fafc',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
                                }}>
                                    {getTransactionIcon(trx.source)}
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px', color: 'var(--text-main)' }}>{trx.description}</div>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: '13px', fontWeight: '700',
                                    color: trx.amount > 0 ? 'var(--primary)' : 'var(--text-main)'
                                }}>
                                    {trx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(trx.amount))}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', background: '#f8fafc', borderRadius: '8px' }}>
                            Belum ada transaksi
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <AppBar
                title={
                    view === 'main' ? (userRole === 'seller' ? 'Keuangan Toko' : userRole === 'courier' ? 'Dompet Kurir' : 'Dompet Digital') :
                        view === 'topup' ? 'Isi Saldo' :
                            view === 'withdraw' ? 'Tarik Saldo' :
                                'Riwayat Transaksi'
                }
                onBack={() => view === 'main' ? onBack() : setView('main')}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            <div className="dashboard-content">
                {view === 'main' && <MainWalletView />}
                {view === 'topup' && <WalletTopup onBack={() => setView('main')} onSuccess={() => setView('main')} theme={theme} />}
                {view === 'withdraw' && <WalletWithdraw onBack={() => setView('main')} onSuccess={() => setView('main')} currentBalance={walletData.mainBalance} theme={theme} />}
                {view === 'history' && <WalletHistory onBack={() => setView('main')} filter={userRole} theme={theme} />}
            </div>
        </div>
    );
};

export default Wallet;
