import { Component, OnInit,  NgZone, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var $: any;
declare var moment: any;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css'],
  providers: [Commonservices],
})
export class PatientrecordComponent implements OnInit {
  public dataForm: FormGroup ;
  public dataForm1: FormGroup ;
  public dataForm2: FormGroup ;
  public fb;
  public fb1;
  public saveorviewsheet;
  public pgxval : boolean = false;
  public deleteid;
  public editnoteid;
  public type;
  public patientdetails;
  public usastates;
  public issubmit;
  public issubmitcommoncancerform;
  public tagstatus;
  public shownoteerror;
  public divaddnote;
  public addnote;
  public val;
  public noteslist;
  public addit = 1;
  public allnotearr: any =[];
  public showdeg: any =[];
  public patient_added_on;
  public opensaveorsubmitmodal: boolean = false;
  public showdeletenotemodal: boolean = false;
  public showdeletesuccessmodal: boolean = false;
  public showquestionarydiv: boolean = false;
  id: number;
  public p: number = 1;
  public serverurl;
  public allusers;
  public patientuniqueid;
  public repuniqueid;
  // public cookieuniqueid;
  public pateintquestioniremodal: boolean = false;
  public successfuladdnotemodal: boolean = false;
  public successfulupdatenotemodal: boolean = false;
  private addcookie: CookieService;
  public cookiedetails;
  public iscompletedpatientrecord = 0;
  public iscompletedccsrecord = 0;
  public planbcard: any = '';
  public carrier: any = '';
  public carrierplan: any = '';
  public carrierpolicyno: any = '';
  public symptomtype: any;

  public opensymptommodalflag: boolean = false;
  public opentypemodalflag: boolean = false;
  public hit_map_value: any;
  // public isdisable=0;
  private issegmentmodalshown: boolean = false;
  private pgxmedicationmodal: boolean = false;
  options: UploaderOptions;
  //  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private zone: NgZone;
  public basicOptions: Object;
  public disableuploader : any = 0;
  public inmediplanbcarderror: any;
  public inmedipolicynoerror: any;
  public inmedprimarypolicyerror: any;
  public incommercialcarriererror: any;
  public incarrierplanerror: any;
  public carrierpolicynoerror: any;
  public carrierprimarypolicynoerror: any;
  public showflag = 0;
  public helpdeskmailid: any;
  public addedbyrepdetailname: any;
 // public showdeg1: any;

