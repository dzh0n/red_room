(function ($) {
  "use strict";

  function parseBudget(value) {
    var n = parseInt(String(value).replace(/\D/g, ""), 10);
    return isNaN(n) ? 150 : n;
  }

  function formatBudget(n) {
    return n + " ₽ /день";
  }

  function formatMonthly(n) {
    return n * 20 + " ₽ / 30 дней";
  }

  function placeForBudget(n) {
    if (n >= 250) return 1;
    if (n >= 200) return 2;
    if (n >= 150) return 3;
    if (n >= 100) return 5;
    return 8;
  }

  function syncBudget($root, n) {
    var $input = $root.find("[data-ads-budget]");
    var min = parseInt($input.data("min"), 10) || 50;
    if (n < min) n = min;

    $input.val(formatBudget(n));
    $root.find("[data-ads-monthly]").text(formatMonthly(n));
    $root
      .find("[data-ads-place]")
      .html("При этой ставке салон займёт " + placeForBudget(n) + "&nbsp;место");
  }

  $(function () {
    var $root = $(".ads-edit");
    if (!$root.length) return;

    $root.on("click", "[data-ads-step]", function () {
      var $input = $root.find("[data-ads-budget]");
      var step = parseInt($input.data("step"), 10) || 50;
      var dir = parseInt($(this).data("ads-step"), 10) || 0;
      syncBudget($root, parseBudget($input.val()) + dir * step);
    });

    $root.on("change blur", "[data-ads-budget]", function () {
      syncBudget($root, parseBudget($(this).val()));
    });
  });
})(jQuery);
