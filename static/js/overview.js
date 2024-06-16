// Faz o efeito de fade do título do overview
window.onload = function() {
    setTimeout(function() {
        document.getElementById('overview-title').style.opacity = 0;
    }, 1000);
};

// Função que pega os dados de um dia do banco de dados e faz a média deles
// e os exibe nos 4 símbolos da página index
const overviewData = (dateSlide) => {
    // Primeiro é feito a formatação da data pois ele está toda estranha (na verdade)
    // era só ter arrumado com sfrt do datetime do python, porém não quero mexer
    // no app.py para não quebrá-lo
    const date = dateSlide;
    let dados = date.split(',')

    // Adicionando um zero à esquerda tanto do dia como do mês para poder fazer
    // a consulta no sqlite
    let mesValor = dados[1].replace(' ', '');
    if (mesValor.length === 1) { mesValor = `0${mesValor}` };

    let diaValor = dados[2].replace(' ', '').replace(')', '');
    if (diaValor.length === 1) { diaValor = `0${diaValor}` };

    let data_completa = `${date.slice(15, 19)}-${mesValor}-${diaValor}`

    // Selecionando os textos de cada ícone do overview
    let overviewText = document.querySelectorAll('.overview-text');

    // Usando ajax para obter todos os dados do dia atual
    fetch(`/get_data?dia=${data_completa}`)
        .then(response => response.json())
        .then(data => {
            let soil_humidity = 0;
            let ambient_humidity = 0;
            let ambient_temperature = 0;
            let water_volume = 0;
            let media = data.length;

            // Somando todos os dados
            for (let i = 0; i < media; i++) {
                soil_humidity += data[i]['soil_humidity'];
                ambient_humidity += data[i]['ambient_humidity'];
                ambient_temperature += data[i]['ambient_temperature'];
                water_volume += data[i]['water_volume'];
            }

            // Fazendo a média
            soil_humidity /= media;
            ambient_humidity /= media;
            ambient_temperature /= media;
            water_volume /= media;

            // Adicionando o texto
            overviewText[0].textContent = ambient_humidity.toFixed(2);
            overviewText[1].textContent = soil_humidity.toFixed(2);
            overviewText[2].textContent = ambient_temperature.toFixed(2);
            overviewText[3].textContent = water_volume.toFixed(2);
        })
        .catch(error => console.error('Error:', error));
}

export { overviewData };
