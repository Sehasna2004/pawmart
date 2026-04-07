import React, { useState } from 'react';
import { User, Phone, CheckCircle, ArrowRight, X } from 'lucide-react';

const PetDetailModal = ({ pet, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    phoneNumber: ''
  });

  if (!pet) return null;

  // Helper to format Age
  const formatAge = (age) => {
    if (age < 1) {
      const months = Math.round(age * 12);
      return `${months} ${months === 1 ? 'Month' : 'Months'}`;
    }
    const years = Math.floor(age);
    const remainingMonths = Math.round((age - years) * 12);
    if (remainingMonths > 0) return `${years}y ${remainingMonths}m`;
    return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  };

  // Helper to format Price to LKR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price).replace("LKR", "Rs.");
  };

  const handleAdopt = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/api/pets/${pet.id}/adopt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerInfo),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Server error: Check if your Java Backend is running!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to PawMart Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-gray-200 z-50 shadow-sm transition-all"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Left: Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative bg-slate-100">
              <img 
                src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'} 
                className="w-full h-full object-cover" 
                alt={pet.name}
              />
              <div className="absolute bottom-6 left-6">
                 <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-teal-700 font-black text-sm shadow-lg">
                    {pet.species}
                 </span>
              </div>
            </div>

            {/* Right: Info & Form Section - Scrollable */}
            <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto bg-white flex flex-col">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">{pet.name}</h2>
              <p className="text-slate-400 font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span> {pet.breed}
              </p>
              
              <div className="flex gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Age</p>
                  <p className="font-black text-slate-700">{formatAge(pet.age)}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Price</p>
                  <p className="font-black text-teal-600">{formatPrice(pet.price)}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Description</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {pet.description || `${pet.name} is a wonderful pet looking for a home.`}
                </p>
              </div>

              {/* Inquiry Form */}
              <div className="bg-teal-50/50 p-6 rounded-[2rem] border border-teal-100/50 mt-auto">
                <h4 className="font-black text-teal-800 text-xs uppercase tracking-widest mb-4">Interested? Send an Inquiry</h4>
                <form onSubmit={handleAdopt} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required
                      className="w-full p-4 pl-12 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 font-bold text-sm shadow-sm"
                      value={customerInfo.customerName}
                      onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-300" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      className="w-full p-4 pl-12 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 font-bold text-sm shadow-sm"
                      value={customerInfo.phoneNumber}
                      onChange={(e) => setCustomerInfo({...customerInfo, phoneNumber: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-2 text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      loading ? 'bg-slate-300' : 'bg-teal-600 shadow-teal-100 hover:bg-teal-700'
                    }`}
                  >
                    {loading ? "Sending..." : "Submit Application"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="p-16 text-center animate-in slide-in-from-bottom duration-500 w-full">
            <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Application Sent!</h2>
            <p className="text-slate-500 mt-6 max-w-md mx-auto leading-relaxed font-medium">
              Excellent news! Your interest in **{pet.name}** has been recorded. 
              The PawMart team will review your contact details and call you at <span className="text-teal-600 font-bold">{customerInfo.phoneNumber}</span> soon.
            </p>
            <button 
              onClick={onClose}
              className="mt-12 bg-slate-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-2xl"
            >
              Back to Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetailModal;