import React from 'react';
import { Plane, Compass, Award, Shield, Radio, Cpu, Bot, ChevronRight, Wind } from 'lucide-react';

interface AviationHeritageSectionProps {
  onAskAI: (query: string) => void;
}

export const AviationHeritageSection: React.FC<AviationHeritageSectionProps> = ({ onAskAI }) => {
  const aviationAssets = [
    {
      title: 'Full Operational Aircraft Fleet & Hangar',
      description: 'On-campus aviation hangar featuring an actual Boeing 737 aircraft cut-section, Cessna 152, Dornier 228 twin-turboprop, and supersonic fighter jet MiG-21 for real-world aircraft maintenance drills and component tear-downs.',
      specs: '3 Operational Aircraft • Boeing 737 • MiG-21 • Cessna 152',
      icon: Plane,
      badge: 'Live Flight Hangar',
    },
    {
      title: 'ALSIM AL250 Flight Simulator Center',
      description: 'State-of-the-art DGCA certified FNPT II flight simulator providing student pilots and aerospace engineers realistic cockpit instrument flight rules (IFR) simulation across varied weather and atmospheric conditions.',
      specs: 'DGCA Certified • High-Fidelity Cockpit • Full Avionics Suite',
      icon: Compass,
      badge: 'Flight Simulation',
    },
    {
      title: 'Supersonic & Subsonic Wind Tunnels',
      description: 'Advanced aerodynamic testing facilities capable of boundary layer flow visualization, lift/drag profiling, and transonic shockwave analysis for next-generation aircraft and rocket scale models.',
      specs: 'Mach 2.0 Blowdown Tunnel • Subsonic Aerodynamic Channel',
      icon: Wind,
      badge: 'Aerodynamics Lab',
    },
    {
      title: 'HITS Student Satellite Lab (HITS-SAT)',
      description: 'CubeSat and picosatellite development laboratory partnered with ISRO. Students design orbital payloads, VHF/UHF ground station telemetry tracking, and attitude determination sub-systems.',
      specs: 'ISRO Ground Telemetry • Active CubeSat Payload Development',
      icon: Radio,
      badge: 'Space Tech & Satellites',
    },
    {
      title: 'DGCA Accredited Drone RPTO Range',
      description: 'Certified Remote Pilot Training Organization offering commercial drone pilot certifications, autonomous swarm navigation algorithms, and thermal camera UAV payloads.',
      specs: 'DGCA Drone License • Autonomous Swarm Testing Range',
      icon: Cpu,
      badge: 'UAV & Drone Arena',
    },
    {
      title: 'Global Aerospace Placement Tie-Ups',
      description: 'Direct recruitment pipelines and joint aerospace research with Boeing, Airbus, Rolls-Royce, Collins Aerospace, HAL, DRDO, Safran, and international airlines like Emirates and Qatar Airways.',
      specs: 'Boeing • Airbus • HAL • ISRO • Safran • DRDO',
      icon: Award,
      badge: 'Industry Recruiters',
    },
  ];

  return (
    <div className="py-16 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide">
            <Plane className="w-3.5 h-3.5" /> Aviation & Aerospace Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-3">
            Pioneering Flight & Space Exploration Since 1985
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Hindustan University is India's legendary landmark in Aeronautical engineering education with real aircraft on campus and cutting-edge flight simulation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aviationAssets.map((asset, idx) => {
            const Icon = asset.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold bg-slate-800 text-amber-400 px-2 py-0.5 rounded border border-slate-700">
                      {asset.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-['Outfit'] group-hover:text-amber-400 transition-colors">
                    {asset.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800 truncate mb-3">
                    {asset.specs}
                  </div>

                  <button
                    onClick={() => onAskAI(`Provide detailed information about ${asset.title} at Hindustan University including labs, curriculum, and how students get hands-on experience.`)}
                    className="w-full text-xs font-semibold text-amber-400 hover:text-slate-950 hover:bg-amber-500 py-2 rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI About This Lab</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              Want to take flight with our Aeronautical & Space Faculty?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect with our AI counselor or download the complete 2025 Aeronautical & Aerospace prospectus.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onAskAI('What is the complete curriculum, semester-by-semester subjects, and flight training syllabus for B.Tech Aeronautical Engineering at HITS?')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Query Aeronautical AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
