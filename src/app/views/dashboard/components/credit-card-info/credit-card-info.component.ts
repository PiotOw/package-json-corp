import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jsn-credit-card-info',
    templateUrl: './credit-card-info.component.html',
    styleUrls: ['./credit-card-info.component.scss']
})
export class CreditCardInfoComponent implements OnInit {

    card = {
        number: 1020,
        valid: {
            month: 10,
            year: 22
        }
    };

    constructor() {
    }

    ngOnInit() {
    }

}
