import {Injectable} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
  url: any;
  hostis: any;
  commonvalue: any;
  value = 1;

  constructor(private http: HttpClient) {
    this.hostis = window.location.host;
    console.log(this.hostis);
    this.url = 'http://influxiq.com:3020/';
    if (this.value == 1) {
      this.commonvalue = {
        mailfrom: 'ALtus Health Group',
        mailid: 'support@altushealthgroup.com',
        indextitle: 'altushealth',
        title: 'Altus Health',
        title1: 'Altushealth',
        commonurl: 'altushealthgroup.com',
        name: 'ALTUS HEALTH GROUP',
        webpagelink: 'www.altushealthgroup.com',
        adminemail: 'altushealth.com',
        trainingstepvariable: 'Altus',
        CGXInformation2018: 'AltusCGXInformation2018',
        CGXCallScript: 'AltusCGXCallScript',
        TestProcess2018: 'AltusTestProcess2018',
        FLyer: 'Altus_FLyer',
        address1: '610 West Congress Street',
        address2: 'Detroit, Michigan 48226',
      };
    }
    else {
      this.commonvalue = {
        mailfrom: 'Greenvalley Portal',
        mailid: 'support@greenvalleyportal.com',
        indextitle: 'greenvalley',
        title: 'Green Valley',
        title1: 'Greenvalley',
        commonurl: 'greenvalleyportal.com',
        name: 'GREENVALLEY PORTAL',
        webpagelink: 'www.greenvalleyportal.com',
        adminemail: 'greenvalleyportal.com',
        trainingstepvariable: 'Greenvalley',
        CGXInformation2018: 'GreenvalleyCGXInformation2018',
        CGXCallScript: 'GreenValleyCGXCallScript',
        TestProcess2018: 'GreenvalleyTestProcess2018',
        FLyer: 'GreenValley_Flyer',
        address1: '722 Weiland Rd Rochester',
        address2: 'NY 14626',
      };
    }
  }
}
