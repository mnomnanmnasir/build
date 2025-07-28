import { useState } from 'react'
import { 
  Building2, 
  Globe, 
  TrendingUp, 
  Shield, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  BarChart3,
  Landmark,
  Briefcase,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import './App.css'

interface TeamMember {
  name: string;
  title: string;
  photo: string;
  credentials?: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface Project {
  title: string;
  location: string;
  value: string;
  description: string;
  image: string;
  status: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Gareth Wiggan",
    title: "Director & Co-Founder",
    photo: "/images/team/gareth-wiggan.jpg",
    description: "Leading strategist in infrastructure financing and cross-border project development with over 15 years of experience in structuring complex financial instruments."
  },
  {
    name: "Professor Hélyette Geman",
    title: "Senior Financial Officer",
    photo: "/images/team/helyette-geman.jpg",
    credentials: "Financial Engineer of the Year 2022, Research Professor at Johns Hopkins University",
    description: "World-renowned expert in financial engineering and commodity markets, bringing academic rigor and practical expertise to complex securitization projects."
  },
  {
    name: "Dr. D.K. MacFadden",
    title: "Medical Director & Innovation Specialist",
    photo: "/images/team/dk-macfadden.png",
    description: "Innovative specialist combining medical sector expertise with financial engineering to develop unique insurance-linked securities and risk management solutions."
  }
];

const services: Service[] = [
  {
    title: "Large-scale Infrastructure Financing",
    description: "Structuring investments for major infrastructure projects worldwide with sophisticated financial instruments.",
    icon: <Building2 className="w-8 h-8" />,
    features: ["Multi-billion dollar project structuring", "Sovereign-level partnerships", "Cross-border financing solutions", "Public-private partnerships"]
  },
  {
    title: "Asset Securitization",
    description: "Converting illiquid assets into tradable securities using advanced insurance-backed models.",
    icon: <BarChart3 className="w-8 h-8" />,
    features: ["Insurance-backed securitization", "SPV structuring", "Credit enhancement", "Rating optimization"]
  },
  {
    title: "Insurance-Linked Securities",
    description: "Advanced insurance products for infrastructure project financing and risk transfer.",
    icon: <Shield className="w-8 h-8" />,
    features: ["Catastrophe bonds", "Parametric insurance", "Political risk coverage", "Performance bonds"]
  },
  {
    title: "Cooperative-based Land Aggregation",
    description: "Engineering large land banks through agricultural cooperatives for sustainable development.",
    icon: <Globe className="w-8 h-8" />,
    features: ["66.8M hectare portfolio", "Agricultural cooperative structures", "Sustainable development", "Land value optimization"]
  }
];

const projects: Project[] = [
  {
    title: "Julius Nyerere International Airport Expansion",
    location: "Tanzania",
    value: "$20 Billion",
    description: "Structured financing for major airport infrastructure expansion project",
    image: "/images/projects/infrastructure-skyline.jpg",
    status: "Completed"
  },
  {
    title: "Shimoni Integrated Port Joint Venture",
    location: "Kenya",
    value: "$500 Million",
    description: "30-year joint venture project for integrated port development",
    image: "/images/projects/commercial-development.jpg",
    status: "Active"
  },
  {
    title: "Housing Securitization Program",
    location: "Multi-jurisdictional",
    value: "$2.5 Billion",
    description: "Innovative housing finance securitization with insurance backing",
    image: "/images/projects/housing-securitization.webp",
    status: "Development"
  },
  {
    title: "Infrastructure Construction Financing",
    location: "International",
    value: "$1.8 Billion",
    description: "Multi-stage construction financing with completion guarantees",
    image: "/images/projects/construction-financing.jpg",
    status: "Active"
  }
];

const insuranceProducts = [
  "Credit Default Insurance",
  "Performance Bonds", 
  "Completion Insurance",
  "Political Risk Insurance",
  "Parametric Insurance",
  "Insurance-Linked Securities (ILS)",
  "Catastrophe Bonds",
  "Professional Indemnity Insurance",
  "Keyman Insurance"
];

const securitizationPillars = [
  {
    title: "Engineering Predictability",
    description: "Taming revenue stream uncertainty through sophisticated modeling and risk analysis",
    icon: <Target className="w-12 h-12" />
  },
  {
    title: "Forging Securability", 
    description: "Creating clean legal claims via Special Purpose Vehicles and structured transactions",
    icon: <Landmark className="w-12 h-12" />
  },
  {
    title: "Imposing Standardization",
    description: "ISIN codes, credit ratings, and standardized documentation for market accessibility",
    icon: <CheckCircle className="w-12 h-12" />
  }
];

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectDetails: string;
}

