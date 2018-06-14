import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var $: any;
declare var moment: any;

@Component({
    selector: 'app-patientrecord',
    templateUrl: './patientrecord.component.html',
    styleUrls: ['./patientrecord.component.css'],
    providers: [Commonservices],
})
export class PatientrecordComponent implements OnInit {
    public dataForm: FormGroup ;
    public dataForm1: FormGroup ;
    public fb;
    public fb1;
    public pgxval : boolean = false;
    public deleteid;
    public editnoteid;
    public type;
    public patientdetails;
    public usastates;
    public issubmit;
    public tagstatus;
    public shownoteerror;
    public divaddnote;
    public addnote;
    public noteslist;
    public addit = 1;
    public allnotearr: any =[];
    public patient_added_on;
    public opensaveorsubmitmodal: boolean = false;
    public showdeletenotemodal: boolean = false;
    public showdeletesuccessmodal: boolean = false;
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
    private cookiedetails;
    public iscompletedpatientrecord=0;
    // public isdisable=0;

    constructor(fb: FormBuilder, fb1: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, addcookie: CookieService) {
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
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: [''],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            city: ['', Validators.required],
            state: ['', Validators.required]
        });

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
            phtype1: ['', Validators.required],
            phtype2: [''],
            phage: [''],
            motype1: [''],
            motype2: [''],
            moage: [''],
            modead: [''],
            fatype1: [''],
            fatype2: [''],
            faage: [''],
            fadead: [''],
            dautype1: [''],
            dautype2: [''],
            dauage: [''],
            daudead: [''],
            sontype1: [''],
            sontype2: [''],
            sonage: [''],
            sondead: [''],
            brotype1: [''],
            brotype2: [''],
            broage: [''],
            brodead: [''],
            sistype1: [''],
            sistype2: [''],
            sisage: [''],
            sisdead: [''],
            neptype1: [''],
            neptype2: [''],
            nepage: [''],
            nepdead: [''],
            niecetype1: [''],
            niecetype2: [''],
            nieceage: [''],
            niecedead: [''],
            unctype1: [''],
            unctype2: [''],
            uncage: [''],
            uncdead: [''],
            autntype1: [''],
            autntype2: [''],
            autnage: [''],
            autndead: [''],
            moftype1: [''],
            moftype2: [''],
            mofage: [''],
            mofdead: [''],
            momotype1: [''],
            momotype2: [''],
            momoage: [''],
            momodead: [''],
            daftype1: [''],
            daftype2: [''],
            dafage: [''],
            dafdead: [''],
            damtype1: [''],
            damtype2: [''],
            damage: [''],
            damdead: [''],
            oth1type1: [''],
            oth1type2: [''],
            oth1age: [''],
            oth1dead: [''],
            oth2type1: [''],
            oth2type2: [''],
            oth2age: [''],
            oth2dead: [''],
            oth3type1: [''],
            oth3type2: [''],
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
            pgx19: ['']
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
    editnote(item) {
        this.editnoteid=item._id;
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
    openquesmodal() {
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
                phtype1: ['', Validators.required],
                phtype2: [''],
                phage: [''],
                motype1: [''],
                motype2: [''],
                moage: [''],
                modead: [''],
                fatype1: [''],
                fatype2: [''],
                faage: [''],
                fadead: [''],
                dautype1: [''],
                dautype2: [''],
                dauage: [''],
                daudead: [''],
                sontype1: [''],
                sontype2: [''],
                sonage: [''],
                sondead: [''],
                brotype1: [''],
                brotype2: [''],
                broage: [''],
                brodead: [''],
                sistype1: [''],
                sistype2: [''],
                sisage: [''],
                sisdead: [''],
                neptype1: [''],
                neptype2: [''],
                nepage: [''],
                nepdead: [''],
                niecetype1: [''],
                niecetype2: [''],
                nieceage: [''],
                niecedead: [''],
                unctype1: [''],
                unctype2: [''],
                uncage: [''],
                uncdead: [''],
                autntype1: [''],
                autntype2: [''],
                autnage: [''],
                autndead: [''],
                moftype1: [''],
                moftype2: [''],
                mofage: [''],
                mofdead: [''],
                momotype1: [''],
                momotype2: [''],
                momoage: [''],
                momodead: [''],
                daftype1: [''],
                daftype2: [''],
                dafage: [''],
                dafdead: [''],
                damtype1: [''],
                damtype2: [''],
                damage: [''],
                damdead: [''],
                oth1type1: [''],
                oth1type2: [''],
                oth1age: [''],
                oth1dead: [''],
                oth2type1: [''],
                oth2type2: [''],
                oth2age: [''],
                oth2dead: [''],
                oth3type1: [''],
                oth3type2: [''],
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
                pgx19: ['']
            });
            this.getpatientdetailsbypatientid();
        }, 1000);
    }
    show_div_to_add_note() {
        this.divaddnote = true;
    }
    openquesmodalreadonly() {
        this.getpatientdetailsbypatientid();
        this.pateintquestioniremodal = true;
        setTimeout(() => {
            $('#formquestionary').find('input[type="submit"]').hide();
            $('#formquestionary').find('input[type="button"]').hide();
            $( '#formquestionary' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    // after save when we are trying to get the saved values
    getpatientdetailsbypatientid() {
        let link = this.serverurl + 'getpatientdetailsbypatientid';
        let data = {patientid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('PATIENTRECORD VALUES---------');
                    console.log(result.id);
                    let userdet = result.id;
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
                        phtype1: [userdet.phtype1, Validators.required],
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
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit1(formval) {
        console.log('? ' + this.dataForm1.valid);
        if (formval.cgx1 == true) {
            var putcgx = 1;
        }
        if (formval.cgx1 != true) {
            var putcgx = 0;
        }
        if (this.pgxval == true) {
            var putpgx = 1;
        }
        if (this.pgxval != true) {
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
        if (this.issubmit == true) {  // only for submit
            let x: any;
            for (x in this.dataForm1.controls) {
                this.dataForm1.controls[x].markAsTouched();
            }
            if (this.dataForm1.valid) {
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
                    phtype1: formval.phtype1,
                    phtype2: formval.phtype2,
                    phage: formval.phage,
                    motype1: formval.motype1,
                    motype2: formval.motype2,
                    moage: formval.moage,
                    modead: formval.modead,
                    fatype1: formval.fatype1,
                    fatype2: formval.fatype2,
                    faage: formval.faage,
                    fadead: formval.fadead,
                    dautype1: formval.dautype1,
                    dautype2: formval.dautype2,
                    dauage: formval.dauage,
                    daudead: formval.daudead,
                    sontype1: formval.sontype1,
                    sontype2: formval.sontype2,
                    sonage: formval.sonage,
                    sondead: formval.sondead,
                    brotype1: formval.brotype1,
                    brotype2: formval.brotype2,
                    broage: formval.broage,
                    brodead: formval.brodead,
                    sistype1: formval.sistype1,
                    sistype2: formval.sistype2,
                    sisage: formval.sisage,
                    sisdead: formval.sisdead,
                    neptype1: formval.neptype1,
                    neptype2: formval.neptype2,
                    nepage: formval.nepage,
                    nepdead: formval.nepdead,
                    niecetype1: formval.niecetype1,
                    niecetype2: formval.niecetype2,
                    nieceage: formval.nieceage,
                    niecedead: formval.niecedead,
                    unctype1: formval.unctype1,
                    unctype2: formval.unctype2,
                    uncage: formval.uncage,
                    uncdead: formval.uncdead,
                    autntype1: formval.autntype1,
                    autntype2: formval.autntype2,
                    autnage: formval.autnage,
                    autndead: formval.autndead,
                    moftype1: formval.moftype1,
                    moftype2: formval.moftype2,
                    mofage: formval.mofage,
                    mofdead: formval.mofdead,
                    momotype1: formval.momotype1,
                    momotype2: formval.momotype2,
                    momoage: formval.momoage,
                    momodead: formval.momodead,
                    daftype1: formval.daftype1,
                    daftype2: formval.daftype2,
                    dafage: formval.dafage,
                    dafdead: formval.dafdead,
                    damtype1: formval.damtype1,
                    damtype2: formval.damtype2,
                    damage: formval.damage,
                    damdead: formval.damdead,
                    oth1type1: formval.oth1type1,
                    oth1type2: formval.oth1type2,
                    oth1age: formval.oth1age,
                    oth1dead: formval.oth1dead,
                    oth2type1: formval.oth2type1,
                    oth2type2: formval.oth2type2,
                    oth2age: formval.oth2age,
                    oth2dead: formval.oth2dead,
                    oth3type1: formval.oth3type1,
                    oth3type2: formval.oth3type2,
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
                    pgx19: formval.pgx19,
                    iscompleted: 1,
                };

                console.log(data);
                this._http.post(link, data)
                    .subscribe(res => {
                        let result = res.json();
                        if (result.status == 'success') {
                            this.opensaveorsubmitmodal = true;
                            setTimeout(() => {
                                this.opensaveorsubmitmodal = false;
                                this.pateintquestioniremodal = false;
                                this.getpatientrecord();
                            }, 2000);
                        }
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }

        else{   // only for save
            console.log('save');
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
                phtype1: formval.phtype1,
                phtype2: formval.phtype2,
                phage: formval.phage,
                motype1: formval.motype1,
                motype2: formval.motype2,
                moage: formval.moage,
                modead: formval.modead,
                fatype1: formval.fatype1,
                fatype2: formval.fatype2,
                faage: formval.faage,
                fadead: formval.fadead,
                dautype1: formval.dautype1,
                dautype2: formval.dautype2,
                dauage: formval.dauage,
                daudead: formval.daudead,
                sontype1: formval.sontype1,
                sontype2: formval.sontype2,
                sonage: formval.sonage,
                sondead: formval.sondead,
                brotype1: formval.brotype1,
                brotype2: formval.brotype2,
                broage: formval.broage,
                brodead: formval.brodead,
                sistype1: formval.sistype1,
                sistype2: formval.sistype2,
                sisage: formval.sisage,
                sisdead: formval.sisdead,
                neptype1: formval.neptype1,
                neptype2: formval.neptype2,
                nepage: formval.nepage,
                nepdead: formval.nepdead,
                niecetype1: formval.niecetype1,
                niecetype2: formval.niecetype2,
                nieceage: formval.nieceage,
                niecedead: formval.niecedead,
                unctype1: formval.unctype1,
                unctype2: formval.unctype2,
                uncage: formval.uncage,
                uncdead: formval.uncdead,
                autntype1: formval.autntype1,
                autntype2: formval.autntype2,
                autnage: formval.autnage,
                autndead: formval.autndead,
                moftype1: formval.moftype1,
                moftype2: formval.moftype2,
                mofage: formval.mofage,
                mofdead: formval.mofdead,
                momotype1: formval.momotype1,
                momotype2: formval.momotype2,
                momoage: formval.momoage,
                momodead: formval.momodead,
                daftype1: formval.daftype1,
                daftype2: formval.daftype2,
                dafage: formval.dafage,
                dafdead: formval.dafdead,
                damtype1: formval.damtype1,
                damtype2: formval.damtype2,
                damage: formval.damage,
                damdead: formval.damdead,
                oth1type1: formval.oth1type1,
                oth1type2: formval.oth1type2,
                oth1age: formval.oth1age,
                oth1dead: formval.oth1dead,
                oth2type1: formval.oth2type1,
                oth2type2: formval.oth2type2,
                oth2age: formval.oth2age,
                oth2dead: formval.oth2dead,
                oth3type1: formval.oth3type1,
                oth3type2: formval.oth3type2,
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
                pgx19: formval.pgx19,
                iscompleted: 0,
            };

            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.opensaveorsubmitmodal = true;
                        setTimeout(() => {
                            this.opensaveorsubmitmodal = false;
                            this.pateintquestioniremodal = false;
                        }, 2000);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
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
    cancel() {
        this.getdetails();
        // this.dataForm.reset();
        // this.router.navigate(['/patient-list']);
    }
    onHidden() {
        this.pateintquestioniremodal = false;
        this.opensaveorsubmitmodal = false;
        this.showdeletenotemodal = false;
    }
    savepateintquestionire() {
        this.issubmit = false;
        console.log('save');
    }
    submitpateintquestionire() {
        this.issubmit = true;
        console.log('submit');
    }
}
