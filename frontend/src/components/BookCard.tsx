import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, BookOpen, LockOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { 
    id, 
    title, 
    authors, 
    thumbnail, 
    rating, 
    category, 
    readLink, 
    isFree 
  } = book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -15 }}
      transition={{ duration: 0.4 }}
      className="premium-card flex flex-col h-full group relative"
    >
      {/* Free Badge */}
      {isFree && (
        <div className="absolute top-6 left-6 z-10 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
          <LockOpen className="w-3 h-3" /> Free Read
        </div>
      )}

      <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <Link 
            to={`/book/${id}`}
            className="w-full bg-white text-stone-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors shadow-xl"
          >
            Details
          </Link>
          {readLink && (
            <a 
              href={readLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full ${isFree ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'} text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xl`}
            >
              <BookOpen className="w-3 h-3" /> {isFree ? 'Read Free' : 'Preview'}
            </a>
          )}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-6 right-6 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
          <span className="text-[10px] font-black text-stone-900 dark:text-white">{rating}</span>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-3 block">
          {category}
        </span>
        
        <h3 className="font-black text-stone-900 dark:text-white mb-2 line-clamp-2 text-lg leading-tight group-hover:text-orange-600 transition-colors uppercase">
          {title}
        </h3>
        
        <p className="text-stone-500 dark:text-stone-400 text-xs mb-6 line-clamp-1 italic font-medium tracking-wider">
          by {authors.join(', ')}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-stone-800 flex justify-between items-center">
          <Link 
            to={`/book/${id}`}
            className="text-stone-900 dark:text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-orange-600 transition-colors"
          >
            Explore <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
