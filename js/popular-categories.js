/* Popular categories — horizontal Swiper (desktop + mobile) */

(function ($) {
  var swiper = null;
  var $root = $(".popular-categories__slider");

  function mount() {
    if (swiper || !$root.length) return;

    swiper = new Swiper($root[0], {
      slidesPerView: "auto",
      spaceBetween: 8,
      watchOverflow: true,
      freeMode: true,
    });
  }

  $(function () {
    mount();
  });
})(jQuery);
