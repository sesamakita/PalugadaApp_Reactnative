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
    const defaultPosition = initialPosition || [-7.2575, 112.7521]; // Surabaya default
    const [position, setPosition] = useState(defaultPosition);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    // Reverse geocoding to get address from coordinates
    useEffect(() => {
        if (position) {
            setLoading(true);
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`)
                .then(res => res.json())
                .then(data => {
                    if (data.display_name) {
                        setAddress(data.display_name);
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
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi diaktifkan.');
                }
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
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
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
                            {loading ? 'Memuat alamat...' : address || 'Klik pada peta untuk memilih lokasi'}
                        </p>
                    </div>
                    <div className="map-modal-actions">
                        <button className="cancel-btn" onClick={onClose}>
                            Batal
                        </button>
                        <button className="save-btn" onClick={handleConfirm}>
                            Konfirmasi Lokasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressMap;
