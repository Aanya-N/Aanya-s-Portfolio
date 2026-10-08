/* ==========================================================================
   AANYA NIJHAWAN - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Navigation Hamburger Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Close mobile nav when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                }
            });
        });
    }

    /* --- Active Navigation Link Highlighting on Scroll --- */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- Certificate Modal Interaction --- */
    const modal = document.getElementById('cert-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const openModalBtns = document.querySelectorAll('.open-modal');

    const modalTitle = document.getElementById('modal-cert-title');
    const modalIssuer = document.getElementById('modal-cert-issuer');
    const modalDate = document.getElementById('modal-cert-date');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const certName = btn.getAttribute('data-cert');
            const certIssuer = btn.getAttribute('data-issuer');
            const certDate = btn.getAttribute('data-date');

            if (modalTitle) modalTitle.textContent = certName;
            if (modalIssuer) modalIssuer.textContent = `Issued by: ${certIssuer}`;
            if (modalDate) modalDate.textContent = `Year/Date: ${certDate}`;

            if (modal) {
                modal.classList.remove('hidden');
            }
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    /* --- Vintage Contact Form Submission Handler --- */
    const contactForm = document.getElementById('vintage-contact-form');
    const formConfirmation = document.getElementById('form-confirmation');

    if (contactForm && formConfirmation) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form processing & show confirmation message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'SENDING... ✦';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formConfirmation.classList.remove('hidden');

                // Auto hide confirmation message after 6 seconds
                setTimeout(() => {
                    formConfirmation.classList.add('hidden');
                }, 6000);
            }, 800);
        });
    }

    /* --- Gentle Scroll Fade In Animation for Cards --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedCards = document.querySelectorAll('.editorial-card, .polaroid-frame, .hobby-card');
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(card);
    });
});
