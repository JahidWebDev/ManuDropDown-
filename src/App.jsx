import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import { IoClose, IoMailOutline, IoCallOutline, IoChatbubbleOutline } from "react-icons/io5";
import gsap from "gsap";
import video from "../src/img/101655-video-720.mp4"
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const overlayRef = useRef(null);
  const leftMenuRef = useRef(null);
  const rightMenuRef = useRef(null);
  const maskRef = useRef(null);
  const noiseRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);
  const snowRef = useRef(null);
  
  // Modal refs
  const modalRef = useRef();
  const contentRef = useRef();
  const backdropRef = useRef();

  const [isBangla, setIsBangla] = useState(true);

  const toggleLanguage = () => {
    setIsBangla(!isBangla);
  };

  // Keep your chosen dark space background
  const heroImageUrl = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";

  // Menu animation - FIXED WITH NULL CHECK
  useEffect(() => {
    if (!menuOpen) return;
    
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.6 } });
    
    // Check if overlayRef exists
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { willChange: "transform" });
      tl.fromTo(
        overlayRef.current,
        { xPercent: -100 },
        { xPercent: 0 }
      );
    }
    
    // Check if leftMenuRef and its children exist
    if (leftMenuRef.current && leftMenuRef.current.children) {
      tl.fromTo(
        leftMenuRef.current.children,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08 },
        "-=0.35"
      );
    }
    
    // Check if rightMenuRef and its children exist
    if (rightMenuRef.current && rightMenuRef.current.children) {
      tl.fromTo(
        rightMenuRef.current.children,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08 },
        "-=0.45"
      );
    }
    
    return () => tl.kill();
  }, [menuOpen]);

  // Glass / Prism subtle movement
  useEffect(() => {
    if (noiseRef.current) {
      gsap.to(noiseRef.current, {
        backgroundPosition: "300px 300px",
        duration: 6,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  // Cinematic zoom in/out
  useEffect(() => {
    if (heroRef.current && maskRef.current) {
      gsap.to([heroRef.current, maskRef.current], {
        scale: 1.10,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Auto show text after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animate text and icons when they appear
  useEffect(() => {
    if (!showText) return;

    // Text entrance
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 100, scale: 0.9, opacity: 0, rotation: -5 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            gsap.to(textRef.current, {
              x: 20,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );
    }

    // Icons entrance
    if (iconsRef.current && iconsRef.current.children) {
      gsap.fromTo(
        iconsRef.current.children,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(iconsRef.current.children, {
              x: 15,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.2,
            });
          },
        }
      );
    }
  }, [showText]);

  // Snowfall animation (after page load)
  useEffect(() => {
    const startSnow = () => {
      if (!snowRef.current) return;

      const snowflakes = [];
      const snowCount = 300;

      for (let i = 0; i < snowCount; i++) {
        const size = Math.random() * 8 + 1; // 1px to 9px
        const flake = document.createElement("div");
        flake.style.position = "absolute";
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.background = "white";
        flake.style.borderRadius = "50%";
        flake.style.opacity = Math.random() * 0.8 + 0.2;
        flake.style.top = `${Math.random() * 100}%`;
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.pointerEvents = "none";
        flake.style.zIndex = 15;
        snowRef.current.appendChild(flake);
        snowflakes.push(flake);

        const duration = Math.random() * 20 + 15;
        const drift = Math.random() * 100 - 50;
        const rotation = Math.random() * 360;

        gsap.to(flake, {
          y: "110vh",
          x: `+=${drift}`,
          rotation: rotation + 360,
          duration: duration,
          repeat: -1,
          ease: "linear",
          delay: Math.random() * 5,
        });
      }
    };

    if (document.readyState === "complete") {
      startSnow();
    } else {
      window.addEventListener("load", startSnow);
      return () => window.removeEventListener("load", startSnow);
    }
  }, []);

  // Modal animations with GSAP
  useEffect(() => {
    if (isModalOpen) {
      // Animation timeline
      const tl = gsap.timeline();
      
      // Backdrop animation
      if (backdropRef.current) {
        tl.fromTo(backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
      
      // Modal entrance animation
      if (modalRef.current) {
        tl.fromTo(modalRef.current,
          {
            scale: 0.8,
            opacity: 0,
            y: 50,
            rotationX: 15
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          },
          "-=0.2"
        );
      }
      
      // Content animation
      if (contentRef.current && contentRef.current.children) {
        tl.fromTo(contentRef.current.children,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.3"
        );
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    const tl = gsap.timeline();
    
    if (contentRef.current && contentRef.current.children) {
      tl.to(contentRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: -0.05,
        ease: "power2.in"
      });
    }
    
    if (modalRef.current) {
      tl.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        rotationX: 15,
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.2");
    }
    
    if (backdropRef.current) {
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => setIsModalOpen(false)
      });
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:your.email@gmail.com';
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Fixed Hero BG - Your chosen dark space background */}
      <img
        ref={heroRef}
        src={heroImageUrl}
        className="fixed inset-0 w-full h-full object-cover -z-10"
        alt="Dark space background"
      />

      {/* Bangladesh Map Overlay - Added here */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Simplified Bangladesh map silhouette */}
          <path 
            d="M30,20 Q40,15 50,20 Q60,25 65,30 Q70,40 68,50 Q65,60 60,65 Q55,70 50,72 Q45,70 40,65 Q35,60 32,50 Q30,40 35,30 Z"
            fill="rgba(0,0,0,0.3)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.3"
          />
          {/* Dhaka marker */}
          <circle cx="52" cy="52" r="1" fill="rgba(255,255,255,0.3)" />
          {/* Major cities markers */}
          <circle cx="45" cy="35" r="0.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="58" cy="45" r="0.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="42" cy="45" r="0.5" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>

      {/* Brain Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: "url(#brainClip)" }}
      >
        <img
          src={heroImageUrl}
          className="w-full h-full object-cover scale-105 pointer-events-none"
          style={{ filter: "brightness(0.30) contrast(1.2)" }}
          alt="Mask"
        />
      </div>

      {/* Noise Overlay / Glass Prism */}
      <div ref={noiseRef} className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="256" height="256" filter="url(%23noise)" opacity="0.1"/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />

      {/* Additional dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/70 z-5"></div>

      {/* Snow Overlay */}
      <div ref={snowRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* SVG for clipPath */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="brainClip">
            <path d="M50,50 Q100,20 150,50 Q200,80 150,110 Q100,140 50,110 Q0,80 50,50 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Auto Text Overlay */}
  {showText && (
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 text-white">
    {/* Main Heading - Mobile Optimized */}
    <div className="mb-4 sm:mb-6">
      <h1 className="text-3xl xs:text-4xl lg:text-6xl font-black mb-2 sm:mb-3 tracking-tight">
        <span className="bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFD93D] bg-clip-text text-transparent">
          FRONTEND
        </span>
        <span className="text-white/50 mx-2 sm:mx-3">|</span>
        <span className="bg-gradient-to-r from-[#6C5CE7] via-[#FD79A8] to-[#00B894] bg-clip-text text-transparent">
          DEVELOPER
        </span>
      </h1>
      <div className="h-1 w-20 sm:w-24 lg:w-36 bg-gradient-to-r from-[#FF6B6B] to-[#6C5CE7] mx-auto rounded-full"></div>
    </div>

    {/* Professional Tagline - Mobile Optimized */}
    <p 
      ref={textRef} 
      onClick={toggleLanguage}
      className="text-base sm:text-xl lg:text-3xl font-semibold mb-6 sm:mb-8 drop-shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-200 px-2"
    >
      {isBangla ? (
        <>
          <span className="text-gray-200">From Design to Implementation: </span>
          <span className="text-[#FF6B6B]">Visually Stunning</span>
          <span className="text-gray-200"> and </span>
          <span className="text-[#6C5CE7]">Highly Effective</span>
          <span className="text-gray-200"> Websites</span>
        </>
      ) : (
        <>
          <span className="text-gray-200">নকশা থেকে বাস্তবায়ন: </span>
          <span className="text-[#FF6B6B]">দৃষ্টিনন্দন</span>
          <span className="text-gray-200"> এবং </span>
          <span className="text-[#6C5CE7]">ফলপ্রসূ</span>
          <span className="text-gray-200"> ওয়েবসাইট</span>
        </>
      )}
    </p>

    {/* Services Badges - Mobile Optimized */}
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 max-w-xs sm:max-w-md lg:max-w-3xl">
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-md rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-[#FF6B6B] hover:scale-102 transition-all duration-200 cursor-default shadow">
        JavaScript
      </span>
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-md rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-[#4ECDC4] hover:scale-102 transition-all duration-200 cursor-default shadow">
        React.js
      </span>
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-md rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-[#FFD93D] hover:scale-102 transition-all duration-200 cursor-default shadow">
        HTML5/CSS3
      </span>
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-md rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-[#6C5CE7] hover:scale-102 transition-all duration-200 cursor-default shadow">
        Tailwind CSS
      </span>
      <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-md rounded-lg text-xs sm:text-sm font-medium border border-gray-600 hover:border-[#FD79A8] hover:scale-102 transition-all duration-200 cursor-default shadow">
        Next.js
      </span>
    </div>

    {/* Social Media Icons - Mobile Optimized */}
   

    {/* Stats Grid - Mobile Optimized */}
<div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-xs sm:max-w-md lg:max-w-4xl lg:flex lg:flex-row lg:justify-center lg:gap-6">
  {/* Project Stats */}
  <div className="group text-center p-3 sm:p-4 lg:py-6 lg:px-5 bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-md rounded-xl border border-gray-700 hover:border-[#FF6B6B] transition-all duration-300 lg:hover:duration-500 lg:flex-1 lg:max-w-[180px] lg:relative lg:overflow-hidden">
    <div className="relative z-10">
      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#FF6B6B] mb-1 lg:mb-3">23+</div>
      <div className="text-xs font-medium text-gray-300 lg:text-sm lg:font-semibold">Projects</div>
    </div>
    <div className="lg:absolute lg:inset-0 lg:bg-gradient-to-br lg:from-[#FF6B6B]/10 lg:to-transparent lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-500"></div>
    <div className="lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:h-0.5 lg:bg-gradient-to-r lg:from-[#FF6B6B] lg:to-transparent lg:scale-x-0 lg:group-hover:scale-x-100 lg:transition-transform lg:duration-500 lg:origin-left"></div>
  </div>

  {/* Satisfaction Stats */}
  <div className="group text-center p-3 sm:p-4 lg:py-6 lg:px-5 bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-md rounded-xl border border-gray-700 hover:border-[#4ECDC4] transition-all duration-300 lg:hover:duration-500 lg:flex-1 lg:max-w-[180px] lg:relative lg:overflow-hidden">
    <div className="relative z-10">
      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#4ECDC4] mb-1 lg:mb-3">100%</div>
      <div className="text-xs font-medium text-gray-300 lg:text-sm lg:font-semibold">Satisfaction</div>
    </div>
    <div className="lg:absolute lg:inset-0 lg:bg-gradient-to-br lg:from-[#4ECDC4]/10 lg:to-transparent lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-500"></div>
    <div className="lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:h-0.5 lg:bg-gradient-to-r lg:from-[#4ECDC4] lg:to-transparent lg:scale-x-0 lg:group-hover:scale-x-100 lg:transition-transform lg:duration-500 lg:origin-left"></div>
  </div>

  {/* Delivery Stats */}
  <div className="group text-center p-3 sm:p-4 lg:py-6 lg:px-5 bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-md rounded-xl border border-gray-700 hover:border-[#FFD93D] transition-all duration-300 lg:hover:duration-500 lg:flex-1 lg:max-w-[180px] lg:relative lg:overflow-hidden">
    <div className="relative z-10">
      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#FFD93D] mb-1 lg:mb-3">Fast</div>
      <div className="text-xs font-medium text-gray-300 lg:text-sm lg:font-semibold">Delivery</div>
    </div>
    <div className="lg:absolute lg:inset-0 lg:bg-gradient-to-br lg:from-[#FFD93D]/10 lg:to-transparent lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-500"></div>
    <div className="lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:h-0.5 lg:bg-gradient-to-r lg:from-[#FFD93D] lg:to-transparent lg:scale-x-0 lg:group-hover:scale-x-100 lg:transition-transform lg:duration-500 lg:origin-left"></div>
  </div>

  {/* Support Stats */}
  <div className="group text-center p-3 sm:p-4 lg:py-6 lg:px-5 bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-md rounded-xl border border-gray-700 hover:border-[#6C5CE7] transition-all duration-300 lg:hover:duration-500 lg:flex-1 lg:max-w-[180px] lg:relative lg:overflow-hidden">
    <div className="relative z-10">
      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#6C5CE7] mb-1 lg:mb-3">24/7</div>
      <div className="text-xs font-medium text-gray-300 lg:text-sm lg:font-semibold">Support</div>
    </div>
    <div className="lg:absolute lg:inset-0 lg:bg-gradient-to-br lg:from-[#6C5CE7]/10 lg:to-transparent lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-500"></div>
    <div className="lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:h-0.5 lg:bg-gradient-to-r lg:from-[#6C5CE7] lg:to-transparent lg:scale-x-0 lg:group-hover:scale-x-100 lg:transition-transform lg:duration-500 lg:origin-left"></div>
  </div>
</div>

    {/* CTA Button - Mobile Optimized */}
    <button 
      onClick={handleOpenModal}
      className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-800 via-black to-gray-800 border border-gray-700 hover:border-transparent text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 mb-6 relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2 sm:gap-3">
        <span className="group-hover:text-white transition-colors duration-300">
          Start Your Project
        </span>
        <span className="text-[#FF6B6B] group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
          →
        </span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] via-[#6C5CE7] to-[#00B894] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>

    {/* Mobile-only spacing for bottom elements */}
    <div className="h-16 sm:hidden"></div>
  </div>
)}

{/* Location Badge - Mobile Optimized */}
<div className="fixed z-30 bottom-4 right-4 sm:bottom-6 sm:right-6">
  <div className="group relative">
    {/* Main Badge - Mobile Size */}
    <div className="px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-800/40 via-cyan-800/30 to-blue-800/40 backdrop-blur-lg border border-green-700/40 hover:border-green-500/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
      <p className="text-xs sm:text-sm font-medium">
        <span className="text-gray-300">📍</span>
        <span className="text-green-400 font-semibold"> BD</span>
        <span className="text-gray-300"> •</span>
        <span className="text-cyan-400 font-semibold"> 🌍</span>
      </p>
    </div>
    
    {/* Hover Tooltip - Hidden on mobile, visible on desktop */}
    <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-900/80 via-cyan-900/70 to-blue-900/80 backdrop-blur-lg border border-green-700/50 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
      <p className="text-sm font-medium">
        <span className="text-gray-200">Based in </span>
        <span className="text-green-400 font-bold">Bangladesh</span>
        <span className="text-gray-200"> • Available </span>
        <span className="text-cyan-400 font-bold">Worldwide</span>
      </p>
      <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-green-900/80"></div>
    </div>
  </div>
</div>
      {/* NAV */}
      <nav className="relative z-30">
        <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl border-2 border-gray-600 p-3 rounded-full hover:border-gray-400 transition-colors hover:bg-gray-800/30"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h1 className="hidden lg:block text-2xl font-bold uppercase">ZAHID</h1>

          {/* Contact Button */}
          <button 
            onClick={handleOpenModal}
            className="px-5 py-2 rounded-full border-2 border-gray-600 hover:border-green-400 hover:bg-gray-800/30 transition-all hover:text-green-300"
          >
            Let's talk
          </button>
        </div>
      </nav>

      {/* Contact Modal */}
      {isModalOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
            onClick={handleCloseModal}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Glass effect modal */}
            <div
              ref={modalRef}
              className="relative w-full max-w-md overflow-hidden rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <IoClose className="w-6 h-6 text-white" />
              </button>
              
              {/* Content */}
              <div ref={contentRef} className="p-8 text-white">
                {/* Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                    Let's Connect!
                  </h2>
                  <p className="text-white/70">Based in Bangladesh • Available for global projects</p>
                </div>
                
                {/* Contact Options */}
                <div className="space-y-4 mb-8">
                  <button
                    onClick={handleEmailClick}
                    className="w-full group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-cyan-600">
                      <IoMailOutline className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold group-hover:text-green-300 transition-colors">Email</p>
                      <p className="text-sm text-white/60">your.email@gmail.com</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                      <IoCallOutline className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-white/60">+880 (XXX) XXX-XXXX</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="mb-8">
                  <p className="text-center mb-4 text-white/70">Find me on</p>
                  <div className="flex justify-center gap-4">
                    {[
                      { icon: FaLinkedin, color: 'text-[#0077b5]', hover: 'hover:bg-[#0077b5]/20' },
                      { icon: FaGithub, color: 'text-white', hover: 'hover:bg-white/20' },
                      { icon: FaFacebookF, color: 'text-[#1877F2]', hover: 'hover:bg-[#1877F2]/20' },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`p-3 rounded-full bg-white/10 ${social.hover} transition-all duration-300 hover:scale-110`}
                      >
                        <social.icon className={`w-6 h-6 ${social.color}`} />
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Contact Form Button */}
                <button
                  onClick={() => {/* Add form opening logic */}}
                  className="w-full group flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <IoChatbubbleOutline className="w-5 h-5" />
                  <span className="font-semibold">Send a Message</span>
                </button>
              </div>
              
              {/* Glass effect shine */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300/30 to-transparent" />
            </div>
          </div>
        </>
      )}

      {/* FULLSCREEN MENU - Minimalistic version */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-20 flex flex-col lg:flex-row text-white"
        >
          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover "
            >
<source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 "></div>
          </div>

          {/* Close Button */}
     

          {/* LEFT SIDE - Minimalistic Menu */}
          <div 
            
            className="w-full lg:w-1/2 relative z-10 flex items-center justify-center py-20 lg:py-0"
          >
<div className="text-left px-8 lg:pl-32">
  {/* "I'm a" text */}
  <p className="text-white text-lg lg:text-2xl tracking-[0.4em] mb-8 font-light uppercase">
    I'm a
  </p>
  
  {/* Developer Titles Stacked - SMALLER SIZE */}
  <div className="space-y-[-0.1rem]">
    <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-[0.85]">
      MERN-STACK
    </h2>
    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.85]">
      DEVELOPER
    </h2>
    <div className="text-2xl lg:text-4xl font-medium text-white py-4">&</div>
    <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tight leading-[0.85]">
      FRONTEND
    </h2>
    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.85]">
      DEVELOPER
    </h2>
  </div>
</div> </div>

          {/* RIGHT SIDE - Navigation */}
 <div 
  ref={rightMenuRef} 
  className="w-full lg:w-1/2 relative z-10 flex items-center justify-center py-24 lg:py-0"
>
  <div className="text-right px-8 lg:pr-36 space-y-10">
    {/* Work */}
    <div className="group cursor-pointer">
      <div className="flex items-center justify-end gap-8">
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90 transition-colors duration-300 font-medium">WORK</span>
        <div className="w-48 h-0.5 bg-white/60 group-hover:w-40 group-hover:bg-white transition-all duration-500 ease-out"></div>
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90 transition-colors duration-300 font-medium">WORK</span>
      </div>
    </div>

    {/* Services */}
    <div className="group cursor-pointer">
      <div className="flex items-center justify-end gap-8">
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90 transition-colors duration-300 font-medium">SERVICES</span>
        <div className="w-40 h-0.5 bg-white/60 group-hover:w-48 group-hover:bg-white transition-all duration-500 ease-out"></div>
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90 transition-colors duration-300 font-medium">SERVICES</span>
      </div>
    </div>

    {/* About */}
    <div className="group cursor-pointer">
      <div className="flex items-center justify-end gap-8">
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90  duration-300 font-medium">ABOUT</span>
        <div className="w-32 h-0.5 bg-white/60 group-hover:w-40 group-hover:bg-white transition-all duration-500 ease-out"></div>
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90  duration-300 font-medium">ABOUT</span>
      </div>
    </div>

    {/* Contact */}
    <div className="group cursor-pointer">
      <div className="flex items-center justify-end gap-8">
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90  duration-300 font-medium">CONTACT</span>
        <div className="w-40 h-0.5 bg-white/60 group-hover:w-48 group-hover:bg-white transition-all duration-500 ease-out"></div>
        <span className="text-white text-2xl tracking-[0.2em] group-hover:text-white/90  duration-300 font-medium">CONTACT</span>
      </div>
    </div>

    {/* Year at bottom with React icon and path */}
    <div className="mt-24">
      <div className="flex items-center justify-end gap-4">
        {/* React Icon */}
        <div className="text-white/40 hover:text-[#61DAFB] transition-colors duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18.1778L4.62 21L6 14.8222L0 9.82222L7.2 9.17778L12 3L16.8 9.17778L24 9.82222L18 14.8222L19.38 21L12 18.1778Z" />
          </svg>
        </div>
        
        {/* Divider path */}
        <div className="w-8 h-px bg-white/30"></div>
        
        {/* Year with font-medium */}
        <p className="text-white/40 text-base tracking-[0.3em] font-medium">© 2024</p>
      </div>
    </div>
  </div>
</div>
        </div>
      )}
    </section>
  );
}