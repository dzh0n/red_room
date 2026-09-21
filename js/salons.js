/* Salons — mobile Swiper carousel */

(function ($) {
  var mq = window.matchMedia("(max-width: 767px)");
  var swiper = null;
  var $root = $(".salons__slider");

  function pagePad() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--page-pad-x"
    );
    var n = parseFloat(raw);
    return Number.isFinite(n) ? n : 16;
  }

  function mount() {
    if (swiper || !$root.length) return;

    swiper = new Swiper($root[0], {
      slidesPerView: "auto",
      spaceBetween: 12,
      slidesOffsetBefore: pagePad(),
      slidesOffsetAfter: pagePad(),
      watchOverflow: true,
    });
  }

  function unmount() {
    if (!swiper) return;
    swiper.destroy(true, true);
    swiper = null;
  }

  function sync() {
    if (mq.matches) mount();
    else unmount();
  }

  $(function () {
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else mq.addListener(sync);
  });
})(jQuery);
