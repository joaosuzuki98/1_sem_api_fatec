// Dados
const labels = ['27/01', '28/01', '29/01', '30/01', '31/01']; // Labels de meses
const umidade = [65, 68, 70, 72, 68]; // Umidade
const umidadeSolo = [45, 42, 40, 38, 42]; // Umidade do solo
const temperaturaAgua = [20, 22, 23, 24, 22]; // Temperatura da água
const volumeAgua = [100, 95, 90, 85, 90]; // Volume da água
const temperaturaAmbiente = [25, 26, 27, 28, 26]; // Temperatura ambiente

// Configuração do gráfico
const config = {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Umidade (%)',
            data: umidade,
            borderColor: 'blue',
            fill: false
        }, {
            label: 'Umidade do Solo (%)',
            data: umidadeSolo,
            borderColor: 'green',
            fill: false
        }, {
            label: 'Temperatura da Água (°C)',
            data: temperaturaAgua,
            borderColor: 'red',
            fill: false
        }, {
            label: 'Volume da Água (Litros)',
            data: volumeAgua,
            borderColor: 'orange',
            fill: false
        }, {
            label: 'Temperatura Ambiente (°C)',
            data: temperaturaAmbiente,
            borderColor: 'purple',
            fill: false
        }]
    },
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Renderizar o gráfico
var myChart = new Chart(
    document.getElementById('myChart'),
    config
);
