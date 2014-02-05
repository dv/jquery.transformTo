var $;

$ = jQuery;

$.fn.extend({
  transformTo: function(options) {
    var key, settings, value;
    settings = {
      scaleX: 1.0,
      scaleY: 1.0,
      x: 0,
      y: 0
    };
    settings = $.extend(settings, options);
    for (key in settings) {
      value = settings[key];
      if (value instanceof String) {
        settings[key] = value.replace("px", "");
      }
    }
    return this.each(function() {
      var $height, $this, $width, css, currently, name, scaleExtraLeft, scaleExtraTop, transformValue, transforms, _i, _len, _ref;
      $this = $(this);
      $width = $this.width();
      $height = $this.height();
      currently = $this.data('transformTo') || {};
      transforms = {};
      if (settings.width) {
        transforms.scaleX = settings.width / $width;
      }
      if (settings.height) {
        transforms.scaleY = settings.height / $height;
      }
      if (settings.x) {
        scaleExtraLeft = ($width / 2) * (1 - transforms.scaleX);
        transforms.translateX = (settings.x - ($this.css("left") + scaleExtraLeft)) / transforms.scaleX;
      }
      if (settings.y) {
        scaleExtraTop = ($height / 2) * (1 - transforms.scaleY);
        transforms.translateY = (settings.y - ($this.css("top") + scaleExtraTop)) / transforms.scaleY;
      }
      $this.data('transformTo', transforms);
      transformValue = "";
      if (transforms.scaleX != null) {
        transformValue += "scaleX(" + transforms.scaleX + ") ";
      }
      if (transforms.scaleY != null) {
        transformValue += "scaleY(" + transforms.scaleY + ") ";
      }
      if (transforms.translateX != null) {
        transformValue += "translateX(" + transforms.translateX + "px) ";
      }
      if (transforms.translateY != null) {
        transformValue += "translateY(" + transforms.translateY + "px) ";
      }
      css = {};
      _ref = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        css[name] = transformValue;
      }
      return $this.css(css);
    });
  }
});
