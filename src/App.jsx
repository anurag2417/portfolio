import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Import 3D Components
import Hero3D from './components/Hero3D';
import FloatingShapes from './components/FloatingShapes';
import Project3D from './components/Project3D';
import Skills3D from './components/Skills3D';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  const projects = [
    {
      id: 1,
      title: "NEBULA",
      description: "AI-Powered Creative Platform",
      category: "Web Application",
      image: "/project1.jpg",
      color: "#ff6b6b",
      technologies: ["React", "Three.js", "TensorFlow", "Node.js"],
      link: "#"
    },
    {
      id: 2,
      title: "QUANTUM",
      description: "3D Interactive Experience",
      category: "Interactive Installation",
      image: "/project2.jpg",
      color: "#4ecdc4",
      technologies: ["WebGL", "GSAP", "Web Audio API", "Next.js"],
      link: "#"
    },
    {
      id: 3,
      title: "INFINITY",
      description: "Metaverse Gallery",
      category: "VR Experience",
      image: "/project3.jpg",
      color: "#a8e6cf",
      technologies: ["A-Frame", "Socket.io", "Express", "MongoDB"],
      link: "#"
    },
    {
      id: 4,
      title: "ECHO",
      description: "Spatial Audio Visualizer",
      category: "Creative Coding",
      image: "/project4.jpg",
      color: "#ffd93d",
      technologies: ["Three.js", "Web Audio API", "GLSL", "React"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", level: 95, color: "#61dafb" },
    { name: "Three.js", level: 90, color: "#ff6b6b" },
    { name: "WebGL", level: 85, color: "#4ecdc4" },
    { name: "GSAP", level: 88, color: "#a8e6cf" },
    { name: "Node.js", level: 82, color: "#ffd93d" },
    { name: "TypeScript", level: 87, color: "#6b5b95" }
  ];

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div className="cursor"></div>
      <div className="cursor-follower"></div>

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
            <span className="logo-dot">●</span>
          </motion.div>

          <motion.ul 
            className="nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <motion.li 
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={`#${item.toLowerCase()}`} className="nav-link">
                  <span className="nav-index">0{index + 1}</span>
                  {item}
                </a>
              </motion.li>
            ))}
          </motion.ul>

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

      {/* Hero Section with 3D */}
      <section id="home" ref={heroRef} className="hero-section">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.span 
              className="hero-greeting"
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 20px 10px rgba(255,255,255,0.1)', '0 0 0 0 rgba(255,255,255,0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ DIGITAL ARTISAN
            </motion.span>
            
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                CREATING
              </motion.span>
              <br />
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                IMMERSIVE
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                DIGITAL WORLDS
              </motion.span>
            </h1>

            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Pushing the boundaries of web experiences through 
              cutting-edge 3D technologies and creative innovation
            </motion.p>

            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <motion.button 
                className="primary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              transition={{ duration: 1, delay: 2 }}
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Projects' },
                { value: '20+', label: 'Awards' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  whileHover={{ y: -5 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
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
              <FloatingShapes count={20} />
              <Environment preset="city" />
              <ContactShadows 
                opacity={0.4} 
                scale={20} 
                blur={1} 
                far={10} 
                resolution={256} 
                color="#000000" 
              />
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
              <span className="section-number">01</span>
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
                <img src="https://via.placeholder.com/600x800" alt="Profile" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section with 3D */}
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
                className="project-item"
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
                
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <motion.a 
                    href={project.link} 
                    className="project-link"
                    whileHover={{ x: 5 }}
                  >
                    View Project
                    <span className="link-arrow">→</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with 3D */}
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
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={skillsInView ? { width: `${skill.level}%` } : {}}
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
                <motion.a 
                  href="mailto:hello@example.com" 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <span className="contact-icon">✉</span>
                  <span>hello@example.com</span>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <span className="contact-icon">📱</span>
                  <span>+1 234 567 890</span>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <span className="contact-icon">📍</span>
                  <span>San Francisco, CA</span>
                </motion.a>
              </div>

              <div className="social-links">
                {['GH', 'LI', 'TW', 'IG'].map((social, index) => (
                  <motion.a 
                    key={index}
                    href="#"
                    className="social-link"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social}
                  </motion.a>
                ))}
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
                <span className="input-border"></span>
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
                <span className="input-border"></span>
              </div>
              
              <div className="form-group">
                <input type="text" placeholder="Subject" className="form-input" />
                <span className="input-border"></span>
              </div>
              
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" className="form-input"></textarea>
                <span className="input-border"></span>
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
          <motion.div 
            className="footer-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p>© 2024 Creative Portfolio. All rights reserved.</p>
          </motion.div>
          
          <motion.div 
            className="footer-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Credits</a>
          </motion.div>
          
          <motion.a 
            href="#" 
            className="back-to-top"
            whileHover={{ y: -5 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ↑
          </motion.a>
        </div>
      </footer>
    </div>
  );
}

export default App;