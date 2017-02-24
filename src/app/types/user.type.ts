export class User {

    public email: string;
    public username: string;
    private userUUID: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
