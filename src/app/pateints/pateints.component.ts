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
    public p: number = 1;
    constructor(private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.getPatientList();
    }

  ngOnInit() {
  }
    getPatientList() {
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
    }
}
