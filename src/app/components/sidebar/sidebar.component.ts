import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {TabConfig} from '../../domain/tab-config';

@Component({
    selector: 'jsn-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    tabsConfig: TabConfig[] = [
        {
            label: 'Dashboard',
            url: '',
            active: false
        },
        {
            label: 'Register',
            url: 'sender/sign-up',
            active: false,
        }

    ];

    constructor(private router: Router) {
    }

    ngOnInit() {
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

}
