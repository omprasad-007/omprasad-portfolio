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
    strings: ['Building.', 'Learning.', 'Growing.', 'Creating Impact.'],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
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


/*=============== SWIPER JS INITIALIZATION ===============*/
const swiper = new Swiper('.projects-slider', {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: "auto", // or 2.5, 3 etc.
            spaceBetween: 50,
        },
    },
});

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

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !message) {
            return;
        }

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:omprasadpadwalkar007@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
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

