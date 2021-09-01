import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   /*  this.showAndHideMenu() */
  }

  showAndHideMenu(){
  
              const menu_items = document.querySelector('.menu-items')
              menu_items.classList.toggle('show')

  }



}
