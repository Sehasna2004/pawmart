import React, { useState } from 'react';
import { ShoppingBag, Star, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Store = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Placeholder data for your Sri Lankan Pet Shop
  const products = [
    { id: 1, name: "Drools Focus Adult Dog Food", price: 8500, category: "Food", rating: 4.8, img: "https://images.unsplash.com/photo-1589924691106-07c2639f5aa7?w=400" },
    { id: 2, name: "Retractable Leash (5m)", price: 2450, category: "Accessories", rating: 4.5, img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400" },
    { id: 3, name: "Cat Scratching Post", price: 5200, category: "Toys", rating: 4.9, img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400" },
    { id: 4, name: "Pet Shampoo (Aloe Vera)", price: 1800, category: "Health", rating: 4.7, img: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400" },
  ];

  const categories = ['All', 'Food', 'Toys', 'Accessories', 'Health'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-teal-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Adoption
        </Link>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-600">
            <ShoppingBag size={24} />
            <span className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
      </nav>

      {/* Store Hero */}
      <header className="py-16 px-8 text-center bg-slate-50">
        <h1 className="text-5xl font-black mb-4">PawMart <span className="text-teal-500 italic">Supplies</span></h1>
        <p className="text-slate-400 font-bold max-w-lg mx-auto">Everything your pets need, delivered straight to your door in Sri Lanka.</p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Category Filter */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' 
                : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-teal-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-100 mb-5 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
                <button className="absolute bottom-5 right-5 bg-white p-4 rounded-2xl shadow-xl text-teal-600 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-110">
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Star size={12} className="fill-current" />
                  <span className="text-[10px] font-black text-slate-400">{product.rating}</span>
                </div>
                <h3 className="font-black text-lg text-slate-800 leading-tight mb-1">{product.name}</h3>
                <p className="text-teal-600 font-black text-xl">Rs. {product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Store;