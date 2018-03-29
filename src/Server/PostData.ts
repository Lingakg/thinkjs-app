import http = require( 'http');

export default class PostData {
    async getId() {
        const bodyData: object = await this.getWechatOpenId();
        console.log('get token', bodyData)
        const getDT: object = await this.getData();
        return {
            one: bodyData,
            two: getDT
        };
    }
    async getWechatOpenId() {
        return new Promise((resolve: object, reject: object) => {
            const options: object = {
                hostname: '192.168.210.98',
                port: 8080,
                path: '/auth/client/token',
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
            const req = http.request(options, (res) => {
                let str: string = '';
                res.on('data', (data: string) => {
                    str += data;
                });
                res.on("end", (data: string) => {
                    str += data;
                    const endData: string = str.toString()
                    resolve( endData );
                });
            });
            var data= {
                clientId:'ctlm',
                secret:'123'
            }
            let postData = JSON.stringify(data);
            req.write(postData);
            req.end();
        });
    }
    async getData() {
        const bearer: string = this.bearer
        const token: string = this.token
        return new Promise((resolve: object, reject: object) => {
            const options: object = {
                hostname: '192.168.210.98',
                port: 8080,
                path: '/api/city',
                method: 'POST',
                headers: {
                    'Authorization': bearer + token,
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            const req = http.request(options, (res) => {
                let str: string = '';
                res.on('data', (data: string) => {
                    str += data;
                });
                res.on("end", (data: string) => {
                    str += data;
                    const endData: string = str.toString()
                    resolve( endData );
                });
            });
            req.end();
        });
    }
}
