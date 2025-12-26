import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import heroimg from "../src/img/a-chosen-soul-GkwnyqRMD70-unsplash.png";

// Brain Mask SVG
const BrainMask = () => (
  <svg
    viewBox="0 0 512 512"
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    <defs>
      <clipPath id="brainClip" clipPathUnits="objectBoundingBox">
        {/* Full image rectangle (scales to any size) */}
        <rect x="0" y="0" width="1" height="1" />
        {/* Example brain-like path (normalized 0-1 coordinates) */}
        {/* <path d="M0.5,0 C0.78,0 1,0.22 1,0.5 C1,0.78 0.78,1 0.5,1 C0.22,1 0,0.78 0,0.5 C0,0.22 0.22,0 0.5,0 Z" /> */}
      </clipPath>
    </defs>
  </svg>
);


export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const overlayRef = useRef(null);
  const leftMenuRef = useRef(null);
  const rightMenuRef = useRef(null);
  const maskRef = useRef(null);
  const noiseRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);

  // Menu animation
  useEffect(() => {
    if (!menuOpen) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.6 } });
    gsap.set(overlayRef.current, { willChange: "transform" });
    tl.fromTo(overlayRef.current, { xPercent: -100 }, { xPercent: 0 })
      .fromTo(leftMenuRef.current.children, { x: -80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08 }, "-=0.35")
      .fromTo(rightMenuRef.current.children, { x: 80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08 }, "-=0.45");
    return () => tl.kill();
  }, [menuOpen]);

  // Brain parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      if (maskRef.current) gsap.to(maskRef.current, { x, y, duration: 0.8, ease: "power3.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Brain floating
  useEffect(() => {
    if (maskRef.current) {
      gsap.to(maskRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 8,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Noise / Film grain
  useEffect(() => {
    if (noiseRef.current) {
      gsap.to(noiseRef.current, {
        backgroundPosition: "250px 250px",
        duration: 1.2,
        repeat: -1,
        ease: "steps(2)",
      });
    }
  }, []);

  // Cinematic zoom in/out
  useEffect(() => {
    if (heroRef.current && maskRef.current) {
      gsap.to([heroRef.current, maskRef.current], {
        scale: 1.07,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Auto show text after 3s with smooth animation
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animate text and icons when they appear
 useEffect(() => {
  if (!showText) return;

  // Entrance animation for text
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
          // Continuous horizontal float for text after entrance
          gsap.to(textRef.current, {
            x: 20, // move 20px to right
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      }
    );
  }

  // Entrance animation for icons
  if (iconsRef.current) {
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
          // Continuous horizontal float for icons
          gsap.to(iconsRef.current.children, {
            x: 15, // move 15px left-right
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2, // maintain stagger
          });
        },
      }
    );
  }
}, [showText]);


  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Fixed Hero BG */}
      <img ref={heroRef} src={heroimg} className="fixed inset-0 w-full h-full object-cover -z-10" alt="Hero" />

      {/* Brain Mask */}
      <div ref={maskRef} className="absolute inset-0 w-full h-full" style={{ clipPath: "url(#brainClip)" }}>
        <BrainMask />
        <img src={heroimg} className="w-full h-full object-cover scale-105 pointer-events-none" alt="Mask" />
      </div>

      {/* Noise Overlay */}
      <div
        ref={noiseRef}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Auto Text Overlay */}
      {showText && (
        <div className="absolute lg:ml-190 inset-0 flex flex-col items-center justify-center text-center px-8 z-20 text-white">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            I am a <span className="text-[#45B24F]">M</span>
            <span className="text-[#D07D70]">E</span>
            <span className="text-[#6CD0ED]">R</span>
            <span className="text-[#97C240]">N</span> Stack Developer
          </h1>

          <p ref={textRef} className="text-lg lg:text-2xl mb-6 drop-shadow-md">
            You can contact me if you need a professional website
          </p>

          {/* Social Media Icons */}
          <div ref={iconsRef} className="flex space-x-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition transform"
            >
              <FaFacebookF />
            </a>
         
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="relative z-30">
        <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl border-2 border-gray-600 p-3 rounded-full"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h1 className="hidden lg:block text-2xl font-bold uppercase">ZAHID</h1>

          <button className="px-5 py-2 rounded-full border-2 border-gray-600">Get Started</button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-20 flex flex-col lg:flex-row text-white">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 bg-[#5b5a47] flex items-center py-28 lg:py-0">
            <div ref={leftMenuRef} className="px-8 lg:pl-60 space-y-4 lg:space-y-6 text-2xl lg:text-4xl">
              <p>Manifesto</p>
              <p>Spatial Journeys</p>
              <p>Material Archive</p>
              <p>Visit Atelier</p>
              <p>Rituals</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 bg-[#3f3f32] flex items-center justify-start lg:justify-end py-28 lg:py-0">
            <div ref={rightMenuRef} className="px-8 lg:pr-60 space-y-4 lg:space-y-6 text-xl lg:text-2xl text-left lg:text-right">
              <p>Tactile Vault</p>
              <p>Form Experiments</p>
              <p>Carbon Network</p>
              <p>Shadow Library</p>
              <p>Collections</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
