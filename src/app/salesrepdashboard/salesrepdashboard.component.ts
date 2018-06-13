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
    public datalist;
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
                this.getPatient_addedbyList();
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
    // admin call to patientlist
    getPatient_addedbyList() {
        this.patientlist = [];
        let link = this.serverurl + 'patient_addedbylist_only6';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log('patient_addedbylist_only6++++++++++++++');
                    console.log(result.id);
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
                    /*for (let j in this.datalist) {
                        if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                            console.log('inside');
                            if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                                this.patientlist.push(this.datalist[j]);
                            }
                        }
                    }*/
                }

            }, error => {
                console.log('Oooops!');
            });
        console.log('this.patientlist----------');
        console.log(this.patientlist);
    }
    // user call to patientlist
    getpatientlistunderthisid() {
        let link = this.serverurl + 'getpatientlistunderthisid_only6';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                // console.log('result');
                //  console.log(result);
                if (result.status == 'success') {
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
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

    // user call to patientlist for patient tags numbers
   /* totalnoofpatientsunderthisid() {
        let link = this.serverurl + 'gettotalnoofpatientsunderthisid';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
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
    }*/

    gotopatientrecord(id, tagid) {
        if (tagid == '5b0bfa1b3fe08865e7955f71') {
            this.router.navigate(['/patientrecord', id, 1]); // accept
        }
        if (tagid == '5b0bfa1d3fe08865e7955f72') {
            this.router.navigate(['/patientrecord', id, 2]); // decline
        }
        if (tagid == '5b0cda8121eaaa0244d52b9e') {
            this.router.navigate(['/patientrecord', id, 3]); // lead
        }
        if (tagid == '5b0b9235b33cbc2d4af08dd9') {
            this.router.navigate(['/patientrecord', id, 4]); // pps submitted
        }
        if (tagid == '5afad90dde56b53d10e2ab4d') {
            this.router.navigate(['/patientrecord', id, 5]); // pf submitted
        }
        /* if ((tagid != '5b0bfa1b3fe08865e7955f71') && (tagid != '5b0bfa1d3fe08865e7955f72')) {
      this.router.navigate(['/patientrecord', id, 3]);
    }*/
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

/*    // user call to patientlist
    getpatientlistunderthisid() {
        let link = this.serverurl + 'getpatientlistunderthisid1';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.datalist = result.id;
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
    }*/
}
