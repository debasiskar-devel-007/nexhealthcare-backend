import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-usermanagementlist',
  templateUrl: './usermanagementlist.component.html',
  styleUrls: ['./usermanagementlist.component.css'],
    providers: [Commonservices],
})
export class UsermanagementlistComponent implements OnInit {
    public serverurl;
    public datalist;
    public specificlist: any = [];
    public tags;

    constructor(private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.getUserList();
        this.alltags();
    }
    ngOnInit() {

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
                    this.specificlist = this.datalist;
                /*    if (this.typeis == 'salesrep') {
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
                    }*/
                }

            }, error => {
                console.log('Oooops!');
            });
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
    showtagname(tagid) {
        for (let i in this.tags) {
            if (this.tags[i]._id == tagid) {
                return this.tags[i].tagname;
            }
        }
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
}
