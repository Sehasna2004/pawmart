import React from 'react';

const PetDetailModal = ({ pet, onClose }) => {
  if (!pet) return null;

  const handleAdopt = async () => {
    try {
      // This sends a POST request to your Spring Boot API
      const response = await fetch(`http://localhost:8080/api/pets/${pet.id}/adopt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert(`Success! You have started the adoption process for ${pet.name}.`);
        onClose(); // Close the popup after success
      } else {
        alert("Server error: Make sure your Backend has the /adopt endpoint!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to IntelliJ. Is the Backend running?");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-200 z-10 shadow-sm transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Image Section */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'} 
              className="w-full h-full object-cover" 
              alt={pet.name}
            />
          </div>

          {/* Right: Info Section */}
          <div className="md:w-1/2 p-8">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-widest bg-teal-50 px-2 py-1 rounded-md">
              {pet.species}
            </span>
            <h2 className="text-3xl font-black text-gray-800 mt-3">{pet.name}</h2>
            <p className="text-sm text-gray-500 italic mb-6">{pet.breed}</p>
            
            <div className="flex gap-4 mb-8">
              <div className="bg-gray-50 p-3 rounded-2xl flex-1 text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Age</p>
                <p className="font-bold text-gray-700">{pet.age} yrs</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl flex-1 text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Price</p>
                <p className="font-bold text-teal-600">${pet.price}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 border-b pb-2">About this pet</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {pet.description || `${pet.name} is a wonderful ${pet.breed} currently located in ${pet.location}. They are looking for a loving family to call their own.`}
              </p>
            </div>

            <button 
              onClick={handleAdopt}
              className="w-full mt-10 bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-100 hover:bg-teal-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              Adopt {pet.name} Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailModal;