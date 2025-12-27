import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import gsap from "gsap";
import heroimg from "../src/img/2151133117 (1).jpg";

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
  const snowRef = useRef(null);

  // Menu animation
  useEffect(() => {
    if (!menuOpen) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.6 } });
    gsap.set(overlayRef.current, { willChange: "transform" });
    tl.fromTo(
      overlayRef.current,
      { xPercent: -100 },
      { xPercent: 0 }
    )
      .fromTo(
        leftMenuRef.current.children,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08 },
        "-=0.35"
      )
      .fromTo(
        rightMenuRef.current.children,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08 },
        "-=0.45"
      );
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
      flake.style.zIndex = 15; // above hero, below text
      snowRef.current.appendChild(flake);
      snowflakes.push(flake);

      const duration = Math.random() * 20 + 15; // varied speed
      const drift = Math.random() * 100 - 50;   // horizontal sway
      const rotation = Math.random() * 360;     // initial rotation

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


  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Fixed Hero BG */}
      <img
        ref={heroRef}
        src={heroimg}
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      {/* Brain Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: "url(#brainClip)" }}
      >
        <img
          src={heroimg}
          className="w-full h-full object-cover scale-105 pointer-events-none"
          style={{ filter: "brightness(0.30)" }}
          alt="Mask"
        />
      </div>

      {/* Noise Overlay / Glass Prism */}
  

      {/* Snow Overlay */}
      <div ref={snowRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Auto Text Overlay */}
      {showText && (
        <div className="absolute mt-55  inset-0 flex flex-col items-center justify-center text-center px-8 z-20 text-[#ffffff]">
          <h1 className="text-4xl lg:text-[62px] font-extrabold mb-4 drop-shadow-lg">
            I am a <span className="text-[#45B24F]">M</span>
            <span className="text-[#D07D70]">E</span>
            <span className="text-[#6CD0ED]">R</span>
            <span className="text-[#97C240]">N</span> Stack Developer
          </h1>

          <p ref={textRef} className="text-lg lg:text-3xl mb-6 drop-shadow-md">
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

          <button className="px-5 py-2 rounded-full border-2 border-gray-600">
            Get Started
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-20 flex flex-col lg:flex-row text-white"
        >
          {/* LEFT */}
          <div className="w-full lg:w-1/2 bg-[#5b5a47] flex items-center py-28 lg:py-0">
            <div
              ref={leftMenuRef}
              className="px-8 lg:pl-60 space-y-4 lg:space-y-6 text-2xl lg:text-4xl"
            >
              <p>Manifesto</p>
              <p>Spatial Journeys</p>
              <p>Material Archive</p>
              <p>Visit Atelier</p>
              <p>Rituals</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 bg-[#3f3f32] flex items-center justify-start lg:justify-end py-28 lg:py-0">
            <div
              ref={rightMenuRef}
              className="px-8 lg:pr-60 space-y-4 lg:space-y-6 text-xl lg:text-2xl text-left lg:text-right"
            >
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
