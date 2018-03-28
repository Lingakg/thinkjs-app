import WebBase from '../../WebBase.js';
import https = require( 'https');
import BaseModel from "../../../../selfModel/BaseModel";
import {think} from "thinkjs";

export default class extends WebBase {
    constructor(ctx: any) {
        super(ctx);
        console.log('请求到达admin loan构造');
    }
    async addLoanAction() {
        const title: string = this.ctx.request.body.post.title
        const content: string = this.ctx.request.body.post.content
        const model = this.model('list');
        const data = await model.add({title, content});
        if (think.isEmpty(data)) {
            this.body = new BaseModel(200, data);
        } else {
            this.body = new BaseModel(500, '添加失败');
        }
    }
    async deleteLoanAction() {
        const id: string = this.ctx.request.body.post.id;
        const model = this.model('list');
        const data = await model.where({id}).delete();
        if (think.isEmpty(data)) {
            this.body = new BaseModel(200, data);
        } else {
            this.body = new BaseModel(500, '删除失败');
        }
    }
    async updateLoanAction() {

    }
    async queryLoanListAction() {

    }
    async queryLoanDetailAction() {

    }
}