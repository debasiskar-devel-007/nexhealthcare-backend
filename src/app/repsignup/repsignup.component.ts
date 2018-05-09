import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-repsignup',
  templateUrl: './repsignup.component.html',
  styleUrls: ['./repsignup.component.css']
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

    constructor(fb: FormBuilder, private _http: Http, private router: Router) {
        this.fb = fb;
        RepsignupComponent.blankemail = false;
        RepsignupComponent.invalidemail = false;
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

        if (control.value == '') {
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
       if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            RepsignupComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    static validateUsername(control: FormControl) {
        RepsignupComponent.invalidusername = false;
        if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/)) {
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
      //  console.log('inside submit');
      //  console.log(this.dataForm.valid);
      //  console.log(this.passmatchvalidate);
      //  console.log(RepsignupComponent.invalidemail);
       // console.log(RepsignupComponent.blankemail);
       // console.log(RepsignupComponent.invalidusername);
      //  console.log(RepsignupComponent.invalidpassword);
        if (this.dataForm.valid && this.passmatchvalidate && (RepsignupComponent.invalidemail == false || RepsignupComponent.blankemail == false) && RepsignupComponent.invalidusername == false && RepsignupComponent.invalidpassword == false) {
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
                type: 1
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
