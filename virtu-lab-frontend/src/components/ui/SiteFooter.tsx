import React from 'react';

export const SiteFooter: React.FC = () => {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#050510] text-white/60 mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <div className="text-lg font-black tracking-tight text-white mb-2">
            VirtuLab<span className="text-orange-500">.ai</span>
          </div>
          <p className="text-sm text-white/40 max-w-sm">
            Hands-on virtual science labs for B.Tech and senior-secondary students, designed to make complex experiments safe, clear, and engaging.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-3">
              Navigate
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#explore-labs" className="hover:text-orange-400 transition-colors">Explore Labs</a></li>
              <li><a href="#simulations" className="hover:text-orange-400 transition-colors">Simulations</a></li>
              <li><a href="/teacher" className="hover:text-orange-400 transition-colors">Teacher Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-3">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-white/50">Email: hello@virtulab.ai</li>
              <li className="text-white/50">For pilots & demos, use the Teacher Dashboard.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-[11px] text-white/30">
        © {new Date().getFullYear()} VirtuLab.ai. All rights reserved.
      </div>
    </footer>
  );
};

