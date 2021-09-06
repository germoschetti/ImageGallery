import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
  @Input() images: object;
  pages: number;
  actualPage: number;
  actualUrl: string;
  subscription: Subscription;

  constructor(
    private _imageService: ImageService,
  ) {
    // Obtaining the variables set as observable in the service
    this._imageService.getTotalPages().subscribe(data => {
      this.pages = data['pages'];
      this.actualPage = data['firstPage'];
    })
    this.getActualUrl();
  }
  // Getting the first images to show
  ngOnInit(): void {
    this._imageService.getFirstImage(this.actualPage).subscribe(data => {
      this.images = data['hits'];
      this._imageService.setTotalPages(data['totalHits']);
    },
      err => {
        console.error(err);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // setting data target attribute of modals
  setDataTarget(img, index) {
    let target = '#imagen' + index;
    img.target.setAttribute('data-target', target);
  }

  nextPage() {
    this.actualPage += 1;
    this.getImagesByPages();
  }

  previousPage() {
    this.actualPage -= 1;
    this.getImagesByPages();
  }

  getActualUrl() {
    this._imageService.getUrl().subscribe(data => {
      this.actualUrl = data;
    },
      err => {
        console.error("el error es, ", err);
      })
  }

  getImagesByPages() {
    this._imageService.setSpinner(true);
    setTimeout(() => {
      this.subscription = this._imageService.getImagesByPages(this.actualUrl, this.actualPage).subscribe(data => {
        console.log(this.actualUrl + this.actualPage);
        this.images = data['hits'];
      },
        err => {
          console.error(err);
        })
      this._imageService.setSpinner(false);
    }, 2500);

  }


}
