const defaultProduct = {
    id: '1234',
    name: 'T-Shirt',
    price: 29.99,
    inStock: true
}

type Product = typeof defaultProduct;

const anotherProduct: Product = {
    id: '4567',
    name: 'Jacket',
    price: 59.99,
    inStock: false
}

// *************************************************************

// гнучкість
// тип передається як параметр

// T та U не несуть якогось значення у цьому кейсі

interface User<T, U> {
    name: string;
    age: number;
    id: T;
    role: U;
}

// можуть бути будь-які назви тут
interface UserNew<ID, Role> {
    name: string;
    age: number;
    id: ID;
    role: Role;
}

const user: User<string, number> = {
    name: 'John',
    age: 42,
    id: '1234',
    role: 2,
}

const admin: User<string, string> = {
    name: 'Joe',
    age: 23,
    id: '5678',
    role: 'admin'
}

// *************************************************************

// узагальненнями можуть бути:
/*

type
interface
function
class

*/

function handleData<T>(data: T): T {
    const processedData: T = data;
    return processedData;
}

interface SignUpData {
    name: string;
    age: number;
    id: string;
}

const registrationData = handleData<SignUpData>({
    name: 'John',
    age: 42,
    id: '1234',
})