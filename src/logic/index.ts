import { think } from 'thinkjs';

export default class extends think.Logic {
    __before() {
        // todo
        console.log('请求到达');
    }
    indexAction() {
        // todo
    }
    __after() {
        // todo
    }
}
