import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PetCard from './components/PetCard';
import PetDetailModal from './components/PetDetailModal';
import AdminPanel from './components/AdminPanel';
import Store from './Store'; 

// --- COMPONENT 1: THE CUSTOMER VIEW (Main Gallery) ---
const MainGallery = ({ pets }) => {
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  const gallerySectionRef = useRef(null);

  const scrollToGallery = () => {
    gallerySectionRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const filteredPets = pets.filter(pet => {
    const matchesSpecies = selectedSpecies === 'All' || 
      pet.species.toLowerCase() === selectedSpecies.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  const categories = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit'];

  return (
    <div className="h-screen bg-white font-sans text-gray-900 overflow-hidden flex flex-col">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scroll-smooth">
        
        {/* --- 1. TOP NAVBAR (Exact match to your design) --- */}
        <nav className="flex items-center justify-between px-10 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-50">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 text-teal-600">
              <div className="bg-teal-500 p-1.5 rounded-lg shadow-lg shadow-teal-100">
                <span className="text-white text-xl">❤️</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800">PawMart</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
              <button onClick={scrollToGallery} className="hover:text-teal-600 transition-colors">Pets</button>
              <Link to="/store" className="hover:text-teal-600 transition-colors">Store</Link>
              <Link to="/services" className="hover:text-teal-600 transition-colors">Services</Link>
              <Link to="/about" className="hover:text-teal-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold">
            <Link to="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">Admin</Link>
            <button className="text-slate-600 hover:text-teal-600">Log in</button>
            <button className="bg-[#2eb0a1] text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100">
              Sign up
            </button>
          </div>
        </nav>

        {/* --- 2. HERO SECTION --- */}
        <section className="bg-[#eef7f6] pt-24 pb-32 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="bg-[#d5ece9] text-teal-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              Your Pet's Happy Place
            </span>
            <h1 className="text-6xl md:text-[5.5rem] font-black text-[#1a2e35] mt-10 mb-8 leading-[1]">
              Find, Care, & Love Your <br />
              <span className="text-teal-500">Perfect Companion</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
              The smart marketplace for all pets. Adopt, shop supplies, and book premium 
              services all in one trusted platform in Sri Lanka.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={scrollToGallery}
                className="bg-[#2eb0a1] text-white px-12 py-5 rounded-full font-black shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all active:scale-95"
              >
                🔍 Find a Pet
              </button>
              <Link 
                to="/store"
                className="bg-white text-slate-700 px-12 py-5 rounded-full font-black shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
              >
                Shop Supplies
              </Link>
            </div>
          </div>
        </section>

        {/* --- 3. GALLERY SECTION --- */}
        <div ref={gallerySectionRef} className="p-6 md:p-12 min-h-screen max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                {selectedSpecies === 'All' ? 'Available Pets' : `${selectedSpecies}s for Adoption`}
              </h2>
              <p className="text-slate-400 text-sm font-semibold mt-1">
                Showing {filteredPets.length} furry friends ready for a home
              </p>
            </div>

            {/* Category Filter Chips (replacing the sidebar functionality) */}
            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedSpecies(cat)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    selectedSpecies === cat 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' 
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="mb-12 relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search by breed or name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-5 pl-14 rounded-[2rem] border-2 border-slate-50 focus:border-teal-500 outline-none bg-slate-50 focus:bg-white font-bold text-slate-700 transition-all shadow-sm" 
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2">🔍</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {filteredPets.length > 0 ? (
              filteredPets.map(pet => (
                <div key={pet.id} onClick={() => setSelectedPet(pet)} className="cursor-pointer">
                  <PetCard pet={pet} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                 <p className="text-slate-400 font-bold text-lg">No pets found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedPet && (
        <PetDetailModal 
          pet={selectedPet} 
          onClose={() => setSelectedPet(null)} 
        />
      )}
    </div>
  );
};

function App() {
  const [pets, setPets] = useState([]);

  const refreshPets = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/pets");
      if (!res.ok) throw new Error("Connection failed");
      const data = await res.json();
      setPets(data);
    } catch (err) { 
      console.error("Backend Error:", err); 
    }
  };

  useEffect(() => {
    refreshPets();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainGallery pets={pets} />} />
        <Route path="/store" element={<Store />} />
        <Route path="/admin" element={<AdminPanel pets={pets} refreshPets={refreshPets} />} />
      </Routes>
    </Router>
  );
}

export default App;