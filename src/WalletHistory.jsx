import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    Store,
    Bike,
    Package,
    Wallet as WalletIcon
} from 'lucide-react';

const WalletHistory = ({ onBack, theme }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, income, expense, topup, withdrawal
    const [filterPeriod, setFilterPeriod] = useState('all'); // all, today, week, month

    // Mock data
    const allTransactions = [
        { id: 'TRX-001', type: 'income', source: 'seller', amount: 25000, description: 'Penjualan #ORD-123', date: '2026-02-05T10:30:00', status: 'completed' },
        { id: 'TRX-002', type: 'income', source: 'courier', amount: 15000, description: 'Pengiriman #T-991', date: '2026-02-05T09:15:00', status: 'completed' },
        { id: 'TRX-003', type: 'expense', source: 'purchase', amount: -35000, description: 'Pembelian #ORD-098', date: '2026-02-04T16:20:00', status: 'completed' },
        { id: 'TRX-004', type: 'withdrawal', source: 'withdrawal', amount: -100000, description: 'Penarikan ke BCA ***1234', date: '2026-02-03T11:00:00', status: 'completed' },
        { id: 'TRX-005', type: 'topup', source: 'topup', amount: 200000, description: 'Top Up via Transfer Bank', date: '2026-02-02T08:45:00', status: 'completed' },
        { id: 'TRX-006', type: 'income', source: 'seller', amount: 45000, description: 'Penjualan #ORD-120', date: '2026-02-02T14:20:00', status: 'completed' },
        { id: 'TRX-007', type: 'income', source: 'courier', amount: 12000, description: 'Pengiriman #T-985', date: '2026-02-01T11:30:00', status: 'completed' },
        { id: 'TRX-008', type: 'expense', source: 'purchase', amount: -28000, description: 'Pembelian #ORD-095', date: '2026-02-01T09:10:00', status: 'completed' },
        { id: 'TRX-009', type: 'withdrawal', source: 'withdrawal', amount: -150000, description: 'Penarikan ke Mandiri ***5678', date: '2026-01-30T10:00:00', status: 'completed' },
        { id: 'TRX-010', type: 'topup', source: 'topup', amount: 300000, description: 'Top Up via E-Wallet', date: '2026-01-28T15:45:00', status: 'completed' },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
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

    const getTransactionColor = (type) => {
        switch (type) {
            case 'income': return '#15803d';
            case 'topup': return '#0ead98';
            case 'expense': return '#dc2626';
            case 'withdrawal': return '#ea580c';
            default: return '#64748b';
        }
    };

    const filteredTransactions = allTransactions.filter((trx) => {
        // Filter by type
        if (filterType !== 'all' && trx.type !== filterType) return false;

        // Filter by search
        if (searchQuery && !trx.description.toLowerCase().includes(searchQuery.toLowerCase()) && !trx.id.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    const totalIncome = filteredTransactions.filter(t => t.type === 'income' || t.type === 'topup').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalExpense = filteredTransactions.filter(t => t.type === 'expense' || t.type === 'withdrawal').reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return (
        <div style={{ padding: '16px', paddingBottom: '40px' }}>
            {/* Search and Filter */}
            <div style={{ marginBottom: '16px' }}>
                <div className="search-bar-inline" style={{
                    background: 'white',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '12px'
                }}>
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                </div>

                {/* Filter Chips */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {[
                        { id: 'all', label: 'Semua' },
                        { id: 'income', label: 'Pemasukan' },
                        { id: 'expense', label: 'Pengeluaran' },
                        { id: 'topup', label: 'Top Up' },
                        { id: 'withdrawal', label: 'Penarikan' }
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setFilterType(filter.id)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                border: 'none',
                                background: filterType === filter.id ? (theme?.primary || 'var(--primary)') : '#f1f5f9',
                                color: filterType === filter.id ? 'white' : '#64748b',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Total Pemasukan</div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#15803d' }}>
                            {formatCurrency(totalIncome)}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Total Pengeluaran</div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#dc2626' }}>
                            {formatCurrency(totalExpense)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction List */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '14px' }}>
                        {filteredTransactions.length} Transaksi
                    </h3>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Download size={14} /> Export
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredTransactions.map((trx) => (
                        <div key={trx.id} className="card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: trx.type === 'income' || trx.type === 'topup' ? '#f0fdf4' : '#fef2f2',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: getTransactionColor(trx.type)
                                }}>
                                    {getTransactionIcon(trx.source)}
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{trx.description}</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '2px' }}>{trx.id}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    color: getTransactionColor(trx.type)
                                }}>
                                    {trx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(trx.amount))}
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    marginTop: '2px',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    background: trx.status === 'completed' ? '#f0fdf4' : '#fef3c7',
                                    color: trx.status === 'completed' ? '#15803d' : '#92400e',
                                    display: 'inline-block'
                                }}>
                                    {trx.status === 'completed' ? 'Berhasil' : 'Pending'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WalletHistory;
