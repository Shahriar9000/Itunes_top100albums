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
  sortCriteria: string = 'priceHighToLow'; // Default sorting criteria and order



  constructor(private itunesService: ItunesService) {}

  ngOnInit(): void {
    this.top100Albums = this.itunesService.getTop100Albums();
    this.filteredAlbums = this.top100Albums; // Initialize with the full list
    console.log(this.top100Albums)
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

  onSortChange() {
    // Sort the albums based on the selected criteria
    this.filteredAlbums = this.filteredAlbums.pipe(
      map((albums) => this.sortAlbums(albums))
    );
  }


  private albumMatchesSearchTerm(album: Album, searchTerm: string): boolean {
    const artistName = album['im:artist'].label.toLowerCase();
    const albumName = album['im:name'].label.toLowerCase();

    // Check if either the artist name or album name contains the search term
    return artistName.includes(searchTerm.toLowerCase()) || albumName.includes(searchTerm.toLowerCase());
  }

  private sortAlbums(albums: Album[]): Album[] {
    // Sort albums based on the selected criteria and order
    if (this.sortCriteria === 'priceHighToLow') {
      albums = this.sortAlbumsByPrice(albums, true); // High to Low
    } else if (this.sortCriteria === 'priceLowToHigh') {
      albums = this.sortAlbumsByPrice(albums, false); // Low to High
    } else if (this.sortCriteria === 'dateNewToOld') {
      albums = this.sortAlbumsByReleaseDate(albums, true); // Newest to Oldest
    } else if (this.sortCriteria === 'dateOldToNew') {
      albums = this.sortAlbumsByReleaseDate(albums, false); // Oldest to Newest
    }

    return albums;
  }
  
  private sortAlbumsByPrice(albums: Album[], highToLow: boolean): Album[] {
    // Sort albums by price
    return albums.sort((a, b) => {
      const priceA = parseFloat(a['im:price'].attributes.amount);
      const priceB = parseFloat(b['im:price'].attributes.amount);
      return highToLow ? priceB - priceA : priceA - priceB;
    });
  }

  private sortAlbumsByReleaseDate(albums: Album[], newToOld: boolean): Album[] {
    // Sort albums by release date
    return albums.sort((a, b) => {
      const dateA = new Date(a['im:releaseDate'].label);
      const dateB = new Date(b['im:releaseDate'].label);
      return newToOld ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  }
}
