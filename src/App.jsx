import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ArrowRight, Zap, Plus, MoveRight, Search } from 'lucide-react';
import { elementToSVG } from 'dom-to-svg';

const App = () => {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedVar, setCopiedVar] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    black: '#000000',
    white: '#FFFFFF',
    offWhite: '#F0F0F0',
    neon: '#B7FF3C', // Kuning/Hijau Neon
  };

  // === ORIGINAL handleCopy — proven to work with Figma (text/plain SVG) ===
  const handleCopy = async (text, id = text) => {
    let content = text;
    if (content.trim().startsWith('<svg') && !content.includes('xmlns=')) {
      content = content.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const onSuccess = () => {
      setCopiedVar(id);
      setTimeout(() => setCopiedVar(null), 2000);
    };

    // STRATEGI 1: ClipboardItem API (Best for Figma)
    const tryClipboardWrite = async () => {
      if (typeof ClipboardItem === 'undefined') return false;
      try {
        const items = {};
        items['text/plain'] = new Blob([content], { type: 'text/plain' });
        if (content.trim().startsWith('<svg')) {
          items['text/html'] = new Blob([content], { type: 'text/html' });
        }
        await navigator.clipboard.write([new ClipboardItem(items)]);
        return true;
      } catch {
        return false;
      }
    };

    // STRATEGI 2: writeText
    const tryClipboardWriteText = async () => {
      try {
        await navigator.clipboard.writeText(content);
        return true;
      } catch {
        return false;
      }
    };

    // STRATEGI 3: execCommand fallback
    const tryExecCommand = () => {
      try {
        const div = document.createElement('div');
        div.contentEditable = 'true';
        div.style.position = 'fixed';
        div.style.left = '-9999px';
        div.style.top = '-9999px';
        div.style.opacity = '0';
        div.textContent = content;
        document.body.appendChild(div);
        const range = document.createRange();
        range.selectNodeContents(div);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        const success = document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(div);
        return success;
      } catch {
        return false;
      }
    };

    if (await tryClipboardWrite()) { onSuccess(); return; }
    if (await tryClipboardWriteText()) { onSuccess(); return; }
    if (tryExecCommand()) { onSuccess(); return; }

    alert("Gagal menyalin ke clipboard. Pastikan browser memberikan izin clipboard.");
  };

  // === COPY PAGE TO FIGMA as editable SVG layers ===
  const copyPageToFigma = async () => {
    const element = document.getElementById('main-content');
    if (!element) return;

    try {
      console.log('Converting DOM to SVG...');

      // dom-to-svg converts DOM elements to proper SVG primitives
      // (rect, text, image — NOT foreignObject), so Figma can edit layers.
      const svgDocument = elementToSVG(element);

      // Serialize SVG DOM to string
      const svgString = new XMLSerializer().serializeToString(svgDocument);

      console.log('SVG generated, length:', svgString.length, 'chars');

      // Use the proven handleCopy to put SVG text on clipboard
      await handleCopy(svgString, 'figma');

      console.log('SVG copied! Paste into Figma for editable layers.');
    } catch (err) {
      console.error('DOM-to-SVG Error:', err);
      alert("Gagal mengkonversi halaman: " + (err.message || "Unknown error"));
    }
  };

  // Navigasi gaya Rebels: Tegas dan Berkotak
  const Navbar = () => (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white py-3 border-b-2 border-black' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center text-black">
        <div className="flex items-center gap-14">
          <button onClick={() => setPage('home')} className="text-3xl font-black uppercase tracking-tighter italic">
            NIMBLE<span style={{ color: theme.neon }} className="bg-black px-1 ml-1 text-white">_</span>
          </button>
          <div className="hidden lg:flex gap-10">
            {['Drop_001', 'Gear', 'Archives'].map(item => (
              <a key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-[#B7FF3C] hover:bg-black px-1 transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Search size={20} className="cursor-pointer hover:text-gray-500" />
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage('pdp')}>
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-[#B7FF3C] group-hover:text-black transition-all">
              <ShoppingCart size={18} />
            </div>
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-30 italic">Beg</span>
              <span className="text-[11px] font-black uppercase tracking-widest">00 Produk</span>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );

  const MarqueeTicker = ({ text, bg = "bg-black", textColor = "text-white" }) => (
    <div className={`${bg} ${textColor} py-4 overflow-hidden whitespace-nowrap border-y-2 border-black relative z-20`}>
      <div className="inline-block animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="font-black text-[14px] uppercase tracking-[0.5em] mx-10 italic">
            {text} <span className="text-[#B7FF3C]">///</span> {text} <span className="text-[#B7FF3C]">///</span>
          </span>
        ))}
      </div>
    </div>
  );

  const Home = () => (
    <div className="bg-white text-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col pt-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 flex-grow items-center">
          
          <div className="lg:col-span-8 flex flex-col justify-center py-20">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-1 h-6 bg-black"></div>
               <div className="text-[11px] font-black uppercase tracking-[0.5em]">Manifesto</div>
            </div>
            <h1 className="text-[9vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8 max-w-4xl">
              BUILT FOR<br />
              THE ONES WHO<br />
              NEVER LOG OUT<span className="text-[#B7FF3C]">.</span>
            </h1>
            <p className="max-w-xl text-[13px] md:text-[15px] font-bold uppercase tracking-tight leading-relaxed mb-10 opacity-80">
              Kami tidak hanya membuat pakaian. Kami membuat seragam untuk gaya hidup hibrida. Nyaman untuk grind 12 jam, cukup tajam untuk jalanan.
            </p>
            <div className="flex flex-wrap items-center gap-10">
               <button onClick={() => setPage('pdp')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] hover:opacity-50 transition-opacity group">
                 Read Our Story <ArrowRight size={18} className="text-[#B7FF3C] group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>

          <div className="lg:col-span-4 relative mb-20 lg:mb-0 hidden lg:block">
             <div className="relative aspect-[3/4] bg-gray-100 group border-2 border-black">
                <div className="w-full h-full overflow-hidden">
                   <img 
                     src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" crossOrigin="anonymous" 
                     className="w-full h-full object-cover grayscale brightness-90 group-hover:brightness-100 transition-all duration-1000"
                     alt="Model Lifestyle"
                   />
                </div>
                {/* DROP BADGE */}
                <div className="absolute top-10 right-[-15px] bg-white border-2 border-black p-4 rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-0 transition-transform z-20">
                   <p className="text-[10px] font-black uppercase tracking-widest leading-none">Drop_001</p>
                </div>
                {/* CORE HYBRID BADGE */}
                <div className="absolute bottom-10 left-[-15px] bg-black border-2 border-black p-4 -rotate-6 shadow-[8px_8px_0px_0px_rgba(183,255,60,1)] group-hover:rotate-0 transition-transform z-20">
                   <p className="text-[10px] font-black uppercase tracking-widest leading-none text-[#B7FF3C]">Core_Hybrid</p>
                </div>
             </div>
          </div>
        </div>
        <MarqueeTicker text="Performance Driven // Street Ready // Hybrid Lifestyle" />
      </section>

      {/* CATEGORY GRID */}
      <section className="py-32 max-w-[1600px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-black">
          {['Pakaian', 'Gajet Mobile', 'Aksesori'].map((cat, i) => (
            <div key={cat} className={`p-16 group cursor-pointer relative overflow-hidden h-[500px] flex flex-col justify-between transition-all ${i !== 2 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-black' : ''} bg-white hover:bg-[#B7FF3C]`}>
               <div className="relative z-10">
                  <span className="text-[11px] font-black text-black/30 uppercase tracking-[0.5em] mb-4 block italic">0{i+1}</span>
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">{cat}</h2>
               </div>
               <div className="relative z-10 flex justify-between items-end">
                  <button className="text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-1">Teroka</button>
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-black text-white group-hover:bg-white group-hover:text-black transition-all">
                     <Plus size={24} />
                  </div>
               </div>
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt={cat} crossOrigin="anonymous" />
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCT LIST */}
      <section className="py-32 bg-[#F9F9F9] border-y-2 border-black">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">
              Built for<br />the <span className="bg-black text-[#B7FF3C] px-3">Grind.</span>
            </h2>
            <p className="max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed opacity-40">
              Reka bentuk teknikal yang diseimbangkan untuk mobiliti harian dan prestasi gaming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="group cursor-pointer" onClick={() => setPage('pdp')}>
                <div className="aspect-[3/4] bg-white mb-6 overflow-hidden relative border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all group-hover:translate-x-1 group-hover:translate-y-1">
                   <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" alt={`Product ${i}`} crossOrigin="anonymous" />
                   <div className="absolute bottom-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest italic">
                     $85.00
                   </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tighter mb-1 group-hover:text-gray-500 transition-colors italic">Core Hoodie V.0{i}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">Limited Edition</p>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const Pdp = () => (
    <div className="bg-white text-black pt-32 pb-40">
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-black bg-white">
          
          {/* GALLERY */}
          <div className="lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-black p-10 bg-[#F9F9F9] flex flex-col gap-10">
            <div className="aspect-square bg-white relative overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
               <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt="Main View" crossOrigin="anonymous" />
               <div className="absolute top-8 left-8 flex flex-col gap-2">
                  <span className="bg-[#B7FF3C] border-2 border-black text-black text-[11px] font-black px-4 py-1 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Teknikal_Gear</span>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-10 pr-20">
               <div className="aspect-[3/4] bg-white border-2 border-black overflow-hidden transform rotate-2">
                  <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-opacity" alt="Alt View" crossOrigin="anonymous" />
               </div>
               <div className="aspect-[3/4] flex flex-col justify-center items-center text-center p-10 bg-black text-[#B7FF3C] border-2 border-black">
                  <Zap size={40} className="mb-6 stroke-white" strokeWidth={2} />
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed italic">"Ketahanan yang diuji dalam situasi ekstrem."</p>
               </div>
            </div>
          </div>

          {/* BUY BOX */}
          <div className="lg:col-span-5 p-10 lg:p-20 flex flex-col justify-center bg-white">
            <div className="sticky top-40 space-y-12">
              <div className="border-l-8 border-[#B7FF3C] pl-10">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 mb-4 italic">Nimble_Core_Division</p>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.85] mb-6">Core Tactical<br />Hoodie.</h1>
                <p className="text-3xl font-light opacity-30 italic tracking-tighter">$85.00 USD</p>
              </div>

              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Pilih Saiz</span>
                    <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black italic">Panduan_Saiz</button>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                      <button key={size} className={`aspect-square flex items-center justify-center text-[11px] font-black transition-all border-2 ${size === 'M' ? 'bg-[#B7FF3C] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-black/10 hover:border-black text-gray-300 hover:text-black'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button className="w-full py-7 bg-black text-white font-black uppercase tracking-[0.5em] text-xs hover:bg-[#B7FF3C] hover:text-black transition-all transform hover:-rotate-1 shadow-[8px_8px_0px_0px_rgba(183,255,60,1)] hover:shadow-none active:scale-95">
                    Masukkan Ke Beg
                  </button>
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 italic">Penghantaran Ekspres</span>
                     <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 italic">Global_Check</span>
                  </div>
                </div>

                <div className="pt-12 border-t-2 border-black">
                   <div className="group cursor-pointer">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-xs font-black uppercase tracking-widest italic">Spesifikasi_Teknikal</span>
                         <Plus size={20} className="text-[#B7FF3C]" strokeWidth={3} />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest leading-loose opacity-40">
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
        <section className="mt-40 relative h-[500px] overflow-hidden flex items-center justify-center group border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
           <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-1000" alt="Lifestyle Banner" crossOrigin="anonymous" />
           <div className="relative z-10 text-center">
              <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter italic mix-blend-difference mb-4">CONQUER THE STREETS</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B7FF3C]">Nimble Hybrid Collection // 2024</p>
           </div>
        </section>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-white border-t-4 border-black pt-32 pb-16 px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32 items-start">
           <div className="lg:col-span-7">
              <h4 className="text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-none italic mb-10">Nimble<br /><span style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>REBELS_</span></h4>
              <div className="flex border-b-4 border-black pb-4 max-w-md">
                 <input type="email" placeholder="JOIN_THE_MOVEMENT" className="bg-transparent border-none text-[12px] font-black uppercase tracking-widest focus:outline-none w-full placeholder:opacity-30" />
                 <button className="text-black hover:text-[#B7FF3C] transition-colors"><MoveRight size={32} /></button>
              </div>
           </div>
           <div className="lg:col-span-5 grid grid-cols-2 gap-16 text-[11px] font-black uppercase tracking-[0.4em]">
              <div className="flex flex-col gap-6">
                 <span className="text-[#B7FF3C] bg-black px-2 py-1 w-fit italic">Katalog_</span>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Hoodies</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Bottoms</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Accessories</a>
              </div>
              <div className="flex flex-col gap-6">
                 <span className="text-[#B7FF3C] bg-black px-2 py-1 w-fit italic">Info_</span>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Shipping</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Sizing</a>
                 <a href="#" className="opacity-40 hover:opacity-100 transition-opacity">Contact</a>
              </div>
           </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] opacity-20 border-t-2 border-black/5 pt-16 gap-8">
          <span>©2024 NIMBLE GAMER // REBELS_OS_DIV</span>
          <div className="flex gap-10 italic">
             <span>Jakarta_HQ</span>
             <span>Est_2024</span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#B7FF3C] selection:text-black overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div id="main-content">
        {page === 'home' ? <Home /> : <Pdp />}
      </div>
      <Footer />

      {/* Demo Switcher */}
      <div className="fixed bottom-10 left-10 z-[120] flex bg-black p-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(183,255,60,1)]">
         <button onClick={() => setPage('home')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${page === 'home' ? 'bg-[#B7FF3C] text-black' : 'bg-black text-white hover:bg-white/5'}`}>Home</button>
         <button onClick={() => setPage('pdp')} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${page === 'pdp' ? 'bg-[#B7FF3C] text-black' : 'bg-black text-white hover:bg-white/5'}`}>PDP</button>
         {/* <button 
           onClick={copyPageToFigma} 
           className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${copiedVar === 'figma' ? 'bg-white text-black' : 'bg-black text-[#B7FF3C] hover:bg-white/5'}`}
         >
           {copiedVar === 'figma' ? 'TER_SALIN' : 'COPY_FIGMA'}
         </button> */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white p-10 flex flex-col justify-between">
           <div className="flex justify-between items-center border-b-4 border-black pb-10">
              <span className="text-4xl font-black italic">NIMBLE<span className="text-[#B7FF3C]">.</span></span>
              <button onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
           </div>
           <div className="flex flex-col gap-12">
              {['Drop_001', 'Shop_All', 'Archives', 'Editorial'].map(item => (
                <a key={item} href="#" className="text-7xl font-black uppercase tracking-tighter italic hover:text-[#B7FF3C] hover:bg-black px-2 transition-all" onClick={() => setIsMenuOpen(false)}>{item}</a>
              ))}
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
              ©2024 NIMBLE_GAMER // REBELS_DIV
           </div>
        </div>
      )}

      <style>{`
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }

        h1, h2, h3, h4 {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default App;
