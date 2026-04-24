// Script principal para funcionalidades globais
document.addEventListener('DOMContentLoaded', function() {
    // Fecha alertas automáticos após 5 segundos se existirem
    const alerts = document.querySelectorAll('.alert-auto');
    if (alerts) {
        alerts.forEach(alert => {
            setTimeout(() => {
                alert.style.display = 'none';
            }, 5000);
        });
    }
    
    // Adiciona classe active ao link do menu conforme a página atual
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === '../index.html')) {
            link.classList.add('active');
        }
    });
});