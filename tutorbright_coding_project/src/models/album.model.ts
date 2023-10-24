export interface ITunesResponse {
    feed: {
      entry: Album[];
    };
  }

export interface Album {
    'im:name': { label: string };
    'im:artist': { label: string };
    'im:price': { label: string; attributes: { amount: string; currency: string } };
    'im:image': { label: string; attributes: { height: number } }[]; // An array of images with labels and height
    'im:itemCount': { label: string };
    'im:releaseDate': { label: string; attributes: { label: string } };
    link: { attributes: { rel: string; type: string; href: string } };
    rights: { label: string };
    title: { label: string };
  }