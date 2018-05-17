import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    url: any;
hostis: any;
    constructor(private http: Http) {
        this.hostis = window.location.host;
        console.log(this.hostis);
        this.url = 'http://influxiq.com:3020/';
    }
}