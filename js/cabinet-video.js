(function ($) {
  "use strict";

  var $modal = $("#video-upload-modal");
  if (!$modal.length) return;

  var $filename = $modal.find("[data-video-filename]");
  var $input = $modal.find("[data-video-file-input]");
  var placeholder = $filename.data("placeholder") || "Выберите файл";
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    $modal.removeAttr("hidden");
    $("body").addClass("is-photos-modal-open");
    $modal.find(".photos-modal__dialog").trigger("focus");
  }

  function closeModal() {
    $modal.attr("hidden", true);
    $("body").removeClass("is-photos-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function pickFile() {
    $input.trigger("click");
  }

  $(document).on("click", "[data-video-add]", function (e) {
    e.preventDefault();
    openModal();
  });

  $modal.on("click", "[data-video-modal-close]", function () {
    closeModal();
  });

  $modal.on("click", "[data-video-pick]", function (e) {
    e.preventDefault();
    pickFile();
  });

  $input.on("change", function () {
    var file = this.files && this.files[0];
    if (file) {
      $filename.text(file.name).removeClass("is-placeholder");
    } else {
      $filename.text(placeholder).addClass("is-placeholder");
    }
  });

  $modal.on("submit", ".photos-modal__form", function (e) {
    e.preventDefault();
    closeModal();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && !$modal.is("[hidden]")) {
      closeModal();
    }
  });
})(jQuery);
