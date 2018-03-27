import Base from "../base";
import { think } from "thinkjs";
import Login from "../../Service/Login";
import BaseModel from "../../selfModel/BaseModel";

export default class extends Base {
    async constructor(ctx: any) {
        super(ctx);
        this.cookie("_l1")
        if ((this.ctx.method).toLocaleUpperCase() === "GET") {
            // return this.body = new BaseModel(500, "请使用POST方式发起请求");
        }
        const l1 = this.cookie('_l1');
        const l2 = this.cookie('_l2');
        const l3 = this.cookie('_l3');
        const l4 = this.cookie('_l4');

        const isLogin = new Login([l1, l2, l3, l4]);
        // console.dir(this.ctx.ip)
        // console.dir(this.ctx.get('host'))
        // console.dir(this.ctx.get('Origin'))
        // console.log(this.ctx.request.body)
        if (!isLogin.is()) {
            return this.body = new BaseModel(500, "未登录");
        }
        this.ctx.set("Access-Control-Allow-Origin", "*");
        this.ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        this.ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        this.ctx.set("X-Powered-By", ' 3.2.1');
        console.log("请求经过Web 构造");
    }
}
