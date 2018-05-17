import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-repsignup',
  templateUrl: './repsignup.component.html',
  styleUrls: ['./repsignup.component.css'],
  providers: [Commonservices],
})
export class RepsignupComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    static invalidemail;
    static blankemail;
    static invalidpassword;
    static invalidusername;
    private passmatchvalidate;
    public alreadyexist: any;
    public serverurl;
    private addcookie: CookieService;
    private cookiedetails;
    public hostname;
    public type;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        RepsignupComponent.blankemail = false;
        RepsignupComponent.invalidemail = false;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log(window.location.host);
        this.hostname = window.location.host;
        if (this.hostname == 'localhost:4200') {
            this.type = 'salesrep';
        }
        else {
            var splitvalue = this.hostname.split('.');
            console.log(splitvalue);
            console.log(splitvalue[0]);
            let link = this.serverurl + 'getuserdetailsbyuserid';
            let data = {
                username: splitvalue[0],
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                        console.log(result.id.type);
                        if (result.id.type == 'corporate') {
                            this.type = 'leadmanager';
                        }
                        else if (result.id.type == 'leadmanager') {
                            this.type = 'masteraccount';
                        }if (result.id.type == 'masteraccount') {
                            this.type = 'salesrep';
                        }
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }

    }

    ngOnInit() {
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.compose([Validators.required, RepsignupComponent.validateUsername])],
            email: ['', Validators.compose([Validators.required, RepsignupComponent.validateEmail])],
            password: ['', Validators.compose([Validators.required, RepsignupComponent.validatePassword])],
            confpassword: ['', Validators.required],
            address: ['', Validators.required],
            address2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        }, {validator: this.matchingPasswords('password', 'confpassword')});
    }


    static validateEmail(control: FormControl) {
        RepsignupComponent.blankemail = false;
        RepsignupComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            RepsignupComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            RepsignupComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    static validatePassword(control: FormControl) {
        RepsignupComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
       if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            RepsignupComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }

    static validateUsername(control: FormControl) {
        RepsignupComponent.invalidusername = false;
        console.log('control.value');
        console.log(control.value);
        if (control.value == '' || control.value == null) {
            console.log('control.value null');
            return {'invalidusername': false};
        }
        if (!control.value.match(/^([a-zA-Z0-9]{3,})*$/)) {
            RepsignupComponent.invalidusername = true;
            return {'invalidusername': true};
        }
    }

    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return RepsignupComponent.invalidemail;
        }
        if (type == 'blank') {
            return RepsignupComponent.blankemail;
        }
    }

    getpassword(type: any) {
        if (type == 'invalid') {
            return RepsignupComponent.invalidpassword;
        }
    }

    getusername(type: any) {
        if (type == 'invalid') {
            return RepsignupComponent.invalidusername;
        }
    }

    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                console.log('mismatch');
                return {
                    mismatchedPasswords: true
                };
            }
            else {
                this.passmatchvalidate = true;
            }
        };
    }
    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid && this.passmatchvalidate && (RepsignupComponent.invalidemail == false || RepsignupComponent.blankemail == false) && RepsignupComponent.invalidusername == false && RepsignupComponent.invalidpassword == false) {
          //  console.log('inside dataformvalid');
          //  console.log(formval);
            let link = this.serverurl + 'signup';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                username: formval.username,
                email: formval.email,
                password: formval.password,
                address: formval.address,
                address2: formval.address2,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                gender: formval.gender,
                dob: formval.dob,
                phone: formval.phone,
              //  type: 'salesrep',
                type: this.type,
                signup_step: 1,
            };
            console.log('data-------');
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                   // console.log('from repsignup page');
                  //  console.log(result);
                    if (result.status == 'error' && result.id == '-1') {
                        console.log('inside mail exists');
                        this.alreadyexist = 'Emailid already exists';
                    }
                    if (result.status == 'error' && result.id == '-2') {
                        console.log('inside Username exists');
                        this.alreadyexist = 'Username already exists';
                    }
                    if (result.status == 'success') {
                     //   console.log('success');
                        this.alreadyexist = null;
                        let addresultforcookie = {
                            id : result.id,
                            firstname : formval.firstname,
                            lastname : formval.lastname,
                            email : formval.email,
                            username : formval.username,
                           // type : 'salesrep',
                            type : this.type,
                        };
                        this.addcookie.putObject('cookiedetails', addresultforcookie);
                        console.log('cookiedetails from repsignup page');
                        console.log(this.cookiedetails);
                        this.dataForm.reset();
                        this.router.navigate(['/employment-agreement']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

}
