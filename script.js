// Matrix Animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?';
const name = "Mark JP Tolentino";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
const nameDrops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
    nameDrops[x] = false;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = '#0f0';

    for (let i = 0; i < drops.length; i++) {
        let text = chars.charAt(Math.floor(Math.random() * chars.length));
        if (!nameDrops[i] && Math.random() > 0.98) {
            nameDrops[i] = true;
            drops[i] = 0;
        }
        if (nameDrops[i]) {
            const nameIndex = Math.floor(drops[i] / (fontSize / 2)) % name.length;
            text = name[nameIndex];
            if (drops[i] * fontSize > canvas.height) nameDrops[i] = false;
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            nameDrops[i] = false;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

// Typing Animation
const text = "Mark JP Tolentino - Portfolio";
let index = 0;
const typingText = document.getElementById('typing-text');

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}

// Initialize AOS
AOS.init();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Navbar Link Highlighting
window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;
    document.querySelectorAll('#mainNav .nav-link').forEach(link => {
        let section = document.querySelector(link.hash);
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Start Typing Animation on Load
window.onload = function() {
    type();
};

// Resize Canvas on Window Resize
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const columns = canvas.width / fontSize;
    while (drops.length < columns) drops.push(1);
    while (drops.length > columns) drops.pop();
    while (nameDrops.length < columns) nameDrops.push(false);
    while (nameDrops.length > columns) nameDrops.pop();
});