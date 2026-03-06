import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Activity, Trash2, Search, Flame, LogOut } from 'lucide-react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      window.location.href = '/login';
      return;
    }
    setAdmin(user);

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/admin/users');
        setUsers(res.data);
      } catch (e) {
        console.error('Admin fetch failed');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-orange-600">
      <Flame className="w-16 h-16 animate-spin mb-4" />
      <p className="font-black uppercase tracking-[0.4em] text-sm">Accessing Governance Vault...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-orange-500 mb-4">
               <Shield className="w-6 h-6" />
               <span className="font-black uppercase tracking-[0.3em] text-[10px]">Overlord Authorization Active</span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">Vault <span className="text-orange-600">Overlord</span></h1>
            <p className="text-stone-500 font-medium mt-2 text-xl italic">Managing {users.length} Seekers within the GranthaVeda ecosystem.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={handleLogout} className="bg-stone-900 p-4 rounded-2xl border border-stone-800 text-stone-500 hover:text-red-500 transition-colors">
                <LogOut className="w-6 h-6" />
             </button>
             <div className="bg-stone-900 px-8 py-4 rounded-2xl border border-stone-800 text-center">
                <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1">Ecosystem Status</p>
                <p className="text-2xl font-black text-emerald-500 flex items-center gap-2"><Activity className="w-5 h-5 animate-pulse" /> Live</p>
             </div>
          </div>
        </div>

        <div className="bg-stone-900 rounded-[4rem] border border-stone-800 overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-stone-900/50 backdrop-blur-md">
             <h3 className="text-2xl font-black uppercase tracking-tighter">Seeker Registry</h3>
             <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-600" />
                <input type="text" placeholder="Search seekers..." className="bg-stone-950 border-none rounded-2xl pl-12 pr-6 py-3.5 w-full md:w-80 text-sm focus:ring-2 focus:ring-orange-600 transition-all font-bold text-white" />
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-stone-950/50">
                  <th className="p-8 text-[10px] font-black text-stone-500 uppercase tracking-widest">Seeker Name</th>
                  <th className="p-8 text-[10px] font-black text-stone-500 uppercase tracking-widest">Digital Address</th>
                  <th className="p-8 text-[10px] font-black text-stone-500 uppercase tracking-widest">Authority</th>
                  <th className="p-8 text-[10px] font-black text-stone-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center font-black text-orange-500 border border-orange-500/20">{u.name[0].toUpperCase()}</div>
                        <span className="font-bold text-lg">{u.name} {u._id === admin.id && <span className="text-[10px] text-stone-500 ml-2">(YOU)</span>}</span>
                      </div>
                    </td>
                    <td className="p-8 text-stone-400 font-medium">{u.email}</td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-orange-600 text-white' : 'bg-stone-800 text-stone-500'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <button className="p-3 text-stone-600 hover:text-red-500 transition-colors bg-stone-950 rounded-xl border border-stone-800">
                        <Trash2 className="w-5 h-5" />
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
  );
};

export default AdminDashboard;
