import React from 'react';

const PetCard = ({ pet }) => {
  // Helper to format Age (Handles decimals like 0.3)
  const formatAge = (age) => {
    if (age === null || age === undefined) return "Unknown age";
    
    // If age is less than 1 (e.g., 0.3 for a kitten)
    if (age < 1) {
      const months = Math.round(age * 12);
      if (months === 0) return "Newborn";
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    
    // If age is 1 or more (e.g., 1.5 years)
    const years = Math.floor(age);
    const remainingMonths = Math.round((age - years) * 12);
    
    if (remainingMonths > 0) return `${years}y ${remainingMonths}m`;
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  };

  // Helper to format Price to LKR (Standard Sri Lankan formatting)
  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price).replace("LKR", "Rs.");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group">
      <div className="relative">
        <img 
          src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'} 
          alt={pet.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-gray-700">
          {pet.species}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.breed}</p>
          </div>
          <span className="text-teal-600 font-bold">{formatPrice(pet.price)}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium text-slate-500">{formatAge(pet.age)} old</span>
          <button className="text-teal-600 font-semibold hover:underline">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;