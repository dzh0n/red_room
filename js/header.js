/**
 * Mobile header menu: burger open/close
 */
(function ($) {
  "use strict";

  var TOGGLE_SEL = ".site-header__menu-toggle";
  var MENU_SEL = "#mobile-menu";
  var OPEN_CLASS = "is-menu-open";
  var MENU_OPEN_CLASS = "is-open";

  function setOpen(open) {
    var $menu = $(MENU_SEL);
    var $toggle = $(TOGGLE_SEL);

    $("body").toggleClass(OPEN_CLASS, open);
    $menu
      .toggleClass(MENU_OPEN_CLASS, open)
      .prop("hidden", !open)
      .attr("aria-hidden", open ? "false" : "true");
    $toggle.attr("aria-expanded", open ? "true" : "false");
    $toggle.attr("aria-label", open ? "Закрыть меню" : "Меню");

    var $burger = $toggle.find(".site-header__menu-icon--burger");
    var $close = $toggle.find(".site-header__menu-icon--close");
    if (open) {
      $burger.prop("hidden", true);
      $close.prop("hidden", false);
    } else {
      $burger.prop("hidden", false);
      $close.prop("hidden", true);
    }
  }

  function isOpen() {
    return $("body").hasClass(OPEN_CLASS);
  }

  $(document).on("click", TOGGLE_SEL, function () {
    setOpen(!isOpen());
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
    }
  });

  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches && isOpen()) {
      setOpen(false);
    }
  });
})(jQuery);
