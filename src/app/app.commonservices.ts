import {Injectable} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
  url: any;
    phpurl: any;
  hostis: any;
  commonvalue: any;
  value = 2;
  public commonresultlimit: number;
    public totalval: number=0;

  constructor(private http: HttpClient) {
    this.hostis = window.location.host;
    console.log(this.hostis);
   // this.url = 'https://influxiq.com:3020/';
  //  this.url = 'http://greenvalleyportal.com:3020/';
      this.url = 'https://greenvalleyportal.com/server.php?q=';
      this.phpurl = 'https://greenvalleyportal.com/';
      this.commonresultlimit = 100000000000000;
      this.totalval=0;
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
        name1: 'ALTUS HEALTH CARE',
        shortform: 'AHG',
        name2: 'Altus',
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
        adminemail: 'greenvalleyhealthgroup.com',
        trainingstepvariable: 'Greenvalley',
        CGXInformation2018: 'GreenvalleyCGXInformation2018',
        CGXCallScript: 'GreenValleyCGXCallScript',
        TestProcess2018: 'GreenvalleyTestProcess2018',
        dailer: 'Agent_manual_2.7 version 080718',
        advocate: 'Patient_Advocate_Flow_Chart',
        FLyer: 'GreenValley_Flyer',
        sop001: 'SOP_001_CRM_Training_Test_PPS_Data_Entry',
        sop002: 'SOP_002_HELP_DESK_INTERNAL_PA_SUPPORT_Line',
        Troubleshooting: 'Greenvalley_Headset_troubleshooting',
       // address1: '722 Weiland Rd Rochester',
        address1: '722 Weiland Road Rochester',
        address2: 'NY 14626',
        name1: 'Greenvalley Health',
        shortform: 'GVH',
          name2: 'Greenvalley',
      };
    }
  }
}
