import React, { useState } from 'react';
import {
    MapPin,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    ChevronRight,
    Bike,
    Phone,
    MessageCircle,
    ShoppingCart
} from 'lucide-react';
import './MyOrders.css';
import AppBar from './components/AppBar';
import { EmptyState, showToast } from './components/QuickWins';

const MyOrders = ({ onBack, onTrackOrder, onAddToCart }) => {
    const [activeTab, setActiveTab] = useState('active'); // active, completed, cancelled

    // Quick Wins: Reorder functionality
    const handleReorder = (order) => {
        // Simulate adding items back to cart
        showToast(`${order.items.length} item ditambahkan ke keranjang!`);
        // In production: order.items.forEach(item => onAddToCart(item));
    };

    // Mock data - replace with API call
    const orders = [
        {
            id: 'ORD-2024-001',
            status: 'in_delivery',
            statusLabel: 'Dalam Perjalanan',
            items: [
                { name: 'Batik Tulis Premium', qty: 1, price: 325000 }
            ],
            total: 340000,
            courier: {
                name: 'Andi Setiawan',
                phone: '628123456789',
                vehicle: 'Honda Vario • AG 1234 XY'
            },
            seller: {
                name: 'Toko Batik Jaya',
                location: 'Pasar Baru'
            },
            estimatedArrival: '14:30',
            trackingNumber: 'TRK-991',
            orderDate: '12 Feb 2024, 09:00',
            shippingCost: 15000
        },
        {
            id: 'ORD-2024-002',
            status: 'ready_for_pickup',
            statusLabel: 'Siap Diambil Kurir',
            items: [
                { name: 'Keripik Tempe Original', qty: 2, price: 25000 },
                { name: 'Sambal Roa Pedas', qty: 1, price: 45000 }
            ],
            total: 110000,
            seller: {
                name: 'Warung Bu Siti',
                location: 'Jl. Mawar No. 4'
            },
            orderDate: '12 Feb 2024, 10:30',
            shippingCost: 15000
        },
        {
            id: 'ORD-2024-003',
            status: 'delivered',
            statusLabel: 'Selesai',
            items: [
                { name: 'Kopi Robusta 250gr', qty: 1, price: 65000 }
            ],
            total: 80000,
            seller: {
                name: 'Kedai Kopi Nusantara',
                location: 'Jl. Sudirman'
            },
            deliveredDate: '11 Feb 2024, 16:45',
            orderDate: '11 Feb 2024, 08:00',
            shippingCost: 15000
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'in_delivery':
                return <Bike size={16} color="#0ead98" />;
            case 'ready_for_pickup':
                return <Package size={16} color="#fbb03b" />;
            case 'delivered':
                return <CheckCircle size={16} color="#10b981" />;
            case 'cancelled':
                return <XCircle size={16} color="#ef4444" />;
            default:
                return <Clock size={16} color="#94a3b8" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_delivery':
                return '#0ead98';
            case 'ready_for_pickup':
                return '#fbb03b';
            case 'delivered':
                return '#10b981';
            case 'cancelled':
                return '#ef4444';
            default:
                return '#94a3b8';
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'active') {
            return ['in_delivery', 'ready_for_pickup', 'courier_assigned'].includes(order.status);
        } else if (activeTab === 'completed') {
            return order.status === 'delivered';
        } else if (activeTab === 'cancelled') {
            return order.status === 'cancelled';
        }
        return true;
    });

    return (
        <div className="my-orders-container">
            <AppBar title="Pesanan Saya" onBack={onBack} />
            <div style={{ height: '64px' }}></div>

            {/* Tabs */}
            <div className="orders-tabs">
                <button
                    className={`tab ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Aktif ({orders.filter(o => ['in_delivery', 'ready_for_pickup', 'courier_assigned'].includes(o.status)).length})
                </button>
                <button
                    className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Selesai ({orders.filter(o => o.status === 'delivered').length})
                </button>
                <button
                    className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cancelled')}
                >
                    Dibatalkan ({orders.filter(o => o.status === 'cancelled').length})
                </button>
            </div>

            {/* Orders List */}
            <div className="scroll-content" style={{ paddingBottom: '40px' }}>
                {filteredOrders.length === 0 ? (
                    <EmptyState
                        icon={Package}
                        title="Belum Ada Pesanan"
                        description="Pesanan Anda akan muncul di sini setelah checkout"
                        buttonText="Mulai Belanja"
                        onButtonClick={onBack}
                    />
                ) : (
                    <div className="orders-list">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="order-card card">
                                {/* Header */}
                                <div className="order-card-header">
                                    <div className="order-id-section">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">{order.orderDate}</span>
                                    </div>
                                    <div className="status-badge" style={{ backgroundColor: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status) }}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.statusLabel}</span>
                                    </div>
                                </div>

                                {/* Seller Info */}
                                <div className="order-seller">
                                    <MapPin size={14} style={{ opacity: 0.7 }} />
                                    <span>{order.seller.name} • {order.seller.location}</span>
                                </div>

                                {/* Items */}
                                <div className="order-items">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="order-item-row">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-qty">x{item.qty}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Courier Info (if assigned) */}
                                {order.courier && (
                                    <div className="order-courier-info">
                                        <div className="courier-details">
                                            <Bike size={16} color="var(--primary)" />
                                            <div className="courier-text">
                                                <strong>{order.courier.name}</strong>
                                                <span className="courier-vehicle">{order.courier.vehicle}</span>
                                            </div>
                                        </div>
                                        <div className="courier-actions">
                                            <a href={`tel:${order.courier.phone}`} className="icon-btn">
                                                <Phone size={16} />
                                            </a>
                                            <a href={`https://wa.me/${order.courier.phone}`} className="icon-btn wa">
                                                <MessageCircle size={16} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* ETA (for active orders) */}
                                {order.estimatedArrival && order.status === 'in_delivery' && (
                                    <div className="order-eta">
                                        <Clock size={14} color="#fbb03b" />
                                        <span>Estimasi tiba pukul {order.estimatedArrival}</span>
                                    </div>
                                )}

                                {/* Delivered info */}
                                {order.deliveredDate && order.status === 'delivered' && (
                                    <div className="order-delivered">
                                        <CheckCircle size={14} color="#10b981" />
                                        <span>Diterima pada {order.deliveredDate}</span>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="order-card-footer">
                                    <div className="order-total">
                                        <span>Total Pesanan</span>
                                        <strong>Rp {order.total.toLocaleString('id-ID')}</strong>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="order-actions">
                                        {['in_delivery', 'courier_assigned'].includes(order.status) && (
                                            <button
                                                className="btn-track"
                                                onClick={() => onTrackOrder(order)}
                                            >
                                                <MapPin size={16} />
                                                Lacak Paket
                                                <ChevronRight size={16} />
                                            </button>
                                        )}

                                        {order.status === 'delivered' && (
                                            <>
                                                <button
                                                    className="btn-secondary-sm"
                                                    onClick={() => handleReorder(order)}
                                                >
                                                    <ShoppingCart size={14} style={{ marginRight: '4px' }} />
                                                    Beli Lagi
                                                </button>
                                                <button className="btn-primary-sm">Beri Ulasan</button>
                                            </>
                                        )}

                                        {order.status === 'ready_for_pickup' && (
                                            <button className="btn-text">Lihat Detail</button>
                                        )}
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

export default MyOrders;
