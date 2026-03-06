import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Clock, CheckCircle, Flame, Shield, Trash2, LayoutDashboard, Settings } from 'lucide-react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Bulletproof session check
      const rawUser = localStorage.getItem('user');
      if (!rawUser || rawUser === 'undefined' || rawUser === 'null') {
        window.location.href = '/login';
        return;
      }

      try {
        const storedUser = JSON.parse(rawUser);
        const res = await axios.get(`http://localhost:5000/api/users/profile/${storedUser.id || storedUser._id}`);
        setUser(res.data);
      } catch (e) {
        console.error('Session validation failed');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center">
      <Flame className="w-16 h-16 text-orange-600 animate-spin mb-4" />
      <p className="text-stone-500 font-black uppercase tracking-[0.4em] text-xs">Authenticating Seeker...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        
        {/* Top Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-900 rounded-[4rem] p-12 border border-stone-800 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
             <User className="w-64 h-64 rotate-12" />
          </div>

          <div className="flex items-center gap-8 relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-600 to-orange-400 rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-2xl border-4 border-stone-900">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-black uppercase tracking-tighter">{user.name}</h1>
                <span className="bg-orange-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">{user.role}</span>
              </div>
              <p className="text-stone-500 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
             {user.role === 'admin' && (
               <button onClick={() => window.location.href = '/admin'} className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 hover:text-white transition-all">
                 Overlord Panel
               </button>
             )}
             <button onClick={handleLogout} className="bg-stone-800 text-stone-400 hover:text-red-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-stone-700">
               Logout
             </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Statistics */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-stone-900 p-10 rounded-[3rem] border border-stone-800">
                <h3 className="text-sm font-black uppercase tracking-widest text-stone-500 mb-8">Vault Statistics</h3>
                <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Knowledge XP</span>
                      <span className="text-orange-500 font-black text-xl">{(user.readingList?.length || 0) * 120} XP</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Scrolls Accessed</span>
                      <span className="text-white font-black text-xl">{user.readingList?.length || 0}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Sanctum Member Since</span>
                      <span className="text-white font-bold text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
             </div>

             <div className="bg-orange-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-orange-600/20">
                <Flame className="w-10 h-10 mb-6" />
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">The Path of <br />Enlightenment</h4>
                <p className="text-orange-100 text-sm font-medium leading-relaxed mb-8">Complete more scrolls to unlock restricted sections of the ancient library.</p>
                <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Share Wisdom</button>
             </div>
          </div>

          {/* Reading Tracker */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-black uppercase tracking-tighter">Your <span className="text-orange-600">Reading Tracker</span></h2>
               <button className="text-orange-500 font-black uppercase tracking-widest text-[10px] hover:underline flex items-center gap-2"><Settings className="w-4 h-4" /> Tracker Settings</button>
            </div>

            <div className="space-y-6">
              {user.readingList && user.readingList.length > 0 ? (
                user.readingList.map((item: any) => (
                  <motion.div 
                    key={item.bookId}
                    whileHover={{ x: 10 }}
                    className="bg-stone-900 p-8 rounded-[2.5rem] border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-stone-950 rounded-2xl flex items-center justify-center text-orange-600 border border-stone-800">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-1">{item.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          item.status === 'Finished' ? 'bg-emerald-500/10 text-emerald-500' : 
                          item.status === 'Reading' ? 'bg-blue-500/10 text-blue-500' : 'bg-stone-800 text-stone-500'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 flex-1 md:max-w-xs">
                      <div className="flex-1 bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                        <div className="bg-orange-600 h-full shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-black text-orange-500 w-10">{item.progress}%</span>
                      <button className="text-stone-700 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-24 bg-stone-900 rounded-[4rem] border-2 border-dashed border-stone-800">
                  <div className="w-20 h-20 bg-stone-950 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-800">
                    <BookOpen className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-stone-700">No Knowledge Tracked</h3>
                  <p className="text-stone-500 font-medium">Add books from the library to start your tracking journey.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
