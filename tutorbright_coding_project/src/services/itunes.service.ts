import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ITunesResponse, Album } from '../models/album.model';

@Injectable({
  providedIn: 'root',
})
export class ItunesService {
  private apiUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  constructor(private http: HttpClient) {}
  getTop100Albums(): Observable<Album[]> {
    return this.http.get<ITunesResponse>(this.apiUrl).pipe(
      map((data) => data.feed.entry)
    );
  }
}
