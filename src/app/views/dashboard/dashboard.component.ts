import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jsn-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    tiles = [
        {text: 'One', cols: 3, rows: 2, color: 'lightblue'},
        {text: 'Two', cols: 2, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 2, color: '#DDBDF1'},
        {text: 'Five', cols: 1, rows: 1, color: '#f1c395'},
        {text: 'Six', cols: 1, rows: 1, color: '#f12cef'},
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
