
// 1. Написати узагальнену функцію updateProperty, яка не мутує оригінальний об'єкт,
// а повертає його нову копію з оновленим значенням для конкретного ключа. Функція повинна приймати:
//    * Об'єкт типу T
//    * Ключ цього об'єкта 
//    * Нове значення, тип якого повинен строго відповідати типу властивості за цим ключем

interface OriginalObject {
  [key: string]: string;
}

function updateProperty<T, K extends keyof T>(object: T, key: K, newValue: T[K]): T {
  const objectCopy = { ...object };
  objectCopy[key] = newValue;
  return objectCopy;
}

// 2. Створіть систему обробки аналітики, яка включає в себе:
//    * Тип EventName = 'click' | 'scroll' | 'purchase'.
//    * Інтерфейс EventPayloads, який описує структуру даних для кожної події
//      (наприклад, для click — { x: number, y: number }, для scroll — { offset: number }, для purchase — { itemId: string, amount: number }).
//    * Узагальненний клас AnalyticsTracker де перший параметр обмежений типом EventName,
//      а другий залежить від першого і відповідає структурі з EventPayloads.
//    * Клас повинен мати метод track(eventName, payload): void.

type EventName = 'click' | 'scroll' | 'purchase';

interface EventPayloads {
  click: { x: number, y: number };
  scroll: { offset: number };
  purchase: { itemId: string, amount: number };
}

class AnalyticsTracker<T extends keyof EventPayloads> {

  event: EventName;

  constructor(event: EventName) {
    this.event = event;
  }

  track<K extends T>(eventName: K, payload: EventPayloads[K]) {
    console.log(`Tracking event: ${eventName}`, payload);
  }
}

// 3. Вам дістався клас FormProcessor, який створив розробник-початківець. Він намагався зробити клас універсальним,
//    але припустився критичних помилок:
//    * використав небезпечне обмеження extends any
//    * затінив параметр типу у методі
//    * повністю втратив типобезпеку при оновленні полів

interface Data {
  [key: string]: string
}

class FormProcessor<T extends Data = {}> {
  public data: T;

  constructor(data: T) {
    this.data = data;
  }

  public updateField<K extends keyof T>(key: T[K], value: any): void {
    this.data[key] = value;
  }
}

// Ваше завдання провести рефакторинг:
//  1. Виправте оголошення класу. T має бути обмежений об'єктом. Також додайте значення за замовчуванням: якщо тип не передано,
//     нехай це буде порожній об'єкт.
//  2. Перепишіть сигнатуру методу updateField. Він не повинен затінювати параметр класу.
//  3. Також метод updateField повинен приймати лише існуючі ключі з data та сумісні з ними значення.