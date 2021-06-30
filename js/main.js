let MAIN = document.getElementById('main');
let HEIGHT = window.innerHeight;
  //Detect mobile devices
const MOBILE = /iPhone|iPad|iPod|Android|webOS/i.test(navigator.userAgent);




document.addEventListener("DOMContentLoaded", () => {
  
 videoBgInit();
 TweenMax.to('.preloader-bg', 1.1, { delay: 2.7,ease: Power4.easeInOut, x: "100%" });
TweenMax.set(document.querySelector('.page-preloader'), {delay: 4, display: "none" });

 

});

var videos = document.querySelectorAll(".video-bg");
function videoBgInit() {
  Array.from(videos).forEach(function (video) {
      let videoNode = document.createElement('video');
      videoNode.loop = true;
      videoNode.muted = true;
      videoNode.defaultMuted = true;
      videoNode.preload = "none";

      let videoSource = document.createElement('source');
      videoSource.type = 'video/mp4';
      videoSource.src  = MOBILE ? video.getAttribute('data-mobile') : video.getAttribute('data-src');


      videoNode.appendChild(videoSource);
      video.appendChild(videoNode);

      //videoNode.play();
      videoNode.load();
      playVideo(videoNode);

  });
}


async function playVideo(videoElem) {
  try {
      await videoElem.play();
  } catch (error) {
      console.log('Video Playback Error ', error)
  }
}



//Full height Main section on mobile
(MAIN && MOBILE) && (MAIN.style.height = HEIGHT + 'px');



window.onload = function () {
  TweenMax.to(".main-title span", 1, { delay: 2.3, x: 0, y: 0, z: 0, ease: Power4.easeInOut, })
  let timerId = setTimeout(function () {
    viewOnInit()
  }, 1000);

};


function viewOnInit() {
  var needToPrint = Array.from(document.querySelectorAll('.animated'));
  needToPrint.forEach(function (el) {
    var watcher = scrollMonitor.create(el, { top: -200 });
    watcher.enterViewport(function () {
      el.classList.add('animate');
      watcher.destroy();
    });
  });

}

let bodyAnkor = document.getElementById("bodyAnkor");
let elementWatcher = scrollMonitor.create(bodyAnkor, { top: -200, bottom: -200 });
elementWatcher.enterViewport(function () {
  document.body.style.backgroundColor = "#1b2c34";
  document.querySelectorAll('.line-container__item').forEach(function (el) {
    el.style.color = "#fff";
  });
  document.querySelector('.services-video-wrap').classList.add('dark');
});
elementWatcher.exitViewport(function () {
  document.body.style.backgroundColor = "#fff";
  document.querySelectorAll('.line-container__item').forEach(function (el) {
    el.style.color = "#1b2c34";
  });
  document.querySelector('.services-video-wrap').classList.remove('dark');
});



var mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 800,
  loop: true,
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',

  },
  //centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    }
  }
})

//Disable scroll on Menu open
function disableTouch(e) {
  e.preventDefault();
}


let BODY = document.getElementsByTagName('body')[0];
let open = document.getElementById('nav-menu');
let OVERLAY = document.querySelector('.menu-overlay-round');
let WIDTH = window.innerWidth;

//Mobile Menu open
mobileMenu();


function mobileMenu() {
  var diameterValue = (Math.sqrt(Math.pow(HEIGHT, 2) + Math.pow(WIDTH, 2)) * 3);
  TweenMax.set(OVERLAY, {
      height: diameterValue,
      width: diameterValue,
      top: -(diameterValue / 2),
      left: -(diameterValue / 2),
  });

document.getElementById('nav-menu').addEventListener("click", function () {
  if (!BODY.classList.contains("open")) {
    BODY.classList.add("open");
    open.classList.add('open');
    TweenMax.to(OVERLAY, 1, { scale: 1 });
    document.addEventListener('touchmove', disableTouch, { passive: false });
  } else {
    BODY.classList.remove("open");
    open.classList.remove('open');
    TweenMax.to(OVERLAY, 1, { scale: 0, delay: 0.37 });
    document.removeEventListener('touchmove', disableTouch, { passive: false });
  }
}, false);


}
const navLinksSmooth = () => {
  const navLinks = document.querySelectorAll('.navbar-links');

  for (let n in navLinks) {
    if (navLinks.hasOwnProperty(n)) {

      navLinks[n].addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(navLinks[n].hash)
          .scrollIntoView({
            behavior: "smooth"
          });
        BODY.classList.remove("open");
        open.classList.remove('open');
        TweenMax.to(OVERLAY, 1, { scale: 0, delay: 0.37 });
        document.removeEventListener('touchmove', disableTouch, { passive: false });
      })
    }
  }
}

navLinksSmooth();

/////
document.querySelector('.scroll-up__link').addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
  
