/* Salon detail gallery — main + thumbs Swiper */

(function ($) {
  "use strict";

  function pagePad() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--page-pad-x"
    );
    var n = parseFloat(raw);
    return Number.isFinite(n) ? n : 15;
  }

  function initSalonGallery($root) {
    var $main = $root.find(".salon-detail__main");
    var $thumbs = $root.find(".salon-detail__thumbs");
    if (!$main.length || !$thumbs.length) return;

    var pad = pagePad();

    var thumbsSwiper = new Swiper($thumbs[0], {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesProgress: true,
      watchOverflow: true,
      breakpoints: {
        0: {
          slidesPerView: "auto",
          spaceBetween: 8,
          slidesOffsetBefore: pad,
          slidesOffsetAfter: pad,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 12,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      },
    });

    new Swiper($main[0], {
      spaceBetween: 0,
      watchOverflow: true,
      navigation: {
        nextEl: $main.find(".salon-detail__nav--next")[0],
        prevEl: $main.find(".salon-detail__nav--prev")[0],
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }

  $(function () {
    $(".salon-detail__gallery").each(function () {
      initSalonGallery($(this));
    });
  });
})(jQuery);
