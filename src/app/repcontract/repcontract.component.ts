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
    private addcookie: CookieService;
    private cookiedetails;
    public signaturename;
    public today;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
       // console.log('repcontract get ');
       // console.log(this.cookiedetails);
        this.today = moment().format('MMM') + ' ' + moment().format('D') + ', ' + moment().format('YYYY') + ' ' + moment().format('h') + ':' + moment().format('mm') + ' ' + moment().format('A');
    }

    ngOnInit() {
    }
    signature() {
        this.signaturemodal = true;
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/']);
    }
    putsignaure() {
        this.signaturemodal = false;
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
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/trainingstep']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
            this.errorblank = null;
        }
    }
}
