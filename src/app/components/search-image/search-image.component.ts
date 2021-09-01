import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {
  @Output() imagesByInputEvent = new EventEmitter<any>()
  inputContent: string
  wordsToSearch: string
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  getImagesByInput() {
    this.wordsToSearch = '';
    const arrString = this.inputContent.split(" ")
    if (arrString.length > 1) {
      arrString.forEach(element => {
        this.wordsToSearch += `${element}+`
      })
    } else {
      this.wordsToSearch = this.inputContent
    }

    this.imageService.getImagesByInput(this.wordsToSearch).subscribe(data=>{
      this.imagesByInputEvent.emit(data['hits'])
    })
  }

}
