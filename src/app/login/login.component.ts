import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [Commonservices],
})
export class LoginComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    private isSubmit;
    private isemailvalidate;
    public is_error;
    private addcookie: CookieService;
    private cookiedetails;
    public serverurl;
    public serverhost;
    public neededhost;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.serverurl = _commonservices.url;
        this.serverhost = _commonservices.hostis;
        var splitvalue = this.serverhost.split('.');
        console.log(splitvalue);
        console.log(splitvalue[1]);
        console.log(splitvalue[2]);
        this.neededhost = splitvalue[1] + '.' + splitvalue[2];
    }

    ngOnInit() {
        this.isSubmit = false;
        this.isemailvalidate = false;
        this.dataForm = this.fb.group({
            usernameoremail: ['', Validators.required],
            password: ['', Validators.required]});
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        this.is_error = 0;
        this.isSubmit = true;
        if (this.dataForm.valid) {
            let link = this.serverurl + 'login';
            let data = {usernameoremail: formval.usernameoremail, password: formval.password};

            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                        let addresultforcookie = {
                            id : result.msg._id,
                            firstname : result.msg.firstname,
                            lastname : result.msg.lastname,
                            email : result.msg.email,
                            username : result.msg.username,
                            type : result.msg.type,
                          //  lastlogin: result.lastlogintime
                        };

                        this.addcookie.putObject('cookiedetails', addresultforcookie);
                        console.log('cookiedetails from login page');
                        console.log(this.cookiedetails);
                        console.log(result.msg.username);
                      //  this.router.navigate(['/autologin,']);
                      var newurl = 'http://'+result.msg.username + '.' + this.neededhost + '/#/autologin/' + result.msg.logintoken;
                      console.log(newurl);
                      // http://tyy.nexhealthtoday.com/#/autologin/12
                      window.location.href = newurl;
/*
                        if (result.msg.type == 'salesrep' || 'corporate' || 'leadmanager' || 'masteraccount') {
                            if (result.msg.signup_step == '1') {
                                this.router.navigate(['/employment-agreement']);
                            }
                            else if (result.msg.signup_step == '2') {
                                this.router.navigate(['/trainingstep']);
                            }
                            else if (result.msg.signup_step == '3') {
                                this.router.navigate(['/rep-dashboard']);
                            }
                        }
                        else if (result.msg.type == 'recruiter') {
                            if (result.msg.signup_step == '1') {
                                this.router.navigate(['/employment-agreement']);
                            }
                            else if (result.msg.signup_step == '2') {
                                this.router.navigate(['/trainingstep']);
                            }
                            else if (result.msg.signup_step == '3') {
                                this.router.navigate(['/recruiterdashboard']);
                            }
                        }
                        else { // admin
                            this.router.navigate(['/dashboard']);
                        }*/
                    }
                    else {
                        this.is_error = result.msg;
                    }

                }, error => {
                    console.log('Oooops!');
                });



        }
    }
}
