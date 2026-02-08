
type User = {
    name: string,
    email: string
}

async function fetchUser(): Promise<User> {
    const response = await fetch('https://api.example.com/user/1');
    return response.json();
}

(async () => {
    const user: User = await fetchUser();
    console.log(`Fetched user: ${user.email}`);
})();





type UserProfile = {
    readonly id: string; // проперті з доступом тільки до читання
    firstName: string;
    lastName: string;
    middleName?: string; // опційна проперті
}

let profileA: UserProfile = {
    id: 'user-xyz-123',
    firstName: 'John',
    lastName: 'Wick',
    middleName: 'Senior'
}

let profileB: UserProfile = {
    id: 'user-xyz-123',
    firstName: 'John',
    lastName: 'Wick'
}

profileA.firstName = 'Jane';
profileB.middleName
// profileA.id = '32'; // error





// let names: string[] = ['Alice', 'Bob', 'Charlie'];
let names: Array<string> = ['Alice', 'Bob', 'Charlie']; // можна і так, і так оголошувати

let namesAndIds: Array<string | number> = [1, 'Alice', 42, 'Bob'];
let idsAndNames: (string | number)[] = [1, 'Alice', 42, 'Bob'];
// let fakeIdsAndNumbers: string[] | number[] = [1, 'Alice', 42, 'Bob']; // так не буде працювати





type UserNew = {
    type: 'user';
    name: string;
    email: string;
}

type Product = {
    type: 'product';
    name: string;
    price: number;
}

let data: (UserNew | Product)[] = [
    { type: 'user', name: 'John', email: 'test@test.com'},
    { type: 'product', name: 'Laptop', price: 1000}
]

for (const el of data) {
    console.log(`User name: ${el.name}`);
    console.log(`Type: ${el.type}`);

    if (el.type === 'product') { // ми точно не знаємо, є такі проперті чи ні. тому не можемо до них звернутися без додаткової перевірки
        console.log(`Product price: ${el.price}`);
    } else {
        console.log(`User email: ${el.email}`);
    }
}

let primitives: (string | number)[] = [1, 2, 'string1', 'string2'];

for (const el of primitives) {
    el.toString();

    if (typeof el === 'string') {
        el.includes('Hello'); // це метод тільки стрінгів, тому потрібна перевірка
    }
}





// Tuple (кортеж)

let keyValuePair: [number, string] = [1, 'John']; // тут очікуємо саме 2 значення визначених типів
keyValuePair = [2, 'Jane'];
// keyValuePair = [3, 43]; // error
// keyValuePair = [4]; // error
keyValuePair.length;

type logEntry = [Date, string, ...unknown[]]; // більше ніж 2 елементи, але точно не менше. додаємо гнучкості таплам (кортежам)
let a: logEntry = [new Date(), 'USER_LOGIN'];
let b: logEntry = [new Date(), 'FILE_UPLOAD', 'file.pds', 42];

type FilePath = [string, ...string[], number, string];
let c: FilePath = ['C', 'Users', 'Admin', 42, 'document.txt'];
let d: FilePath = ['C', 42, 'document.txt'];

c.length;

type logEntryWithTips = [timestamp: Date, event: string, ...details: unknown[]]; // тут це суто підказки, звернутися до них неможливо

type logEntryOptional = [timestamp: Date, event?: string]
let entry: logEntryOptional = [new Date()];

type ReadOnlyEntry = ReadonlyArray<string>; // не можна змінювати





// INTERFACES

interface IProduct {
    readonly id: string;
    name: string;
    description: string;
    price: number;
    inStock: boolean;
    imageUrl?: string; // опційне значення
    getDiscountPrice?(discount: number): number; // тільки оголошення, абстракція, немає реалізації. 
}

interface IDigitalProduct extends IProduct {
    downloadUrl: string;
    fileSizeMb: number;
}

interface IBookProduct extends IProduct {
    size: number;
    cover: string;
}

const book: IProduct = {
    id: 'book-123',
    name: 'TypeScript Deep Dive',
    description: 'A great book about TypeScript',
    price: 39.99,
    inStock: true,
    imageUrl: 'link.com',

    getDiscountPrice(discount) {
        return this.price - discount;
    },
}

const price = book.getDiscountPrice(25);

const ebook: IDigitalProduct = {
    id: 'ebook-1234',
    name: 'Learn TS',
    description: 'realy cool book',
    price: 24.99,
    downloadUrl: 'url',
    fileSizeMb: 123,
    inStock: true
}




// зворотня сумісність з type

interface Notifier {
    send(message: string): void;
}

class EmailNotifier implements Notifier {
    send(message: string) {
        console.log(`Sending email with message ${message}`);
    }
}

class SmsNotifier implements Notifier {
    send(message: string) {
        console.log(`Sending SMS with message ${message}`);
    }
}

new EmailNotifier().send('Hello');
new SmsNotifier().send('MMS');

// це як контракт, що щось обов‘язково використати -- метод має бути, але реалізацію визначаємо при ініціалізації




interface CartItem {
    product: Product;
    quantity: number;
}

interface ShoppingCart {
    items: CartItem[];
    get totalPrice(): number;
    set couponCode(code: string);
}

class Cart implements ShoppingCart {
    private appliedCoupon: string | null = null;
    items: CartItem[] = [];

    get totalPrice(): number {
        let total = this.items.reduce(
            (acc, { product, quantity }) => acc + product.price * quantity,
            0
        );
        if (this.appliedCoupon === 'SALE10') {
            total *= 0.9;
        }
        return total;
    }

    set couponCode(code: string) {
        if (code.length > 0) {
            this.appliedCoupon = code;
        }
    }
}


// анотація функції за допомогою інтерфейсу

interface ProductFilter {
    (product: IProduct): boolean;
}

const inStockFilter: ProductFilter = (product) => product.inStock;



// клас можуть унаслідувати тільки 1 клас, тоді як інтерфейс може мати множинне унаслідування

interface Identifiable {
    id: string;
}

interface Timestampable {
    createdAt: Date;
    updatedAt: Date;
}

interface Auditable extends Identifiable, Timestampable {
    updatedBy: string;
}

const logEntry: Auditable = {
    id: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
    updatedBy: 'John',
}

// злиття інтерфейсів

interface IUser {
    readonly id: number;
    username: string
}

interface IUser {
    sessionToken: string;
}

const loggedInUser: IUser = {
    id: 101,
    username: 'e-shopper',
    sessionToken: 'bearer'
}


// interface Array<T> {
//     toSorted(x: any): void;
// }

// Array.prototype.toSorted = function() {};

// const z: Array<string> = [];
// z.toSorted(x => undefined);

/*

type Alias чи інтерфейс?

* інтерфейс можна розширити за допомогою злиття оголошень неявним чином
* реалізація за допомогою implements

порада: завжди використовувати інтерфейс до тих пір, поки не потрібен буде type

*/

type CustomerInfo = {
    name: string;
    email: string;
}

type OrderDetails = {
    orderId: string;
    products: Product[];
}

type CustomerOrder = string & number;
