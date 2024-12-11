document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event");

    const eventDetails = {
        cybersecuirty: {
            title: "Diving deep into Cybersecurity",
            description: "Yesterday, I had the incredible opportunity to volunteer at the Cybersecurity Event organized by GDSC CIT.✨ It was an enriching experience, helping participants with technical challenges and ensuring smooth event management alongside our amazing team!✨ 📚 What We Did: The first three hours were filled with theoretical insights, introducing participants to the fundamentals of staying secure in this tech-driven world. The final hour? A hands-on session where attendees created a project to track IP addresses remotely—a practical and engaging dive into cybersecurity!✨ 🔑 Key Takeaways: -Fundamentals of staying secure in the tech field. -Basics of Git, Docker, and Ubuntu. -The importance of understanding and practising cybersecurity ✨",
            images: ["assets/DSC_1108.JPG", "assets/DSC_1428.JPG", "assets/DSC_1115.JPG"],
            link: "https://google.com",
        },
        quiz: {
            title: "Coming Soon",
            description: "Engaging quizzes to challenge knowledge and encourage learning.",
            images: ["assets/update"],
            link: "#",
        },
        // Add other events here
    };

    const event = eventDetails[eventName];

    if (event) {
        document.getElementById("event-title").innerText = event.title;
    
        // Split description into paragraphs dynamically
        const descriptionContainer = document.getElementById("event-description");
        const paragraphs = event.description.split("✨"); // Use '✨' as a delimiter
        paragraphs.forEach((paragraph) => {
            const p = document.createElement("p");
            p.textContent = paragraph.trim();
            descriptionContainer.appendChild(p);
        });
    
        // Populate images
        const imageContainer = document.querySelector(".image-gallery");
        event.images.forEach((image) => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = event.title;
            imageContainer.appendChild(img);
        });
    
        // Dynamically set the button link
        const downloadButton = document.querySelector(".download-button");
        downloadButton.setAttribute("onclick", `window.open('${event.link}', '_blank')`);
    } else {
        document.getElementById("event-title").innerText = "Event Not Found";
    }
    
});



//--------------------------------------------------------------------
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



// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Toggle menu on hamburger click
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
    }
});

// Prevent menu from staying open on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});


// image 
document.addEventListener("DOMContentLoaded", () => {
    const imageGallery = document.querySelector(".image-gallery");
    let scrollInterval;

    // Auto-scroll function
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            imageGallery.scrollBy({ left: 1, behavior: "smooth" });

            // Loop back to the start when reaching the end
            if (imageGallery.scrollLeft + imageGallery.clientWidth >= imageGallery.scrollWidth) {
                imageGallery.scrollTo({ left: 0, behavior: "smooth" });
            }
        }, 10); // Adjust speed (lower = faster)
    }

    // Stop auto-scroll on hover
    imageGallery.addEventListener("mouseenter", () => {
        clearInterval(scrollInterval);
    });

    // Resume auto-scroll when mouse leaves
    imageGallery.addEventListener("mouseleave", startAutoScroll);

    // Start auto-scroll on page load
    startAutoScroll();
});
