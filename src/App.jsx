import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiExternalLink } from 'react-icons/fi';
import './App.css';

// 3D Components
import Hero3D from './components/Hero3D';
import Project3D from './components/Project3D';
import Skills3D from './components/Skills3D';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current && cursorFollowerRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollowerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Section refs for animation
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const projects = [
    {
      id: 1,
      title: "NEBULA",
      description: "AI-Powered Creative Platform",
      category: "Web Application",
      technologies: ["React", "Three.js", "TensorFlow", "Node.js"],
      color: "#ff6b6b",
      link: "#"
    },
    {
      id: 2,
      title: "QUANTUM",
      description: "3D Interactive Experience",
      category: "Interactive Installation",
      technologies: ["WebGL", "GSAP", "Web Audio API", "Next.js"],
      color: "#4ecdc4",
      link: "#"
    },
    {
      id: 3,
      title: "INFINITY",
      description: "Metaverse Gallery",
      category: "VR Experience",
      technologies: ["A-Frame", "Socket.io", "Express", "MongoDB"],
      color: "#a8e6cf",
      link: "#"
    },
    {
      id: 4,
      title: "ECHO",
      description: "Spatial Audio Visualizer",
      category: "Creative Coding",
      technologies: ["Three.js", "Web Audio API", "GLSL", "React"],
      color: "#ffd93d",
      link: "#"
    }
  ];

  const skills = [
    { name: "React", percentage: 95, color: "#61dafb" },
    { name: "Three.js", percentage: 90, color: "#ff6b6b" },
    { name: "WebGL", percentage: 85, color: "#4ecdc4" },
    { name: "GSAP", percentage: 88, color: "#a8e6cf" },
    { name: "Node.js", percentage: 82, color: "#ffd93d" },
    { name: "TypeScript", percentage: 87, color: "#6b5b95" }
  ];

  const navItems = [
    { id: 'home', label: 'Home', number: '01' },
    { id: 'about', label: 'About', number: '02' },
    { id: 'projects', label: 'Projects', number: '03' },
    { id: 'skills', label: 'Skills', number: '04' },
    { id: 'contact', label: 'Contact', number: '05' }
  ];

  return (
    <div 
      className="app"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`cursor ${isHovering ? 'active' : ''}`}
      ></div>
      <div 
        ref={cursorFollowerRef}
        className={`cursor-follower ${isHovering ? 'active' : ''}`}
      ></div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="logo-text">PORTFOLIO</span>
          </motion.div>

          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>

          <motion.button 
            className="menu-toggle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span></span>
            <span></span>
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="hero-section">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.span 
              className="hero-tag"
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(255,107,107,0)', '0 0 20px 10px rgba(255,107,107,0.1)', '0 0 0 0 rgba(255,107,107,0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ DIGITAL ARTISAN
            </motion.span>
            
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                CREATING
              </motion.span>
              <br />
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                IMMERSIVE
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                DIGITAL WORLDS
              </motion.span>
            </h1>

            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Pushing the boundaries of web experiences through cutting-edge 
              3D technologies and creative innovation
            </motion.p>

            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.button 
                className="primary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                View Projects
                <span className="btn-icon">→</span>
              </motion.button>
              
              <motion.button 
                className="secondary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Showreel
                <span className="btn-icon">▶</span>
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">20+</span>
                <span className="stat-label">Awards</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>SCROLL</span>
            <div className="scroll-line"></div>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Hero3D />
              <Environment preset="city" />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate 
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="section-number">02</span>
              About Me
            </h2>
            <div className="section-line"></div>
          </motion.div>

          <div className="about-content">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="about-quote">
                "I believe in creating experiences that blur the line 
                between reality and imagination."
              </p>
              <p>
                I'm a creative developer and 3D artist with a passion for 
                pushing the boundaries of what's possible on the web. With 
                over 5 years of experience in interactive development, I've 
                worked with brands like Google, Nike, and Spotify to create 
                immersive digital experiences that captivate and inspire.
              </p>
              <p>
                My approach combines technical expertise with artistic vision, 
                leveraging cutting-edge technologies like WebGL, Three.js, and 
                AI to create websites that are not just functional, but truly 
                memorable.
              </p>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="image-container">
                <div className="image-overlay"></div>
                <div className="profile-placeholder">
                  <span>Profile</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="projects-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="section-number">02</span>
              Featured Projects
            </h2>
            <div className="section-line"></div>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="project-3d-container">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <Project3D project={project} />
                      <Environment preset="city" />
                    </Suspense>
                  </Canvas>
                </div>
                
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <a href={project.link} className="project-link">
                    View Project
                    <FiExternalLink />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="skills-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="section-number">03</span>
              Skills & Expertise
            </h2>
            <div className="section-line"></div>
          </motion.div>

          <div className="skills-content">
            <div className="skills-3d-container">
              <Canvas camera={{ position: [0, 0, 8] }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Skills3D skills={skills} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>

            <div className="skills-list">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: 50 }}
                  animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={skillsInView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="contact-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              <span className="section-number">04</span>
              Let's Connect
            </h2>
            <div className="section-line"></div>
          </motion.div>

          <div className="contact-content">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h3>Have a project in mind?</h3>
              <p>Let's create something extraordinary together</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">✉</span>
                  <span>hello@example.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+1 234 567 890</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GH
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LI
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  TW
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  IG
                </motion.a>
              </div>
            </motion.div>

            <motion.form 
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
                <div className="input-border"></div>
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
                <div className="input-border"></div>
              </div>
              
              <div className="form-group">
                <input type="text" placeholder="Subject" className="form-input" />
                <div className="input-border"></div>
              </div>
              
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" className="form-input"></textarea>
                <div className="input-border"></div>
              </div>
              
              <motion.button 
                type="submit" 
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
                <span className="btn-icon">→</span>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>© 2024 PORTFOLIO. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Credits</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;