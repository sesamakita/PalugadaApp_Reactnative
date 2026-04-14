import { useState, useEffect } from 'react'
import {
  Home,
  Compass,
  Package,
  User,
  ShoppingCart,
  Zap,
  Search,
  MessageSquare,
  Wallet as WalletIcon,
  Star,
  TrendingUp,
  ShoppingBag,
  PlusCircle,
  Inbox,
  List,
  CheckCircle,
  Navigation,
  LayoutDashboard,
  Bell,
  Heart
} from 'lucide-react'
import { Geolocation } from '@capacitor/geolocation'
import { App as CapApp } from '@capacitor/app'
import { StatusBar, Style } from '@capacitor/status-bar'
import './App.css'
import Tracking from './Tracking'
import SellerDashboard from './SellerDashboard'
import CourierDashboard from './CourierDashboard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Checkout from './Checkout'
import usePersistedState from './hooks/usePersistedState'
import { STORAGE_KEYS } from './services/StorageService'

import PublicStore from './PublicStore'
import logo from './assets/branding/palugada-logo-main.png'
import SplashScreen from './SplashScreen'
import Profile from './Profile'
import Chat from './Chat'
import Notifications from './Notifications'
import Explore from './Explore'
import Auth from './Auth'
import Favorites from './Favorites'
import PersonalInfo from './PersonalInfo'
import MyAddress from './MyAddress'
import BankAccount from './BankAccount'
import NotificationSettings from './NotificationSettings'
import AccountSecurity from './AccountSecurity'
import Wallet from './Wallet'
import CourierRegistration from './CourierRegistration'
import SellerRegistration from './SellerRegistration'
import CourierProfile from './CourierProfile'
import CourierCommunity from './CourierCommunity'
import MyOrders from './MyOrders'
import StoreList from './StoreList'

