import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'imagegallery';
  imagesByInput: object;
  imagesByCategory: object;

  constructor(){

  }

  getImagesByInput(data:object){
    this.imagesByInput = data
  }
  searchByCategory(data:object){
    this.imagesByCategory = data
    console.log('Hola')
  }
}
