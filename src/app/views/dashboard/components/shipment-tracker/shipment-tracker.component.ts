import {Component, OnInit} from '@angular/core';
import {Label} from '../../../../domain/label/models/label';
import {LabelService} from '../../../../domain/label/services/label.service';
import {MatDialog} from '@angular/material/dialog';
import {AddNewLabelDialogComponent} from './add-new-label-dialog/add-new-label-dialog.component';
import {MessageDialogComponent} from '../../../../modules/message-dialog/message-dialog.component';
import {ConfirmDialogComponent} from '../../../../modules/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'jsn-shipment-tracker',
    templateUrl: './shipment-tracker.component.html',
    styleUrls: ['./shipment-tracker.component.scss']
})
export class ShipmentTrackerComponent implements OnInit {

    LABELS: Label[];

    constructor(private api: LabelService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.fetchAllLabels();
    }

    fetchAllLabels() {
        const dialogRef = this.dialog.open(MessageDialogComponent);
        dialogRef.componentInstance.loading = true;
        this.api.fetchAllLabels().subscribe(response => {
            dialogRef.componentInstance.loading = false;
            dialogRef.close();
            this.LABELS = response.labels;
        }, error => {
            const messageDialogRef = this.dialog.open(MessageDialogComponent);
            messageDialogRef.componentInstance.message = 'An error occurred. Try again';
        });
    }

    addNewLabel() {
        const dialogRef = this.dialog.open(AddNewLabelDialogComponent);
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.api.createLabel(data).subscribe(response => {
                    this.fetchAllLabels();
                }, error => {
                    const messageDialogRef = this.dialog.open(MessageDialogComponent);
                    messageDialogRef.componentInstance.message = 'An error occurred. Try again';
                });
            }
        });
    }

    deleteLabel(label: Label) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.api.deleteLabel(label.id).subscribe(response => {
                    this.fetchAllLabels();
                }, error => {
                    const messageDialogRef = this.dialog.open(MessageDialogComponent);
                    messageDialogRef.componentInstance.message = 'An error occurred. Try again';
                });
            }
        });
    }

}
