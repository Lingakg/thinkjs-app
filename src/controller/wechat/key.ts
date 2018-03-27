import Base from '../base.js';
import https = require( 'https');
import {think} from "thinkjs";

export default class extends Base {
    async getIdAction() {
        const code: string = this.ctx.request.body.post.code
        const bodyData: object = await this.getWechatOpenId(code);
        const model = this.model('user');
        const data = await model.where({wechat_id: JSON.parse(bodyData).openid}).find();
        if (think.isEmpty(data)) {
            const insertId = await model.add({id: JSON.parse(bodyData).openid, wechat_id: JSON.parse(bodyData).openid});
        }
        const con: object = await model.select()
        this.body = bodyData;
    }

    async getWechatOpenId(code: string) {
        return new Promise((resolve: object, reject: object) => {
            const options: object = {
                hostname: 'api.weixin.qq.com',
                port: 443,
                path: `/sns/jscode2session?appid=wxe7033033fd28deff&secret=e1589bb3de5a419dcb7d5b07d5246479&js_code=${code}&grant_type=authorization_code`,
                method: 'POST'
            };
            const paramData: object = {
                appid: 'wxe7033033fd28deff',	            // 小程序唯一标识
                secret: 'e1589bb3de5a419dcb7d5b07d5246479', 	// 小程序的 app secret
                js_code: code,	                            // 登录时获取的 code
                grant_type: 'authorization_code'	        // 填写为 authorization_code
            };

            const req = https.request(options, (res) => {
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

};