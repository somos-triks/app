/**
 * Classe responsável por gerenciar animações do checklist usando classes Tailwind
 */
export class ChecklistAnimations {
    /**
     * Aplica animação de entrada com Tailwind
     * @param {HTMLElement} elemento - Elemento a ser animado
     * @param {string} tipo - Tipo de animação ('fade', 'slide-down', 'slide-up', 'scale')
     */
    static entrada(elemento, tipo = 'fade') {
        if (!elemento) return;
        
        // Remove qualquer classe de animação anterior
        this.limparClasses(elemento);
        
        // Adiciona classes apropriadas baseadas no tipo
        elemento.classList.add('transition-all', 'duration-300');
        
        switch (tipo) {
            case 'fade':
                elemento.classList.add('opacity-0');
                setTimeout(() => elemento.classList.replace('opacity-0', 'opacity-100'), 50);
                break;
            case 'slide-down':
                elemento.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    elemento.classList.replace('opacity-0', 'opacity-100');
                    elemento.classList.replace('-translate-y-4', 'translate-y-0');
                }, 50);
                break;
            case 'slide-up':
                elemento.classList.add('opacity-0', 'translate-y-4');
                setTimeout(() => {
                    elemento.classList.replace('opacity-0', 'opacity-100');
                    elemento.classList.replace('translate-y-4', 'translate-y-0');
                }, 50);
                break;
            case 'scale':
                elemento.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    elemento.classList.replace('opacity-0', 'opacity-100');
                    elemento.classList.replace('scale-95', 'scale-100');
                }, 50);
                break;
        }
        
        // Remove classes de transição após a animação
        setTimeout(() => {
            elemento.classList.remove('transition-all', 'duration-300');
        }, 350);
    }
    
    /**
     * Aplica animação de saída com Tailwind
     * @param {HTMLElement} elemento - Elemento a ser animado
     * @param {string} tipo - Tipo de animação ('fade', 'slide-up', 'slide-down', 'scale')
     * @param {boolean} remover - Se deve remover o elemento após a animação
     * @returns {Promise} - Promise que resolve após a animação terminar
     */
    static saida(elemento, tipo = 'fade', remover = true) {
        return new Promise(resolve => {
            if (!elemento) {
                resolve();
                return;
            }
            
            // Remove qualquer classe de animação anterior
            this.limparClasses(elemento);
            
            // Adiciona classes apropriadas baseadas no tipo
            elemento.classList.add('transition-all', 'duration-300');
            
            switch (tipo) {
                case 'fade':
                    elemento.classList.replace('opacity-100', 'opacity-0');
                    break;
                case 'slide-up':
                    elemento.classList.add('-translate-y-4', 'opacity-0');
                    break;
                case 'slide-down':
                    elemento.classList.add('translate-y-4', 'opacity-0');
                    break;
                case 'scale':
                    elemento.classList.add('scale-95', 'opacity-0');
                    break;
            }
            
            // Remove elemento após a animação, se solicitado
            setTimeout(() => {
                if (remover && elemento.parentNode) {
                    elemento.parentNode.removeChild(elemento);
                }
                resolve();
            }, 300);
        });
    }
    
    /**
     * Aplica animação de destaque com Tailwind
     * @param {HTMLElement} elemento - Elemento a ser animado
     * @param {string} tipo - Tipo de destaque ('pulse', 'bounce', 'shake')
     */
    static destaque(elemento, tipo = 'pulse') {
        if (!elemento) return;
        
        // Remove qualquer classe de animação anterior
        this.limparClasses(elemento);
        
        switch (tipo) {
            case 'pulse':
                elemento.classList.add('animate-pulse');
                break;
            case 'bounce':
                elemento.classList.add('animate-bounce');
                break;
            case 'shake':
                // Simula shake com classes do Tailwind
                elemento.classList.add('animate-wiggle');
                break;
        }
        
        // Remove classes após a animação
        setTimeout(() => {
            this.limparClasses(elemento);
        }, 1000);
    }
    
    /**
     * Limpa classes de animação do elemento
     * @param {HTMLElement} elemento - Elemento a ser limpo
     */
    static limparClasses(elemento) {
        elemento.classList.remove(
            'opacity-0', 'opacity-100',
            '-translate-y-4', 'translate-y-0', 'translate-y-4',
            'scale-95', 'scale-100',
            'animate-pulse', 'animate-bounce', 'animate-wiggle',
            'transition-all', 'duration-300'
        );
    }
    
    /**
     * Aplica efeito ao marcar item como concluído
     * @param {HTMLElement} elemento - Elemento a ser animado
     */
    static marcarConcluido(elemento) {
        if (!elemento) return;
        
        // Aplica efeito de transição com Tailwind
        elemento.classList.add('transition-colors', 'duration-500');
        elemento.classList.add('bg-green-50', 'dark:bg-green-900/10');
        
        setTimeout(() => {
            elemento.classList.remove('bg-green-50', 'dark:bg-green-900/10', 'transition-colors', 'duration-500');
        }, 800);
    }
}
