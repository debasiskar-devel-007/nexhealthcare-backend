import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-autologin',
  templateUrl: './autologin.component.html',
  styleUrls: ['./autologin.component.css'],
    providers: [Commonservices],
})
export class AutologinComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public logintoken;

    constructor(addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');

    }


  ngOnInit() {
      this.route.params.subscribe(params => {
          this.logintoken = params['id'];
          console.log('this.logintoken');
          console.log(this.logintoken);
      });
    setTimeout(() => {
      this.getdetailsusinglogintoken();
    }, 1000);
  }
    getdetailsusinglogintoken() {
        let link = this.serverurl + 'detailsusinglogintoken';
        let data = {logintoken: this.logintoken};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
              let result: any;
              result =res;
              //  console.log(result);
              // console.log('result.msg.type++++++++++++++');
               // console.log(result.msg.type);
                if (result.status == 'success') {
                    let addresultforcookie = {
                        id : result.msg._id,
                        firstname : result.msg.firstname,
                        lastname : result.msg.lastname,
                        email : result.msg.email,
                        username : result.msg.username,
                        type : result.msg.type,
                    };
                    console.log('add result to cookie ++++++');
                    console.log(addresultforcookie);
                  this.addcookie.set('cookiedetails', result.msg._id);
                  this.addcookie.set('fname', result.msg.firstname);
                  this.addcookie.set('lname',result.msg.lastname);
                  this.addcookie.set('username',result.msg.username);
                  this.addcookie.set('email',result.msg.email);
                  this.addcookie.set('type',result.msg.type);
                    console.log('cookiedetails put in autologin--------');
                    console.log(this.cookiedetails);
                    console.log('result.msg.type');
                    console.log(result.msg.type);
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
