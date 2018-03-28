export default class Login {
     constructor(cookies: string[]) {
         // this.clientToken = cookies;
         this.is(cookies)
    }
    async is(clientToken) {

        // console.log('查询redis', data, clientToken);
        // return this.flag;
        return true;
    }
}