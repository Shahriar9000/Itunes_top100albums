import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../itunes.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './top-albums.component.html',
  styleUrls: ['./top-albums.component.scss'],
})
export class TopAlbumsComponent implements OnInit {
  top100Albums: any;

  constructor(private itunesService: ItunesService) {}

  ngOnInit(): void {
    this.itunesService.getTop100Albums().subscribe((data) => {
      this.top100Albums = data.feed.entry;
      console.log(this.top100Albums);
    });
  }
}
