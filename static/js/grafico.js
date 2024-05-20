
const labels = {{dates}}; // Labels de meses

// Dados


Chart.defaults.color = '#efefef';

// Renderizar o gráfico
var myChart = new Chart(
    document.getElementById('myChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Umidade (%)',
                data: ambientHumidityData,
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
                data: soilHumidityData,
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
                data: waterVolumeData,
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
                data: ambientTemperatureData,
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