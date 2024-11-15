document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.card-track');
    const cards = document.querySelectorAll('.card');

    const navLinks = document.querySelectorAll('.nav-links a');
    const eventSlides = document.querySelectorAll('.event-slide');
    
    // Initial setup
    handleCardTrack();

    // Update on resize
    window.addEventListener('resize', handleCardTrack);

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });

    // Observe team, events, and projects titles
    const teamTitle = document.querySelector('.team-title');
    const eventsTitle = document.querySelector('.events-title');
    const projectsTitle = document.querySelector('#Projects .events-title');
    
    observer.observe(teamTitle);
    observer.observe(eventsTitle);
    observer.observe(projectsTitle);

    // Event cards animation
    const eventCards = document.querySelectorAll('.event-card');
    const eventSection = document.querySelector('#events');
    let eventsHasAnimated = false;

    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !eventsHasAnimated) {
                eventCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
                eventsHasAnimated = true;
                eventObserver.unobserve(eventSection);
            }
        });
    }, {
        threshold: 0.2
    });

    eventObserver.observe(eventSection);

    // Project cards animation (separate observer)
    const projectCards = document.querySelectorAll('.project-card');
    const projectSection = document.querySelector('#Projects');
    let projectsHasAnimated = false;

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !projectsHasAnimated) {
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
                projectsHasAnimated = true;
                projectObserver.unobserve(projectSection);
            }
        });
    }, {
        threshold: 0.2
    });

    projectObserver.observe(projectSection);

    // Mobile Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
});

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // Trigger when at least 10% of the element is visible
});

// Observe the team title
const teamTitle = document.querySelector('.team-title');
observer.observe(teamTitle);

// Get canvas and set context
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Define a range of colors that work on light and dark backgrounds
const particleColors = [
    'rgba(255, 255, 255, 0.7)',  // Light white
    'rgba(200, 200, 200, 0.5)',  // Light gray
    'rgba(173, 216, 230, 0.5)',  // Light blue
    'rgba(255, 223, 186, 0.5)',  // Light peach
    'rgba(204, 255, 144, 0.5)'   // Light green
];


// Particle Class
class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    // Draw particle
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Update particle position
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Respawn particles at opposite edge
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    const numParticles = 50; // Reduced number of particles
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = particleColors[Math.floor(Math.random() * particleColors.length)];
        let speedX = (Math.random() - 0.5) * 1.5;
        let speedY = (Math.random() - 0.5) * 1.5;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particlesArray) {
        particle.draw();
        particle.update();
    }
    requestAnimationFrame(animateParticles);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize and animate particles
initParticles();
animateParticles();
const scrollableContainer = document.querySelector('.card-track');

let isScrolling = false;
let scrollStartPosition = 0;
let scrollStartTime = 0;

scrollableContainer.addEventListener('mousedown', (event) => {
  isScrolling = true;
  scrollStartPosition = event.clientX;
  scrollStartTime = Date.now();
});

scrollableContainer.addEventListener('mousemove', (event) => {
  if (isScrolling) {
    const deltaX = event.clientX - scrollStartPosition;
    scrollableContainer.scrollLeft += deltaX;
    scrollStartPosition = event.clientX;
  }
});

scrollableContainer.addEventListener('mouseup', () => {
  isScrolling = true;
});

scrollableContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  scrollableContainer.scrollLeft += event.deltaX;
});

