const slider = () => {

    const slider = document.querySelector('.offer__slider'),
        slides = slider.querySelectorAll('.offer__slide'),
        sliderCounter = slider.querySelector('.offer__slider-counter'),
        total = slider.querySelector('#total'),
        current = slider.querySelector('#current'),
        slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidesField = slider.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(slidesWrapper).width;
    const addZero = number => number < 10 ? `0${number}` : number;
    let sliderIndex = 1;
    total.textContent = addZero(slides.length);
    current.textContent = addZero(sliderIndex);

    slidesField.style.width = 100 * (slides.length + 1) + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflowX = 'hidden';
    slides.forEach(slide => slide.style.width = slideWidth);

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    const showDots = (n) => {
        dots.forEach(dot => {
            dot.style.opacity = '0.7';
        });
        dots[n - 1].style.opacity = '1';
    };
    const showSlide = (n) => {
        const offset = +slideWidth.slice(0, slideWidth.length - 2) * (n - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        showDots(n);
        current.textContent = addZero(n);
    };
    indicators.classList.add('carousel-indicators');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slider-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }
    slider.append(indicators);
    indicators.addEventListener('click', event => {

        const target = event.target;
        if (target.classList.contains('dot')) {
            sliderIndex = +target.getAttribute('data-slider-to');
            showSlide(sliderIndex);
        }
    });
    sliderCounter.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('offer__slider-prev')) {
            if (sliderIndex == 1) {
                sliderIndex = slides.length;
            } else {
                sliderIndex--;
            }
        }
        if (target.classList.contains('offer__slider-next')) {
            if (sliderIndex == slides.length) {
                sliderIndex = 1;
            } else {
                sliderIndex++;
            }
        }
        showSlide(sliderIndex);

    });
};
export default slider;