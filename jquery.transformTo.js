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
      var $height, $this, $width, css, currentLeft, currentTop, currently, name, scaleExtraLeft, scaleExtraTop, transformValue, transforms, _i, _len, _ref;
      $this = $(this);
      $width = $this.width();
      $height = $this.height();
      currentLeft = isNaN($this.css('left')) ? 0 : $this.css('left');
      currentTop = isNaN($this.css('top')) ? 0 : $this.css('top');
      currently = $this.data('transformTo') || {};
      transforms = {
        scaleX: 1,
        scaleY: 1
      };
      if (settings.width) {
        transforms.scaleX = settings.width / $width;
      }
      if (settings.height) {
        transforms.scaleY = settings.height / $height;
      }
      if (settings.x || (transforms.scaleX !== 1)) {
        scaleExtraLeft = ($width / 2) * (1 - transforms.scaleX);
        transforms.translateX = (settings.x - (currentLeft + scaleExtraLeft)) / transforms.scaleX;
      }
      if (settings.y || (transforms.scaleY !== 1)) {
        scaleExtraTop = ($height / 2) * (1 - transforms.scaleY);
        transforms.translateY = (settings.y - (currentTop + scaleExtraTop)) / transforms.scaleY;
      }
      $this.data('transformTo', transforms);
      transformValue = "";
      if ((transforms.scaleX != null) && transforms.scaleX !== 1) {
        transformValue += "scaleX(" + transforms.scaleX + ") ";
      }
      if ((transforms.scaleY != null) && transforms.scaleY !== 1) {
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
