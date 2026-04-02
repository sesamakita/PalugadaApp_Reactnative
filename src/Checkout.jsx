import React from 'react';
import {
    ChevronLeft,
    MapPin,
    Package,
    Bike,
    Wallet,
    CheckCircle
} from 'lucide-react';
import './Checkout.css';
import AppBar from './components/AppBar';

const Checkout = ({ cartItems, onBack, onConfirm }) => {
    const totalItems = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace('Rp ', '').replace('.', ''));
        return acc + price;
    }, 0);

    const shipping = 15000;
    const serviceFee = Math.round(totalItems * 0.02);
    const total = totalItems + shipping + serviceFee;

    return (
        <div className="checkout-container">
            <AppBar title="Checkout" onBack={onBack} />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            <div className="scroll-content">
                <div className="checkout-section card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={18} color="var(--primary)" /> Alamat Pengiriman
                    </h3>
                    <div className="address-box">
                        <strong>Deni Apps</strong>
                        <p>Jl. Sam Ratulangi No. 123, Palu Timur, Palu, Sulawesi Tengah 94111</p>
                        <button className="btn-text">Ubah Alamat</button>
                    </div>
                </div>

                <div className="checkout-section card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Package size={18} color="var(--primary)" /> Ringkasan Pesanan
                    </h3>
                    <div className="checkout-items">
                        {cartItems.map((item, i) => (
                            <div key={i} className="checkout-item">
                                <span>{item.name}</span>
                                <span>{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="checkout-section card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Bike size={18} color="var(--primary)" /> Pilih Kurir Lokal
                    </h3>
                    <div className="courier-selector">
                        <div className="courier-option active">
                            <div className="courier-icon">
                                <Bike size={24} color="var(--primary)" />
                            </div>
                            <div className="courier-info">
                                <strong>Express Lokal (Sama Hari)</strong>
                                <span>Estimasi tiba hari ini</span>
                            </div>
                            <span className="courier-price">Rp 15.000</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-section card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wallet size={18} color="var(--primary)" /> Metode Pembayaran
                    </h3>
                    <div className="payment-selector">
                        <div className="payment-option">
                            <Wallet size={20} style={{ marginRight: '12px', opacity: 0.7 }} />
                            <strong>E-Wallet (OVO/Gopay)</strong>
                            <span className="select-dot active"></span>
                        </div>
                    </div>
                </div>

                <div className="rincian-biaya card">
                    <div className="biaya-row">
                        <span>Subtotal Produk</span>
                        <span>Rp {totalItems.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="biaya-row">
                        <span>Subtotal Pengiriman</span>
                        <span>Rp {shipping.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="biaya-row">
                        <span>Biaya Layanan (2%)</span>
                        <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="biaya-row total">
                        <span>Total Tagihan</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>

            <div className="checkout-footer glass">
                <button className="btn-primary full-width" onClick={onConfirm}>
                    Bayar Sekarang <CheckCircle size={18} style={{ marginLeft: '8px' }} />
                </button>
            </div>
        </div>
    );
};

export default Checkout;
