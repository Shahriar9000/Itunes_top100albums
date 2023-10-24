import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItunesService {
  constructor(private http: HttpClient) {}

  getTop100Albums(): Observable<any> {
    const url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';
    return this.http.get(url);
  }
}
