import { Component, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
