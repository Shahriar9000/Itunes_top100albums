import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../../services/itunes.service';
import { ITunesResponse, Album } from '../../models/album.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-album-list',
  templateUrl: './top-albums.component.html',
  styleUrls: ['./top-albums.component.scss'],
})
export class TopAlbumsComponent implements OnInit {
  top100Albums!: Observable<Album[]>;

  constructor(private itunesService: ItunesService) {}

  ngOnInit(): void {
    this.top100Albums = this.itunesService.getTop100Albums();
  }
}
