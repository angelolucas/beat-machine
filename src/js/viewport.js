/**
* Viewport
* handy module to track viewport events and properties
*/
var Viewport = ( function() {

  var settings = {
    width: 0,
    height: 0,
    documentHeight: 0,
    visibility: true
  };

  var init = function() {
    //Debug.log( 'Viewport.init()' );

    settings.element = $( window );

    onResizeFinish();

    pageVisibility();
  }

  var bindEventHandlers = function() {
    $( document )
    .on( 'viewport/resize/finish', function() {
      onResizeFinish();
    } )
  }

  var onResizeFinish = function() {
    //Debug.log( 'viewport.onResizeFinish()' );

    settings.width = settings.element.width();
    settings.height = settings.element.height();
    settings.documentHeight = $( 'html' ).outerHeight();

  }

  var pageVisibility = function() {
    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;

    if ( typeof document.hidden !== "undefined" ) { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if ( typeof document.msHidden !== "undefined" ) {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if ( typeof document.webkitHidden !== "undefined" ) {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
      if ( document[hidden] ) {

        $( document ).trigger( 'viewport/visibility', [{
          visibility : false
        }] );

        settings.visibility = false;

      } else {

        $( document ).trigger( 'viewport/visibility', [{
          visibility : true
        }] );

        settings.visibility = true;

      }
    }

    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }

  var getWidth = function() {
    return settings.width;
  }

  var getHeight = function() {
    return settings.height;
  }

  return {
    init:       function() { init(); },
    getWidth:   function() { return getWidth() },
    getHeight:  function() { return getHeight() }
  }

} )();

$( document ).ready( function() {
  Viewport.init();
} );
