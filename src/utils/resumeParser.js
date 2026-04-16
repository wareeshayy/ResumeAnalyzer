export const parseResumeText = (text) => {
  const sections = {
    personal: { name: '', email: '', phone: '', location: '' },
    education: [],
    experience: [],
    projects: [],
    skills: {
      languages: '',
      frontend: '',
      backend: '',
      databases: '',
      tools: ''
    },
    achievements: []
  };

  if (!text) return sections;

  // Split text by lines and clean
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // 1. Basic Info Extraction (Heuristics)
  sections.personal.name = lines[0]?.replace(/OBJECTIVE|CONTACT|ME/gi, '').trim() || 'WAREESHA ASHRAF';
  sections.personal.email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || '';
  sections.personal.phone = text.match(/[\+]?[\d\s-]{10,}/)?.[0] || '';

  // 2. Section Extraction using Keywords
  let currentSection = '';
  
  lines.forEach((line, index) => {
    const upperLine = line.toUpperCase();
    
    if (upperLine.includes('EDUCATION')) {
      currentSection = 'education';
      return;
    } else if (upperLine.includes('SKILLS')) {
      currentSection = 'skills';
      return;
    } else if (upperLine.includes('PROJECTS')) {
      currentSection = 'projects';
      return;
    } else if (upperLine.includes('EXPERIENCE') || upperLine.includes('WORK HISTORY')) {
      currentSection = 'experience';
      return;
    } else if (upperLine.includes('ACHIEVEMENTS') || upperLine.includes('ACTIVITIES')) {
      currentSection = 'achievements';
      return;
    }

    // Add content to current section
    if (currentSection === 'education') {
      if (line.length > 5) sections.education.push(line);
    } else if (currentSection === 'skills') {
      if (upperLine.includes('LANGUAGES')) sections.skills.languages = line.split(':').pop()?.trim();
      else if (upperLine.includes('WEB') || upperLine.includes('FRONTEND')) sections.skills.frontend = line.split(':').pop()?.trim();
      else if (upperLine.includes('BACKEND')) sections.skills.backend = line.split(':').pop()?.trim();
      else if (upperLine.includes('DATABASE')) sections.skills.databases = line.split(':').pop()?.trim();
      else if (upperLine.includes('TOOLS') || upperLine.includes('PLATFORMS')) sections.skills.tools = line.split(':').pop()?.trim();
      else if (line.length > 3) sections.skills.tools += (sections.skills.tools ? ', ' : '') + line;
    } else if (currentSection === 'projects') {
      if (line.length > 10) sections.projects.push(line);
    } else if (currentSection === 'experience') {
      if (line.length > 10) sections.experience.push(line);
    } else if (currentSection === 'achievements') {
      if (line.length > 5) sections.achievements.push(line);
    }
  });

  // Cleanup Skills strings (remove duplicates, etc)
  Object.keys(sections.skills).forEach(key => {
    if (sections.skills[key]) {
      sections.skills[key] = [...new Set(sections.skills[key].split(',').map(s => s.trim()))].join(', ');
    }
  });

  return sections;
};
