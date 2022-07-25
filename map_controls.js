document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  var map = document.querySelector("svg");
  var viewBox = map.viewBox.baseVal;

  window.addEventListener("wheel", onWheel);
  window.addEventListener("resize", windowResize);
  window.addEventListener("mousemove", mousemove);

  var zoom = {
    //animation: new TimelineLite(),
    scaleFactor: 1.6,
    duration: 0.5,
    //ease: Power2.easeOut,
  };
  var point = map.createSVGPoint();
  var windowHeight;
  var windowWidth;

  function onWheel(event)
  {
    event.preventDefault();
    
    //pivotAnimation.reverse();
    
    var normalized;  
    var delta = event.wheelDelta;

    if (delta) {
      normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
    } else {
      delta = event.deltaY || event.detail || 0;
      normalized = -(delta % 3 ? delta * 10 : delta / 3);
    }
    
    var scaleDelta = normalized > 0 ? 1 / zoom.scaleFactor : zoom.scaleFactor;
    
    point.x = event.clientX;
    point.y = event.clientY;
    
    var startPoint = point.matrixTransform(map.getScreenCTM().inverse());
    
    viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
    viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
    viewBox.width *= scaleDelta;
    viewBox.height *= scaleDelta;
      
    //zoom.animation = TweenLite.from(viewBox, zoom.duration, fromVars);  
  }

  function windowResize(event)
  {
    windowHeight = document.documentElement.clientHeight * 0.9;
    windowWidth = document.documentElement.clientWidth;
    map.style.height = windowHeight.toString()+"px";
  }

  function mousemove(event)
  {
    if(event.buttons == 1)
    {
      //console.log
      viewBox.x -= event.movementX * (viewBox.width / windowWidth);
      viewBox.y -= event.movementY * (viewBox.height / windowHeight);
    }
  }

  windowResize();
});

