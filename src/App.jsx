import { useState, useEffect, useRef } from "react";
import "./index.css";


const PORTFOLIO_DATA = {
  name: "Maria Koscheev",
  title: "Professional Chud Maxxer",
  tagline: "I think, therefore I",
  bio: "I like a little bit of this I like a little bit of that. I'm going to keep typing to show off the wrapping behavior of this bio without having to think of what to put down.",
  email: "mgkoscheev@gmail.com",
  github: "https://github.com/mkoscheev321",
  linkedin: "https://linkedin.com/maria-koscheev",
  location: "Austin, TX",

  skills: [
    "Chudmaxxing", "Larping", "Skill", "Other skill",
    "More skill", "Fortnite", "Breathing", "Existing",
  ],

  projects: [
    {
      title: "Weather Dashboard",
      description:
        "A real-time weather app using the OpenWeather API. Features 7-day forecasts, location search, and dark/light mode toggle.",
      tech: ["React", "API Integration", "CSS Grid"],
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ",
      featured: true,
    },
    {
      title: "Task Manager API",
      description:
        "A RESTful backend for a task management app, with user auth, CRUD operations, and persistent storage using PostgreSQL.",
      tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ",
      featured: true,
    },
    {
      title: "Portfolio Website",
      description:
        "This very site! Built with React and Vite, deployed via GitHub Pages. Designed with accessibility and performance in mind.",
      tech: ["React", "Vite", "GitHub Pages"],
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ",
      featured: false,
    },
    {
      title: "Recipe Finder",
      description:
        "A meal planning tool that suggests recipes based on ingredients you already have. Integrates with the Spoonacular API.",
      tech: ["JavaScript", "HTML", "CSS", "Fetch API"],
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ",
      featured: false,
    },
  ],

  experience: [
    {
      role: "Existing Professional",
      company: "Mom's Basement",
      period: "2005 – 2022; 2023 - Present",
      bullets: [
        "Mastered the art of cooking pizza rolls in the microwave",
        "Maintained a 100% success rate of not talking to people",
        "SHUT UP MOMMMMM, SILENCE FROM YOU, YOU ARE CUT OFF, FROM TALKING", 
      ],
    },
    {
      role: "CEO",
      company: "Nvidia",
      period: "2022 – 2023",
      bullets: [
        "Briefly locked in and got a j*b",
        "Decided it wasn't for me and went back to being a chud",
      ],
    },
  ],
};
// ============================================================
//  END OF CUSTOMIZATION SECTION
// ============================================================

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`section ${visible ? "revealed" : ""} ${className}`}>
      {children}
    </section>
  );
}

function Nav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["about", "projects", "experience", "contact"];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          {PORTFOLIO_DATA.name.split(" ").map(w => w[0]).join("")}
        </a>
        <button className="nav-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
        <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link}`}
                className={activeSection === link ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">Hello, I'm</div>
        <h1 className="hero-name">{PORTFOLIO_DATA.name}</h1>
        <div className="hero-title">{PORTFOLIO_DATA.title}</div>
        <p className="hero-tagline">{PORTFOLIO_DATA.tagline}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Get In Touch</a>
        </div>
        <div className="hero-scroll-hint">
          <span>scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>
      <div className="hero-decoration" aria-hidden="true">
        <div className="deco-ring ring-1"></div>
        <div className="deco-ring ring-2"></div>
        <div className="deco-ring ring-3"></div>
        <div className="deco-initials">{PORTFOLIO_DATA.name.split(" ").map(w => w[0]).join("")}</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <div className="section-label">01 — About</div>
      <div className="about-grid">
        <div className="about-text">
          <h2>A little about me</h2>
          <p>{PORTFOLIO_DATA.bio}</p>
          <div className="about-meta">
            <span>📍 {PORTFOLIO_DATA.location}</span>
            <span>✉️ <a href={`mailto:${PORTFOLIO_DATA.email}`}>{PORTFOLIO_DATA.email}</a></span>
          </div>
        </div>
        <div className="skills-panel">
          <div className="skills-title">Technologies & Tools</div>
          <div className="skills-grid">
            {PORTFOLIO_DATA.skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "featured"
    ? PORTFOLIO_DATA.projects.filter(p => p.featured)
    : PORTFOLIO_DATA.projects;

  return (
    <Section id="projects" className="projects-section">
      <div className="section-label">02 — Projects</div>
      <div className="section-header">
        <h2>Things I've Built</h2>
        <div className="filter-tabs">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "featured" ? "active" : ""} onClick={() => setFilter("featured")}>Featured</button>
        </div>
      </div>
      <div className="projects-grid">
        {filtered.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`project-card ${project.featured ? "featured" : ""}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {project.featured && <div className="featured-badge">Featured</div>}
            <div className="project-card-inner">
              <div className="project-icon">⬡</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="project-link-hint">View on GitHub →</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <div className="section-label">03 — Experience</div>
      <h2>Where I've Worked</h2>
      <div className="timeline">
        {PORTFOLIO_DATA.experience.map((job, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-body">
              <div className="timeline-period">{job.period}</div>
              <div className="timeline-role">{job.role}</div>
              <div className="timeline-company">{job.company}</div>
              <ul className="timeline-bullets">
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <div className="section-label">04 — Contact</div>
      <div className="contact-inner">
        <h2>Let's Work Together</h2>
        <p>I'm currently open to new opportunities. Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.</p>
        <a href={`mailto:${PORTFOLIO_DATA.email}`} className="btn btn-primary btn-large">
          Say Hello ✉️
        </a>
        <div className="social-links">
          <a href={`https://github.com/${PORTFOLIO_DATA.github}`} target="_blank" rel="noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={`https://linkedin.com/in/${PORTFOLIO_DATA.linkedin}`} target="_blank" rel="noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Designed & built by <strong>{PORTFOLIO_DATA.name}</strong></p>
      <p className="footer-sub">Built with React · Hosted on GitHub Pages</p>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
