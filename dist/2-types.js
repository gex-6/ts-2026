const num = 42;
var fullName = 'John Doe';
let email = "johndoe@example.com";
const userId = 1234;
function createLogMessage(userId, action) {
    return `User ${userId} - action: ${action}`;
}
createLogMessage(userId, 'warning');
class WebService {
    static protocol = 'https';
    host;
    _status = 'online';
    get status() {
        return this._status;
    }
    set status(val) {
        this._status = val;
    }
    constructor(host) {
        this.host = host;
    }
    static checkConnection(host) {
        console.info(`Connection status: ${host}`);
    }
    connect() {
        return true;
    }
}
new WebService('').test = '';
// *** ПРИМІТИВИ *** 
let decimal = 42;
let hex = 0x2A;
let binary = 0b0;
let exponential = 1e8;
let notANumber = NaN;
let infinity = Infinity;
let infNegative = -Infinity;
let lng = 'TypeScript';
let recs = "good code";
let message = `We love ${lng}`; // інтраполяція
let isComplete = true;
let hasError = false;
let keyA = Symbol('id'); // абсолютно новий, унікальний ідентифікатор
let s1 = Symbol('id');
let s2 = Symbol('id');
console.log(s1 === s2); // false
let key = Symbol.for('id'); // Цей метод використовує Глобальний реєстр символів. Замість того, щоб щоразу створювати новий символ, він спочатку перевіряє: "Чи є вже в реєстрі символ із ключем 'id'?"
let s3 = Symbol.for('id');
let s4 = Symbol.for('id');
console.log(s1 === s2); // true
let lgNumber = 12343513534513415313n;
let oneMoreLgNumber = BigInt(12343513534513415313);
Number.MAX_SAFE_INTEGER;
// що з чим сумісне? -- undefined тільки з собою i any
class TypeSystem {
    static number = undefined;
    static string = undefined;
    static boolean = undefined;
    static symbol = undefined;
    static bigint = undefined;
    static null = undefined;
    static undefined = undefined;
    static any = undefined;
    static void = fn();
}
TypeSystem.undefined = TypeSystem.null;
TypeSystem.undefined = TypeSystem.any;
TypeSystem.undefined = TypeSystem.undefined;
// що з чим сумісне? -- null тільки з собою і any
class TypeSystemNull {
    static number = null;
    static string = null;
    static boolean = null;
    static symbol = null;
    static bigint = null;
    static null = null;
    static undefined = null;
    static any = null;
}
TypeSystemNull.null = TypeSystem.null;
TypeSystemNull.null = TypeSystem.any;
TypeSystemNull.null = TypeSystem.undefined;
// з any можна робити будь-що
let value = 42;
value = 'hello';
value = { foo: 'bar' };
value.toUpperCase();
value.toUperCase();
value();
value.prop.access;
function processUser(user) {
    console.info(`Username: ${user.name}`);
}
processUser({ name: 'John', age: 42 });
processUser('Kohn');
// unknown -- можемо присвоїти будь-що, але вже не можемо робити будь-які операції
let value2 = 42;
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
let wellKnownValue = 42;
let unknownValue = 42;
let equals = wellKnownValue == unknownValue;
let strictEquals = wellKnownValue == unknownValue;
let unEqual = wellKnownValue != unknownValue;
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
function fn() {
    throw new Error;
}
export {};
