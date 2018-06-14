import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-patientlistrecordview',
  templateUrl: './patientlistrecordview.component.html',
  styleUrls: ['./patientlistrecordview.component.css'],
    providers: [Commonservices],
})
export class PatientlistrecordviewComponent implements OnInit {
    public patientlist: any = [];
    public serverurl;
    public tags;

    constructor( private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.alltags();
        this.getPatient_addedbyList();
    }

  ngOnInit() {
  }
    getPatient_addedbyList() {
        this.patientlist = [];
        let link = this.serverurl + 'patient_addedbylist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result.id);
                    this.patientlist = result.id;
                    /* for (let j in this.datalist) {
                         if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                             console.log('inside');
                             if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                                 this.patientlist.push(this.datalist[j]);
                             }
                         }
                     }*/
                }

            }, error => {
                console.log('Oooops!');
            });
        console.log('this.patientlist----------');
        console.log(this.patientlist);
    }
    alltags() {
        let link = this.serverurl + 'alltags';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.tags = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }

    showtagnme(tagid) {
        if (tagid != null) {
            for (let i in this.tags) {
                if (this.tags[i]._id == tagid) {
                    return this.tags[i].tagname;
                }
            }
        }
    }
}
