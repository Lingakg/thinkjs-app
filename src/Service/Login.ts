import BaseModel from "../selfModel/BaseModel";

export default class Login {
     constructor(ctx: any) {
         this.body = new BaseModel(500, '未登录');
    }
}