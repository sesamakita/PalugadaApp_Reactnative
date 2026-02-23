import React from 'react';
import { Search, Filter, Utensils, Shirt, Gem, Briefcase, Zap, Store, Star, MapPin } from 'lucide-react';
import './Explore.css';

const Explore = ({ onProductClick }) => {
    const categoryGrid = [
        { name: 'Kuliner', icon: <Utensils size={24} />, color: '#ff6b6b' },
        { name: 'Fashion', icon: <Shirt size={24} />, color: '#4dadf7' },
        { name: 'Crafts', icon: <Gem size={24} />, color: '#fcc419' },
        { name: 'Layanan', icon: <Briefcase size={24} />, color: '#51cf66' },
    ];

    const featuredStores = [
        { id: 101, name: "Batik Solo Abadi", rating: 4.9, image: "https://images.unsplash.com/photo-1590736962237-fa169cb85042?q=80&w=150&auto=format&fit=crop", tags: ["Premium", "Kultural"] },
        { id: 102, name: "Sambal Nusantara", rating: 4.8, image: "https://images.unsplash.com/photo-1599307730815-46fd2535043d?q=80&w=150&auto=format&fit=crop", tags: ["Bestseller", "Kuliner"] },
    ];

    const trendingProducts = [
        { id: 10, name: 'Kopi Gayo Premium', price: 'Rp 85.000', rating: 5.0, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop' },
        { id: 11, name: 'Tas Rotan Bali', price: 'Rp 150.000', rating: 4.9, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop' },
        { id: 12, name: 'Keripik Tempe Malang', price: 'Rp 12.000', rating: 4.7, image: 'https://images.unsplash.com/photo-1600271772470-bd21a4c88f1c?q=80&w=200&auto=format&fit=crop' },
    ];

    return (
        <div className="explore-view">
            <header className="explore-nav">
                <div className="explore-nav-title">Jelajah</div>
            </header>

            <div className="explore-content">
                <div className="explore-search-wrapper">
                    <div className="search-container">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Cari UMKM, produk, atau jasa..." />
                        <button className="filter-btn">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                {/* Quick Filter Rails */}
                <div className="filter-rail">
                    <button className="filter-chip active">Semua</button>
                    <button className="filter-chip">Terdekat</button>
                    <button className="filter-chip">Promo</button>
                    <button className="filter-chip">Bestseller</button>
                </div>

                {/* Visual Category Grid */}
                <section className="explore-section">
                    <h3 className="section-label">Kategori Pilihan</h3>
                    <div className="category-grid">
                        {categoryGrid.map((cat, i) => (
                            <div key={i} className="category-card">
                                <div className="cat-icon" style={{ backgroundColor: cat.color + '20', color: cat.color }}>
                                    {cat.icon}
                                </div>
                                <span>{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Stores */}
                <section className="explore-section">
                    <div className="section-header">
                        <h3 className="section-label">Toko Unggulan</h3>
                        <span className="see-all">Lihat Semua</span>
                    </div>
                    <div className="store-discovery-row">
                        {featuredStores.map(store => (
                            <div key={store.id} className="store-card card">
                                <img src={store.image} alt={store.name} className="store-img" />
                                <div className="store-info">
                                    <h4>{store.name}</h4>
                                    <div className="store-meta">
                                        <Star size={12} fill="#fbb03b" color="#fbb03b" />
                                        <span>{store.rating}</span>
                                    </div>
                                    <div className="store-tags">
                                        {store.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trending Products */}
                <section className="explore-section">
                    <div className="section-header">
                        <h3 className="section-label">Trending Sekarang</h3>
                        <span className="see-all">Lihat Semua</span>
                    </div>
                    <div className="trending-grid">
                        {trendingProducts.map(prod => (
                            <div key={prod.id} className="trending-item card" onClick={() => onProductClick && onProductClick(prod)}>
                                <div className="trending-img-box">
                                    <img src={prod.image} alt={prod.name} />
                                    <div className="trending-badge"><Zap size={10} fill="white" /> Hot</div>
                                </div>
                                <div className="trending-info">
                                    <h5>{prod.name}</h5>
                                    <p>{prod.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Products Label */}
                <section className="explore-section" style={{ paddingBottom: '40px' }}>
                    <h3 className="section-label">Lainnya Untuk Anda</h3>
                    <div className="discovery-placeholder">
                        <Store size={48} className="placeholder-icon" />
                        <p>Terus jelajahi ribuan potensi UMKM lokal</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Explore;
