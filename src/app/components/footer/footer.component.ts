import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jsn-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    date: number = new Date().getFullYear();

    constructor() {
    }

    ngOnInit() {
    }

    redirectToGithub() {
        window.open('https://github.com/PiotOw/package-json-corp', '_blank');
    }

}
