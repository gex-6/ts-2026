const funcExpression: Function = function() {};

type WithOptionalParams = (a: number, b?: number) => number; // b опційний параметер

function fn(a: number, b: number = 42): number { // якщо не передати нічого у другий аргумент, то він матиме значення 42
    console.log(a, b);

    return 42;
}

function fn2(a: number, ...params: number[]): number { // можна передати скільки завгодно параметрів, які згрупуються в масив params

    params.map(x => x.toString());
    return 42;
}

type ButtonHandler = (event: Event) => void;


// перевантаження функцій | overload
// це всі можливі сценарії використання функції
function findButtonById(id: string): HTMLButtonElement;
function findButtonById(ids: string[]): HTMLButtonElement[];
function findButtonById(ids: string[], attr: 'disabled'): boolean;

// можна було б і так, але це виглядає складно
function findButtonById(x: string | string[], optional?: string): HTMLButtonElement | HTMLButtonElement[] | boolean {

    if (optional) return true;
    
    // code block
    return {} as HTMLButtonElement | HTMLButtonElement[];
}

// це дає нам те, що можна передавати різні параметри і реалізації однієї функції
const result = findButtonById('42');
const result2 = findButtonById(['42', '90']);
const result3 = findButtonById(['42', '90'], 'disabled');