/*=============== ICON REPLACEMENT ===============*/
feather.replace();

/*=============== STICKY HEADER ===============*/
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

/*=============== MOBILE NAV TOGGLE ===============*/
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('show');
    menuIcon.classList.toggle('active');
});

// Close mobile nav when a link is clicked
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            menuIcon.classList.remove('active');
        }
    });
});


/*=============== THEME SWITCH ===============*/
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggle.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('change', switchTheme, false);


/*=============== TYPED.JS ANIMATION ===============*/
const typed = new Typed('.typing-text', {
    strings: [
        'Data Science Engineering.',
        'Machine Learning & AI.',
        'Full-Stack Web Development.',
        'Computer Vision & Analytics.',
        'Building Real-World Solutions.'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1200,
    loop: true,
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
});

sr.reveal('.hero-container', { origin: 'top' });
sr.reveal('.section-title, .section-subtitle', { delay: 200 });
sr.reveal('.about-content', { origin: 'bottom' });
sr.reveal('.skills-container .skill-card', { interval: 200 });
sr.reveal('.projects-slider', { interval: 200 });
sr.reveal('.cert-grid .cert-card', { interval: 150 });
sr.reveal('.growth-container .growth-item', { interval: 200 });
sr.reveal('.goals-container .goal-item', { interval: 200, origin: 'left' });
sr.reveal('.contact-info', { origin: 'left' });
sr.reveal('.contact-form', { origin: 'right' });


/*=============== SWIPER JS INITIALIZATION & DYNAMIC REPO ANALYZER ===============*/
let swiper = new Swiper('.projects-slider', {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Dynamic GitHub Repos Analyzer & Auto-Sync
/*=============== SECURITY SANITIZATION HELPER ===============*/
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Dynamic GitHub Repos Analyzer & Auto-Sync
async function loadGitHubProjects() {
    const GITHUB_USERNAME = 'omprasad-007';
    const wrapper = document.querySelector('.projects-slider .swiper-wrapper');
    if (!wrapper) return;

    // Asset image map for known projects
    const knownImages = {
        'securepay-ai': 'assets/images/securepay-ai-logo.jpg',
        'krishisetu': 'assets/images/krishisetu-logo.jpg',
        'bharatkrishi': 'assets/images/krishisetu-logo.jpg',
        'agroscan-ai': 'assets/images/agroscan-ai-logo.jpg',
        '80th_independence_day': 'assets/images/independenceday-logo.jpg',
        '80th-independence-day': 'assets/images/independenceday-logo.jpg',
        'omprasad-portfolio': 'assets/images/portfolio-website-logo.jpg'
    };

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) return;

        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) return;

        // Filter valid projects (exclude forks, archived, or user profile readme repo)
        const validRepos = repos.filter(repo => {
            const nameLower = repo.name.toLowerCase();
            return !repo.fork && !repo.archived && nameLower !== GITHUB_USERNAME.toLowerCase();
        });

        if (validRepos.length === 0) return;

        // Generate slides HTML
        const slidesHtml = validRepos.map(repo => {
            const nameLower = repo.name.toLowerCase();
            const topics = repo.topics || [];
            const topicsLower = topics.map(t => t.toLowerCase());
            
            // Format Title
            let title = repo.name
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            
            if (nameLower.includes('bharatkrishi') || nameLower.includes('krishi')) {
                title = 'KrishiSetu - Bridge for Farmers';
            } else if (nameLower.includes('80th')) {
                title = '80th Independence Day Wishes';
            } else if (nameLower.includes('agroscan')) {
                title = 'AgroScan AI';
            } else if (nameLower.includes('securepay')) {
                title = 'SecurePay AI';
            } else if (nameLower.includes('portfolio')) {
                title = 'Portfolio Website';
            }

            title = escapeHTML(title);

            // Description
            const description = escapeHTML(repo.description || 'GitHub project repository focusing on intelligent engineering and software solutions.');

            // Live Demo URL determination
            let liveDemo = repo.homepage ? repo.homepage.trim() : null;
            if (liveDemo && !liveDemo.startsWith('http://') && !liveDemo.startsWith('https://')) {
                liveDemo = `https://${liveDemo}`;
            }

            // Status determination (Ongoing vs Completed)
            const isCompleted = topicsLower.includes('completed') || topicsLower.includes('done') || Boolean(liveDemo);
            const status = isCompleted ? 'completed' : 'ongoing';

            // Technologies tags
            const techList = [];
            if (repo.language) techList.push(repo.language);
            topics.forEach(t => {
                if (!['portfolio', 'completed', 'ongoing', 'wip'].includes(t.toLowerCase()) && !techList.includes(t)) {
                    techList.push(t);
                }
            });
            if (techList.length === 0) techList.push('Web App', 'Engineering');

            // Image matching
            let imgSrc = knownImages[nameLower];
            if (!imgSrc) {
                for (const key in knownImages) {
                    if (nameLower.includes(key)) {
                        imgSrc = knownImages[key];
                        break;
                    }
                }
            }
            if (!imgSrc) {
                imgSrc = 'assets/images/project-portfolio.png'; // Clean default preview image
            }

            // Tech stack badges HTML
            const techStackHtml = techList.slice(0, 4).map(t => `<span>${escapeHTML(t)}</span>`).join('');

            // Action links HTML
            let actionLinksHtml = '';
            const safeHtmlUrl = escapeHTML(repo.html_url);
            const safeLiveDemo = escapeHTML(liveDemo);

            if (status === 'completed' && liveDemo) {
                actionLinksHtml = `
                    <a href="${safeLiveDemo}" class="btn-link" target="_blank" rel="noopener noreferrer">Live Demo <i data-feather="external-link"></i></a>
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer" style="margin-left: 0.5rem; opacity: 0.8;">GitHub <i data-feather="github"></i></a>
                `;
            } else if (status === 'completed') {
                actionLinksHtml = `
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer">View Code <i data-feather="github"></i></a>
                `;
            } else {
                actionLinksHtml = `
                    <span class="btn-ongoing"><i data-feather="clock"></i> Ongoing Project</span>
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer" style="margin-left: 0.5rem; opacity: 0.8;">GitHub <i data-feather="github"></i></a>
                `;
            }

            return `
                <div class="swiper-slide">
                  <div class="project-card">
                    <div class="project-image-wrapper">
                      <img src="${imgSrc}" alt="${title} project preview" />
                    </div>
                    <div class="project-content">
                      <h3>${title}</h3>
                      <p>${description}</p>
                      <div class="tech-stack">
                        ${techStackHtml}
                      </div>
                      <div class="project-links">
                        ${actionLinksHtml}
                      </div>
                    </div>
                  </div>
                </div>
            `;
        }).join('');

        // Destroy current swiper instance, update DOM content, and re-initialize swiper cleanly
        if (swiper) {
            swiper.destroy(true, true);
        }
        wrapper.innerHTML = slidesHtml;

        swiper = new Swiper('.projects-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });

        // Re-trigger feather icons replacement for dynamic external-link / github / clock icons
        if (window.feather) {
            feather.replace();
        }
    } catch (e) {
        console.warn('GitHub projects auto-sync skipped:', e);
    }
}

// Trigger GitHub project analysis after initial page load
document.addEventListener('DOMContentLoaded', loadGitHubProjects);
window.addEventListener('load', loadGitHubProjects);


/*=============== CERTIFICATE MODAL LOGIC ===============*/
const certModal = document.getElementById('cert-modal');
const modalCertTitle = document.getElementById('modal-cert-title');
const modalCertIframe = document.getElementById('modal-cert-iframe');
const modalCertDriveLink = document.getElementById('modal-cert-drivelink');
const certModalClose = document.querySelector('.cert-modal-close');

const viewCertBtns = document.querySelectorAll('.view-cert-btn');

viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const certCard = e.target.closest('.cert-card');
        if (!certCard) return;

        const title = certCard.getAttribute('data-title');
        const previewUrl = certCard.getAttribute('data-preview');
        const driveUrl = certCard.getAttribute('data-drive');

        if (modalCertTitle) modalCertTitle.textContent = title;
        if (modalCertIframe) modalCertIframe.src = previewUrl;
        if (modalCertDriveLink) modalCertDriveLink.href = driveUrl;

        if (certModal) certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeCertModal() {
    if (certModal) {
        certModal.classList.remove('active');
        if (modalCertIframe) modalCertIframe.src = '';
        document.body.style.overflow = 'auto';
    }
}

if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
}

