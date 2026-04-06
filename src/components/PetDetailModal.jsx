import React, { useState } from 'react';

const PetDetailModal = ({ pet, onClose }) => {
  // 1. State to track if the user has successfully clicked adopt
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!pet) return null;

  const handleAdopt = async () => {
    setLoading(true);
    try {
      // Sends the POST request to your Spring Boot API
      const response = await fetch(`http://localhost:8080/api/pets/${pet.id}/adopt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 2. Instead of an alert, show the success view
        setIsSubmitted(true);
      } else {
        alert("Server error: Make sure your Backend has the /adopt endpoint!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to IntelliJ. Is the Backend running?");
    } finally {
      setLoading(false);
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

        {!isSubmitted ? (
          /* --- VIEW 1: THE PET DETAILS --- */
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
                disabled={loading}
                className={`w-full mt-10 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 shadow-teal-100 hover:bg-teal-700 hover:-translate-y-1'
                }`}
              >
                {loading ? "Processing..." : `Adopt ${pet.name} Now`}
              </button>
            </div>
          </div>
        ) : (
          /* --- VIEW 2: THE SUCCESS MESSAGE --- */
          <div className="p-12 text-center animate-in slide-in-from-bottom duration-500">
            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🎉
            </div>
            <h2 className="text-3xl font-black text-gray-800">Application Sent!</h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Thank you for choosing to adopt **{pet.name}**! Your request has been sent to our team. 
              We will contact you at your registered email to schedule a meet-and-greet.
            </p>
            <button 
              onClick={onClose}
              className="mt-10 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl"
            >
              Back to Gallery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetailModal;