import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { login, register } from '../services/api';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        console.log('Initiating vault entry...');
        const data = await login({ email: formData.email, password: formData.password });
        
        // Critical: Ensure session is saved before redirecting
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('Vault entry granted. Redirecting...');
        
        // Brief delay to ensure storage persistence
        setTimeout(() => {
          if (data.user.role === 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/profile';
          }
        }, 100);

      } else {
        await register(formData);
        setIsLogin(true);
        alert('Vault identity created! Proceed to login.');
      }
    } catch (err: any) {
      console.error('Vault Entry Error:', err);
      setError(err.response?.data?.error || 'Access denied by the guardians. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col lg:flex-row pt-20">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Knowledge vault" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-800/40 via-stone-950 to-stone-950"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-24">
           <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center shadow-2xl mb-10">
              <Flame className="w-10 h-10 text-white" />
           </div>
           <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
             Access the <br /><span className="text-orange-500">Ancient Vault</span>
           </h2>
           <p className="text-stone-400 text-xl font-medium max-w-md leading-relaxed">
             Unlock restricted scrolls, track your intellectual progress, and govern the GranthaVeda ecosystem.
           </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-stone-900 p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-stone-800">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              {isLogin ? 'Member Login' : 'Join the Library'}
            </h3>
            <p className="text-stone-500 mb-10 font-medium text-sm italic">
              {isLogin ? 'Enter the sacred credentials.' : 'Begin your journey as a seeker.'}
            </p>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="relative group">
                  <User className="absolute left-4 top-4 w-5 h-5 text-stone-500 group-focus-within:text-orange-600 transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="Seeker Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-white"
                  />
                </div>
              )}
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-stone-500 group-focus-within:text-orange-600 transition-colors" />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-white"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-stone-500 group-focus-within:text-orange-600 transition-colors" />
                <input 
                  required
                  type="password" 
                  placeholder="Secret Key" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-950 border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-white"
                />
              </div>
              
              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-700 to-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'GRANT ACCESS'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-10 text-center">
               <button 
                 type="button"
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-white font-black uppercase tracking-widest text-[10px] hover:text-orange-600 transition"
               >
                 {isLogin ? "New to the vault? Create account" : "Already a seeker? Return here"}
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
