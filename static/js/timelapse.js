const overviewRandom=(arrayP)=>{
   arrayP.forEach(p => p.innerText=Math.floor(Math.random()*100))
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
    const activeSliderShape =  slides[activeSlide + 1].querySelector('.day-shape');
    activeSliderShape.classList.add('swiper-link');
    activeSliderShape.classList.remove('swiper-no-pointer');

    slideLinks[activeSlide + 1].setAttribute('href', '/show-data');
    overviewRandom(overviewText);
});

// Animação inicial do slide
swiperEle.slideTo(10, 1000);
