import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string
  private error$: Subject<string>;
  private spinner$: Subject<boolean>;
  private pages$: Subject<object>;
  private url$: Subject<string>;

  constructor(private http: HttpClient) {
    this.url = 'https://pixabay.com/api/?key=23191597-920ea96e69c897fe65cbcbcad&image-type=photo&pretty=true&per_page=100&lang=es&safesearch=true'
    this.error$ = new Subject<string>();
    this.spinner$ = new Subject<boolean>();
    this.pages$ = new Subject<object>();
    this.url$ = new Subject<string>();
  }

  // Setting request services to the server
  getFirstImage(actualPage: number): Observable<object> {
    this.url$.next(this.url)
    return this.http.get(this.url + '&page=' + actualPage);
  }

  getImagesByInput(wordsToSearch: string, actualPage: number): Observable<object> {
    this.url = this.url + '&q=' + wordsToSearch;
    this.url$.next(this.url);
    return this.http.get(this.url + '&page=' + actualPage);
  }

  getImagesByCategory(category: string, actualPage: number): Observable<object> {
    this.url = this.url + '&category=' + category;
    this.url$.next(this.url);
    return this.http.get(this.url + '&page=' + actualPage);
  }

  getImagesByPages(url: string, page: number): Observable<object> {
    return this.http.get(url + '&page=' + page);
  }
  // End requests

  // Set shared variables as observable
  getUrl(): Observable<string> {
    return this.url$.asObservable();
  }

  setError(message: string): void {
    this.error$.next(message);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  setSpinner(visiblity: boolean): void {
    this.spinner$.next(visiblity);
  }

  getSpinner(): Observable<boolean> {
    return this.spinner$.asObservable();
  }

  setTotalPages(hits: number): void {
    let pages = Math.ceil(hits / 100);
    let firstPage = 1;
    this.pages$.next({ pages, firstPage });
  }

  getTotalPages(): Observable<object> {
    return this.pages$.asObservable();
  }



}
