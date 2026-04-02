import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Building2, Trash2, CheckCircle } from 'lucide-react';
import './SettingsPages.css';
import AppBar from './components/AppBar';

const BankAccount = ({ onBack }) => {
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            bankName: 'Bank BCA',
            accountNumber: '1234567890',
            accountHolder: 'Deni Indrayana',
            isPrimary: true,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/200px-Bank_Central_Asia.svg.png'
        },
        {
            id: 2,
            bankName: 'Bank Mandiri',
            accountNumber: '9876543210',
            accountHolder: 'Deni Indrayana',
            isPrimary: false,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/200px-Bank_Mandiri_logo_2016.svg.png'
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleDelete = (id) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
    };

    const handleSetPrimary = (id) => {
        setAccounts(accounts.map(acc => ({
            ...acc,
            isPrimary: acc.id === id
        })));
    };

    return (
        <div className="settings-page">
            <AppBar
                title="Rekening Bank"
                onBack={onBack}
                rightIcon={
                    <button className="add-btn-icon" onClick={() => setShowAddForm(true)}>
                        <Plus size={24} color="var(--primary)" />
                    </button>
                }
            />

            <div className="settings-content">
                <div className="info-banner">
                    <p>💡 Rekening bank digunakan untuk menerima pembayaran dari penjualan produk Anda</p>
                </div>

                <div className="bank-list">
                    {accounts.map(account => (
                        <div key={account.id} className="bank-card">
                            <div className="bank-header">
                                <div className="bank-info">
                                    <Building2 size={20} className="bank-icon" />
                                    <div>
                                        <p className="bank-name">{account.bankName}</p>
                                        <p className="account-number">{account.accountNumber}</p>
                                    </div>
                                </div>
                                {account.isPrimary && (
                                    <span className="primary-badge">
                                        <CheckCircle size={14} />
                                        Utama
                                    </span>
                                )}
                            </div>

                            <div className="bank-details">
                                <p className="account-holder">a/n {account.accountHolder}</p>
                            </div>

                            <div className="bank-actions">
                                {!account.isPrimary && (
                                    <>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDelete(account.id)}
                                        >
                                            <Trash2 size={16} />
                                            Hapus
                                        </button>
                                        <button
                                            className="action-btn primary"
                                            onClick={() => handleSetPrimary(account.id)}
                                        >
                                            Jadikan Utama
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {showAddForm && (
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Tambah Rekening Bank</h3>
                            <div className="form-section">
                                <div className="form-group">
                                    <label>Nama Bank</label>
                                    <select>
                                        <option>Pilih Bank</option>
                                        <option>Bank BCA</option>
                                        <option>Bank Mandiri</option>
                                        <option>Bank BRI</option>
                                        <option>Bank BNI</option>
                                        <option>Bank CIMB Niaga</option>
                                        <option>Bank Permata</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Nomor Rekening</label>
                                    <input type="text" placeholder="Masukkan nomor rekening" />
                                </div>
                                <div className="form-group">
                                    <label>Nama Pemilik Rekening</label>
                                    <input type="text" placeholder="Sesuai dengan buku tabungan" />
                                </div>
                                <div className="modal-actions">
                                    <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
                                        Batal
                                    </button>
                                    <button className="save-btn">
                                        Simpan Rekening
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BankAccount;
