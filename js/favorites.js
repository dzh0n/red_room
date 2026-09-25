(function ($) {
  "use strict";

  $(function () {
    var $root = $(".favorites");
    if (!$root.length) return;

    var $tabs = $root.find("[data-favorites-tab]");
    var $panels = $root.find("[data-favorites-panel]");

    function show(tab) {
      $panels.each(function () {
        var $panel = $(this);
        var on = $panel.attr("data-favorites-panel") === tab;
        $panel.toggleClass("is-active", on);
        $panel.prop("hidden", !on);
      });
    }

    $tabs.on("click", function () {
      var tab = $(this).attr("data-favorites-tab");
      if (!tab) return;
      show(tab);
    });
  });
})(jQuery);
