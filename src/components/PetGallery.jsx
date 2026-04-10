import React, { useState } from 'react';
import { Search, Filter, Dog, Cat, Bird, LayoutGrid } from 'lucide-react';
import PetCard from './PetCard'; // Assuming your card component name

const PetGallery = ({ pets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter Logic: Combining Search and Category
  const filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'All' || pet.species === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { name: 'All', icon: <LayoutGrid size={18} /> },
    { name: 'Dog', icon: <Dog size={18} /> },
    { name: 'Cat', icon: <Cat size={18} /> },
    { name: 'Bird', icon: <Bird size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* FILTER & SEARCH SECTION */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Category Switcher */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-white text-teal-600 shadow-sm scale-105' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search breed or name..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:border-teal-500 rounded-2xl outline-none font-bold text-slate-700 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredPets.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="text-6xl mb-4 grayscale opacity-30">🔍</div>
          <h3 className="text-2xl font-black text-slate-800">No pets found</h3>
          <p className="text-slate-400 font-medium mt-2">Try adjusting your filters or search term.</p>
          <button 
            onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
            className="mt-6 text-teal-600 font-black hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PetGallery;