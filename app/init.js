

;(function() {

    /* ******** Detect the device type and load the shared libraries ******** */

    var platform = null;

    var includes = {
        "ios": [
            "lib/ios-cordova-1.8.0.js",
            "lib/ios-barcodescanner.js",
        ],
        "droid": [
            "lib/droid-cordova-1.8.0.js",
        ],
        "global": [
            "lib/jquery.js",
            "lib/jquery.mobile.js",
            // Make sure the app script loads last
            "app/boozetrack.js",
        ],
    }

    var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
        platform = 'ios';
    }
    else if (userAgent.indexOf('Android') > -1) {
        platform = 'droid';
    }
    else {
        alert("Unsupported Mobile Platform");
    }

    function load_includes(list) {
        var sc = document.getElementsByTagName('script')[0];
        for (var l = list.length, i=0; i < l; i++) {
            //alert(list[i]);
            var new_script = document.createElement("script");
            new_script.src = list[i];
            sc.parentNode.insertBefore(new_script, sc.nextSibling);
            //sc = new_script;
        }
    }

    if (platform)
        load_includes(includes[platform]);
    load_includes(includes["global"]);


    //console.log("Platform: "+platform);
    //alert("Platform: "+platform);

})();
