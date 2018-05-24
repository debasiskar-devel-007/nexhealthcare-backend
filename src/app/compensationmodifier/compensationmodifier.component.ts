import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {RepsignupComponent} from '../repsignup/repsignup.component';

@Component({
  selector: 'app-compensationmodifier',
  templateUrl: './compensationmodifier.component.html',
  styleUrls: ['./compensationmodifier.component.css'],
    providers: [Commonservices],
})
export class CompensationmodifierComponent implements OnInit {
    public compensationmodal: boolean = false;
    public copiedmodal: boolean = false;
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public serverhost;
    public compensationamount;
    public compensationerror;
    public compensationList;
    public p: number = 1;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.serverhost = _commonservices.hostis;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this. getcompensationlist();
    }

    ngOnInit() {
    }
    callfunc(token) {
      //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return this.serverhost + '/#/sign-up/' + token;
    }
    showcopied() {
          this.copiedmodal = true;
         setTimeout(() => {
             this.copiedmodal = false;
         }, 2000);
    }
    getcompensationlist() {
        let link = this.serverurl + 'compensationlistbyuserid';
        let data = {
          userid: this.cookiedetails.id
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.compensationList = result.id;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    openaddcompensationmodal() {
        this.compensationmodal = true;
    }

    onHidden() {
        this.compensationerror = null;
        this.compensationmodal = false;
      //  this.copiedmodal = false;
        this.compensationamount = null;
    }

    addcompensation() {
        if (this.compensationamount >= 0 && this.compensationamount < 150 && this.compensationamount != '' && this.compensationamount != null) {
            this.compensationerror = null;
            let link = this.serverurl + 'getcompensationdetailsbyusernameandamount';
            let data = {
                userid: this.cookiedetails.id,
                amount: this.compensationamount,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                   // console.log(result);
                    if (result.status == 'success') {
                        this.compensationerror = 'You already added same compensation amount earlier.';
                    }
                    else {
                        let link = this.serverurl + 'addcompensation';
                        let data = {
                            userid: this.cookiedetails.id,
                            amount: this.compensationamount,
                        };
                      //  console.log('addcompensation-------');
                       // console.log(data);
                        this._http.post(link, data)
                            .subscribe(res => {
                                let result = res.json();
                                console.log(result);
                                if (result.status == 'success') {
                                    this.compensationerror = null;
                                    this.compensationmodal = false;
                                    this.compensationamount = null;
                                    this. getcompensationlist();
                                }
                                else if (result.status == 'error') {
                                    this.compensationerror = 'Some server issues! Please try again later.';
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                });
        }
         else {
             this.compensationerror = 'Please give amount between $1 - $150.';
         }
    }
}