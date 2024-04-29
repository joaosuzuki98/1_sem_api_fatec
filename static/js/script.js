const graficos = document.getElementsByClassName('grafico')

window.addEventListener('resize', function() {
    if (this.innerWidth <= 636) {
        this.alert('oi');
    }
});