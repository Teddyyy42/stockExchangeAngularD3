//Factory
angular.module('stock').factory('Data', function($resource) {
    var endpoint = 'http://localhost:8000/?count=';
    var count = 20;
    return $resource(endpoint + count);
});
