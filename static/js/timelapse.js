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
    initialSlide: 10,
});

const swiperEle = document.querySelector('.swiper').swiper;

// Para que o slide atual fique focado quando a página for carregada
swiperEle.slides[swiperEle.activeIndex + 1].querySelector('.day-shape').classList.add('swiper-link');

// Criação do efeito de focus no slide atual e do link
swiperEle.on('slideChange', function () {
    const activeSlide = this.activeIndex;
    const slides = this.slides;
    for (var i = 0; i < slides.length; i++) {
        var sliderShape = slides[i].querySelector('.day-shape');
        sliderShape.classList.remove('swiper-link')
    }
    const activeSliderShape =  slides[activeSlide + 1].querySelector('.day-shape')
    activeSliderShape.classList.add('swiper-link');
    
    slides[activeSlide + 1].addEventListener('click', function() {
        window.location.href = '/show-data';
    });
});
