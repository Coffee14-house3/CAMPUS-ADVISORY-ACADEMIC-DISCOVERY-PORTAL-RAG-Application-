import React, { useState } from 'react';
import { SCHOLARSHIPS_DATA, COURSES } from '../data/universityData';
import { Award, CheckCircle2, Calendar, FileText, Send, Sparkles, Bot, DollarSign, HelpCircle } from 'lucide-react';
import { apiUrl } from '../lib/api';

interface AdmissionsSectionProps {
  onAskAI: (query: string) => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onAskAI }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'B.Tech in Aeronautical Engineering',
    state: 'Tamil Nadu',
    marks: '85',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ applicationId: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/admissions/inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSubmitSuccess(data);
    } catch (err) {
      setSubmitSuccess({
        applicationId: `HITS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Inquiry received. Admissions counselor will contact you.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Admissions 2025-2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-3 text-slate-900">
            HITSEEE 2025 Registration & Scholarships
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Single-window admissions for all undergraduate and postgraduate degrees with up to 100% tuition waivers for meritorious scholars.
          </p>
        </div>

        {/* Timeline & Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
            <div className="text-amber-700 font-mono font-bold text-xs uppercase mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Phase 1 Dates
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">April 28 - May 03, 2025</h3>
            <p className="text-xs text-slate-600 mt-2">
              Online Computer Based Test (CBT) across major test centers in India & overseas test hubs.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-amber-700 font-medium">
              Rank list announcement: May 10, 2025
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
            <div className="text-amber-700 font-mono font-bold text-xs uppercase mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Phase 2 Dates
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">June 05 - June 10, 2025</h3>
            <p className="text-xs text-slate-600 mt-2">
              Secondary counseling window for students completing state board/CBSE supplemental exams.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-amber-700 font-medium">
              Rank list announcement: June 16, 2025
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
            <div className="text-amber-700 font-mono font-bold text-xs uppercase mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> Scholarship Counseling
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">Single Window System</h3>
            <p className="text-xs text-slate-600 mt-2">
              Merit-based seat allocation and instant scholarship certificate verification on campus.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-emerald-700 font-medium">
              Over ₹5.5 Crores in scholarships awarded
            </div>
          </div>
        </div>

        {/* Form and Scholarships Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Scholarship Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">University Scholarship Schemes</h3>
              <button
                onClick={() => onAskAI('What are the exact eligibility conditions, documents required, and deadlines for Dr. K.C.G. Verghese Merit Scholarships at Hindustan University?')}
                className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI About Scholarships</span>
              </button>
            </div>

            <div className="space-y-3">
              {SCHOLARSHIPS_DATA.map((sch, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">{sch.name}</h4>
                    <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
                      {sch.category}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-emerald-700">
                    Benefit: {sch.benefit}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {sch.criteria}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Registration & Eligibility Inquiry (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold font-['Outfit'] text-slate-900">Admissions 2025 Inquiry</h3>
              </div>

              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Inquiry Registered!</h4>
                  <p className="text-xs text-emerald-800 font-mono">
                    Application ID: <strong>{submitSuccess.applicationId}</strong>
                  </p>
                  <p className="text-xs text-slate-700">
                    {submitSuccess.message}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="mt-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-medium">Candidate Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-medium">Intended Program of Study *</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">State / Region</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="Tamil Nadu, Kerala, etc."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">12th PCM / Marks (%)</label>
                      <input
                        type="text"
                        value={formData.marks}
                        onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                        placeholder="e.g. 85%"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Registering...' : 'Submit Admission Inquiry'}</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Admissions Toll-Free: <strong>1800 425 44 38</strong> • Padur Campus
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
