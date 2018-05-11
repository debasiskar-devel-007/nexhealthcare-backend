import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices';
declare var $: any;

@Component({
  selector: 'app-trainingstep',
  templateUrl: './trainingstep.component.html',
  styleUrls: ['./trainingstep.component.css'],
    providers: [Commonservices],
})
export class TrainingstepComponent implements OnInit {
  public vindex: any = 0;
    private addcookie: CookieService;
    private cookiedetails;
    public serverurl;
    public gonextmodal: boolean = false;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('trainingstep get cookie');
        console.log(this.cookiedetails);
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {

    }
    ngAfterViewChecked() {
      let vindex=this.vindex;
       /* console.log("$('#tspan').text()");
        console.log($('#tspan').text());
        console.log($('#tspan').html());*/
        document.getElementById('video1').addEventListener('loadedmetadata', function() {
          console.log('vindex');
          console.log(vindex);
           if(vindex==1) this.currentTime = 50;
           else this.pause();
        }, true);

        vindex++;
        var aud = document.getElementById('video1');
        aud.onended = function(e) {
            console.log('The audio has ended');
            setTimeout(()=> {
                $('video').get(0).pause();
                // $('video').get(1).pause();
                aud.load();
                aud.pause();
                aud.currentTime=58;
                aud.pause();
                $('video').find('source').attr('src', '');
                this.gonextmodal = true;
                $('#modalcall').click();
                console.log('aud');
                console.log(aud);
            }, 1000);
        };
        $('video').get(0).play();
    }
    calllogout() {
        var aud = document.getElementById("video1");
        console.log(aud.currentTime);
        let link = this.serverurl + 'trainingvideostatus';
        let data = {
            userid: this.cookiedetails.id,
            timeindex: aud.currentTime,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.addcookie.removeAll();
                    this.router.navigate(['/']);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    onHidden() {
        this.gonextmodal = false;
    }

    callreplay() {
        let link = this.serverurl + 'trainingvideostatusforreplay';
        let data = {
            userid: this.cookiedetails.id,
            timeindex: 'c',
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    location.reload();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    demomodal() {
    this.gonextmodal = true;
    }
    calldashboard() {
        let link = this.serverurl + 'trainingvideostatus';
        let data = {
            userid: this.cookiedetails.id,
            timeindex: 'c',
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                }
            }, error => {
                console.log('Oooops!');
            });
      if (this.cookiedetails.type == 'salesrep') {
        this.router.navigate(['/salesrepdashboard']);
      }
      else {
          this.router.navigate(['/recruiterdashboard']);
      }
    }
}
