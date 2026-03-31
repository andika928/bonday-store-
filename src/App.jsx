import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';

function App() {
  return (
    <>
      {/* Background Decor */}
      <div className="bg-noise"></div>
      <div className="bg-accent-corner"></div>

      <Navbar />

      <main className="container main-content">
        <Hero />
        <ProductCatalog />
      </main>

      {/* Add a simple footer for completeness if desired */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--val-gray)' }}>
        <p>&copy; {new Date().getFullYear()} BONDAY STORE. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
