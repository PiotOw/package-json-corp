import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {TabConfig} from '../../domain/tab-config';
import {UserService} from '../../domain/user/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../../modules/message-dialog/message-dialog.component';
import {LabelService} from '../../domain/label/services/label.service';
import {LoginService} from '../../services/login-service';
import {AuthService} from '@auth0/auth0-angular';

@Component({
    selector: 'jsn-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    userLoggedIn: boolean;


    tabsConfig: TabConfig[] = [
        {
            label: 'Dashboard',
            url: 'sender/dashboard',
            active: false
        },
        {
            label: 'Login',
            url: 'sender/login',
            active: false,
        },
        {
            label: 'Register',
            url: 'sender/register',
            active: false,
        }

    ];
    TABS: TabConfig[] = this.tabsConfig;

    constructor(private router: Router,
                private userApi: UserService,
                private dialog: MatDialog,
                private labelsApi: LabelService,
                private loginService: LoginService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.loginService.data$.subscribe(data => {
            this.isLoggedIn(data.isLoggedIn);
        });
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe((event: NavigationStart) => {
                const url = event.url.substr(1, event.url.length - 1);
                const activeTab = this.tabsConfig.find(link => link.url === url);
                if (activeTab) {
                    this.tabsConfig.forEach(link => {
                        link.active = false;
                    });
                    activeTab.active = true;
                }
            });
    }

    redirect(link: TabConfig) {
        this.tabsConfig.forEach(tc => {
            tc.active = false;
        });
        link.active = true;
        this.router.navigate([link.url]);
    }

    isLoggedIn(isLoggedIn) {
        if (isLoggedIn) {
            this.TABS = this.tabsConfig.slice(0, 1);
            this.userLoggedIn = true;
        } else {
            this.TABS = this.tabsConfig.slice(1, 3);
            this.userLoggedIn = false;
        }
    }

    logout() {
        const dialogRef = this.dialog.open(MessageDialogComponent);
        dialogRef.componentInstance.loading = true;
        this.auth.isAuthenticated$.subscribe(res => {
            if (res) {
                this.auth.logout({returnTo: document.location.origin});
            }
            this.userApi.logout();
        });
        dialogRef.componentInstance.loading = false;
        dialogRef.componentInstance.message = 'You\'ve been successfully logged out';
        this.router.navigate(['sender/login']);
    }
}
