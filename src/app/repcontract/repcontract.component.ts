import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var moment: any;

@Component({
    selector: 'app-repcontract',
    templateUrl: './repcontract.component.html',
    styleUrls: ['./repcontract.component.css'],
    providers: [Commonservices],
})
export class RepcontractComponent implements OnInit {
    public errorblank;
    public serverurl;
    public signaturemodal: boolean = false;
    public addcookie: CookieService;
    public cookiedetails;
    public signaturename;
    public today;
    public showtoday;
    public showafteryear;
    public cgxvalue: any = 0;
    public pgxvalue: any = 0;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        // console.log('repcontract get ');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this.today = moment().format('MMM') + ' ' + moment().format('D') + ', ' + moment().format('YYYY') + ' ' + moment().format('h') + ':' + moment().format('mm') + ' ' + moment().format('A');
        this.showtoday = moment().format('D') + ' day of ' + moment().format('MMM') + ', ' + moment().format('YYYY');
        this.showafteryear = moment().format('D') + ' day of ' + moment().format('MMM') + ', ' + moment().add(1, 'years').format('YYYY');
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        }
        else{
            if (this.cookiedetails.type == 'leadmanager') {
                this.cgxvalue = 10;
                this.pgxvalue = 0;
            }
            else {
                this.getuserdetails();
            }
        }
    }

    ngOnInit() {
    }
    signature() {
        this.signaturemodal = true;
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/log-in']);
    }
    putsignaure() {
        this.signaturemodal = false;
        if (this.signaturename == null || this.signaturename == '') {
            this.errorblank = 'Please enter Sales\'s rep name';
        }
        else {
            this.errorblank = null;
        }
    }
    onHidden() {
        this.signaturename = null;
        this.signaturemodal = false;
    }
    callsubmit() {
        if (this.signaturename == null || this.signaturename == '') {
            this.errorblank = 'Please enter Sales\'s rep name';
        }
        else {
            let link = this.serverurl + 'repcontract';
            let data = {
                name: this.signaturename,
                addedby: this.cookiedetails.id,
                compensationgrade: this.cgxvalue,
                pgxvalue: this.pgxvalue,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                        this.router.navigate(['/trainingstep']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
            this.errorblank = null;
        }
    }
    getuserdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    this.cgxvalue = result.id.cgxamountoflead;
                    this.pgxvalue = result.id.pgxvalueoflead;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}

