const observerOptions = {
    threshold: [0.1, 0.5, 0.9],
    rootMargin: '-10% 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        
        if (entry.intersectionRatio > 0.5) {
            // Section is prominently in view
            section.classList.add('active');
            section.classList.remove('fade-out');
        } else if (entry.intersectionRatio > 0.1) {
            // Section is partially visible
            section.classList.remove('fade-out');
        } else {
            // Section is barely visible or not visible
            section.classList.remove('active');
            section.classList.add('fade-out');
        }
    });
}, observerOptions);

// Observe all panels and projects container
document.querySelectorAll('.panel, .projects_container').forEach(panel => {
    observer.observe(panel);
});

// Add initial state to first panel
document.addEventListener('DOMContentLoaded', function() {
    const firstPanel = document.querySelector('.panel');
    if (firstPanel) {
        firstPanel.classList.add('active');
    }
});