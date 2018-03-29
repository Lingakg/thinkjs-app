import WebBase from '../WebBase.js';
import https = require( 'https');
import BaseModel from "../../../selfModel/BaseModel";
import Login from "../../../Service/Login";
import PostData from "../../../Server/PostData";


export default class extends WebBase {
    constructor(ctx: any) {
        super(ctx);
        console.log('请求到达api构造');
        if (this.ctx.req.isLogin === false) {
            return this.body = new BaseModel(500, '未登录')
        }
    }
    async listAction() {
        console.log('请求到达控制器 list Action')
        const model = this.model('list');
        const data = await model.select();
        console.log(this.ctx.req.isLogin)
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
    async testServerAction() {
        const post: object = new PostData();
        const data: any = await post.getId()
        this.body=new BaseModel(200, data);
    }
}