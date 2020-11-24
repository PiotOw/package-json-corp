import {Component, OnInit} from '@angular/core';
import {LabelService} from '../../domain/label/services/label.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../../modules/message-dialog/message-dialog.component';
import {Router} from '@angular/router';

@Component({
    selector: 'jsn-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    userLoggedIn = false;

    constructor(private api: LabelService,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit() {
        const dialogRef = this.dialog.open(MessageDialogComponent);
        dialogRef.componentInstance.loading = true;
        this.api.fetchAllLabels().subscribe(response => {
            dialogRef.componentInstance.loading = false;
            dialogRef.close();
            this.userLoggedIn = true;
        }, error => {
            if (error.status === 401) {
                this.userLoggedIn = false;
                dialogRef.close();
                this.router.navigate(['sender/login']);
            }
        });
    }

}
