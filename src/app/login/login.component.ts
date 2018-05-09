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

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
         this.serverurl = _commonservices.url;
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
                    let addresultforcookie = {
                        firstname : result.msg.firstname,
                        lastname : result.msg.lastname,
                        email : result.msg.email,
                        username : result.msg.username,
                        type : result.msg.type,
                    };
                    console.log(addresultforcookie);
                    if (result.status == 'success') {
                        this.addcookie.putObject('cookiedetails', addresultforcookie);
                       console.log('cookiedetails from login page');
                        console.log(this.cookiedetails);
                    }
                    else {
                        this.is_error = result.msg;
                        //  this.router.navigate(['/addadmin']);
                    }

                }, error => {
                    console.log('Oooops!');
                });



        }
    }
}