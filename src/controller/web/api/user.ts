import Base from '../../base.js';
import BaseModel from "../../../selfModel/BaseModel";
import UUID = require('uuid');
import crypto = require('crypto');

export default class extends Base {
    async indexAction() {
        return this.ctx.redirect('/login');
    }

    async statusAction() {
        const l1 = this.cookie('_l1');
        const l2 = this.cookie('_l2');
        const l3 = this.cookie('_l3');
        const l4 = this.cookie('_l4');
        const tokens: string[] = [l1,l2,l3,l4]
        if (tokens[0] === undefined || tokens[1] === undefined || tokens[2] === undefined || tokens[3] === undefined) {
            this.ctx.req.isLogin = false;
            return this.body = new BaseModel(200,{isLogin: "N"});
        }
        const sunToken: string = tokens[0].toString() +
            tokens[1].toString() + tokens[2].toString() + tokens[3].toString();
        const token: string = crypto.createHmac('md5', sunToken).digest('hex');
        const rds = await this.cache(token);
        if (rds === undefined) {
            this.ctx.req.isLogin = false;
            return this.body = new BaseModel(200,{isLogin: "N"});
        } else {
            this.ctx.req.isLogin = true;
            return this.body = new BaseModel(200,{isLogin: "Y"});
        }
    }

    async registerAction() {
        const userName: string = this.ctx.request.body.post.username;
        const password: string = this.ctx.request.body.post.password;
        if (!/^[\w\_]{6,20}$/.test(userName)) {
            return this.body = new BaseModel(412, '请输入正确的用户名 ');
        }
        if (!/^[\w\_]{6,20}$/.test(password)) {
            return this.body = new BaseModel(412, '请输入正确的密码 ');
        }
        const model = this.model('user');
        const data: any = await model.add({username: userName, password});
        return this.body = new BaseModel(200, data);
    }

    async loginAction() {
        const userName: string = this.ctx.request.body.post.username;
        const password: string = this.ctx.request.body.post.password;
        if (!/^[\w\_]{6,20}$/.test(userName)) {
            return this.body = new BaseModel(412, '请输入正确的用户名 ');
        }
        if (!/^[\w\_]{6,20}$/.test(password)) {
            return this.body = new BaseModel(412, '请输入正确的密码 ');
        }
        const model = this.model('user');
        const data: any = await model.where({username: userName}).find();
        if (think.isEmpty(data)) {
            return this.body = new BaseModel(404, '未注册');
        } else {
            const secret = UUID.v4()
            const sessionMsg1: string = crypto.createHmac('md5', secret).digest('hex');
            const sessionMsg2: string = crypto.createHmac('md5', sessionMsg1).digest('hex');
            const sessionMsg3: string = crypto.createHmac('md5', sessionMsg2).digest('hex');
            const sessionMsg4: string = crypto.createHmac('md5', sessionMsg3).digest('hex');
            this.cookie('_l1', sessionMsg1);
            this.cookie('_l2', sessionMsg2);
            this.cookie('_l3', sessionMsg3);
            this.cookie('_l4', sessionMsg4);
            let sunToken: string = sessionMsg1 + sessionMsg2 + sessionMsg3 + sessionMsg4;
            let token: string = crypto.createHmac('md5', sunToken).digest('hex');
            await this.cache(token, {username: userName}, 'redis');
            const rds = await this.cache(token);
            return this.body = new BaseModel(200, {username: data.username, rds});
        }

    }
    async logoutAction() {
        const l1 = this.cookie('_l1');
        const l2 = this.cookie('_l2');
        const l3 = this.cookie('_l3');
        const l4 = this.cookie('_l4');
        const tokens: string[] = [l1,l2,l3,l4]
        if (tokens[0] === undefined || tokens[1] === undefined || tokens[2] === undefined || tokens[3] === undefined) {
            this.ctx.req.isLogin = false;
            return this.body = new BaseModel(200,{isLogout: "Y"});
        }
        const sunToken: string = tokens[0].toString() +
            tokens[1].toString() + tokens[2].toString() + tokens[3].toString();
        const token: string = crypto.createHmac('md5', sunToken).digest('hex');
        const rds = await this.cache(token);
        if (rds === undefined) {
            this.ctx.req.isLogin = false;
            return this.body = new BaseModel(200,{isLogout: "Y"});
        } else {
            this.cookie('_l1', null)
            this.cookie('_l2', null)
            this.cookie('_l3', null)
            this.cookie('_l4', null)
            await this.cache(token, null, 'redis');
            this.ctx.req.isLogin = false;
            return this.body = new BaseModel(200,{isLogout: "Y"});
        }
    }
}