import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user';
import {LoginRequest} from '../models/login-request';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    registerUser(data: User): Observable<any> {
        const link = environment.BASE_API_URL + '/sender/register';
        return this.http.post<any>(link, data);
    }

    login(loginRequest: LoginRequest): Observable<any> {
        const link = environment.BASE_API_URL + '/auth/login';
        const data = {
            username: loginRequest.username,
            password: loginRequest.password
        };
        return this.http.post<any>(link, data, { withCredentials: true });
    }

    logout(): Observable<any> {
        const link = environment.BASE_API_URL + '/auth/logout';
        const data = {};
        return this.http.post<any>(link, data, { withCredentials: true });
    }
}
