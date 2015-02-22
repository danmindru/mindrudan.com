/**
  * Override Angular's built in exception handler, and tell it to
  * use our new exceptionLoggingService which is defined below
  *
  */
angular.module('abs.commonLoggly').provider("$exceptionHandler", {
  $get: function(exceptionLoggingService){
          return(exceptionLoggingService);
        }
});