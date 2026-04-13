import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PetCard from '../components/PetCard';
import PetDetailModal from '../components/PetDetailModal';

const MainGallery = ({ pets, isLoggedIn, username, onLogout }) => {
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gallerySectionRef = useRef(null);

  const scrollToGallery = () => {
    gallerySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (isLoggedIn && searchParams.get('action') === 'adopt') {
      scrollToGallery();
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, searchParams, navigate]);

  const handleAdminClick = () => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    isAdmin ? navigate('/admin') : navigate('/login');
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
      <main className="flex-1 overflow-y-auto scroll-smooth">
        
        {/* --- NAVBAR --- */}
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
              <Link to="/signup" className="hover:text-teal-600 transition-colors">Rehome</Link>
              <Link to="/services" className="hover:text-teal-600 transition-colors">Services</Link>
              <Link to="/about" className="hover:text-teal-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold">
            <button onClick={handleAdminClick} className="text-slate-400 hover:text-slate-600 transition-colors">Admin</button>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-teal-600 bg-teal-50 px-4 py-2 rounded-full font-black">Hi, {username}</span>
                <button onClick={onLogout} className="text-red-400 hover:text-red-600">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-teal-600">Log in</Link>
                <Link to="/signup" className="bg-[#2eb0a1] text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 text-center">Sign up</Link>
              </>
            )}
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className="bg-[#eef7f6] pt-24 pb-32 px-6 md:px-12 text-center">
          <div className="max-w-5xl mx-auto">
            <span className="bg-[#d5ece9] text-teal-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              Your Pet's Happy Place
            </span>
            <h1 className="text-6xl md:text-[5.5rem] font-black text-[#1a2e35] mt-10 mb-8 leading-[1]">
              Find, Care, & Love Your <br />
              <span className="text-teal-500">Perfect Companion</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-10">
              <button 
                onClick={scrollToGallery}
                className="bg-[#2eb0a1] text-white px-10 py-5 rounded-full font-black shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all active:scale-95 min-w-[220px]"
              >
                🔍 See Our Pets
              </button>

              {isLoggedIn ? (
                <button 
                  onClick={scrollToGallery}
                  className="bg-white text-slate-700 px-10 py-5 rounded-full font-black shadow-md border border-slate-100 hover:bg-slate-50 transition-all min-w-[220px]"
                >
                  ❤️ Adopt a Pet
                </button>
              ) : (
                <Link 
                  to="/signup?action=adopt"
                  className="bg-white text-slate-700 px-10 py-5 rounded-full font-black shadow-md border border-slate-100 hover:bg-slate-50 transition-all min-w-[220px]"
                >
                  ❤️ Adopt a Pet
                </Link>
              )}
              
              <Link 
                to={isLoggedIn ? "/rehome-pet" : "/signup"}
                className="bg-white text-slate-700 px-10 py-5 rounded-full font-black shadow-md border border-slate-100 hover:bg-slate-50 transition-all min-w-[220px]"
              >
                🤝 Rehome a Pet
              </Link>
            </div>
          </div>
        </section>

        {/* --- GALLERY SECTION --- */}
        <div ref={gallerySectionRef} className="p-6 md:p-12 min-h-screen max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
              {selectedSpecies === 'All' ? 'Available Pets' : `${selectedSpecies}s for Adoption`}
            </h2>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {filteredPets.map(pet => (
              <div key={pet.id} onClick={() => setSelectedPet(pet)} className="cursor-pointer">
                <PetCard pet={pet} />
              </div>
            ))}
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

export default MainGallery;