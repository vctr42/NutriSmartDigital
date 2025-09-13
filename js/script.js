// NutriSmart Digital - JavaScript Functions

// Anti-copy protection
document.addEventListener('DOMContentLoaded', function() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable text selection on specific elements
    const protectedElements = document.querySelectorAll('.no-select');
    protectedElements.forEach(element => {
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
        element.style.userSelect = 'none';
    });

    // Disable keyboard shortcuts for copying/printing
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+C (Copy)
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+V (Paste)
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+X (Cut)
        if (e.ctrlKey && e.keyCode === 88) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Disable F12 (Developer Tools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag and drop of images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        img.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
    });

    // Initialize timers for landing pages
    initializeCountdown();
    
    // Initialize FAQ accordion
    initializeFAQ();
});

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    const menuToggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Countdown Timer for Landing Pages
function initializeCountdown() {
    const contadorElement = document.getElementById('contador');
    const botaoCompra = document.getElementById('botao-compra');
    
    if (!contadorElement || !botaoCompra) return;
    
    // Determine which product page we're on
    const currentPage = window.location.pathname;
    let storageKey = '';
    let promoPrice = '';
    let normalPrice = '';
    let promoLink = '';
    let normalLink = '';
    let promoText = '';
    let normalText = '';
    
    if (currentPage.includes('mealprep-inteligente')) {
        storageKey = 'deadline_mealprep';
        promoPrice = 'R$ 37,00';
        normalPrice = 'R$ 97,00';
        promoLink = 'https://pay.hotmart.com/O101868978S?checkoutMode=10&bid=1757709754909&offDiscount=LAN%C3%87AMENTO';
        normalLink = 'https://pay.hotmart.com/O101868978S?checkoutMode=10&bid=1757736815997';
        promoText = `Quero meu acesso por ${promoPrice}`;
        normalText = `Quero meu acesso por ${normalPrice}`;
    } else if (currentPage.includes('7-almocos-saudaveis')) {
        storageKey = 'deadline_7almocos';
        promoPrice = 'R$ 9,90';
        normalPrice = 'R$ 19,90';
        promoLink = 'https://pay.hotmart.com/P101867097B?off=ghn78tb2&bid=1757737142619';
        normalLink = 'https://pay.hotmart.com/P101867097B?off=g3fur3qr&bid=1757737113440';
        promoText = `Quero meu ebook por ${promoPrice}`;
        normalText = `Quero meu ebook por ${normalPrice}`;
    }
    
    if (!storageKey) return;
    
    // Check for existing deadline or create new one
    let deadline = localStorage.getItem(storageKey);
    if (!deadline) {
        deadline = new Date().getTime() + (3 * 24 * 60 * 60 * 1000); // 3 days from now
        localStorage.setItem(storageKey, deadline.toString());
    } else {
        deadline = parseInt(deadline);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            contadorElement.innerHTML = `
                <div style="text-align: center; background: #e74c3c; color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="margin-bottom: 10px;">⏰ Oferta por tempo limitado!</h3>
                    <div style="font-size: 2rem; font-weight: bold;">
                        ${days}d ${hours}h ${minutes}m ${seconds}s
                    </div>
                    <p style="margin-top: 10px;">Restam apenas ${days} dias para garantir o desconto!</p>
                </div>
            `;
            
            // Set promotional pricing
            botaoCompra.href = promoLink;
            botaoCompra.textContent = promoText;
        } else {
            // Timer expired
            contadorElement.innerHTML = `
                <div style="text-align: center; background: #555; color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3>🚫 Oferta encerrada — preço normal aplicado</h3>
                </div>
            `;
            
            // Set normal pricing
            botaoCompra.href = normalLink;
            botaoCompra.textContent = normalText;
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Console warning message
console.warn('🚫 AVISO: Este site está protegido contra cópia. Qualquer tentativa de reprodução não autorizada do conteúdo é proibida.');
console.warn('⚖️ © 2025 NutriSmart Digital - Todos os direitos reservados.');

// Disable console access
(function() {
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                console.warn('🚫 Ferramentas de desenvolvedor detectadas!');
                console.warn('⚖️ Este conteúdo é protegido por direitos autorais.');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
})();

// Basic form validation (if forms exist)
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#27ae60';
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});