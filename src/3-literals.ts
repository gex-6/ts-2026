// літеральні типи

function createReq(apiVersion: number, endpoint: string): void {
    if (apiVersion !== 1/1 || apiVersion !== 2) throw new Error();

    console.log(`create req to ${apiVersion} $ ${endpoint}`);
}

function createReq2(apiVersion: 1.1 | 2, endpoint: string): void {
    console.log(`create req to ${apiVersion} $ ${endpoint}`);
}

createReq(4, '/user');
createReq2(1.1, '/users');

function applyBtnType(type: 'primary' | 'secondary' | 'danger'): void {
    console.log(`Type ${type}`);
}

applyBtnType('danger');
applyBtnType('primary');

// псевдонім типу (Type Alias)
// тут в типі лежить Union (або -- який із цих типів)
export type ComponentStatus = 'idle' | 'loading' | 'success' | 'failed';

class Component {
    // приватна змінна
    #_status: ComponentStatus;

    get status(): 'idle' | 'loading' | 'success' | 'failed' {
        return this.#_status;
    }

    loaddata(): void {
        this.#_status = 'loading';

        try {
            this.#_status = 'success';
        } catch {
            this.#_status = 'failed';
        }
    }
}


// шаблонні літерали - літеральні типи даних
type PxValue = `${number}px`;
type PaddingSeparateProp = 'padding' | `padding-${'top' | 'bottom' | 'right' | 'left'}`;

type AxisX = 'right' | 'left';
type AxisY = 'top' | 'bottom';

type BorderRadius = 'border-radius' | `border-${AxisY}-${AxisX}-radius`;

type CSSProp = PaddingSeparateProp | BorderRadius;
 
function setCSSProp(prop: CSSProp, value: PxValue): void {
    console.log(`Set CSS property ${prop}: ${value}`);
}

// setCSSProp('padding', 24);
// setCSSProp('padding', '2px4px');
setCSSProp('padding', '24px');
setCSSProp('padding-top', '24px');
setCSSProp('border-bottom-right-radius', '24px');

type EventType = 'click' | 'focus' | 'change';
type ComponentName = 'button' | 'input';
type EventHandlerName = `on${Capitalize<ComponentName>}${Capitalize<EventType>}`;


let isConfirmed: true | null = true;

// ?. optional chaining
let result: string | undefined = [{name: 'John'}, {name: 'Luna'}].find(x => x.name === 'Luna')?.name;
