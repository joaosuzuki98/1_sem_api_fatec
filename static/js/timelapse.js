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
});

const swiperEle = document.querySelector('.swiper').swiper;

// Para que o slide atual fique focado quando a página for carregada
swiperEle.slides[swiperEle.activeIndex + 1].querySelector('.day-shape').style.backgroundColor = '#337357';

// Criação do efeito de focus no slide atual e do link
swiperEle.on('slideChange', function () {
    const activeSlide = this.activeIndex;
    const slides = this.slides;
    for (var i = 0; i < slides.length; i++) {
        var sliderShape = slides[i].querySelector('.day-shape');
        sliderShape.style.backgroundColor = '#4F9476';
    }
    const activeSliderShape =  slides[activeSlide + 1].querySelector('.day-shape')
    activeSliderShape.style.transition = 'background-color 500ms';
    activeSliderShape.style.backgroundColor = '#337357';
});
