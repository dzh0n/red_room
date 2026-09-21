/**
 * FAQ accordion: one open at a time, toggle +/− icons
 */
(function ($) {
  "use strict";

  var ITEM_SEL = ".faq-item";
  var TRIGGER_SEL = ".faq-item__trigger";
  var PANEL_SEL = ".faq-item__panel";

  function closeItem($item) {
    $item.removeClass("is-open");
    $item.find(TRIGGER_SEL).attr("aria-expanded", "false");
    $item.find(PANEL_SEL).stop(true, true).slideUp(200);
  }

  function openItem($item) {
    $item.addClass("is-open");
    $item.find(TRIGGER_SEL).attr("aria-expanded", "true");
    $item.find(PANEL_SEL).stop(true, true).slideDown(200);
  }

  $(function () {
    $(ITEM_SEL).each(function () {
      var $item = $(this);
      var $panel = $item.find(PANEL_SEL);

      if ($item.hasClass("is-open")) {
        $panel.show();
        $item.find(TRIGGER_SEL).attr("aria-expanded", "true");
      } else {
        $panel.hide();
        $item.find(TRIGGER_SEL).attr("aria-expanded", "false");
      }
    });
  });

  $(document).on("click", TRIGGER_SEL, function () {
    var $item = $(this).closest(ITEM_SEL);
    var isOpen = $item.hasClass("is-open");

    if (isOpen) {
      closeItem($item);
      return;
    }

    closeItem($item.siblings(ITEM_SEL + ".is-open"));
    openItem($item);
  });
})(jQuery);
