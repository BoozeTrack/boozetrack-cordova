'use strict';

/* Filters */

angular.module('boozeFilters', [])
    .filter('money', function() {
        return function(input) {
            var price = parseFloat(input);
            if (isNaN(price) || price == 0)
                return '0.00';
            return price.toFixed(2);
        };
    })
    ;
