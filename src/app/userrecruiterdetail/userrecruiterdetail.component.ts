import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var moment: any;
@Component({
    selector: 'app-userrecruiterdetail',
    templateUrl: './userrecruiterdetail.component.html',
    styleUrls: ['./userrecruiterdetail.component.css'],
    providers: [Commonservices],
})
export class UserrecruiterdetailComponent implements OnInit {
    public serverurl;
    public id;
    public type;

    public dataForm: FormGroup ;
    public fb;
    public usastates;
    public passerror ;
    public getdetailsbyidis ;

    constructor( fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.getusastates();
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
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsbyid();
        });
        this.dataForm = this.fb.group({
            uniqueid: ['', Validators.required],
            username: ['', Validators.required],
            password: [''],
            confpassword: [''],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            address: ['', Validators.required],
            address2: [''],
            email: [''],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            city: ['', Validators.required],
            state: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            type: ['', Validators.required],
            addedby: ['', Validators.required],
            notes: ['', Validators.required],
            status: ['', Validators.required],
            zip: ['', Validators.required],
            subdomain: ['', Validators.required],


            agentexperience: ['', Validators.required],
            olderclients: ['', Validators.required],
            noofplanBcard: ['', Validators.required],
        });
    }
    showtime(dateis) {
        if (dateis != null) {
        return moment(dateis).format('MM-DD-YYYY');
    }
    else {
        return '';
        }
    }
    showtagname(tag) {
        if (tag == '5af52976bdf5fa3d4f18aeaf') {
            return 'Employment Contract Pending';
        }
        if (tag == '5af52980bdf5fa3d4f18aeb1') {
            return 'Training Pending';
        }
        if (tag == '5af5297fbdf5fa3d4f18aeb0') {
            return 'Webinar Pending';
        }
        if (tag == '5afad90dde56b53d10e2ab4d') {
            return 'PF submitted';
        }
        if (tag == '5b0bfa1b3fe08865e7955f71') {
            return 'PPS Accepted';
        }
        if (tag == '5b0bfa1d3fe08865e7955f72') {
            return 'PPS Declined';
        }
        if (tag == '5b0cda8121eaaa0244d52b9e') {
            return 'Lead';
        }
        if (tag == '5b0b9235b33cbc2d4af08dd9') {
            return 'PPS Submitted';
        }
    }
    gotoagreementpdf(id) {
        var url = 'http://altushealthgroup.com/testpdf/html2pdf/employment-agreement.php?id=' + id;
        window.open(url, '_blank');
    }
    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetailswithtags';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('result.id------------------------------');
                    console.log(result.id);
                    this.getdetailsbyidis = result.id;
                    let userdet = result.id;
                    this.type = userdet.type;
                    this.dataForm = this.fb.group({
                        uniqueid: [userdet.uniqueid],
                        username: [userdet.username],
                        password: [''],
                        confpassword: [''],
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        address: [userdet.address, Validators.required],
                        address2: [userdet.address2],
                        email: [userdet.email],
                        //   phone: [userdet.phone, Validators.required],
                        phone: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                        city: [userdet.city, Validators.required],
                        state: [userdet.state, Validators.required],
                        gender: [userdet.gender, Validators.required],
                        dob: [userdet.dob, Validators.required],
                        type: [userdet.type, Validators.required],
                        addedby: [userdet.addedby],
                        /* notes: [userdet.notes, Validators.required],
                        status: [userdet.status, Validators.required],*/
                        zip: [userdet.zip, Validators.required],
                        subdomain: [userdet.username],



                        agentexperience: [userdet.agentexperience, Validators.required],
                        olderclients: [userdet.olderclients, Validators.required],
                        noofplanBcard: [userdet.noofplanBcard, Validators.required],
                    });
                } else {
                    // this.router.navigate(['/patient-list']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        this.passerror = null;
        console.log(this.dataForm.valid);
        console.log(formval.agentexperience);
        console.log(formval.password);
        if (formval.password == null || formval.password == '') {
            console.log('pass null');
            //  if (this.dataForm.valid && this.passmatchvalidate && UserrecruitereditComponent.invalidpassword == false) {
            if (this.dataForm.valid) {
                let link= this.serverurl + 'edituserdetails';
                let data = {
                    id: this.id,
                    firstname: formval.firstname,
                    lastname: formval.lastname,
                    address: formval.address,
                    address2: formval.address2,
                    phone: formval.phone,
                    city: formval.city,
                    state: formval.state,
                    zip: formval.zip,
                    gender: formval.gender,
                    dob: formval.dob,
                    type: formval.type,



                    agentexperience: formval.agentexperience,
                    olderclients: formval.olderclients,
                    noofplanBcard: formval.noofplanBcard,
                };
                console.log(data);
                this._http.post(link, data)
                    .subscribe(data => {
                        this.router.navigate(['/userrecruiterlist', formval.type]);
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        else {
            console.log('pass givrn');
            console.log(formval.password);
            this.passerror = null;
            if (formval.password == formval.confpassword) {
                console.log('1 step ahd');
                console.log(formval.password.length);
                if (formval.password.length >= 8) {
                    console.log('2 step ahd');
                    if (!formval.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                        this.passerror = 'Password must contain at least 8 characters,one lower case character , one upper case character , one number, one special character';
                        console.log('3 step ahd');
                    }
                    else {
                        this.passerror = null;
                        console.log('4 step ahd');
                        // if (this.dataForm.valid) {
                        console.log('yo');
                        let link= this.serverurl + 'edituserdetails';
                        let data = {
                            id: this.id,
                            firstname: formval.firstname,
                            lastname: formval.lastname,
                            password: formval.password,
                            address: formval.address,
                            address2: formval.address2,
                            phone: formval.phone,
                            city: formval.city,
                            state: formval.state,
                            zip: formval.zip,
                            gender: formval.gender,
                            dob: formval.dob,
                            type: formval.type,


                            agentexperience: formval.agentexperience,
                            olderclients: formval.olderclients,
                            noofplanBcard: formval.noofplanBcard,
                        };
                        console.log(data);
                        this._http.post(link, data)
                            .subscribe(data => {
                                this.router.navigate(['/userrecruiterlist', formval.type]);
                            }, error => {
                                console.log('Oooops!');
                            });
                        //   }
                    }
                }
                else {
                    this.passerror = 'Password must contain at least 8 characters';
                }
            }
            else {
                this.passerror = 'Passwords must match';
            }
        }
    }
    cancelit() {
        this.router.navigate(['/userrecruiterlist', this.type]);
    }

/*    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log(result.id);
                    this.userrecruitterdetails = result.id;
                    this.type = result.id.type;
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }*/
}
