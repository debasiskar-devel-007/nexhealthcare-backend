import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-repcontract',
    templateUrl: './repcontract.component.html',
    styleUrls: ['./repcontract.component.css'],
    providers: [Commonservices],
})
export class RepcontractComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public errorblank;
    public serverurl;
    public signaturemodal: boolean = false;
    private addcookie: CookieService;
    private cookiedetails;
    public signaturename;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
    }

    ngOnInit() {
        /*  this.dataForm = this.fb.group({
            name: ['', Validators.required]});*/
    }
    signature() {
        this.signaturemodal = true;
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
                    }
                }, error => {
                    console.log('Oooops!');
                });
            this.errorblank = null;
        }
    }
}
