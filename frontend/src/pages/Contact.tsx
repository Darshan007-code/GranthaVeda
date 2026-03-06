import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-orange-600/10 rounded-3xl flex items-center justify-center text-orange-600 mb-6"
          >
            <MessageSquare className="w-10 h-10" />
          </motion.div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-4">Connect with <span className="text-orange-600">Us</span></h1>
          <p className="text-stone-400 max-w-xl font-medium text-lg">Have a question about a scroll? Or perhaps a suggestion for the library? Reach out to the guardians of GranthaVeda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-stone-900 p-10 rounded-[3rem] border border-stone-800 shadow-2xl">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-10">Vault Headquarters</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-1">Email the Library</h4>
                    <p className="text-white font-bold text-lg">seekers@granthaveda.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-1">Call the Vault</h4>
                    <p className="text-white font-bold text-lg">+91 800 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-1">Physical Sanctum</h4>
                    <p className="text-white font-bold text-lg">Knowledge Square, Bangalore, <br />Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form className="bg-white p-12 rounded-[4rem] shadow-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Seeker Name</label>
                  <input type="text" placeholder="Darshan Patil" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-stone-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Email Address</label>
                  <input type="email" placeholder="darshan@example.com" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-stone-900" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Your Message</label>
                <textarea rows={5} placeholder="What knowledge do you seek?" className="w-full px-6 py-4 rounded-3xl bg-stone-50 border-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-stone-900 resize-none"></textarea>
              </div>
              <button className="w-full bg-stone-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
