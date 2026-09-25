(function ($) {
  "use strict";

  var OPEN_CLASS = "is-filters-open";
  var MQ = window.matchMedia("(max-width: 767px)");

  $(function () {
    var $section = $(".filters");
    var $toggle = $section.find(".filters__toggle");
    var $panel = $section.find(".filters__card");
    var $backdrop = $section.find(".filters__backdrop");
    var $close = $section.find(".filters__close");

    if (!$toggle.length || !$panel.length) return;

    function isMobile() {
      return MQ.matches;
    }

    function open() {
      if (!isMobile()) return;
      $("body").addClass(OPEN_CLASS);
      $toggle.attr("aria-expanded", "true");
      $panel.attr("aria-hidden", "false");
      $backdrop.attr("aria-hidden", "false");
      $close.trigger("focus");
    }

    function close() {
      $("body").removeClass(OPEN_CLASS);
      $toggle.attr("aria-expanded", "false");
      $backdrop.attr("aria-hidden", "true");
      if (isMobile()) {
        $panel.attr("aria-hidden", "true");
        $toggle.trigger("focus");
      } else {
        $panel.removeAttr("aria-hidden");
      }
    }

    function syncAria() {
      if (isMobile() && !$("body").hasClass(OPEN_CLASS)) {
        $panel.attr("aria-hidden", "true");
        $backdrop.attr("aria-hidden", "true");
        $toggle.attr("aria-expanded", "false");
      } else if (!isMobile()) {
        $("body").removeClass(OPEN_CLASS);
        $panel.removeAttr("aria-hidden");
        $backdrop.attr("aria-hidden", "true");
        $toggle.attr("aria-expanded", "false");
      }
    }

    syncAria();

    $toggle.on("click", function () {
      if ($("body").hasClass(OPEN_CLASS)) close();
      else open();
    });

    $close.on("click", close);
    $backdrop.on("click", close);

    $(document).on("keydown.filters", function (e) {
      if (e.key === "Escape" && $("body").hasClass(OPEN_CLASS)) {
        close();
      }
    });

    if (typeof MQ.addEventListener === "function") {
      MQ.addEventListener("change", syncAria);
    } else if (typeof MQ.addListener === "function") {
      MQ.addListener(syncAria);
    }
  });
})(jQuery);
