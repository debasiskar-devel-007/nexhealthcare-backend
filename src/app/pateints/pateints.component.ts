import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-pateints',
  templateUrl: './pateints.component.html',
  styleUrls: ['./pateints.component.css'],
    providers: [Commonservices],
})
export class PateintsComponent implements OnInit {
    public serverurl;
    public datalist;
    public isthisadmin;
    public p: number = 1;
  public addcookie: CookieService;
  public cookiedetails;
  public tags;
  public patientlist: any = [];
  public dataForm1: FormGroup ;
  public pateintquestioniremodal: boolean = false;
  public fb;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
      this.fb = fb;
       // this.getPatientList();
     // console.log('this.isthisadmin**************');
     // console.log(this.isthisadmin);
    //  if (this.isthisadmin != 'admin') {
      this.addcookie = addcookie ;
      this.cookiedetails = this.addcookie.getObject('cookiedetails');
    //  console.log(this.cookiedetails);
     // this.getpatientlistunderthisid();
    //  }
      this.alltags();
    }
  showquestionaryform(itemid) {
    let link = this.serverurl + 'getpatientdetailsbypatientid';
    let data = {patientid : itemid};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log(result.id);
          let userdet = result.id;
          this.dataForm1 = this.fb.group({
            cgx1: [userdet.cgx],
            firstname1: [userdet.firstname],
            lastname1: [userdet.lastname],
            phone1: [userdet.phone],
            address1: [userdet.address],
            city1: [userdet.city],
            state1: [userdet.state],
            zip1: [userdet.zip],
            dob1: [userdet.dob],
            gender1: [userdet.gender],
            race1: [userdet.race],
            height1: [userdet.height],
            width1: [userdet.width],
            allergies1: [userdet.allergies],
            medicareclaim1: [userdet.medecareclaim],
            notes1: [userdet.notes1],
            notes2: [userdet.notes2],
            notes3: [userdet.notes3],
            notes4: [userdet.notes4],
            pharmacyinsurancename: [userdet.pharmacyinsurancename],
            pharmacyid: [userdet.pharmacyid],
            pharmacybin: [userdet.pharmacybin],
            pharmacypcn: [userdet.pharmacypcn],
            pharmacygroup: [userdet.pharmacygroup],
            pharmacyhistory: [userdet.pharmacyhistory],
            pharmacyissue: [userdet.pharmacyissue],
            pharmacytreatment: [userdet.pharmacytreatment],
            topicalpain: [userdet.topicalpain],
            oralpain: [userdet.oralpain],
            derma: [userdet.derma],
            migrane: [userdet.migrane],
            phtype1: [userdet.phtype1],
            phtype2: [userdet.phtype2],
            phage: [userdet.phage],
            motype1: [userdet.motype1],
            motype2: [userdet.motype2],
            moage: [userdet.moage],
            modead: [userdet.modead],
            fatype1: [userdet.fatype1],
            fatype2: [userdet.fatype2],
            faage: [userdet.faage],
            fadead: [userdet.fadead],
            dautype1: [userdet.dautype1],
            dautype2: [userdet.dautype2],
            dauage: [userdet.dauage],
            daudead: [userdet.daudead],
            sontype1: [userdet.sontype1],
            sontype2: [userdet.sontype2],
            sonage: [userdet.sonage],
            sondead: [userdet.sondead],
            brotype1: [userdet.brotype1],
            brotype2: [userdet.brotype2],
            broage: [userdet.broage],
            brodead: [userdet.brodead],
            sistype1: [userdet.sistype1],
            sistype2: [userdet.sistype2],
            sisage: [userdet.sisage],
            sisdead: [userdet.sisdead],
            neptype1: [userdet.neptype1],
            neptype2: [userdet.neptype2],
            nepage: [userdet.nepage],
            nepdead: [userdet.nepdead],
            niecetype1: [userdet.niecetype1],
            niecetype2: [userdet.niecetype2],
            nieceage: [userdet.nieceage],
            niecedead: [userdet.niecedead],
            unctype1: [userdet.unctype1],
            unctype2: [userdet.unctype2],
            uncage: [userdet.uncage],
            uncdead: [userdet.uncdead],
            autntype1: [userdet.autntype1],
            autntype2: [userdet.autntype2],
            autnage: [userdet.autnage],
            autndead: [userdet.autndead],
            moftype1: [userdet.moftype1],
            moftype2: [userdet.moftype2],
            mofage: [userdet.mofage],
            mofdead: [userdet.mofdead],
            momotype1: [userdet.momotype1],
            momotype2: [userdet.momotype2],
            momoage: [userdet.momoage],
            momodead: [userdet.momodead],
            daftype1: [userdet.daftype1],
            daftype2: [userdet.daftype2],
            dafage: [userdet.dafage],
            dafdead: [userdet.dafdead],
            damtype1: [userdet.damtype1],
            damtype2: [userdet.damtype2],
            damage: [userdet.damage],
            damdead: [userdet.damdead],
            oth1type1: [userdet.oth1type1],
            oth1type2: [userdet.oth1type2],
            oth1age: [userdet.oth1age],
            oth1dead: [userdet.oth1dead],
            oth2type1: [userdet.oth2type1],
            oth2type2: [userdet.oth2type2],
            oth2age: [userdet.oth2age],
            oth2dead: [userdet.oth2dead],
            oth3type1: [userdet.oth3type1],
            oth3type2: [userdet.oth3type2],
            oth3age: [userdet.oth3age],
            oth3dead: [userdet.oth3dead],
            pgx1: [userdet.pgx1],
            pgx2: [userdet.pgx2],
            pgx3: [userdet.pgx3],
            pgx4: [userdet.pgx4],
            pgx5: [userdet.pgx5],
            pgx6: [userdet.pgx6],
            pgx7: [userdet.pgx7],
            pgx8: [userdet.pgx8],
            pgx9: [userdet.pgx9],
            pgx10: [userdet.pgx10],
            pgx11: [userdet.pgx11],
            pgx12: [userdet.pgx12],
            pgx13: [userdet.pgx13],
            pgx14: [userdet.pgx14],
            pgx15: [userdet.pgx15],
            pgx16: [userdet.pgx16],
            pgx17: [userdet.pgx17],
            pgx18: [userdet.pgx18],
            pgx19: [userdet.pgx19]
          });
        } else {
          // this.router.navigate(['/patient-list']);
        }
      }, error => {
        console.log('Ooops');
      });
    this.pateintquestioniremodal = true;
  }
  onHidden() {
    this.pateintquestioniremodal = false;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isthisadmin = params['id'];
     // console.log(this.isthisadmin);
    });
    if (this.isthisadmin == 'admin') {
      console.log('this.isthisadmin**************');
       console.log(this.isthisadmin);
    this.getPatient_addedbyList();
    }
    else {
      console.log('this.isthisadmin@@@@@@@@');
       console.log(this.isthisadmin);
      this.getpatientlistunderthisid();
    }
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

  showtagnme(tagid) {
    if (tagid != null) {
      for (let i in this.tags) {
        if (this.tags[i]._id == tagid) {
          return this.tags[i].tagname;
        }
      }
    }
  }

  /*   getPatientList() {
        let link = this.serverurl + 'patientList';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.datalist = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }*/

  // admin call to patientlist
  getPatient_addedbyList() {
    this.patientlist = [];
        let link = this.serverurl + 'patient_addedbylist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result.id);
                    this.datalist = result.id;
                  for (let j in this.datalist) {
                    if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                      console.log('inside');
                    if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                      this.patientlist.push(this.datalist[j]);
                    }
                  }
                  }
                }

            }, error => {
              console.log('Oooops!');
            });
        console.log('this.patientlist----------');
        console.log(this.patientlist);
  }
  gotopatientrecord(id) {
    this.router.navigate(['/patientrecord', id]);
  }
  get4rowClass() {
    if (this.isthisadmin != 'admin') {
      return 'pateints_list_weraper4row';
    }
  }
  approveit(patientid) {
    let link = this.serverurl + 'patientapprove';
    let data = {
      patientid: patientid,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success') {
          if (this.isthisadmin == 'admin') {
            this.getPatient_addedbyList();
          }
          else {
            this.getpatientlistunderthisid();
          }
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  declineit(patientid) {
    let link = this.serverurl + 'patientdecline';
    let data = {
      patientid: patientid,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success') {
          if (this.isthisadmin == 'admin') {
            this.getPatient_addedbyList();
          }
          else {
            this.getpatientlistunderthisid();
          }
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  // user call to patientlist
  getpatientlistunderthisid() {
    let link = this.serverurl + 'getpatientlistunderthisid';
    let data = {
      userid: this.cookiedetails.id,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        // console.log('result');
        //  console.log(result);
        if (result.status == 'success') {
          this.datalist = result.id;
              this.patientlist = this.datalist;
              console.log('this.patientlist under this userid');
              console.log(this.patientlist);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
}
