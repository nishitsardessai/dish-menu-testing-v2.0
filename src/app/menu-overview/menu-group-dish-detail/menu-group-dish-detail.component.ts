import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu/menu.service";
import {MenuGroupItem} from "../../interfaces/menu";
import {Subscription} from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';
import  {FormsModule} from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {MdButtonModule} from '@angular/material';







@Component({
  selector: 'app-menu-group-dish-detail',
  templateUrl: './menu-group-dish-detail.component.html',
  styleUrls: ['./menu-group-dish-detail.component.css']
})
export class MenuGroupDishDetailComponent implements OnInit {

  private dishID; //dishID
  private subscription: Subscription;
  menuGroupItem:MenuGroupItem;

  cloudinaryImage: any;
  imageId: string;
  secureUrl: string;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'nishit', uploadPreset: 'kkzbmykl' })
  );

  constructor(private _menuService: MenuService,
              private route: ActivatedRoute) {

      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.secureUrl= res.secure_url;
      console.log("Image URL is: "+ res.secure_url);
      this.updateDishDetail();
      return { item, response, status, headers };
    };
  }

  updateDishDetail(){};

  upload() {
        this.uploader.uploadAll();
        this.getDishDetail();
    }

  ngOnInit(){
    //https://stackoverflow.com/questions/34906888/angular-2-access-parent-routeparams-from-child-component
    this.subscription = this.route.params.subscribe(params => {
      this.dishID = +params["dishID"];
      console.log("Received dishID with id : " + this.dishID + " in MenuGroupDishDetailComponent")
    });

    this.getDishDetail();


  }

  getDishDetail(){
    this._menuService.getMenuItem(this.dishID).subscribe(
      menuGroupItem => {
        this.menuGroupItem = menuGroupItem;
        console.log(menuGroupItem);

      },
      err => {
        // Log errors if any
        console.log(err);
      }
    )
  }

}
