document.addEventListener('DOMContentLoaded', () => {

    const photoInput = document.getElementById('photoInput');
    const profilePhoto = document.getElementById('profilePhoto');
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePhoto.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    const form = document.getElementById('profileForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = form.querySelector('input[type="password"]');
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
        
        if (password.value !== confirmPassword.value) {
            alert('As senhas não coincidem!');
            return;
        }

        showSuccessMessage('Perfil atualizado com sucesso!');
        form.reset();
    });
});

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
.success-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 0 4px 15px rgba(179, 19, 18, 0.3);
    animation: slideUp 0.3s ease;
}

.success-toast i {
    font-size: 1.2rem;
}
`;
document.head.appendChild(toastStyle);