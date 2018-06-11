import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    public termsmodal: boolean = false;
    public privacymodal: boolean = false;
  constructor() { }

  ngOnInit() {
  }
    callterms() {
        this.termsmodal = true;
    }
    callprivacy() {
        this.privacymodal = true;
    }

    onHidden() {
        this.termsmodal = false;
        this.privacymodal = false;
    }
}
