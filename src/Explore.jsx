import React from 'react';
import { Search, Filter, Utensils, Shirt, Gem, Briefcase, Zap, Store, Star, MapPin } from 'lucide-react';
import './Explore.css';

const Explore = ({ onProductClick, onSeeAllStores }) => {
    const base = import.meta.env.BASE_URL
    const categoryGrid = [
        { name: 'Kuliner', icon: <Utensils size={24} />, color: '#ff6b6b' },
        { name: 'Fashion', icon: <Shirt size={24} />, color: '#4dadf7' },
        { name: 'Crafts', icon: <Gem size={24} />, color: '#fcc419' },
        { name: 'Layanan', icon: <Briefcase size={24} />, color: '#51cf66' },
    ];

    const featuredStores = [
        { id: 101, name: "Galeri Tenun Bomba", rating: 4.9, image: `${base}tenun_bomba.png`, tags: ["Premium", "Palu"] },
        { id: 102, name: "Hj. Mbok Sri Palu", rating: 4.8, image: `${base}bawang_goreng_palu.png`, tags: ["Bestseller", "Bawang Goreng"] },
    ];

    const trendingProducts = [
        { id: 10, name: 'Kopi Donggala Arabika', price: 'Rp 95.000', rating: 5.0, image: `${base}kopi_donggala.png` },
        { id: 11, name: 'Tas Anyaman Poso', price: 'Rp 195.000', rating: 4.9, image: `${base}tas_poso.png` },
        { id: 12, name: 'Sagu Rendang Parigi', price: 'Rp 25.000', rating: 4.7, image: `${base}sagu_rendang.png` },
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
                        <span className="see-all" onClick={onSeeAllStores}>Lihat Semua</span>
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
