const overviewRandom = (arrayP) => {
    arrayP.forEach(p => p.innerText = Math.floor(Math.random() * 100));
}

const dayShape = document.querySelectorAll('.day-shape');

// Objeto para configuração do swiper
const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    coverflowEffect: {
        rotate: 25,
        stretch: -10,
        slideShadows: false,
        modifier: 1,
        scale: 0.85,
        depth: 200,
    },
    slidesPerView: 3,
    spaceBetween: 30,
    initialSlide: dayShape.length - 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
});

const swiperEle = document.querySelector('.swiper').swiper;
const slideLinks = document.querySelectorAll('.slide-link');
const overviewText = document.querySelectorAll('.overview-text');

overviewRandom(overviewText);

// Para que o slide atual fique focado quando a página for carregada
swiperEle.slides[swiperEle.activeIndex + 1].querySelector('.day-shape').classList.add('swiper-link');

// Para que o slide atual fique com o link para a página de exibição de dados
slideLinks[swiperEle.activeIndex + 1].setAttribute('href', '/show-data');

// Criação do efeito de focus no slide atual e do link
swiperEle.on('slideChange', function () {
    const activeSlide = this.activeIndex;
    const slides = this.slides;
    for (var i = 0; i < slides.length; i++) {
        var sliderShape = slides[i].querySelector('.day-shape');
        sliderShape.classList.remove('swiper-link');
        sliderShape.classList.add('swiper-no-pointer');

        slideLinks.forEach(link => link.removeAttribute('href'));
    }

    const activeSliderShape = slides[activeSlide + 1].querySelector('.day-shape');
    activeSliderShape.classList.add('swiper-link');
    activeSliderShape.classList.remove('swiper-no-pointer');

    slideLinks[activeSlide + 1].setAttribute('href', '/show-data');
    overviewRandom(overviewText);

    // Setando o valor do mês, aqui está sendo pagado o valor do key e com ele cortamos apenas o mês
    const slideMonth = String(slideLinks[activeSlide + 1].getAttribute('key')).slice(21, 23).replace(',', '');
    var monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    document.getElementById('mes-timelapse').textContent = monthNames[Number(slideMonth) - 1];

    // Aqui esta sendo feito de forma parecida com o acima
    const slideYear = String(slideLinks[activeSlide + 1].getAttribute('key')).slice(15, 19).replace(',', '');
    document.getElementById('ano-timelapse').textContent = slideYear;
});

// Animação inicial do slide
setTimeout(() => {
    swiperEle.slideTo(dayShape.length - 1, 1000)
}, 100);

// sincronização da pesquisa da barra de data com o timelapse
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('submit', function (e) {
    e.preventDefault();
    var selectedDate = document.getElementById('birthday').value.split("-");
    // Esta flag é necessária senão o alert sempre irá disparar
    var dayFound = false;

    // Aqui cada chave do slide é checado com o valor enviado na barra de pesquisa de dia
    slideLinks.forEach((slide, index) => {
        const slideKey = slide.getAttribute('key').split(",");
        // Cada índice do selectedDate é um valor enviado na barra de pesquisa
        // 0 = ano, 1 = mês e 2 = dia
        // O slideKey segue esta mesma lógica, porém como ele vem com uma formatação estranha,
        // é necessária remover espaços e outros caracteres, por isso o uso de trim e replace
        if (slideKey[0].slice(15, 19) === selectedDate[0] && slideKey[1].trim() == selectedDate[1] && slideKey[2].trim().replace(')', '') == parseInt(selectedDate[2])) {
            dayFound = true;
            return swiperEle.slideTo(index - 1, 2500);
        }
    })
    if (!dayFound) alert('Dia não registrado');
});
