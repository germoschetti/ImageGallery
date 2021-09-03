import { HttpClient } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url:string
  private error$: Subject<string>
  private spinner$: Subject<boolean>

  constructor(private http:HttpClient) {
    this.url = 'https://pixabay.com/api/?key=23191597-920ea96e69c897fe65cbcbcad&image-type=photo&pretty=true&per_page=100&lang=es&safesearch=true'
    this.error$ = new Subject<string>()
    this.spinner$ = new Subject<boolean>()
  }

  getFirstImage(): Observable<object>{
    return this.http.get(this.url)
  }

  getImagesByInput(wordsToSearch:string):Observable<object>{
    return this.http.get(this.url + '&q=' + wordsToSearch )
  }

  getImagesByCategory(category:string):Observable<object>{
    return this.http.get(this.url + '&category=' + category )
  }

  setError(message:string): void{
    this.error$.next(message);
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }

  setSpinner(visiblity: boolean): void{
    this.spinner$.next(visiblity);
  }

  getSpinner():Observable<boolean>{
    return this.spinner$.asObservable();
  }


}
