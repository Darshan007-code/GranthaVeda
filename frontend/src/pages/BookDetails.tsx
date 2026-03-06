import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen, ChevronLeft, Share2, Heart, Loader2 } from 'lucide-react';
import { getBookDetails } from '../services/api';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        setLoading(true);
        const data = await getBookDetails(id);
        setBook(data);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)]">
        <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Scripture Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
        >
          Return to Library
        </button>
      </div>
    );
  }

  // Use properties directly from the unified book object
  const { title, authors, description, thumbnail, rating, category, readLink } = book;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-20 pt-32">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-orange-600 transition mb-12 group font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Vault
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Book Cover */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-stone-900">
                <img 
                  src={thumbnail.replace('zoom=1', 'zoom=3')} 
                  alt={title} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="mt-10 flex gap-4">
                <a 
                  href={readLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-700 transition shadow-xl flex items-center justify-center gap-3"
                >
                  <BookOpen className="w-4 h-4" /> READ NOW
                </a>
                <button className="p-5 bg-white dark:bg-stone-900 text-stone-400 hover:text-rose-500 rounded-2xl shadow-xl border border-slate-100 dark:border-stone-800 transition">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Book Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="bg-white dark:bg-stone-900 rounded-[4rem] p-10 md:p-16 shadow-2xl border border-slate-50 dark:border-stone-800">
              <span className="inline-block px-6 py-2 bg-orange-50 dark:bg-orange-950/30 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                {category}
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-6 tracking-tighter leading-tight uppercase">
                {title}
              </h1>
              
              <p className="text-2xl text-stone-500 font-bold mb-12 italic">
                by {authors.join(', ')}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-10 border-y border-slate-100 dark:border-stone-800">
                <div className="text-center">
                  <div className="flex justify-center text-orange-500 mb-2">
                    <Star className="w-8 h-8 fill-current" />
                  </div>
                  <span className="block text-2xl font-black dark:text-white">{rating}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Rating</span>
                </div>
                <div className="text-center">
                  <div className="flex justify-center text-orange-500 mb-2">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="block text-2xl font-black dark:text-white">Ancient</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Status</span>
                </div>
                <div className="text-center">
                  <div className="flex justify-center text-orange-500 mb-2">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <span className="block text-2xl font-black dark:text-white">Global</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Reach</span>
                </div>
                <div className="text-center">
                  <div className="flex justify-center text-orange-500 mb-2">
                    <Clock className="w-8 h-8" />
                  </div>
                  <span className="block text-2xl font-black dark:text-white">Eternal</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Era</span>
                </div>
              </div>

              <div className="prose prose-orange dark:prose-invert max-w-none">
                <h3 className="text-3xl font-black mb-8 text-[var(--text-primary)] uppercase tracking-tighter">Summary</h3>
                <div 
                  className="text-stone-500 dark:text-stone-400 text-xl leading-relaxed space-y-6 font-medium"
                  dangerouslySetInnerHTML={{ __html: description || 'The essence of this scripture is being unrolled. Check back soon for the full revelation.' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
