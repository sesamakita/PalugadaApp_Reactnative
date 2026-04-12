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
    Plus,
    ArrowRight
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
                            className="btn-icon-action"
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
                            className="btn-icon-action"
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
                    <h3>Informasi Pengiriman</h3>
                    <div className="shipping-section card" onClick={() => {}}>
                        <div className="shipping-info-wrapper">
                        {/* Row 1: Service Type */}
                        <div className="shipping-row service-row">
                            <div className="shipping-icon-circle">
                                {shippingInfo.icon}
                            </div>
                            <div className="shipping-label-group">
                                <span className="label-tiny">Layanan Khusus</span>
                                <span className="shipping-name-bold">{shippingInfo.type}</span>
                            </div>
                        </div>

                        {/* Row 2: Route Path */}
                        <div className="shipping-row route-row">
                            <div className="route-path">
                                <div className="route-point origin">
                                    <span className="point-dot"></span>
                                    <span className="point-name">{product.location}</span>
                                </div>
                                <div className="route-line-connector">
                                    <ArrowRight size={14} color="#94a3b8" />
                                </div>
                                <div className="route-point destination">
                                    <span className="point-dot destination"></span>
                                    <span className="point-name">{savedLoc}</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Metrics */}
                        <div className="shipping-metrics-row">
                            <div className="metric-item">
                                <span className="label-tiny">Biaya Kirim</span>
                                <span className="metric-value cost">{shippingInfo.cost}</span>
                            </div>
                            <div className="metric-divider"></div>
                            <div className="metric-item">
                                <span className="label-tiny">Estimasi Tiba</span>
                                <span className="metric-value eta">{shippingInfo.eta}</span>
                            </div>
                        </div>
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
                    <h3>Informasi Penjual</h3>
                    <div className="seller-box card" onClick={() => onBack('public-store', { name: "Toko Berkah " + product.location, location: product.location })} style={{ cursor: 'pointer' }}>
                        <div className="seller-info-content">
                            {/* Profile Information Row */}
                            <div className="seller-profile-row">
                                <div className="seller-avatar">
                                    <Store size={22} color="var(--primary)" />
                                </div>
                                <div className="seller-text-group">
                                    <span className="label-tiny">Penjual Terverifikasi</span>
                                    <div className="seller-name">Toko Berkah {product.location}</div>
                                    <div className="seller-location-sub">{product.location}</div>
                                </div>
                                <div className="seller-action-pin">
                                    <button 
                                        className="btn-chat-mini" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onBack('chat', { name: "Toko Berkah " + product.location });
                                        }}
                                    >
                                        Chat
                                    </button>
                                </div>
                            </div>

                            {/* Store Stats Metrics Row */}
                            <div className="seller-stats-row">
                                <div className="stat-item centered">
                                    <span className="label-tiny">Rating Toko</span>
                                    <div className="stat-value-group">
                                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                                        <span className="stat-value">4.8 / 5.0</span>
                                    </div>
                                </div>
                                <div className="metric-divider-v"></div>
                                <div className="stat-item centered">
                                    <span className="label-tiny">Waktu Respon</span>
                                    <span className="stat-value">± 10 Menit</span>
                                </div>
                                <div className="metric-divider-v"></div>
                                <div className="stat-item centered">
                                    <span className="label-tiny">Status</span>
                                    <span className="stat-value online-tag">Online</span>
                                </div>
                            </div>
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
