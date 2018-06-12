import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var moment: any;

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
    public pgxvalue: any;
    public serverurl;
    private addcookie: CookieService;
    private cookiedetails;
    public hostname;
    public type;
    public serverhost;
    public cgxamount;
    public neededhost;
    public compensationtokenvalue;
    public showvalidationerror = 0;
    public roleid;
    public addedby;
    public usastates;
    public uniquerepid;
    public webinarlist = [];
    public wrongtokenforleadrolemodal: boolean = false;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.fb = fb;
        RepsignupComponent.blankemail = false;
        RepsignupComponent.invalidemail = false;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log(window.location.host);
        this.hostname = window.location.host;
        this.serverhost = _commonservices.hostis;
        var splitvalue = this.serverhost.split('.');
        this.neededhost = splitvalue[1] + '.' + splitvalue[2];
        if (this.hostname == 'localhost:4200') {
            this.type = 'salesrep';
        }
        else {
            var splitvalue = this.hostname.split('.');
            //  console.log(splitvalue);
            //  console.log(splitvalue[0]);
            if (splitvalue[2] == null) {
                this.type = 'corporate';
                this.neededhost = 'altushealthgroup.com';
                this.addedby = 'corporate';
            }
            else {
                this.addedby = splitvalue[0];
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
                            console.log(result.id._id);
                            this.roleid = result.id._id;
                            if (result.id.type == 'corporate') {
                                this.type = 'leadmanager';
                            }
                            else if (result.id.type == 'leadmanager') {
                                this.type = 'masteraccount';
                                this.route.params.subscribe(params => {
                                    this.compensationtokenvalue = params['id'];
                                    //  console.log(this.compensationtokenvalue);
                                    this.getdetailsbycompensationtokenvalue();
                                });
                            }if (result.id.type == 'masteraccount') {
                                this.type = 'salesrep';
                                this.cgxamount = 200 - result.id.cgxamountoflead;
                                this.pgxvalue = 100 - result.id.pgxvalueoflead;
                            }
                        }
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        this.getusastates();
        this.getuniquerepid();
        this.getwebinarlist();
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
            city: ['',    Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            agentexperience: ['', Validators.required],
            olderclients: ['', Validators.required],
            noofplanBcard: ['', Validators.required],
            webinarkey: ['', Validators.required],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        }, {validator: this.matchingPasswords('password', 'confpassword')});
    }

    getusastates() {
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.usastates = result;

            }, error => {
                console.log('Oooops!');
            });
    }

    getuniquerepid() {
        let link = this.serverurl + 'getuniquerepid';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.uniquerepid = result.id;
            }, error => {
                console.log('Oooops!');
            });
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
        //  console.log('control.value');
        //  console.log(control.value);
        if (control.value == '' || control.value == null) {
            //   console.log('control.value null');
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
                //  console.log('mismatch');
                return {
                    mismatchedPasswords: true
                };
            }
            else {
                this.passmatchvalidate = true;
            }
        };
    }
