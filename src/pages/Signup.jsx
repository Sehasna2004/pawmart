import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { User, Mail, Lock, Phone, MapPin, ArrowLeft } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        contactNumber: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [pwdStrength, setPwdStrength] = useState({ message: '', color: '' });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // NEW: Get the 'adopt' action

    // Keep your checkPasswordStrength exactly as is
    const checkPasswordStrength = (password) => {
        if (!password) return { message: '', color: '' };
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (strongRegex.test(password)) {
            return { message: 'Strong password', color: 'text-green-500' };
        } else {
            return { message: 'Use a strong password (Mixed case, numbers, symbols)', color: 'text-red-500' };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contactNumber' && value.length > 11) return;
        setFormData({ ...formData, [name]: value });
        if (name === 'password') setPwdStrength(checkPasswordStrength(value));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // 1. Password Strength
        if (pwdStrength.color === 'text-red-500' || !formData.password) {
            alert("Please use a stronger password before submitting!");
            return;
        }

        // 2. Sri Lankan Contact Number Validation
        const phoneRegex = /^94\d{9}$/;
        if (!phoneRegex.test(formData.contactNumber)) {
            alert("Invalid Number! Must start with 94 and be 11 digits total.");
            return;
        }

        // 3. Email Validation
        if (!formData.email.includes('@')) {
            alert("Invalid Email! Must contain the '@' symbol.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                ...formData,
                role: 'USER'
            });

            if (response.status === 200) {
                alert("Account created successfully!");
                
                // NEW: Handle redirection based on origin
                const action = searchParams.get('action');
                if (action === 'adopt') {
                    // Logic: Normally we'd log them in here, but to keep your logic safe,
                    // we redirect to Login and pass the action so Login can pass it back.
                    // Or, for the smoothest experience, redirect to home with the flag:
                    navigate('/login?action=adopt'); 
                } else {
                    navigate('/login'); 
                }
            }
        } catch (error) {
            alert(error.response?.data || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f7f6] p-6 font-sans">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-50 relative">
                <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-teal-600 transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-block bg-teal-500 p-3 rounded-2xl mb-4 shadow-lg shadow-teal-100">
                        <span className="text-white text-2xl">❤️</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Join PawMart</h2>
                    <p className="text-slate-400 font-bold mt-2">Start your journey today</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input name="username" type="text" placeholder="Username" required className="w-full p-3 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700" onChange={handleChange} />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input name="password" type="password" placeholder="Password" required className="w-full p-3 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700" onChange={handleChange} />
                        {pwdStrength.message && <p className={`text-xs font-bold mt-1 ml-4 ${pwdStrength.color}`}>{pwdStrength.message}</p>}
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input name="email" type="email" placeholder="Email" required className="w-full p-3 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700" onChange={handleChange} />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input name="contactNumber" type="text" placeholder="Contact (94XXXXXXXXX)" required className="w-full p-3 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700" value={formData.contactNumber} onChange={handleChange} />
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input name="address" type="text" placeholder="Home Address" required className="w-full p-3 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700" onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#009485] hover:bg-teal-700 text-white p-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-100 disabled:bg-slate-300">
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;