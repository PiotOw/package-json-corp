import {Component, OnInit} from '@angular/core';
import {DEALS} from '../../../../domain/deal/mocks/mock-deals';

@Component({
    selector: 'jsn-deals',
    templateUrl: './deals.component.html',
    styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

    DEALS = DEALS;

    constructor() {
    }

    ngOnInit() {
    }

}
