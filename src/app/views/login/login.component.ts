import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../domain/user/services/user.service';
import {MessageDialogComponent} from '../../modules/message-dialog/message-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginRequest} from '../../domain/user/models/login-request';
import {Router} from '@angular/router';

@Component({
    selector: 'jsn-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginUserForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private api: UserService,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        const dialogRef = this.dialog.open(MessageDialogComponent);
        if (this.loginUserForm.valid) {
            dialogRef.componentInstance.loading = true;
            const data: LoginRequest = {
                username: this.loginUserForm.controls.username.value,
                password: this.loginUserForm.controls.password.value,
            };
            this.api.login(data).subscribe((res) => {
                dialogRef.close();
                this.router.navigate(['sender/dashboard']);
            }, error => {
                console.log(error);
                dialogRef.componentInstance.loading = false;
                if (error.status === 400) {
                    dialogRef.componentInstance.message = 'Incorrect username and/or password';
                } else {
                    dialogRef.componentInstance.message = 'An error occured, please try again';
                }
            });
        } else {
            dialogRef.componentInstance.loading = false;
            dialogRef.componentInstance.message = 'Fill in the form';
        }
    }
}
