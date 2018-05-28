import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-pateints',
  templateUrl: './pateints.component.html',
  styleUrls: ['./pateints.component.css'],
    providers: [Commonservices],
})
export class PateintsComponent implements OnInit {
    public serverurl;
    public datalist;
    public isthisadmin;
    public p: number = 1;
  public addcookie: CookieService;
  public cookiedetails;
  public patientlist: any = [];

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
       // this.getPatientList();
     // console.log('this.isthisadmin**************');
     // console.log(this.isthisadmin);
    //  if (this.isthisadmin != 'admin') {
      this.addcookie = addcookie ;
      this.cookiedetails = this.addcookie.getObject('cookiedetails');
     // console.log(this.cookiedetails);
     // this.getpatientlistunderthisid();
    //  }
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isthisadmin = params['id'];
     // console.log(this.isthisadmin);
    });
    if (this.isthisadmin == 'admin') {
      console.log('this.isthisadmin**************');
       console.log(this.isthisadmin);
    this.getPatient_addedbyList();
    }
    else {
      console.log('this.isthisadmin@@@@@@@@');
       console.log(this.isthisadmin);
      this.getpatientlistunderthisid();
    }
  }
 /*   getPatientList() {
        let link = this.serverurl + 'patientList';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.datalist = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }*/

  getPatient_addedbyList() {
        let link = this.serverurl + 'patient_addedbylist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result.id);
                    this.datalist = result.id;
                  for (let j in this.datalist) {
                    if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                      console.log('inside');
                    if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                      this.patientlist.push(this.datalist[j]);
                    }
                  }
                  }
                }

            }, error => {
              console.log('Oooops!');
            });
  }
  gotopatientrecord(id) {
    this.router.navigate(['/patientrecord', id]);
  }
  getpatientlistunderthisid() {
    let link = this.serverurl + 'getpatientlistunderthisid';
    let data = {
      userid: this.cookiedetails.id,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
       // console.log('result');
      //  console.log(result);
        if (result.status == 'success') {
          this.datalist = result.id;
              this.patientlist = this.datalist;
              console.log('this.patientlist under this userid');
              console.log(this.patientlist);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
}
