import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private _dataUrl: string = '../assets/data/cars.json';

  constructor(private http: HttpClient) { 
    
  }

  getData(): Observable<any> {
    return this.http.get<any[]>(this._dataUrl);
  }
}
