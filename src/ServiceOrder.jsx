import { useState } from 'react';
import { 
    ArrowLeft, 
    MapPin, 
    ShoppingBasket, 
    Plus, 
    Minus,
    Truck,
    Bike,
    Clock,
    Search,
    ChevronRight,
    Navigation,
    CreditCard
} from 'lucide-react';
import './Services.css';
import AppBar from './components/AppBar';

const ServiceOrder = ({ serviceType, onBack, onComplete }) => {
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('Jl. Sam Ratulangi No. 12 (Rumah)');
    
    // Jastip specific
    const [shopList, setShopList] = useState([{ item: '', price: '' }]);
    const [estTotal, setEstTotal] = useState(0);

    // Fleet selection specific
    const [fleetType, setFleetType] = useState(serviceType === 'cargo' ? 'pickup' : 'motor');

    // Common
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getServiceTitle = () => {
        switch(serviceType) {
            case 'jastip': return 'Palu-Jastip (Nitip Belanja)';
            case 'ride': return 'Palu-Ride (Ojek/Antar)';
            case 'cargo': return 'Palu-Angkut (Barang)';
            default: return 'Layanan';
        }
    };

    const handleAddShopItem = () => {
        setShopList([...shopList, { item: '', price: '' }]);
    };

    const handleUpdateShopItem = (index, field, value) => {
        const newList = [...shopList];
        newList[index][field] = value;
        setShopList(newList);
        
        // Update approx total
        if (field === 'price') {
            const total = newList.reduce((acc, curr) => acc + (parseInt(curr.price) || 0), 0);
            setEstTotal(total);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            alert('Permintaan Layanan Berhasil Dikirim ke Kurir Terdekat!');
            setIsSubmitting(false);
            if(onComplete) onComplete();
        }, 1500);
    };

    const handleOpenMap = (type) => {
        // Simulate opening a map picker or Google Maps
        const query = type === 'pickup' ? pickup || 'Palu' : dropoff || 'Palu';
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
    };

    return (
        <div className="service-container">
            <AppBar title={getServiceTitle()} onBack={onBack} />
            <div style={{ height: 'calc(64px + var(--safe-top, 0px))' }}></div>

            <div className="scroll-content" style={{ paddingBottom: '100px' }}>
                
                {/* Location Selection */}
                <div className="service-card glass-card">
                    <div className="modern-route-frame">
                        {/* Origin Node */}
                        <div className="modern-route-node">
                            <div className="node-icon">
                                <div className="node-icon-dot origin-outlined"></div>
                                <div className="dotted-line-down"></div>
                            </div>
                            <div className="node-content">
                                <div className="node-header">
                                    <span className="node-label">{serviceType === 'jastip' ? 'Pilih Pasar / Toko' : 'Titik Jemput / Ambil'}</span>
                                    <div className="action-icon" onClick={() => handleOpenMap('pickup')} title="Buka Peta">
                                        <MapPin size={18} />
                                    </div>
                                </div>
                                <div className="node-input-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder={serviceType === 'jastip' ? "Cari lokasi pasar/toko" : "Cari lokasi penjemputan"} 
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Destination Node */}
                        <div className="modern-route-node">
                            <div className="node-icon">
                                <div className="node-icon-dot destination-solid"></div>
                            </div>
                            <div className="node-content">
                                <div className="node-header">
                                    <span className="node-label">Tujuan Antar</span>
                                    <div className="action-icon" onClick={() => handleOpenMap('dropoff')} title="Buka Peta">
                                        <Navigation size={18} />
                                    </div>
                                </div>
                                <div className="node-input-wrapper">
                                    <input 
                                        type="text" 
                                        value={dropoff}
                                        onChange={(e) => setDropoff(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specific Fields: JASTIP */}
                {serviceType === 'jastip' && (
                    <div className="service-card glass-card">
                        <h3>Daftar Belanja</h3>
                        <p style={{fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px'}}>Tulis barang apa saja yang ingin dititip</p>
                        
                        {shopList.map((item, index) => (
                            <div key={index} className="shop-item-row">
                                <div className="input-box flex-2">
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: Sayur kangkung 2 ikat" 
                                        value={item.item}
                                        onChange={(e) => handleUpdateShopItem(index, 'item', e.target.value)}
                                    />
                                </div>
                                <div className="input-box flex-1">
                                    <input 
                                        type="number" 
                                        placeholder="Est. Harga" 
                                        value={item.price}
                                        onChange={(e) => handleUpdateShopItem(index, 'price', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        
                        <button className="add-item-btn" onClick={handleAddShopItem}>
                            <Plus size={16} /> Tambah Barang Lainnya
                        </button>

                        <div className="summary-box">
                            <span>Estimasi Total Belanja & Talangan:</span>
                            <strong>Rp {estTotal.toLocaleString('id-ID')}</strong>
                        </div>
                    </div>
                )}

                {/* Specific Fields: CARGO / RIDE */}
                {(serviceType === 'cargo' || serviceType === 'ride') && (
                    <div className="service-card glass-card">
                        <h3>Pilihan Armada</h3>
                        <div className="fleet-options">
                            {serviceType === 'ride' ? (
                                <>
                                    <div className={`fleet-card ${fleetType === 'motor' ? 'active' : ''}`} onClick={() => setFleetType('motor')}>
                                        <Bike size={32} color={fleetType === 'motor' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ color: fleetType === 'motor' ? 'var(--primary-dark)' : 'var(--text-main)' }}>Motor</span>
                                        <small>1 Penumpang</small>
                                    </div>
                                    <div className={`fleet-card ${fleetType === 'mobil-ride' ? 'active' : ''}`} onClick={() => setFleetType('mobil-ride')}>
                                        <Truck size={32} color={fleetType === 'mobil-ride' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ color: fleetType === 'mobil-ride' ? 'var(--primary-dark)' : 'var(--text-main)' }}>Mobil</span>
                                        <small>Max 4 Org</small>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`fleet-card ${fleetType === 'pickup' ? 'active' : ''}`} onClick={() => setFleetType('pickup')}>
                                        <Truck size={32} color={fleetType === 'pickup' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ color: fleetType === 'pickup' ? 'var(--primary-dark)' : 'var(--text-main)' }}>Pickup Box</span>
                                        <small>Max 1 Ton</small>
                                    </div>
                                    <div className={`fleet-card ${fleetType === 'truck' ? 'active' : ''}`} onClick={() => setFleetType('truck')}>
                                        <Truck size={32} color={fleetType === 'truck' ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ color: fleetType === 'truck' ? 'var(--primary-dark)' : 'var(--text-main)' }}>Truk Box</span>
                                        <small>Max 3 Ton</small>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="service-card glass-card">
                    <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Catatan untuk Kurir (Opsional)</label>
                    <textarea 
                        className="notes-area" 
                        placeholder="Contoh: Tolong belikan yang segar / Hati-hati bawa barang pecah belah"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="bottom-checkout-bar glass-card">
                <div className="price-info">
                    <span style={{fontSize: '11px', color: 'var(--text-muted)'}}>Estimasi Tarif Jasa</span>
                    <strong style={{fontSize: '20px', color: 'var(--primary)'}}>Rp {serviceType === 'jastip' ? '15.000' : serviceType === 'ride' ? '10.000' : '45.000'}</strong>
                </div>
                <button className={`btn-primary ${isSubmitting ? 'loading' : ''}`} onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Mencari Kurir...' : 'Pesan Sekarang'}
                </button>
            </div>
        </div>
    );
};

export default ServiceOrder;
