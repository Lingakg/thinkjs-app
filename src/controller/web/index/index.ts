import Base from '../../base.js';
import https = require( 'https');
import BaseModel from "../../../selfModel/BaseModel";

export default class extends Base {
    indexAction() {
        return this.display();
    }
}