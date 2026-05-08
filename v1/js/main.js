document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple scroll reveal animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('reveal-visible');
                // Unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const elementsToReveal = document.querySelectorAll('.reveal-element');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // Animate AI + Human Workflow Bars on scroll
    const workflowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aiBar = entry.target.querySelector('.workflow-step:not(.human) .bar');
                const humanBar = entry.target.querySelector('.workflow-step.human .bar');
                
                if (aiBar && humanBar) {
                    aiBar.style.width = '30%';
                    humanBar.style.width = '100%';
                }
                workflowObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const workflowBanner = document.querySelector('.workflow-banner');
    if (workflowBanner) {
        const bars = workflowBanner.querySelectorAll('.bar');
        bars.forEach(bar => bar.style.width = '0'); // reset initial width for animation
        workflowObserver.observe(workflowBanner);
    }
});
