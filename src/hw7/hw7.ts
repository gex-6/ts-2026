// 1. У вас є типи Car, Truck та об'єднання Vehicle. Напишіть функцію getVehicleCapacity(vehicle: Vehicle): string,
// яка робить звуження типу за дискримінантом kind та повертає спецефічне повідомлення про навантаження.
// Реалізуйте вичерпну перевірку за допомогою функції. Додайте до об'єднання новий тип Motorcycle, щоб переконатися,
// що ваша функція "впаде" з помилкою на етапі компіляції.

interface Car {
  kind: 'car';
  passengers: number;
}

interface Truck {
  kind: 'truck';
  cargoWeight: number;
}

interface Motorcycle {
  kind: 'motorcycle';
  hasSidecar: boolean;
}

type Vehicle = Car | Truck; // | Motorcycle;

function getVehicleCapacity(vehicle: Vehicle) {
  
  switch(vehicle.kind) {
    case 'car':
      return `Car has ${vehicle.passengers} seats for a drive`;
    case 'truck':
      return `Truck can carry a cargo of ${vehicle.cargoWeight} weight`;
    default:
      throw new Error('Unknown type of vehicle')
  }
}

function isCar(vehicle: Vehicle): vehicle is Car {

  if (vehicle === null || typeof vehicle !== 'object') return false;

  return 'passengers' in vehicle &&
      Object.hasOwn(vehicle, 'passengers') &&
      typeof vehicle.passengers === 'number';
}

// 2. Ви отримуєте повідомлення через WebSocket, яке має тип unknown. Реалізуйте функцію-захисник типу isChatMessage,
// яка перевіряє, чи відповідає отриманий об'єкт інтерфейсу ChatMessage. Використовуйте різні оператори
// для безпечної перевірки.

interface ChatMessage {
  text: string;
  authorId: number;
}

function isChatMessage(data: unknown): data is ChatMessage {

  if (data === null || typeof data !== 'object') return false;

  const hasText = 'text' in data && Object.hasOwn(data, 'text') && typeof data.text === 'string';
  const hasAuthor = 'auhorId' in data && Object.hasOwn(data, 'authorId') && typeof data.auhorId === 'number';

  return hasText && hasAuthor;
}

function processMessage(data: unknown): void {
  if (isChatMessage(data)) {
    console.info(`User ${data.authorId} says: "${data.text.toUpperCase()}"`);
  } else {
    console.error('Invalid format');
  }
}


// 3. Тип RouteHandlers вимагає, щоб значенням маршруту була строка (назва компонента) або об'єкт із функцією action.
// Створіть об'єкт appRoutes із маршрутами home (string) та login (об'єкт із методом action).
// Оголосіть його так, щоб компілятор перевірив відповідність типу RouteHandlers, але водночас зберіг точну структуру об'єкта.
// Переконайтеся, що виклик appRoutes.login.action() не викликає помилки.

type RouteHandlers = {
  [routePath: string]: string | { action: () => void };
};

class appRoute {
  public home: string;
  public login: { action: () => void };

  constructor(home: string, login: { action: () => void }) {
    this.home = home;
    this.login = login;
  }
}

const appRouteExample: appRoute = {
  home: '123.21.12.12',
  login: { 
    action: (): void => {
      console.log('Login');
    }
  }
} satisfies RouteHandlers;

const routeHandlers: RouteHandlers = { };
routeHandlers['/'] = appRouteExample.home;
routeHandlers['/login'] = appRouteExample.login;

routeHandlers['/login'].action(); // те ж саме, що appRoutes.login.action()
