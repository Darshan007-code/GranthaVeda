import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Categories from './pages/Categories';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router basename="/GranthaVeda">
      <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<div className="container mx-auto px-4 py-40 text-center text-4xl font-black uppercase text-stone-300">Vault Entry Denied - Page Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