function App() {
  const [activeService, setActiveService] = useState(0);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch('https://oyxeclmrvifjalpyfsnr.supabase.co/functions/v1/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm)
      });
  
      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setSubmitMessage('Thank you for your inquiry! We will contact you within 24 hours.');
        setContactForm({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          projectDetails: ''
        });
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(result.error?.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-lg flex items-center justify-center">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-800 leading-tight">FE Corporation</h1>
                <p className="text-sm text-navy-600">Financial Engineering Corporation</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('team')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                Team
              </button>
              <button onClick={() => scrollToSection('services')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('methodology')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                Methodology
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium">
                Contact
              </button>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-financial-pattern opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gold-100 text-gold-800 rounded-full text-sm font-semibold mb-6">
                Toronto, Canada • Est. 2015
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Financial
              <span className="block text-gold-400">Alchemy</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed">
              Transforming Assets into Global Opportunities
            </p>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              We engineer the predictable, securable, and standardized financial instruments that power tomorrow's infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                Our Expertise
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                View Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-800 mb-8">About FE Corporation</h2>
            <p className="text-2xl text-navy-600 max-w-4xl mx-auto leading-relaxed">
              We are the architects of capital market transformation, specializing in the alchemy that converts illiquid, real-world assets into predictable, securable, and standardized financial instruments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-navy-800 mb-6">Our Mission</h3>
              <p className="text-lg text-navy-600 mb-6 leading-relaxed">
                Financial Engineering Corporation represents the pinnacle of sophisticated financial structuring. Based in Toronto, Canada, we bridge the gap between complex real-world assets and global capital markets through innovative engineering solutions.
              </p>
              <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                Our approach combines deep technical expertise with practical market knowledge, enabling us to structure transactions that seemed impossible just years ago.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-600" />
                  <span className="text-navy-700 font-medium">Insurance-backed securitization expertise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-600" />
                  <span className="text-navy-700 font-medium">Multi-jurisdictional regulatory navigation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-600" />
                  <span className="text-navy-700 font-medium">Sovereign-level partnership structuring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-600" />
                  <span className="text-navy-700 font-medium">Infrastructure project financing</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-navy-50 to-gold-50 p-8 rounded-2xl border border-navy-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-navy-800 mb-2">$25B+</div>
                    <div className="text-navy-600 font-medium">Assets Structured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-navy-800 mb-2">50+</div>
                    <div className="text-navy-600 font-medium">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-navy-800 mb-2">15+</div>
                    <div className="text-navy-600 font-medium">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-navy-800 mb-2">AAA</div>
                    <div className="text-navy-600 font-medium">Credit Ratings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-50 to-gold-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-800 mb-8">Leadership Team</h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              World-class expertise in financial engineering, combining academic rigor with practical market experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-navy-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gold-200 shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-navy-800 mb-2">{member.name}</h3>
                  <div className="text-lg font-semibold text-gold-600 mb-4">{member.title}</div>
                  
                  {member.credentials && (
                    <div className="bg-gold-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-gold-800">{member.credentials}</p>
                    </div>
                  )}
                  
                  <p className="text-navy-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-800 mb-8">Core Services & Expertise</h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">
              Comprehensive financial engineering solutions for complex infrastructure and asset securitization projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    activeService === index 
                      ? 'border-gold-500 bg-gold-50' 
                      : 'border-navy-200 bg-white hover:border-gold-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      activeService === index ? 'text-gold-600' : 'text-navy-600'
                    }`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-800">{service.title}</h3>
                      <p className="text-navy-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-navy-50 to-gold-50 p-8 rounded-2xl border border-navy-200">
              <div className="mb-6">
                <div className="p-4 bg-gold-100 rounded-lg inline-block mb-4">
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-bold text-navy-800 mb-4">{services[activeService].title}</h3>
                <p className="text-lg text-navy-600 mb-6">{services[activeService].description}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-navy-800 mb-4">Key Features:</h4>
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gold-600" />
                    <span className="text-navy-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Solutions */}
      <section id="insurance" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Insurance Solutions</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive insurance products designed for complex financial structures and infrastructure projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insuranceProducts.map((product, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-gold-400" />
                  <span className="text-lg font-semibold">{product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-800 mb-8">Project Portfolio</h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">
              Landmark infrastructure and securitization projects that demonstrate our expertise in complex financial structuring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl border border-navy-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl font-bold">{project.value}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-800 mb-2">{project.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span className="text-navy-600">{project.location}</span>
                  </div>
                  <p className="text-navy-600 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Engineering Methodology */}
      <section id="methodology" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold-50 to-navy-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-navy-800 mb-8">Three Pillars of Securitization</h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">
              Our proven methodology for transforming complex assets into standardized, tradeable financial instruments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securitizationPillars.map((pillar, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-navy-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex p-4 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl mb-6">
                  <div className="text-gold-600">{pillar.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-navy-800 mb-4">{pillar.title}</h3>
                <p className="text-navy-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-xl border border-navy-100">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-navy-800 mb-6">Global Reach & Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-600 mb-2">66.8M</div>
                  <div className="text-navy-600 font-medium">Hectares Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-600 mb-2">15+</div>
                  <div className="text-navy-600 font-medium">International Markets</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-600 mb-2">$25B+</div>
                  <div className="text-navy-600 font-medium">Total Transaction Value</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-600 mb-2">25%</div>
                  <div className="text-navy-600 font-medium">LTV Ratio Improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Partner With Us</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ready to transform your assets into global opportunities? Let's discuss how FE Corporation can engineer your next financial breakthrough.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Headquarters</div>
                    <div className="text-white/80">325 Front Street, Suite 300, Toronto, Ontario, M5V-2Y1</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-white/80">+1–416-623-6345</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/80">inquiries@fecorporation.ca</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-xl font-bold mb-4">Areas of Expertise</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Infrastructure Financing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Asset Securitization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Insurance-Linked Securities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Cross-Border Structuring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Regulatory Navigation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-400" />
                    <span className="text-sm">Risk Management</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Start a Conversation</h3>
              
              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${
                  submitSuccess 
                    ? 'bg-green-100 border border-green-300 text-green-800' 
                    : 'bg-red-100 border border-red-300 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleContactFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={contactForm.firstName}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={contactForm.lastName}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                    placeholder="john.doe@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input 
                    type="text" 
                    name="company"
                    value={contactForm.company}
                    onChange={handleContactFormChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Project Details *</label>
                  <textarea 
                    rows={4}
                    name="projectDetails"
                    value={contactForm.projectDetails}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-gold-400"
                    placeholder="Tell us about your project or financing needs..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700'
                  } text-white`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">FE Corporation</h3>
                <p className="text-white/60">Financial Engineering Corporation</p>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <p className="text-white/60 mb-4">
                © 2025 Financial Engineering Corporation. All rights reserved.
              </p>
              <p className="text-white/40 text-sm">
                Transforming assets into global opportunities through sophisticated financial engineering.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
