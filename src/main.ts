console.log("Hello World");
console.log("Hello TS 5.0");
console.log("It is updating in live");


const num: number = 42;

var fullName: string = 'John Doe';
let email: string = "johndoe@example.com";
const userId: number = 1234;

function createLogMessage(userId: number, action: string): string { // це називається сигнатура функції
    return `User ${userId} - action: ${action}`;
}

createLogMessage(userId, 'warning');


class WebService {
    static protocol: string = 'https';

    host: string;
    _status: 'online' | 'offline' = 'online';

    [key: string]: any;

    get status(): 'online' | 'offline' {
        return this._status;
    }

    set status(val: 'online' | 'offline') { // сеттер -- нічого не повертає
        this._status = val;
    }

    constructor(host: string) {
        this.host = host;
    }

    static checkConnection(host: string): void {
        console.info(`Connection status: ${host}`);
    }

    connect(): boolean {
        return true;
    }
}

new WebService('').test = '';


// *** ПРИМІТИВИ *** 

let decimal: number = 42;
let hex: number = 0x2A;
let binary: number = 0b0;
let exponential: number = 1e8;
let notANumber: number = NaN;
let infinity: number = Infinity;
let infNegative: number = -Infinity;

let lng: string = 'TypeScript';
let recs: string = "good code";
let message: string = `We love ${lng}` // інтраполяція

let isComplete: boolean = true;
let hasError: boolean = false;

let keyA: symbol = Symbol('id'); // абсолютно новий, унікальний ідентифікатор
let s1 = Symbol('id');
let s2 = Symbol('id');
console.log(s1 === s2); // false

let key: symbol = Symbol.for('id'); // Цей метод використовує Глобальний реєстр символів. Замість того, щоб щоразу створювати новий символ, він спочатку перевіряє: "Чи є вже в реєстрі символ із ключем 'id'?"
let s3 = Symbol.for('id');
let s4 = Symbol.for('id');
console.log(s1 === s2); // true

let lgNumber: bigint = 12343513534513415313n;
let oneMoreLgNumber: bigint = BigInt(12343513534513415313);
Number.MAX_SAFE_INTEGER;


// що з чим сумісне? -- undefined тільки з собою i any
class TypeSystem {
    static number: number = undefined;
    static string: string = undefined;
    static boolean: boolean = undefined;
    static symbol: symbol = undefined;
    static bigint: bigint = undefined;
    static null: null = undefined;
    static undefined: undefined = undefined;
    static any: any = undefined;
    static void: void = fn();
}

TypeSystem.undefined = TypeSystem.null;
TypeSystem.undefined = TypeSystem.any;
TypeSystem.undefined = TypeSystem.undefined;

// що з чим сумісне? -- null тільки з собою і any
class TypeSystemNull {
    static number: number = null;
    static string: string = null;
    static boolean: boolean = null;
    static symbol: symbol = null;
    static bigint: bigint = null;
    static null: null = null;
    static undefined: undefined = null;
    static any: any = null;
}

TypeSystemNull.null = TypeSystem.null;
TypeSystemNull.null = TypeSystem.any;
TypeSystemNull.null = TypeSystem.undefined;


// з any можна робити будь-що
let value: any = 42;
value = 'hello';
value = { foo: 'bar' };
value.toUpperCase();
value.toUperCase();
value();
value.prop.access;

function processUser(user: any) {
    console.info(`Username: ${user.name}`);
}

processUser({ name: 'John', age: 42 });
processUser('Kohn');


// unknown -- можемо присвоїти будь-що, але вже не можемо робити будь-які операції
let value2: unknown = 42;
value2 = 'hello';
value2 = { foo: 'bar' };

// можна робити будь-що, як що є перевірка
if (typeof value2 === 'function') {
    value();
}

if (typeof value2 === 'object' && value !== null && 'prop' in value2) {
    value.prop.access;
}

// логічні операції можна робити з unknown
let wellKnownValue: number = 42;
let unknownValue: unknown = 42;

let equals = wellKnownValue == unknownValue;
let strictEquals = wellKnownValue == unknownValue;
let unEqual = wellKnownValue != unknownValue
let strictUnEqual = wellKnownValue !== unknownValue;

let and = wellKnownValue && unknownValue;
let or = wellKnownValue || unknownValue;
let not = !unknownValue;

// це вже неможливо, буде помилка
// let less = wellKnownValue < unknownValue;
// let minus = wellKnownValue - unknownValue;
// let increment = unknownValue++;

// function fn(): void {
//     return 'undefined';
// };

// розкоментуй мене: void не сумісне ні з чим, окрім any
// class TypeSystem3 {
//     static number: number = fn();
//     static string: string = fn();
//     static boolean: boolean = fn();
//     static symbol: symbol = fn();
//     static bigint: bigint = fn();
//     static null: null = fn();
//     static undefined: undefined = fn();
//     static any: any = fn();
//     static void: void = fn();
// }

// тип never можна використати у функції тільки коли вона не закінчується через помилку або якщо вона нескінченна
function fn(): never {
    throw new Error;
}

