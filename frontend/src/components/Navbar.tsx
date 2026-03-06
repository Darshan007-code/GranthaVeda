import React, { useState, useEffect } from 'react';
import { Flame, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Safety check for user session
    const rawUser = localStorage.getItem('user');
    if (rawUser && rawUser !== 'undefined' && rawUser !== 'null') {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch (e) {
        console.error('Invalid user session');
        localStorage.removeItem('user');
      }
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-stone-900/95 shadow-xl py-4 border-stone-800 backdrop-blur-xl' 
        : 'bg-transparent py-8 border-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
             <div className="absolute inset-0 bg-orange-600 blur-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-3 rounded-[1.2rem] shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                <Flame className="w-7 h-7 text-white fill-amber-200/20" />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase">
              GRANTHA<span className="text-orange-600">VEDA</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8 font-black text-xs uppercase tracking-[0.2em] transition-colors text-slate-200">
            <Link to="/" className="hover:text-orange-600 transition">Library</Link>
            <Link to="/categories" className="hover:text-orange-600 transition">Genres</Link>
            {currentUser?.role === 'admin' && (
              <Link to="/admin" className="text-orange-500 flex items-center gap-2 hover:brightness-125 transition">
                <LayoutDashboard className="w-4 h-4" /> Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center gap-5 pl-8 border-l border-stone-800">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile"
                  className="flex items-center gap-3 p-2 pr-6 rounded-2xl bg-stone-800 border border-stone-700 hover:border-orange-600 transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">
                    {currentUser.name[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{currentUser.name.split(' ')[0]}</span>
                    <span className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">Seeker Profile</span>
                  </div>
                </Link>
                <button onClick={handleLogout} className="p-3 text-stone-500 hover:text-red-500 transition-colors bg-stone-800 rounded-xl border border-stone-700">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition shadow-2xl active:scale-95"
              >
                Member Access
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
