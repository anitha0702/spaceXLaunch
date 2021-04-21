import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  getYear: BehaviorSubject<any> = new BehaviorSubject(null);
  getLaunch: BehaviorSubject<any> = new BehaviorSubject(null);
  getLanding: BehaviorSubject<any> = new BehaviorSubject(null);
  getAllUrl = "https://api.spaceXdata.com/v3/launches?limit=100";
  api_url = "";
  constructor(private http: HttpClient) { }

  getAllDetails() {
    return this.http.get (this.getAllUrl) 
    .pipe (
      map((response: any)=> {

        return response;
      }),
      catchError((error: any) => {
        return error;
      })
    )
  }
  getData(api_url: any) {
    return this.http.get (api_url) 
    .pipe (
      map((response: any)=> {

        return response;
      }),
      catchError((error: any) => {
        return error;
      })
    )
      
  }
}
