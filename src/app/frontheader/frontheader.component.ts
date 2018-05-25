import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {Http} from '@angular/http';

@Component({
  selector: 'app-frontheader',
  templateUrl: './frontheader.component.html',
  styleUrls: ['./frontheader.component.css'],
    providers: [Commonservices],
})
export class FrontheaderComponent implements OnInit {
    public comingsoonmodal;
    public addcookie: CookieService;
    public cookiedetails;

    constructor( addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('from frontheader');
        console.log(this.cookiedetails);
    }

  ngOnInit() {
  }
    onHidden() {
        this.comingsoonmodal = false;

    }
    openmodal() {
        this.comingsoonmodal = true;
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/log-in']);
    }
}
