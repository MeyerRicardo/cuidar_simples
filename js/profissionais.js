// Função para filtrar por categoria
function filtrarCategoria(categoria) {
    const cards = document.querySelectorAll('.profissional-card');
    
    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'block';
        } else {
            const cardCategoria = card.getAttribute('data-categoria');
            if (cardCategoria === categoria) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Função para filtrar por nome (busca)
function filtrarProfissionais() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.profissional-card');
    
    cards.forEach(card => {
        const nome = card.getAttribute('data-nome').toLowerCase();
        if (nome.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para preencher modal de contato
function setContact(nome, telefone) {
    document.getElementById('contatoNome').innerText = nome;
    document.getElementById('contatoTelefone').innerText = telefone;
}

// Permitir busca com tecla Enter
document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        filtrarProfissionais();
    }
});