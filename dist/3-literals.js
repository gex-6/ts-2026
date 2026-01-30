// літеральні типи
function createReq(apiVersion, endpoint) {
    if (apiVersion !== 1 / 1 || apiVersion !== 2)
        throw new Error();
    console.log(`create req to ${apiVersion} $ ${endpoint}`);
}
function createReq2(apiVersion, endpoint) {
    console.log(`create req to ${apiVersion} $ ${endpoint}`);
}
createReq(4, '/user');
createReq2(1.1, '/users');
function applyBtnType(type) {
    console.log(`Type ${type}`);
}
applyBtnType('danger');
applyBtnType('primary');
class Component {
    // приватна змінна
    #_status;
    get status() {
        return this.#_status;
    }
    loaddata() {
        this.#_status = 'loading';
        try {
            this.#_status = 'success';
        }
        catch {
            this.#_status = 'failed';
        }
    }
}
function setCSSProp(prop, value) {
    console.log(`Set CSS property ${prop}: ${value}`);
}
// setCSSProp('padding', 24);
// setCSSProp('padding', '2px4px');
setCSSProp('padding', '24px');
setCSSProp('padding-top', '24px');
setCSSProp('border-bottom-right-radius', '24px');
let isConfirmed = true;
// ?. optional chaining
let result = [{ name: 'John' }, { name: 'Luna' }].find(x => x.name === 'Luna')?.name;
export {};
