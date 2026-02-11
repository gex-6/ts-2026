/* Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. 
   Наприклад, тип значення для кожного ключа може бути число | рядок. */

interface Indentifier {
    [key: string]: number | string;
}


/* Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. 
   Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи. */

interface KeyFunc {
    [key: string]: (...args: any[]) => void;
}


/* Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. 
   Ключі повинні бути числами, а значення - певного типу. */

class SomeObject {
    private fieldA: string;
    private fieldB: number;

    constructor(fieldA: string, fieldB: number) {
        this.fieldA = fieldA;
        this.fieldB = fieldB;
    }
}

interface ArrayObj {
    [key: number]: SomeObject;
}


/* Створіть інтерфейс з певними властивостями та індексною сигнатурою. 
   Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей. */

interface WithProps {
    [key: string]: string | number;

    name: string;
}


/* Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості. */

interface First {
    [key: string]: string;
}

interface Second extends First {
    firstName: string;
    secondName: string;
}


/* Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, 
   чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами). */

interface Input {
    [key: string]: string;
}

function checkInput(input: Input) {

    if (typeof input.value === 'string') {
        console.log(`Value for the input is valid: ${input}`);
    }
}
