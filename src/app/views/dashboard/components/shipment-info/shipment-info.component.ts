import {Component, Input, OnInit} from '@angular/core';
import {Shipment} from '../../../../domain/shipment/models/shipment';
import {Label} from '../../../../domain/label/models/label';

@Component({
    selector: 'jsn-shipment-info',
    templateUrl: './shipment-info.component.html',
    styleUrls: ['./shipment-info.component.scss']
})
export class ShipmentInfoComponent implements OnInit {

    @Input() label: Label;
    @Input() last: boolean;

    constructor() {
    }

    ngOnInit() {
    }
}
