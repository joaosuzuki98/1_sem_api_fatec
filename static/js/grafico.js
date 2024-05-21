
 

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