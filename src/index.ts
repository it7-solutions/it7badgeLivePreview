/// <reference path="../types.d.ts" />
import {Test} from './Test';

export class Person {

  constructor(name:string) {
    this.name=name;
  }
  name: string;

  greet():void {
    console.log('greetings');
  }

}

function greeter (person:Person){
  return "Hello " + person.name;
}

var person = new Person("Vladimir");

$(document).ready(function () {
  console.log('ready');
  var message = greeter(person);
  $("#status").html(message);

  var hi = new Test('There');
  hi.sayHi();
});


person.greet();