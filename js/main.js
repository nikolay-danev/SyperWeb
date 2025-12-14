// ================================
// Main JavaScript
// ================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ================================
  // Navigation
  // ================================
  
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.getElementById('header');
  
  // Show mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
    });
  }
  
  // Hide mobile menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  }
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });
  
  // ================================
  // Scroll Effects
  // ================================
  
  // Add shadow to header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);
  
  // ================================
  // Smooth Scroll
  // ================================
  
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Check if it's a valid section ID
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const offsetTop = target.offsetTop - 70; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ================================
  // Contact Form
  // ================================
  
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        showMessage('Моля, попълнете всички задължителни полета.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Моля, въведете валиден email адрес.', 'error');
        return;
      }
      
      // Simulate form submission
      // In production, you would send this data to a server
      simulateFormSubmission(name, email, phone, message);
    });
  }
  
  function simulateFormSubmission(name, email, phone, message) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Изпраща се...';
    
    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    
    // Send to PHP backend
    fetch('contact.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      if (data.success) {
        // Success - reset form and show message
        contactForm.reset();
        showMessage(data.message, 'success');
      } else {
        // Error from server
        showMessage(data.message, 'error');
      }
    })
    .catch(error => {
      // Network or other error
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      showMessage('Възникна грешка при изпращането. Моля, опитайте отново или се свържете с нас директно.', 'error');
      console.error('Form submission error:', error);
    });
  }
  
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form__message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = 'form__message';
      formMessage.textContent = '';
    }, 5000);
  }
  
  // ================================
  // Scroll Animations
  // ================================
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .process__step');
  animateElements.forEach(el => observer.observe(el));
  
  // ================================
  // Performance: Debounce Scroll Events
  // ================================
  
  function debounce(func, wait = 10, immediate = false) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  // Use debounced scroll handler
  const debouncedScroll = debounce(highlightNavOnScroll, 50);
  window.addEventListener('scroll', debouncedScroll);
  
  // ================================
  // Lazy Loading Images (if needed)
  // ================================
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ================================
  // Console Message
  // ================================
  
  console.log('%c✨ SyperWeb ✨', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
  console.log('%cСъздадено с ❤️ от SyperWeb Team', 'font-size: 14px; color: #6B7280;');
  console.log('%cИнтересувате се от кода? Свържете се с нас!', 'font-size: 12px; color: #4ECDC4;');
  
});

// ================================
// Utility Functions
// ================================

// Get current year for copyright
function updateCopyrightYear() {
  const yearElement = document.querySelector('.footer__copyright');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
  }
}

// Call on load
updateCopyrightYear();

// Enhanced link handling
document.addEventListener('DOMContentLoaded', () => {
  // Handle empty hash links to prevent page jumps
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') === '#') {
      e.preventDefault();
      // Only for non-navigation links
      if (!link.classList.contains('nav__link') && !link.classList.contains('scroll-down')) {
        console.log('Link clicked:', link.getAttribute('aria-label') || link.textContent.trim());
      }
    }
  });
});
