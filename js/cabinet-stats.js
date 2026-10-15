(function ($) {
  "use strict";

  var LABELS = {
    table: { show: "Показать таблицу", hide: "Скрыть таблицу" },
    chart: { show: "Показать график", hide: "Скрыть график" },
  };

  function updateHScroll($wrap) {
    var $scroll = $wrap.find(".stats-card__table-scroll, .stats-card__chart-scroll").first();
    var $bar = $wrap.find(".stats-card__hscroll");
    var $thumb = $bar.find(".stats-card__hscroll-thumb");
    var el = $scroll[0];

    if (!el || !$bar.length) return;

    var max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      $bar.attr("hidden", "hidden");
      return;
    }

    $bar.removeAttr("hidden");

    var track = $bar.innerWidth();
    var thumbW = Math.max(24, Math.round((el.clientWidth / el.scrollWidth) * track));
    var maxLeft = track - thumbW;
    var left = maxLeft <= 0 ? 0 : Math.round((el.scrollLeft / max) * maxLeft);

    $thumb.css({ width: thumbW + "px", transform: "translateX(" + left + "px)" });
  }

  function updateCardHScroll($card) {
    $card.find(".stats-card__table-wrap, .stats-card__chart").each(function () {
      updateHScroll($(this));
    });
  }

  function setPanel($card, panel, open) {
    var other = panel === "table" ? "chart" : "table";
    var openClass = "is-" + panel + "-open";
    var otherClass = "is-" + other + "-open";
    var $btn = $card.find('[data-stats-panel="' + panel + '"]');
    var $otherBtn = $card.find('[data-stats-panel="' + other + '"]');
    var $reveal = $card.find(".stats-card__reveal--" + panel);
    var $otherReveal = $card.find(".stats-card__reveal--" + other);
    var labels = LABELS[panel];
    var otherLabels = LABELS[other];

    if (open && $card.hasClass(otherClass)) {
      $card.removeClass(otherClass);
      $otherBtn
        .removeClass("is-active")
        .attr("aria-expanded", "false")
        .find("span")
        .first()
        .text(otherLabels.show);
      $otherReveal.attr("aria-hidden", "true");
    }

    $card.toggleClass(openClass, open);
    $btn.toggleClass("is-active", open).attr("aria-expanded", open ? "true" : "false");
    $btn.find("span").first().text(open ? labels.hide : labels.show);
    $reveal.attr("aria-hidden", open ? "false" : "true");

    if (open) {
      window.requestAnimationFrame(function () {
        updateCardHScroll($card);
        window.setTimeout(function () {
          updateCardHScroll($card);
        }, 360);
      });
    }
  }

  $(function () {
    $(".stats-card__period-tabs").on("click", ".stats-card__period-btn", function () {
      var $btn = $(this);
      if ($btn.hasClass("is-active")) return;

      $btn
        .closest(".stats-card__period-tabs")
        .find(".stats-card__period-btn")
        .removeClass("is-active")
        .attr("aria-pressed", "false");

      $btn.addClass("is-active").attr("aria-pressed", "true");
    });

    $(".stats-card").on("click", "[data-stats-panel]", function () {
      var $btn = $(this);
      var panel = $btn.data("stats-panel");
      if (panel !== "table" && panel !== "chart") return;

      var $card = $btn.closest(".stats-card");
      var openClass = "is-" + panel + "-open";
      setPanel($card, panel, !$card.hasClass(openClass));
    });

    $(".stats-card__table-scroll, .stats-card__chart-scroll").on("scroll", function () {
      updateHScroll($(this).closest(".stats-card__table-wrap, .stats-card__chart"));
    });

    $(window).on("resize", function () {
      $(".stats-card.is-table-open, .stats-card.is-chart-open").each(function () {
        updateCardHScroll($(this));
      });
    });
  });
})(jQuery);
