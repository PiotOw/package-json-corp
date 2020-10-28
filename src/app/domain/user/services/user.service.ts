import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    checkUsernameAvailability(username: string): Observable<any> {
        const link = environment.BASE_API_URL + '/check/' + username;
        return this.http.get<any>(link);
    }

    registerUser(data: FormData): Observable<any> {
        const link = environment.BASE_API_URL + '/sender/register';
        return this.http.post<any>(link, data);
    }

}
