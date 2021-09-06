import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  visibility:boolean;
  subscription: Subscription
  constructor(private _imageService:ImageService) { 
    this.subscription = this._imageService.getSpinner().subscribe(data=>{
      this.visibility = data;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }


}
