const carousel = document.querySelector('[js-carousel-wrapper]');
const arrows = document.querySelectorAll('[data-carousel-arrows]');
const carouselDots = document.querySelectorAll('[js-data-dots]');
const slideNumber = document.querySelector('[js-slide-number-text]');

let slideIndex = 0;


function addCurrentSlideNumber(slide, numberText) {
    const lengthOfSlide = slide.length;
    numberText.textContent = `${slideIndex + 1} / ${lengthOfSlide}`;
}


function activateSlide (slides) {
    slides.forEach(slide => {
        slide.removeAttribute('data-active-slide');
    });
    slides[slideIndex].setAttribute('data-active-slide', true);
}


function activateDots(dots) {
    dots.forEach(dot => {
        dot.removeAttribute('data-active-dot')
    })
    dots[slideIndex].setAttribute('data-active-dot', true);
}


function disableArrows(slides, nextBtn, prevBtn) {
    let nextBtnBooleanValue = slideIndex >= slides.length - 1 ? true : false;
    let prevBtnBooleanValue = slideIndex <= 0 ? true : false;
    nextBtnBooleanValue ? nextBtn.setAttribute('disabled', 'true') : nextBtn.removeAttribute('disabled');
    prevBtnBooleanValue ? prevBtn.setAttribute('disabled', 'true') : prevBtn.removeAttribute('disabled');
}


function showslides(carouselWrapper, dots) {
    const slides = carouselWrapper.querySelectorAll('[js-carousel-item]');

    const nextBtn = carouselWrapper.querySelector('.next');
    const prevBtn = carouselWrapper.querySelector('.prev');
    disableArrows(slides, nextBtn, prevBtn)

    activateSlide (slides);
    activateDots(dots);
    addCurrentSlideNumber(slides, slideNumber);
}


function nextOrPrevSlide (dir) {
    if (dir === 'next') {
        slideIndex++;
        showslides(carousel, carouselDots);
    } else {
        slideIndex--;
        showslides(carousel, carouselDots);
    }
}


function currentSlide(n) {
    slideIndex = n - 1;
    showslides(carousel, carouselDots);
}


function handleArrowClickEvent(arrowBtn) {
    arrowBtn.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.dataset.dir === 'next') {
                nextOrPrevSlide('next');
            } else {
                nextOrPrevSlide('prev')
            }
        })
    });
}


function handleDotsClickEvent(dots) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide(parseInt(dot.dataset.dotsIndex))
        })
    })
}


function handleClickEvents() {
    handleDotsClickEvent(carouselDots);
    handleArrowClickEvent(arrows);

    showslides(carousel, carouselDots);
}

handleClickEvents();