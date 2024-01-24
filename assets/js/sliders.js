document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const navigation = document.querySelector('.navigation');
    let counter = 0;
    let slideInterval;

    // 创建导航点
    slideImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', 'Slide ' + (index + 1));
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        navigation.appendChild(dot);
    });

    // 前往指定幻灯片
    function goToSlide(slideNumber) {
        slides.style.transform = 'translateX(' + (-slideNumber * 100) + '%)';
        counter = slideNumber;
        updateDots();
    }

    // 更新导航点的显示状态
    function updateDots() {
        navigation.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === counter) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function moveSlide(direction) {
        if (direction === 'prev') {
            if (counter > 0) {
                counter--;
            } else {
                counter = slideImages.length - 1;
            }
        } else if (direction === 'next') {
          if (counter < slideImages.length - 1) {
              counter++;
          } else {
                counter = 0;
            }
        }
        goToSlide(counter);
    }

    prevBtn.addEventListener('click', () => {
        moveSlide('prev');
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        moveSlide('next');
        resetInterval();
    });

    // 自动播放功能
    function startSlideShow() {
        slideInterval = setInterval(() => {
            moveSlide('next');
        }, 3000); // 3秒切换
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    function resetInterval() {
        stopSlideShow();
        startSlideShow();
    }

    slides.addEventListener('mouseenter', stopSlideShow);
    slides.addEventListener('mouseleave', startSlideShow);

    goToSlide(0);
    startSlideShow();
});
