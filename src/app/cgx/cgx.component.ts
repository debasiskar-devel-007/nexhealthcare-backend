import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cgx',
  templateUrl: './cgx.component.html',
  styleUrls: ['./cgx.component.css']
})
export class CgxComponent implements OnInit {
  id: number;
  constructor( private _http: Http, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
  gotosignup() {
    this.router.navigate(['/sign-up', this.id]);
  }
}
