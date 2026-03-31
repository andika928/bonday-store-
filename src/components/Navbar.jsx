import React from 'react';

const Navbar = () => {
    return (
        <nav className="tactical-nav">
            <div className="container nav-content">
                <div className="logo">
                    <span className="logo-mark">//</span> BONDAY<span className="text-val-red">STORE</span>
                </div>
                <div className="nav-links">
                    <a href="https://discord.gg/BSwsFabk" target="_blank" rel="noopener noreferrer" className="val-btn val-btn-outline">
                        <span className="btn-text">JOIN DISCORD</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
