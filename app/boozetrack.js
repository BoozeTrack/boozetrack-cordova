;(function( window ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
    navigator = window.navigator,
    location = window.location;

    function BTClass() {
        var BT = function(){};
        BT.prototype = {
        device_ready: false,
        onDeviceReady: function() {
            //console.log("onDeviceReady");
            this.device_ready = true;
            this.startApp();
            },
        mobile_init: false,
        onMobileInit: function() {
            //console.log("onMobileInit");
            this.mobile_init = true;
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;
            this.startApp();
            },
        startApp: function() {
            if (!this.device_ready || !this.mobile_init)
                return;
            alert("App Started");
        },
        // Generic success/error handling
        onSuccess: function(data) {
        },
        onError: function(what, message) {
            if (message)
                alert(what + ' failed because: ' + message);
            else
                alert("Unspecified error: " + what);
        },
        // Photos
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
        // Barcode
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

    var BT = window.BT = BTClass();
    $(document).bind('mobileinit', BT.onMobileInit);
    document.addEventListener("deviceready", BT.onDeviceReady, false);

})( window );
