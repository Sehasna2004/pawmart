import React, { useEffect, useState } from 'react';
import PetCard from './components/PetCard';

function App() {
  const [pets, setPets] = useState([]);

  // Fetch from your IntelliJ Backend
  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.error("Backend not running?", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar Filter */}
      <aside className="w-64 bg-white border-r border-gray-200 p-8 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-teal-600 tracking-tight">PAWMART🐾</h1>
        </div>
        
        <nav className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-3 font-medium">
              <li className="text-teal-600 bg-teal-50 -mx-3 px-3 py-2 rounded-lg cursor-pointer">All Pets</li>
              <li className="text-gray-500 hover:text-teal-600 cursor-pointer">Dogs</li>
              <li className="text-gray-500 hover:text-teal-600 cursor-pointer">Cats</li>
              <li className="text-gray-500 hover:text-teal-600 cursor-pointer">Birds</li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Adopt a Friend</h2>
          <div className="flex gap-4">
             <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold">Login</button>
             <button className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-teal-100">Sign Up</button>
          </div>
        </header>

        {/* The Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pets.length > 0 ? (
            pets.map(pet => <PetCard key={pet.id} pet={pet} />)
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400">Waiting for data from IntelliJ... Make sure your Backend is running!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;