import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recruiterdashboard',
  templateUrl: './recruiterdashboard.component.html',
  styleUrls: ['./recruiterdashboard.component.css']
})
export class RecruiterdashboardComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
    constructor( addcookie: CookieService, private router: Router) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
    }

    ngOnInit() {
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/']);
    }
}
