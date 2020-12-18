(function() {
    'use strict';

    angular.module('vitta-challange')
        .controller('dashboardController', dashboardController);

    function dashboardController($scope, $http) {
        getTerritories();
        getErrors();
        getSquares();

        function getTerritories() {
            $http.get('/territories')
                .then(function(results) {
                    var content = results.data.data;
                    var totalAreaTerritory = 0;

                    totalAreaTerritory = content.reduce(function(prev, ac) {
                        prev += ac.area;

                        return prev;
                    }, 0);

                    var mostPaintedArea = content.sort(function(a, b) {
                        return b.painted_area - a.painted_area;
                    });

                    $scope.mostPaintedArea = mostPaintedArea;
                    $scope.totalAreaTerritory = totalAreaTerritory;
                });
        }

        function getErrors() {
            $http.get('/errors')
                .then(function(results) {
                    var content = results.data.data;
                    var listOfLast5Errors = content.sort(function(a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }).splice(0, 5);

                    $scope.listOfLast5Errors = listOfLast5Errors;
                });
        }

        function getSquares() {
            $http.get('/squares')
                .then(function(results) {
                    var content = results.data.data;
                    $scope.paintedAreaTotal = content.length;

                    var squares = content.sort(function(a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }).splice(0, 5);

                    $scope.listOfLastSquares = squares;
                });
        }
    }
})();