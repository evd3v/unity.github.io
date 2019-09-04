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

    $(window).scroll(function () {
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

    /* servise slider */
    let serviceSliderOn = function () {
        $('body').ondragstart = function (event) {
            event.preventDefault(); /* запрещаем тянучку блоков */
        };

        let slider = $('.service-slider__wrapper'); /* блок слайдера, который будем двигать */
        let slides = $('.service-slider__wrapper .service-slider-item'); /* массив слайдов */
        let elementsCount = $(slides).length; /* определяем количество слайдов */
        let paginators = $('.service-slider__paginator li') /* массив пагинаторов */
        let slideOffset = 0;
        const itemWidth = $('.service-slider-item')[0].getBoundingClientRect().width; /* определяем ширину блока */


        slider.css({
            'left': '0px', /* задаем начальный стиль для слайдера (необходимо для анимации) */
        });

        $.each(slides, function (i, element) {
            $(element).css({
                'left': slideOffset + '%'
            });
            slideOffset += 100;

            $(element).bind('mousedown touchstart', function (event) {
                slider.css({
                    'cursor': 'move',
                });

                let startOffsetX = event.clientX || event.touches[0].clientX; /* координата точки клика относительно окна браузера */
                let currentElement = i; /* определяем на какой элемент кликнули */
                $(element).bind('mousemove touchmove', function (event) {
                    let movedOffsetX = event.clientX || event.touches[0].clientX;
                    let currentOffsetX = movedOffsetX - startOffsetX /* расстояние, на которое сдвинулась мышь после клика */
                    // console.log(currentOffsetX);
                    let nextElement = currentElement; /* следующий слайд */

                    currentOffsetX > 0 ? nextElement-- : nextElement++; /* определяем номер следующего слайда */

                    if ((currentElement == 0 && currentOffsetX > 0) ||
                        (currentElement == elementsCount - 1 && currentOffsetX < 0)) {
                            currentOffsetX /= 5;
                            nextElement = i /* если двигаем слайдер за границу - следующий слайд = текущий слайд */
                        }
                        slider.css({
                            'left': -Math.abs(currentElement * itemWidth) + currentOffsetX + 'px',
                        });
                   
                    
                    $(document).bind('mouseup touchend', function() {
                        if ( Math.abs(currentOffsetX) > itemWidth / 20) {
                            slider.css({
                                'left': -Math.abs(nextElement * itemWidth) + 'px',
                                'cursor': 'auto',
                            });
    
                            /* changePaginator */
    
                            $.each(paginators, function(i, element) {
                                $(element).removeClass('paginator-item--selected')
                            })
                            $(paginators[nextElement]).addClass('paginator-item--selected');
                        }

                        $(element).unbind('mousemove touchmove');
                        $(document).unbind('mouseup touchend');

                    });
                });
            });
        });

        /* slider paginator */
        $.each(paginators, function(i, element) {
            $(element).bind('click touch', function() {
                $.each(paginators, function(i, element) {
                    $(element).removeClass('paginator-item--selected')
                })
                $(paginators[i]).addClass('paginator-item--selected');

                slider.css({
                    'left': -Math.abs(i * itemWidth) + 'px',
                });
            });
        });

    };
    serviceSliderOn();

};