import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowLeft } from 'lucide-react'; // For clean icons

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Hits your AuthController login endpoint
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username, 
                password
            });

            if (response.status === 200) {
                // IMPORTANT: The backend should return user data including their role
                const userData = response.data; 
                
                // Save general login status
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);

                // DYNAMIC ROLE CHECK: 
                // If the user has an 'ADMIN' role, give them admin access
                if (userData.role === 'ADMIN') {
                    localStorage.setItem('isAdmin', 'true');
                    alert("Welcome back, Admin!");
                    navigate('/admin'); // Redirect to Admin Panel
                } else {
                    // Regular user login
                    localStorage.setItem('isAdmin', 'false');
                    alert(`Welcome back, ${username}!`);
                    navigate('/'); // Redirect to Home/Gallery
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data || "Wrong credentials, try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f7f6] p-6 font-sans">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-50 relative">
                
                {/* Back to Home */}
                <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-teal-600 transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                <div className="text-center mb-10">
                    <div className="inline-block bg-teal-500 p-3 rounded-2xl mb-4 shadow-lg shadow-teal-100">
                        <span className="text-white text-2xl">🐾</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 font-bold mt-2">Log in to your PawMart account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Username Field */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            required
                            className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required
                            className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#009485] hover:bg-teal-700 text-white p-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-100 disabled:bg-slate-300"
                    >
                        {loading ? "Checking..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-2">
                    <p className="text-slate-400 font-bold text-sm">
                        Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;