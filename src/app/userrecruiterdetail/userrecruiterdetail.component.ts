import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-userrecruiterdetail',
    templateUrl: './userrecruiterdetail.component.html',
    styleUrls: ['./userrecruiterdetail.component.css'],
    providers: [Commonservices],
})
export class UserrecruiterdetailComponent implements OnInit {
    public serverurl;
    public userrecruitterdetails;
    public id;
    public type;

    constructor( private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsbyid();
        });
    }
    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log(result.id);
                    this.userrecruitterdetails = result.id;
                    this.type = result.id.type;
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }
}
