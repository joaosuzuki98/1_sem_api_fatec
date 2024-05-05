const overviewRandom = (arrayP) => {
    arrayP.forEach(p => p.innerText = Math.floor(Math.random() * 100));
}

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
    initialSlide: 0,
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
});

// Animação inicial do slide
swiperEle.slideTo(10, 1000);

// sincronização da pesquisa da barra de data com o timelapse
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('submit', function (e) {
    e.preventDefault();
    var selectedDate = document.getElementById('birthday').value.split("-");
    var selectedDay = parseInt(Number(selectedDate[2]), 10);
    selectedDay = String(selectedDay);

    swiperEle.slides.forEach((slide, index) => {
        if (selectedDay === slide.textContent.trim()) {
            swiperEle.slideTo(index - 1, 1000);
        }
    })
});

function updateMonthAndYear() {
    var selectedDate = document.getElementById('birthday').value;
    var dateObj = new Date(selectedDate);
    var monthIndex = dateObj.getMonth();
    var monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    var monthName = monthNames[monthIndex];
    document.getElementById('mes-timelapse').textContent = monthName;
    document.getElementById('ano-timelapse').textContent = dateObj.getFullYear();
}

// Adiciona um evento para chamar a função updateMonthAndYear() quando a data é selecionada
document.getElementById('birthday').addEventListener('change', updateMonthAndYear);

// Chama a função updateMonthAndYear() para definir o mês e o ano inicialmente

// TODO -> Comentado porque está dando um erro
// updateMonthAndYear();
