
// http://stackoverflow.com/questions/9373982/knockout-and-jquery-mobile-binding-data-to-select-lists
ko.bindingHandlers.jqmValue = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof ko.bindingHandlers.value.init !== 'undefined') {
            ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel);
        }
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof ko.bindingHandlers.value.update !== 'undefined') {
            ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, viewModel);
        }

        var instance = $.data(element, 'selectmenu');
        if (instance) {
            $(element).selectmenu('refresh', true);
        }
    }
};


;(function( window ) {

    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document,
    navigator = window.navigator,
    location = window.location;

    function BTClass() {
        var BT = function(){};
        BT.prototype = {
            /*
             * Initialization
             */
            device_ready: false,
            onDeviceReady: function() {
                var self = this;
                //console.log("onDeviceReady");
                self.device_ready = true;
                self.startApp();
                },
            mobile_init: false,
            onMobileInit: function() {
                var self = this;
                //console.log("onMobileInit");
                self.mobile_init = true;
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                self.startApp();
                },
            document_ready: false,
            onDocumentReady: function() {
                var self = this;
                //console.log("onMobileInit");
                self.mobile_init = true;
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                self.startApp();
                },
            startApp: function() {
                var self = this;
                if (!self.document_ready || !(self.device_ready && self.mobile_init))
                    return;
                //alert("App Started");
                console.log("App Started");
                ko.applyBindings(new boozeVM());
            },
            /*
             * Generic success/error handling
             */
            onSuccess: function(data) {
            },
            onError: function(what, message) {
                if (message)
                    alert(what + ' failed because: ' + message);
                else
                    alert("Unspecified error: " + what);
            },
            /*
             * Photos
             */
            onPhotoSuccess: function(data) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + data;
            },
            onPhotoFail: function(message) {
                onError('photo', message);
            },
            takePhoto: function() {
                //alert("takePhoto");
                navigator.camera.getPicture(this.onPhotoSuccess, this.onPhotoFail,
                    { quality: 50, destinationType: Camera.DestinationType.DATA_URL}
                    );
            },
            /*
             * Barcode
             */
            onBarcodeSuccess: function(result) {
                if (result.cancelled)
                    alert("the user canceled the scan");
                else
                    document.getElementById('stuff').innerHTML = result.text;
                    //alert("we got a barcode\n" + result.text);
            },
            onBarcodeFail: function(message) {
              this.onError('scanBarcode');
            },
            scanBarcode: function() {
                //alert("scanBarcode");
                window.plugins.barcodeScanner.scan(
                    this.onBarcodeSuccess,
                    this.onBarcodeFail
                );
            },
        };
        return new BT();
    };


    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function boozeVM() {
        var self = this;

        self.price = ko.observable( 0.00 );

        self.bottleSizes = [
            { name: "330ml", size: .33 },
            { name: "750ml", size: .75 },
            { name: "1L",    size: 1 },
        ]

        self.size = ko.observable(self.bottleSizes[1]);
        //setTimeout(function() {$("#tax-size").selectmenu('refresh');}, 1000);

        self.sst = ko.computed(function() {
            var price = parseFloat(self.price());
            if (isNaN(price) || price == 0)
                return '0.00';
            return (price * .205).toFixed(2);
        });

        self.slt = ko.computed(function() {
            return (3.7708 * self.size().size).toFixed(2);
        });

        self.total = ko.computed(function() {
            var price = parseFloat(self.price());
            if (isNaN(price))
                price = 0.00;
            return (parseFloat(self.sst()) + parseFloat(self.slt()) + parseFloat(price)).toFixed(2);
        });

        self.formatPrice = function() {
            var price = parseFloat(self.price()).toFixed(2);
            //self.price(price);
            if (isNaN(price))
                price = 0.00;
            self.price(price);
        };

        self.selectPrice = function() {
            $('#tax-price').get(0).setSelectionRange(0, 9999);

        }

    }

    //var BT = window.BT = BTClass();
    //$(document).bind('mobileinit', BT.onMobileInit);
    //$(document).bind("deviceready", BT.onDeviceReady);

    $(document).bind('mobileinit',function(){
        $.mobile.selectmenu.prototype.options.nativeMenu = false;
        //$.support.cors = true;
        //$.mobile.allowCrossDomainPages = true;
    });

    $(document).ready(function() { ko.applyBindings(new boozeVM()) });

})( window );
