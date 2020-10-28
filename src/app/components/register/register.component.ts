import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../domain/user/services/user.service';
import {AvailabilityStatus} from '../../domain/user/models/availability-status.enum';
import {combineLatest} from 'rxjs';
import {MatDialog, MatTooltip} from '@angular/material';
import {MessageDialogComponent} from '../../modules/message-dialog/message-dialog.component';

@Component({
    selector: 'jsn-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    @ViewChild('firstnameTooltip', {static: true}) firstnameTooltip: MatTooltip;
    @ViewChild('lastnameTooltip', {static: true}) lastnameTooltip: MatTooltip;
    @ViewChild('passwordTooltip', {static: true}) passwordTooltip: MatTooltip;
    @ViewChild('passwordConfirmationTooltip', {static: true}) passwordConfirmationTooltip: MatTooltip;
    @ViewChild('loginTooltip', {static: true}) loginTooltip: MatTooltip;

    photoInputError = false;
    sexInputError = false;


    AvailabilityStatus = AvailabilityStatus;

    availabilityStatus: AvailabilityStatus = AvailabilityStatus.WAITING;

    fileInputConfig = {
        disabled: true,
        label: 'Fill in the rest of the form'
    };

    tooltipNames: Map<string, MatTooltip>;

    selectedFile: File;
    registerUserForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
        lastname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
        sex: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
        passwordConfirmation: new FormControl('', Validators.required),
        login: new FormControl('', [Validators.required, Validators.pattern('[a-z]{3,12}')]),
        photo: new FormControl('', Validators.required),
    });

    constructor(private api: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.tooltipNames = new Map<string, MatTooltip>([
            ['firstname', this.firstnameTooltip],
            ['lastname', this.lastnameTooltip],
            ['password', this.passwordTooltip],
            ['login', this.loginTooltip]
        ]);

        this.registerUserForm.valueChanges.subscribe(() => {
            this.checkForm();
        });

        this.registerUserForm.controls.sex.statusChanges.subscribe(() => {
            this.sexInputError = this.registerUserForm.controls.sex.invalid;
        });

        combineLatest(this.registerUserForm.controls.password.valueChanges,
            this.registerUserForm.controls.passwordConfirmation.valueChanges).subscribe(() => {
            this.identicalPasswords();
        });


        this.registerUserForm.controls.login.valueChanges.subscribe(value => {
            this.loginTooltip.message = '3-12 characters \n All lowercase';
            this.loginTooltip.tooltipClass = 'tooltip';
            if (this.registerUserForm.controls.login.valid) {
                this.availabilityStatus = AvailabilityStatus.CHECKING;
                this.api.checkUsernameAvailability(value).subscribe(res => {
                    if (res[value] === 'available') {
                        this.availabilityStatus = AvailabilityStatus.AVAILABLE;
                        this.checkForm();
                    } else {
                        this.availabilityStatus = AvailabilityStatus.TAKEN;
                        this.loginTooltip.message = 'Login unavailable';
                        this.loginTooltip.tooltipClass = 'tooltip error-tooltip';
                        this.loginTooltip.toggle();
                        this.registerUserForm.controls.login.setErrors({incorrect: true});
                    }
                }, error => {
                    console.warn(error.status);
                    this.availabilityStatus = AvailabilityStatus.TAKEN;
                });
            } else {
                this.availabilityStatus = AvailabilityStatus.TAKEN;
            }
        });
    }

    identicalPasswords(): boolean {
        if (this.registerUserForm.controls.password.value === this.registerUserForm.controls.passwordConfirmation.value &&
            (this.registerUserForm.controls.passwordConfirmation.value.length > 7 ||
                this.registerUserForm.controls.passwordConfirmation.value.length < 1)) {
            this.registerUserForm.controls.passwordConfirmation.setErrors(null);
            return true;
        } else {
            this.registerUserForm.controls.passwordConfirmation.setErrors({incorrect: true});
            return false;
        }
    }

    showError(controlName: string): boolean {
        return this.registerUserForm.controls[controlName].touched && this.registerUserForm.controls[controlName].hasError('pattern');
    }

    checkForm() {
        if (this.registerUserForm.controls.firstname.valid &&
            this.registerUserForm.controls.lastname.valid &&
            this.registerUserForm.controls.password.valid &&
            this.registerUserForm.controls.sex.valid &&
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
        this.photoInputError = this.registerUserForm.controls.photo.invalid;
    }


    register() {
        if (this.registerUserForm.valid) {
            const dialogRef = this.dialog.open(MessageDialogComponent);
            dialogRef.componentInstance.loading = true;
            const blob = new Blob([this.selectedFile], {type: this.selectedFile.type});
            const formData = new FormData();
            formData.append('firstname', this.registerUserForm.controls.firstname.value);
            formData.append('lastname', this.registerUserForm.controls.lastname.value);
            formData.append('password', this.registerUserForm.controls.password.value);
            formData.append('sex', this.registerUserForm.controls.sex.value);
            formData.append('photo', blob, this.selectedFile.name);
            formData.append('login', this.registerUserForm.controls.login.value);
            this.api.registerUser(formData).subscribe(() => {
                dialogRef.componentInstance.loading = false;
                dialogRef.componentInstance.message = 'User has been registered';
            }, error => {
                dialogRef.componentInstance.loading = false;
                if (error.status === 200) {
                    dialogRef.componentInstance.message = 'User has been registered';
                } else {
                    dialogRef.componentInstance.message = 'An error occured. Please try again.';
                }
            });
        } else {
            Object.keys(this.registerUserForm.controls).forEach(controlName => {
                if (this.registerUserForm.controls[controlName].hasError('pattern')) {
                    this.tooltipNames.get(controlName).toggle();
                }
            });
            if (this.registerUserForm.controls.passwordConfirmation.invalid) {
                this.passwordConfirmationTooltip.toggle();
            }
            if (this.registerUserForm.controls.login.invalid) {
                this.loginTooltip.toggle();
            }
            this.sexInputError = this.registerUserForm.controls.sex.invalid;
            this.photoInputError = this.registerUserForm.controls.photo.invalid;
        }
    }
}
