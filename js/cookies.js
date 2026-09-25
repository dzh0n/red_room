/**
 * Cookies notice — persist acceptance in localStorage
 */
(function ($) {
  "use strict";

  var BANNER_SEL = ".cookies-banner";
  var ACCEPT_SEL = ".cookies-banner__accept";
  var BODY_CLASS = "has-cookies-banner";
  var STORAGE_KEY = "rr-cookies-accepted";

  function setOffset($banner) {
    if (!$banner.length || $banner.prop("hidden")) {
      document.documentElement.style.setProperty("--cookies-banner-offset", "0px");
      return;
    }
    document.documentElement.style.setProperty(
      "--cookies-banner-offset",
      $banner.outerHeight() + "px"
    );
  }

  function hide($banner) {
    $banner.prop("hidden", true).attr("aria-hidden", "true");
    $("body").removeClass(BODY_CLASS);
    setOffset($banner);
  }

  function show($banner) {
    $banner.prop("hidden", false).attr("aria-hidden", "false");
    $("body").addClass(BODY_CLASS);
    setOffset($banner);
  }

  $(function () {
    var $banner = $(BANNER_SEL);
    if (!$banner.length) return;

    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        hide($banner);
        return;
      }
    } catch (e) {
      /* private mode — still show */
    }

    show($banner);
    $(window).on("resize", function () {
      setOffset($banner);
    });

    $(document).on("click", ACCEPT_SEL, function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {
        /* ignore */
      }
      hide($banner);
    });
  });
})(jQuery);
