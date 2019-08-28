window.onload = function() {

    let header = document.querySelector(".header");
    let headerText = document.querySelector(".header__text");
    let sizeOfHeader = 100;

    let checkHeaderSize = function() {
        console.dir(header);
        console.log(document.documentElement.clientWidth);
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
    };


    // Example 1: From an element in DOM
    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
     });
  
};