export default class BaseModel {
    constructor(code: number, data: any[]) {
        if (code === 200) {
            return{
                code: 200,
                data,
                msg: 'success'
            };
        } else {
            return{
                code,
                msg: 'fail',
                cause: data
            };
        }
    }
}