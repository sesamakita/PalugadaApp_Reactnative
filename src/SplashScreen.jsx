import React from 'react';
import './SplashScreen.css';
import logo from './assets/branding/palugada-logo-main.png';

const SplashScreen = ({ version = "1.0.2-alpha", message = "Menginisialisasi..." }) => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="logo-container shine-effect">
                    <img src={logo} alt="Palugada Logo" className="splash-logo" />
                </div>

                <div className="loading-container">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    {message && <div className="splash-status-text">{message}</div>}
                </div>
            </div>

            <div className="version-info">
                Versi {version}
            </div>
        </div>
    );
};

export default SplashScreen;
