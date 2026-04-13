import { useState } from 'react';
import {
    ArrowUpRight,
    Building2,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

const WalletWithdraw = ({ onBack, onSuccess, currentBalance = 350000, theme }) => {
    const [step, setStep] = useState(1); // 1: amount, 2: bank, 3: confirmation
    const [amount, setAmount] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);
    const [pin, setPin] = useState('');

    const withdrawalFee = 2500;
    const minWithdrawal = 50000;
    const maxWithdrawal = 2000000;

    const linkedBanks = [
        { id: 'bca', name: 'BCA', accountNumber: '***1234', accountName: 'JOHN DOE' },
        { id: 'mandiri', name: 'Mandiri', accountNumber: '***5678', accountName: 'JOHN DOE' },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const getWithdrawalError = () => {
        const amountNum = parseInt(amount);
        if (!amount) return null;
        if (amountNum < minWithdrawal) return `Minimal penarikan ${formatCurrency(minWithdrawal)}`;
        if (amountNum > maxWithdrawal) return `Maksimal penarikan ${formatCurrency(maxWithdrawal)}`;
        if (amountNum + withdrawalFee > currentBalance) return 'Saldo tidak mencukupi';
        return null;
    };

    const renderStepAmount = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Jumlah Penarikan</h3>

            {/* Balance Display */}
            <div className="card" style={{ padding: '16px', marginBottom: '16px', background: theme?.light || '#f0fdfa' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Saldo Tersedia</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: theme?.primary || 'var(--primary)' }}>
                    {formatCurrency(currentBalance)}
                </div>
            </div>

            {/* Amount Input */}
            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', display: 'block' }}>
                    Masukkan Jumlah
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    style={{
                        width: '100%',
                        fontSize: '24px',
                        fontWeight: '700',
                        border: 'none',
                        outline: 'none',
                        padding: '8px 0'
                    }}
                />

                {getWithdrawalError() && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        fontSize: '11px',
                        color: '#dc2626'
                    }}>
                        <AlertCircle size={14} />
                        {getWithdrawalError()}
                    </div>
                )}

                {amount && !getWithdrawalError() && (
                    <div style={{ fontSize: '11px', color: '#15803d', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} />
                        Biaya admin: {formatCurrency(withdrawalFee)}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="card" style={{ padding: '12px', marginBottom: '24px', background: '#fffbeb', border: '1px solid #fbbf24' }}>
                <div style={{ fontSize: '11px', color: '#92400e' }}>
                    <strong>Catatan:</strong> Penarikan akan diproses dalam 1-3 hari kerja. Pastikan rekening tujuan aktif dan data benar.
                </div>
            </div>

            <button
                className="btn-primary full-width"
                disabled={!amount || !!getWithdrawalError()}
                onClick={() => setStep(2)}
                style={{ opacity: !amount || !!getWithdrawalError() ? 0.5 : 1, background: theme?.primary || 'var(--primary)' }}
            >
                Lanjutkan
            </button>
        </div>
    );

    const renderStepBank = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Pilih Rekening Tujuan</h3>

            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {linkedBanks.map((bank) => (
                    <div
                        key={bank.id}
                        className="card"
                        onClick={() => setSelectedBank(bank)}
                        style={{
                            padding: '16px',
                            cursor: 'pointer',
                            border: selectedBank?.id === bank.id ? `2px solid ${theme?.primary || 'var(--primary)'}` : '1px solid #e2e8f0',
                            background: selectedBank?.id === bank.id ? (theme?.light || '#f0fdfa') : 'white'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: '#f1f5f9',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme?.primary || 'var(--primary)'
                            }}>
                                <Building2 size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{bank.name}</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>{bank.accountNumber}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{bank.accountName}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="btn-secondary" style={{ padding: '12px', fontSize: '13px' }}>
                    + Tambah Rekening Baru
                </button>
            </div>

            <button
                className="btn-primary full-width"
                disabled={!selectedBank}
                onClick={() => setStep(3)}
                style={{ opacity: !selectedBank ? 0.5 : 1, background: theme?.primary || 'var(--primary)' }}
            >
                Lanjutkan
            </button>
        </div>
    );

    const renderStepConfirmation = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Konfirmasi Penarikan</h3>

            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Jumlah Penarikan</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#ea580c' }}>
                        {formatCurrency(parseInt(amount))}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                        + {formatCurrency(withdrawalFee)} biaya admin
                    </div>
                </div>

                <div>
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Rekening Tujuan</div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{selectedBank?.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedBank?.accountNumber} - {selectedBank?.accountName}</div>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Total Diterima</span>
                        <span style={{ fontSize: '16px', fontWeight: '700' }}>
                            {formatCurrency(parseInt(amount))}
                        </span>
                    </div>
                </div>
            </div>

            {/* PIN Input */}
            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', display: 'block' }}>
                    Masukkan PIN Keamanan
                </label>
                <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••••"
                    maxLength="6"
                    style={{
                        width: '100%',
                        fontSize: '18px',
                        fontWeight: '700',
                        border: '1px solid #e2e8f0',
                        borderRadius: 'var(--radius-sm)',
                        outline: 'none',
                        padding: '12px',
                        textAlign: 'center',
                        letterSpacing: '8px'
                    }}
                />
            </div>

            <button
                className="btn-primary full-width"
                disabled={pin.length !== 6}
                onClick={() => {
                    // Simulate success
                    if (onSuccess) onSuccess();
                }}
                style={{ opacity: pin.length !== 6 ? 0.5 : 1, background: theme?.primary || 'var(--primary)' }}
            >
                Konfirmasi Penarikan
            </button>
        </div>
    );

    return (
        <div>
            {step === 1 && renderStepAmount()}
            {step === 2 && renderStepBank()}
            {step === 3 && renderStepConfirmation()}
        </div>
    );
};

export default WalletWithdraw;
