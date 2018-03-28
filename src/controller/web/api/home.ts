import WebBase from '../WebBase.js';
import https = require( 'https');
import BaseModel from "../../../selfModel/BaseModel";


export default class extends WebBase {
    constructor(ctx: any) {
        super(ctx);
        console.log('请求到达api构造');
    }
    async listAction() {
        console.log('请求到达控制器 list Action')
        const model = this.model('list');
        const data = await model.select();
        this.body = new BaseModel(200, data);
    }
    async detailAction() {
        const queryId: any = this.ctx.request.body.post.id
        console.log(queryId)
        const model = this.model('list');
        const data = await model.where({id: queryId}).find();
        this.body = new BaseModel(200, data);
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