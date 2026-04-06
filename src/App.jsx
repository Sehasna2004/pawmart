import React, { useEffect, useState } from 'react';
import PetCard from './components/PetCard';
import PetDetailModal from './components/PetDetailModal';

function App() {
  const [pets, setPets] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.error("Is your IntelliJ Backend running?", err));
  }, []);

  const filteredPets = pets.filter(pet => {
    const matchesSpecies = selectedSpecies === 'All' || 
      pet.species.toLowerCase() === selectedSpecies.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  const categories = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit'];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar (Hidden on Mobile) */}
      <aside className="w-64 bg-white border-r border-gray-200 p-8 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-teal-600 tracking-tight">PAWMART🐾</h1>
        </div>
        
        <nav className="space-y-6">
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</h3>
            <ul className="space-y-2 font-medium">
              {categories.map(category => (
                <li 
                  key={category}
                  onClick={() => setSelectedSpecies(category)}
                  className={`-mx-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedSpecies === category 
                    ? 'text-teal-600 bg-teal-50 font-bold' 
                    : 'text-gray-500 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {category === 'All' ? 'All Pets' : `${category}s`}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              {selectedSpecies === 'All' ? 'Adopt a Friend' : `${selectedSpecies}s for Adoption`}
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-medium">Showing {filteredPets.length} results</p>
          </div>
          
          <div className="flex gap-3">
             <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">Login</button>
             <button className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-100 hover:bg-teal-700 transition-all">Sign Up</button>
          </div>
        </header>

        {/* Mobile Horizontal Categories (Visible only on Mobile) */}
        <div className="lg:hidden flex overflow-x-auto gap-3 pb-6 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedSpecies(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                selectedSpecies === category 
                ? 'bg-teal-600 text-white border-teal-600 shadow-md' 
                : 'bg-white text-gray-500 border-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-10 group">
          <div className="relative max-w-2xl">
            <input 
              type="text" 
              placeholder="Search by pet name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:ring-0 outline-none transition-all shadow-sm bg-white font-medium"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔍</span>
          </div>
        </div>

        {/* Grid of Pets */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <div 
                key={pet.id} 
                onClick={() => setSelectedPet(pet)} 
                className="transform active:scale-95 transition-transform cursor-pointer"
              >
                <PetCard pet={pet} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border-4 border-dashed border-gray-50">
              <div className="text-5xl mb-4">🐾</div>
              <p className="text-gray-400 font-bold text-lg">No furry friends match your search.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedSpecies('All')}}
                className="mt-4 text-teal-600 font-black hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Detail Popup Modal */}
      <PetDetailModal 
        pet={selectedPet} 
        onClose={() => setSelectedPet(null)} 
      />
    </div>
  );
}

export default App;