import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: string;
  mostrar: boolean;
  subscription: Subscription;
  constructor(private _imageService: ImageService) {
    this.subscription = this._imageService.getError().subscribe(data => {
      this.error = data;
      this.showMessage();
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showMessage() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 3000);
  }

}
