/* Salon girls — Swiper of portrait cards */

(function ($) {
  "use strict";

  var swiper = null;
  var $root = $(".salon-girls__slider");

  function pagePad() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--page-pad-x"
    );
    var n = parseFloat(raw);
    return Number.isFinite(n) ? n : 15;
  }

  function mount() {
    if (swiper || !$root.length) return;

    var pad = pagePad();

    swiper = new Swiper($root[0], {
      slidesPerView: 4,
      spaceBetween: 27,
      watchOverflow: true,
      breakpoints: {
        0: {
          slidesPerView: "auto",
          spaceBetween: 12,
          slidesOffsetBefore: pad,
          slidesOffsetAfter: pad,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 27,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      },
    });
  }

  $(function () {
    mount();
  });
})(jQuery);
