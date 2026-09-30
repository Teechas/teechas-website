import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Calendar, ArrowRight, CheckCircle, PlayCircle, Youtube, Briefcase, Users, Clock, MapPin, BookOpen, CheckCircle2, Award, FileText, Plus, Minus, Video } from 'lucide-react';

const BenchmarkPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[76px] h-screen w-full bg-white flex flex-col">
      <iframe 
        src="https://state-of-human-ai.typeform.com/to/XntdTHmU" 
        className="w-full h-full flex-1 border-0"
        title="The 2027 State of Human-AI Project Delivery Benchmark"
      ></iframe>
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  
  // Content selection states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('overview');
  const [enrollmentTrack, setEnrollmentTrack] = useState('');
  const [expandedTrack, setExpandedTrack] = useState(null);

  // Success UI states
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', body: '' });
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#benchmark') {
        setCurrentView('benchmark');
      } else {
        setCurrentView('home');
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (currentView !== 'home') {
      window.location.hash = ''; 
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navHeight = 116; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 116;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const handleServiceDropdownClick = (e, service) => {
    e.preventDefault();
    scrollToSection(e, 'services');
    setTimeout(() => {
      setSelectedService(service);
      setActiveModal('service-details');
    }, 600);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setTimeout(() => setNewsletterStatus('idle'), 4000);
    e.target.reset();
  };

  const handleFormSubmit = async (e, type) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";

    const formData = new FormData(form);
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      setActiveModal(null);
      
      if (type === 'enrollment') {
        setSuccessMessage({
          title: "Enrollment Request Received",
          body: "Your seat reservation has been securely logged. Our admissions team will review your details and send your official corporate invoice to your email within 24 hours."
        });
      } else if (type === 'webinar') {
        setSuccessMessage({
          title: "Registration Confirmed",
          body: "You are registered! A calendar invite containing your secure Zoom link will be sent to your inbox shortly."
        });
      } else {
        setSuccessMessage({
          title: "Inquiry Received",
          body: "Thank you for reaching out to Teechas Consulting. A transformation specialist will be in touch with you shortly."
        });
      }
      setShowSuccess(true);
    } catch (error) {
      btn.innerText = originalText;
      alert("There was an issue submitting your form. Please email us directly at info@teechas.com");
    }
  };

  const openLegalModal = (e) => {
    e.preventDefault();
    setSuccessMessage({
      title: "Legal & Compliance",
      body: "Our updated Privacy Policy and Terms of Service are currently undergoing standard legal review for our 2027 global compliance rollout. For immediate data inquiries, please email info@teechas.com."
    });
    setShowSuccess(true);
  };

  const services = [
    "Strategy Alignment & Execution",
    "Enterprise Transformation",
    "Digital Transformation & Enablement",
    "Training & Talent Solutions"
  ];

  const clientLogos = [
    { name: "ProxieStudios", textOnly: true },
    { name: "Source Rock Ltd", textOnly: true },
    { name: "EmpaVita Group", textOnly: true },
    { name: "Valderus", textOnly: true },
    { name: "Trarza Consulting", textOnly: true },
    { name: "LotusCare Services", textOnly: true },
    { name: "Professional Home Care Advantage", textOnly: true }
  ];

  const courseData = {
    jobReadiness: {
      id: 'jr-ba',
      title: "Job Readiness Programs",
      subtitle: "Foundation Bootcamp Series",
      overview: "Equips you with the foundation skills, hands-on training, and professional habits needed to enter, secure, excel, and grow on the job. This program goes beyond theory—we provide comprehensive career support including interview preparation, resume building, and strategic guidance to help you land your dream role.",
      curriculum: [
        { track: "Business Analysis", modules: ["Business Analysis Foundations.", "Strategic Business Case Development & Needs Analysis.", "Elicitation Techniques & Advanced Stakeholder Engagement.", "Requirements Life Cycle Management (BRDs, FRDs, User Stories).", "Process Modeling & Future-State Design.", "Applied AI: Leveraging intelligent automation and AI-driven insights for requirement analysis.", "Final Capstone Project Implementation."] },
        { track: "Project Management", modules: ["Project Management Foundations.", "Project Initiation, Chartering, and Scope Definition.", "Agile, Waterfall, and Hybrid Methodologies.", "Resource Allocation, Scheduling, and Budget Management.", "Proactive Risk Mitigation & Quality Assurance.", "Applied AI: Automating project tracking, risk prediction, and reporting workflows.", "Final Capstone Project Implementation."] },
        { track: "Product Management", modules: ["Product Management Foundations.", "Product Vision, Strategy, and Lifecycle Management.", "Deep User Research and Market Competitor Analysis.", "Roadmapping, Backlog Grooming, and Agile Execution.", "Go-To-Market (GTM) Strategy and KPI Tracking.", "Applied AI: Utilizing machine learning models for user behavioral insights and predictive roadmapping.", "Final Capstone Project Implementation."] },
        { track: "Change Management", modules: ["Change Management Foundations.", "Change Readiness Assessments & Impact Analysis.", "Communication Strategy & Stakeholder Engagement Planning.", "Resistance Management and Executive Sponsor Coaching.", "Fostering Adoption & Sustaining Organizational Change.", "Applied AI: Using sentiment analysis and intelligent communication tools to drive adoption.", "Final Capstone Project Implementation."] },
        { track: "SAP ERP", modules: ["SAP ERP Foundations.", "System Navigation & SAP GUI Mastery.", "Master Data Management (MDM) Protocols.", "Standard Business Process Workflows (O2C, P2P, RTR).", "Reporting, Analytics, and Data Integration.", "Applied AI: Automating repetitive ERP workflows and integrating intelligent co-pilots.", "Final Capstone Project Implementation."] },
        { track: "Enterprise AI", modules: ["Enterprise AI Foundations.", "Demystifying Artificial Intelligence, Machine Learning & LLMs.", "Identifying High-ROI Intelligent Automation Opportunities.", "Prompt Engineering, Cognitive Workflows & Process Optimization.", "Implementing AI Safely: InfoSec, Data Privacy & Governance.", "Applied AI: Building cross-functional AI strategies for scalable business impact.", "Final Capstone Project Implementation."] }
      ],
      logistics: "Duration: 6 Weeks | Format: Virtual Live & Hybrid | Location: North America (NA) & Nigeria",
      investment: "$749 | ₦449,000 per track",
      examInfo: "A formal Teechas Certificate of Completion is awarded upon successfully submitting the Final Capstone Project and meeting all program requirements."
    },
    iiba: {
      id: 'cert-cbap',
      title: "IIBA Certification Path",
      subtitle: "Global Business Analysis Certification",
      overview: "Validate your expertise in business analysis. We prepare you comprehensively for the ECBA, CCBA, or CBAP exams to ensure you meet global competency standards.",
      curriculum: [
        "Business Analysis Planning and Monitoring",
        "Elicitation and Collaboration",
        "Requirements Life Cycle Management",
        "Strategy Analysis",
        "Requirements Analysis and Design Definition",
        "Solution Evaluation",
        "Exam Prep: Scenario-Based Simulator Practice & Question Banks"
      ],
      logistics: "Duration: 4 Weeks (Weekends) | Format: Virtual Live & Hybrid | Location: North America (NA) & Nigeria",
      investment: "ECBA: $449 | CCBA: $549 | CBAP: $649 (Excludes IIBA Exam Fee)",
      examInfo: "Exam fees are paid directly to the IIBA. We provide end-to-end guidance on the application process and logging your required professional development hours."
    },
    pmi: {
      id: 'cert-pmp',
      title: "PMI Certification Path",
      subtitle: "Global Project Management Certification",
      overview: "Achieve the gold standard in Project Management. Our rigorous bootcamps prepare you for the CAPM, PMP, or PMI-PBA exams.",
      curriculum: [
        "Project Management Principles",
        "Project Life Cycles & Performance Domains",
        "5 Project Management Process Groups",
        "10 Project Management Knowledge Areas",
        "Inputs, Outputs, Tools and Techniques",
        "Agile & Hybrid Methodologies",
        "Exam Prep: Scenario-Based Simulator Practice & Question Banks"
      ],
      logistics: "Duration: 4 Weeks (Weekends) | Format: Virtual Live & Hybrid | Location: North America (NA) & Nigeria",
      investment: "CAPM: $549 | PMI-PBA: $599 | PMP: $699 (Excludes PMI Exam Fee)",
      examInfo: "Exam fees are paid directly to PMI. We assist with the PMP audit process and ensure your experience is mapped correctly to the PMI talent triangle."
    },
    sap: {
      id: 'cert-sap',
      title: "SAP Certification Path",
      subtitle: "Global Enterprise Resource Planning Certification",
      overview: "Validate your expertise in navigating, managing, and implementing SAP Enterprise Resource Planning (ERP) solutions. Equip yourself with the credentials needed to drive business operations globally.",
      curriculum: [
        "SAP System Navigation & Foundations",
        "Business Processes in SAP ERP",
        "Master Data Management",
        "Transaction Processing & Workflows",
        "Reporting, Analytics & Integration",
        "Exam Prep: Scenario-Based Simulator Practice & Question Banks"
      ],
      logistics: "Duration: 4 Weeks (4 Weekend Days) | Format: Virtual Live & Hybrid | Location: North America (NA) & Nigeria",
      investment: "$950 | ₦499,000 (Excludes SAP Exam Fee)",
      examInfo: "Exam fees are paid directly to SAP. We provide end-to-end guidance on the certification hub and exam preparation."
    }
  };

  const programCatalog = {
    'jr-ba': { group: 'Job Readiness (6 Weeks)', name: 'Business Analysis Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'jr-pm': { group: 'Job Readiness (6 Weeks)', name: 'Project Management Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'jr-prod': { group: 'Job Readiness (6 Weeks)', name: 'Product Management Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'jr-cm': { group: 'Job Readiness (6 Weeks)', name: 'Change Management Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'jr-sap': { group: 'Job Readiness (6 Weeks)', name: 'SAP ERP Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'jr-ai': { group: 'Job Readiness (6 Weeks)', name: 'AI & Automation Foundations', priceUSD: '$749', priceNGN: '₦449,000' },
    'cert-ecba': { group: 'IIBA Certifications (4 Weeks)', name: 'ECBA Certification Prep', priceUSD: '$449', priceNGN: '₦269,000' },
    'cert-ccba': { group: 'IIBA Certifications (4 Weeks)', name: 'CCBA Certification Prep', priceUSD: '$549', priceNGN: '₦329,000' },
    'cert-cbap': { group: 'IIBA Certifications (4 Weeks)', name: 'CBAP Certification Prep', priceUSD: '$649', priceNGN: '₦389,000' },
    'cert-capm': { group: 'PMI Certifications (4 Weeks)', name: 'CAPM Certification Boot Camp', priceUSD: '$549', priceNGN: '₦329,000' },
    'cert-pmi-pba': { group: 'PMI Certifications (4 Weeks)', name: 'PMI-PBA Certification Boot Camp', priceUSD: '$599', priceNGN: '₦359,000' },
    'cert-pmp': { group: 'PMI Certifications (4 Weeks)', name: 'PMP Certification Boot Camp', priceUSD: '$699', priceNGN: '₦419,000' },
    'cert-sap': { group: 'SAP Certifications (4 Weeks)', name: 'SAP Global Certification Prep', priceUSD: '$950', priceNGN: '₦499,000' }
  };

  const jobPostings = [
    { 
      id: 'pm', reqId: 'REQ-2601', title: 'Project Manager', type: 'Full-time', location: 'Remote (NA & Nigeria)', 
      desc: 'Lead complex enterprise transformation projects across our global client portfolio, ensuring strategic initiatives are delivered on time, within scope, and aligned with organizational goals.',
      resps: [
        'Define clear project scope, goals, and deliverables that support business objectives in collaboration with senior management.',
        'Develop comprehensive project plans, schedules, and associated communications documents.',
        'Effectively communicate project expectations to team members and stakeholders in a timely and clear fashion.',
        'Liaise with internal and external project stakeholders on an ongoing basis to ensure alignment.',
        'Estimate the resources and participants needed to achieve project goals successfully.',
        'Identify, track, and manage project dependencies and the critical path.',
        'Proactively manage changes in project scope, identify potential crises, and devise contingency plans.'
      ],
      reqs: [
        'Bachelor’s or Master’s degree in Business, Management, or related field.', 
        'Active PMP (Project Management Professional) Certification required.', 
        'Minimum 5 years of direct project management experience in enterprise environments.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'prod', reqId: 'REQ-2602', title: 'Product Manager', type: 'Full-time', location: 'Remote (NA & Nigeria)', 
      desc: 'Drive product strategy and execution for enterprise clients, bridging the gap between technical teams and business stakeholders to deliver high-value digital solutions.',
      resps: [
        'Define product vision, strategy, and roadmap tailored to enterprise client needs.',
        'Lead agile ceremonies (sprint planning, daily stand-ups, retrospectives) to ensure continuous delivery.',
        'Conduct deep user research and market analysis to identify pain points and opportunities.',
        'Manage and groom the product backlog, ensuring user stories are clearly defined and prioritized.',
        'Define and track key performance indicators (KPIs) to measure product success and adoption.'
      ],
      reqs: [
        'Bachelor’s degree in Business, IT, or related field.', 
        'CSPO (Certified Scrum Product Owner) or PSPO Certification required.', 
        'Experience navigating complex agile product environments and leading scrum teams.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'ops', reqId: 'REQ-2603', title: 'Head of Business Operations', type: 'Full-time', location: 'Hybrid', 
      desc: 'Oversee global operations and strategic alignment for Teechas, ensuring our internal processes are as optimized and transformative as the solutions we deliver to our clients.',
      resps: [
        'Develop and implement overarching operational strategies that align with Teechas’ global vision.',
        'Optimize internal processes across all departments to drive efficiency and scalability.',
        'Provide rigorous financial oversight, including budget management, forecasting, and P&L analysis.',
        'Establish and monitor cross-departmental KPIs to ensure organizational health and performance.',
        'Scale operations seamlessly across North America and African markets.'
      ],
      reqs: [
        'MBA or Master’s degree strongly preferred.', 
        '7+ years in operations management or top-tier consulting.', 
        'Exceptional financial acumen and strategic planning skills.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'ai', reqId: 'REQ-2604', title: 'AI Automation Analyst', type: 'Full-time', location: 'Remote', 
      desc: 'Assess, design, and implement AI workflows for enterprise clients, ensuring that generative AI and automation tools are seamlessly integrated with human processes.',
      resps: [
        'Identify high-impact opportunities for automation and AI integration within client operations.',
        'Conduct detailed process mapping to understand current-state workflows and friction points.',
        'Evaluate and recommend specific AI tools (LLMs, RPA, intelligent document processing).',
        'Design efficient prompts and structure logic for automated workflow solutions.',
        'Perform rigorous ROI and cost-benefit analysis on proposed technology investments.',
        'Collaborate with IT and InfoSec teams to ensure data privacy and security compliance.'
      ],
      reqs: [
        'Degree in Technology, Business, or Data Science.', 
        'Proven experience implementing LLMs and workflow automation in a corporate setting.', 
        'Strong analytical skills and systems-thinking approach.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'bizdev', reqId: 'REQ-2605', title: 'Business Development Associate', type: 'Full-time', location: 'Remote', 
      desc: 'Drive aggressive growth and client acquisition across target markets by positioning Teechas as the premier partner for enterprise transformation.',
      resps: [
        'Generate high-quality B2B leads through targeted outreach, networking, and market research.',
        'Manage and optimize the CRM pipeline from initial contact to contract closure.',
        'Create compelling pitch decks, proposals, and tailored transformation solutions for prospects.',
        'Conduct discovery meetings with C-suite executives to understand their organizational pain points.',
        'Conduct deep market research to identify emerging trends and new target sectors.'
      ],
      reqs: [
        'Bachelor’s degree in Business, Marketing, or Communications.', 
        '2+ years of proven B2B sales or business development experience.', 
        'Exceptional verbal and written executive communication skills.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'marketing', reqId: 'REQ-2606', title: 'Digital Marketing Strategist', type: 'Full-time', location: 'Remote', 
      desc: 'Manage and scale Teechas’ omnichannel marketing and brand presence, ensuring our thought leadership reaches the right executives globally.',
      resps: [
        'Develop and execute comprehensive omnichannel marketing strategies tailored to B2B consulting.',
        'Manage all corporate social media platforms (LinkedIn, Twitter, Instagram, YouTube).',
        'Lead SEO and SEM initiatives to drive organic and paid traffic to the Teechas platform.',
        'Develop and maintain a robust content calendar for Friday Insights, webinars, and whitepapers.',
        'Utilize analytics tools (GA4, HubSpot) to track campaign performance and report on ROI.'
      ],
      reqs: [
        'Bachelor’s degree in Marketing, Communications, or PR.', 
        'Demonstrated expertise in B2B social media management and digital campaign execution.', 
        'Strong analytical background with proficiency in SEO/SEM and marketing analytics.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    },
    { 
      id: 'intern', reqId: 'REQ-2607', title: 'Transformation Consultant Intern', type: 'Internship', location: 'Remote (NA & Nigeria)', 
      desc: 'A structured, high-growth program designed for ambitious individuals to gain hands-on experience in business analysis, project management, and enterprise transformation.',
      resps: [
        'Shadow senior consultants on active enterprise transformation projects and agile ceremonies.',
        'Assist in gathering requirements, process mapping, and drafting business requirement documents (BRDs).',
        'Support the project management office (PMO) in tracking milestones, risks, and project deliverables.',
        'Explore and map out Applied AI integrations for internal operational efficiency.',
        'Help maintain and groom product backlogs under the guidance of a Product Manager.',
        'Gain hands-on exposure to enterprise systems like SAP and modern AI workflow tools.'
      ],
      reqs: [
        'Currently pursuing or recently completed a Bachelor’s or Master’s degree in Business, Tech, or related field.', 
        'Strong foundational understanding of business operations and a deep curiosity for enterprise consulting.', 
        'Exceptional written and verbal communication skills for cross-functional collaboration.', 
        'Entrepreneurial mindset, strong leadership capabilities, and high adaptability.'
      ]
    }
  ];

  const openCourseModal = (courseKey) => {
    setSelectedCourse(courseData[courseKey]);
    setActiveModalTab('overview');
    setExpandedTrack(null);
    setActiveModal('course-details');
  };

  const openJobModal = (job) => {
    setSelectedJob(job);
    setActiveModal('job-details');
  };

  const selectedProgramData = programCatalog[enrollmentTrack];
  const isBenchmark = currentView === 'benchmark';

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth flex flex-col">
      {/* Navigation Header */}
      <header className="fixed w-full z-50 transition-all duration-300">
        {!isBenchmark && (
          <div className="bg-orange-500 text-white px-4 py-2.5 text-center text-sm font-medium relative z-[60]">
            Now Open: The 2027 State of Human-AI Project Delivery Benchmark. 
            <a href="#benchmark" onClick={() => setCurrentView('benchmark')} className="font-bold underline hover:text-black transition-colors ml-1 cursor-pointer">
              Take the 4-Minute Diagnostic
            </a>
          </div>
        )}
        <nav className={`w-full transition-all duration-300 ${(scrolled || isBenchmark) ? 'bg-white shadow-md py-3' : 'bg-black/90 backdrop-blur-sm py-5'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => scrollToSection(e, 'home')}>
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill={(scrolled || isBenchmark) ? "#000000" : "#FFFFFF"}/>
                  <path d="M5 10H35V16H23V35H17V16H5V10Z" fill={(scrolled || isBenchmark) ? "#FFFFFF" : "#000000"}/>
                  <circle cx="28" cy="13" r="4" fill="#F97316" />
                </svg>
                <span className={`text-xl font-bold tracking-tight ${(scrolled || isBenchmark) ? 'text-gray-900' : 'text-white'}`}>
                  Teechas<span className="text-orange-500">.</span>
                </span>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={`text-sm font-medium hover:text-orange-500 transition-colors ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>Home</a>
                <a href="#who-we-are" onClick={(e) => scrollToSection(e, 'who-we-are')} className={`text-sm font-medium hover:text-orange-500 transition-colors ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>Who We Are</a>
                
                <div className="relative group">
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className={`flex items-center gap-1 text-sm font-medium hover:text-orange-500 transition-colors py-2 ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>
                    What We Do <ChevronDown size={14} />
                  </a>
                  <div className="absolute top-full left-0 mt-0 w-72 bg-white shadow-xl rounded-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    {services.map(service => (
                      <button key={service} onClick={(e) => handleServiceDropdownClick(e, service)} className="w-full text-left block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-50 last:border-0">
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <a href="#insights" onClick={(e) => scrollToSection(e, 'insights')} className={`text-sm font-medium hover:text-orange-500 transition-colors ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>Insights</a>
                <a href="#events" onClick={(e) => scrollToSection(e, 'events')} className={`text-sm font-medium hover:text-orange-500 transition-colors ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>Events</a>
                <a href="#careers" onClick={(e) => scrollToSection(e, 'careers')} className={`text-sm font-medium hover:text-orange-500 transition-colors ${(scrolled || isBenchmark) ? 'text-gray-700' : 'text-gray-200'}`}>Careers</a>
                
                <button 
                  onClick={() => setActiveModal('contact')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-lg shadow-orange-500/30"
                >
                  Contact Us
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${(scrolled || isBenchmark) ? 'text-gray-900' : 'text-white'}`}>
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 px-4 flex flex-col h-screen">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">Home</a>
              <a href="#who-we-are" onClick={(e) => scrollToSection(e, 'who-we-are')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">Who We Are</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">What We Do</a>
              <a href="#insights" onClick={(e) => scrollToSection(e, 'insights')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">Insights</a>
              <a href="#events" onClick={(e) => scrollToSection(e, 'events')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">Events</a>
              <a href="#careers" onClick={(e) => scrollToSection(e, 'careers')} className="text-gray-800 font-medium py-3 border-b border-gray-50 px-2">Careers</a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setActiveModal('contact'); }}
                className="mt-4 bg-orange-500 text-white px-4 py-3 rounded-md font-semibold text-center w-full"
              >
                Contact Us
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Conditionally Render Benchmark or Home */}
      {isBenchmark ? (
        <BenchmarkPage />
      ) : (
        <main className="flex-1">
          {}
          <section id="home" className="relative pt-36 pb-20 lg:pt-52 lg:pb-32 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/40 via-black to-black"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-20 mask-image-linear-right"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
              <div className="max-w-3xl">
                <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-medium text-sm mb-6">
                  Transforming Enterprises Globally
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
                  Integrating Principles, Processes, Technology, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">People</span> to Drive True Transformation.
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
                  We don't just deploy solutions; we install adoption. Bridging the gap between business strategy, digital transformation, and human readiness through our Integrated Transformation Framework.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setActiveModal('contact')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                    Speak to an Advisor <ArrowRight size={20} />
                  </button>
                  <button onClick={(e) => scrollToSection(e, 'services')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-md font-semibold text-lg transition-colors text-center backdrop-blur-sm">
                    Explore Our Services
                  </button>
                </div>
              </div>
            </div>
          </section>

          {}
          <div className="bg-white border-b border-gray-100 py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
              <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">Trusted by organizations we've empowered</p>
            </div>
            <div className="relative flex overflow-x-hidden">
              <div className="animate-marquee flex items-center whitespace-nowrap">
                {[...clientLogos, ...clientLogos].map((client, index) => (
                  <div key={index} className="flex items-center mx-8">
                    {client.textOnly ? (
                      <span className="text-2xl font-bold text-gray-800 px-4">{client.name}</span>
                    ) : (
                      <div className="w-48 h-16 flex items-center justify-center transition-all duration-300 rounded-xl overflow-hidden px-4">
                        <img src={client.src} alt={client.name} className="max-w-full max-h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100" />
                      </div>
                    )}
                    <div className="w-2 h-2 rounded-full bg-orange-500 mx-8 shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <section id="who-we-are" className="py-24 bg-gray-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">Who We Are</h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Empowering Enterprises to Turn Vision into Execution</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Founded in 2019, Teechas Consulting was born out of a critical observation: enterprises were spending millions on technology but failing to realize the ROI because they ignored the people using it.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We operate at the intersection of business strategy and digital transformation. We deliver comprehensive Business and Technology Solutions. We don't just deploy solutions; we install adoption.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-orange-500">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="text-orange-500" size={20}/> Our Vision
                      </h4>
                      <p className="text-gray-600">To be the premier global transformation partner, seamlessly integrating human intelligence with cutting-edge technology and business strategy.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-black">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="text-black" size={20}/> Our Mission
                      </h4>
                      <p className="text-gray-600">To empower organizations by providing the operational frameworks and embedded leadership required to turn complex technological investments into measurable business value.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Diverse Corporate Team Collaborating" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-black text-white p-6 md:p-8 rounded-xl shadow-2xl max-w-[280px] md:max-w-xs border border-gray-800">
                    <p className="text-3xl font-bold text-orange-500 mb-2">100%</p>
                    <p className="text-sm font-medium leading-relaxed text-gray-300">Focus on integrating business solutions and digital strategy with human adoption.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-black rounded-2xl p-8 lg:p-12 shadow-2xl">
                <div className="lg:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-gray-800">
                  <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="block relative aspect-video">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 to-transparent">
                      <PlayCircle size={64} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <h4 className="text-2xl font-bold text-white mb-2 relative z-10">Why Your ERP Implementation is Failing</h4>
                      <span className="text-orange-500 font-semibold flex items-center gap-2 relative z-10">Watch on YouTube <ArrowRight size={16}/></span>
                    </div>
                  </a>
                </div>
                <div className="lg:col-span-1 flex flex-col justify-center">
                  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
                        <Youtube size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">@TeechasHub</h4>
                        <p className="text-sm text-gray-400">Weekly Strategy & Transformation Insights</p>
                      </div>
                    </div>
                    <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="block w-full bg-white hover:bg-gray-100 text-black text-center py-3 rounded-lg font-bold transition-colors">
                      Subscribe to our Channel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">Our Methodology</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Adaptive Hub Framework</h3>
                <p className="text-gray-600 text-lg">
                  A proprietary consulting matrix that ensures no business solution, strategic initiative, or digital transformation is deployed without equal investment in the human capital required to operate it.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative p-8 md:p-12 bg-[#111827] rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center min-h-[400px] border border-gray-800">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/50 via-[#111827] to-[#111827]"></div>
                   
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-700/50 z-0"></div>
                   <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-700/50 z-0"></div>

                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(249,115,22,0.4)] border-4 border-[#111827] rotate-45 group hover:scale-105 transition-transform duration-500">
                      <div className="-rotate-45 flex flex-col items-center">
                         <div className="bg-white rounded-md p-1.5 mb-1 shadow-sm flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="40" height="40" rx="8" fill="#FFFFFF"/>
                              <path d="M5 10H35V16H23V35H17V16H5V10Z" fill="#000000"/>
                              <circle cx="28" cy="13" r="4" fill="#F97316" />
                            </svg>
                         </div>
                         <span className="text-white font-extrabold text-center leading-[1.1] text-[9px] tracking-widest uppercase">Adaptive<br/>Hub</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-12 sm:gap-16 relative z-10 w-full max-w-lg">
                      <div className="flex flex-col items-start pr-4 pb-4">
                         <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center mb-3 border border-orange-500/30 shadow-inner">
                            <Briefcase size={20}/>
                         </div>
                         <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1">Business Strategy</h4>
                         <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Alignment & Vision</p>
                      </div>
                      
                      <div className="flex flex-col items-start pl-4 pb-4">
                         <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-3 border border-blue-500/30 shadow-inner">
                            <FileText size={20}/>
                         </div>
                         <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1">Agile Execution</h4>
                         <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Project Management</p>
                      </div>

                      <div className="flex flex-col items-start pr-4 pt-4">
                         <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-3 border border-emerald-500/30 shadow-inner">
                            <Users size={20}/>
                         </div>
                         <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1">Human Readiness</h4>
                         <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Change & Culture</p>
                      </div>

                      <div className="flex flex-col items-start pl-4 pt-4">
                         <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-3 border border-purple-500/30 shadow-inner">
                            <Award size={20}/>
                         </div>
                         <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1">Digital Innovation</h4>
                         <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Systems & Data</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg">
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The AI Readiness & Change Audit</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Before you invest millions in Enterprise AI, Core Business Systems, or broad Digital Transformation initiatives, you must know your baseline. Our flagship diagnostic tool assesses your organization across four critical pillars:
                  </p>
                  <ul className="space-y-6 mb-8">
                    <li className="flex items-start gap-4">
                      <div className="mt-1"><CheckCircle2 size={24} className="text-orange-500"/></div>
                      <div>
                        <strong className="block text-gray-900">Strategic Alignment</strong>
                        <span className="text-sm text-gray-600">Is leadership unified on the 'Why'?</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1"><CheckCircle2 size={24} className="text-orange-500"/></div>
                      <div>
                        <strong className="block text-gray-900">Technical Architecture</strong>
                        <span className="text-sm text-gray-600">Is your data infrastructure prepared for the shift?</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1"><CheckCircle2 size={24} className="text-orange-500"/></div>
                      <div>
                        <strong className="block text-gray-900">Cultural Friction</strong>
                        <span className="text-sm text-gray-600">Where will the internal resistance come from?</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1"><CheckCircle2 size={24} className="text-orange-500"/></div>
                      <div>
                        <strong className="block text-gray-900">Competency Gaps</strong>
                        <span className="text-sm text-gray-600">What upskilling is required for Day 1 productivity?</span>
                      </div>
                    </li>
                  </ul>
                  <button onClick={() => setActiveModal('contact')} className="w-full bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-md font-bold transition-colors">
                    Request a Diagnostic Audit
                  </button>
                </div>
              </div>
            </div>
          </section>

          {}
          <section id="services" className="py-24 bg-white border-t border-gray-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">What We Do</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Core Expertise</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gray-50 p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 border-t-4 border-t-black">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Strategy Alignment & Execution</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">Designing the roadmap for enterprise growth. We bridge the gap between executive vision and operational reality, incorporating comprehensive change management, advisory, and ongoing strategy assessments.</p>
                  <button onClick={() => { setSelectedService("Strategy Alignment & Execution"); setActiveModal('service-details'); }} className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-2">
                    Learn how it works <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="bg-gray-50 p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 border-t-4 border-t-orange-500">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Transformation</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">Executing innovative solutions based on organizational needs. We drive deep adoption through collaborative frameworks and rigorous post-deployment assessments to ensure high ROI.</p>
                  <button onClick={() => { setSelectedService("Enterprise Transformation"); setActiveModal('service-details'); }} className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-2">
                    Learn how it works <ArrowRight size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 border-t-4 border-t-black">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Digital Transformation & Enablement</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">Providing comprehensive technology assessments and business solutions. We implement full systems (AI, SAP, ERP) and align them directly with the human intelligence required to operate them efficiently.</p>
                  <button onClick={() => { setSelectedService("Digital Transformation & Enablement"); setActiveModal('service-details'); }} className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-2">
                    Learn how it works <ArrowRight size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 border-t-4 border-t-orange-500">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Training & Talent Solutions</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">Building transformation squads. We offer custom corporate tracks, rigorous individual certifications, and premium talent supply or staff augmentation to inject embedded leadership into your teams.</p>
                  <button onClick={() => { setSelectedService("Training & Talent Solutions"); setActiveModal('service-details'); }} className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-2">
                    Learn how it works <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div id="fractional" className="bg-black rounded-2xl p-10 text-center text-white shadow-2xl relative overflow-hidden scroll-mt-24">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Looking for Embedded Leadership?</h4>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
                  Through our <span className="text-white font-semibold border-b border-orange-500">Fractional & Embedded Consulting</span> arm, we inject Senior Transformation Leadership directly into your organization without the overhead of a full-time executive hire. 
                </p>
                <button onClick={() => setActiveModal('contact')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors relative z-10 shadow-lg shadow-orange-500/20">
                  Enquire About Talent Supply
                </button>
              </div>
            </div>
          </section>

          {}
          <section className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">Capacity Building</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Equipping the Next Generation of Change Agents</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
                        <Users size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Individual Track</h3>
                    </div>

                    <div className="mb-10">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Job Readiness Programs</h4>
                      <p className="text-sm text-gray-500 mb-4">Equips you with foundation skills, hands-on training, and habits to enter and grow in a role. (6 Weeks)</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Business Analysis</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Project Management</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Product Management</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Change Management</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Enterprise Resource Planning (ERP) - SAP</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> Artificial Intelligence (AI)</li>
                      </ul>
                      <button onClick={() => openCourseModal('jobReadiness')} className="text-orange-500 font-medium text-sm flex items-center gap-1 hover:text-orange-600 transition-colors">
                        View Readiness Curriculum <ArrowRight size={16} />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Certification Programs</h4>
                      <p className="text-sm text-gray-500 mb-4">Validates your expertise in a particular role or profession. Exam prep included. (4 Weeks / Weekends)</p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> IIBA Certifications (ECBA, CCBA, CBAP)</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> PMI Certifications (CAPM, PMP, PMI-PBA)</li>
                        <li className="flex items-center gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-orange-500"/> SAP Certifications</li>
                      </ul>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                        <button onClick={() => openCourseModal('iiba')} className="border border-orange-400 text-orange-600 rounded-lg py-2 text-sm font-semibold hover:bg-orange-50 transition-colors">View IIBA</button>
                        <button onClick={() => openCourseModal('pmi')} className="border border-orange-400 text-orange-600 rounded-lg py-2 text-sm font-semibold hover:bg-orange-50 transition-colors">View PMI</button>
                        <button onClick={() => openCourseModal('sap')} className="border border-orange-400 text-orange-600 rounded-lg py-2 text-sm font-semibold hover:bg-orange-50 transition-colors">View SAP</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0">
                        <Briefcase size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Corporate Track</h3>
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Tailored organizational training designed to upskill your teams, align cross-functional departments, and drive business solutions. Available in flexible formats (Onsite, Hybrid, Virtual).
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">Business & Soft Skills</h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> Leadership & Executive Presence</li>
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> Change Management for Leaders</li>
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> Project Management for Non-PMs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">Technical & Finance</h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> Enterprise Bookkeeping</li>
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> Corporate Taxation Fundamentals</li>
                          <li className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle2 size={16} className="text-gray-400"/> AI for Business Operations</li>
                        </ul>
                      </div>
                    </div>
                    <button onClick={() => setActiveModal('contact')} className="w-full mt-10 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-colors">
                      Request Corporate Brochure
                    </button>
                  </div>
                </div>
              </div>

              {}
              <div id="events" className="mt-10 scroll-mt-24">
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                    <div className="bg-orange-500 p-6 flex items-center gap-3">
                        <Video className="text-white" size={24}/>
                        <h3 className="text-xl font-bold text-white">Upcoming Webinars</h3>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply opacity-50 z-0"></div>
                        <div className="relative z-10 max-w-3xl">
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Free Masterclass</span>
                            <h4 className="font-bold text-gray-900 text-xl md:text-2xl mb-2">Mastering Enterprise AI Adoption: The Human Element</h4>
                            <p className="text-gray-600 text-sm md:text-base mb-5 leading-relaxed">Join our lead transformation strategists as we unpack why most AI implementations fail at the adoption layer, and how to build an Adaptive Hub for your enterprise.</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium border-t border-gray-100 pt-4">
                              <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-500"/> Oct 15, 2026 | 11:00 AM EST</span>
                              <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14}/> Zoom Live</span>
                            </div>
                        </div>
                        <div className="shrink-0 flex flex-col gap-3 relative z-10 w-full md:w-auto">
                            <button onClick={() => setActiveModal('webinar-details')} className="bg-black text-white hover:bg-gray-800 px-8 py-3.5 rounded-lg font-bold transition-colors w-full text-center shadow-lg whitespace-nowrap">Reserve Your Seat</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                  <div className="bg-black p-6 flex items-center gap-3">
                    <Calendar className="text-orange-500" size={24}/>
                    <h3 className="text-xl font-bold text-white">Upcoming Training Schedule</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    <div className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">CBAP Certification Prep</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-500"/> Oct 17 - Nov 07, 2026</span>
                          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14}/> Virtual Live</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold shrink-0">Open</span>
                        <button onClick={() => { setEnrollmentTrack('cert-cbap'); setActiveModal('enrollment'); }} className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-bold transition-colors">Enroll</button>
                      </div>
                    </div>

                    <div className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">PMP Certification Boot Camp</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-500"/> Oct 24 - Nov 14, 2026</span>
                          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14}/> Hybrid</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-xs font-bold shrink-0">Limited</span>
                        <button onClick={() => { setEnrollmentTrack('cert-pmp'); setActiveModal('enrollment'); }} className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-bold transition-colors">Enroll</button>
                      </div>
                    </div>

                    <div className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Job Readiness: Business Analysis</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-500"/> Nov 02 - Dec 11, 2026</span>
                          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14}/> Virtual Live</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold shrink-0">Open</span>
                        <button onClick={() => { setEnrollmentTrack('jr-ba'); setActiveModal('enrollment'); }} className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-bold transition-colors">Enroll</button>
                      </div>
                    </div>

                    <div className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Job Readiness: SAP ERP Foundations</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-orange-500"/> Nov 02 - Dec 11, 2026</span>
                          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><MapPin size={14}/> Virtual Live</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold shrink-0">Open</span>
                        <button onClick={() => { setEnrollmentTrack('jr-sap'); setActiveModal('enrollment'); }} className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg font-bold transition-colors">Enroll</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">On-Demand Masterclasses</h3>
                            <p className="text-sm text-gray-500 mt-1">Catch up on our previous enterprise strategy sessions.</p>
                        </div>
                        <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
                            <Youtube size={18}/> View All on YouTube
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-lg transition-all flex flex-col sm:flex-row h-full">
                            <div className="w-full sm:w-2/5 aspect-video bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative shrink-0">
                                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                     <PlayCircle size={36} className="text-white drop-shadow-md group-hover:scale-110 transition-transform"/>
                                 </div>
                            </div>
                            <div className="p-5 sm:w-3/5 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-orange-500 transition-colors leading-snug">The ROI of Business Analysis in Agile Transformations</h4>
                                <p className="text-xs text-gray-500 font-medium">Recorded: August 2026</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-lg transition-all flex flex-col sm:flex-row h-full">
                            <div className="w-full sm:w-2/5 aspect-video bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative shrink-0">
                                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                     <PlayCircle size={36} className="text-white drop-shadow-md group-hover:scale-110 transition-transform"/>
                                 </div>
                            </div>
                            <div className="p-5 sm:w-3/5 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-orange-500 transition-colors leading-snug">Change Management: Overcoming ERP Resistance</h4>
                                <p className="text-xs text-gray-500 font-medium">Recorded: July 2026</p>
                            </div>
                        </a>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {}
          <section id="insights" className="py-24 bg-white border-t border-gray-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">Teechas Insights</h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Transformation Post-Mortems</h3>
                  <p className="text-gray-600 mt-4">Every Friday, we break down the friction points between enterprise technology and human adoption.</p>
                </div>
                <div className="shrink-0">
                   <a href="https://www.linkedin.com/company/teechas/" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold hover:text-orange-600 flex items-center gap-2 transition-colors">
                     View All Insights <ArrowRight size={20} />
                   </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/5 h-64 lg:h-auto bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
                <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Friday Insight</span>
                    <span className="text-gray-400 text-sm font-medium">September 25, 2026</span>
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Why 70% of Agentic AI Workflows Fail the "Culture Test"</h4>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    Companies are spending millions deploying autonomous AI agents expecting immediate operational ROI. But they are missing the crucial Integration Layer. If your human workforce doesn't trust the AI's outputs, the system becomes an expensive paperweight. 
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <button onClick={() => setActiveModal('contact')} className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md font-bold transition-colors">
                      Run an AI Readiness Audit
                    </button>
                    <a href="https://www.linkedin.com/company/teechas/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors border border-blue-600 px-6 py-3 rounded-md">
                      Continue discussion on LinkedIn <ArrowRight size={16}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          <section id="careers" className="py-24 bg-gray-50 border-t border-gray-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-3">Careers</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Network of Change Agents</h3>
                <p className="text-gray-600 text-lg">We are always looking for top-tier practitioners to join our global roster of expert facilitators and consultants.</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8 lg:p-12 border border-orange-100 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Are you an industry expert?</h4>
                  <p className="text-gray-700">
                    Share your knowledge in Business Analysis, Project Management, Product Management, Change Management, AI, or SAP with professionals across the globe. Join the Teechas Faculty.
                  </p>
                </div>
                <button onClick={() => setActiveModal('facilitator')} className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap px-8 py-4 rounded-md font-bold transition-colors shadow-lg">
                  Become a Facilitator
                </button>
              </div>

              <h4 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Open Positions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {jobPostings.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">{job.reqId}</span>
                        <h5 className="font-bold text-lg text-gray-900">{job.title}</h5>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded shrink-0">{job.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14}/> {job.location}</p>
                    <button onClick={() => openJobModal(job)} className="text-orange-500 font-semibold text-sm hover:text-orange-600 flex items-center gap-1">
                      View Role & Apply <ArrowRight size={16}/>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="text-center text-gray-600 text-sm bg-white py-6 rounded-xl border border-gray-200 shadow-sm">
                Don't see a position that fits? Send your resume to <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:careers@teechas.com'; }} className="text-orange-500 font-bold hover:underline">careers@teechas.com</a>
              </div>
            </div>
          </section>
        </main>
      )}

      {}
      <footer className="bg-black pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 flex items-center justify-center mt-1">
                  <rect width="40" height="40" rx="8" fill="#000000" stroke="#333333" strokeWidth="1"/>
                  <path d="M5 10H35V16H23V35H17V16H5V10Z" fill="#FFFFFF"/>
                  <circle cx="28" cy="13" r="4" fill="#F97316" />
                </svg>
                <span className="text-2xl font-bold tracking-tight text-white leading-none flex items-center">
                  Teechas<span className="text-orange-500">.</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Integrating business strategy and digital transformation with the human side of change. We build the Adaptive Hub for modern enterprises.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/teechas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">in</a>
                <a href="https://x.com/teechas1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">X</a>
                <a href="https://www.instagram.com/teechas1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-colors">IG</a>
                <a href="https://www.youtube.com/@TeechasHub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-colors"><Youtube size={18}/></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={(e) => scrollToSection(e, 'services')} className="hover:text-orange-500 transition-colors text-left">Strategy Alignment</button></li>
                <li><button onClick={(e) => scrollToSection(e, 'services')} className="hover:text-orange-500 transition-colors text-left">Enterprise Transformation</button></li>
                <li><button onClick={(e) => scrollToSection(e, 'services')} className="hover:text-orange-500 transition-colors text-left">Digital Enablement</button></li>
                <li><button onClick={(e) => scrollToSection(e, 'services')} className="hover:text-orange-500 transition-colors text-left">Training & Talent Solutions</button></li>
                <li><button onClick={(e) => scrollToSection(e, 'fractional')} className="hover:text-orange-500 transition-colors text-left">Fractional Services</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Locations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> North America (NA)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Nigeria</li>
                <li className="mt-4"><a href="#" onClick={(e) => { e.preventDefault(); window.location.href = 'mailto:info@teechas.com'; }} className="text-white hover:text-orange-500 font-medium">info@teechas.com</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-xs text-gray-400 mb-4">Get our Friday Insights delivered directly to your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <div className="flex">
                    <input type="email" placeholder="Email address" required className="bg-gray-900 text-white text-sm px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-r-md text-sm font-bold hover:bg-orange-600 transition-colors">Join</button>
                </div>
                {newsletterStatus === 'success' && (
                  <span className="text-green-500 text-xs font-medium flex items-center gap-1"><CheckCircle2 size={12}/> Success! You've been added.</span>
                )}
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Teechas LLC (North America) | Teechas Consulting Ltd (Nigeria). All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button onClick={openLegalModal} className="hover:text-white cursor-pointer">Privacy Policy</button>
              <button onClick={openLegalModal} className="hover:text-white cursor-pointer">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* General Success/Alert Modal for Premium Routing */}
      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl relative text-center border-t-4 border-t-orange-500">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{successMessage.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{successMessage.body}</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Return to Site
              </button>
           </div>
        </div>
      )}

      {/* Content Modals */}
      {activeModal && !showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
            <button 
              onClick={() => { setActiveModal(null); setSelectedCourse(null); setSelectedJob(null); setExpandedTrack(null); setEnrollmentTrack(''); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-gray-100 p-1 rounded-full"
            >
              <X size={24} />
            </button>

            {activeModal === 'webinar-details' && (
              <div className="p-0 flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
                <div className="bg-orange-50 p-8 md:p-10 md:w-5/12 border-b md:border-b-0 md:border-r border-orange-100 flex flex-col justify-center">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-4 self-start">Free Masterclass</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">Mastering Enterprise AI Adoption</h3>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                            <Clock className="text-orange-500 shrink-0 mt-0.5" size={16}/>
                            <p><strong>Date:</strong> October 15, 2026<br/>11:00 AM EST</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin className="text-orange-500 shrink-0 mt-0.5" size={16}/>
                            <p><strong>Location:</strong> Secure Zoom Link</p>
                        </div>
                        <div className="flex items-start gap-2 border-t border-orange-200 pt-4 mt-4">
                            <BookOpen className="text-orange-500 shrink-0 mt-0.5" size={16}/>
                            <p className="leading-relaxed">Learn how to build trust, map friction points, and integrate intelligent workflows without disrupting your human workforce.</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-8 md:p-10 md:w-7/12">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Reserve Your Seat</h4>
                    <p className="text-xs text-gray-500 mb-6">Enter your details below to receive the calendar invite and secure Zoom link.</p>
                    
                    <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'webinar')}>
                      <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                      <input type="hidden" name="subject" value="New Webinar Registration" />

                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="First Name" placeholder="First Name" required className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                        <input type="text" name="Last Name" placeholder="Last Name" required className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                      </div>
                      <input type="email" name="Email" placeholder="Corporate Email Address" required className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                      <input type="text" name="Job Title" placeholder="Job Title / Role" required className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                      <input type="text" name="Company Name" placeholder="Company Name" required className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                      
                      <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors mt-6 shadow-lg">
                        Complete Registration
                      </button>
                    </form>
                </div>
              </div>
            )}

            {activeModal === 'course-details' && selectedCourse && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Program Details</h3>
                </div>

                <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                  <button onClick={() => setActiveModalTab('overview')} className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors ${activeModalTab === 'overview' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-800'}`}>Overview</button>
                  <button onClick={() => setActiveModalTab('curriculum')} className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors ${activeModalTab === 'curriculum' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-800'}`}>Curriculum</button>
                  <button onClick={() => setActiveModalTab('logistics')} className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors ${activeModalTab === 'logistics' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-800'}`}>Logistics</button>
                  {selectedCourse.examInfo && (
                    <button onClick={() => setActiveModalTab('exam')} className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors ${activeModalTab === 'exam' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-800'}`}>Exam</button>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h4>
                  <p className="text-sm font-bold text-orange-500 mt-1">{selectedCourse.subtitle}</p>
                </div>

                <div className="mb-8">
                  {activeModalTab === 'overview' && (
                    <div className="bg-orange-50 p-6 rounded-lg text-sm text-gray-700 leading-relaxed border border-orange-100">
                      {selectedCourse.overview}
                    </div>
                  )}

                  {activeModalTab === 'curriculum' && (
                    <div className="space-y-3">
                      {typeof selectedCourse.curriculum[0] === 'object' ? (
                        selectedCourse.curriculum.map((item, i) => (
                          <div key={i} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                            <button 
                              onClick={() => setExpandedTrack(expandedTrack === i ? null : i)} 
                              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                            >
                              <span className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                <BookOpen size={16} className="text-orange-500 shrink-0"/> {item.track}
                              </span>
                              {expandedTrack === i ? <Minus size={18} className="text-gray-500"/> : <Plus size={18} className="text-gray-500"/>}
                            </button>
                            {expandedTrack === i && (
                              <div className="p-4 border-t border-gray-100 bg-white">
                                <ul className="space-y-3">
                                  {item.modules.map((mod, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2 leading-relaxed">
                                      <CheckCircle2 size={16} className="text-orange-500 mt-0.5 shrink-0"/>
                                      {mod}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        selectedCourse.curriculum.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-800">
                            <BookOpen size={16} className="text-orange-500 shrink-0"/>
                            {i + 1}. {item}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeModalTab === 'logistics' && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-sm font-medium text-gray-800 flex items-start gap-3">
                      <MapPin className="text-orange-500 shrink-0 mt-0.5" size={18}/>
                      <p>{selectedCourse.logistics}</p>
                    </div>
                  )}

                  {activeModalTab === 'exam' && selectedCourse.examInfo && (
                    <div className="bg-black p-6 rounded-lg text-white">
                      <h4 className="flex items-center gap-2 font-bold mb-3 text-sm">
                        <CheckCircle2 className="text-orange-500" size={20}/> Certification & Outcome Information
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{selectedCourse.examInfo}</p>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
                    <span className="text-sm font-bold text-gray-600">Program Investment:</span>
                    <span className="font-bold text-gray-900">{selectedCourse.investment}</span>
                  </div>
                  <button onClick={() => { 
                    if (selectedCourse.id === 'jr-ba') setEnrollmentTrack('jr-ba');
                    else if (selectedCourse.id === 'cert-cbap') setEnrollmentTrack('cert-cbap');
                    else if (selectedCourse.id === 'cert-pmp') setEnrollmentTrack('cert-pmp');
                    else if (selectedCourse.id === 'cert-sap') setEnrollmentTrack('cert-sap');
                    setActiveModal('enrollment'); 
                  }} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                    Register & Proceed to Checkout <ArrowRight size={18}/>
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'job-details' && selectedJob && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-6">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">Job ID: {selectedJob.reqId}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">{selectedJob.type}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {selectedJob.location}</span>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">About the Role / Responsibilities</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedJob.desc}</p>
                    <ul className="space-y-3">
                      {selectedJob.resps.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5"/>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">What We're Looking For (Qualifications)</h4>
                    <ul className="space-y-3">
                      {selectedJob.reqs.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5"/>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-auto">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm">Apply for this role</h4>
                  <p className="text-sm text-gray-600 mb-4">To apply, please email your resume and a brief cover letter directly to our hiring team.</p>
                  <a 
                    href={`mailto:careers@teechas.com?subject=Application: ${selectedJob.reqId} - ${selectedJob.title}`}
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    Email Resume to Apply <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Speak to an Advisor</h3>
                <p className="text-gray-500 text-sm mb-6">Fill out the form below and a transformation specialist will be in touch shortly.</p>
                <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'contact')}>
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                  <input type="hidden" name="subject" value="New Website Lead: Teechas Consulting" />

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="First Name" placeholder="First Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm" />
                    <input type="text" name="Last Name" placeholder="Last Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm" />
                  </div>
                  <input type="email" name="Email" placeholder="Corporate Email Address" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm" />
                  <select name="Interest Area" defaultValue="" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm text-gray-700 bg-white">
                    <option value="" disabled>What specific area are you enquiring about?</option>
                    <option value="adaptive-hub">The Adaptive Hub Diagnostic Audit</option>
                    <option value="strategy">Strategy Alignment & Execution</option>
                    <option value="enterprise">Enterprise Transformation</option>
                    <option value="digital">Digital Transformation & Enablement</option>
                    <option value="training-corp">Corporate Training & Talent Solutions</option>
                    <option value="training-ind">Individual Certification Programs</option>
                    <option value="fractional">Fractional Services / Embedded Leadership</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea name="Message" placeholder="Tell us about your current organizational challenge..." rows="4" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm resize-none"></textarea>
                  
                  <div className="flex items-start gap-3 mt-4">
                    <input type="checkbox" id="privacy" name="Privacy Consent" value="Agreed" className="mt-1 border-gray-300 rounded text-orange-500 focus:ring-orange-500" required />
                    <label htmlFor="privacy" className="text-xs text-gray-500">
                      I consent to Teechas processing my personal data to handle my enquiry and communicate with me in accordance with the Privacy Policy.
                    </label>
                  </div>

                  <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors mt-4 shadow-lg">
                    Submit Enquiry
                  </button>
                </form>
              </div>
            )}

            {activeModal === 'enrollment' && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Enrollment</h3>
                <p className="text-gray-500 text-sm mb-6">Select your track and billing region to reserve your seat in the cohort.</p>
                
                <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'enrollment')}>
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                  <input type="hidden" name="subject" value="New Course Enrollment Pending" />
                  <input type="hidden" name="Program Selected" value={selectedProgramData ? selectedProgramData.name : 'Unspecified Program'} />
                  
                  <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 mb-6">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Selected Program</label>
                    <select 
                      name="Program Selected Dropdown"
                      value={enrollmentTrack} 
                      onChange={(e) => setEnrollmentTrack(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:border-orange-500 text-sm bg-white font-bold text-gray-900 mb-3 shadow-sm"
                      required
                    >
                      <option value="" disabled>Choose a program...</option>
                      <optgroup label="Job Readiness (6 Weeks)">
                        <option value="jr-ba">Business Analysis Foundations</option>
                        <option value="jr-pm">Project Management Foundations</option>
                        <option value="jr-prod">Product Management Foundations</option>
                        <option value="jr-cm">Change Management Foundations</option>
                        <option value="jr-sap">SAP ERP Foundations</option>
                        <option value="jr-ai">AI & Automation Foundations</option>
                      </optgroup>
                      <optgroup label="IIBA Certifications (4 Weeks)">
                        <option value="cert-ecba">ECBA Certification Prep</option>
                        <option value="cert-ccba">CCBA Certification Prep</option>
                        <option value="cert-cbap">CBAP Certification Prep</option>
                      </optgroup>
                      <optgroup label="PMI Certifications (4 Weeks)">
                        <option value="cert-capm">CAPM Certification Boot Camp</option>
                        <option value="cert-pmi-pba">PMI-PBA Certification Boot Camp</option>
                        <option value="cert-pmp">PMP Certification Boot Camp</option>
                      </optgroup>
                      <optgroup label="SAP Certifications">
                        <option value="cert-sap">SAP Global Certification Prep</option>
                      </optgroup>
                    </select>

                    {selectedProgramData && (
                      <div className="flex justify-between items-center bg-white p-3 rounded border border-orange-100 mt-2">
                        <span className="text-sm text-gray-600 font-medium">Corporate Investment:</span>
                        <span className="text-lg font-bold text-gray-900">
                          {selectedProgramData.priceUSD} <span className="text-sm font-normal text-gray-500">| {selectedProgramData.priceNGN}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="First Name" placeholder="First Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                    <input type="text" name="Last Name" placeholder="Last Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="Email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                    <input type="tel" name="Phone" placeholder="Phone Number" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1 mt-2">Billing Region (Determines Currency)</label>
                    <select name="Billing Region" defaultValue="" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 text-sm bg-white">
                      <option value="" disabled>Select Region</option>
                      <option value="na">North America (USD)</option>
                      <option value="ng">Nigeria (NGN)</option>
                      <option value="other">Other International (USD)</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-lg transition-colors mt-6 flex justify-center items-center gap-2 shadow-lg">
                    Request Invoice & Reserve Seat <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {activeModal === 'facilitator' && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join the Teechas Faculty</h3>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mt-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Please email us your resume and include your area of expertise, prior training experience, why you want to teach, and your location in the body of the email.
                  </p>
                  <a 
                    href="mailto:careers@teechas.com?subject=Facilitator Application"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    Email Application <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            )}
            
            {activeModal === 'service-details' && (
              <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedService}</h3>
                
                {selectedService === "Strategy Alignment & Execution" && (
                  <div className="text-gray-600 space-y-4 mb-8 text-sm">
                    <p>We bridge the gap between executive vision and operational reality. Our comprehensive approach incorporates strategic advisory, change management, and ongoing strategy assessments to ensure your long-term goals are met.</p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Executive Strategy Workshops</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Comprehensive Change Management Advisory</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Ongoing Baseline Assessments</li>
                    </ul>
                  </div>
                )}

                {selectedService === "Enterprise Transformation" && (
                  <div className="text-gray-600 space-y-4 mb-8 text-sm">
                    <p>Executing innovative solutions based on organizational needs. We drive deep adoption through collaborative frameworks and rigorous post-deployment assessments to ensure high ROI.</p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Change Management as a Service (CMaaS)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Needs-based Solution Execution</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Post-Deployment Audits & Optimizations</li>
                    </ul>
                  </div>
                )}

                {selectedService === "Digital Transformation & Enablement" && (
                  <div className="text-gray-600 space-y-4 mb-8 text-sm">
                    <p>Providing comprehensive technology assessments and business solutions. We implement full systems (AI, SAP, ERP) and align them directly with the human intelligence required to operate them efficiently.</p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Enterprise Tech & AI Assessments</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Seamless Systems Implementation</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Process Automation & Enablement</li>
                    </ul>
                  </div>
                )}

                {selectedService === "Training & Talent Solutions" && (
                  <div className="text-gray-600 space-y-4 mb-8 text-sm">
                    <p>Building transformation squads. We offer custom corporate tracks, rigorous individual certifications, and premium talent supply or staff augmentation to inject embedded leadership into your teams.</p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Corporate Upskilling & Bootcamps</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Global Certification Preparation</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Talent Supply & Staff Augmentation</li>
                    </ul>
                  </div>
                )}

                <button onClick={() => { setActiveModal('contact'); }} className="w-full bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition-colors shadow-lg">Speak to an Advisor</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
