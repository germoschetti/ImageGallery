import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {
  @Output() imagesByInputEvent = new EventEmitter<any>();
  inputContent: string;
  wordsToSearch: string;
  url:string;

  constructor(
    private _imageService: ImageService,
  ) { }

  ngOnInit(): void {}

  getImagesByInput() {
    // input verification
    if (this.inputContent == undefined || this.inputContent.trim() == '') {
      this._imageService.setError('Oops... You must enter a search term');
    } else {
      // url adaptation for api
      this.urlAdaptation();
      // making request and showing spinner
      this._imageService.setSpinner(true);
      setTimeout(()=>{
        this.makeRequestToApi();
        this._imageService.setSpinner(false);
      }, 2500);
    }
  }

  urlAdaptation() {
    this.wordsToSearch = '';
    const arrString = this.inputContent.split(" ");
    if (arrString.length > 1) {
      arrString.forEach(element => {
        this.wordsToSearch += `${element}+`;
      });
    } else {
      this.wordsToSearch = this.inputContent;
    }
  }

  makeRequestToApi(){
    this._imageService.getImagesByInput(this.wordsToSearch, 1 ).subscribe(data => {
      if (data['hits'].length == 0) {
        this._imageService.setError('Oops... We have not found results for your search');
      } else {
        this.imagesByInputEvent.emit(data['hits']);
        this._imageService.setTotalPages(data['totalHits']);
      }
    },
    err=>{
      console.error(err);
    });
  }

}
