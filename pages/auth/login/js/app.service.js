const { BASE_URL, API_URL } = window.appConfig;

const loginService = {
    setLoading(isLoading) {
        const button = document.querySelector('button[type="submit"]');
        const spinner = document.getElementById('loadingSpinner');
        const buttonText = document.getElementById('buttonText');

        if (isLoading) {
            button.disabled = true;
            spinner.classList.remove('hidden');
            buttonText.textContent = 'Entrando...';
        } else {
            button.disabled = false;
            spinner.classList.add('hidden');
            buttonText.textContent = 'Entrar';
        }
    },

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        
        // Esconder após 5 segundos
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    },

    async login(email, senha) {
        try {
            this.setLoading(true);
            // Log para debug
            console.log('Enviando requisição:', {
                url: `${API_URL}/usuarios/login`,
                body: { email, senha }
            });

            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            // Log da resposta para debug
            const data = await response.json();
            console.log('Resposta da API:', data);
            
            if (data.success) {
                const sessionResponse = await fetch(`${BASE_URL}/config/session.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.data)
                });

                if (sessionResponse.ok) {
                    window.location.href = `${BASE_URL}/home`;
                } else {
                    throw new Error('Erro ao criar sessão');
                }
            } else {
                throw new Error(data.message || 'Erro ao realizar login');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            this.showError(error.message || 'Erro ao realizar login. Tente novamente.');
        } finally {
            this.setLoading(false);
        }
    }
};

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.password.value;
    await loginService.login(email, senha);
});
