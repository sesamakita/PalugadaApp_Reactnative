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

const PublicStore = ({ store, products, onBack, onProductClick }) => {
    return (
        <div className="pg-store-container">
            {/* Custom Header to avoid global .header conflicts */}
            {/* Custom Header to avoid global .header conflicts */}
            <AppBar
                title="Profil Toko"
                onBack={onBack}
                rightIcon={<Share2 size={22} strokeWidth={1.5} />}
            />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: 'calc(64px + var(--safe-top))' }}></div>

            <div className="pg-store-hero">
                <div className="pg-store-banner">
                    <img src="file:///C:/Users/Deni Apps/.gemini/antigravity/brain/6dd91019-e0fa-4456-a357-2cabaac31d14/store_banner_premium_1769930315726.png" alt="Store Banner" className="pg-banner-img" />
                </div>
                <div className="pg-store-profile">
                    <div className="pg-avatar-box">
                        <div className="pg-avatar-inner">
                            <Store size={32} color="var(--primary)" />
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
                    <span className="pg-stat-val">80+</span>
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
                                <div className="pg-prod-fav"><Heart size={14} /></div>
                            </div>
                            <div className="pg-prod-meta">
                                <h3>{product.name}</h3>
                                <div className="pg-prod-price">{product.price}</div>
                                <div className="pg-prod-foot">
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
