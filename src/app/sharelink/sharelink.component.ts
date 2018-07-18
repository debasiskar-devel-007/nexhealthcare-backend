import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
    selector: 'app-sharelink',
    templateUrl: './sharelink.component.html',
    styleUrls: ['./sharelink.component.css'],
  providers: [Commonservices],
})
export class SharelinkComponent implements OnInit {
  public serverhost;
  public copiedmodal: boolean = false;

    constructor(private _http: Http, private router: Router, public  _commonservices: Commonservices) {
      this.serverhost = _commonservices.hostis;
    }

    ngOnInit() {
    }
  callfunc() {
    //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
    return 'http://' + this.serverhost + '/#/sign-up';
  }
  callfunc1() {
    //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
    return 'http://' + this.serverhost + '/#/cgx';
  }
  callfunc2() {
    //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
    return 'http://' + this.serverhost + '/#/landing';
  }
  showcopied() {
    this.copiedmodal = true;
    setTimeout(() => {
      this.copiedmodal = false;
    }, 2000);
  }
}
