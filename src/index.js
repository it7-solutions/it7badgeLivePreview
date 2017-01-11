/// <reference path="../types.d.ts" />
var $ = require('jquery');
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
function greeter(person) {
    return "hallo " + person.name;
}
var person = new Person("bert");
$(document).ready(function () {
    var message = greeter(person);
    $("#status")[0].innerHTML = message;
});
