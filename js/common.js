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
        $(".header-menu-overlay__list")[0].style.opacity = "1";
        $(".header-menu-overlay")[0].style.width = "100%";
    });

    $(".header-menu-overlay__close").click(function(e) {
        $(".header-menu-overlay")[0].style.width = "0";
        $(".header-menu-overlay__list")[0].style.opacity = "0";
    });


    /* bg-parallax effect on scroll */

    $(window).scroll(function() {
        let scrollPosition = $(this).scrollTop();
        $(".page-bg").css({
            "transform": "translate(0, " + scrollPosition / 20 + "%)",
        });
    });

    /* video popup */

    $(".play-video").magnificPopup({
        delegate: 'a',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function() {
             this.st.mainClass = this.st.el.attr('data-effect');
          }
        },
        midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    /* servise slider */
	let body = document.querySelector('body');
	let serviseSlider = document.querySelector(".service-slider__wrapper");
	body.ondragstart = function() { return false;}; /* disable drag&drop */

	serviseSlider.onmousedown = function(event) {
        serviseSlider.style.cursor = "move";
        let elemWidth = event.target.getBoundingClientRect().width;
        let startOffset = serviseSlider.getBoundingClientRect().left;
        let startX = event.clientX;
		serviseSlider.onmousemove = function(e) {
            let offsetX = startX - e.clientX;
            console.log(event.target);
            // console.log(event.target.parentNode.classList.contains('service-slider-item--first'));
            // console.log(offsetX);
			if((event.target.parentNode.classList.contains('service-slider-item--first') || event.target.classList.contains('service-slider-item--first'))  && offsetX < 0) {
                console.log(11);
				serviseSlider.style.left = -offsetX / 10 + "px";
			} else
			if((event.target.parentNode.classList.contains('service-slider-item--last') || event.target.classList.contains('service-slider-item--first')) && offsetX > 0)
			{
                console.log(12);
				serviseSlider.style.left = startOffset - 225 - offsetX / 10 + "px";
			} else {
                console.log(13);
                serviseSlider.style.left = startOffset - offsetX - 225 + "px";
			}
		}	
		document.onmouseup = function(e) {
			// console.log('start ' + startOffset);
			
			let finalOffsetX = startX - e.clientX;
			let finalLeft =  elemWidth;
			// console.log('finalLeft ' + finalLeft);
			if(event.target.classList.contains('first') && finalOffsetX < 0) {
                console.log(1);
				serviseSlider.style.left = 0 + "px";
			} else if(event.target.classList.contains('second') && (finalOffsetX > 0 || finalLeft > 0)) {
                serviseSlider.style.left = -elemWidth + "px";
                console.log(2);
			} else if(finalLeft < -elemWidth) {
                serviseSlider.style.left = -elemWidth + "px";
                console.log(3);
			} else if(finalLeft < 0) {
                serviseSlider.style.left = 0 + "px";
                console.log(4);
			} else
			if (Math.abs(finalOffsetX) > 0) {
				if(finalOffsetX < 0) {
                    serviseSlider.style.left =  0 + "px";
                    // console.log(6);
				} else if(finalOffsetX > 0) {
                    serviseSlider.style.left =  -elemWidth + "px";
                    // console.log(7);
				}
			}
			serviseSlider.onmousemove = null;
            serviseSlider.onmouseup = null;
            serviseSlider.style.cursor = "auto";
		}
	}
};