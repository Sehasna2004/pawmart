import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'Food',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending data to your Spring Boot backend
      await axios.post("http://localhost:8080/api/products", product);
      alert("Product added successfully!");
      navigate('/store'); // Redirect back to store to see the new product
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Error adding product. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Add New Product</h2>
          <p className="text-slate-400 font-semibold mt-2">Expand the PawMart inventory</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Product Name</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold"
              placeholder="e.g. Premium Dog Food"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Price (LKR)</label>
              <input 
                type="number" 
                name="price" 
                required
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold"
                placeholder="2500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Category</label>
              <select 
                name="category"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold appearance-none"
                onChange={handleChange}
              >
                <option value="Food">Food</option>
                <option value="Toys">Toys</option>
                <option value="Medicine">Medicine</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Image URL</label>
            <input 
              type="text" 
              name="imageUrl" 
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold"
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Description</label>
            <textarea 
              name="description" 
              rows="3"
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold resize-none"
              placeholder="Details about the product..."
              onChange={handleChange}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl text-white font-black text-lg transition-all shadow-lg ${
              loading ? 'bg-slate-300' : 'bg-[#2eb0a1] hover:bg-teal-700 shadow-teal-100'
            }`}
          >
            {loading ? 'Adding...' : '🚀 Add to Store'}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/admin')}
            className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors py-2"
          >
            Cancel and Return
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;