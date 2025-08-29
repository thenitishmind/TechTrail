function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// GitHub API Configuration
const GITHUB_USERNAME = 'thenitishmind';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Project Data Fetching
async function fetchGitHubProjects() {
  try {
    const response = await fetch(`${GITHUB_API_URL}?sort=updated&per_page=10`);
    if (!response.ok) throw new Error('Failed to fetch from GitHub');
    
    const repos = await response.json();
    return repos
      .filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        updated_at: repo.updated_at
      }));
  } catch (error) {
    console.error('GitHub fetch error:', error);
    return [];
  }
}

// Load projects and update DOM
async function loadProjects() {
  const loadingEl = document.getElementById('projects-loading');
  const errorEl = document.getElementById('projects-error');
  const containerEl = document.getElementById('projects-container');

  // Show loading
  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';

  try {
    const projects = await fetchGitHubProjects();
    
    if (projects.length > 0) {
      // Clear existing content and add fetched projects
      containerEl.innerHTML = '';
      
      projects.slice(0, 6).forEach(project => {
        const projectHTML = createProjectCard(project);
        containerEl.insertAdjacentHTML('beforeend', projectHTML);
      });
    }
    
    loadingEl.style.display = 'none';
  } catch (error) {
    console.error('Error loading projects:', error);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
  }
}

// Create project card HTML
function createProjectCard(project) {
  const imageUrl = getProjectImage(project.name, project.language);
  const githubUrl = project.html_url;
  const liveUrl = project.homepage;
  
  return `
    <div class="details-container color-container">
      <div class="article-container">
        <img src="${imageUrl}" alt="${project.name}" class="project-img" />
      </div>
      <h2 class="project-title">${formatProjectName(project.name)}</h2>
      <div class="project-content">
        <p class="project-description">${project.description}</p>
        
        <div class="project-meta">
          ${project.language ? `<span class="tech-tag">${project.language}</span>` : ''}
          ${project.stars > 0 ? `<span class="stars-count">⭐ ${project.stars}</span>` : ''}
        </div>
        
        <div class="project-buttons">
          <button class="project-btn primary" onclick="window.open('${githubUrl}', '_blank')">
            GitHub
          </button>
          ${liveUrl ? `<button class="project-btn" onclick="window.open('${liveUrl}', '_blank')">Live Demo</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Get project image based on name and language
function getProjectImage(projectName, language) {
  // Specific project mappings
  const specificImageMap = {
    'tablecraft': './assets/project-web-app.svg',
    'portfolio': './assets/project-web-app.svg',
    'netflix': './assets/netflix clone .jpg',
    'zara': './assets/Project zara.jpg',
    'rtca': './assets/project RtcA.jpg',
    'emusic': './assets/project-emusic.svg',
    'music': './assets/project-emusic.svg'
  };
  
  const lowerName = projectName.toLowerCase();
  
  // Check for specific project matches first
  for (const key in specificImageMap) {
    if (lowerName.includes(key)) {
      return specificImageMap[key];
    }
  }
  
  // Language-based image selection
  if (language) {
    const langLower = language.toLowerCase();
    if (['javascript', 'typescript', 'html', 'css', 'vue', 'react', 'angular'].includes(langLower)) {
      return './assets/project-web-app.svg';
    }
    if (['java', 'swift', 'kotlin', 'dart', 'react native'].includes(langLower)) {
      return './assets/project-mobile-app.svg';
    }
    if (['python', 'node.js', 'go', 'rust', 'php', 'c#', 'ruby'].includes(langLower)) {
      return './assets/project-api-backend.svg';
    }
  }
  
  // Default image for unknown projects
  return './assets/project-default.svg';
}

// Format project name for display
function formatProjectName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


// Education data fetching with comprehensive information
async function fetchEducationData() {
  // Enhanced education data with more details
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        educations: [
          {
            id: 1,
            type: "Bachelor's Degree",
            degree: "Bachelor of Computer Applications (BCA)",
            institution: "Glocal University",
            location: "Uttar Pradesh, India",
            year: "2016-2019",
            status: "Completed",
            grade: "CGPA: 7.70",
            description: "Specialized in Computer Science with comprehensive coursework in programming languages, database management, software engineering, and web development. Graduated with strong academic performance and practical project experience.",
            subjects: ["Programming Languages", "Database Management Systems", "Software Engineering", "Web Development", "Data Structures", "Computer Networks", "Operating Systems", "System Analysis"],
            skills: ["Software Development", "Database Design", "Web Technologies", "Problem Solving", "System Analysis", "Project Management"]
          },
          {
            id: 2,
            type: "Higher Secondary",
            degree: "12th Grade (Higher Secondary)",
            institution: "Science Stream",
            location: "India",
            year: "2015-2016",
            status: "Completed",
            grade: "78%",
            description: "Focused on Physics, Chemistry, and Mathematics with strong foundation in analytical thinking and mathematical problem-solving skills.",
            subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
            skills: ["Analytical Thinking", "Mathematical Problem Solving", "Scientific Method", "Logical Reasoning"]
          },
          {
            id: 3,
            type: "Secondary Education",
            degree: "10th Grade",
            institution: "Secondary Education Board",
            location: "India",
            year: "2013-2014",
            status: "Completed",
            grade: "75%",
            description: "Secured excellent marks in core subjects including Mathematics and Science, building a strong foundation for higher studies.",
            subjects: ["Mathematics", "Science", "English", "Social Studies", "Computer Applications"],
            skills: ["Foundation Skills", "Mathematical Concepts", "Scientific Understanding", "Communication Skills"]
          }
        ],
        certifications: [
          {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            year: "2023",
            status: "Certified"
          },
          {
            name: "Microsoft Certified: Azure Fundamentals",
            issuer: "Microsoft",
            year: "2023",
            status: "Certified"
          },
          {
            name: "Full Stack Web Development",
            issuer: "Various Online Platforms",
            year: "2022-2023",
            status: "Certified"
          }
        ]
      });
    }, 800);
  });
}

