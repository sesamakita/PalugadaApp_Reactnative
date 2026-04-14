import React from 'react';
import { ChevronLeft } from 'lucide-react';
import './AppBar.css';

const AppBar = ({ title, onBack, rightIcon }) => {
    return (
        <header className="common-appbar glass">
            {onBack ? (
                <button className="common-appbar-back" onClick={onBack}>
                    <ChevronLeft size={24} strokeWidth={2} />
                </button>
            ) : (
                <div className="common-appbar-back" style={{ opacity: 0, pointerEvents: 'none' }}>
                    <ChevronLeft size={24} />
                </div>
            )}
            <div className="common-appbar-title">
                {title}
            </div>
            <div className="common-appbar-right">
                {rightIcon}
            </div>
        </header>
    );
};

export default AppBar;
