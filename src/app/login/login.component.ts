import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
/*import {CookieService} from 'angular2-cookie/core';*/
import { CookieService } from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;
import {Provider} from '@angular/compiler/src/core';

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
    public addpatientvalidation: any = 0;
  private token: string;
  private usertype: string;
  private signup_step: string;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.addcookie = addcookie ;
       // this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.serverurl = _commonservices.url;
        this.serverhost = _commonservices.hostis;
        console.log('this.serverhost');
        console.log(this.serverhost);
        var splitvalue = this.serverhost.split('.');
        // console.log('splitvalue  ' + splitvalue);
        //  console.log('this.serverhost   ' + this.serverhost);
        //  console.log(this.serverhost);
        // console.log(splitvalue[1]);
        //  console.log(splitvalue[2]);
        if (splitvalue[2] != null) {
            this.neededhost = splitvalue[1] + '.' + splitvalue[2];
            // console.log('needhost' + this.neededhost);
        }
        else {
            this.neededhost = this.serverhost;
            //   console.log('needhost44444' + this.neededhost);
        }
    }

    ngOnInit() {
        this.isSubmit = false;
        this.isemailvalidate = false;
        this.dataForm = this.fb.group({
            usernameoremail: ['', Validators.required],
            password: ['', Validators.required]});

      this.cookiedetails = this.addcookie.get('cookiedetails');
      this.token = this.addcookie.get('token');
      this.usertype = this.addcookie.get('type');
      this.signup_step = this.addcookie.get('signup_step');
      console.log('from frontheader');
      console.log(this.cookiedetails);
      if (this.cookiedetails != null ) {
        console.log('this.cookiedetails -----');
        console.log(this.cookiedetails);

        let link = this.serverurl + 'detailsusinglogintokenval';
        let data = {idval: this.cookiedetails};
        console.log(data);
        this._http.post(link, data)
          .subscribe(res => {
            let result: any;
            result =res;
            //  console.log(result);
            // console.log('result.msg.type++++++++++++++');
            // console.log(result.msg.type);
            if (result.status == 'success') {

              if (result.msg.type == 'salesrep') {
                console.log('hi 1');
                if (result.msg.signup_step == '1') {
                  this.router.navigate(['/employment-agreement']);
                }
                else if (result.msg.signup_step == '2') {
                  this.router.navigate(['/agreement']);
                }
                else if (result.msg.signup_step == '3') {
                  this.router.navigate(['/trainingstep']);
                }
                else if (result.msg.signup_step == '4') {
                  if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                    this.router.navigate(['/completewebinar']);
                  }
                  else {
                    this.router.navigate(['/rep-dashboard']);
                  }
                  //  this.router.navigate(['/rep-dashboard']);
                }
              }
              else if (result.msg.type == 'corporate' || result.msg.type == 'leadmanager' || result.msg.type == 'masteraccount') {
                console.log('hi 13');
                if (result.msg.signup_step == '1') {
                  this.router.navigate(['/employment-agreement']);
                }
                else if (result.msg.signup_step == '2') {
                  this.router.navigate(['/agreement']);
                }
                else if (result.msg.signup_step == '3') {
                  this.router.navigate(['/trainingstep']);
                }
                /*else if (result.msg.signup_step == '3') {
                    this.router.navigate(['/rep-dashboard']);
                }*/
                else if (result.msg.signup_step == '4') {
                  if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                    this.router.navigate(['/completewebinar']);
                  }
                  else {
                    this.router.navigate(['/rep-dashboard']);
                  }
                }
              }
              else if (result.msg.type == 'recruiter') {
                console.log('hi 2');
                if (result.msg.signup_step == '1') {
                  this.router.navigate(['/employment-agreement']);
                }

                else if (result.msg.signup_step == '2') {
                  this.router.navigate(['/agreement']);
                }
                else if (result.msg.signup_step == '3') {
                  this.router.navigate(['/trainingstep']);
                }
                /*else if (result.msg.signup_step == '3') {
                    this.router.navigate(['/recruiterdashboard']);
                }*/
                else if (result.msg.signup_step == '4') {
                  if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                    this.router.navigate(['/completewebinar']);
                  }
                  else {
                    this.router.navigate(['/rep-dashboard']);
                  }
                }
              }
              else {  // superadmin
                console.log('hi 3');
                this.router.navigate(['/rep-dashboard']);
              }
            }
            else {
            }

          }, error => {
            console.log('Oooops!');
          });
      }
    }

    dosubmit(formval) {
        this.addpatientvalidation = 1;
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
                //let result = res;
                let result: any;
                result = res;
                console.log('result-----------');
                console.log(result);
                   // console.log(result.msg);
                  //  console.log(result.msg._id);
                  if (result != null) {
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

                       //   this.addcookie.putObject('cookiedetails', addresultforcookie);
                          this.addcookie.set('cookiedetails', result.msg._id);
                          this.addcookie.set('fname', result.msg.firstname);
                          this.addcookie.set('lname',result.msg.lastname);
                          this.addcookie.set('username',result.msg.username);
                          this.addcookie.set('email',result.msg.email);
                          this.addcookie.set('type',result.msg.type);
                          this.addcookie.set('token',result.msg.logintoken);
                          this.addcookie.set('signup_step',result.msg.signup_step);
                          //   console.log('cookiedetails from login page');
                          //   console.log('cookiedetails from login page');
                          //  console.log(this.cookiedetails);
                          //  console.log(result.msg.username);
                          //  this.router.navigate(['/autologin,']);

                        if (result.msg.type == 'salesrep') {
                          console.log('hi 1');
                          if (result.msg.signup_step == '1') {
                            this.router.navigate(['/employment-agreement']);
                          }
                          else if (result.msg.signup_step == '2') {
                            this.router.navigate(['/agreement']);
                          }
                          else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                          }
                          else if (result.msg.signup_step == '4') {
                            if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                              this.router.navigate(['/completewebinar']);
                            }
                            else {
                              this.router.navigate(['/rep-dashboard']);
                            }
                            //  this.router.navigate(['/rep-dashboard']);
                          }
                        }
                        else if (result.msg.type == 'corporate' || result.msg.type == 'leadmanager' || result.msg.type == 'masteraccount') {
                          console.log('hi 13');
                          if (result.msg.signup_step == '1') {
                            this.router.navigate(['/employment-agreement']);
                          }
                          else if (result.msg.signup_step == '2') {
                            this.router.navigate(['/agreement']);
                          }
                          else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                          }
                          /*else if (result.msg.signup_step == '3') {
                              this.router.navigate(['/rep-dashboard']);
                          }*/
                          else if (result.msg.signup_step == '4') {
                            if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                              this.router.navigate(['/completewebinar']);
                            }
                            else {
                              this.router.navigate(['/rep-dashboard']);
                            }
                          }
                        }
                        else if (result.msg.type == 'recruiter') {
                          console.log('hi 2');
                          if (result.msg.signup_step == '1') {
                            this.router.navigate(['/employment-agreement']);
                          }

                          else if (result.msg.signup_step == '2') {
                            this.router.navigate(['/agreement']);
                          }
                          else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                          }
                          /*else if (result.msg.signup_step == '3') {
                              this.router.navigate(['/recruiterdashboard']);
                          }*/
                          else if (result.msg.signup_step == '4') {
                            if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                              this.router.navigate(['/completewebinar']);
                            }
                            else {
                              this.router.navigate(['/rep-dashboard']);
                            }
                          }
                        }
                        else {  // superadmin
                          console.log('hi 3');
                          this.router.navigate(['/rep-dashboard']);
                        }


                          /*if (this.serverhost == 'localhost:4200') {
                              var newurl = 'http://localhost:4200/#/autologin/' + result.msg.logintoken;
                              //   http://localhost:4200/#/autologin/12
                          }
                          else {
                              //  var newurl = 'http://' + result.msg.username + '.' + this.neededhost + '/#/autologin/' + result.msg.logintoken;
                              //  var newurl = 'http://'  + this.neededhost + '/#/autologin/' + result.msg.logintoken;
                              var newurl = 'https://'  + this.neededhost + '/#/autologin/' + result.msg.logintoken;
                              // http://tyy.nexhealthtoday.com/#/autologin/12
                          }
                          console.log(newurl);
                          //window.location.href = newurl;
                        this.router.navigate(['/autologin',result.msg.logintoken]);*/



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
                  }
                }, error => {
                    console.log('Oooops!');
                });



        }
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