  constructor(fb: FormBuilder, fb1: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices, addcookie: CookieService) {
    this.fb = fb;
    this.fb1 = fb1;
    this.serverurl = _commonservices.url;
    this.getusastates();
    this.getallusers();
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('this.cookiedetails');
    console.log(this.cookiedetails);
    //  this.callcookiedetails();
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

/*  callcookiedetails() {
    let link = this.serverurl + 'getuserdetails';
    let data = {userid: this.cookiedetails.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          let userdet = result.id;
          this.cookieuniqueid = result.id.uniqueid;
          console.log('cookieuniqueid' + this.cookieuniqueid);
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }*/
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('this.id________');
      console.log(this.id);
      this.getdetails();
      this.getnotes();
      this.getpatientrecord();
      /* this val 2 is just to get the iscompleted value from database , and it will not open the modal */
      this.getsymptommodaliscompletedornot();
    });
    this.route.params.subscribe(params => {
      this.type = params['type'];
      console.log('this.type___________');
      console.log(this.type);
      if (this.type == 1) {
        this.tagstatus = 'PPS Accepted';
      }
      else if (this.type == 2) {
        this.tagstatus = 'PPS Declined';
      }
      else if (this.type == 3) {
        this.tagstatus = 'Lead';
      }
      else if (this.type == 4) {
        this.tagstatus = 'PPS Submitted';
      }
      else if (this.type == 5) {
        this.tagstatus = 'PF submitted';
      }
      else {
        this.tagstatus = '';
      }
    });
                                  /*MANAGE CONTACT FIRST BLOCK IN PATIENT RECORD*/
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
                                   /*PATIENT PROFILE SHEET FIRST BLOCK IN PATIENT RECORD*/
    this.dataForm1 = this.fb.group({
      cgx1: [''],
      pgxval: [''],
      firstname1: ['', Validators.required],
      lastname1: ['', Validators.required],
      phone1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      address1: ['', Validators.required],
      city1: ['', Validators.required],
      state1: ['', Validators.required],
      zip1: ['', Validators.required],
      dob1: ['', Validators.required],
      gender1: ['', Validators.required],
      race1: ['', Validators.required],
      height1: ['', Validators.required],
      width1: ['', Validators.required],
      allergies1: [''],
      medicareclaim1: ['', Validators.required],
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
      insurance1: ['' , Validators.required ],
      insurance2: ['' , Validators.required ],
      insurance3: ['' , Validators.required ],
      insurance4: ['' , Validators.required ],
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
      cancer_sup: ['' ,  Validators.required ],
      catheters_sup: ['' ,  Validators.required ],
      allergies_sup: ['' ,  Validators.required ],
      scooter_sup: ['' , Validators.required ],
      walker_sup: ['' ,  Validators.required ],
      braces_sup: ['' ,  Validators.required ],
      topical_sup: ['',  Validators.required  ],
      pain_sup: ['',  Validators.required  ],
      wound_sup: ['', Validators.required ],
      diabetic_sup: ['', Validators.required ],
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
      familyrelation17name: [''],
      image: ['']
    });
                                /*CANCER SYMPTOMS FIRST BLOCK IN PATIENT RECORD*/

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

    this.zone = new NgZone({enableLongStackTrace: false});
    this.basicOptions = {
      url: this.serverurl + 'uploads',
      filterExtensions: false,
      allowedExtensions: ['jpg', 'png', 'jpeg']
    };
    this.gethelpdeskmailid();
  }
                                                          /*NOTES*/

  show_div_to_add_note() {
    this.divaddnote = true;
  }
  editnote(item) {
    this.editnoteid = item._id;
    this.divaddnote = true;
    this.addnote = item.note;
    this.addit = 0; // edit
  }
  getnotes() {
    this.allnotearr = [];
    let link = this.serverurl + 'getnotes';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          //  console.log('getnotes-------');
          //  console.log(result);
          this.noteslist = result.id;
          console.log('this.noteslist----');
          console.log(this.noteslist);
          /*for (let j in this.noteslist) {
            this.allnotearr.push(this.noteslist[j].note);
           }*/
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  addsimplenote() {
    let data;
    let link = this.serverurl + 'noteadd';
    if (this.addnote != null) {
      data = {
        patientid: this.id,
        added_by: this.cookiedetails.id,
        note: this.addnote,
        //  added_on: this.getdate(),
      };
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            this.addnote = null;
            this.divaddnote = false;
            this.successfuladdnotemodal = true;
            setTimeout(() => {
              this.successfuladdnotemodal = false;
            }, 2000);
            this.getnotes();
          }
        }, error => {
          console.log('Oooops!');
        });
      // }
    }
    else {
      this.shownoteerror = true;
    }
  }
  cancelnote() {
    this.addnote = null;
    this.divaddnote = false;
  }
  deletethisnote() {
    let link = this.serverurl + 'notedelete';
    let data = {
      _id: this.deleteid,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success') {
          this.showdeletenotemodal = false;
          this.showdeletesuccessmodal = true;
          setTimeout(() => {
            this.showdeletesuccessmodal = false;
          }, 2000);
          this.getnotes();
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  deletenote(id) {
    this.deleteid = id;
    this.showdeletenotemodal = true;
  }

  updatesimplenote() {
    let link = this.serverurl + 'noteupdate';
    let data = {
      _id: this.editnoteid,
      note: this.addnote,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success') {
          this.divaddnote = false;
          this.addnote = null;
          this.addit = 1;
          this.getnotes();
          this.successfulupdatenotemodal = true;
          setTimeout(() => {
            this.successfulupdatenotemodal = false;
          }, 2000);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
                                                      /*BASIC FUNCTIONS*/
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
  getallusers() {
    let link = this.serverurl + 'getallusers';
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        this.allusers = result.id;

      }, error => {
        console.log('Oooops!');
      });
  }
  getdetails() {
    let link = this.serverurl + 'getpatientdetails';
    let data = {_id : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          console.log('getpatientdetails-------');
          console.log(result);
          this.patientdetails = result.item;
          let userdet = result.item;
          console.log(userdet.added_on);
          this.patient_added_on = moment(userdet.added_on).format('MM-DD-YYYY');
          this.patientuniqueid = result.item.uniqueid;
          console.log('patientuniqueid' + this.patientuniqueid);
          this.dataForm = this.fb.group({
            firstname: [userdet.firstname, Validators.required],
            lastname: [userdet.lastname, Validators.required],
            email: [userdet.email],
            phone: [userdet.phone, Validators.required],
            city: [userdet.city, Validators.required],
            state: [userdet.state, Validators.required]
          });
          this.getrepid(result.item.addedby);
        } else {
          this.router.navigate(['/patient-list']);
        }
      }, error => {
        console.log('Ooops');
      });
  }
  showname(id) {
    for (let i in this.allusers) {
      if (this.allusers[i]._id == id) {
        return this.allusers[i].firstname + ' ' + this.allusers[i].lastname;
      }
    }
  }
  showtime(time) {
    return moment(time).format('MMM Do, YYYY');
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
  getpatientrecord() {
    let link = this.serverurl + 'getpatientrecord';
    let data = {_id : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          console.log('result.item.iscompleted');
          console.log(result.item.iscompleted);
          this.iscompletedpatientrecord = result.item.iscompleted;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  getsymptommodaliscompletedornot() {
    let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('getcommoncancersymptomsbypatientid');
          console.log(result.id);
          let userdet = result.id;
          this.iscompletedccsrecord = result.id.iscompleted;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

                                                    /* ERROR CALULATIONS*/
  setplancardbvalue(val: any) {
    this.planbcard = val;
    if (this.dataForm1.value.insurance1 == true && (this.planbcard == 'yes' || this.planbcard == 'no') ) {
    //  console.log('hi');
      this.inmediplanbcarderror = null;
    } else {
    //  console.log('else');
      this.inmediplanbcarderror = 'Please Choose an answer! ';
    }
  }
  callmedpolicyerror() {
    console.log('callmedpolicyerror');
    console.log(this.dataForm1.value.medicarepolicyno);
    if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '') {
      this.inmedipolicynoerror = null;
      console.log('if?');
    } else {
      console.log('else?');
      this.inmedipolicynoerror = 'Please give your policy number! ';
    }
  }



  callmedprimarypolicyerror() {
    setTimeout(() => {
    if (this.dataForm1.value.insurance1 == true && (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no' )) {
      console.log(this.inmedprimarypolicyerror);
      console.log('if????????????????????');
      this.inmedprimarypolicyerror = null;
    } else {
      console.log('elseeeee????????????????????');
      console.log(this.inmedprimarypolicyerror);
      this.inmedprimarypolicyerror =  'Please Choose an answer! ';
    }
    }, 50);
  }


  commercialcarrier() {
    if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '')) {
     // console.log(this.inmedprimarypolicyerror);
      this.incommercialcarriererror = null;
    } else {
     // console.log('elseeeee????????????????????');
     // console.log(this.inmedprimarypolicyerror);
      this.incommercialcarriererror =  'Please Choose an answer! ';
    }
  }

  callcarrierplanerror() {
    if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
      this.incarrierplanerror = null;
    } else {
      this.incarrierplanerror = 'Please give your plan type! ';
    }
  }


  callcarrierpolicynoerror() {
    if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
      this.carrierpolicynoerror = null;
    } else {
      this.carrierpolicynoerror = 'Please give your plan type! ';
    }
  }

  callcarrierprimarypolicyerror() {
    setTimeout(() => {
      if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' )) {
        this.carrierprimarypolicynoerror = null;
      } else {
        this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
      }
    }, 50);
  }
                                                /* ERROR CALULATIONS END */








  setinsurancevalue() {
    setTimeout(() => {
   //   console.log('this.dataForm1.controls[\'insurance\'].value');
     // console.log(this.dataForm1.value);
   //   console.log(this.dataForm1.value.insurance1);
     // console.log('this.dataForm1.controls[\'mediprimarypolicy\'].value');
     // console.log(this.dataForm1.value.mediprimarypolicy);
    //  console.log(this.planbcard);
      if (this.dataForm1.value.insurance1 == false) {
        this.inmediplanbcarderror = null;
        this.inmedipolicynoerror = null;
        this.inmedprimarypolicyerror = null;
      }
      if (this.dataForm1.value.insurance3 == false) {
        this.incommercialcarriererror = null;
        this.incarrierplanerror = null;
        this.carrierpolicynoerror = null;
        this.carrierprimarypolicynoerror = null;
      }
      console.log( 'this.inmediplanbcarderror');
      console.log( this.inmediplanbcarderror);
    }, 500);
  }


  checkpgx(val) {
    console.log(val);
    console.log(this.pgxval);
    if (this.pgxval != true) {
      if (val != null) {
        this.pgxval = true;
        //  $('#formquestionary .pgxvalclass').attr('checked', true);
        $('#formquestionary .pgxvalclass').prop('checked', true);
      }
    }
  }

  backtolistview() {
    if (this.cookiedetails.type == 'superadmin') {
      this.router.navigate(['/patient-list' , 'admin']);
    }
    else {
      this.router.navigate(['/patient-list']);
    }
  }

  showhidepatientquestionarydiv(val) {
    if (val == 1) {
      this.showquestionarydiv = true;
      setTimeout(() => {
        console.log('disable 1');
      $('.pateintquestionire_div2_left2new #phrelationtype').find('select').attr( 'disabled', 'disabled' );
      }, 500);
    }
    else {
      this.showquestionarydiv = false;
    }
  }
  showsinglediv() {
    this.showflag++;
    $('.pateintquestionire_div2_left2new .history' + this.showflag).removeClass('hide');
  }
  disablefields(val) {
    let familyval = 'familyrelation' + val;
    if ($('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Daughter' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' ) {
        console.log('disable 2');
      $('select[name="' + familyval + '"]').parent().next().next().next().find('select').attr( 'disabled', 'disabled' );
    }
    else {
        console.log('disable 3');
      $('select[name="' + familyval + '"]').parent().next().next().next().find('select').prop('disabled' , false);
    }



    if ($('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Daughter' ) {
      this.showdeg[val] = '(1st Degree)';
    }
    else  if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother' ) {
      this.showdeg[val] = '(2nd Degree)';
    }
    else {
      this.showdeg[val] = '(3rd Degree)';
}

  }
  /*SUBMIT MANAGE CONTACT FIRST BLOCK*/
  dosubmit(formval) {

    if (this.dataForm.valid) {
      let link= this.serverurl + 'editpatient';
      let data = {
        id: this.id,
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        phone: formval.phone,
        //  address: formval.address,
        city: formval.city,
        state: formval.state,
        /*zip: formval.zip,
                gender: formval.gender,
                dob: formval.dob,
                heightwidth: formval.heightwidth,
                allergies: formval.allergies,
                medicareclaim: formval.medicareclaim,
                tag: formval.tag,
                raceethnicity: formval.raceethnicity,
                trackingno: formval.trackingno,
                medicarecard: formval.medicarecard,
                iscancer: formval.iscancer,
                cancertypes: formval.cancertypes,
                relation: formval.relation,
                approxage: formval.approxage,*/
      };
      console.log(data);
      this._http.post(link, data)
        .subscribe(data => {
          //  this.pateintquestioniremodal = true;
          /* if (this.cookiedetails.type == 'superadmin') {
            this.router.navigate(['/patient-list' , 'admin']);
          }
          else {
          this.router.navigate(['/patient-list']);
          }*/
        }, error => {
          console.log('Oooops!');
        });
    }
  }

                                    /* PDF DETAILS IN PATIENT RECORD */
  gotopdf() {
  /*  var url = 'http://altushealthgroup.com/testpdf/html2pdf/ppqformpdf.php?id=' + this.id;*/
    var url = 'http://' + this._commonservices.commonvalue.commonurl + '/testpdf/html2pdf/ppqformpdf.php?id=' + this.id;
    window.open(url, '_blank');
  }
  gotocsspdf() {
    var url = 'http://' + this._commonservices.commonvalue.commonurl + '/testpdf/html2pdf/common_cancer_symptoms.php?id=' + this.id;
    window.open(url, '_blank');
  }
                                       /* VIEW IN READ-ONLY */
  openquesmodalreadonly(val) {
      this.saveorviewsheet = val;
    this.getpatientdetailsbypatientid();
    this.pateintquestioniremodal = true;
    setTimeout(() => {
      $('#formquestionary').find('input[type="submit"]').hide();
      $('#formquestionary').find('input[type="button"]').hide();
      $( '#formquestionary' ).find('input').each(function() {
          console.log('disable 4');
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formquestionary' ).find('textarea').each(function() {
          console.log('disable 5');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formquestionary' ).find('select').each(function() {
          console.log('disable 6');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formquestionary' ).find('button').each(function() {
          console.log('disable 7');
        $(this).attr( 'disabled', 'disabled' );
      });
      setTimeout(() => {
          console.log('disable 8');
      $('#planbcard').find('input[type="radio"]').attr( 'disabled', 'disabled' );
      }, 500);
     /* $( '#planbcard' ).find('radio').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });*/
    }, 500);
  }

  opensymptommodalreadonly() {
    this.symptomdetailsbypatientid();
    this.opensymptommodalflag = true;
    setTimeout(() => {
      $('#formcss').find('input[type="submit"]').hide();
      $('#formcss').find('input[type="button"]').hide();
      $( '#formcss' ).find('input').each(function() {
          console.log('disable 9');
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formcss' ).find('textarea').each(function() {
          console.log('disable 10');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formcss' ).find('checkbox').each(function() {
          console.log('disable 11');
        $(this).attr( 'disabled', 'disabled' );
      });
    }, 500);
  }

                                  /* PATIENT PROFILE SHEET FUNCTIONALITIES */

  /*initialization and getting basic values*/
  openquesmodal(val) {
    this.saveorviewsheet = val;
    this.pateintquestioniremodal = true;
    this.getdetails();
    setTimeout(() => {
      console.log('this.patientdetails-----after---------');
      console.log(this.patientdetails);
      this.dataForm1 = this.fb.group({
        firstname1: [this.patientdetails.firstname, Validators.required],
        lastname1: [this.patientdetails.lastname, Validators.required],
        phone1: [this.patientdetails.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        city1: [this.patientdetails.city, Validators.required],
        state1: [this.patientdetails.state, Validators.required],
        cgx1: [true],
        pgxval: [''],
        address1: ['', Validators.required],
        zip1: ['', Validators.required],
        dob1: ['', Validators.required],
        gender1: ['', Validators.required],
        race1: ['', Validators.required],
        height1: ['', Validators.required],
        width1: ['', Validators.required],
        allergies1: [''],
        medicareclaim1: ['', Validators.required],
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
        insurance1: [''],
        insurance2: [''],
        insurance3: [''],
        insurance4: [''],
        planbcard: [''],
        medicarepolicyno: [''],
        mediprimarypolicy: [''],
        comprimarypolicy: [''],
        /*phtype1: ['', Validators.required],*/
        phtype1: [''],
      /*  phtype2: [''],*/
        phage: [''],
        motype1: [''],
      /*  motype2: [''],*/
        moage: [''],
        modead: [''],
        fatype1: [''],
      /*  fatype2: [''],*/
        faage: [''],
        fadead: [''],
        dautype1: [''],
      /*  dautype2: [''],*/
        dauage: [''],
        daudead: [''],
        sontype1: [''],
      /*  sontype2: [''],*/
        sonage: [''],
        sondead: [''],
        brotype1: [''],
     /*   brotype2: [''],*/
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
       /* niecetype2: [''],*/
        nieceage: [''],
        niecedead: [''],
        unctype1: [''],
       /* unctype2: [''],*/
        uncage: [''],
        uncdead: [''],
        autntype1: [''],
       /* autntype2: [''],*/
        autnage: [''],
        autndead: [''],
        moftype1: [''],
       /* moftype2: [''],*/
        mofage: [''],
        mofdead: [''],
        momotype1: [''],
     /*   momotype2: [''],*/
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
     /*   oth1type2: [''],*/
        oth1age: [''],
        oth1dead: [''],
        oth2type1: [''],
      /*  oth2type2: [''],*/
        oth2age: [''],
        oth2dead: [''],
        oth3type1: [''],
      /*  oth3type2: [''],*/
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
        cancer_sup: ['' ,  Validators.required ],
        catheters_sup: ['' ,  Validators.required ],
        allergies_sup: ['' ,  Validators.required ],
        scooter_sup: ['' , Validators.required ],
        walker_sup: ['' ,  Validators.required ],
        braces_sup: ['' ,  Validators.required ],
        topical_sup: ['',  Validators.required  ],
        pain_sup: ['',  Validators.required  ],
        wound_sup: ['', Validators.required ],
        diabetic_sup: ['', Validators.required ],
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
        phname: [this.patientdetails.firstname + ' ' + this.patientdetails.lastname],
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
        familyrelation17name: [''],
        image: ['']
      });
      this.getpatientdetailsbypatientid();
    }, 1000);
  }


  // after save when we are trying to get the PATIENT PROFILE SHEET saved values
  getpatientdetailsbypatientid() {
    let link = this.serverurl + 'getpatientdetailsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('PATIENTRECORD VALUES-----**-');
          console.log(result.id);
          let userdet = result.id;
        /*  if (userdet.insurance == 1) {
            var putinsurance = 'yes';
          } else {
            var putinsurance = 'no';
          }*/
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
            // when there is a saved value regarding add record, then it will show that div
              setTimeout(() => {
                  let i = 1;
                  for (let i = 1; i < 18; i++) {
                      let familyval = 'familyrelation' + i;
                      if ( $('select[name="' + familyval + '"]').val() != '' ) {
                          $('.history' + i).removeClass('hide');
                      }
                  }
                  if (this.saveorviewsheet != 1 ) {
                      $('#formquestionary').find('input').each(function () {
                          console.log('disable 12');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('#formquestionary').find('select').each(function () {
                          console.log('disable 13');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.left2_heading3').find('button').each(function () {
                          console.log('disable 14');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.addrecord_btn').hide();
                  }
              }, 500);
          }
          if (userdet.cancer_sup == 0) {
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
            familyrelation17name: [userdet.familyrelation17name ],
            image: [userdet.image ]
          });
          this.planbcard  = putplanbcard;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  savepateintquestionire() {
    this.issubmit = false;
    console.log('save');
  }
  submitpateintquestionire() {
    this.issubmit = true;
    console.log('submit');
  }
  gethelpdeskmailid(){
    let link= this.serverurl + 'gethelpdeskmailidbypatientid';
    let data = {
      patientid: this.id
    };
    console.log(data);
    this._http.post(link, data)
      .subscribe(data => {
        let result = data.json();
        if (result.status == 'success') {
          console.log('=============');
          console.log(result.id);
          if (result.id.Helpdeskdetail.length > 0) {
            this.helpdeskmailid = result.id.Helpdeskdetail[0].email;
          }
          if (result.id.Addedbyrepdetail != null) {
            this.addedbyrepdetailname = result.id.Addedbyrepdetail[0].firstname + ' ' + result.id.Addedbyrepdetail[0].lastname;
          }
          this.patientuniqueid = result.id.uniqueid;
        }
      }, error => {
        console.log('Oooops!');
      });

  }
  // Submit PATIENT PROFILE SHEET values
  dosubmit1(formval) {
    this.inmediplanbcarderror = null;
    this.inmedipolicynoerror = null;
    this.inmedprimarypolicyerror = null;
    this.incommercialcarriererror = null;

    if (formval.cgx1 == true) {
      var putcgx = 1;
    }if (formval.cgx1 != true) {
      var putcgx = 0;
    }
    if (this.pgxval == true) {
      var putpgx = 1;
    }if (this.pgxval != true) {
      var putpgx = 0;
    }
    if (formval.topicalpain == true) {
      var puttopicalpain = 1;
    }if (formval.topicalpain != true) {
      var puttopicalpain= 0;
    }
    if (formval.oralpain == true) {
      var putoralpain = 1;
    }if (formval.oralpain != true) {
      var putoralpain= 0;
    }
    if (formval.derma == true) {
      var putderma = 1;
    }if (formval.derma != true) {
      var putderma= 0;
    }
    if (formval.migrane == true) {
      var putmigrane = 1;
    }if (formval.migrane != true) {
      var putmigrane= 0;
    }
    /* if (formval.insurance == true) {
       var putinsurance = 1;
     }if (formval.insurance != true) {
       var putinsurance= 0;
     }*/
    if (this.planbcard == 'yes') {
      var putplanbcard = 1;
    }if (this.planbcard == 'no') {
      var putplanbcard= 0;
    }
    if (formval.cancer_sup == 'yes') {
      var putcancer_sup = 1;
    }if (formval.cancer_sup == 'no') {
      var putcancer_sup = 0;
    }
    if (formval.catheters_sup == 'yes') {
      var putcatheters_sup = 1;
    }if (formval.catheters_sup == 'no') {
      var putcatheters_sup = 0;
    }
    if (formval.allergies_sup == 'yes') {
      var putallergies_sup = 1;
    }if (formval.allergies_sup == 'no') {
      var putallergies_sup = 0;
    }
    if (formval.scooter_sup == 'yes') {
      var putscooter_sup = 1;
    }if (formval.scooter_sup == 'no') {
      var putscooter_sup = 0;
    }
    if (formval.walker_sup == 'yes') {
      var putwalker_sup = 1;
    }if (formval.walker_sup == 'no') {
      var putwalker_sup = 0;
    }
    if (formval.braces_sup == 'yes') {
      var putbraces_sup = 1;
    }if (formval.braces_sup == 'no') {
      var putbraces_sup = 0;
    }
    if (formval.topical_sup == 'yes') {
      var puttopical_sup = 1;
    }
    if (formval.topical_sup == 'no') {
      var puttopical_sup = 0;
    }
    if (formval.pain_sup == 'yes') {
      var putpain_sup = 1;
    }
    if (formval.pain_sup == 'no') {
      var putpain_sup = 0;
    }
    if (formval.wound_sup == 'yes') {
      var putwound_sup = 1;
    }
    if (formval.wound_sup == 'no') {
      var putwound_sup = 0;
    }
    if (formval.diabetic_sup == 'yes') {
      var putdiabetic_sup = 1;
    }
    if (formval.diabetic_sup == 'no') {
      var putdiabetic_sup = 0;
    }
    if (formval.mediprimarypolicy == 'yes') {
      var putmediprimarypolicy = 1;
    }
    if (formval.mediprimarypolicy == 'no') {
      var putmediprimarypolicy = 0;
    }
    if (formval.comprimarypolicy == 'yes') {
      var putcomprimarypolicy = 1;
    }
    if (formval.comprimarypolicy == 'no') {
      var putcomprimarypolicy = 0;
    }
    if (formval.insurance1 == true) {
      var putinsurance1 = 1;
    }if (formval.insurance1 != true) {
      var putinsurance1= 0;
    }
    if (formval.insurance2 == true) {
      var putinsurance2 = 1;
    }if (formval.insurance2 != true) {
      var putinsurance2= 0;
    }
    if (formval.insurance3 == true) {
      var putinsurance3 = 1;
    }if (formval.insurance3 != true) {
      var putinsurance3= 0;
    }
    if (formval.insurance4 == true) {
      var putinsurance4 = 1;
    }if (formval.insurance4 != true) {
      var putinsurance4= 0;
    }
    if (this.issubmit == true) {   // only for submit
                                               /*HITMAP LOGIN START submit*/

      // POINT.  had no cancer
      if (this.dataForm1.value.cancer_sup != 'yes') {
        this.hit_map_value = 'RED';
        console.log('inside 1');
      } else {
        // POINT.  yes/male/prostrate or brest cncer/medicare-B yes
        if (this.dataForm1.value.gender1 == 'male') {
          if (this.dataForm1.value.insurance == 'Medicare' && this.planbcard == 'yes' && (this.dataForm1.value.phtype1 == 'Breast Cancer' || this.dataForm1.value.phtype1 == 'Prostate Cancer')) {
            this.hit_map_value = 'GREEN';
            console.log('inside 2');
          }
        }
        // POINT.  yes/female/ovarian/medicare-B yes
        if (this.dataForm1.value.gender1 == 'female') {
          if (this.dataForm1.value.insurance == 'Medicare' && this.planbcard == 'yes') {
            console.log('inside 3');
            if (this.dataForm1.value.phtype1 == 'Ovarian Cancer') {
              console.log('inside 4');
              this.hit_map_value = 'GREEN';
            }
            // POINT.  yes/female/breast - age below 50/medicare-B yes
            if (this.dataForm1.value.phtype1 == 'Breast Cancer' && this.dataForm1.value.phage <= 50) {
              console.log('inside 5');
              this.hit_map_value = 'GREEN';
            }
          }
        }
        // POINT.  yes/other than medicare insurance
        if (this.dataForm1.value.insurance != 'Medicare') {
          this.hit_map_value = 'YELLOW';
        }

        // POINT.  yes/medicare-B yes/other than above mentioned cancers
        if (this.dataForm1.value.insurance == 'Medicare' && this.planbcard == 'yes' && this.dataForm1.value.phtype1 != 'Breast Cancer' && this.dataForm1.value.phtype1 != 'Prostate Cancer' && this.dataForm1.value.phtype1 != 'Ovarian Cancer') {
          this.hit_map_value = 'YELLOW';
        }
      }
                                          /*HITMAP LOGIN END submit*/
      let x: any;
      for (x in this.dataForm1.controls) {
        console.log('??');
        this.dataForm1.controls[x].markAsTouched();
      }

                                             /*ERROR CHECK*/
      console.log('this.dataForm1.value.insurance1');
      console.log(this.dataForm1.value.insurance1);
     /* if (this.dataForm1.value.insurance1 == true && (this.planbcard == 'yes' || this.planbcard == 'no') ) {
        this.inmediplanbcarderror = null;
      } else {
        this.inmediplanbcarderror = 'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance1 == true ) {
            if (this.planbcard == 'yes' || this.planbcard == 'no' ) {
                this.inmediplanbcarderror = null;
            }
            else {
                this.inmediplanbcarderror = 'Please Choose an answer! ';
            }
        } else {
            this.inmediplanbcarderror = null;
        }

        /*  if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '' ) {
           console.log('if');
           this.inmedipolicynoerror = null;
       } else {
           console.log('else');
           this.inmedipolicynoerror = 'Please give your policy number! ';
       }*/
        if (this.dataForm1.value.insurance1 == true ) {
            if (this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '') {
                this.inmedipolicynoerror = null;
            }
            else {
                this.inmedipolicynoerror = 'Please give your policy number! ';
            }
        } else {
            this.inmedipolicynoerror = null;
        }

        /*if (this.dataForm1.value.insurance1 == true && (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no' )) {
            this.inmedprimarypolicyerror = null;
        } else {
            this.inmedprimarypolicyerror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance1 == true ) {
            if (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no') {
                this.inmedprimarypolicyerror = null;
            }
            else {
                this.inmedprimarypolicyerror =  'Please Choose an answer! ';
            }
        } else {
            this.inmedprimarypolicyerror = null;
        }


     /* if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '')) {
        this.incommercialcarriererror = null;
      } else {
        this.incommercialcarriererror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '') {
                this.incommercialcarriererror = null;
            }
            else {
                this.incommercialcarriererror =  'Please Choose an answer! ';
            }
        } else {
            this.incommercialcarriererror = null;
        }

     /* if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
        this.incarrierplanerror = null;
      } else {
        this.incarrierplanerror = 'Please give your plan type! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
                this.incarrierplanerror = null;
            }
            else {
                this.incarrierplanerror =   'Please give your plan type! ';
            }
        } else {
            this.incarrierplanerror = null;
        }


     /* if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
        this.carrierpolicynoerror = null;
      } else {
        this.carrierpolicynoerror = 'Please give your plan type! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
                this.carrierpolicynoerror = null;
            }
            else {
                this.carrierpolicynoerror =   'Please give your plan type! ';
            }
        } else {
            this.carrierpolicynoerror = null;
        }

   /*   if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' )) {
        this.carrierprimarypolicynoerror = null;
      } else {
        this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' ) {
                this.carrierprimarypolicynoerror = null;
            }
            else {
                this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
            }
        } else {
            this.carrierprimarypolicynoerror = null;
        }
                                                  /*ERROR CHECK*/

/*console.log('carrierprimarypolicynoerror' + this.carrierprimarypolicynoerror);
console.log('carrierpolicynoerror' + this.carrierpolicynoerror);
console.log('incarrierplanerror' + this.incarrierplanerror);
console.log('incommercialcarriererror' + this.incommercialcarriererror);
console.log('inmedprimarypolicyerror' + this.inmedprimarypolicyerror);
console.log('inmedipolicynoerror' + this.inmedipolicynoerror);
console.log('inmediplanbcarderror' + this.inmediplanbcarderror);*/

      if (this.dataForm1.valid && this.carrierprimarypolicynoerror == null && this.carrierpolicynoerror == null && this.incarrierplanerror == null && this.incommercialcarriererror == null && this.inmedprimarypolicyerror == null &&  this.inmedipolicynoerror == null &&  this.inmediplanbcarderror == null ) {
     //   if (this.dataForm1.valid ) {
        let link= this.serverurl + 'patientrecord';
        let data = {
          patientid: this.id,
          cgx1: putcgx,
          pgxval: putpgx,
          firstname1: formval.firstname1,
          lastname1: formval.lastname1,
          phone1: formval.phone1,
          address1: formval.address1,
          city1: formval.city1,
          state1: formval.state1,
          zip1: formval.zip1,
          dob1: formval.dob1,
          gender1: formval.gender1,
          race1: formval.race1,
          height1: formval.height1,
          width1: formval.width1,
          allergies1: formval.allergies1,
          medicareclaim1: formval.medicareclaim1,
          notes1: formval.notes1,
          notes2: formval.notes2,
          notes3: formval.notes3,
          notes4: formval.notes4,
          pharmacyinsurancename: formval.pharmacyinsurancename,
          pharmacyid: formval.pharmacyid,
          pharmacybin: formval.pharmacybin,
          pharmacypcn: formval.pharmacypcn,
          pharmacygroup: formval.pharmacygroup,
          pharmacyhistory: formval.pharmacyhistory,
          pharmacyissue: formval.pharmacyissue,
          pharmacytreatment: formval.pharmacytreatment,
          topicalpain: puttopicalpain,
          oralpain: putoralpain,
          derma: putderma,
          migrane: putmigrane,
          insurance1: putinsurance1,
          insurance2: putinsurance2,
          insurance3: putinsurance3,
          insurance4: putinsurance4,
          planbcard: putplanbcard,
          medicarepolicyno: formval.medicarepolicyno,
          mediprimarypolicy: putmediprimarypolicy,
          comprimarypolicy: putcomprimarypolicy,
          phtype1: formval.phtype1,
          /* phtype2: formval.phtype2,*/
          phage: formval.phage,
          motype1: formval.motype1,
          /* motype2: formval.motype2,*/
          moage: formval.moage,
          modead: formval.modead,
          fatype1: formval.fatype1,
          /*  fatype2: formval.fatype2,*/
          faage: formval.faage,
          fadead: formval.fadead,
          dautype1: formval.dautype1,
          /*dautype2: formval.dautype2,*/
          dauage: formval.dauage,
          daudead: formval.daudead,
          sontype1: formval.sontype1,
          /*  sontype2: formval.sontype2,*/
          sonage: formval.sonage,
          sondead: formval.sondead,
          brotype1: formval.brotype1,
          /*   brotype2: formval.brotype2,*/
          broage: formval.broage,
          brodead: formval.brodead,
          sistype1: formval.sistype1,
          /* sistype2: formval.sistype2,*/
          sisage: formval.sisage,
          sisdead: formval.sisdead,
          neptype1: formval.neptype1,
          /* neptype2: formval.neptype2,*/
          nepage: formval.nepage,
          nepdead: formval.nepdead,
          niecetype1: formval.niecetype1,
          /* niecetype2: formval.niecetype2,*/
          nieceage: formval.nieceage,
          niecedead: formval.niecedead,
          unctype1: formval.unctype1,
          /* unctype2: formval.unctype2,*/
          uncage: formval.uncage,
          uncdead: formval.uncdead,
          autntype1: formval.autntype1,
          /*  autntype2: formval.autntype2,*/
          autnage: formval.autnage,
          autndead: formval.autndead,
          moftype1: formval.moftype1,
          /* moftype2: formval.moftype2,*/
          mofage: formval.mofage,
          mofdead: formval.mofdead,
          momotype1: formval.momotype1,
          /*  momotype2: formval.momotype2,*/
          momoage: formval.momoage,
          momodead: formval.momodead,
          daftype1: formval.daftype1,
          /*  daftype2: formval.daftype2,*/
          dafage: formval.dafage,
          dafdead: formval.dafdead,
          damtype1: formval.damtype1,
          /*  damtype2: formval.damtype2,*/
          damage: formval.damage,
          damdead: formval.damdead,
          oth1type1: formval.oth1type1,
          /*  oth1type2: formval.oth1type2,*/
          oth1age: formval.oth1age,
          oth1dead: formval.oth1dead,
          oth2type1: formval.oth2type1,
          /* oth2type2: formval.oth2type2,*/
          oth2age: formval.oth2age,
          oth2dead: formval.oth2dead,
          oth3type1: formval.oth3type1,
          /*   oth3type2: formval.oth3type2,*/
          oth3age: formval.oth3age,
          oth3dead: formval.oth3dead,
          pgx1: formval.pgx1,
          pgx2: formval.pgx2,
          pgx3: formval.pgx3,
          pgx4: formval.pgx4,
          pgx5: formval.pgx5,
          pgx6: formval.pgx6,
          pgx7: formval.pgx7,
          pgx8: formval.pgx8,
          pgx9: formval.pgx9,
          pgx10: formval.pgx10,
          pgx11: formval.pgx11,
          pgx12: formval.pgx12,
          pgx13: formval.pgx13,
          pgx14: formval.pgx14,
          pgx15: formval.pgx15,
          pgx16: formval.pgx16,
          pgx17: formval.pgx17,
          pgx18: formval.pgx18,
          /* pgx19: formval.pgx19,*/
          carrier: formval.carrier,
          carrierplan: formval.carrierplan,
          carrierpolicyno: formval.carrierpolicyno,
          cancer_sup: putcancer_sup,
          catheters_sup: putcatheters_sup,
          allergies_sup: putallergies_sup ,
          scooter_sup: putscooter_sup,
          walker_sup: putwalker_sup,
          braces_sup: putbraces_sup,
          topical_sup: puttopical_sup,
          pain_sup: putpain_sup,
          wound_sup: putwound_sup,
          diabetic_sup: putdiabetic_sup,
          familyrelation1: formval.familyrelation1,
          familyrelation2: formval.familyrelation2,
          familyrelation3: formval.familyrelation3,
          familyrelation4: formval.familyrelation4,
          familyrelation5: formval.familyrelation5,
          familyrelation6: formval.familyrelation6,
          familyrelation7: formval.familyrelation7,
          familyrelation8: formval.familyrelation8,
          familyrelation9: formval.familyrelation9,
          familyrelation10: formval.familyrelation10,
          familyrelation11: formval.familyrelation11,
          familyrelation12: formval.familyrelation12,
          familyrelation13: formval.familyrelation13,
          familyrelation14: formval.familyrelation14,
          familyrelation15: formval.familyrelation15,
          familyrelation16: formval.familyrelation16,
          familyrelation17: formval.familyrelation17,
          relation1: formval.relation1,
          relation2: formval.relation2,
          relation3: formval.relation3,
          relation4: formval.relation4,
          relation5: formval.relation5,
          relation6: formval.relation6,
          relation7: formval.relation7,
          relation8: formval.relation8,
          relation9: formval.relation9,
          relation10: formval.relation10,
          relation11: formval.relation11,
          relation12: formval.relation12,
          relation13: formval.relation13,
          relation14: formval.relation14,
          relation15: formval.relation15,
          relation16: formval.relation16,
          relation17: formval.relation17,
          relation18: formval.relation18,
          degree1: formval.degree1,
          degree2: formval.degree2,
          degree3: formval.degree3,
          degree4: formval.degree4,
          degree5: formval.degree5,
          degree6: formval.degree6,
          degree7: formval.degree7,
          degree8: formval.degree8,
          degree9: formval.degree9,
          degree10: formval.degree10,
          degree11: formval.degree11,
          degree12: formval.degree12,
          degree13: formval.degree13,
          degree14: formval.degree14,
          degree15: formval.degree15,
          degree16: formval.degree16,
          degree17: formval.degree17,
          degree18: formval.degree18,
          hit_map_value: this.hit_map_value,
          phname: formval.phname,
          familyrelation1name: formval.familyrelation1name,
          familyrelation2name: formval.familyrelation2name,
          familyrelation3name: formval.familyrelation3name,
          familyrelation4name: formval.familyrelation4name,
          familyrelation5name: formval.familyrelation5name,
          familyrelation6name: formval.familyrelation6name,
          familyrelation7name: formval.familyrelation7name,
          familyrelation8name: formval.familyrelation8name,
          familyrelation9name: formval.familyrelation9name,
          familyrelation10name: formval.familyrelation10name,
          familyrelation11name: formval.familyrelation11name,
          familyrelation12name: formval.familyrelation12name,
          familyrelation13name: formval.familyrelation13name,
          familyrelation14name: formval.familyrelation14name,
          familyrelation15name: formval.familyrelation15name,
          familyrelation16name: formval.familyrelation16name,
          familyrelation17name: formval.familyrelation17name,
          image: formval.image,
          iscompleted: 1,
          helpdeskmailid: this.helpdeskmailid,
          uniqueid: this.patientuniqueid,
          addedbyrepdetailname: this.addedbyrepdetailname,
        };

        console.log('=================');
        console.log(this.hit_map_value);
        console.log(data);
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              this.opensaveorsubmitmodal = true;
              setTimeout(() => {
                this.opensaveorsubmitmodal = false;
                this.pateintquestioniremodal = false;
                this.showquestionarydiv = false;
                this.getpatientrecord();
              }, 2000);
            }
          }, error => {
            console.log('Oooops!');
          });
      }
    }

    else {   // only for save
      console.log('save');
     // console.log(this.planbcard);
      console.log(this.dataForm1.value);

                                                  /*HITMAP LOGIN START SAVE*/

      // POINT.  had no cancer
      if (this.dataForm1.value.cancer_sup != 'yes') {
        this.hit_map_value = 'RED';
        console.log('inside 1');
      } else {
        // POINT.  yes/male/prostrate or brest cncer/medicare-B yes
        if (this.dataForm1.value.gender1 == 'male') {
          if (this.dataForm1.value.insurance == 'Medicare' && this.planbcard == 'yes' && (this.dataForm1.value.phtype1 == 'Breast Cancer' || this.dataForm1.value.phtype1 == 'Prostate Cancer')) {
            this.hit_map_value = 'GREEN';
            console.log('inside 2');
          }
        }
        // POINT.  yes/female/ovarian/medicare-B yes
        if (this.dataForm1.value.gender1 == 'female') {
          if (this.dataForm1.value.insurance == 'Medicare' && this.planbcard == 'yes') {
            console.log('inside 3');
            if (this.dataForm1.value.phtype1 == 'Ovarian Cancer') {
              console.log('inside 4');
              this.hit_map_value = 'GREEN';
            }
            // POINT.  yes/female/breast - age below 50/medicare-B yes
            if (this.dataForm1.value.phtype1 == 'Breast Cancer' && this.dataForm1.value.phage <= 50) {
              console.log('inside 5');
              this.hit_map_value = 'GREEN';
            }
          }
        }
        // POINT.  yes/other than medicare insurance
        if (this.dataForm1.value.insurance != 'Medicare') {
          this.hit_map_value = 'YELLOW';
        }

        // POINT.  yes/medicare-B yes/other than above mentioned cancers
        if (this.dataForm1.value.insurance1 == 'Medicare' && this.planbcard == 'yes' && this.dataForm1.value.phtype1 != 'Breast Cancer' && this.dataForm1.value.phtype1 != 'Prostate Cancer' && this.dataForm1.value.phtype1 != 'Ovarian Cancer') {
          this.hit_map_value = 'YELLOW';
        }
      }
                                                   /*HITMAP LOGIN END SAVE*/

      let link= this.serverurl + 'patientrecord';
      let data = {
        patientid: this.id,
        cgx1: putcgx,
        pgxval: putpgx,
        firstname1: formval.firstname1,
        lastname1: formval.lastname1,
        phone1: formval.phone1,
        address1: formval.address1,
        city1: formval.city1,
        state1: formval.state1,
        zip1: formval.zip1,
        dob1: formval.dob1,
        gender1: formval.gender1,
        race1: formval.race1,
        height1: formval.height1,
        width1: formval.width1,
        allergies1: formval.allergies1,
        medicareclaim1: formval.medicareclaim1,
        notes1: formval.notes1,
        notes2: formval.notes2,
        notes3: formval.notes3,
        notes4: formval.notes4,
        pharmacyinsurancename: formval.pharmacyinsurancename,
        pharmacyid: formval.pharmacyid,
        pharmacybin: formval.pharmacybin,
        pharmacypcn: formval.pharmacypcn,
        pharmacygroup: formval.pharmacygroup,
        pharmacyhistory: formval.pharmacyhistory,
        pharmacyissue: formval.pharmacyissue,
        pharmacytreatment: formval.pharmacytreatment,
        topicalpain: puttopicalpain,
        oralpain: putoralpain,
        derma: putderma,
        migrane: putmigrane,
        insurance1: formval.insurance1,
        insurance2: formval.insurance2,
        insurance3: formval.insurance3,
        insurance4: formval.insurance4,
        planbcard: putplanbcard,
        medicarepolicyno: formval.medicarepolicyno,
        mediprimarypolicy: putmediprimarypolicy,
        comprimarypolicy: putcomprimarypolicy,
        phtype1: formval.phtype1,
        /*  phtype2: formval.phtype2,*/
        phage: formval.phage,
        motype1: formval.motype1,
        /*  motype2: formval.motype2,*/
        moage: formval.moage,
        modead: formval.modead,
        fatype1: formval.fatype1,
        /* fatype2: formval.fatype2,*/
        faage: formval.faage,
        fadead: formval.fadead,
        dautype1: formval.dautype1,
        /*  dautype2: formval.dautype2,*/
        dauage: formval.dauage,
        daudead: formval.daudead,
        sontype1: formval.sontype1,
        /* sontype2: formval.sontype2,*/
        sonage: formval.sonage,
        sondead: formval.sondead,
        brotype1: formval.brotype1,
        /*   brotype2: formval.brotype2,*/
        broage: formval.broage,
        brodead: formval.brodead,
        sistype1: formval.sistype1,
        /*  sistype2: formval.sistype2,*/
        sisage: formval.sisage,
        sisdead: formval.sisdead,
        neptype1: formval.neptype1,
        /*  neptype2: formval.neptype2,*/
        nepage: formval.nepage,
        nepdead: formval.nepdead,
        niecetype1: formval.niecetype1,
        /*   niecetype2: formval.niecetype2,*/
        nieceage: formval.nieceage,
        niecedead: formval.niecedead,
        unctype1: formval.unctype1,
        /*  unctype2: formval.unctype2,*/
        uncage: formval.uncage,
        uncdead: formval.uncdead,
        autntype1: formval.autntype1,
        /*  autntype2: formval.autntype2,*/
        autnage: formval.autnage,
        autndead: formval.autndead,
        moftype1: formval.moftype1,
        /*  moftype2: formval.moftype2,*/
        mofage: formval.mofage,
        mofdead: formval.mofdead,
        momotype1: formval.momotype1,
        /*  momotype2: formval.momotype2,*/
        momoage: formval.momoage,
        momodead: formval.momodead,
        daftype1: formval.daftype1,
        /*  daftype2: formval.daftype2,*/
        dafage: formval.dafage,
        dafdead: formval.dafdead,
        damtype1: formval.damtype1,
        /* damtype2: formval.damtype2,*/
        damage: formval.damage,
        damdead: formval.damdead,
        oth1type1: formval.oth1type1,
        /*  oth1type2: formval.oth1type2,*/
        oth1age: formval.oth1age,
        oth1dead: formval.oth1dead,
        oth2type1: formval.oth2type1,
        /*  oth2type2: formval.oth2type2,*/
        oth2age: formval.oth2age,
        oth2dead: formval.oth2dead,
        oth3type1: formval.oth3type1,
        /*  oth3type2: formval.oth3type2,*/
        oth3age: formval.oth3age,
        oth3dead: formval.oth3dead,
        pgx1: formval.pgx1,
        pgx2: formval.pgx2,
        pgx3: formval.pgx3,
        pgx4: formval.pgx4,
        pgx5: formval.pgx5,
        pgx6: formval.pgx6,
        pgx7: formval.pgx7,
        pgx8: formval.pgx8,
        pgx9: formval.pgx9,
        pgx10: formval.pgx10,
        pgx11: formval.pgx11,
        pgx12: formval.pgx12,
        pgx13: formval.pgx13,
        pgx14: formval.pgx14,
        pgx15: formval.pgx15,
        pgx16: formval.pgx16,
        pgx17: formval.pgx17,
        pgx18: formval.pgx18,
        /*   pgx19: formval.pgx19,*/
        carrier: formval.carrier,
        carrierplan: formval.carrierplan,
        carrierpolicyno: formval.carrierpolicyno,
        cancer_sup: putcancer_sup,
        catheters_sup: putcatheters_sup,
        allergies_sup: putallergies_sup ,
        scooter_sup: putscooter_sup,
        walker_sup: putwalker_sup,
        braces_sup: putbraces_sup,
        topical_sup: puttopical_sup,
        pain_sup: putpain_sup,
        wound_sup: putwound_sup,
        diabetic_sup: putdiabetic_sup,
        familyrelation1: formval.familyrelation1,
        familyrelation2: formval.familyrelation2,
        familyrelation3: formval.familyrelation3,
        familyrelation4: formval.familyrelation4,
        familyrelation5: formval.familyrelation5,
        familyrelation6: formval.familyrelation6,
        familyrelation7: formval.familyrelation7,
        familyrelation8: formval.familyrelation8,
        familyrelation9: formval.familyrelation9,
        familyrelation10: formval.familyrelation10,
        familyrelation11: formval.familyrelation11,
        familyrelation12: formval.familyrelation12,
        familyrelation13: formval.familyrelation13,
        familyrelation14: formval.familyrelation14,
        familyrelation15: formval.familyrelation15,
        familyrelation16: formval.familyrelation16,
        familyrelation17: formval.familyrelation17,
        relation1: formval.relation1,
        relation2: formval.relation2,
        relation3: formval.relation3,
        relation4: formval.relation4,
        relation5: formval.relation5,
        relation6: formval.relation6,
        relation7: formval.relation7,
        relation8: formval.relation8,
        relation9: formval.relation9,
        relation10: formval.relation10,
        relation11: formval.relation11,
        relation12: formval.relation12,
        relation13: formval.relation13,
        relation14: formval.relation14,
        relation15: formval.relation15,
        relation16: formval.relation16,
        relation17: formval.relation17,
        relation18: formval.relation18,
        degree1: formval.degree1,
        degree2: formval.degree2,
        degree3: formval.degree3,
        degree4: formval.degree4,
        degree5: formval.degree5,
        degree6: formval.degree6,
        degree7: formval.degree7,
        degree8: formval.degree8,
        degree9: formval.degree9,
        degree10: formval.degree10,
        degree11: formval.degree11,
        degree12: formval.degree12,
        degree13: formval.degree13,
        degree14: formval.degree14,
        degree15: formval.degree15,
        degree16: formval.degree16,
        degree17: formval.degree17,
        degree18: formval.degree18,
        hit_map_value: this.hit_map_value,
        phname: formval.phname,
        familyrelation1name: formval.familyrelation1name,
        familyrelation2name: formval.familyrelation2name,
        familyrelation3name: formval.familyrelation3name,
        familyrelation4name: formval.familyrelation4name,
        familyrelation5name: formval.familyrelation5name,
        familyrelation6name: formval.familyrelation6name,
        familyrelation7name: formval.familyrelation7name,
        familyrelation8name: formval.familyrelation8name,
        familyrelation9name: formval.familyrelation9name,
        familyrelation10name: formval.familyrelation10name,
        familyrelation11name: formval.familyrelation11name,
        familyrelation12name: formval.familyrelation12name,
        familyrelation13name: formval.familyrelation13name,
        familyrelation14name: formval.familyrelation14name,
        familyrelation15name: formval.familyrelation15name,
        familyrelation16name: formval.familyrelation16name,
        familyrelation17name: formval.familyrelation17name,
        image: formval.image,
        iscompleted: 0,
      };
      console.log('===============================================');
      console.log(this.hit_map_value);
      console.log(data);
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            this.opensaveorsubmitmodal = true;
            setTimeout(() => {
              this.opensaveorsubmitmodal = false;
              this.pateintquestioniremodal = false;
              this.showquestionarydiv = false;
            }, 2000);
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }

                                                     /*MODAL CANCELS*/
  cancel() {
    this.getdetails();
    // this.dataForm.reset();
    // this.router.navigate(['/patient-list']);
  }
  onHidden() {
    this.pateintquestioniremodal = false;
    this.opensaveorsubmitmodal = false;
    this.showdeletenotemodal = false;
    //   this.opentypemodalflag = false;
    this.opensymptommodalflag = false;
    this.showquestionarydiv = false;
    this.pgxmedicationmodal = false;

  }

  onHidden1() {
    this.opentypemodalflag = false;
    console.log('this.pateintquestioniremodal');
    console.log(this.pateintquestioniremodal);
    this.issegmentmodalshown = false;
  }
  cancelit() {
    this.dataForm2.reset();
    this.dataForm1.reset();
    this.dataForm.reset();
    this.pateintquestioniremodal = false;
    this.opensaveorsubmitmodal = false;
    this.showdeletenotemodal = false;
    this.opentypemodalflag = false;
    this.opensymptommodalflag = false;
    this.showquestionarydiv = false;
  }

                                               /*CANCER SYMPTOMS LAST POPUP FUNCTIONALITIES*/
  savecommoncancersymptoms() {
    this.issubmitcommoncancerform = false;
  }
  submitcommoncancersymptoms() {
    this.issubmitcommoncancerform = true;
  }

  opensymptommodal() {
    // to open modal and do other parts of the functions
    this.opensymptommodalflag = true;
    this.symptomdetailsbypatientid();
  }
// fetch the values if it is already saved
  symptomdetailsbypatientid() {
    let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('getcommoncancersymptomsbypatientid');
          console.log(result.id);
          let userdet = result.id;
          this.iscompletedccsrecord = result.id.iscompleted;
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
          this.getsymptommodaliscompletedornot();
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  dosubmit2(formval) {

    if (formval.weightloss == true) {
      var weightloss = 1;
    } else {
      var weightloss = 0;
    }
    if (formval.appetite == true) {
      var appetite = 1;
    } else {
      var appetite = 0;
    }
    if (formval.eatingdisorder == true) {
      var eatingdisorder = 1;
    } else {
      var eatingdisorder = 0;
    }
    if (formval.unabdominalpain == true) {
      var unabdominalpain = 1;
    } else {
      var unabdominalpain = 0;
    }
    if (formval.upabdominalpain == true) {
      var upabdominalpain = 1;
    } else {
      var upabdominalpain = 0;
    }
    if (formval.ruquadrantpain == true) {
      var ruquadrantpain = 1;
    } else {
      var ruquadrantpain = 0;
    }
    if (formval.luquadrantpain == true) {
      var luquadrantpain = 1;
    } else {
      var luquadrantpain = 0;
    }
    if (formval.labdominalpain == true) {
      var labdominalpain = 1;
    } else {
      var labdominalpain = 0;
    }
    if (formval.rlquadrantpain == true) {
      var rlquadrantpain = 1;
    } else {
      var rlquadrantpain = 0;
    }
    if (formval.llquadrantpain == true) {
      var llquadrantpain = 1;
    } else {
      var llquadrantpain = 0;
    }
    if (formval.gabdominalpain == true) {
      var gabdominalpain = 1;
    } else {
      var gabdominalpain = 0;
    }
    if (formval.vomiting1 == true) {
      var vomiting1 = 1;
    } else {
      var vomiting1 = 0;
    }
    if (formval.vomiting2 == true) {
      var vomiting2 = 1;
    } else {
      var vomiting2 = 0;
    }
    if (formval.vomiting3 == true) {
      var vomiting3 = 1;
    } else {
      var vomiting3 = 0;
    }
    if (formval.chronicfatigue == true) {
      var chronicfatigue = 1;
    } else {
      var chronicfatigue = 0;
    }
    if (formval.otherfatigue == true) {
      var otherfatigue = 1;
    } else {
      var otherfatigue = 0;
    }
    if (formval.anemia == true) {
      var anemia = 1;
    } else {
      var anemia = 0;
    }
    if (formval.jaundice == true) {
      var jaundice = 1;
    } else {
      var jaundice = 0;
    }
    if (formval.fatigue1 == true) {
      var fatigue1 = 1;
    } else {
      var fatigue1 = 0;
    }
    if (formval.fatigue2 == true) {
      var fatigue2 = 1;
    } else {
      var fatigue2 = 0;
    }
    if (formval.type1diabetes == true) {
      var type1diabetes = 1;
    } else {
      var type1diabetes = 0;
    }
    if (formval.type2diabetes == true) {
      var type2diabetes = 1;
    } else {
      var type2diabetes = 0;
    }
    if (formval.constipation == true) {
      var constipation= 1;
    } else {
      var constipation = 0;
    }
    if (formval.abnormalweightloss == true) {
      var abnormalweightloss = 1;
    } else {
      var abnormalweightloss = 0;
    }
    if (formval.abnormalweightgain == true) {
      var abnormalweightgain = 1;
    } else {
      var abnormalweightgain = 0;
    }
    if (formval.hypertrophicdisorders == true) {
      var hypertrophicdisorders = 1;
    } else {
      var hypertrophicdisorders = 0;
    }
    if (formval.bloodinstool == true) {
      var bloodinstool = 1;
    } else {
      var bloodinstool = 0;
    }
    if (formval.skineruption == true) {
      var skineruption = 1;
    } else {
      var skineruption = 0;
    }
    if (formval.xerosiscutis == true) {
      var xerosiscutis = 1;
    } else {
      var xerosiscutis = 0;
    }
    if (formval.lumpinbreast == true) {
      var lumpinbreast = 1;
    } else {
      var lumpinbreast = 0;
    }
    if (formval.thickeningbreast == true) {
      var thickeningbreast = 1;
    } else {
      var thickeningbreast = 0;
    }
    if (formval.disordersofbreast == true) {
      var disordersofbreast = 1;
    } else {
      var disordersofbreast = 0;
    }
    if (formval.nippledischarge == true) {
      var nippledischarge = 1;
    } else {
      var nippledischarge = 0;
    }
    if (formval.uterinebleeding == true) {
      var uterinebleeding = 1;
    } else {
      var uterinebleeding = 0;
    }
    if (formval.bloodinurine == true) {
      var bloodinurine = 1;
    } else {
      var bloodinurine = 0;
    }
    if (formval.melena == true) {
      var melena = 1;
    } else {
      var melena = 0;
    }
    if (formval.stomachpainabdominalpain == true) {
      var stomachpainabdominalpain = 1;
    } else {
      var stomachpainabdominalpain = 0;
    }
    if (formval.bowelhabits == true) {
      var bowelhabits = 1;
    } else {
      var bowelhabits = 0;
    }
    if (formval.unconstipation == true) {
      var unconstipation= 1;
    } else {
      var unconstipation = 0;
    }
    if (formval.diarrhea == true) {
      var diarrhea = 1;
    } else {
      var diarrhea = 0;
    }
    if (formval.colonpolyps == true) {
      var colonpolyps = 1;
    } else {
      var colonpolyps = 0;
    }
    if (formval.rectalbleeding == true) {
      var rectalbleeding= 1;
    } else {
      var rectalbleeding = 0;
    }
    if (formval.abdominalbloating1 == true) {
      var abdominalbloating1 = 1;
    } else {
      var abdominalbloating1 = 0;
    }
    if (formval.abdominalbloating2 == true) {
      var abdominalbloating2 = 1;
    } else {
      var abdominalbloating2 = 0;
    }
    if (formval.idefecation == true) {
      var idefecation= 1;
    } else {
      var idefecation = 0;
    }
    if (formval.ofecalabnormalities == true) {
      var ofecalabnormalities = 1;
    } else {
      var ofecalabnormalities = 0;
    }
    if (formval.pancreaticuabdominalpain == true) {
      var pancreaticuabdominalpain = 1;
    } else {
      var pancreaticuabdominalpain = 0;
    }
    if (formval.cholecystitis1 == true) {
      var cholecystitis1 = 1;
    } else {
      var cholecystitis1 = 0;
    }
    if (formval.cholecystitis2 == true) {
      var cholecystitis2 = 1;
    } else {
      var cholecystitis2 = 0;
    }

    if (this.issubmitcommoncancerform == true) {    // only for submit , validating the fields
      let x: any;
      for (x in this.dataForm1.controls) {
        this.dataForm1.controls[x].markAsTouched();
      }

      let link = this.serverurl + 'commoncancersymptoms';
      var data = {
        patientid: this.id,
        weightloss: weightloss,
        appetite: appetite,
        eatingdisorder: eatingdisorder,
        unabdominalpain: unabdominalpain,
        upabdominalpain: upabdominalpain,
        ruquadrantpain: ruquadrantpain,
        luquadrantpain: luquadrantpain,
        labdominalpain: labdominalpain,
        rlquadrantpain: rlquadrantpain,
        llquadrantpain: llquadrantpain,
        gabdominalpain: gabdominalpain,
        vomiting1: vomiting1,
        vomiting2: vomiting2,
        vomiting3: vomiting3,
        chronicfatigue: chronicfatigue,
        otherfatigue: otherfatigue,
        anemia: anemia,
        jaundice: jaundice,
        fatigue1: fatigue1,
        fatigue2: fatigue2,
        type1diabetes: type1diabetes,
        type2diabetes: type2diabetes,
        constipation: constipation,
        abnormalweightloss: abnormalweightloss,
        abnormalweightgain: abnormalweightgain,
        hypertrophicdisorders: hypertrophicdisorders,
        bloodinstool: bloodinstool,
        skineruption: skineruption,
        xerosiscutis: xerosiscutis,
        lumpinbreast: lumpinbreast,
        thickeningbreast: thickeningbreast,
        disordersofbreast: disordersofbreast,
        rednessnipple: formval.rednessnipple,
        nipplepain: formval.nipplepain,
        nippledischarge: nippledischarge,
        breastsize: formval.breastsize,
        breastpain: formval.breastpain,
        uterinebleeding: uterinebleeding,
        bloodinurine: bloodinurine,
        melena: melena,
        stomachpainabdominalpain: stomachpainabdominalpain,
        bowelhabits: bowelhabits,
        unconstipation: unconstipation,
        diarrhea: diarrhea,
        colonpolyps: colonpolyps,
        rectalbleeding: rectalbleeding,
        abdominalbloating1: abdominalbloating1,
        abdominalbloating2: abdominalbloating2,
        idefecation: idefecation,
        ofecalabnormalities: ofecalabnormalities,
        pancreaticuabdominalpain: pancreaticuabdominalpain,
        cholecystitis1: cholecystitis1,
        cholecystitis2: cholecystitis2,
        noofbloodclots: formval.noofbloodclots,
        iscompleted: 1
      };
      console.log(data);
      if (this.dataForm2.valid) {
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              this.opensymptommodalflag = false;
              this.opensaveorsubmitmodal = true;
              setTimeout(() => {
                this.opensaveorsubmitmodal = false;
                this.symptomdetailsbypatientid();
              }, 2000);
            }
          }, error => {
            console.log('Oooops!');
          });
      }
    }
    else {
      let link = this.serverurl + 'commoncancersymptoms';
      var data = {
        patientid: this.id,
        weightloss: weightloss,
        appetite: appetite,
        eatingdisorder: eatingdisorder,
        unabdominalpain: unabdominalpain,
        upabdominalpain: upabdominalpain,
        ruquadrantpain: ruquadrantpain,
        luquadrantpain: luquadrantpain,
        labdominalpain: labdominalpain,
        rlquadrantpain: rlquadrantpain,
        llquadrantpain: llquadrantpain,
        gabdominalpain: gabdominalpain,
        vomiting1: vomiting1,
        vomiting2: vomiting2,
        vomiting3: vomiting3,
        chronicfatigue: chronicfatigue,
        otherfatigue: otherfatigue,
        anemia: anemia,
        jaundice: jaundice,
        fatigue1: fatigue1,
        fatigue2: fatigue2,
        type1diabetes: type1diabetes,
        type2diabetes: type2diabetes,
        constipation: constipation,
        abnormalweightloss: abnormalweightloss,
        abnormalweightgain: abnormalweightgain,
        hypertrophicdisorders: hypertrophicdisorders,
        bloodinstool: bloodinstool,
        skineruption: skineruption,
        xerosiscutis: xerosiscutis,
        lumpinbreast: lumpinbreast,
        thickeningbreast: thickeningbreast,
        disordersofbreast: disordersofbreast,
        rednessnipple: formval.rednessnipple,
        nipplepain: formval.nipplepain,
        nippledischarge: nippledischarge,
        breastsize: formval.breastsize,
        breastpain: formval.breastpain,
        uterinebleeding: uterinebleeding,
        bloodinurine: bloodinurine,
        melena: melena,
        stomachpainabdominalpain: stomachpainabdominalpain,
        bowelhabits: bowelhabits,
        unconstipation: unconstipation,
        diarrhea: diarrhea,
        colonpolyps: colonpolyps,
        rectalbleeding: rectalbleeding,
        abdominalbloating1: abdominalbloating1,
        abdominalbloating2: abdominalbloating2,
        idefecation: idefecation,
        ofecalabnormalities: ofecalabnormalities,
        pancreaticuabdominalpain: pancreaticuabdominalpain,
        cholecystitis1: cholecystitis1,
        cholecystitis2: cholecystitis2,
        noofbloodclots: formval.noofbloodclots,
        iscompleted: 0
      };
      console.log(data);
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            this.opensymptommodalflag = false;
            this.opensaveorsubmitmodal = true;
            setTimeout(() => {
              this.opensaveorsubmitmodal = false;
            }, 2000);
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }

                                /*TO PUT LAST POP VALUE TO PATIENT PROFILE SHEET*/
  opentypemodal(val) {
    this.opentypemodalflag = true;
    if (val == 1) {
      if (this.dataForm1.value.phtype1 != null) {
        this.symptomtype = this.dataForm1.value.phtype1;
      }
      this.val = 1;
    }if (val == 2) {
      if (this.dataForm1.value.motype1 != null) {
        this.symptomtype = this.dataForm1.value.motype1;
      }
      this.val = 2;
    }if (val == 3) {
      if (this.dataForm1.value.fatype1 != null) {
        this.symptomtype = this.dataForm1.value.fatype1;
      }
      this.val = 3;
    }if (val == 4) {
      if (this.dataForm1.value.dautype1 != null) {
        this.symptomtype = this.dataForm1.value.dautype1;
      }
      this.val = 4;
    }if (val == 5) {
      if (this.dataForm1.value.sontype1 != null) {
        this.symptomtype = this.dataForm1.value.sontype1;
      }
      this.val = 5;
    }if (val == 6) {
      if (this.dataForm1.value.brotype1 != null) {
        this.symptomtype = this.dataForm1.value.brotype1;
      }
      this.val = 6;
    }if (val == 7) {
      if (this.dataForm1.value.sistype1 != null) {
        this.symptomtype = this.dataForm1.value.sistype1;
      }
      this.val = 7;
    }if (val == 8) {
      if (this.dataForm1.value.neptype1 != null) {
        this.symptomtype = this.dataForm1.value.neptype1;
      }
      this.val = 8;
    }if (val == 9) {
      if (this.dataForm1.value.niecetype1 != null) {
        this.symptomtype = this.dataForm1.value.niecetype1;
      }
      this.val = 9;
    }if (val == 10) {
      if (this.dataForm1.value.unctype1 != null) {
        this.symptomtype = this.dataForm1.value.unctype1;
      }
      this.val = 10;
    }if (val == 11) {
      if (this.dataForm1.value.autntype1 != null) {
        this.symptomtype = this.dataForm1.value.autntype1;
      }
      this.val = 11;
    }if (val == 12) {
      if (this.dataForm1.value.moftype1 != null) {
        this.symptomtype = this.dataForm1.value.moftype1;
      }
      this.val = 12;
    }if (val == 13) {
      if (this.dataForm1.value.momotype1 != null) {
        this.symptomtype = this.dataForm1.value.momotype1;
      }
      this.val = 13;
    }if (val == 14) {
      if (this.dataForm1.value.daftype1 != null) {
        this.symptomtype = this.dataForm1.value.daftype1;
      }
      this.val = 14;
    }if (val == 15) {
      if (this.dataForm1.value.damtype1 != null) {
        this.symptomtype = this.dataForm1.value.damtype1;
      }
      this.val = 15;
    }if (val == 16) {
      if (this.dataForm1.value.oth1type1 != null) {
        this.symptomtype = this.dataForm1.value.oth1type1;
      }
      this.val = 16;
    }if (val == 17) {
      if (this.dataForm1.value.oth2type1 != null) {
        this.symptomtype = this.dataForm1.value.oth2type1;
      }
      this.val = 17;
    }if (val == 18) {
      if (this.dataForm1.value.oth3type1 != null) {
        this.symptomtype = this.dataForm1.value.oth3type1;
      }
      this.val = 18;
    }
  }

  putvaluetodataform1() {
    if (this.val == 1) {
      this.dataForm1.patchValue({
        phtype1 : this.symptomtype
      });
    }  if (this.val == 2) {
      this.dataForm1.patchValue({
        motype1 : this.symptomtype
      });
    }  if (this.val == 3) {
      this.dataForm1.patchValue({
        fatype1 : this.symptomtype
      });
    }  if (this.val == 4) {
      this.dataForm1.patchValue({
        dautype1 : this.symptomtype
      });
    }  if (this.val == 5) {
      this.dataForm1.patchValue({
        sontype1 : this.symptomtype
      });
    }  if (this.val == 6) {
      this.dataForm1.patchValue({
        brotype1 : this.symptomtype
      });
    }  if (this.val == 7) {
      this.dataForm1.patchValue({
        sistype1 : this.symptomtype
      });
    }  if (this.val == 8) {
      this.dataForm1.patchValue({
        neptype1 : this.symptomtype
      });
    }  if (this.val == 9) {
      this.dataForm1.patchValue({
        niecetype1 : this.symptomtype
      });
    }  if (this.val == 10) {
      this.dataForm1.patchValue({
        unctype1 : this.symptomtype
      });
    }  if (this.val == 11) {
      this.dataForm1.patchValue({
        autntype1 : this.symptomtype
      });
    }  if (this.val == 12) {
      this.dataForm1.patchValue({
        moftype1 : this.symptomtype
      });
    }  if (this.val == 13) {
      this.dataForm1.patchValue({
        momotype1 : this.symptomtype
      });
    }  if (this.val == 14) {
      this.dataForm1.patchValue({
        daftype1 : this.symptomtype
      });
    }  if (this.val == 15) {
      this.dataForm1.patchValue({
        damtype1 : this.symptomtype
      });
    }  if (this.val == 16) {
      this.dataForm1.patchValue({
        oth1type1 : this.symptomtype
      });
    }  if (this.val == 17) {
      this.dataForm1.patchValue({
        oth2type1 : this.symptomtype
      });
    }  if (this.val == 18) {
      this.dataForm1.patchValue({
        oth3type1 : this.symptomtype
      });
    }
    this.opentypemodalflag = false;
    this.symptomtype = null;
    console.log('this.dataForm1');
    console.log(this.dataForm1);
  }

  cancelvaluefromdataform1() {
    if (this.val == 1) {
      this.dataForm1.patchValue({
        phtype1 : null
      });
    }  if (this.val == 2) {
      this.dataForm1.patchValue({
        motype1 : null
      });
    }  if (this.val == 3) {
      this.dataForm1.patchValue({
        fatype1 : null
      });
    }  if (this.val == 4) {
      this.dataForm1.patchValue({
        dautype1 : null
      });
    }  if (this.val == 5) {
      this.dataForm1.patchValue({
        sontype1 : null
      });
    }  if (this.val == 6) {
      this.dataForm1.patchValue({
        brotype1 : null
      });
    }  if (this.val == 7) {
      this.dataForm1.patchValue({
        sistype1 : null
      });
    }  if (this.val == 8) {
      this.dataForm1.patchValue({
        neptype1 : null
      });
    }  if (this.val == 9) {
      this.dataForm1.patchValue({
        niecetype1 : null
      });
    }  if (this.val == 10) {
      this.dataForm1.patchValue({
        unctype1 : null
      });
    }  if (this.val == 11) {
      this.dataForm1.patchValue({
        autntype1 : null
      });
    }  if (this.val == 12) {
      this.dataForm1.patchValue({
        moftype1 : null
      });
    }  if (this.val == 13) {
      this.dataForm1.patchValue({
        momotype1 : null
      });
    }  if (this.val == 14) {
      this.dataForm1.patchValue({
        daftype1 : null
      });
    }  if (this.val == 15) {
      this.dataForm1.patchValue({
        damtype1 : null
      });
    }  if (this.val == 16) {
      this.dataForm1.patchValue({
        oth1type1 : null
      });
    }  if (this.val == 17) {
      this.dataForm1.patchValue({
        oth2type1 : null
      });
    }  if (this.val == 18) {
      this.dataForm1.patchValue({
        oth3type1 : null
      });
    }
    this.opentypemodalflag = false;
    this.symptomtype = null;
  }
  callimagesegment() {
    this.issegmentmodalshown = true;
  }
  saveimages() {
    console.log('this.files00000000');
    console.log(this.files);
    this.dataForm1.patchValue({image: this.files[0].response});
    this.issegmentmodalshown = false;
  }
/*  deleteimage(imagename: any) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    // var link ='http://influxiq.com:3001/deleteimage';
    var data = {id: '', image: imagename};
    this._http.post(link, data)
      .subscribe(res => {
        var result = res.json();
        if (result.status == 'success') {
          console.log('Image Deleted');
          this.uploadedfilesrc = '';
          this.progress = 0;
        }

      }, error => {
        console.log("Oooops!");
      });
  }*/
  onUploadOutput(output: UploadOutput): void {
  //  setTimeout(() => {
      // alert(8);
      if (output.type === 'allAddedToQueue') { // when all files added in queue
        // uncomment this if you want to auto upload files when added
        this.disableuploader = 1;
        console.log('this.disableuploader === before');
     //   console.log(this.disableuploader);
       // setTimeout(()=> {
          const event: UploadInput = {
            type: 'uploadAll',
            url: this.serverurl + 'uploads',
            method: 'POST',
            // data: {foo: output.file}
          };
          this.uploadInput.emit(event);

    //    }, 1200);
      } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
       // setTimeout(()=> {    // <<<---    using ()=> syntax
         // console.log('output.file[0].response');
         // console.log(output.file.response);
         // console.log(output.file);
         // console.log(output.file);
          // this.files.push(output.file);
          if (output.file.response != "") {
            // alert(7);
          //  console.log('output.file-------------------');
          //  console.log(output.file);
           // console.log(output.file.response);
            // console.log(output.file[0].response);
            this.files = [];
            this.files.push(output.file);
          }
          this.disableuploader = 0;
        //  console.log('this.disableuploader after');
         // console.log(this.disableuploader);
          // alert(22);
          // console.log(this.files);
        //  console.log('this.files');
        //  console.log(this.files);
          // alert(55);
          //  console.log(output.file[0].response);
     //   }, 1300);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // alert(9);
        console.log(this.files);
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
   // }, 1200);
    console.log('files??');
    console.log(this.files);
  }

  openpgxmedicationmodal() {
    this.pgxmedicationmodal = true;
  }
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
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
}

