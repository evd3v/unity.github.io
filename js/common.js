window.onload = function() {

    /* resize the header text on resize window */

    let header = document.querySelector(".header");
    let headerText = document.querySelector(".header__text");
    let sizeOfHeader = 100;

    let checkHeaderSize = function() {
        if(header.offsetWidth > document.documentElement.clientWidth / 1.5) {
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

    playVideo.onmouseenter = function() {
        let element = document.querySelector(".play-video__text");
        element.innerHTML = '';
        element.classList.remove('play-video__text--in');
        element.classList.remove('play-video__text--out');
        element.style.display = "block";
        setTimeout(() => {
            element.classList.add('play-video__text--in');
            playVideoText.forEach(function(char, index) {
                setTimeout(() => {
                    element.innerHTML += char;
                }, index*25);
            });
        }, 200);
    }

    playVideo.onmouseleave = function() {
        let element = document.querySelector(".play-video__text");
        setTimeout(() => {
            element.classList.add('play-video__text--out');
        }, 200);
        setTimeout(() => {
            element.style.display = "none";
        }, 400);
    };

    /* preventDefault links */

    $("a").click(function(e) {
        e.preventDefault();
    });

    /* overlay-menu */

    $(".header-menu__link").click(function(e) {
        $(".header-menu-overlay__list").css({
            'opacity': '1',
        });
        $(".header-menu-overlay").css({
            'width': '100%',
            'visibility': 'visible',
        });
    });

    $(".header-menu-overlay__close").click(function(e) {
        $(".header-menu-overlay").css({
            'width': '0%',
            'visibility': 'hidden',
        });
        $(".header-menu-overlay__list").css({
            'opacity': '0',
        })
    });


    /* bg-parallax effect on scroll */

    $(window).scroll(function() {
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

    $(".play-video__link")[0].onclick = function() {
        $(".play-video__content").css({
            'visibility': 'visible',
            'opacity': '1',
            'transform': 'scale(1)',
        });
        $('.page__firstpage-overlay').css({
            'visibility' : 'visible', 
            'height' : scrollHeight + 'px',
            'width' : '100%',
            'opacity': '0.75',
        });
        $(".play-video__close").css({
            'transform': 'rotate(720deg)',
        })
    }

    $(".play-video__close")[0].onclick = function() {
        $(".play-video__content").css({
            'visibility': 'hidden',
            'opacity': '0',
            'transform': 'scale(0)',
        });
        $('.page__firstpage-overlay').css({
            'visibility' : 'hidden', 
            'opacity' : '0',
        });
        $(".play-video__close").css({
            'transform': 'rotate(0deg)',
        })
    }

    /* servise slider */
	let body = document.querySelector('body');
	let serviseSlider = document.querySelector(".service-slider__wrapper");
    body.ondragstart = function() { return false;}; /* disable drag&drop */
    const itemWidth = $(".service-slider-item")[0].getBoundingClientRect().width; /* to determine width of the item */
    let startPosition = 0; /* начальная координата от края блока */

	serviseSlider.onmousedown = function(event) {
        serviseSlider.style.cursor = "move";
        let currentOffset = Math.abs(startPosition) + event.offsetX; // расстояние от левого края блока wrapper до точки клика
        let startX = event.offsetX; // координата точки клика относительно текущего блока
        let startOffsetX = event.clientX; // координата точки клика относительно окна браузера
        console.log(event.clientX);
		serviseSlider.onmousemove = function(e) {
            let offsetX = startOffsetX - e.clientX; // расстояние, на которое сдвинулась мышь от места клика
			if( 0 < currentOffset && currentOffset < itemWidth && offsetX < 0 ) {
				serviseSlider.style.left = startPosition - offsetX / 5 + "px";
			} else
			if( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX > 0 )
			{
				serviseSlider.style.left = startPosition - offsetX / 5 + "px";
            } else
            if( offsetX > 0 ){
                serviseSlider.style.left = startPosition - offsetX + "px"; // двигаем блок влево 
            } else 
            if ( offsetX < 0) {
                serviseSlider.style.left = startPosition + Math.abs(offsetX) + "px"; // двигаем блок вправо 
            }

            document.onmouseup = function(e) {
                if( 0 < currentOffset && currentOffset < itemWidth && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition - itemWidth + 'px';
                    startPosition -= itemWidth;
                } else 
                if ( 0 < currentOffset && currentOffset < itemWidth && offsetX < 0 ) {
                    serviseSlider.style.left = startPosition + 'px';
                } else 
                if ( itemWidth < currentOffset && currentOffset < itemWidth * 2 && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition - itemWidth + 'px';
                    startPosition -= itemWidth;
                } else 
                if ( itemWidth < currentOffset && currentOffset < itemWidth * 2 && offsetX < 0 ) {
                    serviseSlider.style.left = startPosition + itemWidth + 'px';
                    startPosition += itemWidth;
                } else 
                if ( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition + 'px';
                } else
                if ( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX < 0 ) {
                    serviseSlider.style.left = startPosition + itemWidth + 'px';
                    startPosition += itemWidth;
                }

                serviseSlider.onmousemove = null;
                serviseSlider.onmouseup = null;
                serviseSlider.style.cursor = "auto";
            }

		}	

    }
    
    serviseSlider.ontouchstart = function(event) {
        let currentOffset = Math.abs(startPosition) + event.touches[0].clientX; // расстояние от левого края блока wrapper до точки клика
        let startX = event.offsetX; // координата точки клика относительно текущего блока
        let startOffsetX = event.touches[0].clientX; // координата точки клика относительно окна браузера
		serviseSlider.ontouchmove = function(e) {
            let offsetX = startOffsetX - e.touches[0].clientX; // расстояние, на которое сдвинулась мышь от места клика
			if( 0 < currentOffset && currentOffset < itemWidth && offsetX < 0 ) {
				serviseSlider.style.left = startPosition - offsetX / 10 + "px";
			} else
			if( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX > 0)
			{
				serviseSlider.style.left = startPosition - offsetX / 10 + "px";
            } else
            if( offsetX > 0 ){
                serviseSlider.style.left = startPosition - offsetX + "px"; // двигаем блок влево 
            } else 
            if ( offsetX < 0) {
                serviseSlider.style.left = startPosition + Math.abs(offsetX) + "px"; // двигаем блок вправо 
            }
            serviseSlider.ontouchend = function() {
                if( 0 < currentOffset && currentOffset < itemWidth && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition - itemWidth + 'px';
                    startPosition -= itemWidth;
                } else 
                if ( 0 < currentOffset && currentOffset < itemWidth && offsetX < 0 ) {
                    serviseSlider.style.left = startPosition + 'px';
                } else 
                if ( itemWidth < currentOffset && currentOffset < itemWidth * 2 && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition - itemWidth + 'px';
                    startPosition -= itemWidth;
                } else 
                if ( itemWidth < currentOffset && currentOffset < itemWidth * 2 && offsetX < 0 ) {
                    serviseSlider.style.left = startPosition + itemWidth + 'px';
                    startPosition += itemWidth;
                } else 
                if ( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition + 'px';
                } else
                if ( itemWidth * 2 < currentOffset && currentOffset < itemWidth * 3 && offsetX < 0) {
                    serviseSlider.style.left = startPosition + itemWidth + 'px';
                    startPosition += itemWidth;
                } else 
                if  ( currentOffset > itemWidth * 3 && offsetX > 0 ) {
                    serviseSlider.style.left = startPosition + 'px';
                }
                serviseSlider.ontouchmove = null;
                serviseSlider.ontouchend = null;
            }
		}
    }

    /* slider-paginator */
    $.each($(".service-slider__paginator-link"), function(element) {
        element.onclick = function(event) {
            event.preventDefault();
        }
    });

    let paginators = $('.service-slider__paginator')[0].children;
    for(let i = 0; i < paginators.length; i++) {
        let numberOfElements;
        paginators[i].onclick = function() {
            numberOfElements = i;
            serviseSlider.style.left = -(numberOfElements * itemWidth) + 'px';
            for(let j = 0; j < paginators.length; j++) {
                console.dir(paginators[j].children[0].classList);
                paginators[j].children[0].classList.remove('paginator-item--selected');
            }
            paginators[i].children[0].classList.add('paginator-item--selected');
        }
    }



};
