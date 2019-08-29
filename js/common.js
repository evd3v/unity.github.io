window.onload = function() {

    let header = document.querySelector(".header");
    let headerText = document.querySelector(".header__text");
    let sizeOfHeader = 100;

    let checkHeaderSize = function() {
        // console.dir(header);
        // console.log(document.documentElement.clientWidth);
        if(header.offsetWidth > document.documentElement.clientWidth / 1.5) {
            headerText.style.fontSize = sizeOfHeader-- + "px";
            checkHeaderSize();
        } else {
            return true;
        }
    };

    checkHeaderSize();

    window.onresize = checkHeaderSize;

    let playVideo = document.querySelector(".play-video");
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

    $(".header-menu__link").click(function() {
        $(".header-menu-overlay__list")[0].style.opacity = "1";
        $(".header-menu-overlay")[0].style.width = "100%";
    });

    $(".header-menu-overlay__close").click(function() {
        $(".header-menu-overlay")[0].style.width = "0";
        $(".header-menu-overlay__list")[0].style.opacity = "0";
    });


    // Example 1: From an element in DOM
    // $('.open-popup-link').magnificPopup({
    //     type:'inline',
    //     removalDelay: 500, //delay removal by X to allow out-animation
    //     // fixedContentPos: false,
    //     callbacks: {
    //         beforeOpen: function() {
    //         this.st.mainClass = this.st.el.attr('data-effect');
    //         },
    //     },
    //     midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    //  });
  
};