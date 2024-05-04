// Dados
const labels = ['27/01', '28/01', '29/01', '30/01', '31/01']; // Labels de meses
const umidade = [65, 68, 70, 72, 68]; // Umidade
const umidadeSolo = [45, 42, 40, 38, 42]; // Umidade do solo
const volumeAgua = [100, 95, 90, 85, 90]; // Volume da água
const temperaturaAmbiente = [25, 26, 27, 28, 26]; // Temperatura ambiente

Chart.defaults.color = '#efefef';

// Renderizar o gráfico
var myChart = new Chart(
    document.getElementById('myChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Umidade (%)',
                data: umidade,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#292929'
                    }
                },
                x: {
                    grid: {
                        color: '#292929'
                    }
                }
            }
        }
    });

var anotherChart = new Chart(
    document.getElementById('anotherChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Umidade do Solo (%)',
                data: umidadeSolo,
                borderColor: 'green',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#292929'
                    }
                },
                x: {
                    grid: {
                        color: '#292929'
                    }
                }
            }
        }
    });

var evenAnotherChart = new Chart(
    document.getElementById('evenAnotherChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Volume da Água (Litros)',
                data: volumeAgua,
                borderColor: 'orange',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#292929'
                    }
                },
                x: {
                    grid: {
                        color: '#292929'
                    }
                }
            }
        }
    });

var oneLastChart = new Chart(
    document.getElementById('oneLastChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura Ambiente (°C)',
                data: temperaturaAmbiente,
                borderColor: 'purple',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#292929'
                    }
                },
                x: {
                    grid: {
                        color: '#292929'
                    }
                }
            }
        }
    });


const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const graficos = document.querySelectorAll('.grafico');

    graficos.forEach((grafico, index) => {
        const imageLink = document.createElement('a');
        imageLink.download = `canvas${index}.png`;
        imageLink.href = grafico.toDataURL('image/png', 1);
        imageLink.click();
    })
});