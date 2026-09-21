/**
 * Tags: active state + two modes
 * - <a class="tag" href="..."> — navigation link
 * - <button class="tag" aria-describedby="tip-id"> + .tag-tip — tip near tag
 */
(function ($) {
  "use strict";

  // Keep selectors separate: comma in one string breaks delegation
  // (".footer-tags, .tags .tag" matches the whole .footer-tags as `this`)
  var GROUP_SEL = ".footer-tags, .tags";
  var TAG_SEL = ".footer-tags .tag, .tags .tag";

  function closeAllTips() {
    $(".tag-tip.is-open").removeClass("is-open").removeAttr("style");
    $(".tag[aria-expanded='true']").attr("aria-expanded", "false");
  }

  function openTip($tag, $tip) {
    closeAllTips();

    $tag.attr("aria-expanded", "true");
    $tip.addClass("is-open");

    var rect = $tag[0].getBoundingClientRect();
    var gap = 8;
    var tipWidth = Math.min(488, window.innerWidth - 32);
    var left = rect.left;
    var top = rect.bottom + gap;

    if (left + tipWidth > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - tipWidth - 8);
    }

    $tip.css({
      left: left + "px",
      top: top + "px",
      width: tipWidth + "px",
    });

    var tipHeight = $tip.outerHeight();
    if (top + tipHeight > window.innerHeight - 8 && rect.top > tipHeight + gap) {
      $tip.css("top", rect.top - tipHeight - gap + "px");
    }
  }

  $(function () {
    $(document).on("click", TAG_SEL, function (e) {
      var $tag = $(this);
      var $group = $tag.closest(GROUP_SEL);
      var tipId = $tag.attr("aria-describedby");
      var $tip = tipId ? $("#" + tipId) : $();
      var isTipTag = $tip.length > 0;
      var href = $tag.attr("href");

      e.stopPropagation();

      $group.find(".tag").removeClass("tag--active");
      $tag.addClass("tag--active");

      if (isTipTag) {
        e.preventDefault();

        var isOpen = $tip.hasClass("is-open");
        closeAllTips();

        if (!isOpen) {
          openTip($tag, $tip);
        }
        return;
      }

      if (!href || href === "#" || href.charAt(0) === "#") {
        e.preventDefault();
        closeAllTips();
      } else {
        closeAllTips();
      }
    });

    $(document).on("click", function () {
      closeAllTips();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        closeAllTips();
      }
    });

    $(window).on("scroll resize", function () {
      closeAllTips();
    });
  });
})(jQuery);
