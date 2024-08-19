import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiCloudflare, SiStripe, SiVite, SiMongoose, SiSupabase } from 'react-icons/si';

// Custom Clerk SVG icon
const ClerkIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5zm0 15.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
  </svg>
);

const TypeWriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const MovingDotsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

const skills = {
  Frontend: [
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'Vite', icon: <SiVite /> },
  ],
  Backend: [
    { name: 'Node', icon: <FaNodeJs /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Mongoose', icon: <SiMongoose /> },
  ],
  DevOps: [
    { name: 'Cloudflare', icon: <SiCloudflare /> },
    { name: 'Clerk', icon: <ClerkIcon /> },
    { name: 'Stripe', icon: <SiStripe /> },
    { name: 'Supabase', icon: <SiSupabase /> },
    { name: 'GitHub', icon: <FaGithub /> },
  ],
};

export default function App() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [nameTyped, setNameTyped] = useState(false);
  const [selfTaughtTyped, setSelfTaughtTyped] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-x-hidden font-sans">
      <MovingDotsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-20">
          <h1 className="text-8xl font-extrabold mb-4 text-white font-serif glow-text">
            <TypeWriter text="David O'Neil" onComplete={() => setNameTyped(true)} />
          </h1>
          <p className="text-4xl font-light text-purple-300 mb-2 font-sans">Software Developer</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://linkedin.com/in/David-Oneil-Dev" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
          <div className="text-xl text-white">
            {nameTyped && <TypeWriter text="Self-taught with a passion for crafting." onComplete={() => setSelfTaughtTyped(true)} />}
          </div>
        </header>

        <main>
          <section className="mb-20 animate-fade-in">
            {selfTaughtTyped && (
              <h2 className="text-5xl font-bold mb-10 animate-drop-in white-glow-reduced bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 text-center font-serif">
                Full-Stack Web Applications
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, categorySkills]) => (
                <div key={category} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">{category}</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {categorySkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`bg-purple-700 bg-opacity-50 text-purple-200 px-4 py-2 rounded-full text-sm transition duration-300 flex items-center ${hoveredSkill === skill.name ? 'scale-110 shadow-md' : ''}`}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="mr-2 text-xl">{skill.icon}</span>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}