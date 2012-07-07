function BoozeCtrl($scope, $routeParams) {
    localStorage.setItem("last_page", "/");
    //console.debug($scope);
    //console.debug($routeParams);
}

function TaxCtrl($scope, $routeParams) {
    localStorage.setItem("last_page", "/tax");
    //console.debug($scope);
    //console.debug($routeParams);
    var $filter = angular.injector(['ng', 'booze']).get('$filter');
    var money = $filter('money');

    $scope.bottles = [
            { name: "330ml", size: .33 },
            { name: "750ml", size: .75 },
            { name: "1L",    size: 1 }
        ];
    $scope.size = .75;
    $scope.price = 0.00;

    $scope.select_price = function() {
        $('#tax-price').get(0).setSelectionRange(0, 9999);
    }
    $scope.format_price = function() {
        // Disabled until fixed: https://github.com/angular/angular.js/issues/1126
        //$scope.price = money($scope.price);
    };
    $scope.sst = function() {
        return money(.205 * $scope.price);
    };
    $scope.slt = function() {
        return money(3.7708 * $scope.size);
    };
    $scope.total = function() {
        return money(parseFloat($scope.price) + parseFloat($scope.sst()) + parseFloat($scope.slt()));
    };
}
