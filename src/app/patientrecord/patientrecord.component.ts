import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

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
    public usastates;
    id: number;
    public serverurl;
    public patientuniqueid;
    public cookieuniqueid;
    public pateintquestioniremodal: boolean = false;
    private addcookie: CookieService;
    private cookiedetails;

    constructor(fb: FormBuilder, fb1: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, addcookie: CookieService) {
        this.fb = fb;
        this.fb1 = fb1;
        this.serverurl = _commonservices.url;
        this.getusastates();
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this.callcookiedetails();
    }
    callcookiedetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.cookiedetails.id};
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
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetails();
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
            allergies1: ['', Validators.required],
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
            phtype1: [''],
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

    getusastates() {
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.usastates = result;

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
                console.log(result);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    // console.log(result);
                    let userdet = result.item;
                    this.patientuniqueid = result.item.uniqueid;
                    console.log('patientuniqueid' +this.patientuniqueid);
                    this.dataForm = this.fb.group({
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        email: [userdet.email],
                        phone: [userdet.phone, Validators.required],
                        city: [userdet.city, Validators.required],
                        state: [userdet.state, Validators.required]
                    });
                } else {
                    this.router.navigate(['/patient-list']);
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
                    this.pateintquestioniremodal = true;
                  //  this.router.navigate(['/patient-list']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    dosubmit1(formval) {
        console.log('? ' + this.dataForm1.valid);
        if (formval.cgx1 == true) {
            var putcgx = 1;
        }if (formval.cgx1 != true) {
            var putcgx= 0;
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

        let x: any;
        for (x in this.dataForm1.controls) {
            this.dataForm1.controls[x].markAsTouched();
        }
        if (this.dataForm1.valid) {
            let link= this.serverurl + 'patientrecord';
            let data = {
                patientid: this.id,
                cgx1: putcgx,
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
            };

            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.router.navigate(['/patient-list']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    cancel() {
        this.dataForm.reset();
        this.router.navigate(['/patient-list']);
    }
    onHidden() {
        this.pateintquestioniremodal = false;
    }
    savepateintquestionire() {

    }
}