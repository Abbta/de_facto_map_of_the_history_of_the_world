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
    if((viewBox.width < 400 || delta >= 0) && (viewBox.width > 50 || delta <= 0))
    {
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
  }

  function windowResize(event)
  {
    windowHeight = document.documentElement.clientHeight * 0.9;
    windowWidth = document.documentElement.clientWidth;
    map.style.height = windowHeight.toString()+"px";
  }

  function mousemove(event)
  {
    const moveFactor = 1/707.4; //unsure why this value, but it works
    var moveX = event.movementX;
    var moveY = event.movementY;
    if(event.buttons == 1)
    {
      console.log(viewBox.width);
      if((viewBox.x < 300 + 20000 / viewBox.width || moveX >= 0) && (viewBox.x > -300 + 20000/viewBox.width || moveX <= 0))
      //also very arbitrary values, but it works
        viewBox.x -= event.movementX * (viewBox.width *moveFactor);
      if((viewBox.y < 50 + 20000 / viewBox.height || moveY >= 0) && (viewBox.y > -150 + 5000/viewBox.height || moveY <= 0))
        viewBox.y -= event.movementY * (viewBox.height *moveFactor);     
    }
  }

  document.getElementById("lbutton").addEventListener("click", lclick);
  document.getElementById("rbutton").addEventListener("click", rclick);

  var year = 2021;
  var mapHolder = document.getElementById("map_holder");
  var yearText = document.getElementById("year");

  function lclick(event)
  {
    year -=1;
    loadMap(year);
    yearText.textContent = year;
  }

  function rclick(event)
  {
    year +=1;
    loadMap(year);
    yearText.textContent = year;
  }

  function loadMap(yearParam)
  {
      mapHolder.removeChild(document.getElementById("map"));

      const path = 'svg/' + yearParam + '.svg';

      xhr = new XMLHttpRequest();
      xhr.open("GET",path,false);
      // Following line is just to be on the safe side;
      // not needed if your server delivers SVG with correct MIME type
      xhr.overrideMimeType("image/svg+xml");
      xhr.onload = function(e) 
      {
          // You might also want to check for xhr.readyState/xhr.status here
          mapHolder.appendChild(xhr.responseXML.documentElement);
      };
      xhr.send("");
      map = document.querySelector("svg");
      if(map == null)
      {
        //if no map was loaded
        xhr.open("GET",'svg/not_found.svg',false)
        xhr.overrideMimeType("image/svg+xml");
        xhr.onload = function(e) 
        {
            // You might also want to check for xhr.readyState/xhr.status here
            mapHolder.appendChild(xhr.responseXML.documentElement);
        };
        xhr.send("");
        map = document.querySelector("svg");
      }
      viewBox = map.viewBox.baseVal;
      point = map.createSVGPoint();
      windowResize();
      }

  windowResize();
});

