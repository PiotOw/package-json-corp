import {Component, Input, OnInit} from '@angular/core';
import {Deal} from '../../../../domain/deal/models/deal';

@Component({
    selector: 'jsn-deal-info',
    templateUrl: './deal-info.component.html',
    styleUrls: ['./deal-info.component.scss']
})
export class DealInfoComponent implements OnInit {

    @Input() deal: Deal;
    @Input() last: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
