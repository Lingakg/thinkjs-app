import { think } from 'thinkjs';
export default class extends think.Controller {
  constructor(ctx: any) {
    super(ctx);
    console.log('请求经过All 构造');
  }
  __before() {
    console.log('请求经过All base');
  }
  __after() {
    console.log('请求完毕All base');
  }
}
