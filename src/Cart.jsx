import React from 'react';
import {
    ChevronLeft,
    ShoppingCart,
    MapPin,
    Trash2,
    ShoppingBag
} from 'lucide-react';
import './Cart.css';
import AppBar from './components/AppBar';
import { EmptyState } from './components/QuickWins';

const Cart = ({ cartItems, onBack, onRemove, onCheckout, onUpdateQuantity }) => {
    const total = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace('Rp ', '').replace(/\./g, ''));
        return acc + (price * (item.quantity || 1));
    }, 0);

    return (
        <div className="cart-container">
            <AppBar title="Keranjang Saya" onBack={onBack} />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            <div className="scroll-content">
                {cartItems.length === 0 ? (
                    <EmptyState
                        icon={ShoppingBag}
                        title="Keranjang Masih Kosong"
                        description="Yuk, mulai belanja dan temukan produk lokal unggulan dari seluruh Indonesia!"
                        buttonText="Jelajahi Produk"
                        onButtonClick={onBack}
                    />
                ) : (
                    <div className="cart-list">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item card">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <div className="cart-item-seller">
                                        <MapPin size={12} style={{ marginRight: '4px' }} /> {item.location}
                                    </div>
                                    <div className="cart-item-price">{item.price}</div>
                                </div>

                                <div className="cart-item-actions">
                                    <button className="remove-btn" onClick={() => onRemove(index)}>
                                        <Trash2 size={18} color="#ef4444" />
                                    </button>

                                    <div className="cart-quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="qty-value">{item.quantity || 1}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="cart-footer glass">
                    <div className="summary-row">
                        <span>Total Bayar</span>
                        <span className="summary-total">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <button className="btn-primary full-width" onClick={onCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
