import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react'; // Updated to Heart icon as per new design

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('adopt'); // State for radio buttons
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending the new fields (fullName and userType) to your backend
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        fullName: fullName,
        username: email, // Using email as the username/identifier
        password: password,
        role: userType // Sends 'adopt' or 'rehome'
      });

      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully! Welcome to the community.");
        navigate('/login');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.response?.data || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl p-10 border border-slate-50 relative">
        
        {/* Top Heart Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#eef7f6] p-4 rounded-full">
            <Heart className="text-[#2eb0a1] fill-[#2eb0a1]" size={32} />
          </div>
        </div>

        <header className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Create an Account</h2>
          <p className="text-slate-400 font-bold mt-1 text-sm">Join the PawMart community</p>
        </header>

        <form onSubmit={handleSignup} className="space-y-4 text-left">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Jane Doe"
              required
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-[#2eb0a1] outline-none transition-all font-medium text-slate-700"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              required
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-[#2eb0a1] outline-none transition-all font-medium text-slate-700"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-[#2eb0a1] outline-none transition-all font-medium text-slate-700"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* User Type Selection (Radio Buttons) */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">I want to...</label>
            <div className="grid grid-cols-2 gap-4">
              {/* Adopt Option */}
              <label className={`flex items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${userType === 'adopt' ? 'border-[#2eb0a1] bg-[#f0f9f8]' : 'border-slate-100'}`}>
                <input 
                  type="radio" 
                  name="userType" 
                  className="accent-[#2eb0a1]"
                  checked={userType === 'adopt'}
                  onChange={() => setUserType('adopt')}
                />
                <span className={`text-sm font-bold ${userType === 'adopt' ? 'text-[#2eb0a1]' : 'text-slate-500'}`}>Adopt & Shop</span>
              </label>

              {/* Rehome Option (Renamed from Sell & Host) */}
              <label className={`flex items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${userType === 'rehome' ? 'border-[#2eb0a1] bg-[#f0f9f8]' : 'border-slate-100'}`}>
                <input 
                  type="radio" 
                  name="userType" 
                  className="accent-[#2eb0a1]"
                  checked={userType === 'rehome'}
                  onChange={() => setUserType('rehome')}
                />
                <span className={`text-sm font-bold ${userType === 'rehome' ? 'text-[#2eb0a1]' : 'text-slate-500'}`}>Rehome</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 rounded-2xl bg-[#2eb0a1] hover:bg-teal-700 text-white font-black text-lg transition-all shadow-lg active:scale-95 disabled:bg-slate-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-slate-400 font-bold text-sm">
            Already have an account? <Link to="/login" className="text-[#2eb0a1] hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;