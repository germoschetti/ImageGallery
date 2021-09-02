import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url:string
  constructor(private http:HttpClient) {
    this.url = 'https://pixabay.com/api/?key=23191597-920ea96e69c897fe65cbcbcad&image-type=photo&pretty=true&per_page=100&lang=es&safesearch=true'
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
}
