/*
 * Angular directive to make html5 inputs with type="date" work.
 * Without this it's not possible to use Date objects as models
 * on inputs.  The native control value is always a string.
 */

angular.module("input-date").directive("input", function($filter) {
  return {
    restrict: 'E',
    require: "?ngModel",
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel || attrs["type"].toLowerCase() !== "date") {
        return;
      }
      var date_formatter = function(value) {
        return $filter("date")(value, "yyyy-MM-dd")
      }
      
      ngModel.$formatters.unshift(date_formatter)
      ngModel.$parsers.unshift(Date)
    }
  }
})
