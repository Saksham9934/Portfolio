import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { Github, Linkedin, Facebook, Mail, ArrowUp, Code, FileSpreadsheet, Keyboard, Brain, ExternalLink, GamepadIcon, RssIcon as ChessIcon, Dice1 as Dice, Boxes, Sun, Moon } from 'lucide-react';
import TicTacToe from './components/TicTacToe';
import ChessGame from './components/Chess';

function App() {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({
    about: false,
    service1: false,
    service2: false,
    service3: false
  });

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  // Toggle expanded state
  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const options = {
      strings: [
        "Hello, It's me^1000\nSaksham Jha^1000\nAnd I'm a Front End Web Developer^1000\nLooking for new opportunities..."
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };
    
    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      toggleVisibility();
      
      const sections = ['home', 'about', 'services', 'skills', 'games', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 50 },
    { name: 'JAVA', level: 80 },
    { name: 'REACT', level: 60 },
    { name: 'JAVASCRIPT', level: 20 }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0A0A] text-[#33FF33]' : 'bg-white text-gray-800'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full ${isDarkMode ? 'bg-[#0A0A0A]/90' : 'bg-white/90'} backdrop-blur-sm z-50 py-4`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <ul className="flex space-x-8">
              {['Home', 'About', 'Services', 'Skills', 'Games', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className={`${isDarkMode ? 'text-[#33FF33] hover:text-[#00FFFF]' : 'text-gray-800 hover:text-blue-600'} transition-colors duration-300 ${
                      activeSection === item.toLowerCase() ? isDarkMode ? 'border-b-2 border-[#00FFFF]' : 'border-b-2 border-blue-600' : ''
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#33FF33] text-[#0A0A0A]' : 'bg-gray-800 text-white'} transition-colors duration-300`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="max-w-2xl">
            <span ref={el} className="text-3xl md:text-4xl font-bold"></span>
            
            <div className="socials-container mt-8">
              <a 
                href="https://github.com/Saksham9934" 
                target="_blank" 
                rel="noopener noreferrer"
                data-social="GitHub"
                style={{ '--accent-color': '#2ea44f' } as React.CSSProperties}
              >
                <Github />
              </a>
              <a 
                href="https://www.linkedin.com/in/saksham-jha-141623275" 
                target="_blank"
                rel="noopener noreferrer"
                data-social="LinkedIn"
                style={{ '--accent-color': '#0077b5' } as React.CSSProperties}
              >
                <Linkedin />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61563999322121" 
                target="_blank"
                rel="noopener noreferrer"
                data-social="Facebook"
                style={{ '--accent-color': '#1877f2' } as React.CSSProperties}
              >
                <Facebook />
              </a>
              <a 
                href="https://t.me/Saksham77282" 
                target="_blank"
                rel="noopener noreferrer"
                data-social="Telegram"
                style={{ '--accent-color': '#0088cc' } as React.CSSProperties}
              >
                <Mail />
              </a>
            </div>

            <div className="mt-8 flex space-x-4">
              <a href="#contact" className="btn btn-primary">
                Hire me
              </a>
              <a href="/cv.pdf" download className="btn btn-outline">
                Download CV
              </a>
            </div>
          </div>

          <div className="profile-image hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
              alt="Saksham Jha"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-[#0A0A0A]/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="typed-container mb-8">
              <span className="text-xl">I'm Saksham and I'm Looking fo|</span>
            </div>
            <div className={`text-lg ${expanded.about ? '' : 'line-clamp-3'}`}>
              <p>
                Hello, My name is Saksham Jha, and I am currently pursuing a Diploma in Computer Engineering from Delhi Skill Entrepreneurship University. I have a strong passion for technology and a deep interest in exploring the world of computers and software development. Throughout my academic journey, I have gained a solid foundation in various programming languages, computer networks and database management. I am excited about the opportunities that lie ahead in my career and eager to learn many new technologies. Thank you for considering my introduction, and I look forward to engaging in meaningful discussions and collaborations in the field of computer engineering.
              </p>
            </div>
            <button 
              onClick={() => toggleExpand('about')}
              className={`mt-4 ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
            >
              {expanded.about ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Development */}
            <div className={`service-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Front-end Developer</h3>
              <p className={expanded.service1 ? '' : 'line-clamp-3'}>
                As a full stack web developer, I specialize in both front-end and Approximately for back-end development to build dynamic and responsive web applications.
              </p>
              <button 
                onClick={() => toggleExpand('service1')}
                className={`mt-4 ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                {expanded.service1 ? 'See Less' : 'See More'}
              </button>
            </div>

            {/* MS Excel */}
            <div className={`service-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <FileSpreadsheet className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">MS Excel</h3>
              <p className={expanded.service2 ? '' : 'line-clamp-3'}>
                With advanced proficiency in MS Excel, I offer expert services in data analysis, visualization, and management. Whether you need complex formulas.
              </p>
              <button 
                onClick={() => toggleExpand('service2')}
                className={`mt-4 ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                {expanded.service2 ? 'See Less' : 'See More'}
              </button>
            </div>

            {/* Typing */}
            <div className={`service-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <Keyboard className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Typing</h3>
              <p className={expanded.service3 ? '' : 'line-clamp-3'}>
                With a typing speed of 30 - 35 words per minute, I provide fast and accurate data entry and transcription services. My efficiency ensures timely.
              </p>
              <button 
                onClick={() => toggleExpand('service3')}
                className={`mt-4 ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                {expanded.service3 ? 'See Less' : 'See More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${isDarkMode ? 'bg-[#0A0A0A]/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">My Skills</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">My creative skills & experiences.</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Programming Languages: C, JAVA, Python and JavaScript</li>
                <li>Web Development: Experienced in React.js for front-end development</li>
                <li>CSS Frameworks: Proficient in Tailwind CSS for efficient styling</li>
                <li>Data Structures & Algorithms: Currently learning to enhance problem-solving skills</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-bar">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={`h-2 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full ${isDarkMode ? 'bg-gradient-to-r from-[#00FF00] to-[#00FFFF]' : 'bg-gradient-to-r from-blue-500 to-blue-700'} rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Interactive Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tic Tac Toe */}
            <div className={`game-card p-6 rounded-lg ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-xl transform transition-all duration-300 hover:scale-105`}>
              <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                <GamepadIcon className="w-6 h-6 mr-2" />
                Tic Tac Toe
              </h3>
              <TicTacToe />
            </div>

            {/* Chess */}
            <div className={`game-card p-6 rounded-lg ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-xl transform transition-all duration-300 hover:scale-105`}>
              <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                <ChessIcon className="w-6 h-6 mr-2" />
                Chess
              </h3>
              <ChessGame />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Portfolio Project */}
            <div className={`project-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <h3 className="text-2xl font-bold mb-4">Portfolio Website</h3>
              <p className="mb-4">A personal portfolio website built with React and Tailwind CSS.</p>
              <a 
                href="https://github.com/Saksham9934/Portfolio" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* YOLOv8 Project */}
            <div className={`project-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <h3 className="text-2xl font-bold mb-4">YOLOv8 Skin Cancer Detection</h3>
              <p className="mb-4">AI-powered skin cancer detection using YOLOv8.</p>
              <a 
                href="https://github.com/Saksham9934/yolov8_skin_cancer" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* CNN Project */}
            <div className={`project-card ${isDarkMode ? '' : 'bg-white shadow-lg'}`}>
              <h3 className="text-2xl font-bold mb-4">CNN Skin Cancer Detection</h3>
              <p className="mb-4">Deep learning approach to skin cancer detection using CNN.</p>
              <a 
                href="https://github.com/Saksham9934/CNN_skin_cancer" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${isDarkMode ? 'text-[#00FFFF] hover:text-[#FF00FF]' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDarkMode ? 'bg-[#0A0A0A]/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Contact Me</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
              <p className="mb-8">
                I would love to hear from you! Whether you have a project in mind, a question, or just want to say hello, feel free to reach out.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Name</h4>
                  <p>Saksham Jha</p>
                </div>
                <div>
                  <h4 className="font-bold">Address</h4>
                  <p>Delhi, India</p>
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p>sakshamjha3027@gmail.com</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full p-3 ${isDarkMode ? 'bg-[#1A1A1A] border-[#33FF33]' : 'bg-white border-gray-300'} rounded-lg border focus:border-[#00FFFF] focus:outline-none`}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full p-3 ${isDarkMode ? 'bg-[#1A1A1A] border-[#33FF33]' : 'bg-white border-gray-300'} rounded-lg border focus:border-[#00FFFF] focus:outline-none`}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className={`w-full p-3 ${isDarkMode ? 'bg-[#1A1A1A] border-[#33FF33]' : 'bg-white border-gray-300'} rounded-lg border focus:border-[#00FFFF] focus:outline-none`}
                />
                <textarea
                  placeholder="Describe project.."
                  rows={4}
                  className={`w-full p-3 ${isDarkMode ? 'bg-[#1A1A1A] border-[#33FF33]' : 'bg-white border-gray-300'} rounded-lg border focus:border-[#00FFFF] focus:outline-none`}
                ></textarea>
                <button type="submit" className="btn btn-primary w-full">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 text-center border-t ${isDarkMode ? 'border-[#33FF33]/20' : 'border-gray-200'}`}>
        <p>Created By Saksham Jha | © 2024 All rights reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full transition-colors duration-300 ${
            isDarkMode ? 'bg-[#00FF00] text-black hover:bg-[#00FFFF]' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;