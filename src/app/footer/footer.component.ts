import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public termsmodal: boolean = false;
    public policymodal: boolean = false;
  constructor() { }

  ngOnInit() {
  }
    callterms() {
        this.termsmodal = true;
    }
    callpolicy() {
        this.policymodal = true;
    }
    onHidden() {
        this.termsmodal = false;
        this.policymodal = false;
    }
}
