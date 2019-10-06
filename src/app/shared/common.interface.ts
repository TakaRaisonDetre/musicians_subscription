export interface SpotifyAuthorizationResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    expires_at?: number;
  }
  
  export interface Album {
    id: number;
  }
  
  export interface SpotifyArtist {
    id: number;
    name: string;
    genres: any[];
    albums: Album[];
    images: any[];
  }
  export enum Theme {
    light = 'light_theme',
    dark = 'dark_theme',
    spotify = 'spotify_theme'
  }
  export enum Language {
    en,
    es
  }
  
  export interface Setting {
    language: Language;
    theme: Theme;
  }
  