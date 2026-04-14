import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, ArrowRight, Zap, Plus, MoveRight, Search, ChevronRight, ChevronLeft } from 'lucide-react';

const App = () => {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const theme = {
    black: '#000000',
    white: '#FFFFFF',
    offWhite: '#F0F0F0',
    neon: '#B7FF3C',
  };

  /* ─── NAVBAR ─── */
  const Navbar = () => (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white border-b-2 border-black py-3 sm:py-4`}>
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 flex justify-between items-center text-black">
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
          <button onClick={() => setPage('home')} className="flex items-center text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tighter italic">
            NIMBLE
            <span className="w-3 h-6 sm:w-4 sm:h-8 bg-[#B7FF3C] border-2 border-black ml-1"></span>
          </button>
          
          <div className="hidden lg:flex gap-10">
            {['DROP_001', 'GEAR', 'ARCHIVES'].map(item => (
              <a key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.3em] hover:text-[#B7FF3C] transition-all italic">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Search size={18} className="cursor-pointer hover:text-gray-500 sm:w-5 sm:h-5" />
          
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => setPage('pdp')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black text-white flex items-center justify-center group-hover:bg-[#B7FF3C] group-hover:text-black transition-all">
              <ShoppingCart size={16} />
            </div>
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-30 italic leading-none">BAG</span>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">00 ITEMS</span>
            </div>
          </div>
          
          <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );

  /* ─── MARQUEE TICKER ─── */
  const MarqueeTicker = ({ text, bg = "bg-black", textColor = "text-white" }) => (
    <div className={`${bg} ${textColor} py-3 sm:py-4 overflow-hidden whitespace-nowrap border-y-2 border-black relative z-20`}>
      <div className="inline-block animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="font-black text-[11px] sm:text-[14px] uppercase tracking-[0.3em] sm:tracking-[0.5em] mx-6 sm:mx-10 italic">
            {text} <span className="text-[#B7FF3C]">///</span> {text} <span className="text-[#B7FF3C]">///</span>
          </span>
        ))}
      </div>
    </div>
  );

  /* ─── HOME PAGE ─── */
  const Home = () => (
    <div className="bg-white text-black min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col pt-20 sm:pt-24 lg:pt-0 overflow-hidden border-b-2 border-black">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 flex-grow">
          
          {/* Left — Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center px-5 sm:px-8 lg:px-10 py-10 sm:py-16 lg:py-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
               <div className="bg-[#B7FF3C] text-black px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-2 border-black italic">STATUS: LIVE</div>
               <div className="w-12 sm:w-24 h-[2px] bg-black"></div>
            </div>
            
            <h1 className="text-[16vw] sm:text-[14vw] lg:text-[10vw] xl:text-[9vw] font-black leading-[0.82] tracking-tighter uppercase italic mb-8 sm:mb-12">
              BUILT<br />
              <span className="text-white" style={{ WebkitTextStroke: '2px black' }}>UNBOUND</span><br />
              STREETS<span className="inline-block w-[0.8em] sm:w-[1.2em] h-[0.12em] sm:h-[0.15em] bg-[#B7FF3C] ml-2 sm:ml-4 align-baseline"></span>
            </h1>

            <div className="flex flex-col gap-6 sm:gap-10">
               <button 
                 onClick={() => setPage('pdp')}
                 className="w-fit px-6 sm:px-10 py-4 sm:py-5 bg-black text-white font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#B7FF3C] hover:text-black transition-all flex items-center gap-4 sm:gap-6 group"
               >
                 GET THE DROP <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="lg:col-span-5 relative hidden lg:block border-l-2 border-black bg-black">
             <div className="h-full w-full relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-all duration-[2000ms]"
                  alt="Gamer Culture"
                />
                <div className="absolute top-8 right-8 xl:top-10 xl:right-10 bg-white border-2 border-black p-3 xl:p-4 rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform">
                   <p className="text-[9px] xl:text-[10px] font-black uppercase tracking-widest leading-none italic">DROP_001</p>
                </div>
                <div className="absolute bottom-8 left-8 xl:bottom-10 xl:left-10 bg-[#B7FF3C] text-black px-3 py-1 text-[9px] xl:text-[10px] font-black uppercase tracking-widest italic border-2 border-black">
                  CORE_HYBRID
                </div>
             </div>
          </div>

          {/* Mobile Hero Image */}
          <div className="lg:hidden relative h-[50vw] sm:h-[40vw] overflow-hidden border-t-2 border-black">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover grayscale brightness-75"
              alt="Gamer Culture"
            />
            <div className="absolute bottom-4 left-5 sm:left-8 bg-[#B7FF3C] text-black px-3 py-1 text-[9px] font-black uppercase tracking-widest italic border-2 border-black">
              CORE_HYBRID
            </div>
          </div>
        </div>
      </section>

      <MarqueeTicker text="Performance Driven // Street Ready // Hybrid Lifestyle" />

      {/* ── MANIFESTO ── */}
      <section className="py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-10 max-w-[1600px] mx-auto border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex items-center gap-4">
               <div className="w-[3px] h-6 bg-black"></div>
               <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.5em] italic">Manifesto</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic">
              BUILT FOR<br />THE ONES WHO<br />NEVER LOG OUT<span className="text-[#B7FF3C]">.</span>
            </h2>
            
            <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-tight leading-loose max-w-lg opacity-80">
              WE DON'T JUST MAKE CLOTHES. WE BUILD UNIFORMS FOR THE HYBRID LIFESTYLE. COMFORTABLE FOR A 12-HOUR GRIND, SHARP ENOUGH FOR THE STREETS.
            </p>
            
            <button className="flex items-center gap-3 sm:gap-4 group">
               <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] italic border-b-2 border-black pb-1">Read Our Story</span>
               <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-black flex items-center justify-center bg-[#B7FF3C] group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowRight size={18} />
               </div>
            </button>
          </div>

          <div className="relative">
             <div className="aspect-video bg-gray-100 border-2 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] sm:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
                <img 
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                  alt="Lifestyle Workspace"
                />
             </div>
             <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 bg-[#B7FF3C] border-2 border-black -z-10"></div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="py-16 sm:py-24 lg:py-32 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black">
          {['APPAREL', 'MOBILE GEAR', 'ACCESSORIES'].map((cat, i) => (
            <div key={cat} className={`p-8 sm:p-12 lg:p-16 group cursor-pointer relative overflow-hidden h-[320px] sm:h-[400px] lg:h-[500px] flex flex-col justify-between transition-all ${i !== 2 ? 'border-b-2 sm:border-b-2 lg:border-b-0 lg:border-r-2 border-black' : ''} ${i === 0 ? 'sm:border-r-2 sm:border-black lg:border-r-2' : ''} bg-white hover:bg-[#B7FF3C]`}>
               <div className="relative z-10">
                  <span className="text-[10px] sm:text-[11px] font-black text-black/30 uppercase tracking-[0.5em] mb-3 sm:mb-4 block italic">0{i+1}</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic leading-none">{cat}</h2>
               </div>
               <div className="relative z-10 flex justify-between items-end">
                  <button className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-1">EXPLORE</button>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center bg-black text-white group-hover:bg-white group-hover:text-black transition-all">
                     <Plus size={20} />
                  </div>
               </div>
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt={cat} />
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#F9F9F9] border-y-2 border-black">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 lg:mb-20 gap-6 sm:gap-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none italic">
              BUILT FOR<br />THE <span className="bg-black text-[#B7FF3C] px-2 sm:px-3">GRIND.</span>
            </h2>
            <p className="max-w-sm text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-relaxed opacity-40 italic">
              Technical design balanced for daily mobility and gaming performance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="group cursor-pointer" onClick={() => setPage('pdp')}>
                <div className="aspect-[3/4] bg-white mb-3 sm:mb-6 overflow-hidden relative border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all group-hover:translate-x-1 group-hover:translate-y-1">
                   <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" alt={`Product ${i}`} />
                   <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black text-white text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-1 uppercase tracking-widest italic">
                     $85.00
                   </div>
                </div>
                <div className="flex justify-between items-start px-1 sm:px-2">
                  <div>
                    <h3 className="text-[11px] sm:text-sm font-black uppercase tracking-tighter mb-1 group-hover:text-gray-500 transition-colors italic">CORE HOODIE V.0{i}</h3>
                    <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-20">LIMITED EDITION</p>
                  </div>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  /* ─── PDP PAGE ─── */
  const Pdp = () => {
    const [activeImage, setActiveImage] = useState(0);
    const images = [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
    ];

    const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

    return (
      <div className="bg-white text-black pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-32 lg:pb-40">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-black bg-white">
            
            {/* CAROUSEL GALLERY */}
            <div className="lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-black p-5 sm:p-8 lg:p-10 bg-[#F9F9F9] flex flex-col gap-6 sm:gap-8 lg:gap-10">
              
              {/* Main Carousel */}
              <div className="aspect-square bg-white relative overflow-hidden border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                 <img 
                   src={images[activeImage]} 
                   className="w-full h-full object-cover grayscale transition-all duration-500" 
                   alt="Carousel View" 
                 />
                 
                 <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col gap-2 z-10">
                    <span className="bg-[#B7FF3C] border-2 border-black text-black text-[9px] sm:text-[11px] font-black px-3 sm:px-4 py-1 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] italic">
                      TECHNICAL_GEAR
                    </span>
                 </div>

                 <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
                    <button 
                      onClick={prevImage}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-black flex items-center justify-center pointer-events-auto hover:bg-[#B7FF3C] transition-all active:scale-90"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-black flex items-center justify-center pointer-events-auto hover:bg-[#B7FF3C] transition-all active:scale-90"
                    >
                      <ChevronRight size={20} />
                    </button>
                 </div>

                 <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                    {images.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-black transition-colors ${i === activeImage ? 'bg-[#B7FF3C]' : 'bg-white'}`}
                      />
                    ))}
                 </div>
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-10 lg:pr-20">
                 <div 
                   className="aspect-square bg-white border-2 border-black overflow-hidden transform -rotate-2 cursor-pointer group"
                   onClick={() => setActiveImage((activeImage + 1) % images.length)}
                 >
                    <img 
                      src={images[(activeImage + 1) % images.length]} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-opacity" 
                      alt="Next Slide Preview"
                    />
                 </div>
                 <div className="aspect-square flex flex-col justify-center items-center text-center p-4 sm:p-6 lg:p-10 bg-black text-[#B7FF3C] border-2 border-black">
                    <Zap size={28} className="mb-4 sm:mb-6 stroke-white sm:w-10 sm:h-10" strokeWidth={2} />
                    <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] leading-relaxed italic">
                      "DURABILITY TESTED IN EXTREME CONDITIONS."
                    </p>
                 </div>
              </div>
            </div>

            {/* BUY BOX */}
            <div className="lg:col-span-5 p-5 sm:p-8 lg:p-16 xl:p-20 flex flex-col justify-center bg-white">
              <div className="lg:sticky lg:top-40 space-y-8 sm:space-y-10 lg:space-y-12">
                <div className="border-l-4 sm:border-l-8 border-[#B7FF3C] pl-5 sm:pl-8 lg:pl-10">
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-gray-300 mb-3 sm:mb-4 italic">NIMBLE_CORE_DIVISION</p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter italic leading-[0.85] mb-4 sm:mb-6">CORE TACTICAL<br />HOODIE.</h1>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-30 italic tracking-tighter">$85.00 USD</p>
                </div>

                <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                  <div>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-400">SELECT SIZE</span>
                      <button className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-b-2 border-black italic">SIZE_GUIDE</button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                      {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                        <button key={size} className={`aspect-square flex items-center justify-center text-[10px] sm:text-[11px] font-black transition-all border-2 ${size === 'M' ? 'bg-[#B7FF3C] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-black/10 hover:border-black text-gray-300 hover:text-black'}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 sm:pt-4">
                    <button className="w-full py-5 sm:py-6 lg:py-7 bg-black text-white font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs hover:bg-[#B7FF3C] hover:text-black transition-all transform hover:-rotate-1 shadow-[6px_6px_0px_0px_rgba(183,255,60,1)] sm:shadow-[8px_8px_0px_0px_rgba(183,255,60,1)] hover:shadow-none active:scale-95">
                      ADD TO BAG
                    </button>
                  </div>

                  <div className="pt-8 sm:pt-10 lg:pt-12 border-t-2 border-black">
                     <div className="group cursor-pointer">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                           <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest italic">TECHNICAL_SPECS</span>
                           <Plus size={18} className="text-[#B7FF3C]" strokeWidth={3} />
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-loose opacity-40">
                           • 400GSM HEAVYWEIGHT COTTON FLEECE<br />
                           • REINFORCED STRUCTURAL STITCHING<br />
                           • OVERSIZED DROPPED SHOULDER FIT<br />
                           • HIDDEN MEDIA POCKET INTERIOR
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIFESTYLE BANNER */}
          <section className="mt-16 sm:mt-24 lg:mt-40 relative h-[280px] sm:h-[400px] lg:h-[500px] overflow-hidden flex items-center justify-center group border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
             <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-1000" alt="Lifestyle Banner" />
             <div className="relative z-10 text-center px-5">
                <h2 className="text-3xl sm:text-5xl lg:text-8xl font-black uppercase tracking-tighter italic mix-blend-difference mb-2 sm:mb-4">CONQUER THE STREETS</h2>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#B7FF3C] italic">NIMBLE HYBRID COLLECTION // 2024</p>
             </div>
          </section>
        </div>
      </div>
    );
  };

  /* ─── FOOTER ─── */
  const Footer = () => (
    <footer className="bg-white border-t-4 border-black pt-16 sm:pt-24 lg:pt-32 pb-10 sm:pb-16 px-5 sm:px-8 lg:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 mb-16 sm:mb-24 lg:mb-32 items-start">
           <div className="lg:col-span-7">
              <h4 className="text-[14vw] sm:text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-none italic mb-6 sm:mb-10">
                NIMBLE<br />
                <span style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>REBELS_</span>
              </h4>
              <div className="flex border-b-4 border-black pb-4 max-w-md">
                 <input type="email" placeholder="JOIN_THE_MOVEMENT" className="bg-transparent border-none text-[11px] sm:text-[12px] font-black uppercase tracking-widest focus:outline-none w-full placeholder:opacity-30" />
                 <button className="text-black hover:text-[#B7FF3C] transition-colors"><MoveRight size={28} /></button>
              </div>
           </div>
           <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              <div className="flex flex-col gap-4 sm:gap-6">
                 <span className="text-[#B7FF3C] bg-black px-2 py-1 w-fit italic">CATALOG_</span>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">HOODIES</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">BOTTOMS</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">ACCESSORIES</a>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6">
                 <span className="text-[#B7FF3C] bg-black px-2 py-1 w-fit italic">INFO_</span>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">SHIPPING</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">SIZING</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">CONTACT</a>
              </div>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] opacity-20 border-t-2 border-black/5 pt-8 sm:pt-16 gap-4 sm:gap-8">
          <span>©2024 NIMBLE GAMER // REBELS_OS_DIV</span>
          <div className="flex gap-6 sm:gap-10 italic">
             <span>JAKARTA_HQ</span>
             <span>EST_2024</span>
          </div>
        </div>
      </div>
    </footer>
  );

  /* ─── MAIN RENDER ─── */
  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#B7FF3C] selection:text-black overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      {page === 'home' ? <Home /> : <Pdp />}
      <Footer />

      {/* Page Switcher */}
      <div className="fixed bottom-4 left-4 sm:bottom-10 sm:left-10 z-[120] flex bg-black p-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(183,255,60,1)] sm:shadow-[4px_4px_0px_0px_rgba(183,255,60,1)]">
         <button onClick={() => setPage('home')} className={`px-4 sm:px-6 py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${page === 'home' ? 'bg-[#B7FF3C] text-black' : 'bg-black text-white hover:bg-white/5'}`}>HOME</button>
         <button onClick={() => setPage('pdp')} className={`px-4 sm:px-6 py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${page === 'pdp' ? 'bg-[#B7FF3C] text-black' : 'bg-black text-white hover:bg-white/5'}`}>PDP</button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white p-6 sm:p-10 flex flex-col justify-between">
           <div className="flex justify-between items-center border-b-4 border-black pb-6 sm:pb-10">
              <span className="text-2xl sm:text-4xl font-black italic">NIMBLE<span className="text-[#B7FF3C]">.</span></span>
              <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
           </div>
           <div className="flex flex-col gap-6 sm:gap-12">
              {['DROP_001', 'SHOP_ALL', 'ARCHIVES', 'EDITORIAL'].map(item => (
                <a key={item} href="#" className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic hover:text-[#B7FF3C] hover:bg-black px-2 transition-all" onClick={() => setIsMenuOpen(false)}>{item}</a>
              ))}
           </div>
           <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
              ©2024 NIMBLE_GAMER // REBELS_DIV
           </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }

        h1, h2, h3, h4 { font-style: italic; }

        /* Smooth page transitions */
        img { image-rendering: auto; }

        /* Better touch targets on mobile */
        @media (max-width: 640px) {
          button, a { min-height: 40px; }
        }
      `}</style>
    </div>
  );
};

export default App;
