document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.search-section .tag');
    const jobCards = document.querySelectorAll('.job-card');
    const searchInput = document.querySelector('.search-input');
    const profileIcon = document.getElementById('profileIcon');
    let activeTag = null;

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesTag = !activeTag || tags.includes(activeTag);
            
            card.style.display = (matchesSearch && matchesTag) ? 'block' : 'none';
        });
    }

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            
            if (activeTag !== tag.textContent.trim().toLowerCase()) {
                tag.classList.add('active');
                activeTag = tag.textContent.trim().toLowerCase();
            } else {
                activeTag = null;
            }
            
            filterJobs();
        });
    });

    searchInput.addEventListener('input', filterJobs);

    profileIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            window.location.href = 'iTrainee-login-pergunta/pergunta.html';
        } else {
            window.location.href = 'iTrainee perfil/perfil.html';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            tags.forEach(tag => tag.classList.remove('active'));
            activeTag = null;
            searchInput.value = '';
            filterJobs();
        }
    });
});

document.getElementById('current-year').textContent = new Date().getFullYear();

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        setTimeout(() => {
            alert('Obrigado por assinar nossa newsletter!');
            emailInput.value = '';
        }, 500);
    });
}

const footerLinks = document.querySelectorAll('.footer-links a');
footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.paddingLeft = '5px';
    });
    link.addEventListener('mouseleave', () => {
        link.style.paddingLeft = '0';
    });
});