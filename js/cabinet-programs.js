/**
 * Programs accordion: expand/collapse program cards independently
 */
(function ($) {
  "use strict";

  var CARD_SEL = ".program-card";
  var TOGGLE_SEL = ".program-card__toggle";
  var BODY_SEL = ".program-card__body";

  function setOpen($card, open) {
    var $toggle = $card.find(TOGGLE_SEL);
    var $body = $card.find(BODY_SEL);

    $card.toggleClass("is-open", open);
    $toggle.attr("aria-expanded", open ? "true" : "false");

    if (!$body.length) {
      return;
    }

    if (open) {
      $body.prop("hidden", false).stop(true, true).slideDown(200);
    } else {
      $body.stop(true, true).slideUp(200, function () {
        $body.prop("hidden", true);
      });
    }
  }

  $(function () {
    $(CARD_SEL).each(function () {
      var $card = $(this);
      var $body = $card.find(BODY_SEL);
      var open = $card.hasClass("is-open");

      if (!$body.length) {
        return;
      }

      if (open) {
        $body.prop("hidden", false).show();
        $card.find(TOGGLE_SEL).attr("aria-expanded", "true");
      } else {
        $body.hide().prop("hidden", true);
        $card.find(TOGGLE_SEL).attr("aria-expanded", "false");
      }
    });
  });

  $(document).on("click", TOGGLE_SEL, function () {
    var $card = $(this).closest(CARD_SEL);
    setOpen($card, !$card.hasClass("is-open"));
  });
})(jQuery);
