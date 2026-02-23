// Quick Wins Helper Components
import { ShoppingBag, Search, Package, Heart, Share2 } from 'lucide-react';
import { Share } from '@capacitor/share';

// Empty State Component
export const EmptyState = ({ icon: Icon, title, description, buttonText, onButtonClick }) => (
    <div className="empty-state">
        <div className="empty-state-icon">
            <Icon size={120} strokeWidth={1} />
        </div>
        <div className="empty-state-title">{title}</div>
        <div className="empty-state-description">{description}</div>
        {buttonText && (
            <button className="empty-state-cta" onClick={onButtonClick}>
                {buttonText}
            </button>
        )}
    </div>
);

// Product Badge Component
export const ProductBadges = ({ isBestSeller, isNew, hasPromo, isFeatured }) => {
    if (!isBestSeller && !isNew && !hasPromo && !isFeatured) return null;

    return (
        <div className="product-badges">
            {isBestSeller && <div className="product-badge badge-bestseller">Terlaris</div>}
            {isNew && <div className="product-badge badge-new">Baru</div>}
            {hasPromo && <div className="product-badge badge-promo">Promo</div>}
            {isFeatured && <div className="product-badge badge-featured">Pilihan</div>}
        </div>
    );
};

// Loading Skeleton Component
export const ProductSkeleton = () => (
    <div className="skeleton-product-card">
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton skeleton-text skeleton-text-medium"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>
    </div>
);

// Toast Notification
export const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-out 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

// Share Product Function - Using Capacitor Native Share
export const shareProduct = async (product) => {
    try {
        await Share.share({
            title: product.name,
            text: `Lihat produk ini di Palugada!\n\n${product.name}\nHarga: ${product.price}\n\nBelanja produk lokal unggulan dari seluruh Indonesia di Palugada.`,
            url: 'https://palugada.app',
            dialogTitle: 'Bagikan Produk'
        });
        // Note: Share sheet opened successfully
        // No toast needed as user will see native share UI
    } catch (error) {
        // User cancelled share or error occurred
        console.log('Share cancelled or error:', error);
    }
};

// Add mock badge data to products
export const addBadgesToProducts = (products) => {
    return products.map((product) => ({
        ...product,
        isBestSeller: product.id % 3 === 0, // Every 3rd product
        isNew: product.id <= 3, // First 3 products
        hasPromo: product.id % 5 === 0, // Every 5th product
        isFeatured: product.id === 1 || product.id === 9 // Featured
    }));
};
