import { CourseInfo, DepartmentInfo, UniversityKnowledgeDoc } from '../types';

export const UNIVERSITY_INFO = {
  name: 'Hindustan University',
  fullName: 'Hindustan Institute of Technology and Science (HITS)',
  tagline: 'To Make Every Man a Success and No Man a Failure',
  motto: 'Excellence in Higher Education & Aviation Heritage',
  established: 1985,
  deemedStatus: 'Deemed-to-be-University under section 3 of UGC Act 1956 (2008)',
  accreditation: 'NAAC A+ Grade (3.35 CGPA) | Category-I Deemed University | NIRF Ranked',
  campusLocation: '1, Rajiv Gandhi Salai (OMR), Padur, Kelambakkam, Chennai, Tamil Nadu 603103, India',
  campusArea: '100+ Acres Green Eco-Friendly Campus',
  totalStudents: '18,000+',
  facultyCount: '800+ Ph.D / Industry Specialists',
  globalPartnerships: '100+ International MoUs (USA, UK, France, Germany, South Korea, Australia)',
  placementRate: '94.5%',
  highestPackage: '₹42.5 LPA',
  averagePackage: '₹6.8 LPA',
  contactPhone: '+91 44 2747 4262 / 1800 425 44 38',
  admissionsEmail: 'admission@hindustanuniv.ac.in',
  website: 'https://hindustanuniv.ac.in',
};

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'aero',
    name: 'School of Aeronautical Sciences',
    shortCode: 'AERO',
    dean: 'Dr. R. Asokan, Ph.D (Aerospace)',
    description: 'Pioneers in aeronautical and aerospace engineering education in India with real aircraft hangars, Boeing/Airbus simulation tech, and supersonic wind tunnels.',
    laboratories: ['Aircraft Hangar with 3 Operational Aircraft', 'ALSIM AL250 Flight Simulator Lab', 'Supersonic & Subsonic Wind Tunnel Lab', 'Rocket Propulsion & Avionics Center', 'Drone Technology & UAV Testing Range'],
    studentCount: 2200,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    coursesCount: 8,
  },
  {
    id: 'computing',
    name: 'School of Computing Sciences',
    shortCode: 'SOCS',
    dean: 'Dr. S. Rajalakshmi, Ph.D',
    description: 'Premier hub for Computer Science, Artificial Intelligence, Machine Learning, Cyber Security, Cloud Computing, and Data Science in collaboration with IBM and AWS.',
    laboratories: ['IBM Cloud & AI Excellence Center', 'NVIDIA High-Performance Computing Lab', 'Cyber Defense & Forensics Studio', 'IoT & Embedded Robotics Workshop'],
    studentCount: 4500,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    coursesCount: 14,
  },
  {
    id: 'mech',
    name: 'School of Mechanical Sciences',
    shortCode: 'MECH',
    dean: 'Dr. G. Sasikumar, Ph.D',
    description: 'Cutting-edge engineering education in Mechatronics, Automotive Engineering, Robotics, Additive Manufacturing, and Sustainable Energy.',
    laboratories: ['Electric Vehicle (EV) Research Hub', 'Additive 3D Printing Lab', 'CNC & CAD/CAM Automation Center', 'Renewable Energy & Thermal Simulation Lab'],
    studentCount: 1800,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    coursesCount: 7,
  },
  {
    id: 'building',
    name: 'School of Planning & Architecture (SPADE)',
    shortCode: 'SPADE',
    dean: 'Prof. Vergis Oommen, M.Arch',
    description: 'Council of Architecture (CoA) approved School of Architecture and Interior Design, ranked among top architectural institutes in South India.',
    laboratories: ['Climatic & Building Science Lab', 'Materials & Model Making Workshop', 'Digital BIM & Parametric Design Studio'],
    studentCount: 950,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    coursesCount: 4,
  },
  {
    id: 'mgmt',
    name: 'School of Management',
    shortCode: 'SOM',
    dean: 'Dr. P. S. Sreejith, Ph.D',
    description: 'ACBSP accredited MBA and BBA programs offering specialized tracks in Aviation Management, Logistics & Supply Chain, FinTech, and Business Analytics.',
    laboratories: ['Bloomberg Financial Trading Terminal', 'Business Analytics & Simulation Lab', 'Entrepreneurship & Innovation Incubation Cell (HTBI)'],
    studentCount: 1400,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    coursesCount: 6,
  },
  {
    id: 'law',
    name: 'Hindustan Institute of Technology & Science School of Law',
    shortCode: 'HITS-LAW',
    dean: 'Prof. Dr. V. Jayaraman, LL.D',
    description: 'Bar Council of India (BCI) recognized modern law school offering integrated B.A. LL.B (Hons.), B.B.A. LL.B (Hons.), and LL.M programs with digital moot courts.',
    laboratories: ['Air-Conditioned High Court Simulation Moot Court', 'Legal Aid Clinic & Human Rights Cell', 'Alternative Dispute Resolution (ADR) Cell'],
    studentCount: 750,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    coursesCount: 4,
  },
];

