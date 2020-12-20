import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private data = new BehaviorSubject({
        isLoggedIn: false
    });
    data$ = this.data.asObservable();

    changeData(loggedIn: boolean) {
        this.data.next({
            isLoggedIn: loggedIn
        });
    }
}
