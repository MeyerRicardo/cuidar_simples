let map;
let userMarker;
let userLat, userLng;

// Inicializa o mapa (sem localização)
function initMap() {
    map = L.map('map').setView([-23.5505, -46.6333], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

// Obtém localização do usuário e busca locais próximos
function getLocation() {
    document.getElementById('status').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obtendo localização...';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('status').innerHTML = 'Geolocalização não suportada pelo seu navegador.';
    }
}

function showPosition(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    
    document.getElementById('status').innerHTML = '<i class="fas fa-check-circle text-success"></i> Localização obtida! Buscando serviços próximos...';
    
    // Centraliza o mapa na localização do usuário
    if (map) {
        map.setView([userLat, userLng], 15);
    } else {
        initMap();
        map.setView([userLat, userLng], 15);
    }
    
    // Adiciona marcador do usuário
    if (userMarker) {
        userMarker.remove();
    }
    userMarker = L.marker([userLat, userLng]).addTo(map)
        .bindPopup('<strong>Você está aqui!</strong>')
        .openPopup();
    
    // Busca locais próximos (simulação - em produção usaria API real)
    buscarLocaisProximos();
}

function buscarLocaisProximos() {
    // Para este protótipo, usamos dados simulados baseados na localização
    // Em uma implementação real, chamaria APIs como Google Places ou OpenStreetMap Nominatim
    
    const locaisSimulados = [
        { nome: "Hospital Municipal", tipo: "Hospital", endereco: "Próximo à sua localização", telefone: "192", lat: userLat + 0.002, lng: userLng - 0.001 },
        { nome: "UBS - Unidade Básica de Saúde", tipo: "Posto de Saúde", endereco: "Atendimento SUS", telefone: "136", lat: userLat - 0.0015, lng: userLng + 0.002 },
        { nome: "Farmácia 24h", tipo: "Farmácia", endereco: "Plantão noturno", telefone: "Consultar local", lat: userLat + 0.003, lng: userLng + 0.001 }
    ];
    
    locaisSimulados.forEach(local => {
        L.marker([local.lat, local.lng]).addTo(map)
            .bindPopup(`<strong>${local.nome}</strong><br>${local.tipo}<br>Tel: ${local.telefone}`);
    });
    
    // Exibe lista
    const placesDiv = document.getElementById('placesList');
    placesDiv.innerHTML = `
        <h5>Locais próximos encontrados:</h5>
        <div class="list-group">
            ${locaisSimulados.map(local => `
                <div class="list-group-item">
                    <i class="fas fa-hospital"></i> <strong>${local.nome}</strong><br>
                    ${local.tipo} | ${local.endereco}<br>
                    <span class="text-muted">Telefone: ${local.telefone}</span>
                </div>
            `).join('')}
        </div>
        <div class="alert alert-warning mt-3">
            <i class="fas fa-info-circle"></i> Em um sistema real, estes dados viriam de APIs de geolocalização como Google Places ou OpenStreetMap.
        </div>
    `;
    
    document.getElementById('status').innerHTML = '<i class="fas fa-check-circle text-success"></i> Locais próximos exibidos no mapa.';
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('status').innerHTML = 'Permissão de localização negada. Habilite no seu navegador.';
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('status').innerHTML = 'Informação de localização indisponível.';
            break;
        case error.TIMEOUT:
            document.getElementById('status').innerHTML = 'Tempo limite excedido.';
            break;
        default:
            document.getElementById('status').innerHTML = 'Erro desconhecido.';
    }
    // Inicializa mapa padrão mesmo sem localização
    initMap();
}

// Inicializa mapa padrão
initMap();