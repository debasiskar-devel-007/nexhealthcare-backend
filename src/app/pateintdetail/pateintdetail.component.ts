import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-pateintdetail',
  templateUrl: './pateintdetail.component.html',
  styleUrls: ['./pateintdetail.component.css'],
    providers: [Commonservices],
})
export class PateintdetailComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    public serverurl;
    private addcookie: CookieService;
    private cookiedetails;
    static invalidemail;
    static blankemail;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
    }

    ngOnInit() {
       /* this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, PateintdetailComponent.validateEmail])],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
            heightwidth: ['', Validators.required],
            allergies: ['', Validators.required],
            medicareclaim: ['', Validators.required],
            tag: [''],
            raceethnicity: ['', Validators.required],
            trackingno: ['', Validators.required],
            medicarecard: ['', Validators.required],
            iscancer: ['', Validators.required],
            cancertypes: ['', Validators.required],
            relation: ['', Validators.required],
            approxage: ['', Validators.required],
        });*/
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, PateintdetailComponent.validateEmail])],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required]
        });
    }

    static validateEmail(control: FormControl) {
        PateintdetailComponent.blankemail = false;
        PateintdetailComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            PateintdetailComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            PateintdetailComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return PateintdetailComponent.invalidemail;
        }
        if (type == 'blank') {
            return PateintdetailComponent.blankemail;
        }
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid && (PateintdetailComponent.invalidemail == false || PateintdetailComponent.blankemail == false)) {
          console.log('inside');
            let link = this.serverurl + 'patientdetail';
            let data = {
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
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                      console.log(result);
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
}
