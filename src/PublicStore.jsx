import React from 'react';
import {
    ChevronLeft,
    MapPin,
    Star,
    Store,
    MessageSquare,
    Share2,
    Package,
    Heart
} from 'lucide-react';
import './PublicStore.css';
import AppBar from './components/AppBar';
import storeCover from './assets/branding/store_cover.png';

const PublicStore = ({ store, products, onBack, onProductClick }) => {
    return (
        <div className="pg-store-container">
            <AppBar
                title="Profil Toko"
                onBack={onBack}
                rightIcon={<Share2 size={22} strokeWidth={1.5} />}
            />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))', flexShrink: 0 }}></div>

            <div className="pg-store-hero">
                <div className="pg-store-banner">
                    <img src={storeCover} alt="Store Banner" className="pg-banner-img" />
                    <div className="pg-banner-overlay"></div>
                </div>
                <div className="pg-store-profile">
                    <div className="pg-avatar-box">
                        <div className="pg-avatar-inner">
                            <Store size={36} color="var(--primary)" />
                        </div>
                    </div>
                    <div className="pg-store-info">
                        <h1 className="pg-store-name">{store.name}</h1>
                        <div className="pg-store-loc">
                            <MapPin size={14} />
                            <span>{store.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pg-store-stats card">
                <div className="pg-stat-item">
                    <span className="pg-stat-val">⭐ 4.9</span>
                    <span className="pg-stat-lbl">Rating</span>
                </div>
                <div className="pg-stat-divider"></div>
                <div className="pg-stat-item">
                    <span className="pg-stat-val">{products.length}</span>
                    <span className="pg-stat-lbl">Produk</span>
                </div>
                <div className="pg-stat-divider"></div>
                <div className="pg-stat-item">
                    <span className="pg-stat-val">15rb+</span>
                    <span className="pg-stat-lbl">Terikut</span>
                </div>
            </div>

            <div className="pg-store-actions">
                <button className="pg-btn-follow">Ikuti Toko</button>
                <button className="pg-btn-chat">
                    <MessageSquare size={18} /> Chat
                </button>
            </div>

            <div className="pg-store-content">
                <div className="pg-tabs">
                    <div className="pg-tab active">Semua Produk</div>
                    <div className="pg-tab">Kategori</div>
                </div>

                <div className="pg-product-grid">
                    {products.map(product => (
                        <div key={product.id} className="pg-prod-card card" onClick={() => onProductClick(product)}>
                            <div className="pg-prod-img">
                                <img src={product.image} alt={product.name} />
                                <div className="pg-prod-fav" style={{
                                    position: 'absolute', top: '8px', right: '8px',
                                    background: 'rgba(255,255,255,0.9)', borderRadius: '50%',
                                    width: '28px', height: '28px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', color: '#ef4444'
                                }}>
                                    <Heart size={14} />
                                </div>
                            </div>
                            <div className="pg-prod-meta">
                                <h3>{product.name}</h3>
                                <div className="pg-prod-price">{product.price}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                                    <span>⭐ {product.rating}</span>
                                    <span>Stok: {product.stock}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicStore;
