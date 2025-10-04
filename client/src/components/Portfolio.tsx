import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import ParticlesBackground from './ParticlesBackground';
import CustomCursor from './CustomCursor';

// Navigation Component
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 glass" data-testid="header-navigation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="logo">
              <a 
                href="#about" 
                className="text-2xl md:text-3xl font-heading font-bold gradient-text hover:scale-110 transition-transform duration-300 inline-block"
                data-testid="logo-link"
              >
                &lt;RR /&gt;
              </a>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-8" data-testid="desktop-menu">
              {[
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#certifications', label: 'Certifications' },
              ].map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
                    data-testid={`nav-link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                  data-testid="nav-contact-button"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden mobile-menu flex flex-col space-y-1.5 z-50 ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              data-testid="mobile-menu-button"
            >
              <span className="mobile-menu-line w-6 h-0.5 bg-foreground block"></span>
              <span className="mobile-menu-line w-6 h-0.5 bg-foreground block"></span>
              <span className="mobile-menu-line w-6 h-0.5 bg-foreground block"></span>
            </button>
          </nav>

          {/* Mobile Menu */}
          <div 
            className={`mobile-nav md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            data-testid="mobile-menu"
          >
            <ul className="flex flex-col space-y-4 py-6">
              {[
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#certifications', label: 'Certifications' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium block py-2"
                    onClick={closeMobileMenu}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="about" data-testid="hero-section">
      {/* Animated Background */}
      <ParticlesBackground />
      <div className="absolute inset-0 bg-grid opacity-30 animate-grid-move"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Code Style Tag */}
          <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-2 glass rounded-full border border-primary/30">
            <span className="text-primary font-mono text-sm" data-testid="hero-tag">&lt;data_engineer /&gt;</span>
          </motion.div>

          {/* Main Heading with Glitch Effect */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 glitch" 
            data-text="RAGHAV RAMAN"
            data-testid="hero-title"
          >
            <span className="gradient-text">RAGHAV RAMAN</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/90 mb-4" data-testid="hero-subtitle">
              Data Engineer <span className="text-accent">×</span> Cloud Architect <span className="text-secondary">×</span> ML Enthusiast
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base font-mono text-muted-foreground" data-testid="hero-tags">
              <span className="px-3 py-1 glass rounded-lg"># Python</span>
              <span className="px-3 py-1 glass rounded-lg"># AWS</span>
              <span className="px-3 py-1 glass rounded-lg"># Spark</span>
              <span className="px-3 py-1 glass rounded-lg"># ML/AI</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            data-testid="hero-description"
          >
            Transforming raw data into actionable insights through cutting-edge data engineering solutions. 
            Specializing in scalable cloud architectures, real-time processing, and machine learning pipelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#projects" 
              className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-foreground font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              data-testid="hero-cta-work"
            >
              View My Work
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 glass rounded-full text-foreground font-semibold text-lg neon-border hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              data-testid="hero-cta-contact"
            >
              <i className="fas fa-envelope"></i>
              Get In Touch
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="mt-20 animate-bounce" data-testid="scroll-indicator">
            <i className="fas fa-chevron-down text-3xl text-primary"></i>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const skills = [
    {
      icon: 'fas fa-database',
      title: 'Data Engineering',
      description: 'Building scalable data pipelines, ETL processes, and distributed systems using cutting-edge technologies.',
      progress: 95,
      gradient: 'from-primary to-secondary',
      tags: ['Spark', 'Hadoop', 'Kafka'],
      color: 'primary'
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud Architecture',
      description: 'Designing and implementing cloud-native solutions on AWS with focus on scalability and cost optimization.',
      progress: 92,
      gradient: 'from-secondary to-accent',
      tags: ['AWS', 'Lambda', 'S3'],
      color: 'secondary'
    },
    {
      icon: 'fas fa-brain',
      title: 'Machine Learning',
      description: 'Developing intelligent systems and predictive models using modern ML frameworks and techniques.',
      progress: 88,
      gradient: 'from-accent to-neon-green',
      tags: ['TensorFlow', 'PyTorch', 'Scikit'],
      color: 'accent'
    },
    {
      icon: 'fas fa-code',
      title: 'Programming',
      description: 'Expert in multiple programming languages with emphasis on Python for data engineering and automation.',
      progress: 97,
      gradient: 'from-neon-green to-neon-yellow',
      tags: ['Python', 'SQL', 'Scala'],
      color: 'neon-green'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Data Visualization',
      description: 'Creating compelling visual narratives and interactive dashboards to communicate complex insights.',
      progress: 90,
      gradient: 'from-neon-pink to-neon-purple',
      tags: ['Tableau', 'PowerBI', 'D3.js'],
      color: 'neon-pink'
    },
    {
      icon: 'fas fa-tools',
      title: 'DevOps & Tools',
      description: 'Implementing CI/CD pipelines, containerization, and infrastructure as code for robust deployments.',
      progress: 85,
      gradient: 'from-neon-cyan to-primary',
      tags: ['Docker', 'Git', 'Airflow'],
      color: 'neon-cyan'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="skills" data-testid="skills-section">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-light to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-mono text-sm md:text-base mb-4 block" data-testid="skills-tag">// EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-6" data-testid="skills-title">
            Technical Arsenal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="skills-description">
            A comprehensive toolkit for building robust data infrastructure and intelligent systems
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          data-testid="skills-grid"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.title}
              variants={itemVariants}
              className="tilt-card glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 group border border-primary/20 hover:border-primary/50 skill-card"
              data-testid={`skill-card-${skill.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300`}>
                  <i className={`${skill.icon} text-foreground`}></i>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold font-mono">{skill.progress}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-foreground" data-testid={`skill-title-${skill.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {skill.title}
              </h3>
              <p className="text-muted-foreground mb-6" data-testid={`skill-description-${skill.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {skill.description}
              </p>
              {/* Progress Bar */}
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {skill.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const projects = [
    {
      icon: 'fas fa-project-diagram',
      title: 'Real-Time Analytics Pipeline',
      description: 'Built a scalable real-time data processing system using Apache Kafka, Spark Streaming, and AWS services to handle 1M+ events per second.',
      tags: ['Kafka', 'Spark', 'AWS', 'Python'],
      category: 'Data Pipeline',
      tech: 'AWS',
      gradient: 'from-primary/80 to-secondary/80',
      hoverGradient: 'from-accent/40 via-secondary/40 to-primary/40'
    },
    {
      icon: 'fas fa-robot',
      title: 'Predictive Maintenance AI',
      description: 'Developed a machine learning system that predicts equipment failures 48 hours in advance, reducing downtime by 60% for industrial clients.',
      tags: ['TensorFlow', 'Python', 'MLOps', 'Docker'],
      category: 'ML Model',
      tech: 'AI',
      gradient: 'from-secondary/80 to-accent/80',
      hoverGradient: 'from-neon-pink/40 via-neon-purple/40 to-neon-cyan/40'
    },
    {
      icon: 'fas fa-cloud-upload-alt',
      title: 'Serverless Data Lake',
      description: 'Architected a serverless data lake on AWS using Lambda, Glue, and Athena, processing 500TB+ of data with 70% cost reduction.',
      tags: ['Lambda', 'Glue', 'S3', 'Athena'],
      category: 'Cloud',
      tech: 'ETL',
      gradient: 'from-accent/80 to-neon-green/80',
      hoverGradient: 'from-primary/40 via-accent/40 to-secondary/40'
    },
    {
      icon: 'fas fa-stream',
      title: 'IoT Data Platform',
      description: 'Created an end-to-end IoT platform processing sensor data from 10,000+ devices with real-time monitoring and alerting capabilities.',
      tags: ['IoT', 'MQTT', 'TimeSeries', 'MongoDB'],
      category: 'Streaming',
      tech: 'Real-time',
      gradient: 'from-neon-green/80 to-neon-yellow/80',
      hoverGradient: 'from-accent/40 via-neon-green/40 to-primary/40'
    },
    {
      icon: 'fas fa-warehouse',
      title: 'Enterprise Data Warehouse',
      description: 'Designed and implemented a multi-terabyte data warehouse using Snowflake with advanced analytics and reporting capabilities.',
      tags: ['Snowflake', 'dbt', 'SQL', 'DataOps'],
      category: 'DWH',
      tech: 'BI',
      gradient: 'from-neon-pink/80 to-neon-purple/80',
      hoverGradient: 'from-secondary/40 via-neon-pink/40 to-accent/40'
    },
    {
      icon: 'fas fa-sitemap',
      title: 'Data Orchestration Platform',
      description: 'Built a comprehensive data orchestration platform using Apache Airflow managing 200+ DAGs with advanced monitoring and SLA tracking.',
      tags: ['Airflow', 'Python', 'K8s', 'DataOps'],
      category: 'Automation',
      tech: 'Orchestration',
      gradient: 'from-neon-cyan/80 to-primary/80',
      hoverGradient: 'from-neon-green/40 via-neon-cyan/40 to-secondary/40'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="projects" data-testid="projects-section">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-mono text-sm md:text-base mb-4 block" data-testid="projects-tag">// PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-6" data-testid="projects-title">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="projects-description">
            Innovative solutions that showcase the power of modern data engineering
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="projects-grid"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.title}
              variants={itemVariants}
              className="group relative glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 border border-primary/20 hover:border-primary/50"
              data-testid={`project-card-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {/* Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`${project.icon} text-8xl text-foreground/30`}></i>
                </div>
                {/* Colorful Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-mono">{project.category}</span>
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-mono">{project.tech}</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors" data-testid={`project-title-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`project-description-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-muted-foreground">#{tag}</span>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all" data-testid={`project-link-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  View Project
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Certifications Section Component
const CertificationsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services • 2023',
      description: 'Advanced certification demonstrating expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
      tags: ['Cloud Architecture', 'Security', 'Best Practices'],
      icon: 'fas fa-award',
      gradient: 'from-primary to-secondary',
      color: 'primary'
    },
    {
      title: 'Google Professional Data Engineer',
      issuer: 'Google Cloud Platform • 2022',
      description: 'Professional certification showcasing ability to design, build, and manage data processing systems on Google Cloud Platform.',
      tags: ['BigQuery', 'Dataflow', 'ML Engine'],
      icon: 'fas fa-certificate',
      gradient: 'from-secondary to-accent',
      color: 'secondary'
    },
    {
      title: 'Apache Spark Developer Certification',
      issuer: 'Databricks • 2023',
      description: 'Certification validating expertise in developing large-scale data processing applications using Apache Spark and Databricks platform.',
      tags: ['PySpark', 'Scala', 'Delta Lake'],
      icon: 'fas fa-medal',
      gradient: 'from-accent to-neon-green',
      color: 'accent'
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google • 2022',
      description: 'Official certification demonstrating proficiency in building and training machine learning models using TensorFlow framework.',
      tags: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
      icon: 'fas fa-trophy',
      gradient: 'from-neon-green to-neon-yellow',
      color: 'neon-green'
    },
    {
      title: 'Snowflake SnowPro Core Certification',
      issuer: 'Snowflake • 2023',
      description: "Core certification validating knowledge of Snowflake's cloud data platform, data warehousing, and data lake capabilities.",
      tags: ['Data Warehousing', 'SQL', 'Cloud Platform'],
      icon: 'fas fa-star',
      gradient: 'from-neon-pink to-neon-purple',
      color: 'neon-pink'
    }
  ];

  const toggleCertification = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="certifications" data-testid="certifications-section">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-light to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-mono text-sm md:text-base mb-4 block" data-testid="certifications-tag">// ACHIEVEMENTS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-6" data-testid="certifications-title">
            Certifications & Awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="certifications-description">
            Professional credentials and recognition in data engineering and cloud technologies
          </p>
        </div>

        {/* Certifications Accordion */}
        <div className="max-w-4xl mx-auto space-y-4" data-testid="certifications-accordion">
          {certifications.map((cert, index) => (
            <div 
              key={cert.title}
              className="glass rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all cert-item"
              data-testid={`certification-item-${index}`}
            >
              <button 
                className="cert-header w-full text-left p-6 flex items-center justify-between hover:bg-primary/5 transition-colors" 
                onClick={() => toggleCertification(index)}
                aria-expanded={openIndex === index}
                data-testid={`certification-button-${index}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`${cert.icon} text-foreground text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1" data-testid={`certification-title-${index}`}>
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono" data-testid={`certification-issuer-${index}`}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <i className={`fas fa-chevron-down text-muted-foreground transition-transform duration-300 cert-icon ${openIndex === index ? 'rotate-180' : ''}`}></i>
              </button>
              
              <motion.div 
                className="cert-content overflow-hidden"
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                data-testid={`certification-content-${index}`}
              >
                <div className="p-6 pt-0">
                  <div className="pl-16">
                    <p className="text-muted-foreground mb-4" data-testid={`certification-description-${index}`}>
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cert.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 bg-${cert.color}/10 text-${cert.color} rounded-lg text-sm font-mono`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      description: 'Send me an email',
      link: 'mailto:the.raghav.raman@gmail.com',
      linkText: 'the.raghav.raman@gmail.com',
      gradient: 'from-primary to-secondary',
      color: 'primary'
    },
    {
      icon: 'fab fa-linkedin-in',
      title: 'LinkedIn',
      description: 'Connect professionally',
      link: 'https://www.linkedin.com/in/theraghavraman',
      linkText: '@theraghavraman',
      gradient: 'from-secondary to-accent',
      color: 'secondary'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      description: 'Check my code',
      link: 'https://github.com/theraghavraman',
      linkText: '@theraghavraman',
      gradient: 'from-accent to-neon-green',
      color: 'accent'
    },
    {
      icon: 'fas fa-award',
      title: 'Credly',
      description: 'View my badges',
      link: 'https://www.credly.com/users/raghav-raman/',
      linkText: 'View badges',
      gradient: 'from-neon-green to-neon-yellow',
      color: 'neon-green'
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="contact" data-testid="contact-section">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm md:text-base mb-4 block" data-testid="contact-tag">// GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-6" data-testid="contact-title">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Ready to discuss your next data engineering project? Reach out through any channel below
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16" data-testid="contact-grid">
          {contactMethods.map((method) => (
            <a 
              key={method.title}
              href={method.link} 
              className="group glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 text-center border border-primary/20 hover:border-primary/50"
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-testid={`contact-method-${method.title.toLowerCase()}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                <i className={`${method.icon} text-foreground text-2xl`}></i>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-foreground" data-testid={`contact-title-${method.title.toLowerCase()}`}>
                {method.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3" data-testid={`contact-description-${method.title.toLowerCase()}`}>
                {method.description}
              </p>
              <p className={`text-${method.color} font-mono text-sm`} data-testid={`contact-link-text-${method.title.toLowerCase()}`}>
                {method.linkText}
              </p>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 border border-primary/20" data-testid="contact-cta">
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 gradient-text" data-testid="contact-cta-title">
            Ready to Start a Project?
          </h3>
          <p className="text-lg text-muted-foreground mb-8" data-testid="contact-cta-description">
            Whether you need help with data engineering, cloud architecture, or machine learning, I'm here to help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:the.raghav.raman@gmail.com" 
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-foreground font-semibold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              data-testid="contact-cta-email"
            >
              <i className="fas fa-paper-plane"></i>
              Send Message
            </a>
            <a 
              href="#" 
              className="px-8 py-4 glass rounded-full text-foreground font-semibold text-lg neon-border hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              data-testid="contact-cta-resume"
            >
              <i className="fas fa-download"></i>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/theraghavraman', color: 'primary' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/theraghavraman', color: 'secondary' },
    { icon: 'fab fa-twitter', href: 'https://twitter.com/theraghavraman', color: 'accent' },
    { icon: 'fas fa-envelope', href: 'mailto:the.raghav.raman@gmail.com', color: 'neon-green' }
  ];

  return (
    <footer className="py-12 relative bg-dark/50" data-testid="footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-heading font-bold gradient-text mb-2" data-testid="footer-logo">
              &lt;RR /&gt;
            </div>
            <p className="text-muted-foreground" data-testid="footer-tagline">
              Building the future of data, one pipeline at a time
            </p>
          </div>

          <div className="flex gap-6" data-testid="footer-social">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-12 h-12 glass rounded-full flex items-center justify-center text-foreground hover:text-${link.color} hover:scale-110 transition-all duration-300 neon-border`}
                data-testid={`footer-social-${index}`}
              >
                <i className={`${link.icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p className="text-muted-foreground font-mono text-sm" data-testid="footer-copyright">
            &copy; 2025 Raghav Raman. Crafted with <span className="text-secondary">♥</span> and <span className="text-primary">code</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50" data-testid="loader">
        <div className="text-center">
          <div className="text-4xl font-heading font-bold gradient-text animate-pulse mb-4">RR</div>
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Portfolio;
