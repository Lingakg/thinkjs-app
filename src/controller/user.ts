import Base from './base.js';
export default class extends Base {
    log(content: Object){
        console.log(content);
    }

    indexAction() {
        this.body = '{status:200}';
    }
    tsAction() {
        this.body = 'dfgdfg';
    }
    testAction() {
        let ctx = this.ctx;
        // this.log(ctx.request);
        this.body = 'hello';
    }
    funcAction() {
        interface SquareConfig {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig): {color: string; area: number} {
            let newSquare = {color: "white", area: 100};
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        let mySquare = createSquare({color: "black"});
        this.body = mySquare;
    }
    page1Action() {
        return this.display('user/page'); //渲染模板
    }
}
