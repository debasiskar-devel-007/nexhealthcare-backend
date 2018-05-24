import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css'],
    providers: [Commonservices],
})
export class PatientrecordComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public usastates;
    id: number;
    public serverurl;
    public pateintquestioniremodal: boolean = false;


    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.getusastates();
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