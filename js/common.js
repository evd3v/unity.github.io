    /* resize for mobile devises */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }); /* resize for mobile devises */


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

        let firstPageHeight = $('.first-page')[0].clientHeight; /* height of the first page */
        let secondPageHeight = $('.second-page')[0].clientHeight; /* height of the second page */
        let offsetY = $(this).innerHeight(); /* height of the visible area */

        $(window).scroll(function (e) {

            let scrollPositionTop = $(this).scrollTop();
            /* second paralax */
            if (offsetY + scrollPositionTop > firstPageHeight + secondPageHeight) {
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

        let sliderOn = function (params) {

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


            slider.bind('mousedown touchstart', function (e) {
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

               slider.bind('mousemove touchmove', function (e) {
                    movePoint = e.clientX || e.touches[0].clientX;

                    endPoint = movePoint - startPoint; /* определяем длину проделанного слайда */
                    isOffsetPositive = endPoint > 0;
                    if ((currentSlide == 0 && isOffsetPositive) ||
                        ((currentSlide + 1) == slidesCount && (!isOffsetPositive))) {
                        endPoint /= 10;
                        nextSlide = currentSlide;
                    }

                    slider.css({
                        'transform': 'translateX(' + (endPoint - currentOffset) + 'px)',
                    });

                    $(document).bind('mouseup touchend', function () {
                        if ((Math.abs(endPoint) < slideWidth / 10)) {
                            nextSlide = currentSlide;
                        } else
                        if (isOffsetPositive) {
                            nextSlide = currentSlide - 1;
                        } else {
                            nextSlide = currentSlide + 1;
                        }
                        if(nextSlide >= slidesCount || nextSlide < 0) {
                            nextSlide = currentSlide;
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
                e.preventDefault();
            });
            $.each(paginator, function (i, element) {
                $(element).bind('click touch', function () {
                    $.each(paginator, function (i, element) {
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

        /* change cards by isotope */

        /* isotop by evg */

        let portfolio = document.querySelector(".work-page-portfolio");
        let portfolioItems = document.querySelectorAll('.work-page-portfolio .work-page-portfolio__item');

        function initialize(block, items) {
            let slides = []; /* array with objects */
            let columns;
            if(document.documentElement.clientWidth < 600 || (window.screen.orientation.type === "landscape-primary" && document.documentElement.clientHeight < 450)) {
                columns = 1;
            } else {
                columns = 2;
            }
            let offsetXodd = 0; /* отпуступ для нечетных элементов, левый стоблец */
            let offsetYodd = 0;
            let offsetXeven = 0; /* отступ для четных элементов, правый столбец */
            let offsetYeven = 0;
            items.forEach(function (currentValue, index) {
                let obj = {};
                obj.index = index;
                obj.value = currentValue;
                obj.width = currentValue.clientWidth;
                obj.height = currentValue.clientHeight;
                obj.resizeWidth = currentValue.clientWidth;
                slides.push(obj);
            });
            slides.forEach(function (currentValue, index, arr) {
                currentValue.value.style.position = 'absolute';
                currentValue.value.style.transform = 'scale3d(1, 1, 1)';
                currentValue.value.style.opacity = '1';
                if (index % columns == 0) {
                    /* четные элементы, левый столбец */
                    if(columns == 1) {
                        offsetXeven = currentValue.width;
                    }
                    currentValue.value.style.top = offsetYodd + 'px';
                    currentValue.value.style.left = offsetXodd + 'px';
                    offsetYodd += currentValue.height;
                } else {
                    /* нечетные элементы, правый столбец */
                    offsetXeven = arr[index - 1].clientWidth || currentValue.resizeWidth;
                    currentValue.value.style.top = offsetYeven + 'px';
                    currentValue.value.style.left = offsetXeven + 'px';
                    offsetYeven += currentValue.height;
                }
            });
            block.style.position = 'relative';
            block.style.width = offsetXeven * columns + 'px';
            block.style.height = Math.max(offsetYeven, offsetYodd) + 'px';
        }

        function hide(items) {
            items.forEach(function (element) {
                element.style.transform = 'scale3d(0.001, 0.001, 1)';
                element.style.opacity = '0';
            });
        }
        initialize(portfolio, portfolioItems);

        /* menu onclick */

        let menuAll = document.querySelector(".work-page-menu .work-page-menu__item_all");
        let menuWeb = document.querySelector(".work-page-menu .work-page-menu__item_web");
        let menuMobile = document.querySelector(".work-page-menu .work-page-menu__item_mobile");
        let menuPhotography = document.querySelector(".work-page-menu .work-page-menu__item_photography");

        let workPageMenu = document.querySelectorAll(".work-page-menu .work-page-menu__item");

        function isotope(block, items, parametr) {
            let fitItems = [],
                filtredItems = [];
            items.forEach(function (element) {
                if (element.classList.contains(parametr)) {
                    fitItems.push(element);
                } else {
                    filtredItems.push(element);
                }
            });
            hide(filtredItems);
            initialize(block, fitItems);
        }

        function workPageMenuSelected(items) {
            items.forEach(function (element) {
                element.classList.remove('work-page-menu__item_selected');
            });
        }



        menuAll.addEventListener('click', function (e) {
            isotope(portfolio, portfolioItems, 'work-page-portfolio__item');
            workPageMenuSelected(workPageMenu);
            e.target.classList.add('work-page-menu__item_selected');
        });

        menuWeb.addEventListener('click', function (e) {
            isotope(portfolio, portfolioItems, 'work-page-portfolio__item_web');
            workPageMenuSelected(workPageMenu);
            e.target.classList.add('work-page-menu__item_selected');
        });

        menuMobile.addEventListener('click', function (e) {
            isotope(portfolio, portfolioItems, 'work-page-portfolio__item_mobile');
            workPageMenuSelected(workPageMenu);
            e.target.classList.add('work-page-menu__item_selected');
        });

        menuPhotography.addEventListener('click', function (e) {
            isotope(portfolio, portfolioItems, 'work-page-portfolio__item_photography');
            workPageMenuSelected(workPageMenu);
            e.target.classList.add('work-page-menu__item_selected');
        });

        /* popup img */

        let workPagePluses = document.querySelectorAll(".work-page-popover .work-page-popover__plus");

        workPagePluses.forEach(element => {
            /* ищем картинку, которую необходимо вывести */
            element.onclick = (e) => {
                let imgUrl,
                    imgBlock,
                    modalBlock,
                    overlay;
                e.path.forEach(element => {
                    if(element.classList && element.classList.contains('work-page-portfolio__item')) {
                        parentBlock = element;
                        imgUrl = element.querySelector('img').src;
                    }
                });
                imgBlock = document.createElement('img');
                imgBlock.src = imgUrl;
                imgBlock.classList.add("work-page-modal__img");

                modalBlock = document.querySelector(".work-page-modal");
                modalBlock.appendChild(imgBlock);


                overlay = document.querySelector(".work-page-modal-overlay");
                overlay.style.visibility = "visible";
                overlay.style.opacity = "0.8";

                modalBlock.style.visibility = "visible";
                modalBlock.style.opacity = '1';
            }
        });
        let closeWorkPageOverlay = function() {
            let modalImage = document.querySelector(".work-page-modal img");
            let overlay = document.querySelector(".work-page-modal-overlay");
            let modalBlock = document.querySelector(".work-page-modal");
            overlay.style.visibility = "hidden";
            overlay.style.opacity = "0";

            modalBlock.style.visibility = "hidden";
            modalBlock.style.opacity = '0';
            setTimeout(() => {
                modalImage.remove();
            }, 800);
        };

        let plusWorkPage = document.querySelector(".work-page-modal__plus");
        plusWorkPage.onclick = closeWorkPageOverlay;

        let overlayWorkPage = document.querySelector(".work-page-modal-overlay");
        overlayWorkPage.onclick = closeWorkPageOverlay;

    };