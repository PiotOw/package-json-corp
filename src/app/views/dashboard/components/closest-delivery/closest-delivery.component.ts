import {Component, OnInit} from '@angular/core';
import {SHIPMENTS} from '../../../../domain/shipment/mocks/mock-shipments';

@Component({
    selector: 'jsn-closest-delivery',
    templateUrl: './closest-delivery.component.html',
    styleUrls: ['./closest-delivery.component.scss']
})
export class ClosestDeliveryComponent implements OnInit {

    SHIPMENTS = SHIPMENTS;

    closestDelivery: number;

    data: number[] = [];

    constructor() {
    }

    ngOnInit() {
        const today = new Date().getTime();

        for (const shipment of this.SHIPMENTS) {
            this.data.push(new Date(shipment.eta).getTime() - today);
        }
        this.closestDelivery = Math.ceil(Math.min.apply(null, this.data) / (24 * 3600 * 1000));
    }


}
