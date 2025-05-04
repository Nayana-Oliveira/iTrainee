document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form-content'); 
    const urlParams = new URLSearchParams(window.location.search);
    const fromRegister = urlParams.get('fromRegister') === 'true';
    const returnUrl = urlParams.get('return') || 'itrainee.html';


    if (fromRegister) {
        alert('Registro realizado com sucesso! Faça login para continuar.');
    }

    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = returnUrl;
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = e.target.querySelector('input[type="text"]').value.trim();
        const password = e.target.querySelector('input[type="password"]').value.trim();

        if (!username || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        try {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            window.location.href = returnUrl;
        } catch (error) {
            console.error('Erro ao salvar dados de login:', error);
            alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
        }
    });
});