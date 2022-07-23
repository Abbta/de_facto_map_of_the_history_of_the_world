var map = document.querySelector("#map");

window.addEventListener("wheel", onWheel);

var zoom = {
  //animation: new TimelineLite(),
  scaleFactor: 1.6,
  duration: 0.5,
  //ease: Power2.easeOut,
};
var point = map.createSVGPoint();

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
    
  var fromVars = {
    //ease: zoom.ease,
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height,
  };
  
  viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
  viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
  viewBox.width *= scaleDelta;
  viewBox.height *= scaleDelta;
    
  //zoom.animation = TweenLite.from(viewBox, zoom.duration, fromVars);  
}