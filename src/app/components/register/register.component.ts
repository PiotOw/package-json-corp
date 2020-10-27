import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../domain/user/services/user.service';
import {AvailabilityStatus} from '../../domain/user/models/availability-status.enum';

@Component({
    selector: 'jsn-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    AvailabilityStatus = AvailabilityStatus;

    availabilityStatus: AvailabilityStatus = AvailabilityStatus.WAITING;

    fileInputConfig = {
        disabled: true,
        label: 'Fill in rest of the form'
    };

    selectedFile: File;
    // TODO: Validators and errors dictionary
    registerUserForm = new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', [Validators.required, Validators.minLength(9), Validators.email]),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        photo: new FormControl('', Validators.required)
    });

    constructor(private api: UserService) {
    }

    ngOnInit() {
        // console.log(this.registerUserForm.controls);

        console.log(Object.keys(this.registerUserForm.controls)[0]);
        // Object.keys(this.registerUserForm.controls).find(name => thi
        // s.registerUserForm.controls[1] === this.registerUserForm.controls[name]) || null;

        this.registerUserForm.valueChanges.subscribe(values => {
            console.log(this.registerUserForm.controls.firstname.dirty);
            // console.log(this.registerUserForm.controls.lastname.errors);
            this.checkForm();
        });

        this.registerUserForm.controls.username.valueChanges.subscribe(value => {
            if (this.registerUserForm.controls.username.valid) {
                this.availabilityStatus = AvailabilityStatus.CHECKING;
                this.api.checkUsernameAvailability(value).subscribe(res => {
                    if (res[value] === 'available') {
                        this.availabilityStatus = AvailabilityStatus.AVAILABLE;
                        this.checkForm();
                    } else {
                        this.availabilityStatus = AvailabilityStatus.TAKEN;
                    }
                }, error => {
                    console.warn(error.status);
                    this.availabilityStatus = AvailabilityStatus.TAKEN;
                });
            }
        });
    }

    checkForm() {
        if (this.registerUserForm.controls.firstname.valid &&
            this.registerUserForm.controls.lastname.valid &&
            this.registerUserForm.controls.password.valid &&
            this.registerUserForm.controls.passwordConfirmation.valid &&
            this.availabilityStatus === AvailabilityStatus.AVAILABLE) {
            this.fileInputConfig = {
                disabled: false,
                label: 'Choose file'
            };
        } else {
            this.fileInputConfig = {
                disabled: true,
                label: 'Fill in rest of the form'
            };
        }
    }

    fileChange(event) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
            this.fileInputConfig.label = this.selectedFile.name;
        }
    }

    onOpenFileInputClick() {
    }

    onSubmit() {

    }
}
