import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "Python", level: 90, icon: "🐍", color: "#3B82F6" },
  { name: "JavaScript", level: 85, icon: "⚡", color: "#F59E0B" },
  { name: "React.js", level: 82, icon: "⚛️", color: "#06B6D4" },
  { name: "HTML & CSS", level: 92, icon: "🌐", color: "#EF4444" },
  { name: "Flask & Django", level: 80, icon: "🔥", color: "#10B981" },
  { name: "Node.js", level: 75, icon: "🟢", color: "#22C55E" },
  { name: "MySQL", level: 78, icon: "🗄️", color: "#8B5CF6" },
  { name: "Git & GitHub", level: 82, icon: "🐙", color: "#EC4899" },
];

const TOOLS = ["Postman", "VS Code", "Bootstrap", "Selenium", "OpenCV", "REST APIs", "Gemini API", "Prompt Engineering", "OCR", "Automation"];

const EXPERIENCE = [
  {
    role: "Python & AI Software Developer",
    company: "Crimsions Systems Pvt. Ltd.",
    period: "March 2025 – Feb 2026",
    type: "Hybrid · Jabalpur",
    badge: "Jr. Developer",
    badgeColor: "#10B981",
    accent: "#6C63FF",
    points: [
      "Promoted from Intern to Jr. Developer based on performance",
      "Developed automation systems using Python, Flask, Selenium & MySQL",
      "Built Face Recognition Attendance System using OpenCV with real-time DB updates",
      "Created Voice-to-Text & Translation web app with live transcription",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "EZ Solutions India",
    period: "Oct 2024 – March 2025",
    type: "Remote · Mumbai",
    badge: "Intern",
    badgeColor: "#F59E0B",
    accent: "#F472B6",
    points: [
      "Built Fashion Store E-commerce Web App using React.js, Node.js & MySQL",
      "Implemented product listing, user authentication, and API integration",
      "Developed a Tic Tac Toe game using JavaScript",
    ],
  },

];

const PROJECTS = [
  { title: "Employee Onboarding Automation", desc: "Automated HR workflow using Python, Flask, Selenium & MySQL — reducing manual work significantly.", tags: ["Python", "Flask", "Selenium", "MySQL"], emoji: "🤖", accent: "#6C63FF", bg: "linear-gradient(135deg,#EEF2FF,#F5F3FF)" },
  { title: "Face Recognition Attendance", desc: "Real-time face detection using OpenCV with automatic attendance logging and live database updates.", tags: ["Python", "OpenCV", "MySQL"], emoji: "👁️", accent: "#10B981", bg: "linear-gradient(135deg,#F0FDF4,#ECFDF5)" },
  { title: "Voice-to-Text & Translation", desc: "Live speech recognition with multi-language translation powered by modern APIs and NLP techniques.", tags: ["Python", "API", "NLP"], emoji: "🎙️", accent: "#8B5CF6", bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)" },
  { title: "Fashion Store Web App", desc: "Full e-commerce app with product listing, user authentication & complete API integration.", tags: ["React.js", "Node.js", "MySQL"], emoji: "🛍️", accent: "#EC4899", bg: "linear-gradient(135deg,#FDF2F8,#FCE7F3)" },
];

const EDUCATION = [
  { degree: "B.Tech — Computer Science", institute: "Guru Ramdas Khalsa Institute of Science & Technology", location: "Jabalpur, MP", year: "2018–2021", score: "CGPA: 7.9", icon: "🎓", color: "#6C63FF" },
  { degree: "MBA — (1st Year Completed)", institute: "Radiant College, RDVV", location: "Jabalpur, MP", year: "2021–2022", score: "69.25%", icon: "📊", color: "#F59E0B" },
  { degree: "PGDCA", institute: "REVA Institute of Computer Management", location: "Mandla, MP", year: "2022–2023", score: "68%", icon: "💻", color: "#10B981" },
];

const AI_RESPONSES = {
  skills: "Shivani is highly skilled in Python, React.js, Flask, Django, and JavaScript. She also works with OpenCV, Selenium automation, and Gemini API integration. Her full-stack capabilities span both frontend and backend development.",
  projects: "Shivani has built 4 impressive projects: an Employee Onboarding Automation system, a Face Recognition Attendance system using OpenCV, a Voice-to-Text translation app, and a full Fashion Store e-commerce platform.",
  experience: "Shivani has 1+ years of experience. She worked as a Jr. Developer at Crimsions Systems (AI & Python), as a Full Stack Developer Intern at EZ Solutions India, and as a Valuation Report Executive at Alankrati.",
  hire: "Absolutely! Shivani is open to freelance projects and full-time opportunities. She specializes in Python automation, AI integration, and full-stack web development. Reach her at sahushivani606@gmail.com or call +91 9109027927.",
  education: "Shivani holds a B.Tech in Computer Science (CGPA 7.9) from Guru Ramdas Khalsa Institute, completed 1st year of MBA from RDVV, and has a PGDCA from REVA Institute.",
  default: "Hi! I'm Shivani's AI assistant. I can tell you about her skills, projects, experience, education, or how to hire her. What would you like to know? 😊",
};

function getAIReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("skill") || m.includes("tech") || m.includes("language") || m.includes("know")) return AI_RESPONSES.skills;
  if (m.includes("project") || m.includes("built") || m.includes("work") || m.includes("portfolio")) return AI_RESPONSES.projects;
  if (m.includes("experience") || m.includes("job") || m.includes("intern") || m.includes("company")) return AI_RESPONSES.experience;
  if (m.includes("hire") || m.includes("contact") || m.includes("freelance") || m.includes("available")) return AI_RESPONSES.hire;
  if (m.includes("education") || m.includes("degree") || m.includes("college") || m.includes("study")) return AI_RESPONSES.education;
  return AI_RESPONSES.default;
}

