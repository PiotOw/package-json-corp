import {Label} from './label';

export interface FetchLabelsResponse {
    _embedded: {
        data: Label[];
    };
}
