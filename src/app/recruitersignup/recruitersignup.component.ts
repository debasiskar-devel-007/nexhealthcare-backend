import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recruitersignup',
  templateUrl: './recruitersignup.component.html',
  styleUrls: ['./recruitersignup.component.css']
})
export class RecruitersignupComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    static invalidemail;
    static blankemail;
    static invalidpassword;
    static invalidusername;
    private passmatchvalidate;
    public alreadyexist: any;

    constructor(fb: FormBuilder, private _http: Http, private router: Router) {
        this.fb = fb;
        RecruitersignupComponent.blankemail = false;
        RecruitersignupComponent.invalidemail = false;
    }

    ngOnInit() {
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.compose([Validators.required, RecruitersignupComponent.validateUsername])],
            email: ['', Validators.compose([Validators.required, RecruitersignupComponent.validateEmail])],
            password: ['', Validators.compose([Validators.required, RecruitersignupComponent.validatePassword])],
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
        RecruitersignupComponent.blankemail = false;
        RecruitersignupComponent.invalidemail = false;

        if (control.value == '') {
            RecruitersignupComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            RecruitersignupComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    static validatePassword(control: FormControl) {
        RecruitersignupComponent.invalidpassword = false;
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            RecruitersignupComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    static validateUsername(control: FormControl) {
        RecruitersignupComponent.invalidusername = false;
        if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/)) {
            RecruitersignupComponent.invalidusername = true;
            return {'invalidusername': true};
        }
    }

    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return RecruitersignupComponent.invalidemail;
        }
        if (type == 'blank') {
            return RecruitersignupComponent.blankemail;
        }
    }

    getpassword(type: any) {
        if (type == 'invalid') {
            return RecruitersignupComponent.invalidpassword;
        }
    }

    getusername(type: any) {
        if (type == 'invalid') {
            return RecruitersignupComponent.invalidusername;
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
        if (this.dataForm.valid && this.passmatchvalidate && (RecruitersignupComponent.invalidemail == false || RecruitersignupComponent.blankemail == false) && RecruitersignupComponent.invalidusername == false && RecruitersignupComponent.invalidpassword == false) {
            console.log('inside dataformvalid');
            console.log(formval);
            //   let link = 'http://localhost:3020/addadmin';
            let link = 'http://influxiq.com:3020/signup';
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
                type: 2
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'error' && result.id == '-1') {
                        console.log('inside mailexists');
                        this.alreadyexist = 'Emailid already exists';
                    }
                    if (result.status == 'success') {
                        // this.router.navigate(['/adminlist']);
                        console.log('success');
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}