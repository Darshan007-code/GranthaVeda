import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Loader2, Filter, Bookmark, Flame } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { getTrendingBooks, searchBooks } from '../services/api';
import BookCard from '../components/BookCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { name: 'Philosophy', icon: '🕉️' },
    { name: 'History', icon: '🏛️' },
    { name: 'Science', icon: '🔭' },
    { name: 'Fiction', icon: '📖' },
    { name: 'Health', icon: '🌿' },
    { name: 'Coding', icon: '💻' }
  ];

  // Initial fetch for trending and handling URL search params
  useEffect(() => {
    const init = async () => {
      // Fetch trending books
      const trending = await getTrendingBooks();
      setTrendingBooks(trending);

      // Check if there is a search query in the URL
      const query = searchParams.get('search');
      if (query) {
        setSearchTerm(query);
        setIsSearching(true);
        performSearch(query);
      }
    };
    init();
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setIsSearching(true);
    const results = await searchBooks(query);
    setSearchResults(results);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm });
      performSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setSearchResults([]);
    setSearchParams({});
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Sanskriti Hero Section */}
      <section className="relative h-[850px] flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Ancient Library" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-orange-950/20"></div>
          <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-orange-600/10 blur-[180px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-[10%] w-[600px] h-[600px] bg-amber-600/10 blur-[200px] rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-orange-600/10 backdrop-blur-md border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
          >
            <Flame className="w-4 h-4 text-orange-500" /> Igniting the Lamp of Wisdom
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-[0.85]"
          >
            GRANTHA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500">VEDA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-stone-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide"
          >
            The ultimate sanctuary for seekers of knowledge. Discover the treasure of books curated for the enlightened mind.
          </motion.p>

          <motion.form 
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-white dark:bg-stone-900 rounded-3xl md:rounded-[2.5rem] p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/10"
          >
            <div className="flex-1 flex items-center px-10 w-full">
              <Search className="text-orange-600 mr-4 w-7 h-7" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find a Scripture, Title or Author..." 
                className="w-full py-7 outline-none text-stone-900 dark:text-white bg-transparent text-2xl font-black placeholder:text-stone-300 dark:placeholder:text-stone-700"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-gradient-to-br from-orange-700 to-orange-500 text-white px-16 py-7 rounded-2xl md:rounded-[2rem] font-black hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'SEARCH LIBRARY'} 
            </button>
          </motion.form>
        </div>
      </section>

      {/* Content Area */}
      <div className="bg-[var(--bg-page)] transition-colors duration-500">
        <div className="container mx-auto px-4 py-32">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.section key="search-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-20 bg-orange-600 rounded-full"></div>
                    <div>
                      <h2 className="text-6xl font-black text-[var(--text-primary)] tracking-tighter uppercase leading-none">
                        COLLECTION <br /><span className="text-orange-600">FOUND</span>
                      </h2>
                    </div>
                  </div>
                  <button onClick={clearSearch} className="px-10 py-5 rounded-[1.5rem] border-2 border-[var(--border-subtle)] text-[var(--text-secondary)] font-black hover:bg-white dark:hover:bg-stone-900 transition tracking-[0.2em] text-xs shadow-sm">
                    NEW SEARCH
                  </button>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-40">
                    <Loader2 className="w-24 h-24 text-orange-600 animate-spin mb-8" />
                    <p className="text-[var(--text-secondary)] font-black uppercase tracking-[0.4em] text-sm">Unrolling the Scrolls...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
                      {searchResults.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                    {searchResults.length === 0 && (
                      <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-stone-800">
                         <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                         <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">No Knowledge Found</h3>
                         <p className="text-slate-500 font-medium">The vault is empty for this specific request. Try a broader term.</p>
                      </div>
                    )}
                  </>
                )}
              </motion.section>
            ) : (
              <motion.div key="landing-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Cultural Categories */}
                <section className="mb-48">
                  <div className="flex items-center gap-6 mb-20">
                     <div className="w-16 h-16 bg-orange-600/10 rounded-[1.5rem] flex items-center justify-center text-orange-600">
                        <Filter className="w-8 h-8" />
                     </div>
                     <h2 className="text-5xl font-black text-[var(--text-primary)] tracking-tighter uppercase">Spheres of Wisdom</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        whileHover={{ y: -15, rotate: 2 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-[var(--bg-card)] p-12 rounded-[3rem] text-center cursor-pointer transition-all shadow-[var(--shadow-soft)] hover:shadow-orange-500/10 border border-[var(--border-subtle)] overflow-hidden"
                        onClick={() => {
                          const query = `subject:${category.name.toLowerCase()}`;
                          setSearchParams({ search: query });
                          performSearch(query);
                        }}
                      >
                        <div className="text-6xl mb-8 transform group-hover:scale-125 transition-transform duration-500">
                          {category.icon}
                        </div>
                        <h3 className="font-black text-[var(--text-primary)] uppercase tracking-[0.2em] text-[10px]">{category.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Trending Section */}
                <section className="mb-48">
                  <h2 className="text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-20 text-center uppercase">Gems from the <span className="text-orange-600">Grantha</span></h2>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
                    className="pb-28"
                  >
                    {trendingBooks.map((book) => (
                      <SwiperSlide key={book.id}>
                        <BookCard book={book} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </section>
                
                {/* Spiritual Call to Action */}
                <section className="relative py-40 px-12 rounded-[5rem] bg-stone-950 overflow-hidden group border-4 border-orange-600/20 shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-br from-orange-800 via-orange-950 to-stone-950 opacity-100 transition-opacity"></div>
                   <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                      <Flame className="w-[40rem] h-[40rem] rotate-12 text-white" />
                   </div>
                   
                   <div className="relative z-10 text-center text-white">
                      <div className="w-24 h-24 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-orange-500/30">
                        <Bookmark className="w-10 h-10 text-orange-500" />
                      </div>
                      <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">Wisdom is <br /><span className="text-orange-500">Universal.</span></h2>
                      <p className="text-stone-400 mb-16 max-w-3xl mx-auto text-2xl font-medium leading-relaxed">Join GranthaVeda and preserve your collection of timeless knowledge.</p>
                      <button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-20 py-7 rounded-[2rem] font-black hover:scale-105 transition shadow-2xl active:scale-95 uppercase tracking-[0.3em] text-sm">Join the Seekers</button>
                   </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
