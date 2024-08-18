import React, { useState } from 'react';
import './App.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiCloudflare, SiStripe, SiVite, SiMongoose } from 'react-icons/si';

// Custom Clerk SVG icon
const ClerkIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5zm0 15.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
  </svg>
);

const projects = [
  { 
    title: 'Our Thailand Wedding', 
    description: 'Booking website that connects foreigners with a variety of wedding packages across the country, simplifying the process of planning and reserving a destination wedding in Thailand.', 
    link: 'https://ourthailandwedding.com' 
  },
  { 
    title: 'Based Bases', 
    description: 'Social application for digital collaboration, freelancing, and project funding. This platform introduces the concept of "Bases of Operation," which function as dynamic, self-organizing guilds or corporations in the digital space.', 
    link: 'https://basedbases.com' 
  },
  { 
    title: 'Siam Care', 
    description: 'Thailand community EMS app enhancing emergency response. Features include geolocation rescue beacons and seamless API integration with local authorities as well as registered users for rapid medical assistance in emergency situations.', 
    link: 'https://siam-care.com'
  },
];

const skills = {
  Frontend: [
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'React', icon: <FaReact /> },
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
    { name: 'GitHub', icon: <FaGithub /> },
    { name: 'Clerk', icon: <ClerkIcon /> },
    { name: 'Stripe', icon: <SiStripe /> },
  ],
};

export default function App() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-20">
          <h1 className="text-8xl font-extrabold mb-4 animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            David O'Neil
          </h1>
          <p className="text-4xl font-light text-purple-300 mb-2">Software Developer</p>
          <p className="text-2xl font-medium text-purple-300 mb-8">
            <span className="inline-block px-3 py-1 bg-purple-700 rounded-full mr-2">Full-Stack Web Applications</span>
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://linkedin.com/in/yourusername" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
              Email
            </a>
          </div>
        </header>

        <main>
          <section className="mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">About</h2>
            <p className="text-gray-300 mb-4 text-xl leading-relaxed">
              Self-taught web developer with a passion for crafting. My expertise spans the entire MERN stack and beyond. With a background in extreme sports, including over 5,000 skydives, I bring a unique perspective to problem-solving in the tech world. I thrive on building community-focused applications that make a real-world impact.
            </p>
          </section>

          <section className="mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-10 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">Skills</h2>
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

          <section className="mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-10 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                  <h3 className="text-2xl font-bold mb-3 text-purple-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <a href={project.link} className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105 font-medium" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}