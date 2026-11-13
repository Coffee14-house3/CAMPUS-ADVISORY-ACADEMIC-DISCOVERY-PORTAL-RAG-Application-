import React from 'react';
import { Award, Briefcase, TrendingUp, Users, Building, Bot, CheckCircle2 } from 'lucide-react';

interface PlacementsSectionProps {
  onAskAI: (query: string) => void;
}

export const PlacementsSection: React.FC<PlacementsSectionProps> = ({ onAskAI }) => {
  const recruiterCategories = [
    {
      category: 'Aviation & Aerospace Giants',
      companies: ['Boeing', 'Airbus', 'Safran Group', 'Hindustan Aeronautics Limited (HAL)', 'Collins Aerospace', 'Rolls-Royce Aviation', 'Emirates Engineering', 'IndiGo Airlines'],
      color: 'border-sky-500/40 bg-sky-950/20 text-sky-400',
    },
    {
      category: 'Global Tech, AI & Cloud Leaders',
      companies: ['Microsoft', 'Amazon AWS', 'Google Cloud', 'IBM Software Labs', 'Cognizant', 'Tata Consultancy Services (TCS)', 'Infosys', 'Zoho Corporation', 'Accenture', 'Capgemini'],
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
    },
    {
      category: 'Core Engineering & Automotive MNCs',
      companies: ['Hyundai Motor India', 'Ashok Leyland', 'Larsen & Toubro (L&T)', 'TVS Motor Company', 'Saint-Gobain', 'Bosch Global', 'Renault-Nissan Mitsubishi', 'Mahindra & Mahindra'],
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
    },
  ];

  return (
    <div className="py-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Career Pathways & Placements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-3">
            94.5% Placement Record Across 250+ Global Recruiters
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The Department of Corporate Affairs at Hindustan University facilitates rigorous campus recruitment, product hackathons, and paid corporate internships.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-['Outfit']">₹42.5 LPA</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Highest Salary Package</div>
            <p className="text-[11px] text-slate-500 mt-1">International Product MNC Offer</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-['Outfit']">₹6.8 LPA</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Average Salary Package</div>
            <p className="text-[11px] text-slate-500 mt-1">Across all engineering streams</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-sky-400 font-['Outfit']">250+</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Visiting Recruiters</div>
            <p className="text-[11px] text-slate-500 mt-1">Fortune 500 & Top Tier MNCs</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-purple-400 font-['Outfit']">2,400+</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Placement Offers</div>
            <p className="text-[11px] text-slate-500 mt-1">In 2024-2025 Placement Drive</p>
          </div>
        </div>

        {/* Recruiter Categories */}
        <div className="space-y-6">
          {recruiterCategories.map((group, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full border ${group.color}`}></span>
                  {group.category}
                </h3>
                <span className="text-xs font-mono text-slate-400">{group.companies.length} Leading Partners</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {group.companies.map((company, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3 text-center text-xs font-medium text-slate-200 transition-all"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pre-placement training banner */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-['Outfit'] text-white">
              Comprehensive Career Readiness from Semester 4
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Coding bootcamps (LeetCode/DSA), AI mock interview simulations, business English communication, and resume reviews conducted by top industry HR leaders.
            </p>
          </div>
          <button
            onClick={() => onAskAI('What companies recruit Aeronautical and Computer Science students at Hindustan University and what are the average packages?')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 whitespace-nowrap"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI About Placements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