export const COURSES: CourseInfo[] = [
  {
    id: 'btech-aero',
    name: 'B.Tech in Aeronautical Engineering',
    school: 'School of Aeronautical Sciences',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Minimum 50% in Physics, Mathematics & Chemistry/Computer Science. Valid HITSEEE rank.',
    annualFee: '₹2,75,000 / year',
    seats: 180,
    specializations: ['Avionics & Flight Control', 'Aircraft Maintenance Engineering', 'Spacecraft Dynamics', 'Unmanned Aerial Systems (UAS)'],
    highlights: ['Hands-on flight testing on real Cessna and Dornier aircraft', 'ALSIM AL250 Flight Simulator certification', 'Wind tunnel testing & rocket propulsion labs'],
    careerProspects: ['Boeing, Airbus, ISRO, DRDO, HAL, GE Aviation, Emirates, Rolls Royce'],
  },
  {
    id: 'btech-aero-space',
    name: 'B.Tech in Aerospace Engineering',
    school: 'School of Aeronautical Sciences',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with 50% in PCM, HITSEEE entrance score.',
    annualFee: '₹2,60,000 / year',
    seats: 120,
    specializations: ['Satellite Technology', 'Hypersonic Aerodynamics', 'Rocket Propulsion Systems'],
    highlights: ['Satellite ground station connected to student picosatellite projects', 'Collaboration with ISRO and European Space Agency partners'],
    careerProspects: ['ISRO, DRDO, NASA partners, Lockheed Martin, Safran, Bell Flight'],
  },
  {
    id: 'btech-cse-ai-ml',
    name: 'B.Tech CSE with AI & Machine Learning',
    school: 'School of Computing Sciences',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with 50% aggregate in Physics, Mathematics, and CS/Chemistry. HITSEEE qualification.',
    annualFee: '₹2,85,000 / year',
    seats: 240,
    specializations: ['Generative AI & LLMs', 'Deep Learning & Computer Vision', 'Autonomous Systems', 'Natural Language Processing'],
    highlights: ['Curriculum developed with IBM and Google Cloud', 'Access to High-Performance GPU clusters', 'Paid 6-month capstone industry internship in 8th semester'],
    careerProspects: ['Google, Microsoft, Amazon, Adobe, NVIDIA, Goldman Sachs, TCS R&D'],
  },
  {
    id: 'btech-cse-cyber',
    name: 'B.Tech CSE with Cyber Security',
    school: 'School of Computing Sciences',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with 50% in PCM or equivalent.',
    annualFee: '₹2,50,000 / year',
    seats: 120,
    specializations: ['Ethical Hacking & Penetration Testing', 'Cloud Security & DevSecOps', 'Blockchain & Cryptography'],
    highlights: ['Certified Ethical Hacker (CEH) integrated syllabus', 'Live Cyber Range for red team vs blue team simulation exercises'],
    careerProspects: ['PwC, Deloitte, Cisco, Palo Alto Networks, EY Cyber, QuickHeal, Indian CERT'],
  },
  {
    id: 'b-arch',
    name: 'Bachelor of Architecture (B.Arch)',
    school: 'School of Planning & Architecture (SPADE)',
    level: 'Undergraduate',
    duration: '5 Years (10 Semesters)',
    eligibility: '10+2 with 50% PCM and valid NATA score / JEE Main Paper 2.',
    annualFee: '₹2,40,000 / year',
    seats: 80,
    highlights: ['CoA Approved with Category 1 ranking', 'National and International Study Tours', 'Biophilic and Sustainable Architecture Studio'],
    careerProspects: ['Top Architectural Firms, Urban Planning Bodies, Real Estate Giants, Freelance Practice'],
  },
  {
    id: 'mba-aviation',
    name: 'MBA in Aviation Management',
    school: 'School of Management',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation in any discipline with minimum 50% marks. CAT/MAT/HITS-MAT score.',
    annualFee: '₹2,90,000 / year',
    seats: 60,
    specializations: ['Airport Operations Management', 'Airline Fleet & Revenue Management', 'Air Cargo & Supply Logistics'],
    highlights: ['IATA aligned coursework', 'Internship at Chennai International Airport and Global Airline hubs'],
    careerProspects: ['IndiGo, Air India, Qatar Airways, GMR Airports, DHL Aviation, Menzies Aviation'],
  },
  {
    id: 'ballb-hons',
    name: 'B.A. LL.B (Hons.) - 5 Year Integrated',
    school: 'School of Law',
    level: 'Undergraduate',
    duration: '5 Years (10 Semesters)',
    eligibility: '10+2 with minimum 50% in any stream. CLAT / LSAT-India / HITS Law Entrance.',
    annualFee: '₹2,00,000 / year',
    seats: 120,
    highlights: ['BCI approved with regular High Court and Supreme Court observational visits', 'National Moot Court competitions hosted annually'],
    careerProspects: ['Corporate Law Firms, Judicial Services, Cyber Law Consultancies, Litigation'],
  },
  {
    id: 'mtech-defence-tech',
    name: 'M.Tech in Defence Technology & Aerospace',
    school: 'School of Aeronautical Sciences',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.E/B.Tech in Aeronautical/Aerospace/Mechanical/ECE with 55% marks or valid GATE score.',
    annualFee: '₹1,60,000 / year',
    seats: 30,
    highlights: ['Designed in collaboration with DRDO / AICTE', 'Direct access to military simulation and radar telemetry systems'],
    careerProspects: ['DRDO, BEL, BAE Systems, L&T Defence, BrahMos Aerospace, Mahindra Defence'],
  },
];

