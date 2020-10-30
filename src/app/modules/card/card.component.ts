import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'jsn-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() header: string;
    @Input() border = false;
    @Input() padding = true;
    @Input() centeredHeader = false;

    constructor() {
    }

    ngOnInit() {
    }

}
