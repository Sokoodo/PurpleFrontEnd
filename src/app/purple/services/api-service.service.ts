import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _http = inject(HttpClient);

    private _baseUrl = "http://127.0.0.1:5000/api";
    private _orderRelationUrl = "/order-relation/event-log";
    private _customNoiseUrl = "/custom-noise/event-log";

    constructor() { }

    orderRelationGenerateEventLog(singleFile: File | null, sliderValue: number): Observable<any> {
        if (singleFile != null) {
            const formData = new FormData();
            formData.set('singleFile', singleFile, singleFile.name);
            return this._http.post<any>(`${this._baseUrl}${this._orderRelationUrl}?sliderValue=${sliderValue}`, formData);
        }
        return of(null)
    }


    customNoiseGenerateEventLog(singleFile: File | null, precision: number, missingHead: number, missingTail: number, missingEpisode: number, orderPerturbation: number, alienActivities: number, tracesNr: number) {
        if (singleFile != null) {
            const formData = new FormData();
            formData.set('singleFile', singleFile, singleFile.name);
            return this._http.post<any>(`${this._baseUrl}${this._customNoiseUrl}?precision=${precision}&tracesNumber=${tracesNr}&missingHead=${missingHead}&missingTail=${missingTail}&missingEpisode=${missingEpisode}&orderPerturbation=${orderPerturbation}&alienActivities=${alienActivities}`, formData);
        }
        return of(null)
    }
}

export interface OrderRelationDef {
    formData: File | null;
    sliderValue: number
}

