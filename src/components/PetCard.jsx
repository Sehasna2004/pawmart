const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer">
      <div className="relative">
        <img src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'} alt={pet.name} className="w-full h-48 object-cover" />
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
          <span className="text-teal-600 font-bold">${pet.price}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>{pet.age} yrs • {pet.location}</span>
          <button className="text-teal-600 font-semibold hover:underline">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;