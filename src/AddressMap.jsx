import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Navigation, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

// Component to handle map clicks and marker dragging
const LocationMarker = ({ position, setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const marker = e.target;
                    const pos = marker.getLatLng();
                    setPosition([pos.lat, pos.lng]);
                },
            }}
        />
    ) : null;
};

const AddressMap = ({ initialPosition, onConfirm, onClose }) => {
    // Default: Titik tengah Sulawesi Tengah
    const sultengCenter = [-1.4300, 121.4456];
    const [position, setPosition] = useState(initialPosition || sultengCenter);
    const [zoom, setZoom] = useState(initialPosition ? 16 : 7);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    // Auto-detect location on mount
    useEffect(() => {
        if (!initialPosition && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = [pos.coords.latitude, pos.coords.longitude];
                    setPosition(newPos);
                    setZoom(16);
                },
                (err) => console.log("Auto-detect failed, using default center", err),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        }
    }, [initialPosition]);

    // Reverse geocoding to get address from coordinates
    useEffect(() => {
        if (position) {
            setLoading(true);
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}&addressdetails=1`)
                .then(res => res.json())
                .then(data => {
                    if (data.address) {
                        const addressValues = Object.values(data.address).map(v => v.toString().toLowerCase());
                        
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
                        for (const item of searchKeywords) {
                            if (addressValues.some(val => val.includes(item.key))) {
                                foundBrandedName = item.brand;
                                break;
                            }
                        }

                        if (foundBrandedName) {
                            setAddress(foundBrandedName);
                        } else {
                            // Fallback to full address but cleaned for header display if needed
                            setAddress(data.display_name);
                        }
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [position]);

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    setZoom(16);
                    setLoading(false);
                },
                (error) => {
                    setLoading(false);
                    console.error('Error getting location:', error);
                    alert('Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi diaktifkan.');
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser Anda.');
        }
    };

    const handleConfirm = () => {
        onConfirm({
            lat: position[0],
            lng: position[1],
            address: address
        });
    };

    return (
        <div className="map-modal-overlay">
            <div className="map-modal-container">
                <div className="map-modal-header">
                    <h3>Pilih Lokasi di Peta</h3>
                    <button className="map-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="map-container">
                    <MapContainer
                        center={position}
                        zoom={zoom}
                        style={{ height: '100%', width: '100%' }}
                        key={`${position[0]}-${position[1]}`} // Force re-render on pos change
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>

                    <button className="current-location-btn" onClick={handleUseCurrentLocation}>
                        <Navigation size={20} />
                        Gunakan Lokasi Saya
                    </button>
                </div>

                <div className="map-modal-footer">
                    <div className="selected-address">
                        <p className="address-label">Alamat Terpilih:</p>
                        <p className="address-text">
                            {loading ? 'Memuat lokasi...' : address || 'Klik pada peta untuk memilih lokasi'}
                        </p>
                    </div>
                    <div className="map-modal-actions">
                        <button className="cancel-btn" onClick={onClose}>
                            Batal
                        </button>
                        <button className="save-btn" onClick={handleConfirm} disabled={loading}>
                            Konfirmasi Lokasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressMap;
