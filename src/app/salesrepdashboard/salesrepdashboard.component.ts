import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {Http} from '@angular/http';
declare var moment: any;

@Component({
  selector: 'app-salesrepdashboard',
  templateUrl: './salesrepdashboard.component.html',
  styleUrls: ['./salesrepdashboard.component.css'],
    providers: [Commonservices],
})
export class SalesrepdashboardComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public comingsoonmodal;
    public serverurl;
    public recdetails;
    public logintime;
    public signuptime;

    constructor( addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log(this.cookiedetails);
        this.serverurl = _commonservices.url;
        this.getrecdetails();
    }

  ngOnInit() {
  }
calllogout() {
    this.addcookie.removeAll();
    this.router.navigate(['/']);
}
    onHidden() {
        this.comingsoonmodal = false;
    }
    openmodal() {
        this.comingsoonmodal = true;
    }
    getrecdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    this.recdetails = result.id;
                    console.log(this.recdetails);
                    this.logintime = moment(this.recdetails.logintime).format('DD-MM-YYYY');
                    this.signuptime = moment(this.recdetails.signuptime).format('DD-MM-YYYY');
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
