import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
  @Input() images: object
  constructor(private _imageService: ImageService) { }

  ngOnInit(): void {
    this._imageService.getFirstImage().subscribe(data => {
      this.images = data['hits']
    })
  }

  guardarImagenFichero(img) {

  }

}
