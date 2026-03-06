import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const INTERNAL_VAULT: any = {
  philosophy: [
    { id: 'p1', title: 'The Bhagavad Gita', authors: ['Vyasa'], category: 'Philosophy', rating: 5, thumbnail: 'https://images.unsplash.com/photo-1608037190330-de9fa6be00fb?w=800', description: 'The timeless spiritual classic of ancient India, offering profound guidance on duty, yoga, and the nature of the soul.' },
    { id: 'p2', title: 'Meditations', authors: ['Marcus Aurelius'], category: 'Philosophy', rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', description: 'The private reflections of the Roman Emperor on Stoic philosophy and living a life of virtue.' },
    { id: 'p3', title: 'Beyond Good and Evil', authors: ['Friedrich Nietzsche'], category: 'Philosophy', rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800', description: 'A revolutionary work that challenges traditional morality and explores the will to power.' },
    { id: 'p4', title: 'The Republic', authors: ['Plato'], category: 'Philosophy', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800', description: 'A foundational text of Western philosophy exploring justice, the ideal state, and the allegory of the cave.' },
    { id: 'p5', title: 'Yoga Sutras of Patanjali', authors: ['Patanjali'], category: 'Philosophy', rating: 5, thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', description: 'The definitive guide to the practice and philosophy of classical yoga.' }
  ],
  history: [
    { id: 'h1', title: 'Sapiens', authors: ['Yuval Noah Harari'], category: 'History', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800', description: 'A groundbreaking exploration of the history of our species, from ancient times to the modern era.' },
    { id: 'h2', title: 'The Discovery of India', authors: ['Jawaharlal Nehru'], category: 'History', rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', description: 'A masterpiece written from prison, exploring the deep cultural and historical roots of India.' },
    { id: 'h3', title: 'An Era of Darkness', authors: ['Shashi Tharoor'], category: 'History', rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800', description: 'A powerful critique of the British Empire in India and its lasting impact.' },
    { id: 'h4', title: 'The Silk Roads', authors: ['Peter Frankopan'], category: 'History', rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800', description: 'A major reassessment of world history through the lens of the central Asian trade routes.' }
  ],
  science: [
    { id: 's1', title: 'A Brief History of Time', authors: ['Stephen Hawking'], category: 'Science', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?w=800', description: 'A journey through space and time, exploring the origins of the universe and the nature of black holes.' },
    { id: 's2', title: 'Cosmos', authors: ['Carl Sagan'], category: 'Science', rating: 5, thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', description: 'A beautiful exploration of science, philosophy, and the vastness of the universe.' }
  ],
  coding: [
    { id: 'c1', title: 'Clean Code', authors: ['Robert C. Martin'], category: 'Coding', rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800', description: 'A handbook of agile software craftsmanship, teaching how to write code that lasts.' },
    { id: 'c2', title: 'The Pragmatic Programmer', authors: ['Andrew Hunt'], category: 'Coding', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800', description: 'Essential lessons for modern developers to improve their craft and career.' }
  ],
  fiction: [
    { id: 'f1', title: 'The Alchemist', authors: ['Paulo Coelho'], category: 'Fiction', rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800', description: 'An enchanting story about following your dreams and listening to your heart.' },
    { id: 'f2', title: '1984', authors: ['George Orwell'], category: 'Fiction', rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800', description: 'A chilling dystopian novel about surveillance, truth, and power.' }
  ]
};

const getAllInternalBooks = () => Object.values(INTERNAL_VAULT).flat();

const unifyData = (b: any) => {
  if (b.volumeInfo) {
    // API Format
    return {
      id: b.id,
      title: b.volumeInfo.title,
      authors: b.volumeInfo.authors || ['Unknown'],
      description: b.volumeInfo.description || 'Information is being unrolled...',
      category: b.volumeInfo.categories?.[0] || 'Knowledge',
      rating: b.volumeInfo.averageRating || (Math.random() * 1.5 + 3.5).toFixed(1),
      thumbnail: b.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/400x600',
      readLink: b.accessInfo?.webReaderLink || b.volumeInfo.previewLink || '#',
      isFree: b.accessInfo?.publicDomain || b.accessInfo?.viewability === 'ALL_PAGES'
    };
  }
  // Internal Format (already unified)
  return {
    ...b,
    isFree: b.isFree || false,
    readLink: b.readLink || '#',
    description: b.description || 'Knowledge is eternal...'
  };
};

export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`);
    const apiBooks = (response.data.items || []).map(unifyData);
    
    // Check if query matches internal categories
    const categoryKey = query.toLowerCase().replace('subject:', '').trim();
    const internal = INTERNAL_VAULT[categoryKey] || [];
    
    // Merge internal and API books
    const combined = [...internal, ...apiBooks];
    if (combined.length === 0) return getAllInternalBooks(); // Absolute fallback
    
    // Remove duplicates
    return Array.from(new Map(combined.map(item => [item.id, item])).values());
  } catch (error) {
    const categoryKey = query.toLowerCase().replace('subject:', '').trim();
    return INTERNAL_VAULT[categoryKey] || getAllInternalBooks();
  }
};

export const getTrendingBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/trending`);
    const apiBooks = (response.data.items || []).map(unifyData);
    const combined = [...getAllInternalBooks().slice(0, 10), ...apiBooks];
    return Array.from(new Map(combined.map((item: any) => [item.id, item])).values()).slice(0, 12);
  } catch (e) {
    return getAllInternalBooks().slice(0, 12);
  }
};

export const getBookDetails = async (bookId: string) => {
  // 1. Check internal vault FIRST (fix for p2 issue)
  const internal = getAllInternalBooks().find((b: any) => b.id === bookId);
  if (internal) return unifyData(internal);

  // 2. Try the API
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
    return unifyData(response.data);
  } catch (error) {
    console.error('Details fetch failed');
    return null;
  }
};

// Auth
export const login = async (credentials: any) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};
