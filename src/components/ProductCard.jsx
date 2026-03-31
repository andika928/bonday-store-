import React from 'react';

const ProductCard = ({ category, product, price, desc, icon }) => {
    return (
        <div className={`val-card filter-item ${category}`}>
            <div className="card-bg-layer"></div>
            <div className="card-content">
                <div className="cat-icon">{icon}</div>
                <h3 className="card-title">{product}</h3>
                <p className="card-desc" dangerouslySetInnerHTML={{ __html: desc }}></p>
                <div className="card-price">{price}</div>
                <a href="https://discord.gg/BSwsFabk" target="_blank" rel="noopener noreferrer" className="val-btn buy-btn">
                    <span className="btn-text">ORDER SEKARANG</span>
                </a>
            </div>
        </div>
    );
};

export default ProductCard;