function TypeWriter({ words }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) { setTimeout(() => setDeleting(true), 1400); return; }
    if (subIndex === 0 && deleting) { setDeleting(false); setIndex((p) => (p + 1) % words.length); return; }
    const t = setTimeout(() => { setText(words[index].substring(0, subIndex)); setSubIndex((p) => p + (deleting ? -1 : 1)); }, deleting ? 55 : 100);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting, words]);
  return <span style={{ background: "linear-gradient(90deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{text}<span style={{ WebkitTextFillColor: "#6C63FF", animation: "blink 1s infinite" }}>|</span></span>;
}

function SkillBar({ skill, visible, delay }) {
  return (
    <div style={{ marginBottom: "18px", animation: visible ? `fadeUp 0.6s ease ${delay}s both` : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
        <span style={{ color: "#1F2937", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>{skill.icon}</span> {skill.name}
        </span>
        <span style={{ fontSize: "12px", fontWeight: "800", color: skill.color, background: `${skill.color}18`, padding: "3px 10px", borderRadius: "50px" }}>{skill.level}%</span>
      </div>
      <div style={{ background: "#F3F4F6", borderRadius: "50px", height: "8px", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: "50px", background: `linear-gradient(90deg,${skill.color},${skill.color}99)`, width: visible ? `${skill.level}%` : "0%", transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}s`, boxShadow: `0 0 10px ${skill.color}60` }} />
      </div>
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function ShivaniTech() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([{ role: "ai", text: "Hi! 👋 I'm Shivani's AI assistant. Ask me anything about her skills, projects, experience, or how to hire her!" }]);
  const [aiInput, setAiInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const aiEndRef = useRef(null);
  const [skillsRef, skillsVisible] = useInView();
  const [expRef, expVisible] = useInView();
  const [projRef, projVisible] = useInView();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, aiTyping]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setTimeout(() => { setSent(false); setFormData({ name: "", email: "", message: "" }); }, 3000);
    }
  };

  const sendAI = () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiMessages(p => [...p, { role: "user", text: userMsg }]);
    setAiInput("");
    setAiTyping(true);
    setTimeout(() => {
      setAiTyping(false);
      setAiMessages(p => [...p, { role: "ai", text: getAIReply(userMsg) }]);
    }, 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#F3F4F6; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#6C63FF,#EC4899); border-radius:4px; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-16px) rotate(1deg)} 66%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn { from{transform:scale(0.88);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(108,99,255,0.4)} 70%{box-shadow:0 0 0 16px rgba(108,99,255,0)} 100%{box-shadow:0 0 0 0 rgba(108,99,255,0)} }
        @keyframes shimmer { from{background-position:200% center} to{background-position:-200% center} }
        @keyframes bounce-dot { 0%,80%,100%{transform:scale(0.8);opacity:0.5} 40%{transform:scale(1);opacity:1} }
        @keyframes cursor-trail { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes card-appear { from{opacity:0;transform:translateY(40px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }

        .navlink { color:#6B7280; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; cursor:pointer; padding:6px 4px; position:relative; transition:color 0.25s; }
        .navlink::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:0; height:2px; background:linear-gradient(90deg,#6C63FF,#EC4899); transition:width 0.3s; border-radius:2px; }
        .navlink:hover, .navlink.active { color:#6C63FF; }
        .navlink:hover::after, .navlink.active::after { width:100%; }

        .btnp { background:linear-gradient(135deg,#6C63FF,#8B5CF6,#EC4899); background-size:200%; color:#fff; border:none; border-radius:14px; padding:14px 32px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; letter-spacing:0.3px; transition:all 0.3s; box-shadow:0 6px 24px rgba(108,99,255,0.35); animation:gradient-shift 4s ease infinite; }
        .btnp:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 14px 36px rgba(108,99,255,0.5); }

        .btno { background:transparent; color:#6C63FF; border:2px solid transparent; background-image:linear-gradient(white,white),linear-gradient(135deg,#6C63FF,#EC4899); background-origin:border-box; background-clip:padding-box,border-box; border-radius:14px; padding:12px 30px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; transition:all 0.3s; }
        .btno:hover { background-image:linear-gradient(#EEF2FF,#EEF2FF),linear-gradient(135deg,#6C63FF,#EC4899); transform:translateY(-3px); box-shadow:0 8px 24px rgba(108,99,255,0.2); }

        .glass { background:rgba(255,255,255,0.7); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.8); }

        .cardhov { transition:all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .cardhov:hover { transform:translateY(-8px) scale(1.01); box-shadow:0 24px 60px rgba(108,99,255,0.15) !important; }

        .inputf { width:100%; background:#F8FAFC; border:1.5px solid #E2E8F0; border-radius:12px; padding:14px 18px; color:#1F2937; font-size:15px; outline:none; font-family:'Inter',sans-serif; transition:all 0.3s; }
        .inputf:focus { border-color:#6C63FF; box-shadow:0 0 0 4px rgba(108,99,255,0.08); background:#fff; }
        .inputf::placeholder { color:#CBD5E1; }

        .socbtn { background:#F8FAFC; border:1.5px solid #E2E8F0; border-radius:12px; padding:11px 18px; color:#374151; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.3s; font-family:'Inter',sans-serif; display:inline-flex; align-items:center; gap:6px; }
        .socbtn:hover { background:linear-gradient(135deg,#EEF2FF,#F5F3FF); border-color:#6C63FF; color:#6C63FF; transform:translateY(-3px); box-shadow:0 6px 20px rgba(108,99,255,0.15); }

        .hmbtn { background:none; border:none; cursor:pointer; padding:8px; display:none; flex-direction:column; gap:5px; }
        .hmbtn span { display:block; width:24px; height:2.5px; background:linear-gradient(90deg,#6C63FF,#EC4899); border-radius:4px; transition:all 0.3s; }

        .tag-pill { display:inline-block; border-radius:50px; padding:5px 18px; font-size:12px; font-weight:700; letter-spacing:0.5px; }

        .cursor-dot { width:10px; height:10px; background:linear-gradient(135deg,#6C63FF,#EC4899); border-radius:50%; position:fixed; pointer-events:none; z-index:9999; transition:transform 0.1s; transform:translate(-50%,-50%); }
        .cursor-ring { width:32px; height:32px; border:2px solid rgba(108,99,255,0.4); border-radius:50%; position:fixed; pointer-events:none; z-index:9998; transition:all 0.15s ease-out; transform:translate(-50%,-50%); }

        .ai-fab { position:fixed; bottom:28px; right:28px; z-index:999; width:58px; height:58px; border-radius:50%; background:linear-gradient(135deg,#6C63FF,#EC4899); border:none; cursor:pointer; color:#fff; font-size:24px; box-shadow:0 8px 32px rgba(108,99,255,0.45); transition:all 0.3s; animation:pulse-ring 2.5s infinite; display:flex; align-items:center; justify-content:center; }
        .ai-fab:hover { transform:scale(1.12); }

        .typing-dot { width:7px; height:7px; background:#6C63FF; border-radius:50%; display:inline-block; margin:0 2px; animation:bounce-dot 1.2s infinite; }

        .shimmer-text { background:linear-gradient(90deg,#6C63FF,#EC4899,#8B5CF6,#6C63FF); background-size:300% auto; WebkitBackgroundClip:text; WebkitTextFillColor:transparent; animation:shimmer 4s linear infinite; }

        .section-tag { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,rgba(108,99,255,0.1),rgba(236,72,153,0.08)); border:1px solid rgba(108,99,255,0.2); border-radius:50px; padding:6px 20px; font-size:12px; font-weight:700; color:#6C63FF; letter-spacing:1.5px; margin-bottom:16px; }

        @media (max-width:768px) {
          .deskonly { display:none !important; }
          .hmbtn { display:flex !important; }
          .twocol { grid-template-columns:1fr !important; }
          .cursor-dot, .cursor-ring { display:none; }
        }
        @media (max-width:480px) {
          .threecol { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y }} />

      <div style={{ background: "#FAFBFF", color: "#1F2937", fontFamily: "'Inter',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, background: scrollY > 40 ? "rgba(250,251,255,0.92)" : "transparent", backdropFilter: scrollY > 40 ? "blur(24px)" : "none", borderBottom: scrollY > 40 ? "1px solid rgba(108,99,255,0.1)" : "none", transition: "all 0.4s", padding: "0 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
            <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg,#6C63FF,#EC4899)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "17px", fontFamily: "'Space Mono',monospace", fontWeight: "700", boxShadow: "0 4px 14px rgba(108,99,255,0.4)" }}>S</div>
              <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.5px" }}>
                <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shivani</span>
                <span style={{ color: "#1F2937" }}>Tech</span>
              </span>
            </div>
            <ul className="deskonly" style={{ display: "flex", gap: "6px", listStyle: "none", alignItems: "center" }}>
              {NAV_LINKS.map((l) => (
                <li key={l}><span className={`navlink ${activeNav === l ? "active" : ""}`} onClick={() => scrollTo(l.toLowerCase())} style={{ padding: "6px 12px", borderRadius: "8px" }}>{l}</span></li>
              ))}
            </ul>
            <button className="btnp deskonly" style={{ padding: "10px 22px", fontSize: "13px" }} onClick={() => scrollTo("contact")}>✨ Hire Me</button>
            <button className="hmbtn" onClick={() => setMenuOpen(p => !p)}>
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
          {menuOpen && (
            <div style={{ background: "rgba(250,251,255,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(108,99,255,0.1)", padding: "16px 5%", display: "flex", flexDirection: "column", gap: "4px", boxShadow: "0 16px 40px rgba(0,0,0,0.08)", animation: "slideDown 0.3s ease" }}>
              {NAV_LINKS.map((l) => (
                <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: activeNav === l ? "linear-gradient(135deg,rgba(108,99,255,0.1),rgba(236,72,153,0.08))" : "transparent", border: "none", textAlign: "left", padding: "13px 18px", borderRadius: "12px", fontSize: "15px", fontWeight: "600", color: activeNav === l ? "#6C63FF" : "#374151", cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>
                  {l}
                </button>
              ))}
              <button className="btnp" style={{ marginTop: "8px", width: "100%" }} onClick={() => scrollTo("contact")}>✨ Hire Me</button>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "70px" }}>
          {/* Animated background blobs */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#FAFBFF 0%,#F0EDFF 40%,#FDF2FF 70%,#FAFBFF 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(108,99,255,0.12) 0%,transparent 70%)", top: "-150px", right: "-150px", animation: "spin-slow 20s linear infinite", zIndex: 0 }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.1) 0%,transparent 70%)", bottom: "-80px", left: "-100px", zIndex: 0 }} />
          <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)", top: "40%", left: "35%", zIndex: 0 }} />

          {/* Grid dots */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(108,99,255,0.08) 1px,transparent 1px)", backgroundSize: "36px 36px", zIndex: 0 }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 5%", width: "100%", position: "relative", zIndex: 1 }}>
            <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "60px", alignItems: "center" }}>
              <div style={{ animation: "fadeLeft 0.8s ease both" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg,rgba(108,99,255,0.1),rgba(236,72,153,0.08))", border: "1px solid rgba(108,99,255,0.2)", borderRadius: "50px", padding: "8px 20px", fontSize: "13px", fontWeight: "700", color: "#6C63FF", marginBottom: "28px", fontFamily: "'Inter',sans-serif" }}>
                  <span style={{ width: "8px", height: "8px", background: "#22C55E", borderRadius: "50%", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)", animation: "pulse-ring 2s infinite" }} />
                  Available for Freelance Projects
                </div>

                <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(44px,6vw,74px)", fontWeight: "800", lineHeight: 1.05, marginBottom: "10px", letterSpacing: "-2px", color: "#0F0F1A" }}>
                  Hi, I'm
                </h1>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(44px,6vw,74px)", fontWeight: "800", lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-2px" }}>
                  <span style={{ background: "linear-gradient(135deg,#6C63FF 0%,#8B5CF6 50%,#EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "shimmer 5s linear infinite" }}>Shivani Sahu</span> 👋
                </h1>

                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(16px,2.2vw,22px)", color: "#6B7280", marginBottom: "24px", minHeight: "36px" }}>
                  <TypeWriter words={["Python Developer", "Full Stack Developer", "AI & Automation Engineer", "React.js Developer", "Freelancer"]} />
                </div>

                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", color: "#6B7280", lineHeight: 1.85, marginBottom: "40px", maxWidth: "500px", fontWeight: "400" }}>
                  B.Tech (CS) graduate with hands-on experience in <strong style={{ color: "#6C63FF", fontWeight: "600" }}>Python AI automation</strong>, and <strong style={{ color: "#EC4899", fontWeight: "600" }}>full-stack web development</strong>. I build smart, scalable applications. 🚀
                </p>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
                  <button className="btnp" onClick={() => scrollTo("projects")}>View My Work →</button>
                  <button className="btno" onClick={() => scrollTo("contact")}>Get In Touch</button>
                </div>

                <div style={{ display: "flex", gap: "0", background: "white", borderRadius: "20px", padding: "20px 28px", boxShadow: "0 4px 24px rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.1)", display: "inline-flex", gap: "32px", flexWrap: "wrap" }}>
                  {[["4+", "Projects", "#6C63FF"], ["1+", "Yrs Exp", "#EC4899"], ["7.9", "CGPA", "#10B981"]].map(([n, l, c]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "26px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: c, letterSpacing: "-1px" }}>{n}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", letterSpacing: "0.5px", marginTop: "2px" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", animation: "fadeRight 0.8s ease 0.2s both" }}>
                <div style={{ animation: "float 6s ease-in-out infinite", position: "relative" }}>
                  {/* Outer glow ring */}
                  <div style={{ position: "absolute", inset: "-8px", borderRadius: "45% 55% 55% 45% / 45% 45% 55% 55%", background: "linear-gradient(135deg,#6C63FF40,#EC489940)", filter: "blur(16px)" }} />
                  <div style={{ width: "320px", height: "320px", borderRadius: "45% 55% 55% 45% / 45% 45% 55% 55%", background: "linear-gradient(135deg,#6C63FF,#8B5CF6,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "120px", boxShadow: "0 30px 80px rgba(108,99,255,0.4), 0 0 0 8px rgba(108,99,255,0.1)", position: "relative" }}>
                    👩‍💻
                  </div>

                  {/* Floating chips */}
                  <div style={{ position: "absolute", top: "20px", right: "-40px", background: "#fff", borderRadius: "16px", padding: "12px 16px", fontSize: "12px", fontWeight: "700", color: "#1F2937", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(108,99,255,0.15)", fontFamily: "'Space Mono',monospace", whiteSpace: "nowrap", animation: "float 4s ease-in-out 0.5s infinite" }}>
                    <span style={{ color: "#6C63FF" }}>const</span> dev = <span style={{ color: "#E11D48" }}>"Shivani"</span>
                  </div>
                  <div style={{ position: "absolute", bottom: "28px", left: "-44px", background: "#fff", borderRadius: "16px", padding: "11px 16px", fontSize: "13px", fontWeight: "700", color: "#1F2937", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(34,197,94,0.2)", animation: "float 5s ease-in-out 1s infinite" }}>
                    ✅ Open to Work
                  </div>
                  <div style={{ position: "absolute", top: "-20px", left: "30px", background: "#fff", borderRadius: "14px", padding: "9px 15px", fontSize: "12px", fontWeight: "700", color: "#374151", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(108,99,255,0.15)", animation: "float 4.5s ease-in-out 0.2s infinite" }}>
                    🌐 shivanitech.in
                  </div>
                  <div style={{ position: "absolute", bottom: "100px", right: "-36px", background: "linear-gradient(135deg,#6C63FF,#EC4899)", borderRadius: "14px", padding: "10px 15px", fontSize: "12px", fontWeight: "700", color: "#fff", boxShadow: "0 4px 20px rgba(108,99,255,0.3)", animation: "float 5.5s ease-in-out 0.8s infinite" }}>
                    🤖 AI Dev
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "110px 5%", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-tag">✦ ABOUT ME</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0F0F1A" }}>Who Am I? <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🤔</span></h2>
            </div>
            <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
              <div style={{ animation: "fadeLeft 0.7s ease both" }}>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 2, marginBottom: "20px", fontFamily: "'Inter',sans-serif" }}>
                  I'm <strong style={{ color: "#1F2937", fontWeight: "700" }}>Shivani Sahu</strong> — a passionate developer from <strong style={{ color: "#6C63FF" }}>Jabalpur, Madhya Pradesh</strong> with a B.Tech in Computer Science. I specialize in Python-based AI automation, backend development, and full-stack web applications.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 2, marginBottom: "36px" }}>
                  With real-world experience at <strong style={{ color: "#1F2937" }}>Crimsions Systems</strong> and <strong style={{ color: "#1F2937" }}>EZ Solutions India</strong>, I've built face recognition systems, voice-to-text apps, and complete e-commerce platforms.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
                  {[["📍", "Location", "Jabalpur, MP", "#EEF2FF", "#6C63FF"], ["💼", "Experience", "1+ Years", "#FDF4FF", "#8B5CF6"], ["🎓", "Education", "B.Tech (CS)", "#F0FDF4", "#10B981"], ["💬", "Languages", "Hindi & English", "#FFF7ED", "#F59E0B"]].map(([icon, key, val, bg, c]) => (
                    <div key={key} style={{ background: bg, border: `1px solid ${c}25`, borderRadius: "16px", padding: "16px 18px", transition: "all 0.3s" }}>
                      <div style={{ fontSize: "22px", marginBottom: "6px" }}>{icon}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", letterSpacing: "1px", marginBottom: "3px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>{key.toUpperCase()}</div>
                      <div style={{ fontSize: "14px", color: "#1F2937", fontWeight: "700", fontFamily: "'Syne',sans-serif" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "11px", fontWeight: "800", color: "#6C63FF", letterSpacing: "2px", marginBottom: "18px", fontFamily: "'Inter',sans-serif" }}>EDUCATION</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                  {EDUCATION.map((e, i) => (
                    <div key={i} className="cardhov" style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${e.color}15`, border: `1.5px solid ${e.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{e.icon}</div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "#1F2937", fontFamily: "'Syne',sans-serif", marginBottom: "3px" }}>{e.degree}</div>
                        <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px", fontFamily: "'Inter',sans-serif" }}>{e.institute}</div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "11px", color: "#9CA3AF", fontFamily: "'Inter',sans-serif" }}>📅 {e.year}</span>
                          <span style={{ fontSize: "11px", background: `${e.color}18`, color: e.color, padding: "2px 12px", borderRadius: "50px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>{e.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: "11px", fontWeight: "800", color: "#6C63FF", letterSpacing: "2px", marginBottom: "14px", fontFamily: "'Inter',sans-serif" }}>CERTIFICATIONS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[{ title: "Full Stack Development", org: "EZ Solutions India", icon: "🏆", color: "#F59E0B" }, { title: "Python & AI/ML Internship", org: "Crimsions Systems", icon: "🤖", color: "#6C63FF" }].map((c, i) => (
                    <div key={i} className="cardhov" style={{ display: "flex", alignItems: "center", gap: "14px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "14px", padding: "14px 18px" }}>
                      <span style={{ fontSize: "24px" }}>{c.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#1F2937", fontFamily: "'Syne',sans-serif" }}>{c.title}</div>
                        <div style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Inter',sans-serif" }}>{c.org}</div>
                      </div>
                      <span style={{ fontSize: "11px", background: "#10B981", color: "#fff", padding: "4px 14px", borderRadius: "50px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>✓ Certified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={skillsRef} style={{ padding: "110px 5%", background: "linear-gradient(180deg,#F8FAFF 0%,#F0EDFF 50%,#F8FAFF 100%)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-tag">✦ TECHNICAL SKILLS</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0F0F1A" }}>My Expertise <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🛠️</span></h2>
            </div>
            <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              {[SKILLS.slice(0, 4), SKILLS.slice(4)].map((group, gi) => (
                <div key={gi} style={{ background: "#fff", borderRadius: "24px", padding: "36px", border: "1px solid rgba(108,99,255,0.1)", boxShadow: "0 4px 24px rgba(108,99,255,0.06)", animation: skillsVisible ? `fadeUp 0.6s ease ${gi * 0.15}s both` : "none" }}>
                  {group.map((s, i) => <SkillBar key={s.name} skill={s} visible={skillsVisible} delay={gi * 0.15 + i * 0.1} />)}
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: "24px", padding: "28px 36px", border: "1px solid rgba(108,99,255,0.1)", boxShadow: "0 4px 24px rgba(108,99,255,0.06)", animation: skillsVisible ? "fadeUp 0.6s ease 0.4s both" : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", color: "#6C63FF", letterSpacing: "2px", marginBottom: "18px", fontFamily: "'Inter',sans-serif" }}>TOOLS & TECHNOLOGIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {TOOLS.map((t, i) => (
                  <span key={t} style={{ background: `hsl(${240 + i * 15},80%,97%)`, border: `1.5px solid hsl(${240 + i * 15},70%,88%)`, borderRadius: "50px", padding: "8px 20px", fontSize: "13px", color: `hsl(${240 + i * 15},60%,45%)`, fontWeight: "600", fontFamily: "'Inter',sans-serif", transition: "all 0.3s", cursor: "default" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" ref={expRef} style={{ padding: "110px 5%", background: "#fff" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-tag">✦ WORK EXPERIENCE</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0F0F1A" }}>My Journey <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>💼</span></h2>
            </div>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: "24px", marginBottom: i < EXPERIENCE.length - 1 ? "8px" : "0", animation: expVisible ? `fadeLeft 0.7s ease ${i * 0.15}s both` : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "24px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: `linear-gradient(135deg,${exp.accent},${exp.badgeColor})`, border: "3px solid #fff", boxShadow: `0 0 0 3px ${exp.accent}40`, flexShrink: 0 }} />
                  {i < EXPERIENCE.length - 1 && <div style={{ width: "2px", flex: 1, background: "linear-gradient(#E2E8F0,#E2E8F0)", margin: "10px 0", minHeight: "48px" }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: i < EXPERIENCE.length - 1 ? "32px" : "0" }}>
                  <div className="cardhov" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "26px 30px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px", flexWrap: "wrap" }}>
                          <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#1F2937", fontFamily: "'Syne',sans-serif" }}>{exp.role}</h3>
                          <span style={{ fontSize: "11px", background: `${exp.badgeColor}18`, color: exp.badgeColor, border: `1px solid ${exp.badgeColor}40`, padding: "3px 14px", borderRadius: "50px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>{exp.badge}</span>
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: "700", background: `linear-gradient(135deg,${exp.accent},${exp.badgeColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Inter',sans-serif" }}>{exp.company}</div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "3px", fontFamily: "'Inter',sans-serif" }}>📍 {exp.type}</div>
                      </div>
                      <span style={{ fontSize: "12px", background: "linear-gradient(135deg,rgba(108,99,255,0.08),rgba(236,72,153,0.06))", color: "#6C63FF", border: "1px solid rgba(108,99,255,0.15)", padding: "6px 16px", borderRadius: "50px", fontWeight: "600", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>📅 {exp.period}</span>
                    </div>
                    <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.75, fontFamily: "'Inter',sans-serif" }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" ref={projRef} style={{ padding: "110px 5%", background: "linear-gradient(180deg,#F8FAFF 0%,#F5F3FF 50%,#F8FAFF 100%)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-tag">✦ PORTFOLIO</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0F0F1A" }}>My Projects <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🚀</span></h2>
            </div>
            <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
              {PROJECTS.map((p, i) => (
                <div key={p.title} className="cardhov" style={{ background: p.bg, border: `1px solid ${p.accent}20`, borderRadius: "24px", padding: "32px", cursor: "pointer", boxShadow: `0 4px 24px ${p.accent}12`, animation: projVisible ? `card-appear 0.6s ease ${i * 0.12}s both` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "18px" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "#fff", border: `2px solid ${p.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0, boxShadow: `0 4px 16px ${p.accent}20` }}>{p.emoji}</div>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#1F2937", fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{p.title}</h3>
                  </div>
                  <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.8, marginBottom: "22px", fontFamily: "'Inter',sans-serif" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ background: `${p.accent}15`, color: p.accent, border: `1.5px solid ${p.accent}35`, borderRadius: "50px", padding: "5px 16px", fontSize: "11px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "110px 5%", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-tag">✦ GET IN TOUCH</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0F0F1A" }}>Let's Connect! <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>💬</span></h2>
              <p style={{ color: "#6B7280", fontSize: "17px", maxWidth: "500px", margin: "16px auto 0", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>Have a project in mind or want to collaborate? I'd love to hear from you!</p>
            </div>
            <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <div>
                <div style={{ marginBottom: "28px" }}>
                  {[["📧", "Email", "sahushivani606@gmail.com", "#EEF2FF", "#6C63FF"], ["📱", "Phone", "+91 9109027927", "#F5F3FF", "#8B5CF6"], ["📍", "Location", "Jabalpur, Madhya Pradesh", "#FFF7ED", "#F59E0B"], ["🌐", "Website", "shivanitech.in", "#F0FDF4", "#10B981"], ["💼", "LinkedIn", "linkedin.com/in/shivani-sahu", "#EEF2FF", "#0A66C2"], ["🐙", "GitHub", "github.com/shivani123-eng", "#F8FAFC", "#374151"]].map(([icon, key, val, bg, c]) => (
                    <div key={key} className="cardhov" style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "10px", background: bg, border: `1px solid ${c}20`, borderRadius: "16px", padding: "14px 18px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{icon}</div>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: "10px", color: "#9CA3AF", letterSpacing: "1.5px", marginBottom: "2px", fontWeight: "700", fontFamily: "'Inter',sans-serif" }}>{key.toUpperCase()}</div>
                        <div style={{ fontSize: "13px", color: "#1F2937", fontWeight: "700", fontFamily: "'Syne',sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {[["GitHub", "🐙", "https://github.com/shivani123-eng"], ["LinkedIn", "💼", "https://linkedin.com/in/shivani-sahu-5b110b29b"]].map(([name, icon, href]) => (
                    <a key={name} href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                      <button className="socbtn">{icon} {name}</button>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: "#F8FAFC", border: "1px solid rgba(108,99,255,0.12)", borderRadius: "24px", padding: "36px", boxShadow: "0 8px 48px rgba(108,99,255,0.08)" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0", animation: "scaleIn 0.4s ease" }}>
                    <div style={{ fontSize: "64px", marginBottom: "18px" }}>🎉</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "24px", fontWeight: "800", marginBottom: "10px" }}>Message Sent!</h3>
                    <p style={{ color: "#6B7280", fontFamily: "'Inter',sans-serif" }}>Thank you! I'll reply soon. 🙏</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: "800", color: "#1F2937", marginBottom: "24px" }}>Send a Message ✉️</h3>
                    {[["YOUR NAME", "name", "text", "Your full name"], ["EMAIL ADDRESS", "email", "email", "your@email.com"]].map(([label, field, type, ph]) => (
                      <div key={field} style={{ marginBottom: "18px" }}>
                        <label style={{ fontSize: "11px", color: "#9CA3AF", letterSpacing: "1.5px", fontWeight: "700", display: "block", marginBottom: "8px", fontFamily: "'Inter',sans-serif" }}>{label}</label>
                        <input className="inputf" type={type} placeholder={ph} value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} />
                      </div>
                    ))}
                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ fontSize: "11px", color: "#9CA3AF", letterSpacing: "1.5px", fontWeight: "700", display: "block", marginBottom: "8px", fontFamily: "'Inter',sans-serif" }}>MESSAGE</label>
                      <textarea className="inputf" style={{ height: "120px", resize: "vertical" }} placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <button className="btnp" style={{ width: "100%", textAlign: "center" }} onClick={handleSubmit}>Send Message 🚀</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#0F0F1A", padding: "44px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg,#6C63FF,#EC4899)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "15px", fontFamily: "'Space Mono',monospace", fontWeight: "700" }}>S</div>
              <span style={{ fontSize: "19px", fontWeight: "800", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.5px" }}>
                <span style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shivani</span>
                <span style={{ color: "#fff" }}>Tech</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              {NAV_LINKS.map((l) => (
                <span key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ color: "#6B7280", fontSize: "13px", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: "500", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#A78BFA"}
                  onMouseLeave={e => e.target.style.color = "#6B7280"}>{l}</span>
              ))}
            </div>
            <p style={{ color: "#4B5563", fontSize: "13px", fontFamily: "'Space Mono',monospace", textAlign: "center" }}>
              © 2026 Shivani Sahu · shivanitech.in · Made with <span style={{ color: "#EC4899" }}>♥</span> & lots of <span style={{ color: "#6C63FF" }}>{'</>'}</span>
            </p>
          </div>
        </footer>

        {/* ── AI CHATBOT FAB ── */}
        <button className="ai-fab" onClick={() => setAiOpen(p => !p)} title="Ask AI about Shivani">
          {aiOpen ? "✕" : "🤖"}
        </button>

        {/* ── AI CHAT WINDOW ── */}
        {aiOpen && (
          <div style={{ position: "fixed", bottom: "100px", right: "28px", width: "340px", background: "#fff", borderRadius: "24px", boxShadow: "0 24px 80px rgba(108,99,255,0.25)", border: "1px solid rgba(108,99,255,0.15)", zIndex: 998, animation: "scaleIn 0.3s ease", overflow: "hidden" }}>
            {/* Chat header */}
            <div style={{ background: "linear-gradient(135deg,#6C63FF,#8B5CF6,#EC4899)", padding: "18px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🤖</div>
              <div>
                <div style={{ color: "#fff", fontWeight: "800", fontSize: "14px", fontFamily: "'Syne',sans-serif" }}>Shivani's AI Assistant</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", fontFamily: "'Inter',sans-serif" }}>Ask me anything about Shivani!</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ height: "260px", overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", background: "#F8FAFF" }}>
              {aiMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#6C63FF,#EC4899)" : "#fff", color: m.role === "user" ? "#fff" : "#374151", fontSize: "13px", fontFamily: "'Inter',sans-serif", lineHeight: 1.6, boxShadow: m.role === "user" ? "0 4px 12px rgba(108,99,255,0.3)" : "0 2px 8px rgba(0,0,0,0.06)", border: m.role === "ai" ? "1px solid rgba(108,99,255,0.1)" : "none" }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {aiTyping && (
                <div style={{ display: "flex" }}>
                  <div style={{ background: "#fff", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid rgba(108,99,255,0.1)", display: "flex", gap: "3px", alignItems: "center" }}>
                    {[0, 0.2, 0.4].map((d, i) => <span key={i} className="typing-dot" style={{ animationDelay: `${d}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={aiEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "12px", background: "#fff", borderTop: "1px solid #E2E8F0", display: "flex", gap: "8px" }}>
              <input
                className="inputf"
                style={{ fontSize: "13px", padding: "10px 14px", flex: 1 }}
                placeholder="Ask about skills, projects..."
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendAI()}
              />
              <button onClick={sendAI} style={{ background: "linear-gradient(135deg,#6C63FF,#EC4899)", border: "none", borderRadius: "10px", width: "40px", height: "40px", cursor: "pointer", color: "#fff", fontSize: "16px", flexShrink: 0, transition: "all 0.3s" }}>→</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}