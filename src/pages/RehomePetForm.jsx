import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, CheckCircle } from 'lucide-react';

const RehomePetForm = () => {
  const [formData, setFormData] = useState({
    petName: '', 
    breed: '', 
    age: '', 
    gender: 'Male', 
    description: '', 
    image: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. First alert for Admin Approval
    alert("Directed for admin approval");
    
    // 2. Transition to the Summary View
    setIsSubmitted(true);
    
    // 3. Second alert shown after the UI updates to the "Thank You" screen
    setTimeout(() => {
        alert("Thank you for choosing us, we will reply to you soon");
    }, 500);
  };

  // --- SUMMARY VIEW (Shows after clicking OK on first alert) ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f8fbfa] flex items-center justify-center p-6 font-sans">
        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-xl p-10 border border-slate-50 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-50 p-4 rounded-full">
              <CheckCircle className="text-[#2eb0a1]" size={48} />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 mb-2">Thank you for choosing us!</h2>
          <p className="text-[#2eb0a1] font-bold mb-8 text-lg">We will reply to you soon.</p>
          
          {/* NICE SUMMARY CARD */}
          <div className="bg-slate-50 rounded-3xl p-8 text-left border border-slate-100 shadow-inner">
            <h3 className="text-slate-400 uppercase tracking-widest text-[10px] font-black mb-6 border-b border-slate-200 pb-2">
              Submitted Pet Profile
            </h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-10">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pet Name</p>
                <p className="text-slate-800 font-black text-xl">{formData.petName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Breed</p>
                <p className="text-slate-800 font-black text-xl">{formData.breed}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Age / Gender</p>
                <p className="text-slate-800 font-black text-lg">{formData.age} Years • {formData.gender}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Description</p>
                <p className="text-slate-700 font-medium leading-relaxed italic mt-1 bg-white p-4 rounded-xl border border-slate-100">
                  "{formData.description}"
                </p>
              </div>
              {formData.image && (
                <div className="col-span-2">
                   <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Attached Image</p>
                   <p className="text-xs text-teal-600 font-bold">📎 {formData.image.name}</p>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-10 bg-[#2eb0a1] text-white px-12 py-4 rounded-2xl font-black hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="min-h-screen bg-[#f8fbfa] flex items-center justify-center p-6 font-sans py-12">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-xl p-10 border border-slate-50 relative">
        <header className="mb-10 text-center">
          <div className="inline-block bg-[#eef7f6] p-3 rounded-2xl mb-4">
            <Heart className="text-[#2eb0a1] fill-[#2eb0a1]" size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Rehome Your Pet</h2>
          <p className="text-slate-400 font-bold mt-1 text-sm">Fill in the details for admin review</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Pet Name</label>
              <input name="petName" type="text" placeholder="e.g. Buddy" required className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#2eb0a1] outline-none font-medium transition-all" onChange={handleInputChange} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Breed</label>
              <input name="breed" type="text" placeholder="e.g. Persian" required className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#2eb0a1] outline-none font-medium transition-all" onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Age (Years)</label>
              <input name="age" type="number" placeholder="2" required className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#2eb0a1] outline-none font-medium transition-all" onChange={handleInputChange} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gender</label>
              <select name="gender" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#2eb0a1] outline-none font-bold text-slate-700 cursor-pointer" onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Description</label>
            <textarea name="description" rows="3" placeholder="Friendly, vaccinated, and loves playing..." required className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#2eb0a1] outline-none font-medium transition-all" onChange={handleInputChange}></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Pet Image</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-teal-400 transition-colors group cursor-pointer">
              <input type="file" accept="image/*" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
              <Camera className="mx-auto text-slate-300 group-hover:text-[#2eb0a1] mb-2" size={32} />
              <p className="text-slate-400 font-bold text-sm">
                {formData.image ? formData.image.name : "Click to upload pet photo"}
              </p>
            </div>
          </div>

          <button type="submit" className="w-full py-5 rounded-2xl bg-[#2eb0a1] hover:bg-teal-700 text-white font-black text-lg transition-all shadow-xl shadow-teal-50 active:scale-95">
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default RehomePetForm;