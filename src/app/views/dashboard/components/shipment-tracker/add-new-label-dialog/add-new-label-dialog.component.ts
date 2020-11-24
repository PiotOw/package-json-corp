import {Component, OnInit} from '@angular/core';
import {SIZES} from '../../../../../domain/label/mocks/mock-sizes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LabelRequest} from '../../../../../domain/label/models/label-request';

@Component({
    selector: 'jsn-add-new-label-dialog',
    templateUrl: './add-new-label-dialog.component.html',
    styleUrls: ['./add-new-label-dialog.component.scss']
})
export class AddNewLabelDialogComponent implements OnInit {

    SIZES = SIZES;

    labelForm = new FormGroup({
        addressee: new FormControl('', Validators.required),
        size: new FormControl('', Validators.required),
        poBox: new FormControl('', Validators.required)
    });

    constructor(private dialogRef: MatDialogRef<AddNewLabelDialogComponent>) {
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    add() {
        if (this.labelForm.valid) {
            const data: LabelRequest = {
                addressee: this.labelForm.controls.addressee.value,
                size: this.labelForm.controls.size.value,
                POBoxId: this.labelForm.controls.poBox.value,
            };

            this.dialogRef.close(data);
        }
    }

}
