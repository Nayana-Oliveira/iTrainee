document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.querySelector('.password-strength');
    const summaryFields = {
        accountType: document.getElementById('summary-accountType'),
        name: document.getElementById('summary-name'),
        email: document.getElementById('summary-email'),
        companyName: document.getElementById('summary-companyName'),
        cnpj: document.getElementById('summary-cnpj'),
        cpf: document.getElementById('summary-cpf'),
        formation: document.getElementById('summary-formation'),
        phone: document.getElementById('summary-phone'),
        address: document.getElementById('summary-address')
    };
    const companyFields = document.querySelectorAll('.company-fields');
    const professorFields = document.querySelectorAll('.professor-fields');
    const companySummary = document.getElementById('summary-company');
    const professorSummary = document.getElementById('summary-professor');

    const cnpjInput = document.getElementById('cnpj');
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');

    initMasks();
    setupEventListeners();

    function initMasks() {
        if (cnpjInput) {
            cnpjInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 12) {
                    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                } else if (value.length > 8) {
                    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
                } else if (value.length > 5) {
                    value = value.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{3})/, '$1.$2');
                }
                
                e.target.value = value;
            });
        }

        if (cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/^(\d{3})(\d{3})/, '$1.$2');
                }
                
                e.target.value = value;
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 10) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{4})/, '($1) $2');
                } else if (value.length > 0) {
                    value = value.replace(/^(\d{2})/, '($1)');
                }
                
                e.target.value = value;
            });
        }
    }

    function setupEventListeners() {
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = document.querySelector('.form-step.active');
                const nextStepId = button.getAttribute('data-next');
                const nextStep = document.querySelector(`.form-step[data-step="${nextStepId}"]`);
                
                if (validateStep(currentStep)) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    updateProgressBar(nextStepId);
                    
                    if (nextStepId === '3') {
                        updateSummary();
                    }
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = document.querySelector('.form-step.active');
                const prevStepId = button.getAttribute('data-prev');
                const prevStep = document.querySelector(`.form-step[data-step="${prevStepId}"]`);
                
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                updateProgressBar(prevStepId);
            });
        });

        accountTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'company') {
                    companyFields.forEach(field => field.style.display = 'block');
                    professorFields.forEach(field => field.style.display = 'none');
                } else {
                    companyFields.forEach(field => field.style.display = 'none');
                    professorFields.forEach(field => field.style.display = 'block');
                }
            });
        });

        if (passwordInput && passwordStrength) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                setTimeout(() => {
                    alert('Cadastro realizado com sucesso!');
                }, 1000);
            });
        }
    }

    function validateStep(step) {
        let isValid = true;
        const inputs = step.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                input.style.borderColor = '';
                
                if (input.type === 'email' && !validateEmail(input.value)) {
                    input.style.borderColor = 'var(--error-color)';
                    isValid = false;
                }
                
                if (input.id === 'confirmPassword' && input.value !== passwordInput.value) {
                    input.style.borderColor = 'var(--error-color)';
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updateProgressBar(activeStep) {
        progressSteps.forEach(step => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            
            if (stepNumber <= activeStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function updatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;

        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const strengthBar = passwordStrength.querySelector('::after');
        const width = (strength / 5) * 100;
        
        passwordStrength.style.setProperty('--strength-width', `${width}%`);
        
        let color;
        if (strength <= 2) {
            color = 'var(--error-color)';
        } else if (strength <= 4) {
            color = 'var(--secondary-color)';
        } else {
            color = 'var(--success-color)';
        }
        
        passwordStrength.style.setProperty('--strength-color', color);
    }

    function updateSummary() {
        const accountType = document.querySelector('input[name="accountType"]:checked').value;
        summaryFields.accountType.textContent = accountType === 'company' ? 'Empresa' : 'Professor';
        summaryFields.name.textContent = document.getElementById('name').value;
        summaryFields.email.textContent = document.getElementById('email').value;
        summaryFields.phone.textContent = document.getElementById('phone').value;
        summaryFields.address.textContent = document.getElementById('address').value;

        if (accountType === 'company') {
            companySummary.style.display = 'block';
            professorSummary.style.display = 'none';
            summaryFields.companyName.textContent = document.getElementById('companyName').value;
            summaryFields.cnpj.textContent = document.getElementById('cnpj').value;
        } else {
            companySummary.style.display = 'none';
            professorSummary.style.display = 'block';
            summaryFields.cpf.textContent = document.getElementById('cpf').value;
            summaryFields.formation.textContent = document.getElementById('formation').value;
        }
    }
});