import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';

@Component({
    selector: 'app-completewebinar',
    templateUrl: './completewebinar.component.html',
    styleUrls: ['./completewebinar.component.css'],
  providers: [Commonservices],
})
export class CompletewebinarComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
    constructor( addcookie: CookieService, private router: Router, public _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        } else {}
    }

    ngOnInit() {
    }
    callogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/log-in']);
    }
}
