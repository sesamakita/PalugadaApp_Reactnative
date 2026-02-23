import React from 'react';
import { ChevronLeft, ShoppingCart, Trash2, Heart } from 'lucide-react';
import './Favorites.css';
import AppBar from './components/AppBar';
import { EmptyState } from './components/QuickWins';

const Favorites = ({ onBack, onProductClick, onAddToCart, favorites = [], onToggleFavorite }) => {

    return (
        <div className="favorites-view">
            {/* Header */}
            {/* Header */}
            <AppBar title="Favorit Saya" onBack={onBack} />
            {/* Added spacer for fixed AppBar */}
            <div style={{ height: '64px' }}></div>

            <div className="favorites-content">
                {favorites.length === 0 ? (
                    <EmptyState
                        icon={Heart}
                        title="Belum Ada Favorit"
                        description="Simpan produk yang Anda sukai untuk dilihat lagi nanti. Tap icon ❤️ di produk untuk menambahkan."
                        buttonText="Mulai Belanja"
                        onButtonClick={onBack}
                    />
                ) : (
                    <div className="favorites-grid">
                        {favorites.map(product => (
                            <div key={product.id} className="fav-card card">
                                <div className="fav-image" onClick={() => onProductClick(product)}>
                                    <img src={product.image} alt={product.name} />
                                    <button className="remove-fav-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleFavorite(product);
                                    }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="fav-info">
                                    <h3 onClick={() => onProductClick(product)}>{product.name}</h3>
                                    <div className="fav-price">{product.price}</div>
                                    <div className="fav-footer">
                                        <span>⭐ {product.rating}</span>
                                        <button className="add-to-cart-small" onClick={() => onAddToCart(product)}>
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
