import { useState } from 'react';
import {
    ArrowDownLeft,
    Building2,
    Smartphone,
    CreditCard,
    Copy,
    CheckCircle2
} from 'lucide-react';

const WalletTopup = ({ onBack, onSuccess, theme }) => {
    const [step, setStep] = useState(1); // 1: amount, 2: method, 3: confirmation
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [copied, setCopied] = useState(false);

    const quickAmounts = [50000, 100000, 200000, 500000];

    const paymentMethods = [
        { id: 'bank', name: 'Transfer Bank', icon: <Building2 size={20} />, fee: 0, desc: 'Gratis biaya admin' },
        { id: 'ewallet', name: 'E-Wallet', icon: <Smartphone size={20} />, fee: 1000, desc: 'GoPay, OVO, Dana' },
        { id: 'card', name: 'Kartu Kredit', icon: <CreditCard size={20} />, fee: 2500, desc: 'Visa, Mastercard' },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleCopyVA = () => {
        navigator.clipboard.writeText('880712345678901');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const StepAmount = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Jumlah Top Up</h3>

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
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                    Minimal Rp 10.000
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Nominal Cepat</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {quickAmounts.map((amt) => (
                        <button
                            key={amt}
                            className="card"
                            onClick={() => setAmount(amt.toString())}
                            style={{
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: '600',
                                border: amount === amt.toString() ? `2px solid ${theme?.primary || 'var(--primary)'}` : 'none',
                                background: amount === amt.toString() ? (theme?.light || '#f0fdfa') : 'white'
                            }}
                        >
                            {formatCurrency(amt)}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="btn-primary full-width"
                disabled={!amount || parseInt(amount) < 10000}
                onClick={() => setStep(2)}
                style={{ opacity: !amount || parseInt(amount) < 10000 ? 0.5 : 1, background: theme?.primary || 'var(--primary)' }}
            >
                Lanjutkan
            </button>
        </div>
    );

    const StepMethod = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Pilih Metode Pembayaran</h3>

            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className="card"
                        onClick={() => setSelectedMethod(method)}
                        style={{
                            padding: '16px',
                            cursor: 'pointer',
                            border: selectedMethod?.id === method.id ? `2px solid ${theme?.primary || 'var(--primary)'}` : '1px solid #e2e8f0',
                            background: selectedMethod?.id === method.id ? (theme?.light || '#f0fdfa') : 'white'
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
                                {method.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{method.name}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{method.desc}</div>
                            </div>
                            {method.fee > 0 && (
                                <div style={{ fontSize: '11px', color: '#64748b' }}>
                                    +{formatCurrency(method.fee)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="btn-primary full-width"
                disabled={!selectedMethod}
                onClick={() => setStep(3)}
                style={{ opacity: !selectedMethod ? 0.5 : 1, background: theme?.primary || 'var(--primary)' }}
            >
                Lanjutkan
            </button>
        </div>
    );

    const StepConfirmation = () => (
        <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Konfirmasi Top Up</h3>

            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Jumlah Top Up</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: theme?.primary || 'var(--primary)' }}>
                        {formatCurrency(parseInt(amount))}
                    </div>
                    {selectedMethod?.fee > 0 && (
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                            + {formatCurrency(selectedMethod.fee)} biaya admin
                        </div>
                    )}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Metode</span>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{selectedMethod?.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Total Bayar</span>
                        <span style={{ fontSize: '14px', fontWeight: '700' }}>
                            {formatCurrency(parseInt(amount) + (selectedMethod?.fee || 0))}
                        </span>
                    </div>
                </div>
            </div>

            {selectedMethod?.id === 'bank' && (
                <div className="card" style={{ padding: '16px', marginBottom: '16px', background: '#fefce8' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>Virtual Account Number</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'monospace' }}>8807 1234 5678 901</span>
                        <button
                            onClick={handleCopyVA}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '4px',
                                cursor: 'pointer',
                                color: copied ? '#15803d' : 'var(--primary)'
                            }}
                        >
                            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                    <div style={{ fontSize: '11px', color: '#92400e', marginTop: '8px' }}>
                        Transfer ke nomor VA di atas. Saldo akan masuk otomatis setelah pembayaran berhasil.
                    </div>
                </div>
            )}

            <button
                className="btn-primary full-width"
                onClick={() => {
                    // Simulate success
                    if (onSuccess) onSuccess();
                }}
                style={{ background: theme?.primary || 'var(--primary)' }}
            >
                {selectedMethod?.id === 'bank' ? 'Saya Sudah Transfer' : 'Bayar Sekarang'}
            </button>
        </div>
    );

    return (
        <div>
            {step === 1 && <StepAmount />}
            {step === 2 && <StepMethod />}
            {step === 3 && <StepConfirmation />}
        </div>
    );
};

export default WalletTopup;
