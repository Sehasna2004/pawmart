import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { 
  PlusCircle, Trash2, LayoutDashboard, ArrowLeft, 
  Dog, Camera, Mail, Phone, User, CheckCircle2, PackageOpen, XCircle, Eye 
} from 'lucide-react';

const AdminPanel = ({ pets, refreshPets }) => {
  const [formData, setFormData] = useState({
    name: '', breed: '', species: 'Dog', age: '', price: '', imageUrl: '', description: ''
  });
  const [inquiries, setInquiries] = useState([]);
  const [rehomeRequests, setRehomeRequests] = useState([]); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW STATE: For the "See Details" Review Modal
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/pets/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    }
  };

  const fetchRehomeRequests = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/pending-pets');
      const data = await res.json();
      setRehomeRequests(data);
    } catch (err) {
      console.error("Error fetching rehome requests:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchRehomeRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', breed: '', species: 'Dog', age: '', price: '', imageUrl: '', description: '' });
        refreshPets();
      }
    } catch (error) {
      console.error("Failed to add pet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveRehome = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/approve/${id}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert("Pet Approved and added to Active Listings!");
        setSelectedRequest(null); // Close modal if open
        fetchRehomeRequests();
        refreshPets();
      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const handleRejectRehome = async (id) => {
    if (window.confirm("Are you sure you want to reject this rehome request?")) {
      try {
        await fetch(`http://localhost:8080/api/admin/reject/${id}`, { method: 'DELETE' });
        setSelectedRequest(null); // Close modal if open
        fetchRehomeRequests();
      } catch (err) {
        console.error("Rejection failed:", err);
      }
    }
  };

  const handleDeletePet = async (id) => {
    if (window.confirm("Are you sure you want to remove this pet?")) {
      const response = await fetch(`http://localhost:8080/api/pets/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) refreshPets();
    }
  };

  const handleDeleteInquiry = async (id) => {
    const response = await fetch(`http://localhost:8080/api/pets/inquiries/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) fetchInquiries();
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <LayoutDashboard size={20} />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Management</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">PawMart Inventory</h1>
          </div>
          <Link to="/" className="group flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Store
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: ADD FORM */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <PlusCircle size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-800">New Listing</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">General Info</label>
                  <input type="text" placeholder="Pet Name" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                
                <div className="flex gap-3">
                  <input type="text" placeholder="Breed" className="flex-1 p-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} required />
                  <select className="p-4 bg-slate-50 border-none rounded-2xl text-slate-500 font-bold outline-none"
                    value={formData.species} onChange={(e) => setFormData({...formData, species: e.target.value})}>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Rabbit</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <input type="number" step="0.1" placeholder="Age" className="flex-1 p-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} required />
                  <div className="flex-1 relative">
                    <input type="number" placeholder="Price" className="w-full p-4 pl-10 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rs.</span>
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Media & Details</label>
                   <div className="relative">
                    <input type="text" placeholder="/images/dog.jpg" className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} required />
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   </div>
                </div>
                
                <textarea placeholder="Tell us about this pet..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl h-32 outline-none transition-all font-medium resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-teal-100 hover:bg-teal-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
                >
                  {isSubmitting ? "Syncing..." : "Add new pet"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: INBOXES & INVENTORY */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* REHOME INBOX SECTION */}
            <div className="bg-slate-900 rounded-[2.5rem] shadow-xl p-8 text-white overflow-hidden relative">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <PackageOpen size={24} className="text-teal-400" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-wider">Rehome Inbox</h2>
                </div>
                <span className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full">{rehomeRequests.length} REQUESTS</span>
              </div>

              <div className="space-y-4 relative z-10">
                {rehomeRequests.map(req => (
                  <div key={req.id} className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all">
                    <div className="flex items-center gap-4">
                       <img src={req.imageUrl} alt="" className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                       <div>
                         <p className="font-black text-lg">{req.name}</p>
                         <p className="text-teal-400 font-bold text-sm uppercase tracking-tighter">{req.breed} • Age {req.age}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* SEE DETAILS BUTTON */}
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-xs flex items-center gap-2"
                      >
                        <Eye size={16} /> Details
                      </button>
                      <button 
                        onClick={() => handleApproveRehome(req.id)}
                        className="p-3 bg-teal-500 text-white rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-900/40"
                        title="Quick Approve"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                {rehomeRequests.length === 0 && (
                  <p className="text-white/20 text-center py-6 font-bold italic tracking-widest">No pending rehome requests.</p>
                )}
              </div>
            </div>

            {/* ADOPTION INBOX SECTION */}
            <div className="bg-slate-900 rounded-[2.5rem] shadow-xl p-8 text-white overflow-hidden relative border-t border-white/5">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <Mail size={24} className="text-teal-400" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-wider">Adoption Inbox</h2>
                </div>
                <span className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full">{inquiries.length} NEW</span>
              </div>

              <div className="space-y-4 relative z-10">
                {inquiries.map(iq => (
                  <div key={iq.id} className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
                         <User size={20} />
                       </div>
                       <div>
                         <p className="font-black text-lg">{iq.customerName}</p>
                         <p className="text-teal-400 font-bold text-sm flex items-center gap-2">
                           <Phone size={14} /> {iq.phoneNumber}
                         </p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-white/30 uppercase">Wants to adopt</p>
                        <p className="font-bold text-white/80">{iq.petName}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteInquiry(iq.id)}
                        className="p-3 bg-white/5 text-white/40 rounded-xl hover:bg-teal-500 hover:text-white transition-all"
                        title="Mark as Done"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="text-white/20 text-center py-10 font-bold italic tracking-widest">Your inbox is empty.</p>
                )}
              </div>
            </div>

            {/* INVENTORY TABLE */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-md">
                  <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Active Listings</h3>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full">{pets.length} ITEMS</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pet Details</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pets.map(pet => (
                      <tr key={pet.id} className="group hover:bg-teal-50/40 transition-colors duration-200">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative overflow-hidden w-16 h-16 rounded-2xl shadow-sm border-2 border-white group-hover:border-teal-200 transition-colors">
                              <img src={pet.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                            </div>
                            <div>
                              <p className="font-black text-slate-800 text-lg leading-tight">{pet.name}</p>
                              <p className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                  <Dog size={12} className="text-teal-500" /> {pet.breed}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col">
                              <span className="font-black text-teal-600 text-lg">Rs. {pet.price.toLocaleString()}</span>
                              <span className="text-[10px] font-bold text-slate-300 uppercase">LKR</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <button 
                            onClick={() => handleDeletePet(pet.id)} 
                            className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all duration-300 group/btn"
                          >
                            <Trash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- REHOME DETAIL REVIEW MODAL --- */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-white">
            <button 
                onClick={() => setSelectedRequest(null)}
                className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-2xl transition-all z-10"
            >
                <XCircle size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="h-64 md:h-full relative group">
                    <img src={selectedRequest.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {selectedRequest.species}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-10 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{selectedRequest.name}</h2>
                        <p className="text-teal-600 font-bold mb-6">Breed: {selectedRequest.breed} • Age: {selectedRequest.age}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Description</h4>
                                <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {selectedRequest.description || "No description provided."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-10">
                        <button 
                            onClick={() => handleRejectRehome(selectedRequest.id)}
                            className="flex-1 bg-rose-50 text-rose-600 py-4 rounded-2xl font-bold hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                        >
                            Reject
                        </button>
                        <button 
                            onClick={() => handleApproveRehome(selectedRequest.id)}
                            className="flex-[2] bg-teal-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 size={20} /> Approve Listing
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;