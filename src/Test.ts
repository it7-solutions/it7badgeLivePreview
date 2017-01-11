export class Test {
    constructor(name: string) {
        this.name = name;
    }
    name: string;

    sayHi(): void {
        console.log('HELLO ' + this.name);
    }
}