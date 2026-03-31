import React, { useState } from 'react';
import ProductCard from './ProductCard';

const products = [
    {
        id: 1,
        category: 'fivem',
        product: 'Custom Gunskin',
        price: 'Mulai Rp 40K',
        desc: '40K / Weapon (Basic)<br>50K / Weapon (Exclusive)',
        icon: '🔫',
        ticketInfo: 'Gunskin'
    },
    {
        id: 2,
        category: 'fivem',
        product: 'Custom Clothes',
        price: 'Mulai Rp 80K',
        desc: '80K / Texture (Male/Female)<br>120K / Texture (M & F)',
        icon: '👕',
        ticketInfo: 'Clothes'
    },
    {
        id: 3,
        category: 'fivem',
        product: 'Clothes Addons',
        price: 'Mulai Rp 100K',
        desc: '100K / Model (Male/Female)<br>150K / Model (M & F)',
        icon: '🧥',
        ticketInfo: 'Clothes'
    },
    {
        id: 4,
        category: 'fivem',
        product: 'Accesoris Addons',
        price: 'Mulai Rp 150K',
        desc: '150K / Model (Male/Female)<br>200K / Model (M & F)',
        icon: '🕶️',
        ticketInfo: 'Others'
    },
    {
        id: 5,
        category: 'fivem',
        product: 'Custom Logo',
        price: 'Mulai Rp 100K',
        desc: '100K / Logo Server/Gang.<br>+20K untuk Animated Logo',
        icon: '🎨',
        ticketInfo: 'Others'
    },
    {
        id: 6,
        category: 'fivem',
        product: 'Custom YMAP',
        price: 'Mulai Rp 400K',
        desc: '400K / Paket YMAP.<br>+50K / Custom Prop Addons',
        icon: '🏛️',
        ticketInfo: 'Others'
    },
    {
        id: 7,
        category: 'roblox',
        product: 'Map Roblox',
        price: 'Tanya Harga',
        desc: 'Bantuan pembangunan Map Roblox Studio sesuai request.',
        icon: '🗺️',
        ticketInfo: 'Others'
    },
    {
        id: 8,
        category: 'roblox',
        product: 'Robux',
        price: 'Best Rate',
        desc: 'Jasa pengisian Robux cepat via server Discord.',
        icon: 'R$',
        ticketInfo: 'Others'
    },
    {
        id: 9,
        category: 'sosmed',
        product: 'Discord Nitro',
        price: 'Hub Harga',
        desc: 'Nitro Boost / Basic untuk memperkuat Profile & Server.',
        icon: '🚀',
        ticketInfo: 'Sosmed'
    },
    {
        id: 10,
        category: 'sosmed',
        product: 'Free Assets',
        price: 'GRATIS',
        desc: 'Dapatkan akses aset Gunskin dan Resource Graphic gratis di Discord kami!',
        icon: '🎁',
        ticketInfo: 'Others'
    }
];

const ProductCatalog = () => {
    const [filter, setFilter] = useState('all');

    const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

    return (
        <section id="catalog" className="catalog-section">
            <div className="section-header">
                <h2 className="section-title">KATALOG <span className="text-val-red">PRODUK</span></h2>
                <div className="title-line"></div>
            </div>

            {/* Category Tabs */}
            <div className="tabs-container">
                <button 
                    className={`tab-btn ${filter === 'all' ? 'active' : ''}`} 
                    onClick={() => setFilter('all')}
                >
                    SEMUA
                </button>
                <button 
                    className={`tab-btn ${filter === 'fivem' ? 'active' : ''}`} 
                    onClick={() => setFilter('fivem')}
                >
                    FIVEM SHOP
                </button>
                <button 
                    className={`tab-btn ${filter === 'roblox' ? 'active' : ''}`} 
                    onClick={() => setFilter('roblox')}
                >
                    ROBLOX SHOP
                </button>
                <button 
                    className={`tab-btn ${filter === 'sosmed' ? 'active' : ''}`} 
                    onClick={() => setFilter('sosmed')}
                >
                    SOCIAL MEDIA & ASSETS
                </button>
            </div>
            
            <div className="product-grid" id="productGrid">
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id}
                        category={product.category}
                        product={product.product}
                        price={product.price}
                        desc={product.desc}
                        icon={product.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductCatalog;
