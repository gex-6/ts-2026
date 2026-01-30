let value: object; // це будь-що окрім примітивів

value = { name: 'John'};
value = [1, 2, 3];
value = function() {};
value = Date;
value = new Number(42);
// value = 41; -- тут помилка
// краще не використовувати. цей тип каже, що тут точно не примітив і нічого більше

let valueNew: object;
valueNew = { name: 'John'};
if ('name' in valueNew && typeof valueNew.name === 'string') {
    valueNew.name.toUpperCase();
}

let valueOoneMore: Object; // це будь-що окрім null або undefined

valueOoneMore = { name: 'John'};
valueOoneMore = [1, 2, 3];
valueOoneMore = function() {};
valueOoneMore = Date;
valueOoneMore = new Number(42);
valueOoneMore = 42

let valueCustom: { name: string } // вказуємо, що це буде об‘єкт відповідної структури

type User = {
    name: string,
    email: `${string}@${string}.${string}`,
}

let valueUser: User;

valueUser = {
    name: 'John',
    email: 'john@test.com'
}

// об‘єктні обгортки - wrapper object
'hello'.at(0); // - у момент цього звернення створюється об‘єкт відповідного типу (попсінг)
new String('hello').at(0); // - це буде створюватися тільки у момент звернення і потім буде видалено

let primitiveValue: number = 42;
let wrapperValue: Number = new Number(42);

wrapperValue = primitiveValue;
// primitiveValue = wrapperValue;

if (new Number(42) === new Number(42)) {
    console.log("це не виконається ніколи, бо це референс на різні дані");
}