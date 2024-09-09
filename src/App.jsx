import React, { useState, useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiCloudflare, SiStripe, SiVite, SiMongoose, SiSupabase } from 'react-icons/si';
import { motion, useAnimation } from 'framer-motion';

// Custom Clerk SVG icon
const ClerkIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5zm0 15.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
  </svg>
);

// TypeWriter Component
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
    <span className="inline-block animate-throb">
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
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'React', icon: <FaReact /> },
  ],
  Backend: [
    { name: 'Supabase', icon: <SiSupabase /> },
  ],
  DevOps: [
    { name: 'Cloudflare', icon: <SiCloudflare /> },
    { name: 'GitHub', icon: <FaGithub /> },
  ],
};

export default function App() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [nameTyped, setNameTyped] = useState(false);
  const [selfTaughtTyped, setSelfTaughtTyped] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const controlsHeading = useAnimation();
  const controlsCategories = useAnimation();
  const controlsSkills = useAnimation();

  useEffect(() => {
    if (selfTaughtTyped) {
      setTimeout(() => setHeadingVisible(true), 500);
    }
  }, [selfTaughtTyped]);

  useEffect(() => {
    if (headingVisible) {
      setTimeout(() => setCategoriesVisible(true), 1000); // Wait 1 second after heading is visible
    }
  }, [headingVisible]);

  useEffect(() => {
    if (headingVisible) {
      controlsHeading.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
  }, [headingVisible, controlsHeading]);

  useEffect(() => {
    if (categoriesVisible) {
      controlsCategories.start({ opacity: 1, y: 0, transition: { duration: 1 } });
      setTimeout(() => {
        controlsSkills.start(i => ({
          opacity: 1,
          x: 0,
          transition: { duration: 1, delay: i * 0.5 }
        }));
      }, 500); // Delay skills animation to start after categories are visible
    }
  }, [categoriesVisible, controlsCategories, controlsSkills]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-x-hidden font-sans">
      <MovingDotsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-extrabold mb-4 text-white font-serif ">
            <TypeWriter text="David O'Neil" onComplete={() => setNameTyped(true)} />
          </h1>
          <p className="text-4xl font-light text-purple-300 mb-2 font-sans ">
            <TypeWriter text="Software Developer" />
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://linkedin.com/in/David-Oneil-Dev" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
          <div className="text-xl text-white animate-throb">
            {nameTyped && <TypeWriter text="Self-taught with a passion for crafting." onComplete={() => setSelfTaughtTyped(true)} />}
          </div>
        </header>

        <main>
          <section className="mb-20">
            <motion.h2
              className="text-3xl font-bold mb-10 text-white text-center font-serif bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"
              animate={controlsHeading}
              initial={{ opacity: 0, y: -100 }} // Starts above the screen
            >
              Full-Stack Applications
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              animate={controlsCategories}
              initial={{ opacity: 0, y: 50 }}
            >
              {Object.entries(skills).map(([category, categorySkills], index) => (
                <motion.div
                  key={category}
                  className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 flex flex-col items-center text-center"
                  animate={controlsSkills}
                  initial={{ opacity: 0, x: -100 }}
                  custom={index}
                >
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">{category}</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {categorySkills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className={`bg-purple-700 bg-opacity-50 text-purple-200 px-4 py-2 rounded-full text-sm transition duration-300 flex items-center ${hoveredSkill === skill.name ? 'scale-110 shadow-md' : ''}`}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="mr-2 text-xl">{skill.icon}</span>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}