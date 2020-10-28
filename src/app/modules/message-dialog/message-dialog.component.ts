import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'jsn-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

    loading = false;

    message: string;

    constructor(private dialogRef: MatDialogRef<MessageDialogComponent>) {
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

}
