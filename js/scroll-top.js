/**
 * Scroll to top button
 */
(function ($) {
  "use strict";

  var BTN_SEL = ".scroll-top";
  var SHOW_AFTER = 400;
  var VISIBLE = "is-visible";

  function update() {
    $(BTN_SEL).toggleClass(VISIBLE, $(window).scrollTop() > SHOW_AFTER);
  }

  $(function () {
    var $btn = $(BTN_SEL);
    if (!$btn.length) return;

    update();
    $(window).on("scroll resize", update);

    $btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 400);
    });
  });
})(jQuery);
