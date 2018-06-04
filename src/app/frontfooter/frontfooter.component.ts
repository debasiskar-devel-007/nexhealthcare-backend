import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-frontfooter',
    templateUrl: './frontfooter.component.html',
    styleUrls: ['./frontfooter.component.css']
})
export class FrontfooterComponent implements OnInit {
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
