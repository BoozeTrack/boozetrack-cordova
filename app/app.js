'use strict';

/* Cordova init stuff */

;(function( window ) {

    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document,
    navigator = window.navigator,
    location = window.location;

    angular.element(document).bind('mobileinit',function(){
        $.mobile.selectmenu.prototype.options.nativeMenu = false;
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    });

})( window );

/* App Module */

angular.module('booze', ['ui', 'boozeFilters', 'boozeServices']).
  config(['$routeProvider', function($routeProvider) {
    // Saved page?
    var last_page = localStorage.getItem("last_page");
    if (!last_page) {
        last_page = '/';
    }
    // Make sure things get updated
    //console.debug($routeProvider);
    //$routeProvider.onChange(function() {
    //    console.debug($routeProvider);
    //});
    // Routing
    $routeProvider.
        when('/',    {templateUrl: 'partials/home.html', controller: BoozeCtrl}).
        when('/tax', {templateUrl: 'partials/tax.html',  controller: TaxCtrl}).
        //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
        otherwise({redirectTo: last_page});
}]);
