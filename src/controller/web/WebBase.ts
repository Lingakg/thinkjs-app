import Base from "../base";
import {think} from "thinkjs";
import Login from "../../Service/Login";
import BaseModel from "../../selfModel/BaseModel";
import UUID = require('uuid');
import crypto = require('crypto');

export default class extends Base {
    constructor(ctx: any) {
        super(ctx);
        this.cookie("_l1")
        if ((this.ctx.method).toLocaleUpperCase() === "GET") {
            return this.body = new BaseModel(500, "请使用POST方式发起请求");
        }
        const l1 = this.cookie('_l1');
        const l2 = this.cookie('_l2');
        const l3 = this.cookie('_l3');
        const l4 = this.cookie('_l4');

        console.dir(this.ctx.ip)
        console.dir(this.ctx.get('host'))
        console.dir(this.ctx.get('Origin'))
        console.log(this.ctx.request.body)

        this.test([l1, l2, l3, l4])
        this.ctx.set("Access-Control-Allow-Origin", "*");
        this.ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        this.ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        this.ctx.set("X-Powered-By", ' 3.2.1');
    }

    async test(tokens: string[]) {
        if (tokens[0] === undefined || tokens[1] === undefined || tokens[2] === undefined || tokens[3] === undefined) {
            this.ctx.req.isLogin = false;
        }
        const sunToken: string = tokens[0].toString() +
            tokens[1].toString() + tokens[2].toString() + tokens[3].toString();
        const token: string = crypto.createHmac('md5', sunToken).digest('hex');
        const rds = await this.cache(token);
        if (rds === undefined) {
            this.ctx.req.isLogin = false;
        } else {
            this.ctx.req.isLogin = true;
        }
    }
}
