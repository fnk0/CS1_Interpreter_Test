/**
 * Created by marcus on 11/29/16.
 */

(function () {

    var app = angular.module('CS1');

    app.controller('MainController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$httpParamSerializer',
        function ($http, $scope, $window, $filter, $location, $rootScope, $httpParamSerializer) {
            var self = this;

            $scope.cmOption = {
                lineNumbers: true,
                mode: 'text/x-java',
                theme: 'monokai'
            };
            $scope.code = "public class HelloWorld {\n" +
                "\n" +
                "   public static void main(String[] args) {\n" +
                "       \n" +
                "   }\n" +
                "}\n" +
                "";

            $scope.runCode = function() {
                console.log($scope.code);

                var submit = {
                    content: $scope.code
                };

                $http.post($window._base_url + "/submit", submit)
                    .success(function (data) {
                        $scope.output = data.data
                    })
                    .error(function (err) {
                        console.log(err);
                    });

            };
        }]);
})();