// Load and display education data
async function loadEducationData() {
  try {
    const educationData = await fetchEducationData();
    updateEducationSection(educationData);
  } catch (error) {
    console.error('Failed to load education data:', error);
  }
}

// Update education section with fetched data
function updateEducationSection(data) {
  const educationContainer = document.getElementById('education-details');
  if (!educationContainer) return;

  // Clear existing content
  educationContainer.innerHTML = '';

  // Create education cards
  data.educations.forEach((education, index) => {
    const educationCard = createEducationCard(education, index);
    educationContainer.insertAdjacentHTML('beforeend', educationCard);
  });

  // Add certifications section
  if (data.certifications && data.certifications.length > 0) {
    const certificationsSection = createCertificationsSection(data.certifications);
    educationContainer.insertAdjacentHTML('beforeend', certificationsSection);
  }
}

// Create education card HTML
function createEducationCard(education, index) {
  const subjectsList = education.subjects.slice(0, 4).join(' • ');
  const skillsList = education.skills.slice(0, 3).join(' • ');
  
  return `
    <div class="education-card" style="animation-delay: ${index * 0.2}s">
      <div class="education-header">
        <div class="education-icon">
          <img src="./assets/education.png" alt="Education icon" class="icon" />
        </div>
        <div class="education-info">
          <h3 class="education-degree">${education.degree}</h3>
          <h4 class="education-institution">${education.institution}</h4>
          <p class="education-location">${education.location}</p>
        </div>
        <div class="education-year">
          <span class="year-badge">${education.year}</span>
          <span class="status-badge ${education.status.toLowerCase()}">${education.status}</span>
        </div>
      </div>
      
      <div class="education-content">
        <p class="education-description">${education.description}</p>
        
        <div class="education-details">
          <div class="detail-section">
            <h5>Key Subjects</h5>
            <p class="subjects">${subjectsList}</p>
          </div>
          
          <div class="detail-section">
            <h5>Skills Acquired</h5>
            <p class="skills">${skillsList}</p>
          </div>
          
          ${education.grade ? `
            <div class="detail-section">
              <h5>Grade</h5>
              <p class="grade">${education.grade}</p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Create certifications section
function createCertificationsSection(certifications) {
  const certificationsHTML = certifications.map((cert, index) => `
    <div class="certification-item" style="animation-delay: ${(index + 2) * 0.2}s">
      <div class="cert-info">
        <h4>${cert.name}</h4>
        <p>${cert.issuer} • ${cert.year}</p>
      </div>
      <span class="cert-status ${cert.status.toLowerCase()}">${cert.status}</span>
    </div>
  `).join('');

  return `
    <div class="certifications-section">
      <h3 class="section-title">Certifications</h3>
      <div class="certifications-grid">
        ${certificationsHTML}
      </div>
    </div>
  `;
}

// Contact section is now static - no form handling needed

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadProjects();
  loadEducationData();
});

