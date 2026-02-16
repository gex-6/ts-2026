// звуження на основі типу даних
class Guest {
    public viewProducts(): void {
        console.log('Browsing products as guest');
    }
}

class AuthenticatedUser {
    userName: string;
    shoppingCartId: string;

    constructor(userName: string, shoppingCartId: string) {
        this.userName = userName;
        this.shoppingCartId = shoppingCartId;
    }

    public addToCart(productId: number): void {
        console.log('Added product to cart');
    }
}

class Admin {
    userName: string;

    constructor(userName: string) {
        this.userName = userName;
    }

    public deleteProduct(productId: number): void {
        console.log('Admin deletes product');
    }
}

type User = Guest | AuthenticatedUser | Admin;

function showHeader(user: User): void {
    if (!(user instanceof Guest)) {
        console.log(`Welcome, ${user.userName}`);
    }

    console.log(`Welcom, ${user instanceof Guest ? 'Guest' : user.userName} `);

    if ('addToCart' in user && typeof user.addToCart === 'function') {
        user.addToCart(101);
        user.shoppingCartId;
    }
}

// ******************************************************************************

// перевірка на істинність
interface ShoppingCart {
    id: string;
    items:  {productId: number, name: string }[]
}

function displayCartItemCount(cart: ShoppingCart | null | undefined): void {
    if(cart) { //перевіряємо, що існує
        console.log(`You have ${cart.items.length} in your cart`);
    } else {
        console.log('You shopping cart is empty');
    }
}

// ******************************************************************************

// звуження на основі еквівалентність
type ProductStatus = 'avalable' | 'out_of_stock' | 'pending';

function handleProductStatus(status: ProductStatus): void {
    if (status === 'avalable') {
        console.log()
    } else if (status === 'out_of_stock') {
        // тут out_of_stock
    } else {
        // pending
    }
}

// це зручно робити через switch case
function handleProductStatus2(status: ProductStatus): string {

    switch (status) {
        case 'avalable':
            return "it is available"
        case 'out_of_stock':
            return "it is not available"
        case 'pending':
            return "pending"
        default:
            throw new Error(`Unsupported status: ${status}`)
    }
}

// typeof також можна використовувати у світч
function formatIdentifier(id: string | number): string {
    switch(typeof id) {
        case 'string':
            return 'string';
        case 'number':
            return 'number here';
        default:
            throw new Error('Invalid type of id')
    }
}

// ******************************************************************************

interface Product {
    name: string;
    price: number;
}

function getShippingInfo(product: Product): string {
    if('price' in product) {
        return 'the price is' + product.price;
    }

    return 'no price';
}

// ******************************************************************************

// type guard functions

interface PhysicalProduct {
    name: string;
    price: number;
    weight: number;
}

interface DigitalProduct {
    name: string;
    price: number;
    url: string;
}

type NewProduct = DigitalProduct | PhysicalProduct;

function isPhysicalProduct(product: Product): product is PhysicalProduct {
    return 'weight' in product;
}

interface AuthedUser {
    userName: string;
    shoppingCartId: number;
}

function isValidUserResponse(response: unknown): response is AuthedUser {

    if (response === null || typeof response !== 'object') return false;

    const hasUserName = 
        'userName' in response && 
        Object.hasOwn(response, 'userName') && 
        typeof response.userName === 'string';

    const hasCartId =
        'shoppingCartId' in response &&
        Object.hasOwn(response, 'shoppingCartId') &&
        typeof response.shoppingCartId === 'number';

    return hasUserName && hasCartId;
}

// ******************************************************************************

const quantityInput = document.getElementById('product-quantity');

if (quantityInput) {
    const quantity = (quantityInput as HTMLInputElement).value;
    console.log(`Selected quantity: ${quantity}`);
}

// ******************************************************************************

interface IProduct {
    id: string;
    name: string;
    price: number;
}

const legacyProductData: string = '{"id":"abc-123","name":"real product"}';

const product = legacyProductData as unknown as IProduct;

// ******************************************************************************

const productCache = new Map<string, IProduct>();
const selectedProductId = 'abc-1234';

productCache.set(selectedProductId, {
    id: 'abc-1234',
    name: "T-Shirt",
    price: 29.99,
});

// ! -- це non-null assertion. але краще використовувати Type Guard
if (productCache.has(selectedProductId)) {
    const product = productCache.get(selectedProductId);
    if (product) {
        // Тут TypeScript знає, що product — це IProduct
        console.log(product.name.toLocaleUpperCase());
    }
    console.log(product!.name.toLocaleUpperCase());
}

// ******************************************************************************

