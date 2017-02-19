export class User {

    public email: string;
    public username: string;

    private uuid: string;

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }

    getUUID() {
        return this.uuid;
    }
}
