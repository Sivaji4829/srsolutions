import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Cpu, 
  Network, 
  Wrench, 
  Gamepad2, 
  HardDrive, 
  Search, 
  Menu, 
  X, 
  Check, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight,
  MessageCircle,
  Award,
  Users,
  ShieldCheck,
  Zap,
  Tag,
  Star,
  Send,
  Eye,
  Instagram,
  Map as MapIcon
} from 'lucide-react';

// --- Data Constants ---

const SERVICES = [
  {
    id: 1,
    title: "CCTV Installation",
    category: "Security",
    description: "High-definition surveillance systems for homes and commercial complexes with remote monitoring.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Computer Sales & Service",
    category: "IT Hardware",
    description: "Sales of premium laptops/desktops and expert hardware repair services with genuine parts.",
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "Wi-Fi & LAN Networking",
    category: "Connectivity",
    description: "Robust enterprise-grade network setups, fiber splicing, and high-speed Wi-Fi coverage.",
    icon: <Network className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Annual Maintenance (AMC)",
    category: "Support",
    description: "Comprehensive care for your IT infrastructure with scheduled visits and emergency support.",
    icon: <Wrench className="w-8 h-8" />,
  },
  {
    id: 5,
    title: "Gaming PC Build",
    category: "Performance",
    description: "Custom-liquid cooled rigs designed for professional gamers and content creators.",
    icon: <Gamepad2 className="w-8 h-8" />,
  },
  {
    id: 6,
    title: "Storage & RAM Upgrade",
    category: "Upgrades",
    description: "Instant performance boosts with high-speed NVMe SSDs and high-frequency RAM modules.",
    icon: <HardDrive className="w-8 h-8" />,
  }
];

const PACKAGES = [
  { id: 1, cameras: 1, price: "7,250", dvr: "4CH", storage: "500GB", popular: false },
  { id: 2, cameras: 2, price: "8,850", dvr: "4CH", storage: "500GB", popular: false },
  { id: 4, cameras: 4, price: "12,000", dvr: "4CH", storage: "500GB", popular: true },
  { id: 5, cameras: 5, price: "14,700", dvr: "8CH", storage: "500GB", popular: false },
  { id: 6, cameras: 6, price: "16,200", dvr: "8CH", storage: "500GB", popular: false },
  { id: 8, cameras: 8, price: "19,500", dvr: "8CH", storage: "500GB", popular: false },
];

const PRODUCTS = [
  {
    id: 'p1',
    name: "Complete 4-Ch CCTV Kit",
    brand: "Hikvision / CP Plus",
    specs: ["4x 2MP Cameras", "4-Ch DVR", "500GB HDD"],
    price: "12,500",
    img: "/hikvison.png"
  },
  {
    id: 'p2',
    name: "8GB DDR4 Laptop RAM",
    brand: "Crucial / Kingston",
    specs: ["3200MHz", "SODIMM", "Lifetime Warranty"],
    price: "2,200",
    img: "/kingston.png"
  },
  {
    id: 'p3',
    name: "Wi-Fi 6 Router",
    brand: "TP-Link / d-link",
    specs: ["Dual Band", "AX1500", "High Gain Antennas"],
    price: "4,500",
    img: "/tplinkdlink.png"
  },
  {
    id: 'p4',
    name: "512GB NVMe SSD",
    brand: "Western Digital",
    specs: ["Gen3 x4", "3500MB/s Read", "5-Year Warranty"],
    price: "3,100",
    img: "/nvm.png"
  }
];

const WORKS = [
  { title: "RVR College Lab", category: "Educational Infrastructure", img: "/rvr.jpeg" },
  { title: "ADHILAKSHMI NURSING HOME", category: "Healthcare Security", img: "/adi.avif" },
  { title: "MADHURI LAB", category: "Diagnostic & Lab IT", img: "/madh.avif" },
  { title: "Solar CC Camera Installations", category: "Eco-Friendly Security", img: "/solar.jpg" },
  { title: "Human detection tracking and siren cc cameras", category: "AI Advanced Surveillance", img: "/ahud.jpg" }
];

// --- Sub-Components ---

