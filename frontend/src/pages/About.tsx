import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Globe, Users, Flame, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Books Archived', value: '2M+', icon: <BookOpen /> },
    { label: 'Active Seekers', value: '500K+', icon: <Users /> },
    { label: 'Global Languages', value: '120+', icon: <Globe /> },
    { label: 'Years of Wisdom', value: '5000+', icon: <Sparkles /> }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          <div className="lg:w-1/2">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="relative"
             >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl"></div>
                <h1 className="text-7xl font-black text-stone-900 dark:text-white uppercase tracking-tighter leading-[0.85] mb-10">
                  Preserving the <br /><span className="text-orange-600">Soul of Wisdom</span>
                </h1>
                <p className="text-xl text-stone-500 dark:text-stone-400 font-medium leading-relaxed mb-10">
                  GranthaVeda was born from a simple yet profound vision: to ensure that the vast ocean of human knowledge—from ancient Sanskrit scrolls to modern scientific breakthroughs—is accessible to every seeker on Earth.
                </p>
                <div className="flex gap-4">
                   <div className="flex flex-col border-l-4 border-orange-600 pl-6">
                      <span className="text-stone-900 dark:text-white font-black text-2xl">Veda</span>
                      <span className="text-stone-400 font-bold uppercase tracking-widest text-xs">Knowledge</span>
                   </div>
                   <div className="flex flex-col border-l-4 border-orange-600 pl-6">
                      <span className="text-stone-900 dark:text-white font-black text-2xl">Grantha</span>
                      <span className="text-stone-400 font-bold uppercase tracking-widest text-xs">Book</span>
                   </div>
                </div>
             </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-stone-900"
             >
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-[500px] object-cover" 
                  alt="Classic Library"
                />
             </motion.div>
             <div className="absolute -bottom-10 -right-10 bg-orange-600 text-white p-10 rounded-[3rem] shadow-2xl hidden md:block">
                <Flame className="w-12 h-12 mb-4" />
                <span className="text-2xl font-black uppercase tracking-tighter">Eternal <br />Light</span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
           {stats.map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white dark:bg-stone-900 p-10 rounded-[3rem] text-center shadow-xl border border-stone-100 dark:border-stone-800"
             >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 mx-auto mb-6 flex items-center justify-center rounded-2xl">
                   {stat.icon}
                </div>
                <div className="text-4xl font-black text-stone-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
             </motion.div>
           ))}
        </div>

        {/* Values Section */}
        <div className="bg-stone-900 rounded-[5rem] p-16 lg:p-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8">Our Core <span className="text-orange-600">Values</span></h2>
                 <p className="text-stone-400 text-xl font-medium leading-relaxed">We believe knowledge is the only wealth that increases when shared. Our platform is built on three pillars of Sanskriti.</p>
              </div>
              <div className="space-y-12">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                       <Shield className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-white uppercase mb-2">Authenticity</h4>
                       <p className="text-stone-500 font-medium">Verifying and preserving the original essence of every manuscript and book.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                       <Globe className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-white uppercase mb-2">Inclusivity</h4>
                       <p className="text-stone-500 font-medium">Breaking barriers of language, geography, and cost to spread wisdom.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
