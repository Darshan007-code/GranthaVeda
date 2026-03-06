import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Cookie, ChevronRight } from 'lucide-react';

const Legal: React.FC = () => {
  const sections = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      content: `At GranthaVeda, we respect your spiritual and digital privacy. We only collect the scrolls you save and your basic credentials to provide a personalized library experience. We never share your data with third-party merchant guilds.`
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      content: `By entering the vault of GranthaVeda, you agree to use this knowledge for the betterment of self and society. Automated harvesting of our scrolls (scraping) is strictly prohibited by the guardians of the vault.`
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: <Cookie className="w-8 h-8 text-orange-500" />,
      content: `We use tiny digital fragments (cookies) to remember your preferences—such as your chosen theme and your place in a scroll. These fragments stay within your own vessel (browser) and are never used for tracking.`
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">Legal <span className="text-orange-600">Sanctum</span></h1>
            <p className="text-stone-400 text-xl font-medium">The sacred rules and protections of the GranthaVeda vault.</p>
          </div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-stone-900 p-12 rounded-[3.5rem] border border-stone-800 shadow-2xl"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{section.title}</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-stone-400 text-lg leading-relaxed font-medium">
                    {section.content}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[1, 2, 3].map(i => (
                      <li key={i} className="flex items-center gap-3 text-stone-500 text-sm font-bold uppercase tracking-widest">
                        <ChevronRight className="w-4 h-4 text-orange-600" /> Clause of Protection 0{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center text-stone-600 text-xs font-black uppercase tracking-[0.3em]">
            Last Updated: March 2026 • Guardians of GranthaVeda
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
