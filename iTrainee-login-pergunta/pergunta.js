function selectOption(option) {
    const card = document.getElementById(`${option}Option`);
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);

    setTimeout(() => {
        if (option === 'student') {
            window.location.href = 'cadastro-aluno.html';
        } else if (option === 'company') {
            window.location.href = 'cadastro-empresa.html';
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option-card');
    
    options.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.1)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});