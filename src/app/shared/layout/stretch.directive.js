/*
 * Gives the containing element a height relative to the
 * window height
 * @param amount: window size percentage (ex.: 0.9 = 90%)
 * @param offset: the offset amount (pixels)
 * @param strict: true if should set the height and not min-height
 */
angular.module('dm.coreLayout').directive('stretch', stretch);
function stretch($window){
  function stretchLink(scope, element, attrs){
    var windowElement = angular.element($window),
        w = $window,
        offset = ((attrs.offset) ? attrs.offset : 0),
        previousWindowWidth = 0,  //start with 0 to resize by default the first time
        cssProperty = 'min-height';

    if(attrs.strict){
      cssProperty = 'height';
    }

    function stretchElementsOnResize(){
      /*
       * Only strech if not in portrait mode and width > 767px
       * otherwise set the min width to 50% of the window size
       *
       */
      if(w.innerHeight > w.innerWidth && w.innerHeight > 767){
        //if in portrait mode and the viewport height is more than 767
        element.css(cssProperty, (w.innerHeight * 0.8 - offset) + "px");
      } else {
        //if the window with is < 767, only apply resizing if the width difference is bigger than [an arbitrary] 150px
        if(w.innerWidth <= 767 && Math.abs(previousWindowWidth - w.innerWidth) > 150){
          previousWindowWidth = w.innerWidth;
          element.css(cssProperty, (w.innerHeight * attrs.amount - offset) + "px");
        }
        //if it's strict, resize no matter what window size
        else if(w.innerHeight > 767 || attrs.strict){
          element.css(cssProperty, (w.innerHeight * attrs.amount - offset) + "px");
        }
      }

    }

    windowElement.bind('resize', stretchElementsOnResize);
    stretchElementsOnResize();
  }

  return {
    restrict: 'A',
    link: stretchLink
  };
}