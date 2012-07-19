function BoozeCtrl($scope, $routeParams) {
    localStorage.setItem("last_page", "/");
    //console.debug($scope);
    //console.debug($routeParams);
}

function TaxCtrl($scope, $filter, $routeParams) {
    localStorage.setItem("last_page", "/tax");

    //console.debug($scope);
    //console.debug($filter);
    //console.debug($routeParams);
    var money = $filter('money');

    $scope.bottles = [
            { name: "330ml", size: '.33' },
            { name: "750ml", size: '.75' },
            { name: "1L",    size: '1' },
            { name: "1.5L",  size: '1.5' },
            { name: "1.75L", size: '1.75' },
            { name: "2L",    size: '2' },
        ];

    // Scope variables

    var last_size = localStorage.getItem("last_size");
    if (isNaN(parseFloat(last_size)) || parseFloat(last_size) == 0 ) {
        last_size = '.75';
    }
    $scope.size = last_size;
    //console.debug('last_size: ' + $scope.size);

    var last_price = parseFloat(localStorage.getItem("last_price"));
    if (isNaN(last_price)) {
        last_price = 0;
    }
    $scope.price = last_price; // see bug below for why we can't make this pretty
    //console.debug('last price: ' + $scope.price);

    // Scope methods

    $scope.save_state = function() {
        localStorage.setItem("last_size", $scope.size);
        localStorage.setItem("last_price", $scope.price);
        console.log('save state');
    };
    $scope.select_price = function() {
        $('#tax-price').get(0).setSelectionRange(0, 9999);
    };
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
