// ооп -- парадигма, яка існує щоб структурувати код, підхід до написання коду
// програма це сукупність об‘єктів, які взаємодіють між собою

import { error } from "console";

/*
    інкапсуляція -- опис і приховання певної логіки, щоб не було можливості для змін.
    поліморфізм -- це здатність різних об'єктів виконувати ту саму дію по-своєму
    наслідування -- перевикористовуємо вже існуючу логіку
    абстракція
*/


class Product {
    private _stock: number = 0; // робить певну властивість або метод «невидимими» для всіх, хто знаходиться за межами цього класу
    private _price!: number; // Цю змінну можна використовувати лише всередині фігурних дужок { ... } цього класу
    public readonly sku: string; // буде доступно будь-де
    protected name: string; // є доступ у цьому класі і У класах-спадкоємцях (extends): Ви можете звертатися до цього поля, наче воно ваше власне. зовні ні

    constructor(name: string, price: number) {
        this.name = name;
        this.sku = 'SKU-1234';
        this.price = price;
    }

    public get price(): number {
        return this._price;
    }

    public set price(newPrice: number) {
        if (newPrice < 0) throw new Error('Price cannot be negattive');
        this._price = newPrice;
    }

    public get isInStock(): boolean {
        return this._stock > 0;
    }

    public getDescription(): string {
        return `${this.name} - Price: ${this.price}`;
    }
}

// успадкування
class Book extends Product {
    public readonly author: string;

    constructor(name: string, price: number, author: string) {
        super(name, price);
        this.author = author;
    }

    public override getDescription(): string {
        return `${super.getDescription()}, Author: ${this.author}`;
    }
}

type Size = 'S' | 'M' | 'L' | 'XL';

class Clothing extends Product {
    public readonly size: Size;

    constructor(name: string, price: number, size: Size) {
        super(name, price);
        this.size = size;
    }

    public override getDescription(): string {
        return `${super.getDescription()}, Size: ${this.size}`;
        
    }
}

// поліморфізм -- нижче об‘єкти виконують одну дію, але кожен об‘єкт робить її по своєму
const catalog: Product[] = [
    new Product('Laptop', 1500),
    new Book('The Hobbit', 25, 'J.R.R. Tolien'),
    new Clothing('T-Shirt', 40, 'M')
];

function printCatalogDescriptions(products: Product[]): void {
    products.forEach(product => {
        console.log(product.getDescription());
    })
}

printCatalogDescriptions(catalog);


interface ApiUser {
    id: number;
    name: string;
}

interface ApiProduct {
    sku: string;
    name: string;
    price: number;
}

class ApiService {
    public async fetchData<T>(endpoint: string): Promise<T> {
        if (endpoint === '/users') {
            return [] as T;
        }
        if (endpoint === '/products') {
            return [] as T;
        }
        throw new Error('Invalid endpoint');
    }
}

async function demonstrateGenerics() {
    const api = new ApiService();
    const users = await api.fetchData<ApiUser[]>('/users');
    const products = await api.fetchData<ApiProduct[]>('/products');
}

// this може використовуватися як тип, що повертається -- щоб була можливість чейн-виклику
class ProductQueryBuilder {
    protected query: { [key: string]: unknown } = {};

    public setMinPrice(price: number): this {
        this.query['minPrice'] = price;
        return this;
    }

    public setCategory(category: string): this {
        this.query['category'] = category;
        return this;
    }
}

const query = new ProductQueryBuilder()
    .setCategory('Fantasy')
    .setMinPrice(100);


// абстракція
interface Stockable {
    readonly sku: string;
    name: string;
    price: number;
}

interface Shippable {
    shippingWeight: number;
    calculateShippingWeight(distanceInKm: number): number;
}

abstract class BaseProduct implements Stockable {
    public readonly sku: string;
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.sku = 'SKU-1234';
        this.name = name;
        this.price = price;
    }

    public abstract getProductType(): string; // абстрактний метод
}

class DigitalProduct extends BaseProduct implements Shippable {
    public type: string;
    public shippingWeight: number;

    constructor(name: string, price: number, type: string, shippingWeight: number) {
        super(name, price);
        this.type = type;
        this.shippingWeight = shippingWeight;
    }

    public getProductType(): string {
        return this.type;
    }

    calculateShippingWeight(distanceInKm: number): number {
        return 1000;
    }
}

class ShippingCalc {
    private constructor() {};

    public static calculate(weight: number, distance: number): number {
        return weight + 0.5 + distance * 0.1;
    }
}
// це потрібно для того, якщо нам потрібен клас тільки зі статичними функціями. як от Math
// new Math;
// Math.LN10;

// також конструктор може мати protected -- саме цього класу не можемо створити екземпляр, але можемо створювати його спадкоємців. 
// це часто використовується з абстрактними класами





interface IProduct {
    price: number;
    name: string;
}

class ShoppingCart {
    public userId: string;
    public items: Product[];

    constructor(userId: string, items: Product[]) {
        this.userId = userId;
        this.items = items;
    }
}

interface PersistentCart extends ShoppingCart {
    save(): void
}

// клас можна використовувати, щоб розширити інтерфейс
// це можливо, якщо у класі НЕМАЄ private і protected власивостей

// class SuperCart implements ShoppingCart {

// }