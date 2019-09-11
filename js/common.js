window.onload = function () {

    /* resize for mobile devises */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });


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

    let firstPageHeight = $('.first-page')[0].clientHeight; /* height of the first page */
    let secondPageHeight = $('.second-page')[0].clientHeight; /* height of the second page */
    let offsetY = $(this).innerHeight(); /* height of the visible area */
    
    $(window).scroll(function (e) {

        let scrollPositionTop = $(this).scrollTop();
        /* second paralax */
        if(offsetY + scrollPositionTop > firstPageHeight + secondPageHeight) {
            $(".third-page__bg").css({
                'transform': 'translate(0,' + (scrollPositionTop - firstPageHeight - secondPageHeight) / 20 + '%)',
            });
        } else {
            $(".page__firstpage-bg").css({
                "transform": "translate(0, " + scrollPositionTop / 20 + "%)",
        });
        }
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

    /* slider on JQ */

    let sliderOn = function(params) {

        let slider = params.slider;
        let slides = params.slides;
        let paginator = params.paginator;
        let selectedPaginator = params.selectedPaginator;

        let slidesCount = slides.length; /* определяем количество слайдов */
        let slideWidth = slides[0].clientWidth; /* определяем ширину одного блока */


        let currentSlide = 0;
        let startPoint = 0;
        let movePoint = 0;
        let endPoint = 0;
        let offsetOfSlider = 0;
        
        let currentOffset = 0;
        let isOffsetPositive = false;
        let finalOffset = 0;
        let nextSlide = 0;

        
        slider.bind('mousedown touchstart', function(e) {
            let rect = e.target.getBoundingClientRect();
            startPoint = e.clientX || e.touches[0].clientX; /* точка клика относительно начала окна */
            offsetOfSlider = e.offsetX || (e.targetTouches[0].pageX - rect.left);
            currentSlide = Math.ceil(offsetOfSlider / slideWidth) - 1; /* определяем на какой слайд по счету кликнули */
            currentOffset = (slideWidth * currentSlide); /* определяем сдвиг относительно начала */
            slider.css({
                'transition': 'none',
            });
            $('html').css({
               'cursor': 'move', 
            });

            slider.bind('mousemove touchmove', function(e) {
                movePoint = e.clientX || e.touches[0].clientX;

                endPoint = movePoint - startPoint; /* определяем длину проделанного слайда */
                isOffsetPositive = endPoint > 0;
                if( (currentSlide == 0 && isOffsetPositive)
                        || ((currentSlide + 1) == slidesCount && (!isOffsetPositive)) ) {
                        endPoint /= 10;
                        nextSlide = currentSlide;
                }
                slider.css({
                    'transform': 'translateX(' + (endPoint - currentOffset) + 'px)',
                });

                $(document).bind('mouseup touchend', function() {
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
                    $('html').css({
                        'cursor': 'auto', 
                     });
                });
            });
        });
        $.each(paginator, function(i, element) {
                    $(element).bind('click touch', function() {
                        $.each(paginator, function(i, element) {
                            $(element).removeClass(selectedPaginator)
                        })
                        $(paginator[i]).addClass(selectedPaginator);
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

    let aboutSlider = {
        slider: $('.about-slider__wrapper'),
        slides: $('.about-slider__wrapper .about-slider__item'),
        paginator: $('.about-paginator .about-paginator__item'),
        selectedPaginator: 'about-paginator__item--selected',
    };

    sliderOn(serviceSlider);
    sliderOn(deviseSlider);
    sliderOn(aboutSlider);

    /* work page section */

    /* change cards */

    // let portfolioItems = $('.work-page-portfolio .work-page-portfolio__item');
    // let portfolioItemHeight = portfolioItems[0].clientHeight;

    // let menuItems = $('.work-page-menu .work-page-menu__item');
    // menuItems[1].onclick = function() {
    //     let selectedItems = $('.work-page-portfolio__item_photography');
    //     $.each(selectedItems, function(i, element) {
    //         $(element).css({
    //             'max-height': portfolioItemHeight + 'px',
    //         })
    //         $(element).css({
    //             'transition': 'all ease .4s',
    //             'max-height': '0px',
    //             'visibility': 'hidden',
    //         });
    //         $(element.children[0]).css({
    //             'transition': 'all ease .4s',
    //             'max-height': '0px',   
    //         })
    //     });
    // }


    // let portfolioImages = $('.work-page-porfolio__img');
    // $(portfolioItems[0]).css({
    //     'max-height': portfolioItemHeight + 'px',
    // });
    // $(portfolioImages[0]).css({
    //     'max-height': portfolioItemHeight + 'px',
    // });
    // portfolioItems[0].onclick = function() {
    //     $(portfolioItems[0]).css({
    //         'transition': 'all ease .4s',
    //         'max-height': '0px',
    //     });
    //     $(portfolioImages[0]).css({
    //         'transition': 'all ease .4s',
    //         'max-height': '0px',
    //     });
    // }

};