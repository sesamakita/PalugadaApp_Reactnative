import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, ChevronLeft, Store as StoreIcon, ShieldCheck } from 'lucide-react';
import AppBar from './components/AppBar';
import './StoreList.css';

const StoreList = ({ onBack, onStoreClick, userLocation = 'Palu', products = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const base = import.meta.env.BASE_URL;

    // Mock Store Data
    const stores = useMemo(() => [
        {
            id: 101,
            name: "Hj. Mbok Sri Palu",
            location: "Palu",
            rating: 4.8,
            reviews: 1240,
            image: `${base}bawang_goreng_palu.png`,
            isVerified: true,
            distance: "0.8 km",
            tags: ["Kuliner", "Bestseller"]
        },
        {
            id: 102,
            name: "Galeri Tenun Bomba",
            location: "Palu",
            rating: 4.9,
            reviews: 856,
            image: `${base}tenun_bomba.png`,
            isVerified: true,
            distance: "1.2 km",
            tags: ["Fashion", "Premium"]
        },
        {
            id: 103,
            name: "Donggala Coffee House",
            location: "Donggala",
            rating: 5.0,
            reviews: 420,
            image: `${base}kopi_donggala.png`,
            isVerified: false,
            distance: "25.0 km",
            tags: ["Kuliner", "Kopi"]
        },
        {
            id: 104,
            name: "Oleh-oleh Parigi",
            location: "Parigi Moutong",
            rating: 4.7,
            reviews: 310,
            image: `${base}sagu_rendang.png`,
            isVerified: true,
            distance: "45.0 km",
            tags: ["Kuliner", "Sagu"]
        },
        {
            id: 105,
            name: "Palu Gadget Store",
            location: "Palu",
            rating: 4.7,
            reviews: 1560,
            image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=300&auto=format&fit=crop",
            isVerified: true,
            distance: "2.1 km",
            tags: ["Elektronik", "Gadget"]
        },
        {
            id: 106,
            name: "Madu Lindu Asli",
            location: "Lindu",
            rating: 4.9,
            reviews: 128,
            image: `${base}madu_lindu.png`,
            isVerified: false,
            distance: "60.0 km",
            tags: ["Makanan", "Herbal"]
        }
    ], [base]);

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get top products for each store to show in miniatures
    const getStoreProducts = (storeName) => {
        return products.filter(p => p.store === storeName).slice(0, 3);
    };

    return (
        <div className="store-list-view">
            <AppBar title="Jelajah Toko UMKM" onBack={onBack} />
            <div style={{ height: 'calc(64px + var(--safe-top))' }}></div>

            <div className="store-list-content">
                <div className="store-search-container">
                    <div className="search-bar glass">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Cari nama toko atau lokasi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="store-list-header">
                    <h3>Urutkan: Terdekat dari {userLocation}</h3>
                    <span className="results-count">{filteredStores.length} Toko ditemukan</span>
                </div>

                <div className="stores-grid">
                    {filteredStores.map(store => (
                        <div key={store.id} className="store-wide-card card" onClick={() => onStoreClick(store)}>
                            <div className="store-card-main">
                                <div className="store-avatar">
                                    <img src={store.image} alt={store.name} />
                                    {store.isVerified && (
                                        <div className="verified-badge">
                                            <ShieldCheck size={12} fill="white" color="var(--primary)" />
                                        </div>
                                    )}
                                </div>
                                <div className="store-details">
                                    <div className="store-name-row">
                                        <h4>{store.name}</h4>
                                    </div>
                                    <div className="store-rating-row">
                                        <div className="rating">
                                            <Star size={14} fill="#fbb03b" color="#fbb03b" />
                                            <span>{store.rating}</span>
                                            <span className="reviews">({store.reviews})</span>
                                        </div>
                                        <div className="distance">
                                            <MapPin size={12} />
                                            <span>{store.distance}</span>
                                        </div>
                                    </div>
                                    <div className="store-location">{store.location}</div>
                                </div>
                                <div className="store-arrow">
                                    <ChevronLeft size={20} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
                                </div>
                            </div>

                            {/* Store Preview Products */}
                            <div className="store-previews">
                                {getStoreProducts(store.name).map(product => (
                                    <div key={product.id} className="preview-item">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                ))}
                                {getStoreProducts(store.name).length === 0 && (
                                    <div className="no-previews">
                                        <StoreIcon size={14} />
                                        <span>Lihat profil toko</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredStores.length === 0 && (
                        <div className="empty-search">
                            <StoreIcon size={48} opacity={0.2} />
                            <p>Toko tidak ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreList;
