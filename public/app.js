/**
 * Created by marcus on 11/27/16.
 */

'use strict';
/* global app: true */

(function () {

    var app = angular.module('CS1', [
        'ngRoute',
        'ui.materialize',
        'ui.codemirror'
    ]);

    window._base_url = "http://localhost:3000/api";

    app.config(function ($httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'MainController',
                controllerAs: 'ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
})();