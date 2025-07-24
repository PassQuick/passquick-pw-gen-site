// Language data
const languages = {
    en: {
        subtitle: "Secure password generator",
        description: "Generate strong, cryptographically secure passwords instantly. Choose your preferred language and start creating unbreakable passwords.",
        russianName: "Открыть",
        russianDesc: "Генератор паролей на русском языке",
        englishName: "Open",
        englishDesc: "Password generator in English",
        feature1: "Cryptographically secure",
        feature2: "Customizable generation",
        feature3: "Instant generation",
        feature4: "Works offline",
        feature5: "Minimalistic interface",
        feature6: "Open-source code",
        footer: "&copy; 2025 Meme Corp. PassQuick: Your security is our priority.",
        toggleText: "RU"
    },
    ru: {
        subtitle: "Безопасный генератор паролей",
        description: "Создавайте надёжные, криптографически безопасные пароли мгновенно. Выберите предпочитаемый язык и начните создавать неуязвимые пароли.",
        russianName: "Открыть",
        russianDesc: "Генератор паролей на русском языке",
        englishName: "Open",
        englishDesc: "Password generator in English",
        feature1: "Криптографически безопасный",
        feature2: "Настраиваемая генерация",
        feature3: "Мгновенная генерация",
        feature4: "Работает офлайн",
        feature5: "Минималистичный интерфейс",
        feature6: "Открытый исходный код",
        footer: "&copy; 2025 Meme Corp. PassQuick: Ваша безопасность — наш приоритет.",
        toggleText: "EN"
    }
};

let currentLang = 'en';
let isToggling = false;

// Toggle language function
function toggleLanguage() {
    if (isToggling) return;
    isToggling = true;
      
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    const lang = languages[currentLang];
      
    // Update text content with smooth transition
    const elements = [
        'subtitle', 'description', 'russianName', 'russianDesc', 
        'englishName', 'englishDesc', 'feature1', 'feature2', 
        'feature3', 'feature4', 'feature5', 'feature6', 'footer'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.opacity = '0.5';
            setTimeout(() => {
                if (id === 'footer') {
                    element.innerHTML = lang[id];
                } else {
                    element.textContent = lang[id];
                }
                element.style.opacity = '1';
            }, 150);
        }
    });
    
    // Update toggle button
    const toggleText = document.getElementById('langToggleText');
    if (toggleText) {
        toggleText.textContent = lang.toggleText;
    }
    
    // Update page title and lang attribute
    document.title = currentLang === 'en' ? 'PassQuick — Secure password generator' : 'PassQuick — Безопасный генератор паролей';
    document.documentElement.lang = currentLang;

    setTimeout(() => {
        isToggling = false;
    }, 300);
}

// Create floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
      
    // Меньше частиц на мобильных устройствах и еще меньше на слабых
    let particleCount = 50;
    if (window.innerWidth < 768) {
        particleCount = 25;
    }
    if (window.innerWidth < 480) {
        particleCount = 15;
    }
      
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 8) + 's';
        particles.appendChild(particle);
    }
}

// Navigation functions
function goToRussian() {
    // Add loading animation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        // Replace with your Russian version URL
        window.location.href = '/pw_generator_ru';
    }, 300);
}

function goToEnglish() {
    // Add loading animation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        // Replace with your English version URL
        window.location.href = '/pw_generator_en';
    }, 300);
}

// Add subtle mouse movement effect (только для desktop)
function addMouseEffect() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const container = document.querySelector('.container');
            if (!container) return;
        
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.01;
            const deltaY = (e.clientY - centerY) * 0.01;
          
            container.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }
}

// Improved event handling for mobile
function handleTouchEvent(element, callback) {
    let touchHandled = false;
      
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchHandled = true;
        callback();
    }, { passive: false });
      
    element.addEventListener('click', (e) => {
        if (!touchHandled) {
            callback();
        }
        touchHandled = false;
    });
}

// Event listeners
function setupEventListeners() {
    // Language toggle with improved mobile handling
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        handleTouchEvent(languageToggle, toggleLanguage);
    }

    // Language cards with improved mobile handling
    const russianCard = document.getElementById('russianCard');
    const englishCard = document.getElementById('englishCard');
      
    if (russianCard) {
        handleTouchEvent(russianCard, goToRussian);
    }
      
    if (englishCard) {
        handleTouchEvent(englishCard, goToEnglish);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === '1' || e.key === 'r' || e.key === 'R') {
            goToRussian();
        } else if (e.key === '2' || e.key === 'e' || e.key === 'E') {
            goToEnglish();
        } else if (e.key === 'l' || e.key === 'L') {
            toggleLanguage();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupEventListeners();
    addMouseEffect();
      
    // Add smooth transitions to text elements
    const textElements = document.querySelectorAll('#subtitle, #description, #russianName, #russianDesc, #englishName, #englishDesc, .feature-text, #footer');
    textElements.forEach(el => {
        el.style.transition = 'opacity 0.3s ease';
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recreate particles on resize
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.innerHTML = '';
            createParticles();
        }
    }, 250);
});