if (certModal) {
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeCertModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

/*=============== FORM SUBMISSION (SECURE DIRECT WHATSAPP) ===============*/
const contactForm = document.querySelector('.contact-form');
let lastSubmitTime = 0;

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Anti-spam / rate limiting protection
        const now = Date.now();
        if (now - lastSubmitTime < 3000) {
            return;
        }
        lastSubmitTime = now;

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !message) {
            return;
        }

        const whatsappPhone = '917620804232';
        const formattedMessage = `Hello Omprasad,\n\n*New Portfolio Message*\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(formattedMessage)}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        contactForm.reset();
    });
}


/*=============== PROFESSIONAL RESUME DOWNLOAD HANDLER ===============*/
const downloadResumeBtn = document.getElementById('download-resume-btn');

if (downloadResumeBtn) {
    let isGenerating = false;
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isGenerating) return;

        isGenerating = true;
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = `<i data-feather="file-text"></i> Generating PDF...`;
        if (window.feather) feather.replace();

        const resumeElement = document.getElementById('resume-template');
        if (!resumeElement) {
            isGenerating = false;
            downloadResumeBtn.innerHTML = originalText;
            if (window.feather) feather.replace();
            return;
        }

        const opt = {
            margin: [8, 8, 8, 8],
            filename: 'Omprasad_Bhaskar_Padwalkar_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        if (typeof html2pdf === 'undefined') {
            window.print();
            isGenerating = false;
            downloadResumeBtn.innerHTML = originalText;
            if (window.feather) feather.replace();
            return;
        }

        resumeElement.classList.add('pdf-export-mode');

        html2pdf()
            .set(opt)
            .from(resumeElement)
            .save()
            .then(() => {
                resumeElement.classList.remove('pdf-export-mode');
                isGenerating = false;
                downloadResumeBtn.innerHTML = originalText;
                if (window.feather) feather.replace();
            })
            .catch((err) => {
                console.error('PDF generation error, falling back to print:', err);
                resumeElement.classList.remove('pdf-export-mode');
                window.print();
                isGenerating = false;
                downloadResumeBtn.innerHTML = originalText;
                if (window.feather) feather.replace();
            });
    });
}


/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = header height
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.navbar a[href*=' + sectionId + ']');
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