export const SCHOLARSHIPS_DATA = [
  {
    name: 'Dr. K.C.G. Verghese Merit Scholarship',
    category: 'Merit-Based',
    benefit: 'Up to 100% Tuition Fee Waiver',
    criteria: 'Awarded to top 100 rankers in HITSEEE entrance examination and +2 state board/CBSE toppers scoring >95%.',
  },
  {
    name: 'Merit-Cum-Means Scholarship',
    category: 'Financial Assistance',
    benefit: '25% to 50% Tuition Fee Waiver',
    criteria: 'Students with excellent academic records having family annual income below ₹3.5 Lakhs.',
  },
  {
    name: 'Dr. Elizabeth Verghese Founder Chancellor Scholarship',
    category: 'Women in STEM',
    benefit: '50% Tuition Fee Concession for all 4 years',
    criteria: 'Meritorious female students enrolling in Aeronautical, Aerospace, and CSE disciplines.',
  },
  {
    name: 'Chancellor Sports Scholarship',
    category: 'Sports Quota',
    benefit: '100% Tuition Fee + Free Hostel & Food + Specialized Athletic Training',
    criteria: 'National and International medalists in Basketball, Athletics, Football, Cricket, Badminton, Martial Arts.',
  },
  {
    name: 'Defence & Armed Forces Wards Concession',
    category: 'Special Category',
    benefit: '20% Tuition Fee Concession',
    criteria: 'Wards of serving or retired personnel of Indian Army, Navy, Air Force, and Paramilitary forces.',
  },
];

