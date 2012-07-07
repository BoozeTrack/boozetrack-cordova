function taxCalc(price) {
    var self = this;
    self.price = ko.observable(price);
}


// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function boozeVM() {
    var self = this;

    this.price = ko.observable("0");


    /*
    this.firstName = ko.observable("Berttest");
    this.lastName = ko.observable("Bertington");
this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
}, this);
    this.capitalizeLastName = function() {
        var currentVal = this.lastName();        // Read the current value
        this.lastName(currentVal.toUpperCase()); // Write back a modified value
    };
    */
}

// Activates knockout.js
ko.applyBindings(new boozeVM());
