/**
 * PhoneGap/Cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2010, IBM Corporation
 */

;(function(){

//-------------------------------------------------------------------
var BarcodeScanner = function() {
}

//-------------------------------------------------------------------
BarcodeScanner.Encode = {
        TEXT_TYPE:     "TEXT_TYPE",
        EMAIL_TYPE:    "EMAIL_TYPE",
        PHONE_TYPE:    "PHONE_TYPE",
        SMS_TYPE:      "SMS_TYPE",
        CONTACT_TYPE:  "CONTACT_TYPE",
        LOCATION_TYPE: "LOCATION_TYPE"
}

//-------------------------------------------------------------------

BarcodeScanner.prototype.isBarcodeScannerAvailable = function(response){
    Cordova.exec(response, null, "BarcodeScannerPlugin", "isBarcodeScannerAvailable", []);
};

BarcodeScanner.prototype.isBarcodeScannerSetup = function(response){
    Cordova.exec(response, null, "BarcodeScannerPlugin", "isBarcodeScannerSetup", []);
};

//-------------------------------------------------------------------

BarcodeScanner.prototype.scan = function(success, fail, options) {
    function successWrapper(result) {
        result.cancelled = (result.cancelled == 1)
        success.call(null, result)
    }

    if (!fail) { fail = function() {}}

    if (typeof fail != "function")  {
        console.log("BarcodeScanner.scan failure: failure parameter not a function")
        return
    }

    if (typeof success != "function") {
        fail("success callback parameter must be a function")
        return
    }

    if ( null == options )
        options = []

    return Cordova.exec(successWrapper, fail, "com.cordova.barcodeScanner", "scan", options)
}

//-------------------------------------------------------------------

BarcodeScanner.prototype.encode = function(type, data, success, fail, options) {
    if (!fail) { fail = function() {}}

    if (typeof fail != "function")  {
        console.log("BarcodeScanner.scan failure: failure parameter not a function")
        return
    }

    if (typeof success != "function") {
        fail("success callback parameter must be a function")
        return
    }

    return Cordova.exec(success, fail, "com.cordova.barcodeScanner", "encode", [{type: type, data: data, options: options}])
}

//-------------------------------------------------------------------
Cordova.addConstructor(function() {
    if (!window.plugins) window.plugins = {}

    if (!window.plugins.barcodeScanner) {
        window.plugins.barcodeScanner = new BarcodeScanner()
    }
    else {
        console.log("Not installing barcodeScanner: window.plugins.barcodeScanner already exists")
    }
})

})();
