export default class Login {
     constructor(cookies: string[]) {
        const clientToken: string[] = cookies;
        if (clientToken) {
            this.flag = true;
        } else {
            this.flag = false;
        }
    }
    is() {
        return this.flag;
    }
}