# jquery.transformTo

This library adds a handy method to jQuery elements that allows you to declaratively specify what dimensions and positions you'd like the element to have. The library then calculates the necessary translation and scaling required, and applies them using CSS transforms. During animations, these transforms are much more performant compared to editing the `left`, `top`, `width` or `height` CSS attributes.

## How To

Here's some examples. Currently we support the `x`, `y`, `width` and `height` properties:
```javascript
$("#block").transformTo({x: 50, y: 50});
$("#block").transformTo({x: "300px"});
$("#block").transformTo({width: "200px"});
$("#block").transformTo({height: "100px"});

// Let's dive into one
$("#first").width(); //= 100
$("#first").position(); //= {top: 200, left: 200}

$("#first").transformTo({width: "400px", x: "100px"});
// This will set scaleX to 4.0 to get 400px width.
// Setting scaleX to 4 also influences the position of the box, making it
// start 150px more to the left.
// Since we started at x = 200px, that means it's now visually at x = 50px,
// and we need to set translateX(12.5px) (50px/scaleX) to get the final x to
// be 100px.
```

# See Also

* For more info about performance in animations: http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
