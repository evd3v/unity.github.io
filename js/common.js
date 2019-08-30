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
            "transform": "translate(0%, " + scrollPosition / 20 + "%)",
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
	let wrapper = document.querySelector('body');
	let op = document.querySelector(".service-slider__wrapper");
	wrapper.ondragstart = function() { return false;};

	op.onmousedown = function(event) {
		op.style.cursor = "move";
		let startOffset = op.getBoundingClientRect().left - 15;
		let startX = event.clientX;
		op.onmousemove = function(e) {
			let offsetX = startX - e.clientX;
			if(event.target.classList.contains('first') && offsetX < 0) {
				op.style.left = startOffset - offsetX / 10 + "px";
			} else
			if(event.target.classList.contains('second') && offsetX > 0)
			{
				op.style.left = startOffset - offsetX / 10 + "px";
			} else {
			op.style.left = startOffset - offsetX + "px";
			}
		}	
		document.onmouseup = function(e) {
			console.log('start ' + startOffset);
			
			let finalOffsetX = startX - e.clientX;
			let finalLeft = startOffset + 550;
			console.log('finalLeft ' + finalLeft);
			if(event.target.classList.contains('first') && finalOffsetX < 0) {
				op.style.left = 0 + "px";
			} else if(event.target.classList.contains('second') && (finalOffsetX > 0 || finalLeft > 0)) {
				op.style.left = -550 + "px";
			} else if(finalLeft < -550) {
				op.style.left = -550 + "px";
			} else if(finalLeft < 0) {
			op.style.left = 0 + "px";
			} else
			if (Math.abs(finalOffsetX) > 0) {
				if(finalOffsetX < 0) {
					op.style.left = startOffset + 550 + "px";
				} else if(finalOffsetX > 0) {
					op.style.left = startOffset - 550 + "px";
				}
			}
			op.onmousemove = null;
			op.onmouseup = null;
		}
	}
};