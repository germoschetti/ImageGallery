import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchByCategoryEvent = new EventEmitter<object>();

  constructor( private imageService: ImageService) { }

  ngOnInit(): void {}

  showAndHideMenu() {
    const menu_items = document.querySelector('.menu-items');
    menu_items.classList.toggle('show');
  }

searchByCategory(category:string){
  this.imageService.getImagesByCategory(category).subscribe(data=>{
    this.searchByCategoryEvent.emit(data['hits']);
  });
}

}
