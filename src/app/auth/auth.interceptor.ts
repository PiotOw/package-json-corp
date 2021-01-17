import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../domain/user/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = UserService.getToken();

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers
                    .set('Authorization', idToken)
                    .set('Content-Type', 'application/json')
            });

            return next.handle(cloned);
        }

        return next.handle(req);
    }
}
