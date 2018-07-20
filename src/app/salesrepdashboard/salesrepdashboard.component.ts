import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var moment: any;
declare var $: any;

@Component({
    selector: 'app-salesrepdashboard',
    templateUrl: './salesrepdashboard.component.html',
    styleUrls: ['./salesrepdashboard.component.css'],
    providers: [Commonservices],
})
export class SalesrepdashboardComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public comingsoonmodal;
    public serverurl;
    public recdetails;
    public datalist;
    public logintime;
    public signuptime;
    public patientaccepted;
    public patientdeclined ;
//  public iscompletedccsrecord = 0;
    public patientsubmitted ;
    public patientlist ;
    public patientlistoriginalforhelpdesk = [] ;
    public patientlistoriginalforhelpdeskcopy = [] ;
    public patientlistforhelpdesk ;
    public patientacceptednumber: number = 0;
    public patientdeclinednumber: number = 0;
    public patientsubmittednumber: number = 0;
    public filterval;
    public filterval1;
    public patientdetails;
    public patientuniqueid;
    public repuniqueid;
    public patientidtotakeownership;
    public tagid;
    public p: number = 1;
    public openasigneemodal: boolean = false;
    public openasigneesuccessmodal: boolean = false;
  public pateintquestioniremodal: boolean = false;
  public dataForm1: FormGroup ;
  public fb;
  public showheatmapeditdiv = 0;
  public planbcard: any = '';
  public showquestionarydiv: boolean = false;
  public showdeg: any =[];
  public usastates;
  public showflag = 0;
  public dataForm2: FormGroup ;
  public opensymptommodalflag: boolean = false;

    constructor( fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('this.cookiedetails+++++++++++');
        console.log(this.cookiedetails);
      this.fb = fb;
        this.serverurl = _commonservices.url;
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        } else {
            this.getrecdetails();
            if (this.cookiedetails.type == 'superadmin') {
                this.totalnoofpatients();
                this.getPatient_addedbyList();
            }
            else {
                this.getpatientlistunderthisid();
            }
        }
        this.getPatientListforhelpdesk();
      this.getusastates();
    }

    ngOnInit() {
      this.dataForm1 = this.fb.group({
        cgx1: [''],
        pgxval: [''],
        firstname1: [''],
        lastname1: [''],
        phone1: [''],
        address1: [''],
        city1: [''],
        state1: [''],
        zip1: [''],
        dob1: [''],
        gender1: [''],
        race1: [''],
        height1: [''],
        width1: [''],
        allergies1: [''],
        medicareclaim1: [''],
        notes1: [''],
        notes2: [''],
        notes3: [''],
        notes4: [''],
        pharmacyinsurancename: [''],
        pharmacyid: [''],
        pharmacybin: [''],
        pharmacypcn: [''],
        pharmacygroup: [''],
        pharmacyhistory: [''],
        pharmacyissue: [''],
        pharmacytreatment: [''],
        topicalpain: [''],
        oralpain: [''],
        derma: [''],
        migrane: [''],
        insurance1: ['' ],
        insurance2: [''  ],
        insurance3: [''  ],
        insurance4: [''  ],
        planbcard: [''],
        medicarepolicyno: [''],
        mediprimarypolicy: [''],
        comprimarypolicy: [''],
        /*   phtype1: ['', Validators.required],*/
        phtype1: [''],
        /* phtype2: [''],*/
        phage: [''],
        motype1: [''],
        /* motype2: [''],*/
        moage: [''],
        modead: [''],
        fatype1: [''],
        /* fatype2: [''],*/
        faage: [''],
        fadead: [''],
        dautype1: [''],
        /*  dautype2: [''],*/
        dauage: [''],
        daudead: [''],
        sontype1: [''],
        /* sontype2: [''],*/
        sonage: [''],
        sondead: [''],
        brotype1: [''],
        /*  brotype2: [''],*/
        broage: [''],
        brodead: [''],
        sistype1: [''],
        /* sistype2: [''],*/
        sisage: [''],
        sisdead: [''],
        neptype1: [''],
        /*  neptype2: [''],*/
        nepage: [''],
        nepdead: [''],
        niecetype1: [''],
        /*  niecetype2: [''],*/
        nieceage: [''],
        niecedead: [''],
        unctype1: [''],
        /*  unctype2: [''],*/
        uncage: [''],
        uncdead: [''],
        autntype1: [''],
        /*  autntype2: [''],*/
        autnage: [''],
        autndead: [''],
        moftype1: [''],
        /*   moftype2: [''],*/
        mofage: [''],
        mofdead: [''],
        momotype1: [''],
        /* momotype2: [''],*/
        momoage: [''],
        momodead: [''],
        daftype1: [''],
        /* daftype2: [''],*/
        dafage: [''],
        dafdead: [''],
        damtype1: [''],
        /*  damtype2: [''],*/
        damage: [''],
        damdead: [''],
        oth1type1: [''],
        /* oth1type2: [''],*/
        oth1age: [''],
        oth1dead: [''],
        oth2type1: [''],
        /* oth2type2: [''],*/
        oth2age: [''],
        oth2dead: [''],
        oth3type1: [''],
        /* oth3type2: [''],*/
        oth3age: [''],
        oth3dead: [''],
        pgx1: [''],
        pgx2: [''],
        pgx3: [''],
        pgx4: [''],
        pgx5: [''],
        pgx6: [''],
        pgx7: [''],
        pgx8: [''],
        pgx9: [''],
        pgx10: [''],
        pgx11: [''],
        pgx12: [''],
        pgx13: [''],
        pgx14: [''],
        pgx15: [''],
        pgx16: [''],
        pgx17: [''],
        pgx18: [''],
        /*  pgx19: [''],*/
        carrier: [''],
        carrierplan: [''],
        carrierpolicyno: [''],
        cancer_sup: [''  ],
        catheters_sup: [''  ],
        allergies_sup: ['' ],
        scooter_sup: [''],
        walker_sup: [''],
        braces_sup: ['' ],
        topical_sup: ['' ],
        pain_sup: [''],
        wound_sup: [''],
        diabetic_sup: ['' ],
        familyrelation1: [''],
        familyrelation2: [''],
        familyrelation3: [''],
        familyrelation4: [''],
        familyrelation5: [''],
        familyrelation6: [''],
        familyrelation7: [''],
        familyrelation8: [''],
        familyrelation9: [''],
        familyrelation10: [''],
        familyrelation11: [''],
        familyrelation12: [''],
        familyrelation13: [''],
        familyrelation14: [''],
        familyrelation15: [''],
        familyrelation16: [''],
        familyrelation17: [''],
        relation1: [''],
        relation2: [''],
        relation3: [''],
        relation4: [''],
        relation5: [''],
        relation6: [''],
        relation7: [''],
        relation8: [''],
        relation9: [''],
        relation10: [''],
        relation11: [''],
        relation12: [''],
        relation13: [''],
        relation14: [''],
        relation15: [''],
        relation16: [''],
        relation17: [''],
        relation18: [''],
        degree1: [''],
        degree2: [''],
        degree3: [''],
        degree4: [''],
        degree5: [''],
        degree6: [''],
        degree7: [''],
        degree8: [''],
        degree9: [''],
        degree10: [''],
        degree11: [''],
        degree12: [''],
        degree13: [''],
        degree14: [''],
        degree15: [''],
        degree16: [''],
        degree17: [''],
        degree18: [''],
        image: [''],
        phname: [''],
        familyrelation1name: [''],
        familyrelation2name: [''],
        familyrelation3name: [''],
        familyrelation4name: [''],
        familyrelation5name: [''],
        familyrelation6name: [''],
        familyrelation7name: [''],
        familyrelation8name: [''],
        familyrelation9name: [''],
        familyrelation10name: [''],
        familyrelation11name: [''],
        familyrelation12name: [''],
        familyrelation13name: [''],
        familyrelation14name: [''],
        familyrelation15name: [''],
        familyrelation16name: [''],
        familyrelation17name: ['']
      });
      this.dataForm2 = this.fb.group({
        weightloss: [''],
        appetite: [''],
        eatingdisorder: [''],
        unabdominalpain: [''],
        upabdominalpain: [''],
        ruquadrantpain: [''],
        luquadrantpain: [''],
        labdominalpain: [''],
        rlquadrantpain: [''],
        llquadrantpain: [''],
        gabdominalpain: [''],
        vomiting1: [''],
        vomiting2: [''],
        vomiting3: [''],
        chronicfatigue: [''],
        otherfatigue: [''],
        anemia: [''],
        jaundice: [''],
        fatigue1: [''],
        fatigue2: [''],
        type1diabetes: [''],
        type2diabetes: [''],
        constipation: [''],
        abnormalweightloss: [''],
        abnormalweightgain: [''],
        hypertrophicdisorders: [''],
        bloodinstool: [''],
        skineruption: [''],
        xerosiscutis: [''],
        lumpinbreast: [''],
        thickeningbreast: [''],
        disordersofbreast: [''],
        rednessnipple: [''],
        nipplepain: [''],
        nippledischarge: [''],
        breastsize: [''],
        breastpain: [''],
        uterinebleeding: [''],
        bloodinurine: [''],
        melena: [''],
        stomachpainabdominalpain: [''],
        bowelhabits: [''],
        unconstipation: [''],
        diarrhea: [''],
        colonpolyps: [''],
        rectalbleeding: [''],
        abdominalbloating1: [''],
        abdominalbloating2: [''],
        idefecation: [''],
        ofecalabnormalities: [''],
        pancreaticuabdominalpain: [''],
        cholecystitis1: [''],
        cholecystitis2: [''],
        noofbloodclots: [''],
      });
    }
    calllogout() {
        this.addcookie.removeAll();
        this.router.navigate(['/log-in']);
    }
  editheatmap(i) {
      console.log('coloradd' + i);
   //   this.showheatmapeditdiv = 1-this.showheatmapeditdiv;
    $('.td_color_con').addClass('hide');
    $('.coloradd' + i).removeClass('hide');
  }
  getusastates() {
    let link = this.serverurl + 'getusastates';
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        this.usastates = result;

      }, error => {
        console.log('Oooops!');
      });
  }
    openmodal() {
        this.comingsoonmodal = true;
    }
    // admin call to patientlist
    getPatient_addedbyList() {
        this.patientlist = [];
        let link = this.serverurl + 'patient_addedbylist_only6';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log('patient_addedbylist_only6++++++++++++++');
                    console.log(result.id);
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
                    /*for (let j in this.datalist) {
                        if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                            console.log('inside');
                            if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                                this.patientlist.push(this.datalist[j]);
                            }
                        }
                    }*/
                }

            }, error => {
                console.log('Oooops!');
            });
        console.log('this.patientlist----------');
        console.log(this.patientlist);
    }
    // user call to patientlist
    getpatientlistunderthisid() {
        let link = this.serverurl + 'getpatientlistunderthisid_only6';
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

                    for (let i in this.patientlist) {
                        if (this.patientlist[i].Tagdetail[0] != null) {
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1b3fe08865e7955f71') {
                                this.patientacceptednumber = this.patientacceptednumber + 1;
                            }
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1d3fe08865e7955f72') {
                                this.patientdeclinednumber = this.patientdeclinednumber + 1;
                            }
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0b9235b33cbc2d4af08dd9') {
                                this.patientsubmittednumber = this.patientsubmittednumber + 1;
                            }
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    // user call to patientlist for patient tags numbers
   /* totalnoofpatientsunderthisid() {
        let link = this.serverurl + 'gettotalnoofpatientsunderthisid';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].Tagdetail[0] != null) {
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1b3fe08865e7955f71') {
                                this.patientacceptednumber = this.patientacceptednumber + 1;
                            }
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1d3fe08865e7955f72') {
                                this.patientdeclinednumber = this.patientdeclinednumber + 1;
                            }
                            if (this.patientlist[i].Tagdetail[0].tagid == '5b0b9235b33cbc2d4af08dd9') {
                                this.patientsubmittednumber = this.patientsubmittednumber + 1;
                            }
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    gotopatientrecord(id, tagid) {
        if (tagid == '5b0bfa1b3fe08865e7955f71') {
            this.router.navigate(['/patientrecord', id, 1]); // accept
        }
        if (tagid == '5b0bfa1d3fe08865e7955f72') {
            this.router.navigate(['/patientrecord', id, 2]); // decline
        }
        if (tagid == '5b0cda8121eaaa0244d52b9e') {
            this.router.navigate(['/patientrecord', id, 3]); // lead
        }
        if (tagid == '5b0b9235b33cbc2d4af08dd9') {
            this.router.navigate(['/patientrecord', id, 4]); // pps submitted
        }
        if (tagid == '5afad90dde56b53d10e2ab4d') {
            this.router.navigate(['/patientrecord', id, 5]); // pf submitted
        }
        /* if ((tagid != '5b0bfa1b3fe08865e7955f71') && (tagid != '5b0bfa1d3fe08865e7955f72')) {
      this.router.navigate(['/patientrecord', id, 3]);
    }*/
    }

    getrecdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result');
                console.log(result);
                if (result.status == 'success') {
                    this.recdetails = result.id;
                    // console.log(this.recdetails);
                    // console.log(this.recdetails.logintime);
                    setTimeout(() => {
                        if (this.recdetails.logintime != null) {
                            this.logintime = moment(this.recdetails.logintime).format('DD-MM-YYYY');
                            this.signuptime = moment(this.recdetails.signuptime).format('DD-MM-YYYY');
                        }
                    }, 500);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    // for admin
    totalnoofpatients() {
        let link = this.serverurl + 'gettotalnoofpatients';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log('result');
                console.log(result);
                if (result.status == 'success') {
                    this.patientaccepted = result.accepted;
                    this.patientdeclined = result.declined;
                    this.patientsubmitted = result.submitted;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

/*    // user call to patientlist
    getpatientlistunderthisid() {
        let link = this.serverurl + 'getpatientlistunderthisid1';
        let data = {
            userid: this.cookiedetails.id,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.datalist = result.id;
                    this.patientlist = result.id;
                    console.log('this.patientlist under this userid');
                    console.log(this.patientlist);
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].Tagdetail[0] != null) {
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1b3fe08865e7955f71') {
                            this.patientacceptednumber = this.patientacceptednumber + 1;
                        }
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0bfa1d3fe08865e7955f72') {
                            this.patientdeclinednumber = this.patientdeclinednumber + 1;
                        }
                        if (this.patientlist[i].Tagdetail[0].tagid == '5b0b9235b33cbc2d4af08dd9') {
                            this.patientsubmittednumber = this.patientsubmittednumber + 1;
                        }
                    }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/
  showtime(time) {
    return moment(time).format('MM-DD-YYYY');
  }
    getPatientListforhelpdesk() {

      //  this.patientlistforhelpdesk = [];
        this.patientlistoriginalforhelpdesk = [];
        let link = this.serverurl + 'patient_addedbylist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                  //  console.log(result.id);
                    this.patientlistforhelpdesk = result.id;
                    console.log('===*********===');
                    console.log(this.patientlistforhelpdesk);
                     for (let j in this.patientlistforhelpdesk) {
                     if (this.patientlistforhelpdesk[j].helpdeskid==this.cookiedetails.id || this.patientlistforhelpdesk[j].helpdeskid==null) {
                     this.patientlistoriginalforhelpdesk.push(this.patientlistforhelpdesk[j]); // patients who are under this id or not assigned to any helpdesk
                     }

                     }
                    this.patientlistoriginalforhelpdeskcopy = this.patientlistoriginalforhelpdesk;
                  this.patientlistoriginalforhelpdesk.reverse();
                }

            }, error => {
                console.log('Oooops!');
            });
    }
    filterbyhitmap(val) {
      //  console.log(this.patientlistoriginalforhelpdesk);
      //  console.log('=============================');
      //  console.log(this.patientlistoriginalforhelpdeskcopy);
        this.patientlistoriginalforhelpdesk = [];
        if (val != 'ALL') {
            for (let i in this.patientlistoriginalforhelpdeskcopy) {
                if (this.patientlistoriginalforhelpdeskcopy[i].PatientRecordCompletedOrNot[0] != null) {
                    if (this.patientlistoriginalforhelpdeskcopy[i].PatientRecordCompletedOrNot[0].hit_map_value == val) {
                        this.patientlistoriginalforhelpdesk.push(this.patientlistoriginalforhelpdeskcopy[i]);
                    }
                }
            }
          this.patientlistoriginalforhelpdesk.reverse();
        }
        else {
            this.patientlistoriginalforhelpdesk = this.patientlistoriginalforhelpdeskcopy;
          this.patientlistoriginalforhelpdesk.reverse();
        }
    }
    getHitmapClass(val) {
        /*   if (this.filterhitmap == 'RED') {
         return 'active_filter';
         }
         if (val == 2) {
         return 'active_filter';
         }if (val == 3) {
         return 'active_filter';
         }if (val == 4) {
         return 'active_filter';
         }*/
    }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
    }
    takeownership(patientid, tagid) {
        this.patientidtotakeownership = patientid;
        this.tagid = tagid;
        this.openasigneemodal = true;
    }
    onHidden() {
        this.openasigneemodal = false;
        this.openasigneesuccessmodal = false;
      this.comingsoonmodal = false;
      this.pateintquestioniremodal = false;
      this.opensymptommodalflag = false;
    }
    assigneit() {
        let link= this.serverurl + 'assignehelpdesktopatient';
        let data = {
            patientid: this.patientidtotakeownership,
            helpdeskid: this.cookiedetails.id,
        };
        console.log(data);
        this._http.post(link, data)
            .subscribe(data => {
                let result = data.json();
                if (result.status == 'success') {
                this.openasigneemodal = false;
               // this.openasigneesuccessmodal = true;
                  this.gotopatientrecord(this.patientidtotakeownership, this.tagid);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
  dontassigneit() {
    this.gotopatientrecord(this.patientidtotakeownership, this.tagid);
  }
  hitmapupdate(patientid , val) {
    let link = this.serverurl + 'hitmapupdate';
      if (val == 1) { // red
        var data = {
          patientid: patientid,
          hit_map_value: 'RED',
        };
      }
      if (val == 2) { // green
        var data = {
          patientid: patientid,
          hit_map_value: 'GREEN',
        };
      }
      if (val == 3) { // yellow
        var data = {
          patientid: patientid,
          hit_map_value: 'YELLOW',
        };
      }
    this._http.post(link, data)
      .subscribe(data => {
        let result = data.json();
        if (result.status == 'success') {
          this.getPatientListforhelpdesk();
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  gotopdf(id) {
    var url = 'http://' + this._commonservices.commonvalue.commonurl + '/testpdf/html2pdf/ppqformpdf.php?id=' + id;
    window.open(url, '_blank');
  }

  getdetails(id) {
    let link = this.serverurl + 'getpatientdetails';
    let data = {_id : id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          console.log('getpatientdetails-------');
          console.log(result);
          this.patientdetails = result.item;
          this.patientuniqueid = result.item.uniqueid;
          this.getrepid(result.item.addedby);
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  getrepid(itemid) {
    let link = this.serverurl + 'getrepdetails';
    let data = {_id : itemid};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          this.repuniqueid = result.item.uniqueid;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  show(val) {
    let familyval = 'familyrelation' + val;
    if ($('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Daughter') {
      this.showdeg[val] = '(1st Degree)';
    }
    else if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother') {
      this.showdeg[val] = '(2nd Degree)';
    }
    else {
      this.showdeg[val] = '(3rd Degree)';
    }
  }
  showquestionaryform(itemid) {
    this.getdetails(itemid);
    let link = this.serverurl + 'getpatientdetailsbypatientid';
    let data = {patientid : itemid};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          let userdet = result.id;
          console.log('-------');
          console.log(userdet);
          if (userdet.planbcard == 1) {
            var putplanbcard = 'yes';
          } if (userdet.planbcard == 0) {
            var putplanbcard = 'no';
          }
          if (userdet.mediprimarypolicy == 1) {
            var putmediprimarypolicy = 'yes';
          } if (userdet.mediprimarypolicy == 0) {
            var putmediprimarypolicy= 'no';
          }
          if (userdet.comprimarypolicy == 1) {
            var putcomprimarypolicy = 'yes';
          } if (userdet.comprimarypolicy == 0) {
            var putcomprimarypolicy = 'no';
          }
          if (userdet.cancer_sup == 1) {
            var putcancer_sup = 'yes';
            this.showquestionarydiv = true;
            setTimeout(() => {
              $( '.pateintquestionire_div2_left2_contain' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
              });

              $( '.pateintquestionire_div2_left2_contain' ).find('select').each(function() {
                $(this).attr( 'disabled', 'disabled' );
              });

            }, 500);
          }  if (userdet.cancer_sup == 0) {
            var putcancer_sup = 'no';
            this.showquestionarydiv = false;
          }
          if (userdet.catheters_sup == 1) {
            var putcatheters_sup = 'yes';
          }  if (userdet.catheters_sup == 0) {
            var putcatheters_sup = 'no';
          }
          if (userdet.allergies_sup == 1) {
            var putallergies_sup = 'yes';
          }  if (userdet.allergies_sup == 0) {
            var putallergies_sup = 'no';
          }
          if (userdet.scooter_sup == 1) {
            var putscooter_sup = 'yes';
          }  if (userdet.scooter_sup == 0) {
            var putscooter_sup = 'no';
          } if (userdet.walker_sup == 1) {
            var putwalker_sup = 'yes';
          } if (userdet.walker_sup == 0) {
            var putwalker_sup = 'no';
          }
          if (userdet.braces_sup == 1) {
            var putbraces_sup = 'yes';
          }  if (userdet.braces_sup == 0) {
            var putbraces_sup = 'no';
          }
          if (userdet.topical_sup == 1) {
            var puttopical_sup = 'yes';
          } if (userdet.topical_sup == 0) {
            var puttopical_sup = 'no';
          }
          if (userdet.pain_sup == 1) {
            var putpain_sup = 'yes';
          }  if (userdet.pain_sup == 0) {
            var putpain_sup = 'no';
          }
          if (userdet.wound_sup == 1) {
            var putwound_sup = 'yes';
          }
          if (userdet.wound_sup == 0) {
            var putwound_sup = 'no';
          }
          if (userdet.diabetic_sup == 1) {
            var putdiabetic_sup = 'yes';
          }
          if (userdet.diabetic_sup == 0) {
            var putdiabetic_sup = 'no';
          }
          if (userdet.insurance1 == true || userdet.insurance3 == true) {
            this.disableit();
          }
          this.dataForm1 = this.fb.group({
            cgx1: [userdet.cgx],
            pgxval: [userdet.pgxval],
            firstname1: [userdet.firstname, Validators.required],
            lastname1: [userdet.lastname, Validators.required],
            phone1: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            address1: [userdet.address, Validators.required],
            city1: [userdet.city, Validators.required],
            state1: [userdet.state, Validators.required],
            zip1: [userdet.zip, Validators.required],
            dob1: [userdet.dob, Validators.required],
            gender1: [userdet.gender, Validators.required],
            race1: [userdet.race, Validators.required],
            height1: [userdet.height, Validators.required],
            width1: [userdet.width, Validators.required],
            allergies1: [userdet.allergies],
            medicareclaim1: [userdet.medicareclaim, Validators.required],
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
            insurance1: [userdet.insurance1],
            insurance2: [userdet.insurance2],
            insurance3: [userdet.insurance3],
            insurance4: [userdet.insurance4],
            medicarepolicyno: [userdet.medicarepolicyno],
            mediprimarypolicy: [putmediprimarypolicy],
            comprimarypolicy: [putcomprimarypolicy],
            /* planbcard: [putplanbcard],*/
            /*   phtype1: [userdet.phtype1, Validators.required],*/
            phtype1: [userdet.phtype1],
            /*  phtype2: [userdet.phtype2],*/
            phage: [userdet.phage],
            motype1: [userdet.motype1],
            /*motype2: [userdet.motype2],*/
            moage: [userdet.moage],
            modead: [userdet.modead],
            fatype1: [userdet.fatype1],
            /*     fatype2: [userdet.fatype2],*/
            faage: [userdet.faage],
            fadead: [userdet.fadead],
            dautype1: [userdet.dautype1],
            /*   dautype2: [userdet.dautype2],*/
            dauage: [userdet.dauage],
            daudead: [userdet.daudead],
            sontype1: [userdet.sontype1],
            /* sontype2: [userdet.sontype2],*/
            sonage: [userdet.sonage],
            sondead: [userdet.sondead],
            brotype1: [userdet.brotype1],
            /*   brotype2: [userdet.brotype2],*/
            broage: [userdet.broage],
            brodead: [userdet.brodead],
            sistype1: [userdet.sistype1],
            /* sistype2: [userdet.sistype2],*/
            sisage: [userdet.sisage],
            sisdead: [userdet.sisdead],
            neptype1: [userdet.neptype1],
            /* neptype2: [userdet.neptype2],*/
            nepage: [userdet.nepage],
            nepdead: [userdet.nepdead],
            niecetype1: [userdet.niecetype1],
            /*  niecetype2: [userdet.niecetype2],*/
            nieceage: [userdet.nieceage],
            niecedead: [userdet.niecedead],
            unctype1: [userdet.unctype1],
            /*  unctype2: [userdet.unctype2],*/
            uncage: [userdet.uncage],
            uncdead: [userdet.uncdead],
            autntype1: [userdet.autntype1],
            /*   autntype2: [userdet.autntype2],*/
            autnage: [userdet.autnage],
            autndead: [userdet.autndead],
            moftype1: [userdet.moftype1],
            /*  moftype2: [userdet.moftype2],*/
            mofage: [userdet.mofage],
            mofdead: [userdet.mofdead],
            momotype1: [userdet.momotype1],
            /*  momotype2: [userdet.momotype2],*/
            momoage: [userdet.momoage],
            momodead: [userdet.momodead],
            daftype1: [userdet.daftype1],
            /*  daftype2: [userdet.daftype2],*/
            dafage: [userdet.dafage],
            dafdead: [userdet.dafdead],
            damtype1: [userdet.damtype1],
            /*  damtype2: [userdet.damtype2],*/
            damage: [userdet.damage],
            damdead: [userdet.damdead],
            oth1type1: [userdet.oth1type1],
            /*    oth1type2: [userdet.oth1type2],*/
            oth1age: [userdet.oth1age],
            oth1dead: [userdet.oth1dead],
            oth2type1: [userdet.oth2type1],
            /*   oth2type2: [userdet.oth2type2],*/
            oth2age: [userdet.oth2age],
            oth2dead: [userdet.oth2dead],
            oth3type1: [userdet.oth3type1],
            /* oth3type2: [userdet.oth3type2],*/
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
            /* pgx19: [userdet.pgx19],*/
            carrier: [userdet.carrier],
            carrierplan: [userdet.carrierplan],
            carrierpolicyno: [userdet.carrierpolicyno],
            cancer_sup: [putcancer_sup],
            catheters_sup: [putcatheters_sup],
            allergies_sup: [putallergies_sup ],
            scooter_sup: [putscooter_sup],
            walker_sup: [putwalker_sup],
            braces_sup: [putbraces_sup],
            topical_sup: [puttopical_sup ],
            pain_sup: [putpain_sup ],
            wound_sup: [putwound_sup],
            diabetic_sup: [putdiabetic_sup ],
            familyrelation1: [userdet.familyrelation1 ],
            familyrelation2: [userdet.familyrelation2 ],
            familyrelation3: [userdet.familyrelation3 ],
            familyrelation4: [userdet.familyrelation4 ],
            familyrelation5: [userdet.familyrelation5 ],
            familyrelation6: [userdet.familyrelation6 ],
            familyrelation7: [userdet.familyrelation7 ],
            familyrelation8: [userdet.familyrelation8 ],
            familyrelation9: [userdet.familyrelation9 ],
            familyrelation10: [userdet.familyrelation10 ],
            familyrelation11: [userdet.familyrelation11 ],
            familyrelation12: [userdet.familyrelation12 ],
            familyrelation13: [userdet.familyrelation13 ],
            familyrelation14: [userdet.familyrelation14 ],
            familyrelation15: [userdet.familyrelation15 ],
            familyrelation16: [userdet.familyrelation16 ],
            familyrelation17: [userdet.familyrelation17 ],
            relation1: [userdet.relation1 ],
            relation2: [userdet.relation2 ],
            relation3: [userdet.relation3 ],
            relation4: [userdet.relation4 ],
            relation5: [userdet.relation5 ],
            relation6: [userdet.relation6 ],
            relation7: [userdet.relation7 ],
            relation8: [userdet.relation8 ],
            relation9: [userdet.relation9 ],
            relation10: [userdet.relation10 ],
            relation11: [userdet.relation11 ],
            relation12: [userdet.relation12 ],
            relation13: [userdet.relation13 ],
            relation14: [userdet.relation14 ],
            relation15: [userdet.relation15 ],
            relation16: [userdet.relation16 ],
            relation17: [userdet.relation17 ],
            relation18: [userdet.relation18 ],
            degree1: [userdet.degree1 ],
            degree2: [userdet.degree2 ],
            degree3: [userdet.degree3 ],
            degree4: [userdet.degree4 ],
            degree5: [userdet.degree5 ],
            degree6: [userdet.degree6 ],
            degree7: [userdet.degree7 ],
            degree8: [userdet.degree8 ],
            degree9: [userdet.degree9 ],
            degree10: [userdet.degree10 ],
            degree11: [userdet.degree11 ],
            degree12: [userdet.degree12 ],
            degree13: [userdet.degree13 ],
            degree14: [userdet.degree14 ],
            degree15: [userdet.degree15 ],
            degree16: [userdet.degree16 ],
            degree17: [userdet.degree17 ],
            degree18: [userdet.degree18 ],
        /*    image: [userdet.image[0].response ],*/
            phname: [userdet.phname ],
            familyrelation1name: [userdet.familyrelation1name ],
            familyrelation2name: [userdet.familyrelation2name ],
            familyrelation3name: [userdet.familyrelation3name ],
            familyrelation4name: [userdet.familyrelation4name ],
            familyrelation5name: [userdet.familyrelation5name ],
            familyrelation6name: [userdet.familyrelation6name ],
            familyrelation7name: [userdet.familyrelation7name ],
            familyrelation8name: [userdet.familyrelation8name ],
            familyrelation9name: [userdet.familyrelation9name ],
            familyrelation10name: [userdet.familyrelation10name ],
            familyrelation11name: [userdet.familyrelation11name ],
            familyrelation12name: [userdet.familyrelation12name ],
            familyrelation13name: [userdet.familyrelation13name ],
            familyrelation14name: [userdet.familyrelation14name ],
            familyrelation15name: [userdet.familyrelation15name ],
            familyrelation16name: [userdet.familyrelation16name ],
            familyrelation17name: [userdet.familyrelation17name ]
          });
            this.planbcard  = putplanbcard;

          setTimeout(() => {
           $('.left2_heading4new').each(function() {
             if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
             $(this).parent().hide();
            }
               $('.pateintquestionire_div2_left2_heading').show();
            });
          }, 1500);
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
    this.pateintquestioniremodal = true;
    // do disable first
    setTimeout(() => {
      $('.left2_heading4new').each(function() {
        if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
          $(this).parent().hide();
        }
      });
    }, 200);
    // then disable
    setTimeout(() => {
      $( '#formquestionary' ).find('input').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formquestionary' ).find('textarea').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formquestionary' ).find('select').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formquestionary' ).find('radio').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });
    }, 500);
  }
  disableit() {
    setTimeout(() => {
    $( '.insurencedet_subblock2' ).find('input').each(function() {
      $(this).attr( 'disabled', 'disabled' );
    });
    $( '.insurencedet_subblock2' ).find('radio').each(function() {
      $(this).attr( 'disabled', 'disabled' );
    });
    }, 500);
  }
  showsymptomchecklist(id) {
      this.symptomdetailsbypatientid(id);
      this.opensymptommodalflag = true;
      setTimeout(() => {
        $( '#formcss' ).find('input').each(function() {
          $(this).attr( 'disabled', 'disabled' );
        });
        $( '#formcss' ).find('textarea').each(function() {
          $(this).attr( 'disabled', 'disabled' );
        });
        $( '#formcss' ).find('checkbox').each(function() {
          $(this).attr( 'disabled', 'disabled' );
        });
      }, 500);
    }
  symptomdetailsbypatientid(id) {
    let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
    let data = {patientid : id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('getcommoncancersymptomsbypatientid');
          console.log(result.id);
          let userdet = result.id;
        //  this.iscompletedccsrecord = result.id.iscompleted;
          this.dataForm2 = this.fb.group({
            weightloss: [userdet.weightloss],
            appetite: [userdet.appetite],
            eatingdisorder: [userdet.eatingdisorder],
            unabdominalpain: [userdet.unabdominalpain],
            upabdominalpain: [userdet.upabdominalpain],
            ruquadrantpain: [userdet.ruquadrantpain],
            luquadrantpain: [userdet.luquadrantpain],
            labdominalpain: [userdet.labdominalpain],
            rlquadrantpain: [userdet.rlquadrantpain],
            llquadrantpain: [userdet.llquadrantpain],
            gabdominalpain: [userdet.gabdominalpain],
            vomiting1: [userdet.vomiting1],
            vomiting2: [userdet.vomiting2],
            vomiting3: [userdet.vomiting3],
            chronicfatigue: [userdet.chronicfatigue],
            otherfatigue: [userdet.otherfatigue],
            anemia: [userdet.anemia],
            jaundice: [userdet.jaundice],
            fatigue1: [userdet.fatigue1],
            fatigue2: [userdet.fatigue2],
            type1diabetes: [userdet.type1diabetes],
            type2diabetes: [userdet.type2diabetes],
            constipation: [userdet.constipation],
            abnormalweightloss: [userdet.abnormalweightloss],
            abnormalweightgain: [userdet.abnormalweightgain],
            hypertrophicdisorders: [userdet.hypertrophicdisorders],
            bloodinstool: [userdet.bloodinstool],
            skineruption: [userdet.skineruption],
            xerosiscutis: [userdet.xerosiscutis],
            lumpinbreast: [userdet.lumpinbreast],
            thickeningbreast: [userdet.thickeningbreast],
            disordersofbreast: [userdet.disordersofbreast],
            rednessnipple: [userdet.rednessnipple],
            nipplepain: [userdet.nipplepain],
            nippledischarge: [userdet.nippledischarge],
            breastsize: [userdet.breastsize],
            breastpain: [userdet.breastpain],
            uterinebleeding: [userdet.uterinebleeding],
            bloodinurine: [userdet.bloodinurine],
            melena: [userdet.melena],
            stomachpainabdominalpain: [userdet.stomachpainabdominalpain],
            bowelhabits: [userdet.bowelhabits],
            unconstipation: [userdet.unconstipation],
            diarrhea: [userdet.diarrhea],
            colonpolyps: [userdet.colonpolyps],
            rectalbleeding: [userdet.rectalbleeding],
            abdominalbloating1: [userdet.abdominalbloating1],
            abdominalbloating2: [userdet.abdominalbloating2],
            idefecation: [userdet.idefecation],
            ofecalabnormalities: [userdet.ofecalabnormalities],
            pancreaticuabdominalpain: [userdet.pancreaticuabdominalpain],
            cholecystitis1: [userdet.cholecystitis1],
            cholecystitis2: [userdet.cholecystitis2],
            noofbloodclots: [userdet.noofbloodclots]
          });
        //  this.getsymptommodaliscompletedornot();
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  gotocsspdf(id) {
    var url = 'http://' + this._commonservices.commonvalue.commonurl + '/testpdf/html2pdf/common_cancer_symptoms.php?id=' + id;
    window.open(url, '_blank');
  }
}
