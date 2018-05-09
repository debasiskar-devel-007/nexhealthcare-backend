import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    url: any;

    constructor(private http: Http) {
        this.url = 'http://influxiq.com:3020/';
    }
}