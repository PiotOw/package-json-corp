import {Component, OnInit} from '@angular/core';
import {SHIPMENTS} from '../../../../domain/shipment/mocks/mock-shipments';

@Component({
    selector: 'jsn-shipment-tracker',
    templateUrl: './shipment-tracker.component.html',
    styleUrls: ['./shipment-tracker.component.scss']
})
export class ShipmentTrackerComponent implements OnInit {

    SHIPMENTS = SHIPMENTS;

    constructor() {
    }

    ngOnInit() {
    }

}