/*  call() {
    let x: any;
    for (x in this.dataForm.controls) {
      if (this.dataForm.controls[x].touched) {
        this.showvalidationerror = 0;
      }
    }
  }*/

    dosubmit(formval) {
        this.showvalidationerror = 1;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }

        if (this.dataForm.valid && this.passmatchvalidate && (RepsignupComponent.invalidemail == false || RepsignupComponent.blankemail == false) && RepsignupComponent.invalidusername == false && RepsignupComponent.invalidpassword == false) {
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
                agentexperience: formval.agentexperience,
                olderclients: formval.olderclients,
                noofplanBcard: formval.noofplanBcard,
                webinarkey: formval.webinarkey,
                //  type: 'salesrep',
                type: this.type,
                signup_step: 1,
                cgxamountoflead: this.cgxamount,
                pgxvalueoflead: this.pgxvalue,
                addedby: this.addedby,
                iswebinarchekced: 0,
                uniqueid: this.uniquerepid,
            };
            console.log('data-------');
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'error' && result.id == '-1') {
                        //  console.log('inside mail exists');
                        this.alreadyexist = 'Emailid already exists';
                    }
                    if (result.status == 'error' && result.id == '-2') {
                        //  console.log('inside Username exists');
                        this.alreadyexist = 'Username already exists';
                    }
                    if (result.status == 'success') {
                        //   console.log('success');
                        this.alreadyexist = null;
                        /*  let addresultforcookie = {
                            id : result.id._id,
                            firstname : formval.firstname,
                            lastname : formval.lastname,
                            email : formval.email,
                            username : formval.username,
                            // type : 'salesrep',
                            type : this.type,
                        };
                        this.addcookie.putObject('cookiedetails', addresultforcookie);*/
                        this.dataForm.reset();
                        //  this.router.navigate(['/employment-agreement']);
                        if (this.serverhost == 'localhost:4200') {
                            var newurl = 'http://localhost:4200/#/autologin/' + result.id.logintoken;
                        }
                        else {
                            var newurl = 'http://' + formval.username + '.' + this.neededhost + '/#/autologin/' + result.id.logintoken;
                        }
                        console.log(newurl);
                        window.location.href = newurl;
                        console.log('callcreateregistratsphppage  result.id');
                        console.log(result.id._id);
                        this.callcreateregistratsphppage(result.id._id);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    getdetailsbycompensationtokenvalue() {
        let link = this.serverurl + 'getdetailsbycompensationtokenvalue';
        let data = {roleid : this.roleid , compensationtokenvalue : this.compensationtokenvalue};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    this.cgxamount  = result.id.amount;
                    this.pgxvalue  = result.id.pgxvalue;
                } else {
                    console.log('Sorry ! You have to signup with proper url.');
                    this.wrongtokenforleadrolemodal = true;

                }
            }, error => {
                console.log('Ooops');
            });
    }

    getwebinarlist() {
        this.webinarlist = [];
        let link = 'http://nexhealthtoday.com/getwebinarlist.php';
        this._http.get(link)
            .subscribe(res => {
               // let result = res.json();
                let results = res.json();
              /*  console.log('webinar result ????');
                console.log(results);
                console.log(res);
                console.log(res._body);
                console.log('res._body .... ???');
                console.log(JSON.parse(res._body));*/
                for (let i in results) {
                    if (results[i].registrationUrl == 'https://attendee.gotowebinar.com/rt/647150944609692929') {
                        this.webinarlist.push(results[i]);
                    }
                }
                /* if (result.status == 'success' && typeof(result.id) != 'undefined') {

                } else {
                }*/
                console.log('this.webinarlist');
                console.log(this.webinarlist);
            }, error => {
                console.log('Ooops');
            });
    }

    showdateproperly(stdate , enddate) {
      /* return moment(stdate).format('ddd') + ', ' + moment(stdate).format('MMM') + ' ' + moment(stdate).format('D') + ', ' + moment(stdate).format('YYYY') + ' ' + moment(stdate).format('h') + ':' + moment(stdate).format('mm') + ' ' + moment(stdate).format('A') + ' - ' + moment(enddate).format('h') + ':' + moment(enddate).format('mm') + ' ' + moment(enddate).format('A');*/

        return moment(stdate).format('ddd') + ', ' + moment(stdate).format('MMM') + ' ' + moment(stdate).format('D') + ', ' + moment(stdate).format('YYYY') + ' 5:00 PM - 6:00 PM PDT';
    }

    callcreateregistratsphppage(id) {
        let link = 'http://nexhealthtoday.com/createregistrants.php?id=' + id;
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log('result++++++++++');
                console.log(result);
              /*  for (let i in result) {
                    if (result[i].registrationUrl == 'https://attendee.gotowebinar.com/rt/647150944609692929') {
                        this.webinarlist.push(result[i]);
                    }
                }
                /!* if (result.status == 'success' && typeof(result.id) != 'undefined') {

                } else {
                }*!/
                console.log('this.webinarlist');
                console.log(this.webinarlist);*/
            }, error => {
                console.log('Ooops');
            });
    }
}

