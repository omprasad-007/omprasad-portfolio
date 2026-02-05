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

sr.reveal('.hero-content');
sr.reveal('.section-title, .section-subtitle', { delay: 200 });
sr.reveal('.about-content', { origin: 'bottom' });
sr.reveal('.skills-container .skill-card', { interval: 200 });
sr.reveal('.projects-slider', { interval: 200 });
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

/*=============== FORM SUBMISSION ===============*/
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real application, you would add your form submission logic here (e.g., using Fetch API, EmailJS).
    // For this demonstration, we will just show an alert and reset the form.
    alert('Message sent successfully!');
    contactForm.reset();
});


/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = header height
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navbar a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.navbar a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);
