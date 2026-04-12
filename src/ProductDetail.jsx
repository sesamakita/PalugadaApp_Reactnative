import { useState } from 'react';
import {
    ChevronLeft,
    Share2,
    Heart,
    MapPin,
    Star,
    Store,
    ShoppingCart,
    Truck,
    ChevronRight,
    Search,
    Plus
} from 'lucide-react';
import './ProductDetail.css';
import AppBar from './components/AppBar';
import { shareProduct } from './components/QuickWins';

const ProductDetail = ({ product, onBack, onAddToCart, onBuyNow, isFavorite, onToggleFavorite }) => {
    // Get user location from localStorage
    const savedLoc = localStorage.getItem('last_known_location') || 'Palu';
    const isLocal = product.location.toLowerCase().includes(savedLoc.toLowerCase());
    
    const shippingInfo = isLocal ? {
        type: 'Palugada Express (Lokal)',
        cost: 'Rp 15.000',
        eta: '1-2 Jam',
        icon: <Truck size={18} color="var(--primary)" />
    } : {
        type: 'Palugada Trans-Sulteng',
        cost: 'Rp 45.000 - Rp 250.000',
        eta: '1-2 Hari',
        icon: <div className="shipping-icon-trans"><Truck size={18} color="var(--secondary)" /></div>
    };

    return (
        <div className="product-detail-container">
            <AppBar
                title="Detail Produk"
                onBack={() => onBack('home')}
                rightIcon={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button
                            onClick={onToggleFavorite}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
                        >
                            <Heart
                                size={22}
                                color={isFavorite ? '#ef4444' : 'var(--text-main)'}
                                fill={isFavorite ? '#ef4444' : 'none'}
                                strokeWidth={isFavorite ? 0 : 1.5}
                            />
                        </button>
                        <button
                            onClick={() => shareProduct(product)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
                        >
                            <Share2 size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                }
            />

            <div className="detail-image">
                <img src={product.image} alt={product.name} />
                <div className="image-counter">1/4</div>
            </div>

            <div className="detail-content card">
                <div className="detail-header-info">
                    <div className="detail-price-row">
                        <span className="detail-price">{product.price}</span>
                        <span className="detail-rating">
                            <Star size={14} fill="#fbb03b" color="#fbb03b" style={{ marginRight: '4px' }} />
                            {product.rating}
                        </span>
                    </div>
                    <h1 className="detail-name">{product.name}</h1>
                    <div className="detail-location">
                        <MapPin size={14} style={{ marginRight: '4px' }} /> {product.location}
                    </div>
                </div>

                <div className="detail-section shipping-section card" onClick={() => {}}>
                    <div className="section-header-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {shippingInfo.icon}
                            <h3 style={{ margin: 0 }}>Pengiriman</h3>
                        </div>
                        <ChevronRight size={18} color="#94a3b8" />
                    </div>
                    <div className="shipping-info-box">
                        <div className="shipping-main">
                            <span className="shipping-type">{shippingInfo.type}</span>
                            <span className="shipping-cost">{shippingInfo.cost}</span>
                        </div>
                        <div className="shipping-sub">
                            <MapPin size={12} />
                            <span>Dari <strong>{product.location}</strong> ke <strong>{savedLoc}</strong></span>
                        </div>
                        <div className="shipping-eta">
                            <span>Estimasi Tiba: {shippingInfo.eta}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Deskripsi Produk</h3>
                    <p className="detail-desc">
                        Produk unggulan dari {product.location}. Dibuat secara tradisional oleh pengrajin lokal dengan bahan berkualitas terbaik.
                        Cocok digunakan untuk berbagai acara atau sebagai oleh-oleh khas daerah.
                    </p>
                </div>

                <div className="detail-section">
                    <h3>Info Penjual</h3>
                    <div className="seller-box card" onClick={() => onAddToCart && onBack('public-store', { name: "Toko Berkah " + product.location, location: product.location })} style={{ cursor: 'pointer' }}>
                        <div className="seller-main-info">
                            <div className="seller-avatar">
                                <Store size={24} color="var(--primary)" />
                            </div>
                            <div className="seller-info">
                                <div className="seller-name">Toko Berkah {product.location}</div>
                                <div className="seller-status">Online 5 menit yang lalu</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button className="btn-chat-mini" onClick={(e) => {
                                e.stopPropagation();
                                onBack('chat', { name: "Toko Berkah " + product.location });
                            }}>Chat</button>
                            <ChevronRight size={20} color="#94a3b8" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-footer glass">
                <div className="footer-actions">
                    <button className="btn-cart-minimal" onClick={() => onAddToCart(product)} title="Tambah ke Keranjang">
                        <div className="cart-icon-stack">
                            <ShoppingCart size={22} />
                            <div className="cart-badge-add">
                                <Plus size={12} strokeWidth={3} color="white" />
                            </div>
                        </div>
                    </button>
                    <button 
                        className="btn-primary flex-grow"
                        onClick={() => onBuyNow && onBuyNow(product)}
                    >
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