export const DEFAULT_UNIVERSITY_DOCS: UniversityKnowledgeDoc[] = [
  {
    id: 'hits-adm-01',
    title: 'HITSEEE Entrance Exam & Admission Process 2025-2026',
    category: 'Admissions',
    tags: ['HITSEEE', 'Admissions', 'Application', 'Dates', 'Eligibility', 'BTech'],
    updatedAt: '2025-02-15',
    content: `Hindustan Institute of Technology and Science (HITS) conducts the Hindustan Institute of Technology and Science Engineering Entrance Examination (HITSEEE) annually for admissions to all B.Tech and B.Arch programs.
Key Eligibility: 10+2 with minimum 50% aggregate in Physics, Mathematics, and Chemistry / Computer Science.
Application Form Fee: ₹1,000.
HITSEEE 2025 Phases: Phase 1: April 28 - May 3, 2025. Phase 2: June 5 - June 10, 2025.
Result & Counseling: Merit rank list published within 7 days of exam. Online and offline single-window counseling rounds are conducted at the Padur campus.
Non-Exam Direct Admissions: Applicable for Arts, Science, Humanities, Law (via CLAT/HITS Law test), and Management (CAT/MAT/HITS-MAT).
Direct Admission Helpline: 1800 425 44 38 / WhatsApp +91 94438 41111.`,
  },
  {
    id: 'hits-aero-02',
    title: 'School of Aeronautical Sciences - Aviation Hangar & Lab Facilities',
    category: 'Aeronautical & Labs',
    tags: ['Aviation', 'Aeronautical', 'Aerospace', 'Hangar', 'Aircraft', 'Simulators'],
    updatedAt: '2025-01-20',
    content: `Hindustan University is celebrated as India's premier pioneer in Aeronautical and Aerospace Education.
Key Aviation Assets on Campus:
1. Operational Aircraft Fleet: Boeing 737 aircraft cut-section, Cessna 152, Dornier 228 twin-turboprop aircraft, and fighter jet Mig-21 on campus for live student dismantling and airframe maintenance drills.
2. Flight Simulator: ALSIM AL250 flight simulator with DGCA certification standard for realistic cockpit instrument flight training.
3. Wind Tunnels: Subsonic wind tunnel and supersonic blowdown wind tunnel for aerodynamic profiling and boundary layer visualization.
4. ISRO Satellite Research Center: HITS Student Satellite Team (HITS-SAT) develops CubeSats with telemetry linked to ISRO ground stations.
5. Drone Testing Arena: DGCA accredited Remote Pilot Training Organization (RPTO) offering drone pilot licenses.`,
  },
  {
    id: 'hits-fees-03',
    title: 'Fee Structure and Payment Guidelines 2025-2026',
    category: 'Fees & Scholarships',
    tags: ['Fees', 'Tuition', 'Installments', 'Hostel Fees', 'Scholarships'],
    updatedAt: '2025-01-10',
    content: `Annual Tuition Fee Ranges at Hindustan University:
- B.Tech Aeronautical / Aerospace / CSE AI-ML: ₹2,50,000 - ₹2,85,000 per year.
- B.Tech Mechanical / Civil / EEE / ECE: ₹1,75,000 - ₹2,10,000 per year.
- B.Arch (5 Years): ₹2,40,000 per year.
- MBA (General / Aviation / FinTech): ₹2,50,000 - ₹2,90,000 per year.
- B.A. LL.B / B.B.A. LL.B (5 Years): ₹2,00,000 per year.
- B.Sc / BCA / B.Com / B.Des: ₹1,10,000 - ₹1,80,000 per year.
Hostel & Mess Charges:
- Non-AC 3-Sharing Room: ₹1,10,000 per year (including North & South Indian buffet meals).
- AC Deluxe 2-Sharing Room: ₹1,65,000 per year (includes AC power backup, Wi-Fi, laundry, and meals).
Payment Mode: Online net banking, UPI, NEFT, RTGS, and interest-free education loan assistance through SBI, HDFC, Canara Bank tie-ups.`,
  },
  {
    id: 'hits-place-04',
    title: 'Placements, Corporate Relations, and Top Recruiters',
    category: 'Placements',
    tags: ['Placements', 'Salary', 'Recruiters', 'Internships', 'Jobs', 'Boeing', 'Microsoft'],
    updatedAt: '2025-02-01',
    content: `Hindustan University Placement Cell (Department of Corporate Affairs) records continuous 94%+ placement statistics.
Key Highlights (2024-2025 Season):
- Highest Salary Package Offered: ₹42.5 LPA (International/Product MNC).
- Average Salary: ₹6.8 LPA.
- Total Offers Generated: 2,400+ offers across 250+ recruiting companies.
Top Marquee Recruiters:
- Aviation & Aerospace: Boeing, Airbus, Safran, HAL, Collins Aerospace, Rolls Royce, Emirates Engineering, SpiceJet, IndiGo.
- Tech & AI: Microsoft, Amazon, Google, IBM, Cognizant, TCS, Infosys, Capgemini, Wipro, Accenture, Hexaware, Zoho.
- Core & Automotive: Hyundai Motors, Ashok Leyland, Larsen & Toubro (L&T), Renault-Nissan, Bosch, TVS Motors, Saint-Gobain.
Pre-Placement Training starts from 4th semester covering Soft Skills, DSA in Python/Java, Mock Technical Interviews, and Aptitude tests.`,
  },
  {
    id: 'hits-hostel-05',
    title: 'Hostels, Mess, Sports, and Campus Life Amenities',
    category: 'Hostels & Transport',
    tags: ['Hostel', 'Campus', 'Sports', 'Transport', 'Mess', 'Medical', 'Gym'],
    updatedAt: '2025-01-25',
    content: `Campus Infrastructure and Student Amenities at HITS Padur:
1. Student Residential Quarters: 8 dedicated hostels (4 Men's hostels: Jupiter, Venus, Saturn, Mercury; 4 Women's hostels: Kasturba, Mother Teresa, Helen Keller, Kalpana Chawla). 24/7 security with biometric access, high-speed Wi-Fi, solar hot water, study lounges.
2. Dining & Food Court: Multi-cuisine hygienic dining halls serving South Indian, North Indian, and continental menus. On-campus cafes including Nescafe kiosks, Subway, and Juice bars.
3. Health & Medical Center: 24/7 Health clinic with resident doctors, nursing staff, ambulance on standby, and tie-up with Chettinad Health City.
4. Sports Complex: International standard synthetic athletic track, FIFA-standard football ground, floodlit basketball courts, cricket pavilion, indoor badminton courts, and air-conditioned gymnasium.
5. University Bus Fleet: 70+ GPS-tracked air-conditioned university buses covering all routes across Chennai city, Chengalpattu, and Kanchipuram.`,
  },
  {
    id: 'hits-global-06',
    title: 'International Student Exchange & Dual Degree Programs',
    category: 'International Programs',
    tags: ['International', 'Study Abroad', 'Exchange', 'Dual Degree', 'Germany', 'USA', 'Korea'],
    updatedAt: '2025-01-18',
    content: `Hindustan University has active Memorandums of Understanding (MoUs) with over 100 premier universities across 35 countries.
Key Exchange Programs:
1. Semester Abroad Program (SAP): Students can spend 1 or 2 semesters at partner universities with full credit transfer. Partner institutions include Korea Tech (South Korea), Riga Technical University (Latvia), University of Warwick (UK), Western Sydney University (Australia), Trier University of Applied Sciences (Germany), Moscow Aviation Institute (Russia).
2. Dual Degree & Pathway Programs: 2+2 B.Tech and 1+1 MBA programs allowing students to graduate with degrees from both HITS and international partner universities.
3. Erasmus+ and DAAD Scholarships: Funded student and faculty mobility grants available for meritorious scholars.
4. International Affairs Office handles visa documentation, foreign student orientation, and cultural assimilation.`,
  },
  {
    id: 'hits-exam-07',
    title: 'Academic Structure, CBCS, and Grading System',
    category: 'Examinations',
    tags: ['CBCS', 'Grading', 'GPA', 'CGPA', 'Attendance', 'Credits', 'Curriculum'],
    updatedAt: '2025-01-15',
    content: `HITS follows the Choice-Based Credit System (CBCS) aligned with UGC guidelines:
1. Credit Framework: B.Tech requires completion of 160-165 credits including core engineering, open electives, multidisciplinary minors (e.g. Minor in AI, FinTech, Robotics), and mandatory capstone projects.
2. Evaluation Matrix:
- Continuous Internal Assessment (CIA): 40% to 50% weightage (Internal tests, lab assessments, quizzes, assignments).
- End Semester Examinations (ESE): 50% to 60% weightage.
3. Grading Scale: 10-point GPA scale (O: Outstanding 10.0, A+: Excellent 9.0, A: Very Good 8.0, B+: Good 7.0, B: Above Average 6.0, C: Pass 5.0, RA: Re-appear).
4. Minimum Attendance Requirement: 75% mandatory attendance in each subject to appear for end-semester exams.
5. Fast-track semester system allows high-performing students (CGPA >= 8.5) to complete course credits early to pursue full-time 8th-semester industry internships.`,
  },
];
