/**
  * Exception Logging Service, currently only used by the $exceptionHandler
  * it preserves the default behaviour (logging to the console) but
  * also posts the error server side after generating a stacktrace.
  *
  */
angular.module('abs.commonLoggly').factory("exceptionLoggingService", exceptionLoggingService);

exceptionLoggingService.$inject = ["$log", "$window", "traceService", 'LOGGLY_KEY'];
function exceptionLoggingService ($log, $window, traceService, LOGGLY_KEY){
  _LTracker.push({'logglyKey': LOGGLY_KEY});

  function error(exception, cause){
    // preserve the default behaviour which will log the error
    // to the console, and allow the application to continue running.
    $log.error.apply($log, arguments);

    // now try to log the error to the server side.
    try{
      var errorMessage = exception.toString();

      // use our traceService to generate a stack trace
      var stackTrace = traceService.print({e: exception});

      var fullStack = {
        'userAgent': $window.navigator.userAgent,
        'url': $window.location.href,
        'message': errorMessage,
        'stackTrace': stackTrace,
        'cause': ( cause || "")
      };

      $log.warn("Loggly notified of exception");
      _LTracker.push(fullStack);

    } catch (loggingError){
      $log.warn("Error: logging failed");
    }
  }

  return error;
}