const regionalMapping = {
  'Palu': 'Palu',
  'Donggala': 'Donggala',
  'Parigi Moutong': 'Parimo',
  'Sigi': 'Sigi',
  'Poso': 'Poso',
  'Tojo Una-Una': 'Touna',
  'Banggai': 'Banggai',
  'Banggai Kepulauan': 'Bangkep',
  'Banggai Laut': 'Balut',
  'Morowali Utara': 'Morut',
  'Morowali': 'Morowali',
  'Buol': 'Buol',
  'Tolitoli': 'Toli-toli',
  'Toli-Toli': 'Toli-toli'
};

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = usePersistedState(STORAGE_KEYS.IS_LOGGED_IN, false)
  const [view, setView] = useState('home')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [cartItems, setCartItems] = usePersistedState(STORAGE_KEYS.CART_ITEMS, [])
  const [userLocation, setUserLocation] = usePersistedState(STORAGE_KEYS.USER_LOCATION, 'SULTENG')
  const [currentUser, setCurrentUser] = usePersistedState(STORAGE_KEYS.CURRENT_USER, null)
  const [appRole, setAppRole] = usePersistedState(STORAGE_KEYS.APP_ROLE, 'buyer')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [walletRole, setWalletRole] = useState('buyer') // 'buyer', 'seller', 'courier'
  const [walletBackView, setWalletBackView] = useState('profile') // view to go back to
  const [hasNotifications, setHasNotifications] = useState(false) // For conditional badge

  // Mock wallet balance
  const walletBalance = 350000

  // Favorites Logic
  const [favorites, setFavorites] = usePersistedState(STORAGE_KEYS.USER_FAVORITES, [])

  useEffect(() => {
    // Initialize StatusBar for immersive experience
    const initStatusBar = async () => {
      try {
        if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
          await StatusBar.setOverlaysWebView({ overlay: true });
          await StatusBar.setStyle({ style: Style.Light });
        }
      } catch (err) {
        console.error('StatusBar init error:', err);
      }
    };
    initStatusBar();

    // Scroll to top when view changes
    window.scrollTo(0, 0);
    document.querySelectorAll('.scroll-content, .dashboard-content').forEach(el => el.scrollTop = 0);
  }, [view]);

  // Dynamic Theme Effect - Injects CSS variables based on appRole
  useEffect(() => {
    const root = document.documentElement;
    const themes = {
      buyer: { primary: '#003078', dark: '#002050', tint: '#e0f2fe' },
      seller: { primary: '#059669', dark: '#047857', tint: '#d1fae5' },
      courier: { primary: '#d97706', dark: '#b45309', tint: '#fef3c7' }
    };
    
    const theme = themes[appRole] || themes.buyer;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-dark', theme.dark);
    root.style.setProperty('--theme-light', theme.tint);
    
    // Also update StatusBar color if on native
    if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
      StatusBar.setBackgroundColor({ color: theme.dark }).catch(() => {});
    }
  }, [appRole]);

  const handleToggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const categories = ['Semua', 'Kuliner', 'Fashion', 'Crafts', 'Layanan']

  const base = import.meta.env.BASE_URL

  const products = [
    // Makanan (Food)
    { id: 1, name: 'Bawang Goreng Palu Super', price: 'Rp 65.000', category: 'Makanan', location: 'Palu', rating: 4.9, image: `${base}bawang_goreng_palu.png`, store: 'Hj. Mbok Sri Palu', stock: 50 },
    { id: 2, name: 'Sagu Rendang Parigi', price: 'Rp 25.000', category: 'Makanan', location: 'Parigi Moutong', rating: 4.7, image: `${base}sagu_rendang.png`, store: 'Oleh-oleh Parigi', stock: 120 },
    { id: 3, name: 'Kopi Donggala Arabika', price: 'Rp 95.000', category: 'Makanan', location: 'Donggala', rating: 5.0, image: `${base}kopi_donggala.png`, store: 'Donggala Coffee House', stock: 40 },
    { id: 4, name: 'Sambal Roa Khas Palu', price: 'Rp 45.000', category: 'Makanan', location: 'Palu', rating: 4.8, image: `${base}sambal_roa.png`, store: 'Dapur Roa Palu', stock: 85 },
    { id: 5, name: 'Saraba Instan Poso', price: 'Rp 35.000', category: 'Makanan', location: 'Poso', rating: 4.6, image: `${base}saraba_poso.png`, store: 'Minuman Herbal Poso', stock: 70 },
    { id: 6, name: 'Madu Hutan Lore Lindu', price: 'Rp 185.000', category: 'Makanan', location: 'Lindu', rating: 4.9, image: `${base}madu_lindu.png`, store: 'Madu Lindu Asli', stock: 25 },

    // Elektronik (Electronics)
    { id: 7, name: 'Powerbank 20000mAh', price: 'Rp 185.000', category: 'Elektronik', location: 'Palu', rating: 4.7, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=300&auto=format&fit=crop', store: 'Palu Gadget Store', stock: 45 },
    { id: 8, name: 'TWS Earbuds Bluetooth', price: 'Rp 145.000', category: 'Elektronik', location: 'Luwuk', rating: 4.5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300&auto=format&fit=crop', store: 'Audio Luwuk Central', stock: 70 },
    { id: 9, name: 'Smartwatch Sport Palu', price: 'Rp 350.000', category: 'Elektronik', location: 'Palu', rating: 4.8, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop', store: 'Smart Hub Palu', stock: 25 },
    { id: 10, name: 'Charger Fast Quick', price: 'Rp 95.000', category: 'Elektronik', location: 'Tolitoli', rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=300&auto=format&fit=crop', store: 'Tolitoli Aksesori', stock: 100 },
    { id: 11, name: 'Ring Light LED 10"', price: 'Rp 165.000', category: 'Elektronik', location: 'Palu', rating: 4.7, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?q=80&w=300&auto=format&fit=crop', store: 'Studio Gadget Palu', stock: 35 },
    { id: 12, name: 'Kabel Data Type-C', price: 'Rp 45.000', category: 'Elektronik', location: 'Morowali', rating: 4.4, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop', store: 'Morowali Tech', stock: 200 },

    // Pakaian (Clothing)
    { id: 13, name: 'Tenun Bomba Palu Premium', price: 'Rp 750.000', category: 'Pakaian', location: 'Palu', rating: 4.9, image: `${base}tenun_bomba.png`, store: 'Galeri Tenun Bomba', stock: 10 },
    { id: 14, name: 'Kaos Palu Ngataku', price: 'Rp 125.000', category: 'Pakaian', location: 'Palu', rating: 4.8, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=300&auto=format&fit=crop', store: 'Kaos Khas Palu', stock: 60 },
    { id: 15, name: 'Baju Adat Kaili (Siga)', price: 'Rp 350.000', category: 'Pakaian', location: 'Donggala', rating: 4.9, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop', store: 'Adat Kaili Shop', stock: 15 },
    { id: 16, name: 'Kaos Polos Premium', price: 'Rp 75.000', category: 'Pakaian', location: 'Luwuk', rating: 4.5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300&auto=format&fit=crop', store: 'Luwuk Fashion', stock: 120 },
    { id: 17, name: 'Celana Jeans Slim', price: 'Rp 195.000', category: 'Pakaian', location: 'Palu', rating: 4.7, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=300&auto=format&fit=crop', store: 'Denim Palu Store', stock: 60 },
    { id: 18, name: 'Jaket Hoodie Fleece', price: 'Rp 165.000', category: 'Pakaian', location: 'Poso', rating: 4.6, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop', store: 'Poso Apparel', stock: 40 },

    // Aksesoris (Accessories)
    { id: 19, name: 'Tas Ransel Kanvas', price: 'Rp 185.000', category: 'Aksesoris', location: 'Palu', rating: 4.7, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop', store: 'Palu Bag Collection', stock: 35 },
    { id: 20, name: 'Jam Tangan Analog', price: 'Rp 235.000', category: 'Aksesoris', location: 'Palu', rating: 4.8, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=300&auto=format&fit=crop', store: 'Watch Palu Gallery', stock: 28 },
    { id: 21, name: 'Topi Baseball Keren', price: 'Rp 65.000', category: 'Aksesoris', location: 'Parigi', rating: 4.5, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=300&auto=format&fit=crop', store: 'Parigi Hat Store', stock: 85 },
    { id: 22, name: 'Dompet Kulit Asli', price: 'Rp 145.000', category: 'Aksesoris', location: 'Palu', rating: 4.6, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=300&auto=format&fit=crop', store: 'Leather Craft Palu', stock: 45 },
    { id: 23, name: 'Kacamata Hitam UV', price: 'Rp 125.000', category: 'Aksesoris', location: 'Togean', rating: 4.7, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300&auto=format&fit=crop', store: 'Togean Eyewear', stock: 50 },
    { id: 24, name: 'Tas Anyaman Khas Poso', price: 'Rp 195.000', category: 'Aksesoris', location: 'Poso', rating: 4.9, image: `${base}tas_poso.png`, store: 'Kerajinan Poso', stock: 22 },
  ]

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setView('detail')
  }

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setView('cart');
  };

  const handleBuyNow = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) return prevItems;
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setView('checkout');
  };

  const handleUpdateCartQuantity = (productId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = (item.quantity || 1) + change;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems(newCart)
  }

  // Views that are primary tabs and should keep the bottom nav
  const isTabVisible = [
    'home', 'explore', 'tracking', 'profile', 'store-list',
    'seller-products', 'seller-orders', 'add-product',
    'available-orders', 'courier-map', 'wallet', 'courier', 'courier-community'
  ].includes(view)

  const renderContent = () => {
    switch (view) {
      case 'tracking':
        return <Tracking onBack={() => setView('home')} />
      case 'seller':
        return <SellerDashboard
          activeView={view}
          onBack={() => setView('home')}
          onNavigate={(target) => {
            if (target === 'wallet') {
              setWalletRole('seller');
              setWalletBackView('seller');
              setView('wallet');
            } else if (target === 'seller-registration') {
              setView('seller-registration');
            } else {
              setView(target);
            }
          }}
        />
      case 'courier':
        return <CourierDashboard
          activeView={view}
          onBack={() => {
            setAppRole('buyer');
            setView('home');
          }}
          onNavigate={(target) => {
            if (target === 'wallet') {
              setWalletRole('courier');
              setWalletBackView('home');
              setView('wallet');
            } else {
              setView(target);
            }
          }}
        />
      case 'seller-products':
      case 'seller-orders':
      case 'add-product':
        // Pass the sub-view to the dashboard
        return <SellerDashboard 
            activeView={view}
            onBack={() => setAppRole('buyer')}
            onNavigate={(target) => setView(target)}
        />
      case 'available-orders':
      case 'courier-map':
        // Pass the sub-view to the dashboard
        return <CourierDashboard 
            activeView={view}
            onBack={() => setAppRole('buyer')}
            onNavigate={(target) => setView(target)}
        />
      case 'chat':
        return <Chat onBack={() => setView('home')} />
      case 'notifications':
        return <Notifications onBack={() => setView('home')} />
      case 'favorites':
        return <Favorites
          onBack={() => setView('home')}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      case 'detail':
        return selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={(nextView, storeData) => {
              if (nextView === 'public-store') {
                setSelectedStore(storeData);
                setView('public-store');
              } else {
                setView('home');
              }
            }}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isFavorite={favorites.some(f => f.id === selectedProduct.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedProduct)}
          />
        )
      case 'public-store':
        return selectedStore && (
          <PublicStore
            store={selectedStore}
            products={products} // Mocking all products for now
            onBack={() => setView('detail')}
            onProductClick={(p) => {
              setSelectedProduct(p);
              setView('detail');
            }}
          />
        )
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onBack={() => setView('home')}
            onRemove={handleRemoveFromCart}
            onCheckout={() => setView('checkout')}
            onUpdateQuantity={handleUpdateCartQuantity}
          />
        )
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onBack={() => setView('cart')}
            onConfirm={() => setView('tracking')}
          />
        )
      case 'explore':
        return <Explore
          onProductClick={handleProductClick}
          onSeeAllStores={() => setView('store-list')}
        />
      case 'store-list':
        return (
          <StoreList
            onBack={() => setView('home')}
            onStoreClick={(store) => {
              setSelectedStore(store);
              setView('public-store');
            }}
            userLocation={userLocation}
            products={products}
          />
        )
      case 'profile':
        return <Profile
          onNavigate={(target) => {
            if (target === 'wallet') {
              setWalletRole(appRole);
              setWalletBackView('profile');
              setView('wallet');
            } else {
              setView(target);
            }
          }}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            setAppRole('buyer');
          }}
          currentUser={currentUser}
          appRole={appRole}
          onRoleChange={(newRole) => {
            setAppRole(newRole);
            setView('home');
          }}
        />
      case 'auth':
        return <Auth onLogin={(user) => {
          if (user) setCurrentUser(user);
          setIsLoggedIn(true);
          setView('home');
        }} />
      case 'personal-info':
        return <PersonalInfo onBack={() => setView('profile')} />
      case 'my-address':
        return <MyAddress onBack={() => setView('profile')} />
      case 'bank-account':
        return <BankAccount onBack={() => setView('profile')} />
      case 'notification-settings':
        return <NotificationSettings onBack={() => setView('profile')} />
      case 'account-security':
        return <AccountSecurity onBack={() => setView('profile')} />
      case 'wallet':
        return <Wallet onBack={() => setView(walletBackView)} userRole={walletRole} />
      case 'courier-registration':
        return <CourierRegistration 
          onBack={() => setView('home')} 
          onComplete={() => {
            if (currentUser) {
              const updatedUser = { ...currentUser, isCourier: true };
              setCurrentUser(updatedUser);
            }
            setAppRole('courier');
            setView('home');
          }} 
        />
      case 'courier-profile':
        return <CourierProfile onBack={() => setView('courier')} />
      case 'courier-community':
        return <CourierCommunity onBack={() => setView('home')} />
      case 'seller-registration':
        return <SellerRegistration 
          onBack={() => setView('home')} 
          onComplete={() => {
            if (currentUser) {
              const updatedUser = { ...currentUser, isSeller: true };
              setCurrentUser(updatedUser);
            }
            setAppRole('seller');
            setView('home');
          }} 
        />
      case 'my-orders':
        return <MyOrders onBack={() => setView('home')} onTrackOrder={(order) => setView('tracking')} />
      default:
        if (appRole === 'seller') {
          return <SellerDashboard
            activeView={view}
            onBack={() => setAppRole('buyer')}
            onNavigate={(target) => {
              if (target === 'wallet') {
                setWalletRole('seller');
                setWalletBackView('home');
                setView('wallet');
              } else {
                setView(target);
              }
            }}
          />
        }
        if (appRole === 'courier') {
          return <CourierDashboard
            activeView={view}
            onBack={() => setAppRole('buyer')}
            onNavigate={(target) => {
              if (target === 'wallet') {
                setWalletRole('courier');
                setWalletBackView('home');
                setView('wallet');
              } else {
                setView(target);
              }
            }}
          />
        }
        return (
          <div className="home-view" style={{ width: '100%', overflowX: 'hidden' }}>
            {/* Header & Search */}
            <header className="header glass">
              <div className="user-bar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                  <div className="app-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={logo} alt="Palugada Logo" />
                    {appRole !== 'buyer' && (
                      <span style={{ 
                        fontSize: '10px', 
                        background: 'var(--primary)', 
                        color: 'white', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                      }}>{appRole}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      boxShadow: '0 0 8px var(--primary)'
                    }}></div>
                    <span 
                      onClick={() => !isLoadingLocation && fetchLocation()}
                      style={{
                        fontSize: '13px',
                        color: 'var(--primary)',
                        fontWeight: '800',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >{isLoadingLocation ? 'MENCARI...' : userLocation}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setView('notifications')}>
                    <Bell size={22} className="nav-icon-outline" strokeWidth={1.5} />
                    {hasNotifications && <span className="dot-badge"></span>}
                  </div>
                  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setView('favorites')}>
                    <Heart size={22} className="nav-icon-outline" strokeWidth={1.5} />
                  </div>
                  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setView('cart')}>
                    <ShoppingCart size={22} className="nav-icon-outline" strokeWidth={1.5} />
                    {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                  </div>
                </div>
              </div>
              <div className="search-box">
                <Search size={18} style={{ opacity: 0.5 }} />
                <input type="text" placeholder="Cari produk lokal unggulan..." />
              </div>
            </header>

            <div className="scroll-content">
              {/* Minimalist Welcome Greeting with Animation */}
              <div className="fade-in-slide-up" style={{ padding: '16px 4px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Halo,</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
                  {currentUser?.name?.split(' ')[0] || 'Pelanggan'}! 👋
                </span>
              </div>

              {/* Wallet Quick Access Banner */}
              <div
                onClick={() => {
                  setWalletRole('buyer');
                  setWalletBackView('home');
                  setView('wallet');
                }}
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, #0a8a77 100%)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 16px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(14, 173, 152, 0.2)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <WalletIcon size={16} color="white" strokeWidth={2} />
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(walletBalance)}
                  </div>
                </div>
                <div style={{
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}>
                  Lihat
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
              {/* Categories */}
              <div className="categories" style={{ marginTop: '16px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Hero Banner */}
              <div className="hero-banner">
                <h2>Produk Terbaik Daerah</h2>
                <p>Dukung UMKM lokal, dapatkan produk berkualitas langsung dari sumbernya.</p>
                <div className="hero-img">🏠</div>
              </div>

              {/* Stores Quick Link */}
              <div
                className="section-title"
                style={{ marginTop: '24px' }}
                onClick={() => setView('store-list')}
              >
                <h3>Jelajah Toko UMKM</h3>
                <span className="view-all">Lihat Semua</span>
              </div>

              {/* Product Section */}
              <div className="section-title">
                <h3>Terdekat dari Anda</h3>
                <span className="view-all">Lihat Semua</span>
              </div>

              <div className="product-grid">
                {products.map(product => {
                  // Quick Wins: Calculate badges
                  const isBestSeller = product.id % 3 === 0;
                  const isNew = product.id <= 3;
                  const hasPromo = product.id % 5 === 0;

                  return (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <div className="badge-location">📍 {product.location}</div>

                        {/* Quick Wins: Product Badges */}
                        {(isBestSeller || isNew || hasPromo) && (
                          <div className="product-badges">
                            {isBestSeller && <div className="product-badge badge-bestseller">Terlaris</div>}
                            {isNew && <div className="product-badge badge-new">Baru</div>}
                            {hasPromo && <div className="product-badge badge-promo">Promo</div>}
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <h3 className="product-name-text">{product.name}</h3>
                        <div className="product-price">{product.price}</div>
                        <div className="product-footer">
                          <div className="product-rating">
                            <Star size={12} fill="#fbbf24" color="#fbbf24" strokeWidth={0} />
                            <span>{product.rating}</span>
                          </div>
                          <span className="product-stock">Stok: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
    }
  }

  const [splashMessage, setSplashMessage] = useState('Menginisialisasi...')

  useEffect(() => {
    const isNative = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()

    const reverseGeocode = async (latitude, longitude) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        const data = await response.json()

        if (data.address) {
          // Flatten all address values into a single array of strings
          const addressValues = Object.values(data.address).map(v => v.toString().toLowerCase());
          const state = (data.address.state || '').toLowerCase();

          // Define the 13 required regions with their branding names
          // Priority ordered (most specific first where needed, like Bangkep vs Banggai)
          const searchKeywords = [
            { key: 'palu', brand: 'Palu' },
            { key: 'donggala', brand: 'Donggala' },
            { key: 'parigi moutong', brand: 'Parimo' },
            { key: 'sigi', brand: 'Sigi' },
            { key: 'poso', brand: 'Poso' },
            { key: 'tojo una-una', brand: 'Touna' },
            { key: 'banggai kepulauan', brand: 'Bangkep' },
            { key: 'banggai laut', brand: 'Balut' },
            { key: 'banggai', brand: 'Banggai' },
            { key: 'morowali utara', brand: 'Morut' },
            { key: 'morowali', brand: 'Morowali' },
            { key: 'buol', brand: 'Buol' },
            { key: 'tolitoli', brand: 'Toli-toli' },
            { key: 'toli-toli', brand: 'Toli-toli' }
          ];

          let foundBrandedName = null;

          // Search for any of our keywords in ANY field returned by Nominatim
          for (const item of searchKeywords) {
            if (addressValues.some(val => val.includes(item.key))) {
              foundBrandedName = item.brand;
              break;
            }
          }

          // Final Location Determination
          let finalLoc = foundBrandedName;

          if (!finalLoc) {
            // Fallback: If no regency detected, use a cleaned version of the most likely candidate
            const county = data.address.county || data.address.region || data.address.state_district;
            const city = data.address.city || data.address.municipality;
            const town = data.address.town || data.address.village;
            
            let fallback = county || city || town || state || 'SULTENG';
            finalLoc = fallback.replace(/Kabupaten |Kota |Regency |Kab\. /gi, '').trim();
          }

          setUserLocation(finalLoc)
          localStorage.setItem('last_known_location', finalLoc)
        }
      } catch (err) {
        console.error('Reverse geocode error:', err);
      }
    }

    const fetchLocation = async () => {
      try {
        setIsLoadingLocation(true)

        if (isNative) {
          // Native Capacitor Geolocation
          setSplashMessage('Meminta izin lokasi...')
          const permStatus = await Geolocation.checkPermissions()
          if (permStatus.location !== 'granted') {
            const requestStatus = await Geolocation.requestPermissions()
            if (requestStatus.location !== 'granted') {
              setUserLocation('Lokasi Tidak Aktif')
              return
            }
          }

          setSplashMessage('sedang mempersiapkan aplikasi sesuai lokasi')
          const coordinates = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 5 * 60 * 1000
          })

          await reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude)
        } else {
          // Web browser fallback
          setSplashMessage('Meminta izin lokasi...')
          if ('geolocation' in navigator) {
            return new Promise((resolve) => {
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  setSplashMessage('sedang mempersiapkan aplikasi sesuai lokasi')
                  await reverseGeocode(position.coords.latitude, position.coords.longitude)
                  resolve()
                },
                () => {
                  const cached = localStorage.getItem('last_known_location')
                  if (!cached) setUserLocation('SULTENG')
                  resolve()
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
              )
            })
          } else {
            setUserLocation('Palu')
          }
        }
      } catch (error) {
        console.error('Error getting geolocation:', error)
        const cached = localStorage.getItem('last_known_location')
        if (!cached) setUserLocation('Palu')
      } finally {
        setIsLoadingLocation(false)
      }
    }

    const initializeApp = async () => {
      const startTime = Date.now();
      
      // Start location fetch
      await fetchLocation();
      
      // Ensure splash shows for at least 3 seconds for look and feel
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);
      
      setTimeout(() => {
        setShowSplash(false);
      }, remainingTime);
    }

    initializeApp()

    // Listen for app resume (native only)
    let resumeListener
    if (isNative) {
      resumeListener = CapApp.addListener('appStateChange', ({ isActive }) => {
        if (isActive) {
          fetchLocation()
        }
      })
    }

    return () => {
      if (resumeListener) resumeListener.remove()
    }
  }, [])

  if (showSplash) {
    return <SplashScreen version="1.0.2-alpha" message={splashMessage} />
  }

  if (!isLoggedIn) {
    return <Auth onLogin={(user) => {
      if (user) setCurrentUser(user);
      setIsLoggedIn(true);
      setView('home'); // Redirect to dashboard after login
    }} />
  }

  return (
    <div className="app-container" style={{ paddingBottom: isTabVisible ? '70px' : '0' }}>
      {renderContent()}

      {/* Bottom Nav - Dynamic based on appRole */}
      {isTabVisible && (
        <nav className="bottom-nav glass">
          {/* BUYER NAV */}
          {appRole === 'buyer' && (
            <>
              <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                <Home size={22} strokeWidth={view === 'home' ? 2.5 : 1.5} />
                <span>Beranda</span>
                {view === 'home' && <div className="nav-indicator"></div>}
              </div>
              <div className={`nav-item ${view === 'explore' ? 'active' : ''}`} onClick={() => setView('explore')}>
                <Compass size={22} strokeWidth={view === 'explore' ? 2.5 : 1.5} />
                <span>Jelajah</span>
                {view === 'explore' && <div className="nav-indicator"></div>}
              </div>
              <div className="nav-fab-container">
                <div className="nav-fab" onClick={() => setView('cart')}>
                  <Zap size={24} fill="white" color="white" />
                </div>
                <span className="fab-label">Beli Cepat</span>
              </div>
              <div className={`nav-item ${view === 'tracking' ? 'active' : ''}`} onClick={() => setView('tracking')}>
                <Package size={22} strokeWidth={view === 'tracking' ? 2.5 : 1.5} />
                <span>Pesanan</span>
                {view === 'tracking' && <div className="nav-indicator"></div>}
              </div>
            </>
          )}

          {/* SELLER NAV */}
          {appRole === 'seller' && (
            <>
              <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                <TrendingUp size={22} strokeWidth={view === 'home' ? 2.5 : 1.5} />
                <span>Bisnis</span>
                {view === 'home' && <div className="nav-indicator"></div>}
              </div>
              <div className={`nav-item ${view === 'seller-products' ? 'active' : ''}`} onClick={() => setView('seller-products')}>
                <ShoppingBag size={22} strokeWidth={view === 'seller-products' ? 2.5 : 1.5} />
                <span>Produk</span>
                {view === 'seller-products' && <div className="nav-indicator"></div>}
              </div>
              <div className="nav-fab-container">
                <div className="nav-fab" style={{ background: 'var(--primary)' }} onClick={() => setView('add-product')}>
                  <PlusCircle size={24} color="white" />
                </div>
                <span className="fab-label">Tambah</span>
              </div>
              <div className={`nav-item ${view === 'seller-orders' ? 'active' : ''}`} onClick={() => setView('seller-orders')}>
                <Inbox size={22} strokeWidth={view === 'seller-orders' ? 2.5 : 1.5} />
                <span>Pesanan</span>
                {view === 'seller-orders' && <div className="nav-indicator"></div>}
              </div>
            </>
          )}

          {/* COURIER NAV */}
          {appRole === 'courier' && (
            <>
              <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                <LayoutDashboard size={22} strokeWidth={view === 'home' ? 2.5 : 1.5} />
                <span>Dashboard</span>
                {view === 'home' && <div className="nav-indicator"></div>}
              </div>
              <div className={`nav-item ${view === 'available-orders' ? 'active' : ''}`} onClick={() => setView('available-orders')}>
                <List size={22} strokeWidth={view === 'available-orders' ? 2.5 : 1.5} />
                <span>Tugas</span>
                {view === 'available-orders' && <div className="nav-indicator"></div>}
              </div>
              <div className="nav-fab-container">
                <div className="nav-fab" style={{ background: 'var(--primary)' }} onClick={() => setView('courier-map')}>
                  <Navigation size={24} color="white" />
                </div>
                <span className="fab-label">Peta</span>
              </div>
              <div className={`nav-item ${view === 'wallet' ? 'active' : ''}`} onClick={() => {
                setWalletRole('courier');
                setWalletBackView('home');
                setView('wallet');
              }}>
                <WalletIcon size={22} strokeWidth={view === 'wallet' ? 2.5 : 1.5} />
                <span>Dompet</span>
                {view === 'wallet' && <div className="nav-indicator"></div>}
              </div>
            </>
          )}

          <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}>
            <User size={22} strokeWidth={view === 'profile' ? 2.5 : 1.5} />
            <span>Profil</span>
            {view === 'profile' && <div className="nav-indicator"></div>}
          </div>
        </nav>
      )}
    </div>
  )
}

export default App
