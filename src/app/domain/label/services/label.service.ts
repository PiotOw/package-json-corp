import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FetchLabelsResponse} from '../models/fetch-labels-response';
import {Label} from '../models/label';
import {LabelRequest} from '../models/label-request';

@Injectable({
    providedIn: 'root'
})
export class LabelService {

    constructor(private http: HttpClient) {
    }

    fetchAllLabels(): Observable<FetchLabelsResponse> {
        const link = environment.BASE_API_URL + '/labels';
        const options = {
            withCredentials: true
        };
        return this.http.get<any>(link, options);
    }

    createLabel(labelData: LabelRequest): Observable<Label> {
        const link = environment.BASE_API_URL + '/labels';
        const options = {
            withCredentials: true
        };
        const data = {
            addressee: labelData.addressee,
            POBoxId: labelData.POBoxId,
            size: labelData.size
        };
        return this.http.post<any>(link, data, options);
    }

    deleteLabel(id: string): Observable<any> {
        const link = environment.BASE_API_URL + '/labels/' + id;
        const options = {
            withCredentials: true
        };
        return this.http.delete<any>(link, options);
    }
}
