/**
 * JavaScript Interactions - Ramba Pun Magar Portfolio
 * Features: Typewriter, Theme Toggle, IntersectionObserver, AJAX Contact, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dark / Light Theme Toggle
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ----------------------------------------------------
    // 2. Mobile Navigation Toggle
    // ----------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // 3. Navbar Scroll Effect & Back-to-Top
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar shadow / compact
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // ----------------------------------------------------
    // 4. Active Navigation Link on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ----------------------------------------------------
    // 5. Dynamic Typing Effect
    // ----------------------------------------------------
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            "STUDENT OF BSC CSIT"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[0];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 95;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at complete word
                isDeleting = true;
                typingSpeed = 3500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 600);
    }

    // ----------------------------------------------------
    // 6. Animated Skill Progress Bars (IntersectionObserver)
    // ----------------------------------------------------
    const progressFills = document.querySelectorAll('.progress-fill');

    if ('IntersectionObserver' in window && progressFills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-progress');
                    progressBar.style.width = targetWidth + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.25 });

        progressFills.forEach(fill => skillsObserver.observe(fill));
    } else {
        // Fallback for older browsers
        progressFills.forEach(fill => {
            fill.style.width = fill.getAttribute('data-progress') + '%';
        });
    }

    // ----------------------------------------------------
    // 7. Projects Filter
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ----------------------------------------------------
    // 8. Project Details Modal
    // ----------------------------------------------------
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalDismiss = document.getElementById('modal-dismiss-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalBadge = document.getElementById('modal-badge');
    const modalTech = document.getElementById('modal-tech');
    const viewButtons = document.querySelectorAll('.view-project-btn');

    function openModal(btn) {
        if (!modal) return;
        modalTitle.textContent = btn.getAttribute('data-title');
        modalDesc.textContent = btn.getAttribute('data-desc');
        modalBadge.textContent = btn.getAttribute('data-badge');

        const techList = btn.getAttribute('data-tech').split(', ');
        modalTech.innerHTML = '';
        techList.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn));
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalDismiss) modalDismiss.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 9. Toast Notification System
    // ----------------------------------------------------
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
        toast.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4500);
    }

    // ----------------------------------------------------
    // 10. AJAX Contact Form Submission
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear existing errors
            document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            let hasError = false;

            if (!name) {
                document.getElementById('name-error').textContent = 'Please enter your full name.';
                hasError = true;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('email-error').textContent = 'Please enter your email address.';
                hasError = true;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                hasError = true;
            }

            if (!message) {
                document.getElementById('message-error').textContent = 'Please enter your message.';
                hasError = true;
            }

            if (hasError) return;

            // Submit loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');

            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';
            if (btnIcon) btnIcon.style.display = 'none';
            if (btnSpinner) btnSpinner.style.display = 'inline-block';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showToast(data.message, 'success');
                    contactForm.reset();
                } else {
                    showToast(data.error || 'Failed to send message. Please try again.', 'error');
                }
            } catch (err) {
                console.error('Contact form error:', err);
                showToast('Unable to connect to server. Please check your connection.', 'error');
            } finally {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                if (btnIcon) btnIcon.style.display = 'inline-block';
                if (btnSpinner) btnSpinner.style.display = 'none';
            }
        });
    }
});
