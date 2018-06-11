import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
declare var $: any;

@Component({
    selector: 'app-pateints',
    templateUrl: './pateints.component.html',
    styleUrls: ['./pateints.component.css'],
    providers: [Commonservices],
})
export class PateintsComponent implements OnInit {
    public serverurl;
    public usastates;
    public idtoapproveordecline;
    public datalist;
    public isthisadmin;
    public p: number = 1;
    public addcookie: CookieService;
    public cookiedetails;
    public tags;
    public repuniqueid;
    public patientlist: any = [];
    public dataForm1: FormGroup ;
    public pateintquestioniremodal: boolean = false;
    public openapprovemodal: boolean = false;
    public opendeclinemodal: boolean = false;
    public fb;
    public patientuniqueid;
    // public cookieuniqueid;
    public patientnametoapproveordecline;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.fb = fb;
        this.getusastates();
        // this.getPatientList();
        // console.log('this.isthisadmin**************');
        // console.log(this.isthisadmin);
        //  if (this.isthisadmin != 'admin') {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        //  this.callcookiedetails();
        console.log(this.cookiedetails);
        // this.getpatientlistunderthisid();
        //  }
        this.alltags();
        this.dataForm1 = this.fb.group({
            cgx1: [''],
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
    /* callcookiedetails() {
    let link = this.serverurl + 'getuserdetails';
    let data = {userid : this.cookiedetails.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          this.cookieuniqueid = result.id.uniqueid;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }*/
    getpatientuniqueid(patientid) {
        let link = this.serverurl + 'getpatientdetails';
        let data = {_id : patientid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
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
    showquestionaryform(itemid) {
        let link = this.serverurl + 'getpatientdetailsbypatientid';
        let data = {patientid : itemid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('===========');
                    console.log(result.id);
                    let userdet = result.id;
                    this.getpatientuniqueid(result.id.patientid);
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
                        medicareclaim1: [userdet.medicareclaim],
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
                }
            }, error => {
                console.log('Ooops');
            });
        this.pateintquestioniremodal = true;
        setTimeout(() => {
            $( '#formquestionary' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    onHidden() {
        this.pateintquestioniremodal = false;
        this.openapprovemodal = false;
        this.opendeclinemodal = false;
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
    gotopdf(id) {
        var url = 'http://nexhealthtoday.com/testpdf/html2pdf/ppqformpdf.php?id=' + id;
        //  window.location.href = (url , '_blank');
        window.open(url, '_blank');
    }
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
    /* gotopatientrecord(id) {
    this.router.navigate(['/patientrecord', id]);
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
    get4rowClass() {
        if (this.isthisadmin != 'admin') {
            return 'pateints_list_weraper4row';
        }
    }
    approveitmodal(itemtoapprove) {
        this.openapprovemodal = true;
        this.idtoapproveordecline = itemtoapprove._id;
        this.patientnametoapproveordecline = itemtoapprove.firstname + ' ' + itemtoapprove.lastname;
    }
    declineitmodal(itemtodecline) {
        this.opendeclinemodal = true;
        this.idtoapproveordecline = itemtodecline._id;
        this.patientnametoapproveordecline = itemtodecline.firstname + ' ' + itemtodecline.lastname;
    }
    approveit() {
        let link = this.serverurl + 'patientapprove';
        let data = {
            patientid: this.idtoapproveordecline,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.openapprovemodal = false;
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
    declineit() {
        let link = this.serverurl + 'patientdecline';
        let data = {
            patientid: this.idtoapproveordecline,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.opendeclinemodal = false;
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
