import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user';
import {LoginRequest} from '../models/login-request';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login-service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private static readonly localStorageJWTKey = 'access_token';

    constructor(private http: HttpClient,
                private router: Router,
                private loginService: LoginService) {
    }

    static getToken(): string {
        return localStorage.getItem(UserService.localStorageJWTKey);
    }

    registerUser(data: User): Observable<any> {
        const link = environment.BASE_API_URL + '/auth/register';
        return this.http.post<any>(link, data);
    }

    login(loginRequest: LoginRequest): Observable<any> {
        const link = environment.BASE_API_URL + '/auth/login';
        const data = {
            username: loginRequest.username,
            password: loginRequest.password
        };
        return this.http.post<any>(link, data, {observe: 'response'}).pipe(
            map(res => {
                localStorage.setItem(UserService.localStorageJWTKey, res.headers.get('Authorization') as string);
                this.loginService.changeData(true);
            }));
    }

    logout(): void {
        localStorage.removeItem(UserService.localStorageJWTKey);
        this.loginService.changeData(false);
    }

    redirectToLoginPage(): Observable<boolean> {
        return fromPromise(this.router.navigate(['sender/login']));
    }

    loginAuth0(email: string, sub: string) {
        const link = environment.BASE_API_URL + '/auth/login/auth0';
        const data = {
            email,
            sub
        };
        return this.http.post<any>(link, data, {observe: 'response'}).pipe(
            map(res => {
                localStorage.setItem(UserService.localStorageJWTKey, res.headers.get('Authorization') as string);
                this.loginService.changeData(true);
            }));
    }
}
