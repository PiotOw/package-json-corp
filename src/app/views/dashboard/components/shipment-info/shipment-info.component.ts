import {Component, Input, OnInit} from '@angular/core';
import {Shipment} from '../../../../domain/shipment/models/shipment';

@Component({
    selector: 'jsn-shipment-info',
    templateUrl: './shipment-info.component.html',
    styleUrls: ['./shipment-info.component.scss']
})
export class ShipmentInfoComponent implements OnInit {

    @Input() shipment: Shipment;
    @Input() last: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    getEtaDays(eta: string): number {
        const etaDate = new Date(eta);
        const today = new Date();
        return Math.ceil(Math.abs((etaDate.getTime() - today.getTime()) / (24 * 3600 * 1000)));
    }
}
