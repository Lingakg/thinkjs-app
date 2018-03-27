import WebBase from '../WebBase.js';
import https = require( 'https');
import BaseModel from "../../../selfModel/BaseModel";


export default class extends WebBase {
    constructor(ctx: any) {
        super(ctx);
        console.log('请求到达api构造');
    }
    listAction() {
        console.log('请求到达控制器 list Action')
        this.body = new BaseModel(200, [1, 1, 2, 5, 54, 3, 5, 3]);
    }
    testAction() {
        this.body = {code: 200, data: [{name: 'wanlin'}]};
    }
    async addAction() {
        /**
         * mysql test success
         *  const model = this.model('user');
         *  const data = await model.add({id: 131313132, wechat_id: 12312});
         */
        /**
         * redis test success
         *  await this.cache('name', 'value', 'redis');
         *  const data = await this.cache('name');
         */
        this.body = {};
    }
}