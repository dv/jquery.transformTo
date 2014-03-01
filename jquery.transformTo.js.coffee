$ = jQuery
$.fn.extend
  
  # Uses scale and translate transforms to shape element
  # instead of width/height and top/left
  # $('#el').transformTo x: 150px, y: 100px
  # $('#el').transformTo width: 300px, height: 500px
  # Check how regular jquery getters are influenced by transforms:
  # http://jsfiddle.net/8j6AF/22/

  transformTo: (options) ->
    # Default settings
    settings =
      scaleX: 1.0
      scaleY: 1.0
      x: 0
      y: 0

    # Merge default settings with options.
    settings = $.extend settings, options

    # Remove "px" from values
    for key, value of settings
      settings[key] = value.replace("px","") if value instanceof String

    @each ->
      $this = $(this)
      $width = $this.width()
      $height = $this.height()

      currently = $this.data('transformTo') || {}
      transforms = {scaleX: 1, scaleY: 1}
 
      # set scale
      if settings.width
        transforms.scaleX = settings.width / $width

      if settings.height
        transforms.scaleY = settings.height / $height

      # set translate
      if settings.x || (transforms.scaleX != 1)
        scaleExtraLeft = ($width/2)*(1-transforms.scaleX)
        transforms.translateX = (settings.x - ($this.css("left") + scaleExtraLeft))/transforms.scaleX

      if settings.y || (transforms.scaleY != 1)
        scaleExtraTop = ($height/2)*(1-transforms.scaleY)
        transforms.translateY = (settings.y - ($this.css("top") + scaleExtraTop))/transforms.scaleY

      # save transforms
      $this.data('transformTo', transforms)

      # generate transform string
      transformValue  = ""
      transformValue += "scaleX(#{transforms.scaleX}) "           if transforms.scaleX? && transforms.scaleX != 1
      transformValue += "scaleY(#{transforms.scaleY}) "           if transforms.scaleY? && transforms.scaleY != 1
      transformValue += "translateX(#{transforms.translateX}px) " if transforms.translateX?
      transformValue += "translateY(#{transforms.translateY}px) " if transforms.translateY?

      # generate CSS object
      css = {}
      for name in ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"]
        css[name] = transformValue

      # apply transform
      $this.css(css)
