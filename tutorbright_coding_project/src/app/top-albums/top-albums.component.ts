import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../../services/itunes.service';
import { ITunesResponse, Album } from '../../models/album.model';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-album-list',
  templateUrl: './top-albums.component.html',
  styleUrls: ['./top-albums.component.scss'],
})
export class TopAlbumsComponent implements OnInit {
  top100Albums!: Observable<Album[]>;
  filteredAlbums!: Observable<Album[]>;
  searchTerm: string = '';

  constructor(private itunesService: ItunesService) {}

  ngOnInit(): void {
    this.top100Albums = this.itunesService.getTop100Albums();
    this.filteredAlbums = this.top100Albums; // Initialize with the full list
  }
  onSearch() {
    // Filter the albums based on the search term
    this.filteredAlbums = this.top100Albums.pipe(
      map((albums) =>
        albums.filter((album) =>
          this.albumMatchesSearchTerm(album, this.searchTerm)
        )
      )
    );
  }
  private albumMatchesSearchTerm(album: Album, searchTerm: string): boolean {
    const artistName = album['im:artist'].label.toLowerCase();
    const albumName = album['im:name'].label.toLowerCase();

    // Check if either the artist name or album name contains the search term
    return artistName.includes(searchTerm.toLowerCase()) || albumName.includes(searchTerm.toLowerCase());
  }
}
