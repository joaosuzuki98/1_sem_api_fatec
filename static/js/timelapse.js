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