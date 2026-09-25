(function ($) {
  "use strict";

  $(function () {
    var $list = $(".sort-tabs__list");
    if (!$list.length) return;

    $list.on("click", ".sort-tabs__btn", function () {
      var $btn = $(this);
      if ($btn.hasClass("is-active")) return;

      $list
        .find(".sort-tabs__btn")
        .removeClass("is-active")
        .attr("aria-pressed", "false");

      $btn.addClass("is-active").attr("aria-pressed", "true");
    });
  });
})(jQuery);
