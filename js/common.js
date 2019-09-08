window.onload = function () {


    /* resize the header text on resize window */

    let header = document.querySelector(".header");
    let headerText = document.querySelector(".header__text");
    let sizeOfHeader = 100;

    let checkHeaderSize = function () {
        if (header.offsetWidth > document.documentElement.clientWidth / 1.5) {
            headerText.style.fontSize = sizeOfHeader-- + "px";
            checkHeaderSize();
        } else {
            return true;
        }
    };

    checkHeaderSize();

    window.onresize = checkHeaderSize;

    /* typing the text under the play video button */

    let playVideo = document.querySelector(".play-video__link");
    let playVideoText = ['p', 'l', 'a', 'y', ' ', 'v', 'i', 'd', 'e', 'o'];

    playVideo.onmouseenter = function () {
        let element = document.querySelector(".play-video__text");
        element.innerHTML = '';
        element.classList.remove('play-video__text--in');
        element.classList.remove('play-video__text--out');
        element.style.visibility = "visible";
        setTimeout(() => {
            element.classList.add('play-video__text--in');
            playVideoText.forEach(function (char, index) {
                setTimeout(() => {
                    element.innerHTML += char;
                }, index * 25);
            });
        }, 200);
    }

    playVideo.onmouseleave = function () {
        let element = document.querySelector(".play-video__text");
        setTimeout(() => {
            element.classList.add('play-video__text--out');
        }, 200);
        setTimeout(() => {
            element.style.visibility = "hidden";
        }, 400);
    };

    /* preventDefault links */

    $("a").click(function (e) {
        e.preventDefault();
    });

    /* overlay-menu */

    $(".header-menu__link").click(function (e) {
        $(".header-menu-overlay__list").css({
            'opacity': '1',
        });
        $(".header-menu-overlay").css({
            'width': '100%',
            'visibility': 'visible',
        });
    });

    $(".header-menu-overlay__close").click(function (e) {
        $(".header-menu-overlay").css({
            'width': '0%',
            'visibility': 'hidden',
        });
        $(".header-menu-overlay__list").css({
            'opacity': '0',
        })
    });


    /* bg-parallax effect on scroll */

    $(window).scroll(function (e) {
        this.console.log(e);
        let scrollPosition = $(this).scrollTop();
        $(".page__firstpage-bg").css({
            "transform": "translate(0, " + scrollPosition / 20 + "%)",
        });
    });

    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    $(".play-video__link")[0].onclick = function () {
        $(".play-video__content").css({
            'visibility': 'visible',
            'opacity': '1',
            'transform': 'scale(1)',
        });
        $('.page__firstpage-overlay').css({
            'visibility': 'visible',
            'height': scrollHeight + 'px',
            'width': '100%',
            'opacity': '0.75',
        });
        $(".play-video__close").css({
            'transform': 'rotate(720deg)',
        })
    }

    $(".play-video__close")[0].onclick = function () {
        $(".play-video__content").css({
            'visibility': 'hidden',
            'opacity': '0',
            'transform': 'scale(0)',
        });
        $('.page__firstpage-overlay').css({
            'visibility': 'hidden',
            'opacity': '0',
        });
        $(".play-video__close").css({
            'transform': 'rotate(0deg)',
        })
    }

    $('body').ondragstart = function (event) {
        event.preventDefault(); /* запрещаем тянучку блоков */
    };

    /* servise slider on JQ */

    let sliderOn = function(params) {

        let slider = params.slider;
        let slides = params.slides;
        let paginator = params.paginator;
        let selectedPaginator = params.selectedPaginator;

        let slidesCount = slides.length; /* определяем количество слайдов */
        let slideWidth = slides[0].clientWidth; /* определяем ширину одного блока */

        let currentSlide = 0;
        let startPoint = 0;
        let endPoint = 0;
        
        let currentOffset = 0;
        let isOffsetPositive = false;
        let finalOffset = 0;
        let nextSlide = 0;
        
        slider.bind('mousedown touchstart', function(e) {
            startPoint = e.clientX; /* точка клика относительно начала окна */
            currentSlide = Math.ceil(e.offsetX / slideWidth) - 1; /* определяем на какой слайд по счету кликнули */
            currentOffset = (slideWidth * currentSlide); /* определяем сдвиг относительно начала */

            slider.css({
                'transition': 'none',
            });

            slider.bind('mousemove touchmove', function(e) {
                endPoint = e.clientX - startPoint; /* определяем длину проделанного слайда */
                isOffsetPositive = endPoint > 0;
                if( (currentSlide == 0 && isOffsetPositive)
                        || ((currentSlide + 1) == slidesCount && (!isOffsetPositive)) ) {
                        endPoint /= 10;
                        nextSlide = currentSlide;
                }

                slider.css({
                    'transform': 'translateX(' + (endPoint - currentOffset) + 'px)',
                });

                $(document).bind('mouseup touchend', function(e) {
                    if( (Math.abs(endPoint) < slideWidth / 10) ) {
                        nextSlide = currentSlide;
                    } else 
                    if(isOffsetPositive) {
                        nextSlide = currentSlide - 1;
                    } else {
                        nextSlide = currentSlide + 1;
                    }
                    finalOffset = -Math.abs(slideWidth * nextSlide);

                    slider.css({
                            'transform': 'translateX(' + finalOffset + 'px)',
                            'transition': 'all ease .4s',
                    });

                    $(paginator[currentSlide]).removeClass(selectedPaginator);
                    $(paginator[nextSlide]).addClass(selectedPaginator);

                    slider.unbind('mousemove touchmove');
                    $(document).unbind('mouseup touchend');
                });
            });
        });
        $.each(paginator, function(i, element) {
                    $(element).bind('click touch', function() {
                        $.each(paginator, function(i, element) {
                            $(element).removeClass(selectedPaginator)
                        })
                        $(paginator[i]).addClass(selectedPaginator);
                        console.log(-Math.abs((i+1) * slideWidth))
                        slider.css({
                            'transform': 'translateX(' + -Math.abs(i * slideWidth) + 'px)',
                            'transition': 'all ease .4s',
                        });
                    });
                });
           
    }

    let serviceSlider = {
        slider: $('.service-slider__wrapper'),
        slides: $('.service-slider__wrapper .service-slider__item'),
        paginator: $('.service-slider-paginator .service-slider-paginator__item'),
        selectedPaginator: 'servise-slider-paginator__item--selected',
    };

    let deviseSlider = {
        slider: $('.devises-slider__wrapper'),
        slides: $('.devises-slider__wrapper .devises-slider__item'),
        paginator: $('.devises-slider-paginator .devises-slider-paginator__button'),
        selectedPaginator: 'devises-slider-paginator--selected',
    };

    sliderOn(serviceSlider);
    sliderOn(deviseSlider);

        /* resize for mobile devises */
    let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });


};