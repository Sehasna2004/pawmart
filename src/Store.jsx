import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Plus, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- NEW FILTER STATES ---
  const [priceRange, setPriceRange] = useState(25000); // Default max price in Rs.
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = ['All', 'Food', 'Toys', 'Accessories', 'Health', 'Grooming', 'Beds & Cages'];

  // Fetch products from backend or use your local array
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // If your backend is ready, uncomment the next line:
        // const res = await axios.get("http://localhost:8080/api/products");
        // setProducts(res.data);
        
        // Using your provided products as default state for now
        setProducts([
          { id: 1, name: "Drools Focus Adult Dog Food", price: 8500, category: "Food", rating: 4.8, img: "https://images.unsplash.com/photo-1589924691106-07c2639f5aa7?w=400", inStock: true },
          { id: 2, name: "Retractable Leash (5m)", price: 2450, category: "Accessories", rating: 4.5, img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400", inStock: true },
          { id: 3, name: "Cat Scratching Post", price: 5200, category: "Toys", rating: 4.9, img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400", inStock: false },
          { id: 4, name: "Pet Shampoo (Aloe Vera)", price: 1800, category: "Health", rating: 4.7, img: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400", inStock: true },
        ]);
      } catch (err) {
        console.error("Store Fetch Error:", err);
      }
    };
    fetchProducts();
  }, []);

  // Updated filtering logic to include Price and Stock
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    const matchesStock = inStockOnly ? p.inStock : true;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  const clearFilters = () => {
    setPriceRange(25000);
    setActiveCategory('All');
    setInStockOnly(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans text-slate-800">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-teal-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Adoption
        </Link>
        
        <div className="hidden md:flex items-center relative w-1/3">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-teal-500 outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors">
            <ShoppingBag size={24} />
            <span className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-7xl mx-auto pt-16 px-8">
        <h1 className="text-5xl font-black text-[#1a2e35]">Pet Supplies</h1>
        <p className="text-slate-400 font-bold mt-2">Everything your pet needs</p>

        {/* Category Horizontal Scroll (Matching Design) */}
        <div className="flex gap-4 mt-10 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-white text-teal-600 shadow-md border-b-2 border-teal-500' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Layout with Sidebar Filter */}
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-[280px,1fr] gap-12">
        
        {/* SIDEBAR - Filter Controls */}
        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 sticky top-28">
            
            {/* PRICE RANGE FILTER */}
            <div className="mb-10">
              <h3 className="text-lg font-black mb-6">Price Range</h3>
              <input 
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between mt-4 font-bold text-slate-400 text-xs">
                <span>Rs. 0</span>
                <span className="text-teal-600">Rs. {priceRange.toLocaleString()}</span>
              </div>
            </div>

            {/* IN STOCK TOGGLE */}
            <div className="flex items-center justify-between mb-10">
              <span className="font-bold text-slate-700 text-sm">In Stock Only</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>

            <button 
              onClick={clearFilters}
              className="w-full py-4 rounded-2xl border-2 border-slate-100 font-black text-slate-400 text-xs hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-500">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-4">
                    <img 
                      src={product.img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                    />
                    
                    {/* Discount Badge Example */}
                    {product.price > 7000 && (
                      <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        20% OFF
                      </span>
                    )}

                    <button className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </div>
                  
                  <div className="px-2 pb-2">
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      <Star size={10} className="fill-current" />
                      <span className="text-[10px] font-black text-slate-400">{product.rating}</span>
                    </div>
                    <h3 className="font-black text-base text-slate-800 leading-tight mb-2 h-10 overflow-hidden">
                      {product.name}
                    </h3>
                    <p className="text-teal-600 font-black text-lg">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-xl">No supplies match your filters.</p>
              <button onClick={clearFilters} className="text-teal-600 font-black mt-4 hover:underline">Reset all filters</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Store;