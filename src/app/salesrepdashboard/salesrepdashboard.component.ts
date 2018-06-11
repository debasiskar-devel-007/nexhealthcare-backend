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
    public patientaccepted;
    public patientdeclined ;
    public patientsubmitted ;
    public patientlist ;
    public patientacceptednumber: number = 0;
    public patientdeclinednumber: number = 0;
    public patientsubmittednumber: number = 0;

    constructor( addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('this.cookiedetails+++++++++++');
        console.log(this.cookiedetails);
        this.serverurl = _commonservices.url;
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        } else {
            this.getrecdetails();
            if (this.cookiedetails.type == 'superadmin') {
                this.totalnoofpatients();
            }
            else {
                this.getpatientlistunderthisid();
            }
        }

    }

    ngOnInit() {
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/log-in']);
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
                console.log('result');
                console.log(result);
                if (result.status == 'success') {
                    this.recdetails = result.id;
                    // console.log(this.recdetails);
                    // console.log(this.recdetails.logintime);
                    setTimeout(() => {
                        if (this.recdetails.logintime != null) {
                            this.logintime = moment(this.recdetails.logintime).format('DD-MM-YYYY');
                            this.signuptime = moment(this.recdetails.signuptime).format('DD-MM-YYYY');
                        }
                    }, 500);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    // for admin
    totalnoofpatients() {
        let link = this.serverurl + 'gettotalnoofpatients';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log('result');
                console.log(result);
                if (result.status == 'success') {
                    this.patientaccepted = result.accepted;
                    this.patientdeclined = result.declined;
                    this.patientsubmitted = result.submitted;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    // user call to patientlist
    getpatientlistunderthisid() {
        let link = this.serverurl + 'getpatientlistunderthisid';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.patientlist = result.id;
                    console.log('this.patientlist under this userid');
                    console.log(this.patientlist);
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].Tagdetail[0] != null) {
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1b3fe08865e7955f71') {
                            this.patientacceptednumber = this.patientacceptednumber + 1;
                        }
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1d3fe08865e7955f72') {
                            this.patientdeclinednumber = this.patientdeclinednumber + 1;
                        }
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0b9235b33cbc2d4af08dd9') {
                            this.patientsubmittednumber = this.patientsubmittednumber + 1;
                        }
                    }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
