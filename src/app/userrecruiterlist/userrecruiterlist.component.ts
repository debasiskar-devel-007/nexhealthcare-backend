import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-userrecruiterlist',
    templateUrl: './userrecruiterlist.component.html',
    styleUrls: ['./userrecruiterlist.component.css'],
    providers: [Commonservices],
})
export class UserrecruiterlistComponent implements OnInit {
    public serverurl;
    public datalist;
    public typeis;
    public specificlist: any = [];
    public p: number = 1;

    constructor(private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.typeis = params['id'];
            console.log(this.typeis);
            this.getUserList();
        });
    }
    markasdone(itemid) {
        let link = this.serverurl + 'markasdone';
        let data = {
            userid: itemid,
            iswebinarchekced : 1,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    this.getUserList();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    getUserList() {
        let link = this.serverurl + 'user&repcontractList';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.datalist = result.id;
                    this.specificlist = [];
                    if (this.typeis == 'salesrep') {
                        for (let i in result.id) {
                            if (result.id[i].type == 'salesrep') {
                                this.specificlist.push(result.id[i]);
                            }
                        }
                    }
                    if (this.typeis == 'leadmanager') {
                        for (let i in result.id) {
                            if (result.id[i].type == 'leadmanager') {
                                this.specificlist.push(result.id[i]);
                            }
                        }
                    }
                    if (this.typeis == 'masteraccount') {
                        for (let i in result.id) {
                            if (result.id[i].type == 'masteraccount') {
                                this.specificlist.push(result.id[i]);
                            }
                        }
                    }
                }

            }, error => {
                console.log('Oooops!');
            });
    }

}
