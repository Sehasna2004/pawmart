import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPetForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for the hidden file input
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    species: 'Dog',
    age: '',
    price: '',
    imgUrl: '', // This will store either a URL string or an object with the base64 data
    description: ''
  });

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  // --- 1. HANDLE FILE SELECTION ---
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can store the raw file if you use multi-part form data
      // OR convert to base64 for easy JSON transmission (shown below):
      
      const reader = new FileReader();
      reader.onloadend = () => {
        // We update the state to store the base64 string
        // And visually update the file input section
        setPet({ ...pet, imgUrl: reader.result });
      };
      reader.readAsDataURL(file); // This triggers the conversion
    }
  };

  // --- 2. SUBMIT FORM (Updated to send proper object) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending data to your Spring Boot backend
      // IMPORTANT: Your Backend Entity/DTO must accept this 'imgUrl' field
      // as either a String URL or base64 data.
      await axios.post("http://localhost:8080/api/pets", pet);
      
      alert("New Furry Friend Added Successfully!");
      navigate('/admin'); // Redirect back to admin dashboard
    } catch (err) {
      console.error("Failed to add pet:", err);
      alert("Error adding pet. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadButtonClick = () => {
    // Programmatically click the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-xl p-12 border border-slate-100 font-sans">
        
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Add New Pet Listing</h2>
          <p className="text-slate-400 font-semibold mt-2">Introduce a new companion to PawMart</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- GENERAL INFO SECTION --- */}
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 ml-1 uppercase tracking-widest">General Info</label>
            <input 
              type="text" 
              name="name" 
              value={pet.name}
              required
              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
              placeholder="Pet Name"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-[1fr,auto] gap-5 items-center">
            <input 
              type="text" 
              name="breed" 
              value={pet.breed}
              required
              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
              placeholder="Breed"
              onChange={handleChange}
            />
            <select 
              name="species"
              value={pet.species}
              className="p-5 pr-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3E%3Cpath fill=%27%230d9488%27 d=%27M10.293 3.293 6 7.586 1.707 3.293A1 1 0 0 0 .293 4.707l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1.25rem_center]"
              onChange={handleChange}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input 
              type="text" 
              name="age" 
              value={pet.age}
              required
              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
              placeholder="Age (e.g., 2 years)"
              onChange={handleChange}
            />
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">Rs.</span>
              <input 
                type="number" 
                name="price" 
                value={pet.price}
                required
                className="w-full p-5 pl-16 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* --- MEDIA & DETAILS SECTION --- */}
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 ml-1 uppercase tracking-widest">Media & Details</label>
            
            <div className="relative flex items-center p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus-within:border-teal-500 focus-within:bg-white transition-all">
              <span className="text-xl text-slate-400 mr-4">📷</span>
              
              {/* Display the selected filename, or the placeholder */}
              <p className={`font-bold flex-1 truncate ${pet.imgUrl ? 'text-slate-700' : 'text-slate-300'}`}>
                {pet.imgUrl && typeof pet.imgUrl === 'string' && pet.imgUrl.startsWith('data:') 
                  ? 'Image Selected From PC' 
                  : (pet.imgUrl || '/images/pet_placeholder.jpg')}
              </p>
              
              {/* HIDDEN File Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                className="sr-only" // Screen-reader only (hidden)
                onChange={handleFileChange}
              />
              
              {/* Button that triggers the PC dialog */}
              <button 
                type="button" 
                onClick={handleUploadButtonClick}
                className="bg-teal-50 text-teal-700 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-teal-100 transition-colors"
              >
                Upload PC Image
              </button>
            </div>
            {/* Simple Text option if you want to paste a URL still */}
            <input 
              type="text" 
              name="imgUrl" 
              value={typeof pet.imgUrl === 'string' && !pet.imgUrl.startsWith('data:') ? pet.imgUrl : ''}
              className="w-full mt-3 p-4 text-xs rounded-xl bg-white border border-slate-100 outline-none text-slate-400 placeholder:text-slate-300"
              placeholder="Or paste an image URL here..."
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea 
              name="description" 
              value={pet.description}
              rows="4"
              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 resize-none leading-relaxed"
              placeholder="Tell us about this pet..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* --- 3. MODIFIED BUTTON NAME --- */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-[1.5rem] text-white font-black text-xl transition-all shadow-xl active:scale-95 ${
              loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#009485] hover:bg-teal-700 shadow-teal-100'
            }`}
          >
            {loading ? 'Adding...' : '🚀 Add New Pet'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;