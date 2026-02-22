class IProduct {
    id!: number;
    name!: string
}

class CarItem {
    id!: number;
    name!: string;
    quantity: number = 1;
}

const product = new IProduct();
const cartItem = new CarItem();

// більш широкий продукт буде сумісний з менш широким
const product2: IProduct = cartItem;
// const itemInCart: CarItem = product; ерор


// *************************************************

interface IBook {
    id: number;
    name: string;
    price: number;
    author: string;
}

const cthulhu = {
    id: 1,
    name: 'Cthulhu',
    price: 1500,
    author: 'Lovecraft',
    year: 1928
}

const book: IBook = cthulhu;

const type = typeof cthulhu;


// *************************************************

// ВАРІАТИВНІСТЬ
// можливість використовувати більш конкретний тип там, де використовується більш загальний

class Product {
    id: string;
    name: string;
    price: number;

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getLabel(): string {
        return `${this.name} - ${this.price}`;
    }
}

class Book extends Product {
    weight: number;

    constructor(id: string, name: string, price: number, weight: number) {
        super(id, name, price);
        this.weight = weight;
    }

    ship(): void {
        console.log(`Shipping book weighing ${this.weight}g...`);
    }
}

class EBook extends Product {
    fileSize: number;

    constructor(id: string, name: string, price: number, fileSize: number) {
        super(id, name, price);
        this.fileSize = fileSize;
    }

    download() {
        console.log(`Donwloading e-book of ${this.fileSize}MB...`);
    }
}



// ко-варіативність

function renderProductGrid(products: Product[]): void {
    products.forEach((x) => console.log(`Displaying item ${x.getLabel()}`));
}

const ebooks: EBook[] = [
    new EBook('e-dune', 'Dune', 15, 5),
    new EBook('e-neuro', 'Neuromancer', 12, 3)
]

renderProductGrid(ebooks);

const digitalCart: EBook[] = [new EBook('e-hobbit', 'The Hobbit', 10, 4)];

const productCart: Product[] = digitalCart; // (!) тут масив е-книг приводиться до Product. і тут існує тільки 1 масив, бо вони обидва залінковані на одну комірку пам‘яті

productCart.push(new Book('p-dune', 'Done (Hardcover)', 15, 800)); // тут ми до е-книг запушили просто книгу

function processDigitalDownloads(cart: EBook[]): void {
    cart.forEach(item => item.download());
}

processDigitalDownloads(digitalCart); // (!) а тут в рантаймі буде ерор, хоча по типізації усе ок на зараз



// контр-варіативність

type ProductPredicate = (product: Product) => boolean;
type EBookPredicate = (ebook: EBook) => boolean;

const isExpensive: ProductPredicate = (product) => {
    return product.price > 20;
}

const isLargeFile: EBookPredicate = (ebook) => {
    return ebook.fileSize > 10;
}


let ebookFilter: EBookPredicate;
ebookFilter = isExpensive;

// let productFilter: ProductPredicate = isLargeFile;



// ін-варіативність



// бі-варіантивність