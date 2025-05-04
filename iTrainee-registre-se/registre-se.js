document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form'); 

    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'itrainee.html';
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = e.target.querySelector('input[type="text"]').value.trim();
        const email = e.target.querySelector('input[type="email"]').value.trim();
        const password = e.target.querySelectorAll('input[type="password"]')[0].value.trim();
        const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value.trim();
        const termsChecked = e.target.querySelector('input[type="checkbox"]').checked;
        
        if (!name || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!termsChecked) {
            alert('Você deve aceitar os termos de uso!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            window.location.href = 'login.html?fromRegister=true';
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Ocorreu um erro durante o registro. Por favor, tente novamente.');
        }
    });
});