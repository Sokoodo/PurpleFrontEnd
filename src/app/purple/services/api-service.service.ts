import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _http = inject(HttpClient);

    private _baseUrl = "http://127.0.0.1:5000/api";
    private _orderRelationUrl = "/order-relation/event-log";

    constructor() { }

    orderRelationGenerateEventLog(singleFile: File | null, sliderValue: number): Observable<any> {
        if (singleFile != null) {
            const formData = new FormData();
            formData.set('singleFile', singleFile, singleFile.name);
            return this._http.post<any>(`${this._baseUrl}${this._orderRelationUrl}?sliderValue=${sliderValue}`, formData);
        }
        return of(null)
    }
}

export interface OrderRelationDef {
    formData: File | null;
    sliderValue: number
}

