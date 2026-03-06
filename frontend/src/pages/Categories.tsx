import React from 'react';
import { motion } from 'framer-motion';
import { Filter, ArrowRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  
  const allCategories = [
    { name: 'Philosophy', icon: '🕉️', count: '12,400+ Books', desc: 'Ancient wisdom and modern thought.' },
    { name: 'History', icon: '🏛️', count: '8,200+ Books', desc: 'The chronicles of human civilization.' },
    { name: 'Science', icon: '🔭', count: '15,000+ Books', desc: 'Exploring the laws of the universe.' },
    { name: 'Fiction', icon: '📖', count: '25,000+ Books', desc: 'Stories that transcend reality.' },
    { name: 'Health', icon: '🌿', count: '5,600+ Books', desc: 'Ayurveda, wellness, and medical science.' },
    { name: 'Coding', icon: '💻', count: '10,000+ Books', desc: 'The language of the modern world.' },
    { name: 'Arts', icon: '🎨', count: '4,500+ Books', desc: 'Classical and contemporary masterpieces.' },
    { name: 'Business', icon: '📈', count: '7,800+ Books', desc: 'Economics, strategy, and leadership.' },
    { name: 'Poetry', icon: '✍️', count: '3,200+ Books', desc: 'The rhythm of the human soul.' },
    { name: 'Mystery', icon: '🔍', count: '9,100+ Books', desc: 'Enigmas waiting to be unraveled.' },
    { name: 'Biography', icon: '👤', count: '6,400+ Books', desc: 'Lives that changed the course of history.' },
    { name: 'Religion', icon: '🕍', count: '11,000+ Books', desc: 'Sacred texts and spiritual journeys.' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-orange-600/10 rounded-3xl flex items-center justify-center text-orange-600 mb-6"
          >
            <Filter className="w-10 h-10" />
          </motion.div>
          <h1 className="text-6xl font-black text-stone-900 dark:text-white tracking-tighter uppercase mb-4">
            Spheres of <span className="text-orange-600">Wisdom</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl font-medium text-lg">
            Navigate through our curated collections of eternal knowledge. Every genre is a gateway to a new dimension of understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/?search=subject:${cat.name.toLowerCase()}`)}
              className="group bg-white dark:bg-stone-900 p-10 rounded-[3rem] shadow-xl hover:shadow-orange-500/10 border border-stone-100 dark:border-stone-800 cursor-pointer transition-all flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">{cat.icon}</div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2 uppercase tracking-tight">{cat.name}</h3>
              <span className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">{cat.count}</span>
              <p className="text-stone-500 dark:text-stone-400 mb-8 font-medium">{cat.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-stone-900 dark:text-white font-black text-xs uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                Explore Genre <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-32 p-16 rounded-[4rem] bg-stone-900 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-stone-950 opacity-90"></div>
           <div className="relative z-10">
              <Flame className="w-16 h-16 text-orange-500 mx-auto mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Can't find what you seek?</h2>
              <p className="text-stone-300 mb-10 max-w-xl mx-auto font-medium">Our library expands daily with scrolls and scripts from across the globe. Use our advanced search for specific requests.</p>
              <button onClick={() => navigate('/')} className="bg-white text-stone-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition shadow-2xl">Return to Library</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
