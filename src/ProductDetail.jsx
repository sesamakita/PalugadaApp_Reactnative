import { useState } from 'react';
import {
    ChevronLeft,
    Share2,
    Heart,
    MapPin,
    Star,
    Store,
    ShoppingCart
} from 'lucide-react';
import './ProductDetail.css';
import AppBar from './components/AppBar';
import { shareProduct } from './components/QuickWins';

const ProductDetail = ({ product, onBack, onAddToCart, isFavorite, onToggleFavorite }) => {
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
                        <div className="seller-avatar">
                            <Store size={24} color="var(--primary)" />
                        </div>
                        <div className="seller-info">
                            <div className="seller-name">Toko Berkah {product.location}</div>
                            <div className="seller-status">Online 5 menit yang lalu</div>
                        </div>
                        <button className="btn-chat" onClick={(e) => e.stopPropagation()}>Chat</button>
                    </div>
                </div>
            </div>

            <div className="detail-footer glass">
                <div className="footer-actions">
                    <button className="btn-secondary" onClick={() => onAddToCart(product)}>
                        <ShoppingCart size={18} style={{ marginRight: '8px' }} /> +Keranjang
                    </button>
                    <button className="btn-primary flex-grow">Beli Sekarang</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
