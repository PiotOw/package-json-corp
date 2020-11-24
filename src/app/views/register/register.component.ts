import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../domain/user/services/user.service';
import {combineLatest} from 'rxjs';
import {MatDialog, MatTooltip} from '@angular/material';
import {MessageDialogComponent} from '../../modules/message-dialog/message-dialog.component';
import {User} from '../../domain/user/models/user';
import {Router} from '@angular/router';

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
    @ViewChild('emailTooltip', {static: true}) emailTooltip: MatTooltip;
    @ViewChild('addressTooltip', {static: true}) addressTooltip: MatTooltip;

    tooltipNames: Map<string, MatTooltip>;

    registerUserForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
        lastname: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')]),
        password: new FormControl('', [Validators.required, Validators.pattern('.{8,}')]),
        passwordConfirmation: new FormControl('', Validators.required),
        login: new FormControl('', [Validators.required, Validators.pattern('[a-z]{3,12}')]),
        email: new FormControl('', [Validators.required, Validators.pattern('(?:[A-Za-z0-9!#$%&\'*+/=?^_`{​​|}​​~-]+(?:\\.[A-Za-z0-9!#$%&\'*+/=?^_`{​​|}​​~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){​​3}​​(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]),
        address: new FormControl('', [Validators.required, Validators.pattern('[A-Z ĄĆĘŁŃÓŚŹŻ][a-z ąćęłńóśźż]+')])
    });

    constructor(private api: UserService,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit() {
        this.tooltipNames = new Map<string, MatTooltip>([
            ['firstname', this.firstnameTooltip],
            ['lastname', this.lastnameTooltip],
            ['password', this.passwordTooltip],
            ['login', this.loginTooltip],
            ['email', this.emailTooltip],
            ['address', this.addressTooltip]
        ]);

        combineLatest(this.registerUserForm.controls.password.valueChanges,
            this.registerUserForm.controls.passwordConfirmation.valueChanges).subscribe(() => {
            this.identicalPasswords();
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
        return this.registerUserForm.controls[controlName].touched &&
            (this.registerUserForm.controls[controlName].hasError('pattern') ||
                this.registerUserForm.controls[controlName].hasError('email'));
    }

    register() {
        if (this.registerUserForm.valid) {
            const dialogRef = this.dialog.open(MessageDialogComponent);
            dialogRef.componentInstance.loading = true;
            const data: User = {
                firstname: this.registerUserForm.controls.firstname.value,
                lastname: this.registerUserForm.controls.lastname.value,
                username: this.registerUserForm.controls.login.value,
                password: this.registerUserForm.controls.password.value,
                email: this.registerUserForm.controls.email.value,
                address: this.registerUserForm.controls.address.value
            };
            this.api.registerUser(data).subscribe(() => {
                dialogRef.componentInstance.loading = false;
                dialogRef.componentInstance.message = 'User has been registered';
                this.router.navigate(['/sender/login']);
            }, error => {
                dialogRef.componentInstance.message = 'An error occurred. Please try again.';
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
        }
    }
}
