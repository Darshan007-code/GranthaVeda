import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Grantha<span className="text-orange-600">Veda</span></h3>
            <p className="text-stone-500 font-medium leading-relaxed">
              The ultimate digital sanctuary for seekers of eternal knowledge. Explore millions of scrolls and scripts from across the human timeline.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4 text-stone-500 font-bold uppercase text-[10px] tracking-widest">
              <li><Link to="/" className="hover:text-orange-600 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-600 transition">About Us</Link></li>
              <li><Link to="/categories" className="hover:text-orange-600 transition">Categories</Link></li>
              <li><Link to="/contact" className="hover:text-orange-600 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-8">Legal Sanctum</h4>
            <ul className="space-y-4 text-stone-500 font-bold uppercase text-[10px] tracking-widest">
              <li><Link to="/legal" className="hover:text-orange-600 transition">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-orange-600 transition">Terms of Service</Link></li>
              <li><Link to="/legal" className="hover:text-orange-600 transition">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-8">Connect</h4>
            <div className="flex space-x-4 mb-10">
              <a href="#" className="p-3 bg-stone-900 rounded-xl text-stone-400 hover:text-orange-600 transition border border-stone-800">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/Darshan007-code" target="_blank" rel="noreferrer" className="p-3 bg-stone-900 rounded-xl text-stone-400 hover:text-orange-600 transition border border-stone-800">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-stone-900 rounded-xl text-stone-400 hover:text-orange-600 transition border border-stone-800">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seeker Email..." 
                className="bg-stone-900 border border-stone-800 rounded-l-xl px-4 py-3 w-full outline-none focus:ring-1 focus:ring-orange-600 text-white text-xs font-bold"
              />
              <button className="bg-orange-600 text-white px-4 py-3 rounded-r-xl hover:bg-orange-700 transition shadow-lg">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-900 text-center text-stone-600 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} GranthaVeda. All rights reserved. <br className="md:hidden" />
          <span className="mx-4 hidden md:inline">|</span> 
          Developed by <a href="https://github.com/Darshan007-code" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-500 transition-colors">Darshan Patil</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