const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="mb-14 text-center relative z-10 px-4">
    <div className={`inline-block py-1 px-3 rounded-md mb-4 text-xs font-bold tracking-[0.2em] uppercase ${light ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>
      Quality You Can Trust
    </div>
    <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
    {subtitle && <p className={`max-w-2xl mx-auto text-base md:text-xl leading-relaxed font-medium ${light ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
  </div>
);

const WhatsAppLink = ({ children, className }) => (
  <a 
    href="https://wa.me/918885404540" 
    target="_blank" 
    rel="noopener noreferrer" 
    className={className}
  >
    {children}
  </a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [orderDetails, setOrderDetails] = useState({ name: '', address: '' });

  // Map View State
  const [mapType, setMapType] = useState('map'); // 'map' or 'street'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Logic
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return { services: [], products: [] };
    const query = searchQuery.toLowerCase();
    return {
      services: SERVICES.filter(s => s.title.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)),
      products: PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query))
    };
  }, [searchQuery]);

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const openOrderModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!orderDetails.name || !orderDetails.address) return;

    const message = `Hello SR Solutions, I would like to order the ${selectedPackage.cameras} Camera CCTV Package.
    
Customer Name: ${orderDetails.name}
Installation Address: ${orderDetails.address}

Please contact me for the confirmation.`;

    const whatsappUrl = `https://wa.me/918885404540?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOrderModalOpen(false);
    setOrderDetails({ name: '', address: '' });
  };

  // Logic to direct to the specific product or service item
  const handleSuggestionClick = (elementId) => {
    setSearchQuery('');
    setShowSearchResults(false);
    setIsMenuOpen(false);
    
    // Use a small delay to ensure the menu closing transition doesn't interfere
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Add a temporary highlight effect to the target item
        element.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50');
        }, 2000);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* --- Order Modal --- */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOrderModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-8 md:p-12 animate-in zoom-in-95 duration-300">
            <button 
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
              onClick={() => setIsOrderModalOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Complete Your Order</h3>
              <p className="text-slate-500 font-medium">Ordering: <span className="text-blue-600">{selectedPackage?.cameras} Camera Package</span></p>
            </div>
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                  value={orderDetails.name}
                  onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Installation Address</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Enter complete address"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-blue-500 transition-all resize-none"
                  value={orderDetails.address}
                  onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20"
              >
                <Send size={20} />
                Confirm on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Header --- */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-xl shadow-sm border-b border-slate-100 py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer shrink-0">
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                <img src="/favicon.png" alt="Logo" className="w-10 h-10 object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
                <Shield className="hidden text-blue-800 w-10 h-10" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900">SR SOLUTIONS</span>
                <span className="text-[9px] font-black text-blue-600 tracking-[0.3em] uppercase">CCTV & IT SOLUTIONS • EST. 2012</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              <div className="flex items-center gap-6 xl:gap-10 text-sm font-bold text-slate-600">
                {['Home', 'Services', 'Packages', 'Products', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors relative group py-2">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </a>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex items-center gap-2 bg-slate-100/80 px-4 py-2.5 rounded-2xl border border-slate-200/50 focus-within:border-blue-400 focus-within:bg-white transition-all shadow-inner">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search items..." 
                      className="bg-transparent border-none outline-none text-sm w-32 xl:w-48 placeholder:text-slate-400 font-medium" 
                      value={searchQuery}
                      onChange={(e) => {setSearchQuery(e.target.value); setShowSearchResults(true)}}
                      onFocus={() => setShowSearchResults(true)}
                      onBlur={handleSearchBlur}
                    />
                  </div>

                  {/* Search Results Dropdown (Desktop) */}
                  {showSearchResults && (searchQuery.trim().length > 0) && (
                    <div className="absolute top-full right-0 mt-3 w-80 bg-white shadow-2xl rounded-3xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
                        {filteredResults.services.length === 0 && filteredResults.products.length === 0 ? (
                          <div className="text-center py-6 text-slate-400 text-sm italic">No results found</div>
                        ) : (
                          <>
                            {filteredResults.services.length > 0 && (
                              <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Services</h4>
                                {filteredResults.services.map(s => (
                                  <button 
                                    key={s.id} 
                                    onClick={() => handleSuggestionClick(`service-${s.id}`)} 
                                    className="w-full text-left block p-3 rounded-2xl hover:bg-blue-50 transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="text-blue-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                                      <div>
                                        <div className="text-sm font-bold text-slate-900">{s.title}</div>
                                        <div className="text-[10px] text-slate-500">{s.category}</div>
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                            {filteredResults.products.length > 0 && (
                              <div className="pt-2 border-t border-slate-50">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Products</h4>
                                {filteredResults.products.map(p => (
                                  <button 
                                    key={p.id} 
                                    onClick={() => handleSuggestionClick(`product-${p.id}`)} 
                                    className="w-full text-left block p-3 rounded-2xl hover:bg-blue-50 transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <img src={p.img} className="w-8 h-8 rounded-lg object-cover" />
                                      <div>
                                        <div className="text-sm font-bold text-slate-900">{p.name}</div>
                                        <div className="text-[10px] text-slate-500">₹{p.price}</div>
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <WhatsAppLink className="bg-slate-900 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Quote</span>
                </WhatsAppLink>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 top-0 h-screen bg-white z-[90] transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex flex-col p-8 pt-24 gap-4 h-full overflow-hidden">
              <div className="relative mb-2">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Search services or products..." 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-base font-medium outline-none focus:bg-white focus:border-blue-400 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 
                 {/* Mobile Search Suggestions Inline */}
                 {searchQuery.trim().length > 0 && (
                   <div className="mt-2 bg-slate-50 rounded-2xl max-h-[30vh] overflow-y-auto border border-slate-100">
                      {filteredResults.services.map(s => (
                        <button key={s.id} onClick={() => handleSuggestionClick(`service-${s.id}`)} className="w-full text-left p-4 border-b border-white flex items-center gap-3">
                          <div className="text-blue-600 scale-75">{s.icon}</div>
                          <span className="text-sm font-bold">{s.title}</span>
                        </button>
                      ))}
                      {filteredResults.products.map(p => (
                        <button key={p.id} onClick={() => handleSuggestionClick(`product-${p.id}`)} className="w-full text-left p-4 border-b border-white flex items-center gap-3">
                          <img src={p.img} className="w-6 h-6 rounded object-cover" />
                          <span className="text-sm font-bold">{p.name}</span>
                        </button>
                      ))}
                      {filteredResults.services.length === 0 && filteredResults.products.length === 0 && (
                        <div className="p-4 text-xs text-slate-400 italic">No items found</div>
                      )}
                   </div>
                 )}
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto flex-grow pb-4 mt-4">
                {['Home', 'Services', 'Packages', 'Products', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="py-4 px-6 text-xl font-black text-slate-800 border-b border-slate-50 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
                    {item}
                    <ChevronRight size={20} className="text-blue-500" />
                  </a>
                ))}
              </div>
              
              <WhatsAppLink className="bg-blue-600 text-white py-5 rounded-3xl text-center flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-blue-600/20 mb-10">
                <MessageCircle className="w-6 h-6" />
                Connect on WhatsApp
              </WhatsAppLink>
            </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-52 md:pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-2/5 h-full bg-blue-50/50 -z-10 rounded-l-[120px] hidden lg:block"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-5 py-2 rounded-full text-xs md:text-sm font-black mb-8 border border-blue-200/50 animate-fade-in">
                <ShieldCheck className="w-4 h-4" />
                <span className="tracking-widest uppercase">Certified Security Professionals</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                Your Security, <br />
                <span className="text-blue-600 italic font-serif">Our Responsibility.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed font-medium">
                Professional CCTV, Networking & Computer Solutions in Guntur Since 2012. Protecting homes, businesses, and institutions with advanced technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <WhatsAppLink className="w-full sm:w-auto bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-slate-900/10 hover:-translate-y-1">
                  Book Free Site Visit
                  <ArrowRight className="w-5 h-5" />
                </WhatsAppLink>
                <a href="#packages" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center transition-all">
                  View Packages
                </a>
              </div>
              
              <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2">
                   <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                   <span className="text-sm font-black text-slate-900 tracking-tight">TOP RATED IN GUNTUR</span>
                </div>
                <img src="/hikvision.png" alt="Hikvision" className="h-4 md:h-5" />
                <img src="/tp-link.png" alt="TP-Link" className="h-6 md:h-7" />
              </div>
            </div>
            
            <div className="flex-1 relative w-full max-w-2xl">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white">
                <img 
                  src="/logo.jpeg" 
                  alt="Security Installation" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 right-4 md:-right-10 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl z-20 flex flex-col items-center border border-slate-100 animate-bounce-slow">
                 <div className="text-4xl md:text-5xl font-black text-blue-600 mb-1 leading-none">14+</div>
                 <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Years Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Premium Solutions" 
            subtitle="Industry-leading IT and surveillance expertise tailored for your modern requirements."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                id={`service-${service.id}`}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all group hover:-translate-y-2 relative overflow-hidden duration-500"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                    {service.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight">{service.title}</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium">{service.description}</p>
                    <WhatsAppLink className="inline-flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-3 transition-all">
                    GET A FREE QUOTE <ArrowRight size={16} />
                    </WhatsAppLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About / Owner Section --- */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
            <div className="lg:w-1/2 relative flex justify-center">
               <div className="relative w-full max-w-md">
                  <div className="absolute -inset-6 bg-slate-100 rounded-[4rem] rotate-3 -z-10"></div>
                  <div className="absolute -inset-6 bg-blue-50 rounded-[4rem] -rotate-3 -z-10"></div>
                  <img 
                    src="/own.jpg" 
                    alt="Owner" 
                    className="rounded-[3.5rem] shadow-2xl w-full object-cover aspect-[4/5] bg-slate-200"
                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"}
                  />
                  <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl hidden md:block border border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                        <span className="text-sm font-black text-slate-900 tracking-widest uppercase">Available Now</span>
                    </div>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-blue-600/10 text-blue-700 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs py-1 px-4 rounded-full inline-block mb-6">Expert Professional</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">The Name You Can <span className="text-blue-600">Trust Since 2012.</span></h2>
              <div className="relative mb-12">
                <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium italic border-l-8 border-blue-600 pl-8 py-2">
                    "At SR Solutions, we don't just sell equipment; we sell peace of mind. Every home or business we secure is a priority for us. We guarantee reliable support and the latest technology for all our clients."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                  <Users size={24} className="text-blue-600 mb-3" />
                  <div className="text-3xl font-black text-slate-900 mb-1">3000+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Happy Clients</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                  <ShieldCheck size={24} className="text-blue-600 mb-3" />
                  <div className="text-3xl font-black text-slate-900 mb-1">100%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Quality</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                  <WhatsAppLink className="flex-1 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-center flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                    <Phone size={20} />
                    Call 8885404540
                  </WhatsAppLink>
                  <a href={`mailto:srsguntur1231@gmail.com`} className="flex-1 bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-[2rem] font-black text-center flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <Mail size={20} className="text-blue-600" />
                    Email Us
                  </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section id="packages" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle 
            light 
            title="CCTV All-In-One Packages" 
            subtitle="Transparent pricing. Zero hidden costs. High-end hardware with professional installation."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`group relative bg-white rounded-[3.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 ${pkg.popular ? 'ring-8 ring-blue-600/20' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase px-6 py-3 rounded-bl-3xl tracking-widest z-20">
                    Best Seller
                  </div>
                )}
                <div className="p-10 md:p-12">
                  <div className="text-blue-600 font-black uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Tag size={12} /> SECURE HOME
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-8 leading-tight">{pkg.cameras} CAM <br/><span className="text-blue-600">PREMIUM KIT</span></h3>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-slate-900 text-6xl font-black tracking-tighter">₹{pkg.price}</span>
                    <span className="text-slate-400 font-bold text-sm uppercase">Complete</span>
                  </div>
                  
                  <ul className="space-y-6 mb-12">
                    {[
                        `${pkg.cameras}x 2MP Night-Vision Cameras`,
                        `${pkg.dvr} Smart Hybrid DVR`,
                        `${pkg.storage} Surveillance HDD`,
                        `Mobile App Setup Included`,
                        `Full Technical Support`
                    ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-600 text-sm font-bold">
                            <div className="bg-blue-50 text-blue-600 p-1 rounded-full mt-0.5 shrink-0"><Check size={14} strokeWidth={4} /></div>
                            <span>{feature}</span>
                        </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => openOrderModal(pkg)}
                    className={`w-full py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all shadow-xl ${pkg.popular ? 'bg-blue-600 text-white hover:bg-slate-900' : 'bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white'}`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 border border-white/10 max-w-5xl mx-auto text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div>
                    <h4 className="font-black text-blue-500 uppercase tracking-widest text-xs mb-3">Custom Requirements?</h4>
                    <p className="text-slate-300 text-lg font-medium">We design custom solutions for Malls, Apartments, and Schools.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-[10px] md:text-xs font-black text-white/60 tracking-widest">
                    <span className="bg-white/10 px-4 py-3 rounded-2xl">INST: ₹450/CAM</span>
                    <span className="bg-white/10 px-4 py-3 rounded-2xl">CABLE: ₹15/M</span>
                    <span className="bg-white/10 px-4 py-3 rounded-2xl">GENUINE BILL</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Products Section --- */}
      <section id="products" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Premium Hardware" 
            subtitle="Original parts, high performance, and full manufacturer warranty. We stock only the best."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRODUCTS.map((prod) => (
              <div 
                key={prod.id} 
                id={`product-${prod.id}`}
                className="group flex flex-col bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden bg-white m-3 rounded-[2.5rem]">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest text-center shadow-lg">
                    {prod.brand}
                  </div>
                </div>
                <div className="p-8 pt-4 flex flex-col flex-grow">
                  <h3 className="font-black text-slate-900 mb-4 text-xl leading-tight">{prod.name}</h3>
                  <div className="space-y-3 mb-8 flex-grow">
                    {prod.specs.map((s, idx) => (
                      <div key={idx} className="text-[11px] font-bold text-slate-500 flex items-center gap-3 uppercase tracking-tight">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></div> {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200/50">
                    <span className="text-2xl font-black text-blue-600">₹{prod.price}</span>
                    <WhatsAppLink className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg">
                      <MessageCircle size={20} />
                    </WhatsAppLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Works Section --- */}
      <section id="works" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Latest Installations" 
            subtitle="Explore our recent professional security and networking projects across Guntur."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKS.map((work, i) => (
              <div key={i} className="group relative h-[450px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{work.category}</span>
                  <h4 className="text-white text-2xl font-black leading-tight mb-2">{work.title}</h4>
                  <div className="h-1 w-0 group-hover:w-16 bg-blue-500 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Google Map & Contact Section --- */}
      <section id="location" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Find Our Office" 
            subtitle="Visit us for a live demo of our security systems and high-performance computing setups."
          />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
             <div className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  Guntur Head Office
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="bg-white p-4 rounded-2xl shrink-0 shadow-sm border border-slate-100"><MapPin className="text-blue-600" size={28} /></div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Address</div>
                      <div className="text-lg text-slate-700 font-bold leading-relaxed">
                        Door No 2 B, Main Road 6th Line, <br/>
                        Nallacheruvu, Guntur - 522003 <br/>
                        <span className="text-blue-600 text-sm font-black uppercase tracking-tighter">(Beside SBI ATM)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-white p-4 rounded-2xl shrink-0 shadow-sm border border-slate-100"><Phone className="text-blue-600" size={28} /></div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Contact Support</div>
                      <div className="text-2xl text-slate-900 font-black">8885404540</div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-white p-4 rounded-2xl shrink-0 shadow-sm border border-slate-100"><Clock className="text-blue-600" size={28} /></div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Working Hours</div>
                      <div className="space-y-1">
                        <div className="text-lg text-slate-700 font-bold">Mon - Sat: 9:00 AM to 10:00 PM</div>
                        <div className="text-sm text-red-600 font-black flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                           SUNDAY CLOSED
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="relative group">
                <div className="h-[450px] md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                  {mapType === 'map' ? (
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6534570415516!2d80.4410598!3d16.2854591!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75662d059d8f%3A0x2125e36836bf62e0!2sSR%20SOLUTIONS%20%26%20CCTV!5e0!3m2!1sen!2sin!4v1706600000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    ></iframe>
                  ) : (
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!4v1706600000000!6m8!1m7!1sIdORhbQzEMXDBX_ffyU7lA!2m2!1d16.2854139!2d80.4410666!3f27.32!4f-1.946!5f0.7820865974627469"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy"
                      title="Street View 3D"
                    ></iframe>
                  )}
                </div>

                {/* Map View Switcher */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/50 z-20">
                    <button 
                      onClick={() => setMapType('map')}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${mapType === 'map' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      <MapIcon size={16} />
                      LOCATION MAP
                    </button>
                    <button 
                      onClick={() => setMapType('street')}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${mapType === 'street' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      <Eye size={16} />
                      STORE FRONT (3D)
                    </button>
                </div>

                {/* Expand Button */}
                <a 
                  href="https://maps.app.goo.gl/uu3d2gdADHjCHQkt8" 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute bottom-8 right-8 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl hover:bg-blue-600 transition-all z-20 group"
                  title="Open in Google Maps"
                >
                  <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="contact" className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 -mr-64 -mt-64"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-16 xl:gap-24 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-white p-1 rounded-xl">
                   <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
                   <Shield className="hidden text-blue-800 w-10 h-10" />
                </div>
                <span className="font-black text-3xl tracking-tighter">SR SOLUTIONS</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                Premier Security & IT partners in Guntur. Specializing in high-end CCTV and networking since 2012.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/sr_solutions_cctv/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-pink-600 rounded-2xl flex items-center justify-center transition-all cursor-pointer group border border-white/5 shadow-sm">
                  <Instagram size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <WhatsAppLink className="w-12 h-12 bg-white/5 hover:bg-[#25D366] rounded-2xl flex items-center justify-center transition-all cursor-pointer group border border-white/5 shadow-sm">
                  <MessageCircle size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                </WhatsAppLink>
                <a href="mailto:srsguntur1231@gmail.com" className="w-12 h-12 bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-all cursor-pointer group border border-white/5 shadow-sm">
                  <Mail size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-black mb-10 text-blue-500 uppercase tracking-[0.3em] text-xs">Navigation</h4>
              <ul className="space-y-6 text-slate-400 text-base font-bold">
                <li><a href="#services" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> CCTV Security</a></li>
                <li><a href="#services" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> IT Networking</a></li>
                <li><a href="#packages" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Smart Packages</a></li>
                <li><a href="#about" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> About Owner</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-10 text-blue-500 uppercase tracking-[0.3em] text-xs">Reach Us</h4>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <div className="bg-blue-600/20 p-3 rounded-2xl shrink-0"><MapPin className="text-blue-500" size={24} /></div>
                  <div className="text-base text-slate-400 font-medium leading-relaxed">
                    Door No 2 B, Main Road 6th Line, <br/>
                    Nallacheruvu, Guntur - 522003 <br/>
                    (Beside SBI ATM)
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="bg-blue-600/20 p-3 rounded-2xl shrink-0"><Phone className="text-blue-500" size={24} /></div>
                  <div className="text-lg text-white font-black tracking-tight">8885404540</div>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 flex flex-col items-center text-center">
              <Mail className="text-blue-500 mb-6" size={40} />
              <h4 className="font-black mb-4 text-white text-xl tracking-tight break-all">srsguntur1231@gmail.com</h4>
              <p className="text-xs text-slate-400 mb-10 leading-relaxed font-bold uppercase tracking-widest">Available for Business 24/7</p>
              <WhatsAppLink className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white w-full py-5 rounded-3xl font-black flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/20">
                <MessageCircle size={20} />
                WhatsApp Us
              </WhatsAppLink>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <p>© 2026 SR SOLUTIONS & CCTV. GUNTUR'S PREMIER CHOICE.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button - Sized down and explicitly WhatsApp themed */}
      <WhatsAppLink className="fixed bottom-6 right-6 z-[110] bg-[#25D366] text-white p-4.5 rounded-full shadow-[0_20px_60px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all animate-bounce-slow flex items-center justify-center border-4 border-white/20">
        <MessageCircle size={28} className="fill-white" />
        <span className="absolute -top-1 -left-1 bg-red-600 text-[9px] font-black px-2 py-0.5 rounded-full ring-2 ring-white shadow-lg animate-pulse">LIVE</span>
      </WhatsAppLink>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-8%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        .animate-fade-in {
            animation: fadeIn 1.2s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}} />
    </div>
  );
}

const ExternalLink = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);