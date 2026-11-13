import React, { useState } from 'react';
import { DEPARTMENTS, COURSES } from '../data/universityData';
import { CourseInfo } from '../types';
import { BookOpen, GraduationCap, Clock, Award, Briefcase, ChevronRight, Bot, Search, Filter } from 'lucide-react';

interface AcademicsSectionProps {
  onAskAI: (query: string) => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onAskAI }) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseInfo | null>(null);

  const filteredCourses = COURSES.filter((course) => {
    const matchesSchool = selectedSchool === 'All' || course.school === selectedSchool;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch =
      course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      course.highlights.some((h) => h.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      course.careerProspects.some((c) => c.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchesSchool && matchesLevel && matchesSearch;
  });

  return (
    <div className="py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Academic Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-3 text-slate-900">
            Schools of Study & Futuristic Programs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Industry-aligned curricula with hands-on flight simulators, AI compute clusters, moot courts, and international credit transfers.
          </p>
        </div>

        {/* Featured Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-400 transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {dept.shortCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dept.coursesCount} Programs</span>
                </div>
                <h3 className="text-lg font-bold font-['Outfit'] text-slate-900 group-hover:text-amber-700 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Dean: {dept.dean}</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {dept.description}
                </p>

                {/* Key Labs */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-500 block mb-1.5 uppercase">Key Laboratories:</span>
                  <div className="space-y-1">
                    {dept.laboratories.slice(0, 3).map((lab, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span className="truncate">{lab}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedSchool(dept.name)}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>View Programs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onAskAI(`Tell me all details about ${dept.name} including labs, faculty, and career outcomes at Hindustan University.`)}
                  className="text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-200 transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Programs Explorer & Search Filters */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900">Course & Degree Catalog</h3>
              <p className="text-xs text-slate-500 mt-1">Explore eligibility, fee breakdown, and top recruiters for 2025-2026</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search course (e.g. Aeronautical, AI, Law)..."
                  className="bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Schools</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Degrees</option>
                <option value="Undergraduate">Undergraduate (B.Tech / B.Arch / Law)</option>
                <option value="Postgraduate">Postgraduate (M.Tech / MBA / LL.M)</option>
              </select>
            </div>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-50/70 border border-slate-200 hover:border-amber-400 rounded-2xl p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                      {course.level}
                    </span>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-['Outfit'] mt-2 text-slate-900">
                    {course.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{course.school}</p>

                  <div className="mt-3 bg-white rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Annual Tuition Fee:</span>
                      <span className="font-bold text-amber-700">{course.annualFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Eligibility:</span>
                      <span className="text-slate-700 text-right truncate max-w-[200px]" title={course.eligibility}>{course.eligibility}</span>
                    </div>
                  </div>

                  {/* Highlights preview */}
                  <div className="mt-3 space-y-1">
                    {course.highlights.slice(0, 2).map((h, idx) => (
                      <div key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCourseModal(course)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Full Syllabus & Details
                  </button>

                  <button
                    onClick={() => onAskAI(`What are the admission requirements, lab facilities, fee structure, and career placements for ${course.name} at Hindustan University?`)}
                    className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No programs found matching the selected criteria. Try adjusting your search keyword or filters.
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {selectedCourseModal.level}
                </span>
                <h3 className="text-2xl font-bold font-['Outfit'] mt-2 text-slate-900">{selectedCourseModal.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedCourseModal.school}</p>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-slate-500 hover:text-slate-900 p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-mono">Duration</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourseModal.duration}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-mono">Annual Tuition</span>
                <p className="text-sm font-bold text-amber-700 mt-0.5">{selectedCourseModal.annualFee}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-mono">Intake Seats</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourseModal.seats} Seats</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Eligibility Criteria</h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                {selectedCourseModal.eligibility}
              </div>
            </div>

            {selectedCourseModal.specializations && (
              <div>
                <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Specialization Tracks</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourseModal.specializations.map((spec, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg text-xs border border-slate-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Program Highlights</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedCourseModal.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Marquee Recruiters & Pathways</h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-amber-800 font-medium">
                {selectedCourseModal.careerProspects.join(' • ')}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const course = selectedCourseModal;
                  setSelectedCourseModal(null);
                  onAskAI(`Explain everything about admission process, scholarships, and course curriculum for ${course.name} at Hindustan University.`);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
